import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { AssessmentPDFDocument } from '@/lib/pdf-document'
import { generatePdfSchema, formatZodError } from '@/lib/schemas'
import { rateLimit } from '@/lib/rate-limit'
import logger from '@/lib/logger'

export async function POST(request: NextRequest) {
  try {
    // Rate limit
    const rateLimitResponse = await rateLimit(request, 'pdf')
    if (rateLimitResponse) return rateLimitResponse

    const body = await request.json()
    const parsed = generatePdfSchema.safeParse(body)
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Invalid request', details: formatZodError(parsed.error) },
        { status: 400 }
      )
    }
    const { result, leadInfo } = parsed.data

    // Generate PDF buffer using @react-pdf/renderer
    const pdfBuffer = await renderToBuffer(
      AssessmentPDFDocument({ result, leadInfo })
    )

    // Convert Buffer to Uint8Array for NextResponse compatibility
    const pdfBytes = new Uint8Array(pdfBuffer)

    // Return actual PDF content
    return new NextResponse(pdfBytes, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="AI-Maturity-Assessment-${leadInfo.company.replace(/\s+/g, '-')}.pdf"`,
      },
    })
  } catch (error) {
    logger.error({ err: error }, 'Error generating PDF')
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
