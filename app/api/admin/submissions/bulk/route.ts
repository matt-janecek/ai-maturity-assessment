import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { bulkDeleteSubmissions, deleteSeededSubmissions } from '@/lib/admin/queries'
import { bulkDeleteSchema, formatZodError } from '@/lib/schemas'
import logger from '@/lib/logger'

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const parsed = bulkDeleteSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request body', details: formatZodError(parsed.error) },
        { status: 400 }
      )
    }

    if ('action' in parsed.data) {
      const count = await deleteSeededSubmissions()
      return NextResponse.json({ success: true, deleted: count })
    }

    const count = await bulkDeleteSubmissions(parsed.data.ids)
    return NextResponse.json({ success: true, deleted: count })
  } catch (error) {
    logger.error({ err: error }, 'Error in bulk delete')
    return NextResponse.json({ error: 'Failed to delete submissions' }, { status: 500 })
  }
}
