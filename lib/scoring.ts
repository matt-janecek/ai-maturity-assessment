import { DIMENSIONS, type Dimension } from './questions'

export interface Answer {
  questionId: string
  dimension: Dimension
  value: number
}

export interface DimensionScore {
  dimension: Dimension
  score: number
  questionsAnswered: number
}

export interface AssessmentResult {
  overallScore: number
  maturityLevel: number
  maturityName: string
  dimensionScores: DimensionScore[]
  answers: Answer[]
}

export const MATURITY_LEVELS = [
  { level: 0, name: 'AI-Aware', minScore: 0, maxScore: 0.9 },
  { level: 1, name: 'Tool Adoption', minScore: 1.0, maxScore: 1.9 },
  { level: 2, name: 'Workflow Integration', minScore: 2.0, maxScore: 2.9 },
  { level: 3, name: 'Platform & Governance', minScore: 3.0, maxScore: 3.5 },
  { level: 4, name: 'AI-Native Strategic', minScore: 3.6, maxScore: 4.0 },
] as const

export function calculateDimensionScores(answers: Answer[]): DimensionScore[] {
  const dimensionScores: DimensionScore[] = []

  for (const dimension of DIMENSIONS) {
    const dimensionAnswers = answers.filter(a => a.dimension === dimension)

    if (dimensionAnswers.length === 0) {
      dimensionScores.push({
        dimension,
        score: 0,
        questionsAnswered: 0,
      })
    } else {
      const totalScore = dimensionAnswers.reduce((sum, a) => sum + a.value, 0)
      const avgScore = totalScore / dimensionAnswers.length

      dimensionScores.push({
        dimension,
        score: Math.round(avgScore * 10) / 10, // Round to 1 decimal
        questionsAnswered: dimensionAnswers.length,
      })
    }
  }

  return dimensionScores
}

export function calculateOverallScore(dimensionScores: DimensionScore[]): number {
  const scoresWithAnswers = dimensionScores.filter(d => d.questionsAnswered > 0)

  if (scoresWithAnswers.length === 0) return 0

  const totalScore = scoresWithAnswers.reduce((sum, d) => sum + d.score, 0)
  return Math.round((totalScore / scoresWithAnswers.length) * 100) / 100
}

export function getMaturityLevel(score: number): { level: number; name: string } {
  for (const maturity of MATURITY_LEVELS) {
    if (score >= maturity.minScore && score <= maturity.maxScore) {
      return { level: maturity.level, name: maturity.name }
    }
  }

  // Default to highest if score exceeds
  if (score > 4) {
    return { level: 4, name: 'AI-Native Strategic' }
  }

  return { level: 0, name: 'AI-Aware' }
}

export function calculateAssessmentResult(answers: Answer[]): AssessmentResult {
  const dimensionScores = calculateDimensionScores(answers)
  const overallScore = calculateOverallScore(dimensionScores)
  const maturity = getMaturityLevel(overallScore)

  return {
    overallScore,
    maturityLevel: maturity.level,
    maturityName: maturity.name,
    dimensionScores,
    answers,
  }
}

// Calculate position on S-curve (0-100 percentage)
export function getScurvePosition(score: number): number {
  // Map 0-4 score to 0-100 position on curve
  // The S-curve has positions at roughly: 0=10%, 1=25%, 2=45%, 3=70%, 4=90%
  const positions: Record<number, number> = {
    0: 10,
    1: 25,
    2: 45,
    3: 70,
    4: 90,
  }

  const floor = Math.floor(score)
  const ceil = Math.min(4, Math.ceil(score))

  if (floor === ceil) {
    return positions[floor] || 10
  }

  // Interpolate between positions
  const lowerPos = positions[floor] || 10
  const upperPos = positions[ceil] || 90
  const fraction = score - floor

  return Math.round(lowerPos + (upperPos - lowerPos) * fraction)
}

// Get color class for a given level
export function getLevelColor(level: number): string {
  const colors: Record<number, string> = {
    0: 'level-0',
    1: 'level-1',
    2: 'level-2',
    3: 'level-3',
    4: 'level-4',
  }
  return colors[level] || 'level-0'
}

// Get gradient class for a given level
export function getLevelGradient(level: number): string {
  const gradients: Record<number, string> = {
    0: 'bg-level-0',
    1: 'bg-level-1',
    2: 'bg-level-2',
    3: 'bg-level-3',
    4: 'bg-level-4',
  }
  return gradients[level] || 'bg-level-0'
}

// Get description for maturity level
export function getMaturityDescription(level: number): string {
  const descriptions: Record<number, string> = {
    0: 'Early AI interest with risk of overhyping. No formal AI capability. Shadow usage likely. No governance framework.',
    1: 'AI experimentation, mostly in isolated contexts. Approved tools deployed. Limited governance. Optional usage.',
    2: 'AI in production, creating value through process optimization. Team-level adoption. Documented practices.',
    3: 'AI pervasively used for digital transformation. Enterprise platform. Formal governance.',
    4: 'AI is part of business DNA. Competitive differentiator. Continuous innovation.',
  }
  return descriptions[level] || descriptions[0]
}
