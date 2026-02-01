'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useCallback, useState, useEffect } from 'react'

const industries = [
  { value: 'all', label: 'All Industries' },
  { value: 'financial-services', label: 'Financial Services' },
  { value: 'healthcare', label: 'Healthcare & Life Sciences' },
  { value: 'manufacturing', label: 'Manufacturing' },
  { value: 'retail', label: 'Retail & Consumer Goods' },
  { value: 'technology', label: 'Technology & Software' },
  { value: 'professional-services', label: 'Professional Services' },
  { value: 'energy-utilities', label: 'Energy & Utilities' },
  { value: 'government', label: 'Government & Public Sector' },
  { value: 'education', label: 'Education' },
  { value: 'media-entertainment', label: 'Media & Entertainment' },
  { value: 'transportation-logistics', label: 'Transportation & Logistics' },
  { value: 'general', label: 'General / Other' },
]

export function SubmissionFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [industry, setIndustry] = useState(searchParams.get('industry') || 'all')
  const [dateFrom, setDateFrom] = useState(searchParams.get('dateFrom') || '')
  const [dateTo, setDateTo] = useState(searchParams.get('dateTo') || '')

  const updateFilters = useCallback(
    (updates: Record<string, string>) => {
      const params = new URLSearchParams(searchParams.toString())

      Object.entries(updates).forEach(([key, value]) => {
        if (value && value !== 'all') {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      })

      // Reset to page 1 when filters change
      params.set('page', '1')

      router.push(`/admin/submissions?${params.toString()}`)
    },
    [router, searchParams]
  )

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search !== (searchParams.get('search') || '')) {
        updateFilters({ search })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [search, searchParams, updateFilters])

  const handleIndustryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setIndustry(e.target.value)
    updateFilters({ industry: e.target.value })
  }

  const handleDateFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateFrom(e.target.value)
    updateFilters({ dateFrom: e.target.value })
  }

  const handleDateToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateTo(e.target.value)
    updateFilters({ dateTo: e.target.value })
  }

  const clearFilters = () => {
    setSearch('')
    setIndustry('all')
    setDateFrom('')
    setDateTo('')
    router.push('/admin/submissions')
  }

  const hasActiveFilters = search || industry !== 'all' || dateFrom || dateTo

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Search */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or company..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-donyati-purple focus:border-transparent"
          />
        </div>

        {/* Industry Filter */}
        <div className="w-48">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Industry
          </label>
          <select
            value={industry}
            onChange={handleIndustryChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-donyati-purple focus:border-transparent"
          >
            {industries.map((ind) => (
              <option key={ind.value} value={ind.value}>
                {ind.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date From */}
        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            From
          </label>
          <input
            type="date"
            value={dateFrom}
            onChange={handleDateFromChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-donyati-purple focus:border-transparent"
          />
        </div>

        {/* Date To */}
        <div className="w-40">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            To
          </label>
          <input
            type="date"
            value={dateTo}
            onChange={handleDateToChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-donyati-purple focus:border-transparent"
          />
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
          >
            Clear Filters
          </button>
        )}
      </div>
    </div>
  )
}
