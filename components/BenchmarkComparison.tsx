'use client'

import { type Industry, getIndustryInfo } from '@/lib/industries'
import { getBenchmark, calculatePercentile, getComparisonMessage } from '@/lib/benchmarks'

interface BenchmarkComparisonProps {
  score: number
  industry: Industry
}

export function BenchmarkComparison({ score, industry }: BenchmarkComparisonProps) {
  const benchmark = getBenchmark(industry)
  const percentile = calculatePercentile(score, industry)
  const comparisonMessage = getComparisonMessage(score, industry)
  const industryInfo = getIndustryInfo(industry)

  // Calculate position for visual bar (0-100%)
  const yourPosition = Math.min(100, Math.max(0, (score / 4) * 100))
  const avgPosition = (benchmark.averageScore / 4) * 100
  const topQuartilePosition = (benchmark.topQuartileScore / 4) * 100

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-lg sm:text-xl font-bold text-donyati-black mb-2">
          How You Compare to {industryInfo.name} Peers
        </h3>
        <p className="text-donyati-purple text-sm sm:text-base">
          {comparisonMessage}
        </p>
      </div>

      {/* Percentile Badge */}
      <div className="flex justify-center">
        <div className="bg-gradient-to-r from-donyati-dark-purple to-donyati-purple text-white px-6 py-3 rounded-full text-center">
          <div className="text-2xl sm:text-3xl font-bold">{percentile}th</div>
          <div className="text-xs sm:text-sm opacity-90">Percentile</div>
        </div>
      </div>

      {/* Comparison Bar */}
      <div className="bg-gray-100 rounded-lg p-4 sm:p-6">
        <div className="relative h-16 sm:h-20">
          {/* Track */}
          <div className="absolute top-1/2 left-0 right-0 h-3 bg-gray-200 rounded-full transform -translate-y-1/2">
            {/* Filled portion up to your score */}
            <div
              className="h-full bg-gradient-to-r from-donyati-lime to-donyati-dark-purple rounded-full transition-all duration-500"
              style={{ width: `${yourPosition}%` }}
            />
          </div>

          {/* Industry Average Marker */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${avgPosition}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="text-xs text-donyati-purple mb-1 whitespace-nowrap hidden sm:block">
                Industry Avg
              </div>
              <div className="w-0.5 h-6 bg-donyati-purple" />
              <div className="text-xs font-medium text-donyati-purple mt-1">
                {benchmark.averageScore.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Top Quartile Marker */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2"
            style={{ left: `${topQuartilePosition}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="text-xs text-donyati-lime mb-1 whitespace-nowrap hidden sm:block">
                Top 25%
              </div>
              <div className="w-0.5 h-6 bg-donyati-lime" />
              <div className="text-xs font-medium text-donyati-lime mt-1">
                {benchmark.topQuartileScore.toFixed(1)}
              </div>
            </div>
          </div>

          {/* Your Score Marker */}
          <div
            className="absolute top-1/2 transform -translate-y-1/2 -translate-x-1/2 z-10"
            style={{ left: `${yourPosition}%` }}
          >
            <div className="flex flex-col items-center">
              <div className="text-xs font-bold text-donyati-black mb-1 whitespace-nowrap">
                Your Score
              </div>
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-donyati-black rounded-full flex items-center justify-center">
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-donyati-lime rounded-full" />
              </div>
              <div className="text-sm font-bold text-donyati-black mt-1">
                {score.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Scale labels */}
        <div className="flex justify-between text-xs text-gray-500 mt-4 px-2">
          <span>0</span>
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
        </div>
      </div>

      {/* Key Stats */}
      <div className="grid grid-cols-3 gap-4 text-center">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-lg sm:text-xl font-bold text-donyati-black">
            {benchmark.averageScore.toFixed(1)}
          </div>
          <div className="text-xs text-donyati-purple">Industry Avg</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-lg sm:text-xl font-bold text-donyati-black">
            {benchmark.medianScore.toFixed(1)}
          </div>
          <div className="text-xs text-donyati-purple">Median</div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="text-lg sm:text-xl font-bold text-donyati-black">
            {benchmark.topQuartileScore.toFixed(1)}
          </div>
          <div className="text-xs text-donyati-purple">Top 25%</div>
        </div>
      </div>

      {/* Sample size note */}
      <div className="text-center text-xs text-gray-400">
        Based on {benchmark.sampleSize}+ {industryInfo.name.toLowerCase()} assessments
      </div>
    </div>
  )
}
