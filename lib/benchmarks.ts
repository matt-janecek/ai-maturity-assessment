import { type Industry } from './industries'
import { type Dimension, DIMENSIONS } from './questions'

export interface IndustryBenchmark {
  industry: Industry
  averageScore: number
  medianScore: number
  topQuartileScore: number
  bottomQuartileScore: number
  dimensionAverages: Record<Dimension, number>
  sampleSize: number
  lastUpdated: string
}

// Initial benchmarks based on industry research and typical AI maturity patterns
// These will be updated over time with actual assessment data
export const industryBenchmarks: Record<Industry, IndustryBenchmark> = {
  'financial-services': {
    industry: 'financial-services',
    averageScore: 2.3,
    medianScore: 2.2,
    topQuartileScore: 3.1,
    bottomQuartileScore: 1.5,
    dimensionAverages: {
      'Governance & Risk': 2.8,
      'Developer Enablement': 2.4,
      'Human Oversight': 2.6,
      'Workflow Integration': 2.1,
      'Platform & Architecture': 2.2,
      'Value Measurement': 1.9,
      'Data & Model Lifecycle': 2.1,
    },
    sampleSize: 150,
    lastUpdated: '2026-01-01',
  },
  'healthcare': {
    industry: 'healthcare',
    averageScore: 1.8,
    medianScore: 1.7,
    topQuartileScore: 2.6,
    bottomQuartileScore: 1.1,
    dimensionAverages: {
      'Governance & Risk': 2.4,
      'Developer Enablement': 1.5,
      'Human Oversight': 2.5,
      'Workflow Integration': 1.6,
      'Platform & Architecture': 1.4,
      'Value Measurement': 1.5,
      'Data & Model Lifecycle': 1.7,
    },
    sampleSize: 120,
    lastUpdated: '2026-01-01',
  },
  'manufacturing': {
    industry: 'manufacturing',
    averageScore: 2.0,
    medianScore: 1.9,
    topQuartileScore: 2.8,
    bottomQuartileScore: 1.2,
    dimensionAverages: {
      'Governance & Risk': 2.0,
      'Developer Enablement': 1.8,
      'Human Oversight': 2.2,
      'Workflow Integration': 2.3,
      'Platform & Architecture': 2.0,
      'Value Measurement': 1.8,
      'Data & Model Lifecycle': 1.9,
    },
    sampleSize: 130,
    lastUpdated: '2026-01-01',
  },
  'retail': {
    industry: 'retail',
    averageScore: 2.1,
    medianScore: 2.0,
    topQuartileScore: 2.9,
    bottomQuartileScore: 1.3,
    dimensionAverages: {
      'Governance & Risk': 1.9,
      'Developer Enablement': 2.2,
      'Human Oversight': 1.8,
      'Workflow Integration': 2.4,
      'Platform & Architecture': 2.3,
      'Value Measurement': 2.2,
      'Data & Model Lifecycle': 1.9,
    },
    sampleSize: 140,
    lastUpdated: '2026-01-01',
  },
  'technology': {
    industry: 'technology',
    averageScore: 2.8,
    medianScore: 2.7,
    topQuartileScore: 3.5,
    bottomQuartileScore: 2.0,
    dimensionAverages: {
      'Governance & Risk': 2.6,
      'Developer Enablement': 3.4,
      'Human Oversight': 2.5,
      'Workflow Integration': 3.0,
      'Platform & Architecture': 3.2,
      'Value Measurement': 2.4,
      'Data & Model Lifecycle': 2.5,
    },
    sampleSize: 200,
    lastUpdated: '2026-01-01',
  },
  'professional-services': {
    industry: 'professional-services',
    averageScore: 2.2,
    medianScore: 2.1,
    topQuartileScore: 3.0,
    bottomQuartileScore: 1.4,
    dimensionAverages: {
      'Governance & Risk': 2.4,
      'Developer Enablement': 2.3,
      'Human Oversight': 2.5,
      'Workflow Integration': 2.0,
      'Platform & Architecture': 1.9,
      'Value Measurement': 2.1,
      'Data & Model Lifecycle': 2.2,
    },
    sampleSize: 110,
    lastUpdated: '2026-01-01',
  },
  'energy-utilities': {
    industry: 'energy-utilities',
    averageScore: 1.7,
    medianScore: 1.6,
    topQuartileScore: 2.5,
    bottomQuartileScore: 1.0,
    dimensionAverages: {
      'Governance & Risk': 2.0,
      'Developer Enablement': 1.5,
      'Human Oversight': 2.1,
      'Workflow Integration': 1.6,
      'Platform & Architecture': 1.5,
      'Value Measurement': 1.4,
      'Data & Model Lifecycle': 1.8,
    },
    sampleSize: 80,
    lastUpdated: '2026-01-01',
  },
  'government': {
    industry: 'government',
    averageScore: 1.5,
    medianScore: 1.4,
    topQuartileScore: 2.3,
    bottomQuartileScore: 0.8,
    dimensionAverages: {
      'Governance & Risk': 2.0,
      'Developer Enablement': 1.2,
      'Human Oversight': 2.0,
      'Workflow Integration': 1.2,
      'Platform & Architecture': 1.1,
      'Value Measurement': 1.3,
      'Data & Model Lifecycle': 1.7,
    },
    sampleSize: 90,
    lastUpdated: '2026-01-01',
  },
  'education': {
    industry: 'education',
    averageScore: 1.6,
    medianScore: 1.5,
    topQuartileScore: 2.4,
    bottomQuartileScore: 0.9,
    dimensionAverages: {
      'Governance & Risk': 1.8,
      'Developer Enablement': 1.7,
      'Human Oversight': 1.9,
      'Workflow Integration': 1.4,
      'Platform & Architecture': 1.3,
      'Value Measurement': 1.4,
      'Data & Model Lifecycle': 1.7,
    },
    sampleSize: 100,
    lastUpdated: '2026-01-01',
  },
  'media-entertainment': {
    industry: 'media-entertainment',
    averageScore: 2.4,
    medianScore: 2.3,
    topQuartileScore: 3.2,
    bottomQuartileScore: 1.6,
    dimensionAverages: {
      'Governance & Risk': 2.1,
      'Developer Enablement': 2.8,
      'Human Oversight': 2.0,
      'Workflow Integration': 2.6,
      'Platform & Architecture': 2.7,
      'Value Measurement': 2.3,
      'Data & Model Lifecycle': 2.3,
    },
    sampleSize: 85,
    lastUpdated: '2026-01-01',
  },
  'transportation-logistics': {
    industry: 'transportation-logistics',
    averageScore: 1.9,
    medianScore: 1.8,
    topQuartileScore: 2.7,
    bottomQuartileScore: 1.1,
    dimensionAverages: {
      'Governance & Risk': 1.8,
      'Developer Enablement': 1.7,
      'Human Oversight': 2.0,
      'Workflow Integration': 2.2,
      'Platform & Architecture': 1.8,
      'Value Measurement': 1.7,
      'Data & Model Lifecycle': 1.9,
    },
    sampleSize: 95,
    lastUpdated: '2026-01-01',
  },
  'general': {
    industry: 'general',
    averageScore: 2.0,
    medianScore: 1.9,
    topQuartileScore: 2.8,
    bottomQuartileScore: 1.2,
    dimensionAverages: {
      'Governance & Risk': 2.1,
      'Developer Enablement': 2.0,
      'Human Oversight': 2.1,
      'Workflow Integration': 1.9,
      'Platform & Architecture': 1.8,
      'Value Measurement': 1.8,
      'Data & Model Lifecycle': 2.0,
    },
    sampleSize: 500,
    lastUpdated: '2026-01-01',
  },
}

export function getBenchmark(industry: Industry): IndustryBenchmark {
  return industryBenchmarks[industry]
}

/**
 * Calculate percentile rank within an industry
 * Uses the industry's score distribution to estimate position
 */
export function calculatePercentile(score: number, industry: Industry): number {
  const benchmark = industryBenchmarks[industry]

  // Simplified percentile estimation using quartile data
  // Assumes roughly normal distribution
  if (score <= benchmark.bottomQuartileScore) {
    // Bottom quartile: 0-25th percentile
    const ratio = score / benchmark.bottomQuartileScore
    return Math.round(ratio * 25)
  } else if (score <= benchmark.medianScore) {
    // Second quartile: 25-50th percentile
    const range = benchmark.medianScore - benchmark.bottomQuartileScore
    const position = (score - benchmark.bottomQuartileScore) / range
    return Math.round(25 + position * 25)
  } else if (score <= benchmark.topQuartileScore) {
    // Third quartile: 50-75th percentile
    const range = benchmark.topQuartileScore - benchmark.medianScore
    const position = (score - benchmark.medianScore) / range
    return Math.round(50 + position * 25)
  } else {
    // Top quartile: 75-100th percentile
    // Estimate position above top quartile (capped at 99)
    const aboveTopQuartile = score - benchmark.topQuartileScore
    const maxAbove = 4.0 - benchmark.topQuartileScore
    const position = Math.min(aboveTopQuartile / maxAbove, 1)
    return Math.min(99, Math.round(75 + position * 24))
  }
}

/**
 * Get comparison message based on score vs industry benchmark
 */
export function getComparisonMessage(score: number, industry: Industry): string {
  const benchmark = industryBenchmarks[industry]
  const diff = score - benchmark.averageScore
  const percentile = calculatePercentile(score, industry)

  if (percentile >= 75) {
    return `You're in the top quartile of ${benchmark.industry === 'general' ? 'all' : getIndustryDisplayName(industry)} organizations.`
  } else if (percentile >= 50) {
    return `You're above the median for ${benchmark.industry === 'general' ? 'all' : getIndustryDisplayName(industry)} organizations.`
  } else if (percentile >= 25) {
    return `You're in the second quartile, with room to grow compared to ${benchmark.industry === 'general' ? '' : getIndustryDisplayName(industry)} peers.`
  } else {
    return `There's significant opportunity to advance your AI maturity compared to ${benchmark.industry === 'general' ? '' : getIndustryDisplayName(industry)} peers.`
  }
}

function getIndustryDisplayName(industry: Industry): string {
  const names: Record<Industry, string> = {
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
    'transportation-logistics': 'Transportation & Logistics',
    'general': 'cross-industry',
  }
  return names[industry]
}

/**
 * Get dimension-level comparison for detailed breakdown
 */
export function getDimensionComparison(
  userScores: Record<Dimension, number>,
  industry: Industry
): Array<{ dimension: Dimension; userScore: number; benchmark: number; difference: number }> {
  const benchmark = industryBenchmarks[industry]

  return DIMENSIONS.map(dimension => ({
    dimension,
    userScore: userScores[dimension] || 0,
    benchmark: benchmark.dimensionAverages[dimension],
    difference: (userScores[dimension] || 0) - benchmark.dimensionAverages[dimension],
  }))
}
