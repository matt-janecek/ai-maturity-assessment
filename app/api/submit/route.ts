import { NextRequest, NextResponse } from 'next/server'
import { type Industry } from '@/lib/industries'
import { insertSubmission } from '@/lib/db'

// Environment variable for Resend API key (optional - if not set, logs only)
const RESEND_API_KEY = process.env.RESEND_API_KEY
const DATABASE_URL = process.env.DATABASE_URL
const NOTIFICATION_EMAIL = process.env.NOTIFICATION_EMAIL || 'leads@donyati.com'
const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@donyati.com'

interface LeadInfo {
  name: string
  email: string
  company: string
  title?: string
  phone?: string
  companySize?: string
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

interface TrackingData {
  referrerUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  startTime?: string // ISO timestamp when assessment started
}

interface SubmitPayload {
  lead: LeadInfo
  result: AssessmentResult
  industry?: Industry
  timestamp: string
  includesOptional?: boolean
  tracking?: TrackingData
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

// Get IP address from request headers
function getClientIP(request: NextRequest): string | undefined {
  // Try various headers that might contain the real IP
  const forwardedFor = request.headers.get('x-forwarded-for')
  if (forwardedFor) {
    // x-forwarded-for can contain multiple IPs, take the first one
    return forwardedFor.split(',')[0].trim()
  }

  const realIP = request.headers.get('x-real-ip')
  if (realIP) {
    return realIP
  }

  // Vercel-specific header
  const vercelForwardedFor = request.headers.get('x-vercel-forwarded-for')
  if (vercelForwardedFor) {
    return vercelForwardedFor.split(',')[0].trim()
  }

  return undefined
}

// Get geolocation data from IP using free ip-api.com service
async function getGeoLocation(ip: string): Promise<{
  country?: string
  city?: string
  region?: string
} | null> {
  // Skip for localhost/private IPs
  if (ip === '127.0.0.1' || ip === '::1' || ip.startsWith('192.168.') || ip.startsWith('10.')) {
    return null
  }

  try {
    const response = await fetch(`http://ip-api.com/json/${ip}?fields=status,country,regionName,city`, {
      // Set a short timeout to not slow down submission
      signal: AbortSignal.timeout(2000),
    })

    if (!response.ok) return null

    const data = await response.json()
    if (data.status === 'success') {
      return {
        country: data.country,
        city: data.city,
        region: data.regionName,
      }
    }
  } catch (error) {
    console.warn('Geolocation lookup failed:', error)
  }

  return null
}

// Calculate time to complete in seconds
function calculateTimeToComplete(startTime?: string, endTime?: string): number | undefined {
  if (!startTime || !endTime) return undefined

  const start = new Date(startTime).getTime()
  const end = new Date(endTime).getTime()

  if (isNaN(start) || isNaN(end)) return undefined

  const seconds = Math.round((end - start) / 1000)
  return seconds > 0 ? seconds : undefined
}

export async function POST(request: NextRequest) {
  try {
    const payload: SubmitPayload = await request.json()
    const { lead, result, industry, timestamp, includesOptional, tracking } = payload

    // Extract tracking data from request
    const ipAddress = getClientIP(request)
    const userAgent = request.headers.get('user-agent') || undefined

    // Get geolocation (async, but don't let it block submission)
    let geoData: { country?: string; city?: string; region?: string } | null = null
    if (ipAddress) {
      geoData = await getGeoLocation(ipAddress)
    }

    // Calculate time to complete
    const timeToComplete = calculateTimeToComplete(tracking?.startTime, timestamp)

    // Log the lead (always)
    console.log('=== New Assessment Lead ===')
    console.log('Timestamp:', timestamp)
    console.log('Name:', lead.name)
    console.log('Email:', lead.email)
    console.log('Company:', lead.company)
    console.log('Title:', lead.title || 'Not provided')
    console.log('Phone:', lead.phone || 'Not provided')
    console.log('Company Size:', lead.companySize || 'Not provided')
    console.log('Industry:', industry ? industryNames[industry] : 'Not specified')
    console.log('Overall Score:', result.overallScore)
    console.log('Maturity Level:', result.maturityLevel, '-', result.maturityName)
    if (result.industryPercentile !== undefined) {
      console.log('Industry Percentile:', result.industryPercentile + 'th')
    }
    console.log('Includes Optional Questions:', includesOptional || false)
    console.log('--- Tracking Data ---')
    console.log('IP Address:', ipAddress || 'Unknown')
    console.log('Location:', geoData ? `${geoData.city}, ${geoData.region}, ${geoData.country}` : 'Unknown')
    console.log('User Agent:', userAgent || 'Unknown')
    console.log('Referrer:', tracking?.referrerUrl || 'Direct')
    console.log('UTM Source:', tracking?.utmSource || 'None')
    console.log('Time to Complete:', timeToComplete ? `${Math.round(timeToComplete / 60)} minutes` : 'Unknown')
    console.log('Dimension Scores:')
    result.dimensionScores.forEach(ds => {
      console.log(`  - ${ds.dimension}: ${ds.score}`)
    })
    console.log('===========================')

    // Save to database if configured
    let submissionId: number | null = null
    if (DATABASE_URL) {
      try {
        const dbResult = await insertSubmission({
          name: lead.name,
          email: lead.email,
          company: lead.company,
          title: lead.title,
          phone: lead.phone,
          companySize: lead.companySize,
          industry: industry,
          overallScore: result.overallScore,
          maturityLevel: result.maturityLevel,
          maturityName: result.maturityName,
          dimensionScores: result.dimensionScores,
          industryPercentile: result.industryPercentile,
          // Tracking fields
          ipAddress,
          country: geoData?.country,
          city: geoData?.city,
          region: geoData?.region,
          userAgent,
          referrerUrl: tracking?.referrerUrl,
          utmSource: tracking?.utmSource,
          utmMedium: tracking?.utmMedium,
          utmCampaign: tracking?.utmCampaign,
          utmTerm: tracking?.utmTerm,
          utmContent: tracking?.utmContent,
          timeToCompleteSeconds: timeToComplete,
        })
        submissionId = dbResult.id
        console.log('Saved to database with ID:', dbResult.id)
      } catch (dbError) {
        console.error('Error saving to database:', dbError)
        // Don't fail the request if DB save fails - continue with email
      }
    }

    // Send email notification if Resend is configured
    if (RESEND_API_KEY) {
      await sendEmailNotification(lead, result, industry, timestamp, includesOptional, geoData, tracking)
    }

    return NextResponse.json({ success: true, submissionId })
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
  includesOptional?: boolean,
  geoData?: { country?: string; city?: string; region?: string } | null,
  tracking?: TrackingData
) {
  const industryDisplay = industry ? industryNames[industry] : 'Not specified'
  const percentileDisplay = result.industryPercentile !== undefined
    ? `${result.industryPercentile}th percentile`
    : 'N/A'
  const locationDisplay = geoData
    ? `${geoData.city || 'Unknown'}, ${geoData.region || ''}, ${geoData.country || 'Unknown'}`.replace(/, ,/g, ',')
    : 'Unknown'

  const htmlContent = `
    <h2>New AI Assessment Lead</h2>

    <h3>Contact Information</h3>
    <ul>
      <li><strong>Name:</strong> ${lead.name}</li>
      <li><strong>Email:</strong> ${lead.email}</li>
      <li><strong>Company:</strong> ${lead.company}</li>
      <li><strong>Title:</strong> ${lead.title || 'Not provided'}</li>
      <li><strong>Phone:</strong> ${lead.phone || 'Not provided'}</li>
      <li><strong>Company Size:</strong> ${lead.companySize || 'Not provided'}</li>
      <li><strong>Location:</strong> ${locationDisplay}</li>
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

    ${tracking?.utmSource ? `
    <h3>Marketing Attribution</h3>
    <ul>
      <li><strong>Source:</strong> ${tracking.utmSource}</li>
      ${tracking.utmMedium ? `<li><strong>Medium:</strong> ${tracking.utmMedium}</li>` : ''}
      ${tracking.utmCampaign ? `<li><strong>Campaign:</strong> ${tracking.utmCampaign}</li>` : ''}
      ${tracking.referrerUrl ? `<li><strong>Referrer:</strong> ${tracking.referrerUrl}</li>` : ''}
    </ul>
    ` : ''}

    <p style="margin-top: 20px; color: #666;">
      Assessment completed at ${timestamp ? new Date(timestamp).toLocaleString() : 'Unknown'}
    </p>

    <div style="margin-top: 30px; padding: 20px; background-color: #f5f3fa; border-radius: 8px;">
      <h3 style="margin-top: 0; color: #45266C;">Quick Actions</h3>
      <p>
        <a href="mailto:${lead.email}?subject=Your%20AI%20Maturity%20Assessment%20Results&body=Hi%20${encodeURIComponent(lead.name)},%0A%0AThank%20you%20for%20completing%20the%20AI%20Maturity%20Assessment.%20I'd%20love%20to%20discuss%20your%20results%20and%20how%20Donyati%20can%20help%20accelerate%20your%20AI%20journey.%0A%0ASchedule%20a%20free%20consultation:%20https://outlook.office.com/book/Assessments@donyati.com/?ismsaljsauthenabled%0A%0ABest%20regards"
           style="display: inline-block; padding: 10px 20px; background-color: #45266C; color: white; text-decoration: none; border-radius: 5px; margin-right: 10px;">
          📧 Email Lead
        </a>
        <a href="https://outlook.office.com/book/Assessments@donyati.com/?ismsaljsauthenabled"
           style="display: inline-block; padding: 10px 20px; background-color: #ACC953; color: #12002A; text-decoration: none; border-radius: 5px;">
          📅 Bookings Page
        </a>
      </p>
    </div>
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
