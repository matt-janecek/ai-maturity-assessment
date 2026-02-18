import { z } from 'zod'
import { INDUSTRIES } from './industries'

// Re-usable pieces
const industryEnum = z.enum(INDUSTRIES)

const dimensionScoreSchema = z.object({
  dimension: z.string().min(1),
  score: z.number().min(0).max(4),
  questionsAnswered: z.number().int().min(0),
})

// --- Public route schemas ---

export const submitSchema = z.object({
  lead: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email().max(255),
    company: z.string().min(1).max(255),
    title: z.string().max(255).optional(),
    phone: z.string().max(50).optional(),
    companySize: z.string().max(50).optional(),
  }),
  result: z.object({
    overallScore: z.number().min(0).max(4),
    maturityLevel: z.number().int().min(0).max(4),
    maturityName: z.string().min(1),
    dimensionScores: z.array(dimensionScoreSchema).min(1).max(10),
    industry: industryEnum.optional(),
    industryBenchmark: z.number().optional(),
    industryPercentile: z.number().int().min(0).max(100).optional(),
  }),
  industry: industryEnum.optional(),
  timestamp: z.string().datetime({ offset: true }).or(z.string().datetime()),
  includesOptional: z.boolean().optional(),
  tracking: z.object({
    referrerUrl: z.string().url().max(2048).optional(),
    utmSource: z.string().max(255).optional(),
    utmMedium: z.string().max(255).optional(),
    utmCampaign: z.string().max(255).optional(),
    utmTerm: z.string().max(255).optional(),
    utmContent: z.string().max(255).optional(),
    startTime: z.string().optional(),
  }).optional(),
})

export const generatePdfSchema = z.object({
  result: z.object({
    overallScore: z.number().min(0).max(4),
    maturityLevel: z.number().int().min(0).max(4),
    maturityName: z.string().min(1),
    dimensionScores: z.array(dimensionScoreSchema).min(1),
    industry: industryEnum.optional(),
    industryBenchmark: z.number().optional(),
    industryPercentile: z.number().int().min(0).max(100).optional(),
  }),
  leadInfo: z.object({
    name: z.string().min(1).max(255),
    email: z.string().email().max(255),
    company: z.string().min(1).max(255),
    title: z.string().max(255).optional(),
  }),
})

export const generateGraphicSchema = z.object({
  score: z.number().min(0).max(4),
  level: z.number().int().min(0).max(4),
  company: z.string().min(1).max(255),
})

export const trackBookingSchema = z.object({
  submissionId: z.number().int().positive(),
})

// --- Admin route schemas ---

const ALLOWED_SORT_COLUMNS = [
  'created_at', 'name', 'company', 'industry', 'overall_score', 'maturity_level',
] as const

export const submissionsQuerySchema = z.object({
  industry: z.string().optional(),
  search: z.string().max(200).optional(),
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: z.enum(ALLOWED_SORT_COLUMNS).default('created_at'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
})

export const meetingUpdateSchema = z.object({
  scheduled: z.boolean(),
  notes: z.string().max(5000).optional(),
})

export const bulkDeleteSchema = z.union([
  z.object({ action: z.literal('delete-seeded') }),
  z.object({ ids: z.array(z.number().int().positive()).min(1).max(500) }),
])

export const settingsUpdateSchema = z.object({
  industryStepEnabled: z.boolean(),
  disabledIndustries: z.array(z.string()),
})

// Helper to format Zod errors into a concise message
export function formatZodError(error: z.ZodError): string {
  return error.issues.map(i => `${i.path.join('.')}: ${i.message}`).join('; ')
}
