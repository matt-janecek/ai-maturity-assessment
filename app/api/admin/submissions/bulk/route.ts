import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { bulkDeleteSubmissions, deleteSeededSubmissions } from '@/lib/admin/queries'

export async function DELETE(request: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()

    if (body.action === 'delete-seeded') {
      const count = await deleteSeededSubmissions()
      return NextResponse.json({ success: true, deleted: count })
    }

    if (Array.isArray(body.ids) && body.ids.length > 0) {
      if (body.ids.length > 500) {
        return NextResponse.json({ error: 'Maximum 500 IDs per request' }, { status: 400 })
      }
      const count = await bulkDeleteSubmissions(body.ids)
      return NextResponse.json({ success: true, deleted: count })
    }

    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 })
  } catch (error) {
    console.error('Error in bulk delete:', error)
    return NextResponse.json({ error: 'Failed to delete submissions' }, { status: 500 })
  }
}
