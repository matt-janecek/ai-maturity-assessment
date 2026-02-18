import { describe, it, expect } from 'vitest'
import {
  calculateDimensionScores,
  calculateOverallScore,
  getMaturityLevel,
  getScurvePosition,
  type Answer,
} from '../scoring'

describe('calculateDimensionScores', () => {
  it('returns 0 score for dimensions with no answers', () => {
    const scores = calculateDimensionScores([])
    for (const s of scores) {
      expect(s.score).toBe(0)
      expect(s.questionsAnswered).toBe(0)
    }
  })

  it('calculates average score for a dimension', () => {
    const answers: Answer[] = [
      { questionId: 'q1', dimension: 'Governance & Risk', value: 3 },
      { questionId: 'q2', dimension: 'Governance & Risk', value: 1 },
    ]
    const scores = calculateDimensionScores(answers)
    const gov = scores.find(s => s.dimension === 'Governance & Risk')
    expect(gov).toBeDefined()
    expect(gov!.score).toBe(2)
    expect(gov!.questionsAnswered).toBe(2)
  })

  it('rounds to one decimal place', () => {
    const answers: Answer[] = [
      { questionId: 'q1', dimension: 'Governance & Risk', value: 1 },
      { questionId: 'q2', dimension: 'Governance & Risk', value: 2 },
      { questionId: 'q3', dimension: 'Governance & Risk', value: 3 },
    ]
    const scores = calculateDimensionScores(answers)
    const gov = scores.find(s => s.dimension === 'Governance & Risk')
    expect(gov!.score).toBe(2) // 6/3 = 2.0
  })
})

describe('calculateOverallScore', () => {
  it('averages dimension scores', () => {
    const dimensionScores = [
      { dimension: 'Governance & Risk' as const, score: 2, questionsAnswered: 2 },
      { dimension: 'Developer Enablement' as const, score: 4, questionsAnswered: 2 },
    ]
    const overall = calculateOverallScore(dimensionScores)
    expect(overall).toBe(3) // (2+4)/2
  })

  it('ignores dimensions with zero questions', () => {
    const dimensionScores = [
      { dimension: 'Governance & Risk' as const, score: 3, questionsAnswered: 2 },
      { dimension: 'Developer Enablement' as const, score: 0, questionsAnswered: 0 },
    ]
    const overall = calculateOverallScore(dimensionScores)
    expect(overall).toBe(3) // Only one dimension counted
  })
})

describe('getMaturityLevel', () => {
  it('returns level 0 for score 0', () => {
    const ml = getMaturityLevel(0)
    expect(ml.level).toBe(0)
    expect(ml.name).toBe('AI-Aware')
  })

  it('returns level 1 for score 1.5', () => {
    const ml = getMaturityLevel(1.5)
    expect(ml.level).toBe(1)
    expect(ml.name).toBe('Tool Adoption')
  })

  it('returns level 2 for score 2.0', () => {
    const ml = getMaturityLevel(2.0)
    expect(ml.level).toBe(2)
  })

  it('returns level 3 for score 3.2', () => {
    const ml = getMaturityLevel(3.2)
    expect(ml.level).toBe(3)
  })

  it('returns level 4 for score 3.8', () => {
    const ml = getMaturityLevel(3.8)
    expect(ml.level).toBe(4)
    expect(ml.name).toBe('AI-Native Strategic')
  })

  it('returns level 4 for max score 4.0', () => {
    expect(getMaturityLevel(4.0).level).toBe(4)
  })
})

describe('getScurvePosition', () => {
  it('returns a position between 0 and 100', () => {
    const pos = getScurvePosition(2.5)
    expect(pos).toBeGreaterThanOrEqual(0)
    expect(pos).toBeLessThanOrEqual(100)
  })

  it('increases monotonically with score', () => {
    const p0 = getScurvePosition(0)
    const p1 = getScurvePosition(1)
    const p2 = getScurvePosition(2)
    const p3 = getScurvePosition(3)
    const p4 = getScurvePosition(4)
    expect(p1).toBeGreaterThan(p0)
    expect(p2).toBeGreaterThan(p1)
    expect(p3).toBeGreaterThan(p2)
    expect(p4).toBeGreaterThan(p3)
  })
})
