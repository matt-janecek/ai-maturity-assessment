import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import logger from '@/lib/logger'

interface GenerateGraphicRequest {
  score: number
  level: number
  company: string
}

// This endpoint returns an HTML template for the maturity infographic
// In production, you'd use Playwright to render this to PNG
export async function POST(request: NextRequest) {
  try {
    const { score, level, company }: GenerateGraphicRequest = await request.json()

    // Load logo as base64
    const logoPath = path.join(process.cwd(), 'public', 'DonyatiLogo.png')
    const logoBase64 = fs.readFileSync(logoPath).toString('base64')
    const logoDataUrl = `data:image/png;base64,${logoBase64}`

    // Calculate position on S-curve based on score
    // S-curve positions: L0=10%, L1=25%, L2=45%, L3=70%, L4=90%
    const positions: Record<number, { x: number; y: number }> = {
      0: { x: 182, y: 540 },
      1: { x: 546, y: 420 },
      2: { x: 910, y: 310 },
      3: { x: 1274, y: 200 },
      4: { x: 1638, y: 95 },
    }

    // Interpolate position for fractional scores
    const floor = Math.floor(score)
    const ceil = Math.min(4, Math.ceil(score))
    const fraction = score - floor

    let markerX = positions[floor].x
    let markerY = positions[floor].y

    if (floor !== ceil) {
      markerX = positions[floor].x + (positions[ceil].x - positions[floor].x) * fraction
      markerY = positions[floor].y + (positions[ceil].y - positions[floor].y) * fraction
    }

    const levelColors = [
      'linear-gradient(135deg, #B8D458 0%, #9BBF3B 100%)',
      'linear-gradient(135deg, #E8A84C 0%, #D4922A 100%)',
      'linear-gradient(135deg, #5D9CEC 0%, #4A89DC 100%)',
      'linear-gradient(135deg, #6B5B95 0%, #524678 100%)',
      'linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%)',
    ]

    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Maturity Model - ${company}</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(180deg, #f8f7fc 0%, #ffffff 100%);
            width: 1920px;
            height: 1080px;
            overflow: hidden;
        }
        .container {
            width: 100%;
            height: 100%;
            padding: 30px 50px;
            position: relative;
        }
        .title {
            text-align: center;
            font-size: 48px;
            font-weight: 700;
            color: #12002A;
            letter-spacing: 2px;
            margin-bottom: 5px;
        }
        .subtitle {
            text-align: center;
            font-size: 24px;
            color: #4A4778;
            margin-bottom: 10px;
        }
        .columns-container {
            display: flex;
            justify-content: space-between;
            height: 870px;
            position: relative;
            gap: 16px;
            padding-top: 70px;
        }
        .column {
            flex: 1;
            background: linear-gradient(180deg, #ffffff 0%, #f5f3fa 100%);
            border-radius: 24px;
            box-shadow: 0 8px 32px rgba(74, 71, 120, 0.12);
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 20px;
        }
        .column.current {
            box-shadow: 0 8px 32px rgba(74, 71, 120, 0.25);
            border: 3px solid #ACC953;
        }
        .level-pill {
            padding: 20px 24px;
            border-radius: 50px;
            color: white;
            font-weight: 700;
            text-align: center;
            box-shadow: 0 6px 20px rgba(0,0,0,0.25);
            position: absolute;
            top: -35px;
            left: 50%;
            transform: translateX(-50%);
            width: 260px;
            height: 90px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 100;
        }
        .level-pill .level-num {
            font-size: 18px;
            opacity: 0.95;
            display: block;
            margin-bottom: 4px;
            letter-spacing: 2px;
        }
        .level-pill .level-name {
            font-size: 22px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            display: block;
            line-height: 1.2;
        }
        .col-0 .level-pill { background: ${levelColors[0]}; }
        .col-1 .level-pill { background: ${levelColors[1]}; }
        .col-2 .level-pill { background: ${levelColors[2]}; }
        .col-3 .level-pill { background: ${levelColors[3]}; }
        .col-4 .level-pill { background: ${levelColors[4]}; }
        .description {
            position: absolute;
            width: 92%;
            padding: 16px 12px;
            font-size: 18px;
            line-height: 1.5;
            color: #333;
            text-align: center;
            background: rgba(255,255,255,0.8);
            border-radius: 12px;
            left: 50%;
            transform: translateX(-50%);
        }
        .col-0 .description { top: 590px; }
        .col-1 .description { top: 480px; }
        .col-2 .description { top: 370px; }
        .col-3 .description { top: 260px; }
        .col-4 .description { top: 150px; }
        .curve-container {
            position: absolute;
            top: 100px;
            left: 50px;
            right: 50px;
            height: 780px;
            pointer-events: none;
            z-index: 5;
        }
        .curve-container svg { width: 100%; height: 100%; }
        .curve-line {
            fill: none;
            stroke: #12002A;
            stroke-width: 4;
            stroke-linecap: round;
        }
        .curve-dot { fill: #12002A; }
        .position-marker {
            fill: #ACC953;
            stroke: #12002A;
            stroke-width: 4;
        }
        .you-are-here {
            position: absolute;
            background: #ACC953;
            color: #12002A;
            padding: 8px 16px;
            border-radius: 8px;
            font-weight: bold;
            font-size: 14px;
            z-index: 200;
        }
        .footer {
            position: absolute;
            bottom: 18px;
            left: 0;
            right: 0;
            text-align: center;
            font-size: 17px;
            color: #4A4778;
            letter-spacing: 1px;
        }
        .logo-container {
            position: absolute;
            bottom: 10px;
            right: 50px;
            height: 50px;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1 class="title">AI MATURITY MODEL</h1>
        <div class="subtitle">${company} - Score: ${score.toFixed(1)}</div>

        <div class="columns-container">
            <div class="curve-container">
                <svg viewBox="0 0 1820 780" preserveAspectRatio="none">
                    <path class="curve-line" d="
                        M 182 540
                        C 280 520, 360 460, 450 420
                        S 600 350, 728 340
                        S 900 280, 1000 240
                        S 1150 170, 1274 150
                        S 1500 90, 1638 70
                    "/>
                    <circle class="curve-dot" cx="182" cy="540" r="12"/>
                    <circle class="curve-dot" cx="546" cy="420" r="12"/>
                    <circle class="curve-dot" cx="910" cy="310" r="12"/>
                    <circle class="curve-dot" cx="1274" cy="200" r="12"/>
                    <circle class="curve-dot" cx="1638" cy="95" r="12"/>
                    <!-- Position Marker -->
                    <circle class="position-marker" cx="${markerX}" cy="${markerY}" r="20"/>
                </svg>
            </div>

            <div class="column col-0 ${level === 0 ? 'current' : ''}">
                <div class="level-pill">
                    <span class="level-num">LEVEL 0</span>
                    <span class="level-name">AI-Aware</span>
                </div>
                <div class="description">
                    <strong>Early AI interest</strong> with risk of overhyping.
                    <br><br>
                    No formal AI capability. Shadow usage likely.
                </div>
            </div>

            <div class="column col-1 ${level === 1 ? 'current' : ''}">
                <div class="level-pill">
                    <span class="level-num">LEVEL 1</span>
                    <span class="level-name">Tool Adoption</span>
                </div>
                <div class="description">
                    <strong>AI experimentation</strong>, mostly isolated.
                    <br><br>
                    Approved tools deployed. Limited governance.
                </div>
            </div>

            <div class="column col-2 ${level === 2 ? 'current' : ''}">
                <div class="level-pill">
                    <span class="level-num">LEVEL 2</span>
                    <span class="level-name">Workflow Integration</span>
                </div>
                <div class="description">
                    <strong>AI in production</strong>, creating value.
                    <br><br>
                    Team-level adoption. Documented practices.
                </div>
            </div>

            <div class="column col-3 ${level === 3 ? 'current' : ''}">
                <div class="level-pill">
                    <span class="level-num">LEVEL 3</span>
                    <span class="level-name">Platform & Governance</span>
                </div>
                <div class="description">
                    <strong>AI pervasively used</strong> for transformation.
                    <br><br>
                    Enterprise platform. Formal governance.
                </div>
            </div>

            <div class="column col-4 ${level === 4 ? 'current' : ''}">
                <div class="level-pill">
                    <span class="level-num">LEVEL 4</span>
                    <span class="level-name">AI-Native Strategic</span>
                </div>
                <div class="description">
                    <strong>AI is part of business DNA.</strong>
                    <br><br>
                    Competitive differentiator. Innovation.
                </div>
            </div>
        </div>

        <div class="footer">
            Donyati AI Assessment Framework | 7 Dimensions
        </div>

        <div class="logo-container">
            <img src="${logoDataUrl}" alt="Donyati" style="height: 32px; width: auto;" />
        </div>
    </div>
</body>
</html>
    `

    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
      },
    })
  } catch (error) {
    logger.error({ err: error }, 'Error generating graphic')
    return NextResponse.json(
      { error: 'Failed to generate graphic' },
      { status: 500 }
    )
  }
}
