'use client'

import { useState } from 'react'
import { type Recommendation, getRecommendationTeaser, getRecommendationDescription } from '@/lib/recommendations'
import { type Industry } from '@/lib/industries'

interface RecommendationsPreviewProps {
  recommendations: Recommendation[]
  industry?: Industry
}

export function RecommendationsPreview({ recommendations, industry = 'general' }: RecommendationsPreviewProps) {
  const [showAll, setShowAll] = useState(false)
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    // Top 3 expanded by default
    return new Set(recommendations.slice(0, 3).map((r) => r.id))
  })

  const topRecs = recommendations.slice(0, 3)
  const remainingRecs = recommendations.slice(3)
  const visibleRecs = showAll ? recommendations : topRecs

  const toggleExpanded = (id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  // Group remaining recs by priority for the expanded view
  const groupByPriority = (recs: Recommendation[]) => {
    const groups: Record<string, Recommendation[]> = { high: [], medium: [], low: [] }
    for (const rec of recs) {
      groups[rec.priority].push(rec)
    }
    return groups
  }

  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  const priorityIcons: Record<string, string> = {
    high: '\uD83D\uDD25',
    medium: '\u26A1',
    low: '\uD83D\uDCA1',
  }

  const priorityLabels: Record<string, string> = {
    high: 'High Priority',
    medium: 'Medium Priority',
    low: 'Low Priority',
  }

  const renderCard = (rec: Recommendation, index: number) => {
    const isExpanded = expandedIds.has(rec.id)

    return (
      <div
        key={rec.id}
        className="p-4 bg-white rounded-xl border border-gray-200 hover:border-donyati-purple transition-colors animate-fade-in"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <button
          onClick={() => toggleExpanded(rec.id)}
          className="w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donyati-dark-purple focus-visible:ring-offset-2 rounded-lg"
          aria-expanded={isExpanded}
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl" aria-hidden="true">{priorityIcons[rec.priority]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-donyati-black">{rec.title}</h4>
                <span className={`text-xs px-2 py-0.5 rounded-full flex-shrink-0 ${priorityColors[rec.priority]}`}>
                  {rec.priority}
                </span>
              </div>
              <p className="text-sm text-donyati-purple">
                {getRecommendationTeaser(rec, industry)}
              </p>
            </div>
            <svg
              className={`w-5 h-5 text-donyati-purple flex-shrink-0 mt-1 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {isExpanded && (
          <div className="mt-3 pl-11 border-t border-gray-100 pt-3">
            <p className="text-sm text-donyati-black leading-relaxed">
              {getRecommendationDescription(rec, industry)}
            </p>
            <div className="text-xs text-gray-400 mt-2">
              {rec.dimension}
            </div>
          </div>
        )}
      </div>
    )
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-donyati-black">
          Your Recommendations
        </h3>
        <span className="text-sm text-donyati-purple">
          {recommendations.length} identified
        </span>
      </div>

      {/* Top 3 always visible */}
      <div className="space-y-4">
        {topRecs.map((rec, i) => renderCard(rec, i))}
      </div>

      {/* Show all toggle */}
      {remainingRecs.length > 0 && (
        <>
          {!showAll ? (
            <button
              onClick={() => setShowAll(true)}
              className="mt-6 w-full p-4 bg-donyati-light-purple rounded-xl text-center hover:bg-opacity-80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donyati-dark-purple focus-visible:ring-offset-2"
            >
              <p className="text-donyati-dark-purple font-medium">
                Show all {recommendations.length} recommendations
              </p>
            </button>
          ) : (
            <>
              {/* Remaining recs grouped by priority */}
              {(['high', 'medium', 'low'] as const).map((priority) => {
                const grouped = groupByPriority(remainingRecs)
                const recs = grouped[priority]
                if (recs.length === 0) return null

                return (
                  <div key={priority} className="mt-6">
                    <h4 className="text-sm font-semibold text-donyati-purple uppercase tracking-wide mb-3">
                      {priorityLabels[priority]}
                    </h4>
                    <div className="space-y-3">
                      {recs.map((rec, i) => renderCard(rec, topRecs.length + i))}
                    </div>
                  </div>
                )
              })}

              <button
                onClick={() => setShowAll(false)}
                className="mt-6 w-full p-3 text-center text-sm text-donyati-purple hover:text-donyati-dark-purple transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-donyati-dark-purple focus-visible:ring-offset-2 rounded-lg"
              >
                Show fewer recommendations
              </button>
            </>
          )}
        </>
      )}
    </div>
  )
}
