import { getDb } from '@/lib/db'
import { INDUSTRIES, type Industry } from '@/lib/industries'

export interface AssessmentSettings {
  industryStepEnabled: boolean
  disabledIndustries: string[]
}

const DEFAULT_SETTINGS: AssessmentSettings = {
  industryStepEnabled: true,
  disabledIndustries: [],
}

export async function getSettings(): Promise<AssessmentSettings> {
  const sql = getDb()
  if (!sql) {
    return DEFAULT_SETTINGS
  }

  try {
    const result = await sql`
      SELECT settings FROM assessment_settings WHERE id = 1
    `
    if (result.length === 0) {
      return DEFAULT_SETTINGS
    }
    const settings = result[0].settings as AssessmentSettings
    return {
      industryStepEnabled: settings.industryStepEnabled ?? true,
      disabledIndustries: settings.disabledIndustries ?? [],
    }
  } catch {
    // Table may not exist yet — return defaults
    return DEFAULT_SETTINGS
  }
}

export async function updateSettings(settings: AssessmentSettings): Promise<void> {
  const sql = getDb()
  if (!sql) {
    throw new Error('Database not configured')
  }

  await sql`
    INSERT INTO assessment_settings (id, settings, updated_at)
    VALUES (1, ${JSON.stringify(settings)}::jsonb, NOW())
    ON CONFLICT (id)
    DO UPDATE SET settings = ${JSON.stringify(settings)}::jsonb, updated_at = NOW()
  `
}

/** Derive the list of active industry IDs from settings */
export function getActiveIndustries(settings: AssessmentSettings): Industry[] {
  return INDUSTRIES.filter(id => !settings.disabledIndustries.includes(id))
}
