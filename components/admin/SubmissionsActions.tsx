'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { AssessmentSubmission } from '@/lib/db'
import { SubmissionsTable } from './SubmissionsTable'

interface SubmissionsActionsProps {
  data: AssessmentSubmission[]
  total: number
  page: number
  pageSize: number
  totalPages: number
  seededCount: number
}

export function SubmissionsActions({
  data,
  total,
  page,
  pageSize,
  totalPages,
  seededCount,
}: SubmissionsActionsProps) {
  const router = useRouter()
  const [selectedIds, setSelectedIds] = useState<Set<number>>(new Set())
  const [loading, setLoading] = useState<string | null>(null)

  const handleBulkDelete = async () => {
    const count = selectedIds.size
    if (count === 0) return
    if (!confirm(`Delete ${count} selected submission${count !== 1 ? 's' : ''}? This cannot be undone.`)) return
    setLoading('bulk')
    try {
      const res = await fetch('/api/admin/submissions/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) }),
      })
      if (!res.ok) throw new Error('Failed to delete')
      setSelectedIds(new Set())
      router.refresh()
    } catch {
      alert('Failed to delete submissions')
    } finally {
      setLoading(null)
    }
  }

  const handleDeleteAllSeeded = async () => {
    if (!confirm(`Delete all ${seededCount} seeded submissions? This cannot be undone.`)) return
    setLoading('seeded')
    try {
      const res = await fetch('/api/admin/submissions/bulk', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete-seeded' }),
      })
      if (!res.ok) throw new Error('Failed to delete')
      setSelectedIds(new Set())
      router.refresh()
    } catch {
      alert('Failed to delete seeded submissions')
    } finally {
      setLoading(null)
    }
  }

  const handleSeedData = async () => {
    if (!confirm('Seed 25-50 test submissions? They will be marked as seeded.')) return
    setLoading('seed')
    try {
      const res = await fetch('/api/admin/seed-submissions', { method: 'POST' })
      if (!res.ok) throw new Error('Failed to seed')
      router.refresh()
    } catch {
      alert('Failed to seed test data')
    } finally {
      setLoading(null)
    }
  }

  return (
    <>
      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="flex items-center justify-between px-4 py-3 bg-purple-50 border border-purple-200 rounded-lg mb-4">
          <span className="text-sm font-medium text-purple-800">
            {selectedIds.size} selected
          </span>
          <button
            onClick={handleBulkDelete}
            disabled={loading === 'bulk'}
            className="px-4 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg disabled:opacity-50"
          >
            {loading === 'bulk' ? 'Deleting...' : `Delete ${selectedIds.size} Selected`}
          </button>
        </div>
      )}

      {/* Quick actions row */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={handleSeedData}
          disabled={loading === 'seed'}
          className="px-4 py-2 text-sm font-medium text-donyati-purple border border-donyati-purple rounded-lg hover:bg-purple-50 disabled:opacity-50"
        >
          {loading === 'seed' ? 'Seeding...' : 'Seed Test Data'}
        </button>
        {seededCount > 0 && (
          <button
            onClick={handleDeleteAllSeeded}
            disabled={loading === 'seeded'}
            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-300 rounded-lg hover:bg-red-50 disabled:opacity-50"
          >
            {loading === 'seeded' ? 'Deleting...' : `Delete All Seeded (${seededCount})`}
          </button>
        )}
      </div>

      {/* Table */}
      <SubmissionsTable
        data={data}
        total={total}
        page={page}
        pageSize={pageSize}
        totalPages={totalPages}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
      />
    </>
  )
}
