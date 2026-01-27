'use client'

import { type DimensionScore } from '@/lib/scoring'

interface DimensionChartProps {
  dimensionScores: DimensionScore[]
}

export function DimensionChart({ dimensionScores }: DimensionChartProps) {
  const getBarColor = (score: number): string => {
    if (score < 1) return 'bg-level-0'
    if (score < 2) return 'bg-level-1'
    if (score < 3) return 'bg-level-2'
    if (score < 3.5) return 'bg-level-3'
    return 'bg-level-4'
  }

  const getScoreColor = (score: number): string => {
    if (score < 1) return 'text-level-0'
    if (score < 2) return 'text-level-1'
    if (score < 3) return 'text-level-2'
    if (score < 3.5) return 'text-level-3'
    return 'text-level-4'
  }

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-donyati-black mb-6">
        Dimension Scores
      </h3>

      {dimensionScores.map((ds, index) => (
        <div
          key={ds.dimension}
          className="animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-medium text-donyati-black truncate pr-2">
              {ds.dimension}
            </span>
            <span className={`text-sm font-bold ${getScoreColor(ds.score)}`}>
              {ds.score.toFixed(1)}
            </span>
          </div>
          <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${getBarColor(ds.score)}`}
              style={{
                width: `${(ds.score / 4) * 100}%`,
                animationDelay: `${index * 100}ms`,
              }}
            />
          </div>
        </div>
      ))}

      {/* Legend */}
      <div className="flex flex-wrap gap-3 mt-6 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-level-0" />
          <span className="text-donyati-purple">L0</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-level-1" />
          <span className="text-donyati-purple">L1</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-level-2" />
          <span className="text-donyati-purple">L2</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-level-3" />
          <span className="text-donyati-purple">L3</span>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <div className="w-3 h-3 rounded-full bg-level-4" />
          <span className="text-donyati-purple">L4</span>
        </div>
      </div>
    </div>
  )
}
