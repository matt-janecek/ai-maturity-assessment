'use client'

import { type Recommendation } from '@/lib/recommendations'

interface RecommendationsPreviewProps {
  recommendations: Recommendation[]
  totalCount: number
}

export function RecommendationsPreview({ recommendations, totalCount }: RecommendationsPreviewProps) {
  const priorityColors: Record<string, string> = {
    high: 'bg-red-100 text-red-700',
    medium: 'bg-yellow-100 text-yellow-700',
    low: 'bg-green-100 text-green-700',
  }

  const priorityIcons: Record<string, string> = {
    high: '🔥',
    medium: '⚡',
    low: '💡',
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold text-donyati-black">
          Top Recommendations
        </h3>
        <span className="text-sm text-donyati-purple">
          {totalCount} identified
        </span>
      </div>

      <div className="space-y-4">
        {recommendations.map((rec, index) => (
          <div
            key={rec.id}
            className="p-4 bg-white rounded-xl border border-gray-200 hover:border-donyati-purple transition-colors animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl">{priorityIcons[rec.priority]}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-bold text-donyati-black">{rec.title}</h4>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[rec.priority]}`}>
                    {rec.priority}
                  </span>
                </div>
                <p className="text-sm text-donyati-purple">{rec.teaser}</p>
                <div className="text-xs text-gray-400 mt-2">
                  {rec.dimension}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {totalCount > recommendations.length && (
        <div className="mt-6 p-4 bg-donyati-light-purple rounded-xl text-center">
          <p className="text-donyati-dark-purple font-medium">
            +{totalCount - recommendations.length} more recommendations available in a full assessment
          </p>
          <p className="text-sm text-donyati-purple mt-1">
            Schedule a consultation to get your complete roadmap
          </p>
        </div>
      )}
    </div>
  )
}
