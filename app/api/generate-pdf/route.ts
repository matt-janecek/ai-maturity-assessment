import { NextRequest, NextResponse } from 'next/server'
import { type Industry } from '@/lib/industries'

interface LeadInfo {
  name: string
  email: string
  company: string
  title?: string
}

interface DimensionScore {
  dimension: string
  score: number
  questionsAnswered: number
}

interface AssessmentResult {
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: DimensionScore[]
  industry?: Industry
  industryBenchmark?: number
  industryPercentile?: number
}

interface PDFRequest {
  result: AssessmentResult
  leadInfo: LeadInfo
}

const industryNames: Record<Industry, string> = {
  'financial-services': 'Financial Services',
  'healthcare': 'Healthcare & Life Sciences',
  'manufacturing': 'Manufacturing',
  'retail': 'Retail & Consumer Goods',
  'technology': 'Technology & Software',
  'professional-services': 'Professional Services',
  'energy-utilities': 'Energy & Utilities',
  'government': 'Government & Public Sector',
  'education': 'Education',
  'media-entertainment': 'Media & Entertainment',
  'transportation-logistics': 'Transportation & Logistics',
  'general': 'General / Other',
}

// Generate a simple HTML-based PDF summary
// In production, you'd use a library like @react-pdf/renderer or puppeteer
export async function POST(request: NextRequest) {
  try {
    const { result, leadInfo }: PDFRequest = await request.json()

    const levelDescriptions: Record<number, string> = {
      0: 'Early AI interest with risk of overhyping. No formal AI capability.',
      1: 'AI experimentation in isolated contexts. Approved tools deployed.',
      2: 'AI in production, creating value. Team-level adoption.',
      3: 'AI pervasively used for transformation. Enterprise platform.',
      4: 'AI is part of business DNA. Competitive differentiator.',
    }

    const industryDisplay = result.industry ? industryNames[result.industry] : null
    const percentileDisplay = result.industryPercentile !== undefined
      ? result.industryPercentile
      : null

    const industrySection = industryDisplay && industryDisplay !== 'General / Other' ? `
      <div class="industry-badge">
        <span class="industry-label">Industry:</span>
        <span class="industry-name">${industryDisplay}</span>
      </div>
    ` : ''

    const benchmarkSection = percentileDisplay !== null && result.industryBenchmark !== undefined ? `
      <div class="benchmark-section">
        <h2>Industry Comparison</h2>
        <div class="benchmark-stats">
          <div class="stat">
            <div class="stat-value">${percentileDisplay}th</div>
            <div class="stat-label">Percentile</div>
          </div>
          <div class="stat">
            <div class="stat-value">${result.industryBenchmark.toFixed(1)}</div>
            <div class="stat-label">Industry Avg</div>
          </div>
          <div class="stat">
            <div class="stat-value">${result.overallScore.toFixed(1)}</div>
            <div class="stat-label">Your Score</div>
          </div>
        </div>
        <p class="benchmark-note">Compared to ${industryDisplay} organizations</p>
      </div>
    ` : ''

    const html = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>AI Maturity Assessment - ${leadInfo.company}</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: #12002A;
      line-height: 1.6;
      padding: 40px;
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
      padding-bottom: 20px;
      border-bottom: 2px solid #E8DEF6;
    }
    .logo { font-size: 28px; font-weight: bold; color: #12002A; }
    .date { color: #4A4778; font-size: 14px; }
    h1 { font-size: 32px; margin-bottom: 10px; }
    h2 { font-size: 20px; color: #45266C; margin: 30px 0 15px; }
    .subtitle { color: #4A4778; font-size: 18px; margin-bottom: 20px; }
    .industry-badge {
      background: linear-gradient(135deg, #f8f7fc 0%, #E8DEF6 100%);
      padding: 12px 20px;
      border-radius: 8px;
      display: inline-block;
      margin-bottom: 30px;
    }
    .industry-label { color: #4A4778; margin-right: 8px; }
    .industry-name { font-weight: bold; color: #45266C; }
    .score-section {
      background: linear-gradient(180deg, #f8f7fc 0%, #ffffff 100%);
      border-radius: 16px;
      padding: 30px;
      text-align: center;
      margin-bottom: 30px;
    }
    .score-value {
      font-size: 64px;
      font-weight: bold;
      color: #45266C;
    }
    .score-label { color: #4A4778; margin-bottom: 20px; }
    .level-badge {
      display: inline-block;
      padding: 12px 24px;
      border-radius: 50px;
      color: white;
      font-weight: bold;
      margin-bottom: 15px;
    }
    .level-0 { background: linear-gradient(135deg, #B8D458 0%, #9BBF3B 100%); }
    .level-1 { background: linear-gradient(135deg, #E8A84C 0%, #D4922A 100%); }
    .level-2 { background: linear-gradient(135deg, #5D9CEC 0%, #4A89DC 100%); }
    .level-3 { background: linear-gradient(135deg, #6B5B95 0%, #524678 100%); }
    .level-4 { background: linear-gradient(135deg, #9B59B6 0%, #8E44AD 100%); }
    .level-description { color: #4A4778; max-width: 500px; margin: 0 auto; }
    .benchmark-section {
      background: linear-gradient(135deg, #f8f7fc 0%, #ffffff 100%);
      border-radius: 16px;
      padding: 25px;
      margin-bottom: 30px;
      text-align: center;
    }
    .benchmark-section h2 { margin: 0 0 20px 0; }
    .benchmark-stats {
      display: flex;
      justify-content: center;
      gap: 40px;
      margin-bottom: 15px;
    }
    .stat { text-align: center; }
    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #45266C;
    }
    .stat-label { color: #4A4778; font-size: 14px; }
    .benchmark-note { color: #4A4778; font-size: 12px; }
    .dimensions-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 15px;
    }
    .dimensions-table th, .dimensions-table td {
      padding: 12px 16px;
      text-align: left;
      border-bottom: 1px solid #E8DEF6;
    }
    .dimensions-table th {
      background: #f8f7fc;
      font-weight: 600;
      color: #45266C;
    }
    .score-bar {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .score-bar-track {
      flex: 1;
      height: 8px;
      background: #E8DEF6;
      border-radius: 4px;
      overflow: hidden;
    }
    .score-bar-fill {
      height: 100%;
      border-radius: 4px;
    }
    .cta-section {
      background: linear-gradient(135deg, #45266C 0%, #4A4778 100%);
      border-radius: 16px;
      padding: 30px;
      color: white;
      text-align: center;
      margin-top: 40px;
    }
    .cta-section h3 { color: white; font-size: 24px; margin-bottom: 10px; }
    .cta-section p { opacity: 0.9; margin-bottom: 20px; }
    .cta-button {
      display: inline-block;
      background: #ACC953;
      color: #12002A;
      padding: 12px 30px;
      border-radius: 50px;
      font-weight: bold;
      text-decoration: none;
    }
    .footer {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px solid #E8DEF6;
      text-align: center;
      color: #4A4778;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="logo">Donyati</div>
    <div class="date">${new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
  </div>

  <h1>AI Maturity Assessment Results</h1>
  <div class="subtitle">Assessment for ${leadInfo.company}</div>
  ${industrySection}

  <div class="score-section">
    <div class="score-value">${result.overallScore.toFixed(1)}</div>
    <div class="score-label">out of 4.0</div>
    <div class="level-badge level-${result.maturityLevel}">
      Level ${result.maturityLevel} - ${result.maturityName}
    </div>
    <p class="level-description">${levelDescriptions[result.maturityLevel]}</p>
  </div>

  ${benchmarkSection}

  <h2>Dimension Breakdown</h2>
  <table class="dimensions-table">
    <thead>
      <tr>
        <th>Dimension</th>
        <th>Score</th>
        <th>Progress</th>
      </tr>
    </thead>
    <tbody>
      ${result.dimensionScores.map(ds => {
        const barColors: Record<number, string> = {
          0: '#B8D458', 1: '#E8A84C', 2: '#5D9CEC', 3: '#6B5B95', 4: '#9B59B6'
        }
        const level = ds.score < 1 ? 0 : ds.score < 2 ? 1 : ds.score < 3 ? 2 : ds.score < 3.5 ? 3 : 4
        return `
        <tr>
          <td>${ds.dimension}</td>
          <td><strong>${ds.score.toFixed(1)}</strong></td>
          <td>
            <div class="score-bar">
              <div class="score-bar-track">
                <div class="score-bar-fill" style="width: ${(ds.score / 4) * 100}%; background: ${barColors[level]};"></div>
              </div>
            </div>
          </td>
        </tr>
        `
      }).join('')}
    </tbody>
  </table>

  <div class="cta-section">
    <h3>Ready for a Full Assessment?</h3>
    <p>Get detailed recommendations and a customized roadmap for your AI journey.</p>
    <a href="https://outlook.office.com/book/Assessments@donyati.com/" class="cta-button">Schedule Consultation</a>
  </div>

  <div class="footer">
    <p>Donyati AI Assessment Framework | 7 Dimensions</p>
    <p>© 2026 Donyati. All rights reserved.</p>
  </div>
</body>
</html>
    `

    // Return HTML content as a downloadable HTML file
    // In production, you'd convert this to actual PDF using puppeteer or similar
    return new NextResponse(html, {
      headers: {
        'Content-Type': 'text/html',
        'Content-Disposition': `attachment; filename="AI-Maturity-Assessment-${leadInfo.company.replace(/\s+/g, '-')}.html"`,
      },
    })
  } catch (error) {
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
