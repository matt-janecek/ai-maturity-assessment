import { NeonQueryFunction } from '@neondatabase/serverless'
import { getDb, AssessmentSubmission } from '@/lib/db'

// Helper to get database connection or throw
function requireDb(): NeonQueryFunction<false, false> {
  const sql = getDb()
  if (!sql) {
    throw new Error('Database not configured')
  }
  return sql
}

export interface SubmissionFilters {
  industry?: string
  search?: string
  dateFrom?: string
  dateTo?: string
  page?: number
  pageSize?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResult<T> {
  data: T[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

// Get paginated list of submissions with filters
export async function getSubmissions(
  filters: SubmissionFilters = {}
): Promise<PaginatedResult<AssessmentSubmission>> {
  const sql = requireDb()
  const {
    industry,
    search,
    dateFrom,
    dateTo,
    page = 1,
    pageSize = 20,
    sortBy = 'created_at',
    sortOrder = 'desc',
  } = filters

  const offset = (page - 1) * pageSize

  // Validate sort column to prevent SQL injection
  const validSortColumns = ['created_at', 'name', 'company', 'industry', 'overall_score', 'maturity_level']
  const safeSortBy = validSortColumns.includes(sortBy) ? sortBy : 'created_at'
  const safeSortOrder = sortOrder === 'asc' ? 'ASC' : 'DESC'

  // Build filter conditions — always use parameterized queries to avoid
  // Neon prepared statement caching issues with the is_seeded column
  const searchPattern = search ? `%${search}%` : '%'
  const fromDate = dateFrom || '1970-01-01'
  const toDate = dateTo ? `${dateTo}T23:59:59.999Z` : '2100-01-01'
  const industryFilter = industry && industry !== 'all' ? industry : null

  const countResult = await sql`
    SELECT COUNT(*) as count
    FROM assessment_submissions
    WHERE
      (${industryFilter}::text IS NULL OR industry = ${industryFilter})
      AND (name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR company ILIKE ${searchPattern})
      AND created_at >= ${fromDate}::timestamp
      AND created_at <= ${toDate}::timestamp
  `

  const data = await sql`
    SELECT id, name, email, company, title, industry,
           overall_score, maturity_level, maturity_name,
           dimension_scores, industry_percentile, is_seeded, created_at
    FROM assessment_submissions
    WHERE
      (${industryFilter}::text IS NULL OR industry = ${industryFilter})
      AND (name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR company ILIKE ${searchPattern})
      AND created_at >= ${fromDate}::timestamp
      AND created_at <= ${toDate}::timestamp
    ORDER BY created_at DESC
    LIMIT ${pageSize}
    OFFSET ${offset}
  `

  const total = parseInt(countResult[0]?.count || '0')

  return {
    data: data as AssessmentSubmission[],
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  }
}

// Get a single submission by ID
export async function getSubmissionById(id: number): Promise<AssessmentSubmission | null> {
  const sql = requireDb()
  const result = await sql`
    SELECT
      id, name, email, company, title, phone, company_size, industry,
      overall_score, maturity_level, maturity_name,
      dimension_scores, industry_percentile,
      ip_address, country, city, region, user_agent, referrer_url,
      utm_source, utm_medium, utm_campaign, utm_term, utm_content,
      time_to_complete_seconds,
      booking_clicked_at, meeting_scheduled_at, meeting_notes,
      is_seeded, created_at
    FROM assessment_submissions
    WHERE id = ${id}
  `
  return result[0] as AssessmentSubmission || null
}

// Update meeting scheduled status
export async function updateMeetingStatus(
  id: number,
  scheduled: boolean,
  notes?: string
): Promise<boolean> {
  const sql = requireDb()
  const result = await sql`
    UPDATE assessment_submissions
    SET
      meeting_scheduled_at = ${scheduled ? new Date().toISOString() : null},
      meeting_notes = ${notes || null}
    WHERE id = ${id}
    RETURNING id
  `
  return result.length > 0
}

// Record booking link click
export async function recordBookingClick(id: number): Promise<boolean> {
  const sql = requireDb()
  const result = await sql`
    UPDATE assessment_submissions
    SET booking_clicked_at = COALESCE(booking_clicked_at, ${new Date().toISOString()})
    WHERE id = ${id}
    RETURNING id
  `
  return result.length > 0
}

// Get count of seeded submissions
export async function getSeededCount(): Promise<number> {
  const sql = requireDb()
  const result = await sql`SELECT COUNT(*) as count FROM assessment_submissions WHERE is_seeded = ${true}`
  return parseInt(result[0]?.count || '0')
}

// Bulk delete submissions by IDs
export async function bulkDeleteSubmissions(ids: number[]): Promise<number> {
  const sql = requireDb()
  const result = await sql`DELETE FROM assessment_submissions WHERE id = ANY(${ids}::int[]) RETURNING id`
  return result.length
}

// Delete all seeded submissions
export async function deleteSeededSubmissions(): Promise<number> {
  const sql = requireDb()
  const result = await sql`DELETE FROM assessment_submissions WHERE is_seeded = ${true} RETURNING id`
  return result.length
}

// Delete a submission by ID
export async function deleteSubmission(id: number): Promise<boolean> {
  const sql = requireDb()
  const result = await sql`
    DELETE FROM assessment_submissions
    WHERE id = ${id}
    RETURNING id
  `
  return result.length > 0
}

// Get all submissions for export (with filters, no pagination)
export async function getAllSubmissionsForExport(
  filters: SubmissionFilters = {}
): Promise<AssessmentSubmission[]> {
  const sql = requireDb()
  const { industry, search, dateFrom, dateTo } = filters

  const searchPattern = search ? `%${search}%` : null
  const fromDate = dateFrom || null
  const toDate = dateTo ? `${dateTo}T23:59:59.999Z` : null
  const industryFilter = industry && industry !== 'all' ? industry : null

  const data = await sql`
    SELECT id, name, email, company, title, industry,
           overall_score, maturity_level, maturity_name,
           dimension_scores, industry_percentile, created_at
    FROM assessment_submissions
    WHERE
      (${industryFilter}::text IS NULL OR industry = ${industryFilter})
      AND (${searchPattern}::text IS NULL OR name ILIKE ${searchPattern} OR email ILIKE ${searchPattern} OR company ILIKE ${searchPattern})
      AND (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
    ORDER BY created_at DESC
  `

  return data as AssessmentSubmission[]
}

// Analytics queries
export interface AnalyticsData {
  totalSubmissions: number
  averageScore: number
  submissionsByIndustry: { industry: string; count: number }[]
  submissionsByMaturityLevel: { level: number; name: string; count: number }[]
  scoreDistribution: { range: string; count: number }[]
  recentTrend: { date: string; count: number }[]
}

export async function getAnalytics(dateFrom?: string, dateTo?: string): Promise<AnalyticsData> {
  const sql = requireDb()
  const fromDate = dateFrom || null
  const toDate = dateTo ? `${dateTo}T23:59:59.999Z` : null

  // Total submissions and average score
  const summary = await sql`
    SELECT
      COUNT(*) as total,
      COALESCE(AVG(overall_score), 0) as avg_score
    FROM assessment_submissions
    WHERE
      (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
  `
  const totalSubmissions = parseInt(summary[0]?.total || '0')
  const averageScore = parseFloat(summary[0]?.avg_score || '0')

  // Submissions by industry
  const industryData = await sql`
    SELECT
      COALESCE(industry, 'general') as industry,
      COUNT(*) as count
    FROM assessment_submissions
    WHERE
      (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
    GROUP BY industry
    ORDER BY count DESC
  `

  // Submissions by maturity level
  const maturityData = await sql`
    SELECT
      maturity_level as level,
      maturity_name as name,
      COUNT(*) as count
    FROM assessment_submissions
    WHERE
      (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
    GROUP BY maturity_level, maturity_name
    ORDER BY maturity_level
  `

  // Score distribution (in ranges)
  const range0 = await sql`
    SELECT COUNT(*) as count FROM assessment_submissions
    WHERE overall_score >= 0 AND overall_score < 1
      AND (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
  `
  const range1 = await sql`
    SELECT COUNT(*) as count FROM assessment_submissions
    WHERE overall_score >= 1 AND overall_score < 2
      AND (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
  `
  const range2 = await sql`
    SELECT COUNT(*) as count FROM assessment_submissions
    WHERE overall_score >= 2 AND overall_score < 3
      AND (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
  `
  const range3 = await sql`
    SELECT COUNT(*) as count FROM assessment_submissions
    WHERE overall_score >= 3 AND overall_score <= 4.1
      AND (${fromDate}::text IS NULL OR created_at >= ${fromDate}::timestamp)
      AND (${toDate}::text IS NULL OR created_at <= ${toDate}::timestamp)
  `

  const scoreDistribution = [
    { range: '0-1', count: parseInt(range0[0]?.count || '0') },
    { range: '1-2', count: parseInt(range1[0]?.count || '0') },
    { range: '2-3', count: parseInt(range2[0]?.count || '0') },
    { range: '3-4', count: parseInt(range3[0]?.count || '0') },
  ]

  // Recent trend (last 30 days)
  const recentTrend = await sql`
    SELECT
      DATE(created_at) as date,
      COUNT(*) as count
    FROM assessment_submissions
    WHERE created_at >= NOW() - INTERVAL '30 days'
    GROUP BY DATE(created_at)
    ORDER BY date
  `

  return {
    totalSubmissions,
    averageScore,
    submissionsByIndustry: (industryData as { industry: string; count: string }[]).map((r) => ({
      industry: r.industry,
      count: parseInt(r.count),
    })),
    submissionsByMaturityLevel: (maturityData as { level: number; name: string; count: string }[]).map((r) => ({
      level: r.level,
      name: r.name,
      count: parseInt(r.count),
    })),
    scoreDistribution,
    recentTrend: (recentTrend as { date: string; count: string }[]).map((r) => ({
      date: r.date,
      count: parseInt(r.count),
    })),
  }
}
