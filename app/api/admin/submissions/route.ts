import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getSubmissions } from '@/lib/admin/queries'
import { submissionsQuerySchema, formatZodError } from '@/lib/schemas'
import logger from '@/lib/logger'

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const searchParams = request.nextUrl.searchParams

    const parsed = submissionsQuerySchema.safeParse({
      industry: searchParams.get('industry') || undefined,
      search: searchParams.get('search') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
      page: searchParams.get('page') || undefined,
      pageSize: searchParams.get('pageSize') || undefined,
      sortBy: searchParams.get('sortBy') || undefined,
      sortOrder: searchParams.get('sortOrder') || undefined,
    })
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid query parameters', details: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    const result = await getSubmissions(parsed.data)

    return NextResponse.json(result, {
      headers: { 'Cache-Control': 'private, no-store' },
    })
  } catch (error) {
    logger.error({ err: error }, 'Error fetching submissions')
    return NextResponse.json(
      { error: 'Failed to fetch submissions' },
      { status: 500 }
    )
  }
}
