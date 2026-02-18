import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAnalytics } from '@/lib/admin/queries'
import logger from '@/lib/logger'

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const searchParams = request.nextUrl.searchParams
    const dateFrom = searchParams.get('dateFrom') || undefined
    const dateTo = searchParams.get('dateTo') || undefined

    const analytics = await getAnalytics(dateFrom, dateTo)

    return NextResponse.json(analytics, {
      headers: { 'Cache-Control': 'private, max-age=60' },
    })
  } catch (error) {
    logger.error({ err: error }, 'Error fetching analytics')
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
