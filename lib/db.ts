import { neon, NeonQueryFunction } from '@neondatabase/serverless'
import logger from '@/lib/logger'

// Create a function that returns the SQL client, lazy-loading on first use
export function getDb(): NeonQueryFunction<false, false> | null {
  if (!process.env.DATABASE_URL) {
    logger.warn('DATABASE_URL not set - database features will be unavailable')
    return null
  }
  return neon(process.env.DATABASE_URL)
}

// Check if database is available
export function isDatabaseAvailable(): boolean {
  return !!process.env.DATABASE_URL
}

// For backwards compatibility, export sql as a getter function
// Note: This should be called as getDb() in queries, not as a tagged template
export const sql = getDb

// Type definitions for database records
export interface AssessmentSubmission {
  id: number
  name: string
  email: string
  company: string | null
  title: string | null
  phone: string | null
  company_size: string | null
  industry: string | null
  overall_score: number
  maturity_level: number
  maturity_name: string
  dimension_scores: DimensionScore[]
  industry_percentile: number | null
  // Tracking fields
  ip_address: string | null
  country: string | null
  city: string | null
  region: string | null
  user_agent: string | null
  referrer_url: string | null
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
  utm_term: string | null
  utm_content: string | null
  time_to_complete_seconds: number | null
  // Meeting tracking
  booking_clicked_at: Date | null
  meeting_scheduled_at: Date | null
  meeting_notes: string | null
  // Seeded flag
  is_seeded: boolean
  created_at: Date
}

export interface DimensionScore {
  dimension: string
  score: number
  questionsAnswered: number
}

// Insert a new submission
export async function insertSubmission(data: {
  name: string
  email: string
  company: string
  title?: string
  phone?: string
  companySize?: string
  industry?: string
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: DimensionScore[]
  industryPercentile?: number
  // Tracking fields
  ipAddress?: string
  country?: string
  city?: string
  region?: string
  userAgent?: string
  referrerUrl?: string
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  utmTerm?: string
  utmContent?: string
  timeToCompleteSeconds?: number
  isSeeded?: boolean
}): Promise<{ id: number }> {
  const sql = getDb()
  if (!sql) {
    throw new Error('Database not configured')
  }
  const result = await sql`
    INSERT INTO assessment_submissions (
      name, email, company, title, phone, company_size, industry,
      overall_score, maturity_level, maturity_name,
      dimension_scores, industry_percentile,
      ip_address, country, city, region, user_agent, referrer_url,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      time_to_complete_seconds, is_seeded
    ) VALUES (
      ${data.name},
      ${data.email},
      ${data.company},
      ${data.title || null},
      ${data.phone || null},
      ${data.companySize || null},
      ${data.industry || null},
      ${data.overallScore},
      ${data.maturityLevel},
      ${data.maturityName},
      ${JSON.stringify(data.dimensionScores)},
      ${data.industryPercentile || null},
      ${data.ipAddress || null},
      ${data.country || null},
      ${data.city || null},
      ${data.region || null},
      ${data.userAgent || null},
      ${data.referrerUrl || null},
      ${data.utmSource || null},
      ${data.utmMedium || null},
      ${data.utmCampaign || null},
      ${data.utmTerm || null},
      ${data.utmContent || null},
      ${data.timeToCompleteSeconds || null},
      ${data.isSeeded || false}
    )
    RETURNING id
  `
  return { id: result[0].id }
}
// Deployment trigger: 1771105900
