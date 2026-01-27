import { type Dimension } from './questions'
import { type DimensionScore } from './scoring'

export interface Recommendation {
  id: string
  title: string
  teaser: string
  fullDescription: string
  dimension: Dimension
  priority: 'high' | 'medium' | 'low'
  triggerCondition: (dimensionScores: Map<Dimension, number>) => boolean
}

export const recommendations: Recommendation[] = [
  // Governance & Risk
  {
    id: 'establish-ai-coe',
    title: 'Establish AI Center of Excellence',
    teaser: 'Create centralized AI governance to accelerate adoption while managing risk',
    fullDescription: 'Form a cross-functional AI governance body with representation from IT, Legal, Security, and Business units. Define charter, decision authority, and meeting cadence.',
    dimension: 'Governance & Risk',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Governance & Risk') || 0) < 2,
  },
  {
    id: 'ai-policy-framework',
    title: 'Develop Comprehensive AI Policy',
    teaser: 'Document clear guidelines for acceptable AI use across the organization',
    fullDescription: 'Create formal AI usage policies covering approved tools, data handling requirements, review processes, and prohibited uses. Communicate organization-wide.',
    dimension: 'Governance & Risk',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Governance & Risk') || 0) < 2.5,
  },
  {
    id: 'shadow-ai-program',
    title: 'Implement Shadow AI Management',
    teaser: 'Gain visibility and control over unauthorized AI tool usage',
    fullDescription: 'Deploy monitoring to detect unauthorized AI usage. Provide approved alternatives for common use cases. Create intake process for new tool requests.',
    dimension: 'Governance & Risk',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Governance & Risk') || 0) < 3,
  },

  // Developer Enablement
  {
    id: 'expand-ai-tools',
    title: 'Expand AI Tool Access',
    teaser: 'Deploy AI coding assistants to all development teams',
    fullDescription: 'Approve and fund AI development tools (GitHub Copilot, etc.) for all developers. Move from opt-in to expected-use model with tracking.',
    dimension: 'Developer Enablement',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Developer Enablement') || 0) < 2.5,
  },
  {
    id: 'ai-training-program',
    title: 'Launch AI Training Program',
    teaser: 'Upskill teams with structured AI learning curriculum',
    fullDescription: 'Develop role-based AI training tracks. Include prompt engineering, tool usage best practices, and AI-assisted workflow patterns. Track completion.',
    dimension: 'Developer Enablement',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Developer Enablement') || 0) < 3,
  },
  {
    id: 'ai-best-practices',
    title: 'Document AI Best Practices',
    teaser: 'Capture and share effective AI usage patterns',
    fullDescription: 'Create internal knowledge base of effective prompts, workflow integrations, and lessons learned. Establish community of practice.',
    dimension: 'Developer Enablement',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Developer Enablement') || 0) < 3.5,
  },

  // Human Oversight
  {
    id: 'ai-review-process',
    title: 'Establish AI Output Review Process',
    teaser: 'Define mandatory review checkpoints for AI-generated content',
    fullDescription: 'Create review guidelines specific to AI outputs. Define which outputs require review, by whom, and with what criteria.',
    dimension: 'Human Oversight',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Human Oversight') || 0) < 2,
  },
  {
    id: 'ai-accountability',
    title: 'Define AI Decision Accountability',
    teaser: 'Clarify ownership when AI-assisted decisions need correction',
    fullDescription: 'Create RACI matrix for AI decisions. Document escalation paths. Ensure clear human ownership of AI-assisted outcomes.',
    dimension: 'Human Oversight',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Human Oversight') || 0) < 3,
  },

  // Workflow Integration
  {
    id: 'workflow-assessment',
    title: 'Assess AI Integration Opportunities',
    teaser: 'Identify high-value workflows for AI enhancement',
    fullDescription: 'Map current workflows and identify opportunities for AI integration. Prioritize by potential impact and implementation complexity.',
    dimension: 'Workflow Integration',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Workflow Integration') || 0) < 2,
  },
  {
    id: 'embed-ai-processes',
    title: 'Embed AI in Standard Processes',
    teaser: 'Make AI assistance the default rather than optional',
    fullDescription: 'Update process documentation to include AI tools. Integrate AI into CI/CD pipelines, documentation workflows, and code review.',
    dimension: 'Workflow Integration',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Workflow Integration') || 0) < 3,
  },

  // Platform & Architecture
  {
    id: 'ai-platform-strategy',
    title: 'Develop AI Platform Strategy',
    teaser: 'Plan centralized AI capabilities beyond vendor tools',
    fullDescription: 'Assess build vs. buy for AI platform. Define API strategy, model management approach, and developer self-service goals.',
    dimension: 'Platform & Architecture',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Platform & Architecture') || 0) < 2,
  },
  {
    id: 'implement-rag',
    title: 'Implement RAG for Internal Knowledge',
    teaser: 'Connect AI tools to company documentation and data',
    fullDescription: 'Deploy retrieval-augmented generation to enable AI access to internal knowledge bases, documentation, and code repositories.',
    dimension: 'Platform & Architecture',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Platform & Architecture') || 0) < 3,
  },

  // Value Measurement
  {
    id: 'exec-dashboard',
    title: 'Implement Executive ROI Dashboard',
    teaser: 'Track AI investments with unified metrics visibility',
    fullDescription: 'Deploy dashboard showing AI adoption rates, productivity metrics, cost analysis, and ROI tracking. Establish regular reporting cadence.',
    dimension: 'Value Measurement',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Value Measurement') || 0) < 3,
  },
  {
    id: 'success-stories',
    title: 'Document AI Success Stories',
    teaser: 'Capture and communicate AI wins to drive adoption',
    fullDescription: 'Create case studies of successful AI implementations. Use in internal communications, training, and stakeholder updates.',
    dimension: 'Value Measurement',
    priority: 'low',
    triggerCondition: (scores) => (scores.get('Value Measurement') || 0) < 3.5,
  },

  // Data & Model Lifecycle
  {
    id: 'prompt-library',
    title: 'Build Centralized Prompt Library',
    teaser: 'Standardize and share effective prompts organization-wide',
    fullDescription: 'Create repository of tested, approved prompts for common use cases. Include categorization, usage guidance, and feedback mechanism.',
    dimension: 'Data & Model Lifecycle',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Data & Model Lifecycle') || 0) < 2.5,
  },
  {
    id: 'vendor-privacy-review',
    title: 'Establish AI Vendor Review Process',
    teaser: 'Ensure data protection before adopting new AI tools',
    fullDescription: 'Create formal review process for AI vendor data handling, privacy policies, and security practices. Include Legal and Security in evaluations.',
    dimension: 'Data & Model Lifecycle',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Data & Model Lifecycle') || 0) < 3,
  },
]

export function getTriggeredRecommendations(
  dimensionScores: DimensionScore[]
): Recommendation[] {
  const scoreMap = new Map<Dimension, number>()

  for (const ds of dimensionScores) {
    scoreMap.set(ds.dimension as Dimension, ds.score)
  }

  const triggered = recommendations.filter(rec => rec.triggerCondition(scoreMap))

  // Sort by priority: high > medium > low
  const priorityOrder = { high: 0, medium: 1, low: 2 }
  triggered.sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])

  return triggered
}

export function getTopRecommendations(
  dimensionScores: DimensionScore[],
  count: number = 3
): Recommendation[] {
  const all = getTriggeredRecommendations(dimensionScores)
  return all.slice(0, count)
}

export function getRecommendationCount(dimensionScores: DimensionScore[]): number {
  return getTriggeredRecommendations(dimensionScores).length
}
