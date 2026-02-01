import { NextRequest, NextResponse } from 'next/server'
import { renderToBuffer } from '@react-pdf/renderer'
import { AssessmentPDFDocument } from '@/lib/pdf-document'
import { type Industry } from '@/lib/industries'

interface LeadInfo {
  name: string
  email: string
  company: string
  title?: string
}

interface DimensionScore {
  dimension: string
  score: number
  questionsAnswered: number
}

interface AssessmentResult {
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: DimensionScore[]
  industry?: Industry
  industryBenchmark?: number
  industryPercentile?: number
}

interface PDFRequest {
  result: AssessmentResult
  leadInfo: LeadInfo
}

export async function POST(request: NextRequest) {
  try {
    const { result, leadInfo }: PDFRequest = await request.json()

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
    console.error('Error generating PDF:', error)
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    )
  }
}
