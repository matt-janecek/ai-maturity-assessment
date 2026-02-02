import { NextRequest, NextResponse } from 'next/server'
import { recordBookingClick } from '@/lib/admin/queries'

export async function POST(request: NextRequest) {
  try {
    const { submissionId } = await request.json()

    if (!submissionId || typeof submissionId !== 'number') {
      return NextResponse.json({ error: 'Invalid submission ID' }, { status: 400 })
    }

    const success = await recordBookingClick(submissionId)

    return NextResponse.json({ success })
  } catch (error) {
    console.error('Error tracking booking click:', error)
    // Don't fail the user experience if tracking fails
    return NextResponse.json({ success: false })
  }
}
