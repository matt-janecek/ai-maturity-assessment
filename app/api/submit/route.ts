import { NextRequest, NextResponse } from 'next/server'
import { type Industry } from '@/lib/industries'

// Environment variable for Resend API key (optional - if not set, logs only)
const RESEND_API_KEY = process.env.RESEND_API_KEY
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'leads@donyati.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@donyati.com'

interface LeadInfo {
  name: string
  email: string
  company: string
  title?: string
}

interface AssessmentResult {
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: Array<{
    dimension: string
    score: number
    questionsAnswered: number
  }>
  industry?: Industry
  industryBenchmark?: number
  industryPercentile?: number
}

interface SubmitPayload {
  lead: LeadInfo
  result: AssessmentResult
  industry?: Industry
  timestamp: string
  includesOptional?: boolean
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

export async function POST(request: NextRequest) {
  try {
    const payload: SubmitPayload = await request.json()
    const { lead, result, industry, timestamp, includesOptional } = payload

    // Log the lead (always)
    console.log('=== New Assessment Lead ===')
    console.log('Timestamp:', timestamp)
    console.log('Name:', lead.name)
    console.log('Email:', lead.email)
    console.log('Company:', lead.company)
    console.log('Title:', lead.title || 'Not provided')
    console.log('Industry:', industry ? industryNames[industry] : 'Not specified')
    console.log('Overall Score:', result.overallScore)
    console.log('Maturity Level:', result.maturityLevel, '-', result.maturityName)
    if (result.industryPercentile !== undefined) {
      console.log('Industry Percentile:', result.industryPercentile + 'th')
    }
    console.log('Includes Optional Questions:', includesOptional || false)
    console.log('Dimension Scores:')
    result.dimensionScores.forEach(ds => {
      console.log(`  - ${ds.dimension}: ${ds.score}`)
    })
    console.log('===========================')

    // Send email notification if Resend is configured
    if (RESEND_API_KEY) {
      await sendEmailNotification(lead, result, industry, timestamp, includesOptional)
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error processing submission:', error)
    return NextResponse.json(
      { error: 'Failed to process submission' },
      { status: 500 }
    )
  }
}

async function sendEmailNotification(
  lead: LeadInfo,
  result: AssessmentResult,
  industry?: Industry,
  timestamp?: string,
  includesOptional?: boolean
) {
  const industryDisplay = industry ? industryNames[industry] : 'Not specified'
  const percentileDisplay = result.industryPercentile !== undefined
    ? `${result.industryPercentile}th percentile`
    : 'N/A'

  const htmlContent = `
    <h2>New AI Assessment Lead</h2>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${lead.name}</li>
      <li><strong>Email:</strong> ${lead.email}</li>
      <li><strong>Company:</strong> ${lead.company}</li>
      <li><strong>Title:</strong> ${lead.title || 'Not provided'}</li>
    </ul>

    <h3>Assessment Results</h3>
    <ul>
      <li><strong>Industry:</strong> ${industryDisplay}</li>
      <li><strong>Overall Score:</strong> ${result.overallScore.toFixed(2)} / 4.0</li>
      <li><strong>Maturity Level:</strong> Level ${result.maturityLevel} - ${result.maturityName}</li>
      <li><strong>Industry Percentile:</strong> ${percentileDisplay}</li>
      <li><strong>Questions Answered:</strong> ${includesOptional ? '14 (with deep-dive)' : '7 (core only)'}</li>
    </ul>

    <h3>Dimension Scores</h3>
    <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
      <tr style="background-color: #f5f3fa;">
        <th>Dimension</th>
        <th>Score</th>
      </tr>
      ${result.dimensionScores.map(ds => `
        <tr>
          <td>${ds.dimension}</td>
          <td>${ds.score.toFixed(1)}</td>
        </tr>
      `).join('')}
    </table>

    <p style="margin-top: 20px; color: #666;">
      Assessment completed at ${timestamp ? new Date(timestamp).toLocaleString() : 'Unknown'}
    </p>
  `

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: NOTIFICATION_EMAIL,
        subject: `New AI Assessment: ${lead.company} (Level ${result.maturityLevel}) - ${industryDisplay}`,
        html: htmlContent,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Resend API error:', errorText)
    }
  } catch (error) {
    console.error('Error sending email:', error)
  }
}
