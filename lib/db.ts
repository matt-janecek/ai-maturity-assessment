import { neon, NeonQueryFunction } from '@neondatabase/serverless'

// Create a function that returns the SQL client, lazy-loading on first use
export function getDb(): NeonQueryFunction<false, false> | null {
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not set - database features will be unavailable')
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
  industry: string | null
  overall_score: number
  maturity_level: number
  maturity_name: string
  dimension_scores: DimensionScore[]
  industry_percentile: number | null
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
  industry?: string
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: DimensionScore[]
  industryPercentile?: number
}): Promise<{ id: number }> {
  const sql = getDb()
  if (!sql) {
    throw new Error('Database not configured')
  }
  const result = await sql`
    INSERT INTO assessment_submissions (
      name, email, company, title, industry,
      overall_score, maturity_level, maturity_name,
      dimension_scores, industry_percentile
    ) VALUES (
      ${data.name},
      ${data.email},
      ${data.company},
      ${data.title || null},
      ${data.industry || null},
      ${data.overallScore},
      ${data.maturityLevel},
      ${data.maturityName},
      ${JSON.stringify(data.dimensionScores)},
      ${data.industryPercentile || null}
    )
    RETURNING id
  `
  return { id: result[0].id }
}
