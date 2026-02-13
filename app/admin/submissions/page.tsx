import { Suspense } from 'react'
import { SubmissionFilters } from '@/components/admin/SubmissionFilters'

// Force dynamic rendering - this page requires database access
export const dynamic = 'force-dynamic'
import { SubmissionsActions } from '@/components/admin/SubmissionsActions'
import { ExportButton } from '@/components/admin/ExportButton'
import { getSubmissions, getSeededCount } from '@/lib/admin/queries'

interface PageProps {
  searchParams: Promise<{
    page?: string
    pageSize?: string
    industry?: string
    search?: string
    dateFrom?: string
    dateTo?: string
    sortBy?: string
    sortOrder?: string
  }>
}

async function SubmissionsContent({ searchParams }: PageProps) {
  const params = await searchParams

  const filters = {
    page: parseInt(params.page || '1'),
    pageSize: parseInt(params.pageSize || '20'),
    industry: params.industry,
    search: params.search,
    dateFrom: params.dateFrom,
    dateTo: params.dateTo,
    sortBy: params.sortBy || 'created_at',
    sortOrder: (params.sortOrder as 'asc' | 'desc') || 'desc',
  }

  const [result, seededCount] = await Promise.all([
    getSubmissions(filters),
    getSeededCount(),
  ])

  return (
    <SubmissionsActions
      data={result.data}
      total={result.total}
      page={result.page}
      pageSize={result.pageSize}
      totalPages={result.totalPages}
      seededCount={seededCount}
    />
  )
}

export default async function SubmissionsPage({ searchParams }: PageProps) {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
          <p className="text-gray-600 mt-1">
            View and manage all assessment submissions
          </p>
        </div>
        <Suspense fallback={<div className="h-10 w-32 bg-gray-200 rounded-lg animate-pulse" />}>
          <ExportButton />
        </Suspense>
      </div>

      {/* Filters */}
      <Suspense fallback={<div className="h-24 bg-gray-200 rounded-xl animate-pulse mb-6" />}>
        <SubmissionFilters />
      </Suspense>

      {/* Table */}
      <Suspense
        fallback={
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-gray-200 rounded"></div>
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-16 bg-gray-100 rounded"></div>
              ))}
            </div>
          </div>
        }
      >
        <SubmissionsContent searchParams={searchParams} />
      </Suspense>
    </div>
  )
}
