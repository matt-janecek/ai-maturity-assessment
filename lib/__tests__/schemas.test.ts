import { describe, it, expect } from 'vitest'
import {
  submitSchema,
  generatePdfSchema,
  generateGraphicSchema,
  trackBookingSchema,
  submissionsQuerySchema,
  meetingUpdateSchema,
  bulkDeleteSchema,
  settingsUpdateSchema,
  formatZodError,
} from '../schemas'

// --- submitSchema ---

describe('submitSchema', () => {
  const validSubmit = {
    lead: {
      name: 'Jane Doe',
      email: 'jane@example.com',
      company: 'Acme Corp',
    },
    result: {
      overallScore: 2.5,
      maturityLevel: 2,
      maturityName: 'Workflow Integration',
      dimensionScores: [
        { dimension: 'Governance & Risk', score: 2.3, questionsAnswered: 2 },
      ],
    },
    timestamp: '2025-01-15T10:00:00Z',
  }

  it('accepts valid minimal payload', () => {
    const result = submitSchema.safeParse(validSubmit)
    expect(result.success).toBe(true)
  })

  it('accepts valid payload with all optional fields', () => {
    const full = {
      ...validSubmit,
      lead: {
        ...validSubmit.lead,
        title: 'CTO',
        phone: '555-0100',
        companySize: '100-500',
      },
      industry: 'technology',
      includesOptional: true,
      tracking: {
        referrerUrl: 'https://google.com',
        utmSource: 'linkedin',
        utmMedium: 'social',
        utmCampaign: 'q1-launch',
        startTime: '2025-01-15T09:50:00Z',
      },
    }
    const result = submitSchema.safeParse(full)
    expect(result.success).toBe(true)
  })

  it('rejects missing lead.name', () => {
    const bad = { ...validSubmit, lead: { ...validSubmit.lead, name: '' } }
    const result = submitSchema.safeParse(bad)
    expect(result.success).toBe(false)
  })

  it('rejects invalid email', () => {
    const bad = { ...validSubmit, lead: { ...validSubmit.lead, email: 'not-an-email' } }
    const result = submitSchema.safeParse(bad)
    expect(result.success).toBe(false)
  })

  it('rejects overallScore > 4', () => {
    const bad = {
      ...validSubmit,
      result: { ...validSubmit.result, overallScore: 5 },
    }
    const result = submitSchema.safeParse(bad)
    expect(result.success).toBe(false)
  })

  it('rejects invalid industry value', () => {
    const bad = { ...validSubmit, industry: 'not-a-real-industry' }
    const result = submitSchema.safeParse(bad)
    expect(result.success).toBe(false)
  })

  it('rejects empty dimensionScores array', () => {
    const bad = {
      ...validSubmit,
      result: { ...validSubmit.result, dimensionScores: [] },
    }
    const result = submitSchema.safeParse(bad)
    expect(result.success).toBe(false)
  })
})

// --- generatePdfSchema ---

describe('generatePdfSchema', () => {
  const valid = {
    result: {
      overallScore: 3.1,
      maturityLevel: 3,
      maturityName: 'Platform & Governance',
      dimensionScores: [
        { dimension: 'Data & Model Lifecycle', score: 3.0, questionsAnswered: 2 },
      ],
    },
    leadInfo: {
      name: 'John Smith',
      email: 'john@test.com',
      company: 'Test Inc',
    },
  }

  it('accepts valid payload', () => {
    expect(generatePdfSchema.safeParse(valid).success).toBe(true)
  })

  it('rejects missing leadInfo.company', () => {
    const bad = { ...valid, leadInfo: { name: 'John', email: 'j@t.com' } }
    expect(generatePdfSchema.safeParse(bad).success).toBe(false)
  })
})

// --- generateGraphicSchema ---

describe('generateGraphicSchema', () => {
  it('accepts valid payload', () => {
    expect(generateGraphicSchema.safeParse({ score: 2.5, level: 2, company: 'Acme' }).success).toBe(true)
  })

  it('rejects score > 4', () => {
    expect(generateGraphicSchema.safeParse({ score: 5, level: 2, company: 'Acme' }).success).toBe(false)
  })

  it('rejects non-integer level', () => {
    expect(generateGraphicSchema.safeParse({ score: 2.5, level: 2.5, company: 'Acme' }).success).toBe(false)
  })

  it('rejects empty company', () => {
    expect(generateGraphicSchema.safeParse({ score: 2.5, level: 2, company: '' }).success).toBe(false)
  })
})

// --- trackBookingSchema ---

describe('trackBookingSchema', () => {
  it('accepts valid positive integer', () => {
    expect(trackBookingSchema.safeParse({ submissionId: 42 }).success).toBe(true)
  })

  it('rejects zero', () => {
    expect(trackBookingSchema.safeParse({ submissionId: 0 }).success).toBe(false)
  })

  it('rejects negative', () => {
    expect(trackBookingSchema.safeParse({ submissionId: -1 }).success).toBe(false)
  })

  it('rejects non-integer', () => {
    expect(trackBookingSchema.safeParse({ submissionId: 1.5 }).success).toBe(false)
  })

  it('rejects string', () => {
    expect(trackBookingSchema.safeParse({ submissionId: '42' }).success).toBe(false)
  })
})

// --- submissionsQuerySchema ---

describe('submissionsQuerySchema', () => {
  it('accepts empty object with defaults', () => {
    const result = submissionsQuerySchema.safeParse({})
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(1)
      expect(result.data.pageSize).toBe(20)
      expect(result.data.sortBy).toBe('created_at')
      expect(result.data.sortOrder).toBe('desc')
    }
  })

  it('coerces string page/pageSize to numbers', () => {
    const result = submissionsQuerySchema.safeParse({ page: '3', pageSize: '50' })
    expect(result.success).toBe(true)
    if (result.success) {
      expect(result.data.page).toBe(3)
      expect(result.data.pageSize).toBe(50)
    }
  })

  it('rejects invalid sortBy column', () => {
    expect(submissionsQuerySchema.safeParse({ sortBy: 'hacker_column' }).success).toBe(false)
  })

  it('rejects pageSize > 100', () => {
    expect(submissionsQuerySchema.safeParse({ pageSize: '200' }).success).toBe(false)
  })
})

// --- meetingUpdateSchema ---

describe('meetingUpdateSchema', () => {
  it('accepts scheduled true with notes', () => {
    expect(meetingUpdateSchema.safeParse({ scheduled: true, notes: 'Call at 2pm' }).success).toBe(true)
  })

  it('accepts scheduled false without notes', () => {
    expect(meetingUpdateSchema.safeParse({ scheduled: false }).success).toBe(true)
  })

  it('rejects missing scheduled field', () => {
    expect(meetingUpdateSchema.safeParse({ notes: 'hello' }).success).toBe(false)
  })
})

// --- bulkDeleteSchema ---

describe('bulkDeleteSchema', () => {
  it('accepts delete-seeded action', () => {
    expect(bulkDeleteSchema.safeParse({ action: 'delete-seeded' }).success).toBe(true)
  })

  it('accepts ids array', () => {
    expect(bulkDeleteSchema.safeParse({ ids: [1, 2, 3] }).success).toBe(true)
  })

  it('rejects empty ids array', () => {
    expect(bulkDeleteSchema.safeParse({ ids: [] }).success).toBe(false)
  })

  it('rejects unknown action', () => {
    expect(bulkDeleteSchema.safeParse({ action: 'drop-table' }).success).toBe(false)
  })

  it('rejects ids with non-positive numbers', () => {
    expect(bulkDeleteSchema.safeParse({ ids: [0, -1] }).success).toBe(false)
  })
})

// --- settingsUpdateSchema ---

describe('settingsUpdateSchema', () => {
  it('accepts valid settings', () => {
    expect(settingsUpdateSchema.safeParse({
      industryStepEnabled: true,
      disabledIndustries: ['healthcare'],
    }).success).toBe(true)
  })

  it('rejects non-boolean industryStepEnabled', () => {
    expect(settingsUpdateSchema.safeParse({
      industryStepEnabled: 'yes',
      disabledIndustries: [],
    }).success).toBe(false)
  })

  it('rejects non-array disabledIndustries', () => {
    expect(settingsUpdateSchema.safeParse({
      industryStepEnabled: true,
      disabledIndustries: 'healthcare',
    }).success).toBe(false)
  })
})

// --- formatZodError ---

describe('formatZodError', () => {
  it('formats error messages with paths', () => {
    const result = submitSchema.safeParse({ lead: { name: '' }, result: {}, timestamp: '' })
    expect(result.success).toBe(false)
    if (!result.success) {
      const msg = formatZodError(result.error)
      expect(msg).toContain('lead')
      expect(typeof msg).toBe('string')
    }
  })
})
