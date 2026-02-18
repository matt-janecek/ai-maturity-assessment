import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { getAllSubmissionsForExport } from '@/lib/admin/queries'
import { DimensionScore } from '@/lib/db'
import logger from '@/lib/logger'

function escapeCSV(value: string | number | null | undefined): string {
  if (value === null || value === undefined) return ''
  const str = String(value)
  // Escape quotes and wrap in quotes if contains comma, quote, or newline
  if (str.includes(',') || str.includes('"') || str.includes('\n')) {
    return `"${str.replace(/"/g, '""')}"`
  }
  return str
}

export async function GET(request: NextRequest) {
  // Check authentication
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const searchParams = request.nextUrl.searchParams

    const filters = {
      industry: searchParams.get('industry') || undefined,
      search: searchParams.get('search') || undefined,
      dateFrom: searchParams.get('dateFrom') || undefined,
      dateTo: searchParams.get('dateTo') || undefined,
    }

    const submissions = await getAllSubmissionsForExport(filters)

    // Build CSV
    const headers = [
      'ID',
      'Name',
      'Email',
      'Company',
      'Title',
      'Industry',
      'Overall Score',
      'Maturity Level',
      'Maturity Name',
      'Industry Percentile',
      'Governance & Risk',
      'Developer Enablement',
      'Human Oversight',
      'Workflow Integration',
      'Platform & Architecture',
      'Value Measurement',
      'Data & Model Lifecycle',
      'Created At',
    ]

    const dimensionOrder = [
      'Governance & Risk',
      'Developer Enablement',
      'Human Oversight',
      'Workflow Integration',
      'Platform & Architecture',
      'Value Measurement',
      'Data & Model Lifecycle',
    ]

    const rows = submissions.map((sub) => {
      const dimensionScores = (
        typeof sub.dimension_scores === 'string'
          ? JSON.parse(sub.dimension_scores)
          : sub.dimension_scores
      ) as DimensionScore[]

      // Map dimension scores to ordered columns
      const dimMap = new Map(dimensionScores.map((d) => [d.dimension, d.score]))

      return [
        sub.id,
        escapeCSV(sub.name),
        escapeCSV(sub.email),
        escapeCSV(sub.company),
        escapeCSV(sub.title),
        escapeCSV(sub.industry),
        Number(sub.overall_score).toFixed(2),
        sub.maturity_level,
        escapeCSV(sub.maturity_name),
        sub.industry_percentile || '',
        ...dimensionOrder.map((dim) => {
          const score = dimMap.get(dim)
          return score !== undefined ? score.toFixed(2) : ''
        }),
        new Date(sub.created_at).toISOString(),
      ].join(',')
    })

    const csv = [headers.join(','), ...rows].join('\n')

    // Generate filename with date
    const date = new Date().toISOString().split('T')[0]
    const filename = `ai-assessment-submissions-${date}.csv`

    return new NextResponse(csv, {
      headers: {
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Cache-Control': 'private, no-store',
      },
    })
  } catch (error) {
    logger.error({ err: error }, 'Error exporting submissions')
    return NextResponse.json(
      { error: 'Failed to export submissions' },
      { status: 500 }
    )
  }
}
