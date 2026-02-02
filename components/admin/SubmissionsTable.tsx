'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { AssessmentSubmission } from '@/lib/db'
import { DeleteConfirmModal } from './DeleteConfirmModal'

const industryNames: Record<string, string> = {
  'financial-services': 'Financial Services',
  'healthcare': 'Healthcare',
  'manufacturing': 'Manufacturing',
  'retail': 'Retail',
  'technology': 'Technology',
  'professional-services': 'Professional Services',
  'energy-utilities': 'Energy & Utilities',
  'government': 'Government',
  'education': 'Education',
  'media-entertainment': 'Media & Entertainment',
  'transportation-logistics': 'Transportation',
  'general': 'General',
}

const maturityColors: Record<number, string> = {
  0: 'bg-level-0',
  1: 'bg-level-1',
  2: 'bg-level-2',
  3: 'bg-level-3',
  4: 'bg-level-4',
}

interface SubmissionsTableProps {
  data: AssessmentSubmission[]
  total: number
  page: number
  pageSize: number
  totalPages: number
}

export function SubmissionsTable({
  data,
  total,
  page,
  pageSize,
  totalPages,
}: SubmissionsTableProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; submission: AssessmentSubmission | null }>({
    isOpen: false,
    submission: null,
  })
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteClick = (submission: AssessmentSubmission) => {
    setDeleteModal({ isOpen: true, submission })
  }

  const handleDeleteConfirm = async () => {
    if (!deleteModal.submission) return

    setIsDeleting(true)
    try {
      const response = await fetch(`/api/admin/submissions/${deleteModal.submission.id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        setDeleteModal({ isOpen: false, submission: null })
        router.refresh()
      } else {
        alert('Failed to delete submission')
      }
    } catch (error) {
      console.error('Error deleting submission:', error)
      alert('Failed to delete submission')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSort = (column: string) => {
    const params = new URLSearchParams(searchParams.toString())
    const currentSortBy = params.get('sortBy') || 'created_at'
    const currentSortOrder = params.get('sortOrder') || 'desc'

    if (currentSortBy === column) {
      params.set('sortOrder', currentSortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      params.set('sortBy', column)
      params.set('sortOrder', 'desc')
    }

    router.push(`/admin/submissions?${params.toString()}`)
  }

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', newPage.toString())
    router.push(`/admin/submissions?${params.toString()}`)
  }

  const currentSortBy = searchParams.get('sortBy') || 'created_at'
  const currentSortOrder = searchParams.get('sortOrder') || 'desc'

  const SortIcon = ({ column }: { column: string }) => {
    if (currentSortBy !== column) {
      return <span className="text-gray-300 ml-1">↕</span>
    }
    return (
      <span className="text-donyati-purple ml-1">
        {currentSortOrder === 'asc' ? '↑' : '↓'}
      </span>
    )
  }

  const formatDate = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (date: Date | string) => {
    const d = new Date(date)
    return d.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    })
  }

  if (data.length === 0) {
    return (
      <div className="bg-white rounded-xl p-12 shadow-sm text-center">
        <p className="text-gray-500">No submissions found</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('created_at')}
              >
                Date <SortIcon column="created_at" />
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('name')}
              >
                Name <SortIcon column="name" />
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('company')}
              >
                Company <SortIcon column="company" />
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('industry')}
              >
                Industry <SortIcon column="industry" />
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('overall_score')}
              >
                Score <SortIcon column="overall_score" />
              </th>
              <th
                className="px-6 py-4 text-left text-sm font-semibold text-gray-900 cursor-pointer hover:bg-gray-100"
                onClick={() => handleSort('maturity_level')}
              >
                Level <SortIcon column="maturity_level" />
              </th>
              <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((submission) => (
              <tr key={submission.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{formatDate(submission.created_at)}</div>
                  <div className="text-xs text-gray-500">{formatTime(submission.created_at)}</div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {submission.name}
                    </p>
                    <p className="text-xs text-gray-500">{submission.email}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {submission.company || '-'}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {submission.industry
                    ? industryNames[submission.industry] || submission.industry
                    : '-'}
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-gray-900">
                    {Number(submission.overall_score).toFixed(2)}
                  </span>
                  <span className="text-xs text-gray-500"> / 4.0</span>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium text-white ${
                      maturityColors[submission.maturity_level] || 'bg-gray-500'
                    }`}
                  >
                    L{submission.maturity_level}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/submissions/${submission.id}`}
                    className="text-donyati-purple hover:text-donyati-dark-purple font-medium text-sm"
                  >
                    View
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(submission)}
                    className="text-red-600 hover:text-red-800 font-medium text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * pageSize + 1} to{' '}
          {Math.min(page * pageSize, total)} of {total} results
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum: number
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (page <= 3) {
                pageNum = i + 1
              } else if (page >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = page - 2 + i
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`w-10 h-10 text-sm font-medium rounded-lg ${
                    page === pageNum
                      ? 'bg-donyati-purple text-white'
                      : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {pageNum}
                </button>
              )
            })}
          </div>
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, submission: null })}
        onConfirm={handleDeleteConfirm}
        isDeleting={isDeleting}
        submissionName={deleteModal.submission?.name || ''}
        submissionCompany={deleteModal.submission?.company || ''}
      />
    </div>
  )
}
