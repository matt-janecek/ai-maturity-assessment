import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { updateMeetingStatus } from '@/lib/admin/queries'
import { meetingUpdateSchema, formatZodError } from '@/lib/schemas'
import logger from '@/lib/logger'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const id = parseInt(params.id)
    if (isNaN(id)) {
      return NextResponse.json({ error: 'Invalid ID' }, { status: 400 })
    }

    const body = await request.json()
    const parsed = meetingUpdateSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    const { scheduled, notes } = parsed.data
    const success = await updateMeetingStatus(id, scheduled, notes)

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json({ error: 'Submission not found' }, { status: 404 })
    }
  } catch (error) {
    logger.error({ err: error }, 'Error updating meeting status')
    return NextResponse.json(
      { error: 'Failed to update meeting status' },
      { status: 500 }
    )
  }
}
