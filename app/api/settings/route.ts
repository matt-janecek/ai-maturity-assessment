import { NextResponse } from 'next/server'
import { getSettings, getActiveIndustries } from '@/lib/admin/settings-queries'

export const dynamic = 'force-dynamic'
export const revalidate = 0

// Public endpoint — returns settings needed by the assess page
export async function GET() {
  try {
    const settings = await getSettings()
    const activeIndustries = getActiveIndustries(settings)

    return NextResponse.json({
      industryStepEnabled: settings.industryStepEnabled,
      activeIndustries,
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  } catch (error) {
    console.error('Error fetching public settings:', error)
    // Fall back to all-enabled defaults so the assess page still works
    return NextResponse.json({
      industryStepEnabled: true,
      activeIndustries: null, // null = show all
    }, {
      headers: { 'Cache-Control': 'no-store, max-age=0' },
    })
  }
}
