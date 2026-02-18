import { NextRequest, NextResponse } from 'next/server'
import { recordBookingClick } from '@/lib/admin/queries'
import { trackBookingSchema, formatZodError } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'
import logger from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimitResponse = await rateLimit(request, 'booking')
    if (rateLimitResponse) return rateLimitResponse

    const body = await request.json()
    const parsed = trackBookingSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid submission ID', details: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    const { submissionId } = parsed.data
    const success = await recordBookingClick(submissionId)

    return NextResponse.json({ success })
  } catch (error) {
    logger.error({ err: error }, 'Error tracking booking click')
    // Don't fail the user experience if tracking fails
    return NextResponse.json({ success: false })
  }
}
