import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSettings, updateSettings, type AssessmentSettings } from '@/lib/admin/settings-queries'
import logger from '@/lib/logger'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const settings = await getSettings()
    return NextResponse.json(settings, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch (error) {
    logger.error({ err: error }, 'Error fetching settings')
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json() as AssessmentSettings

    // Validate shape
    if (typeof body.industryStepEnabled !== 'boolean' || !Array.isArray(body.disabledIndustries)) {
      return NextResponse.json({ error: 'Invalid settings format' }, { status: 400 })
    }

    await updateSettings({
      industryStepEnabled: body.industryStepEnabled,
      disabledIndustries: body.disabledIndustries,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    logger.error({ err: error }, 'Error updating settings')
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 })
  }
}
