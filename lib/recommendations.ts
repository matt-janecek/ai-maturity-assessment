import { type Dimension } from './questions'
import { type Industry } from './industries'
import { type DimensionScore } from './scoring'

export interface Recommendation {
  id: string
  title: string
  teaser: string
  fullDescription: string
  dimension: Dimension
  priority: 'high' | 'medium' | 'low'
  triggerCondition: (dimensionScores: Map<Dimension, number>) => boolean
  industryTeaser?: Partial<Record<Industry, string>>
  industryDescription?: Partial<Record<Industry, string>>
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
    industryTeaser: {
      'financial-services': 'Create centralized AI governance with model risk management expertise',
      'healthcare': 'Create centralized AI governance with clinical and compliance representation',
      'manufacturing': 'Create centralized AI governance spanning operations, quality, and supply chain',
      'retail': 'Create centralized AI governance with merchandising and customer experience input',
      'government': 'Create centralized AI governance aligned with federal AI guidance and FedRAMP',
      'professional-services': 'Create centralized AI governance with client confidentiality and quality focus',
    },
    industryDescription: {
      'financial-services': 'Form a cross-functional AI governance body with representation from Risk, Compliance, Trading, and IT. Include model risk management expertise. Define charter, decision authority, and regulatory alignment.',
      'healthcare': 'Form a cross-functional AI governance body with representation from Clinical Informatics, Compliance, Legal, and IT. Include IRB coordination for clinical AI. Define charter and patient safety protocols.',
      'manufacturing': 'Form a cross-functional AI governance body with representation from Operations, Quality, Engineering, and IT. Include safety and supply chain perspectives. Define charter and quality system integration.',
      'government': 'Form a cross-functional AI governance body with representation from Program Offices, Legal, Security, and IT. Align with OMB AI guidance and FedRAMP requirements. Define charter and oversight protocols.',
    },
  },
  {
    id: 'ai-policy-framework',
    title: 'Develop Comprehensive AI Policy',
    teaser: 'Document clear guidelines for acceptable AI use across the organization',
    fullDescription: 'Create formal AI usage policies covering approved tools, data handling requirements, review processes, and prohibited uses. Communicate organization-wide.',
    dimension: 'Governance & Risk',
    priority: 'high',
    triggerCondition: (scores) => (scores.get('Governance & Risk') || 0) < 2.5,
    industryTeaser: {
      'financial-services': 'Document AI policies aligned with financial regulations and client data protection',
      'healthcare': 'Document AI policies aligned with HIPAA, clinical safety, and patient consent',
      'manufacturing': 'Document AI policies aligned with quality systems and safety protocols',
      'government': 'Document AI policies aligned with federal guidance, privacy act, and security requirements',
    },
  },
  {
    id: 'shadow-ai-program',
    title: 'Implement Shadow AI Management',
    teaser: 'Gain visibility and control over unauthorized AI tool usage',
    fullDescription: 'Deploy monitoring to detect unauthorized AI usage. Provide approved alternatives for common use cases. Create intake process for new tool requests.',
    dimension: 'Governance & Risk',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Governance & Risk') || 0) < 3,
    industryTeaser: {
      'financial-services': 'Gain visibility into AI tool usage that could create regulatory or client data risks',
      'healthcare': 'Gain visibility into AI tool usage that could create HIPAA or patient safety risks',
      'professional-services': 'Gain visibility into AI tool usage in client deliverables and confidential work',
      'government': 'Gain visibility into AI tool usage that could create compliance or security risks',
    },
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
    industryTeaser: {
      'financial-services': 'Deploy compliant AI tools to all development and analysis teams',
      'healthcare': 'Deploy HIPAA-compliant AI tools to clinical informatics and IT teams',
      'technology': 'Deploy AI coding assistants and productivity tools across engineering',
      'professional-services': 'Deploy approved AI productivity tools to all consultants and analysts',
      'government': 'Deploy FedRAMP-authorized AI tools to program and technical staff',
    },
  },
  {
    id: 'ai-training-program',
    title: 'Launch AI Training Program',
    teaser: 'Upskill teams with structured AI learning curriculum',
    fullDescription: 'Develop role-based AI training tracks. Include prompt engineering, tool usage best practices, and AI-assisted workflow patterns. Track completion.',
    dimension: 'Developer Enablement',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Developer Enablement') || 0) < 3,
    industryTeaser: {
      'financial-services': 'Upskill traders, analysts, and advisors with AI training tailored to financial workflows',
      'healthcare': 'Upskill clinical and administrative staff with AI training for healthcare workflows',
      'manufacturing': 'Upskill engineers and shop floor workers with AI training for manufacturing',
      'professional-services': 'Upskill consultants across all levels with AI training for client delivery',
    },
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
    industryTeaser: {
      'financial-services': 'Define review checkpoints for AI-generated analyses, recommendations, and client communications',
      'healthcare': 'Define review checkpoints for AI-generated clinical recommendations and documentation',
      'technology': 'Define review checkpoints for AI-generated code, documentation, and product decisions',
      'professional-services': 'Define review checkpoints for AI-generated client deliverables and advice',
      'government': 'Define review checkpoints for AI-generated policy recommendations and citizen communications',
    },
  },
  {
    id: 'ai-accountability',
    title: 'Define AI Decision Accountability',
    teaser: 'Clarify ownership when AI-assisted decisions need correction',
    fullDescription: 'Create RACI matrix for AI decisions. Document escalation paths. Ensure clear human ownership of AI-assisted outcomes.',
    dimension: 'Human Oversight',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Human Oversight') || 0) < 3,
    industryTeaser: {
      'financial-services': 'Clarify ownership when AI-assisted trading or client decisions go wrong',
      'healthcare': 'Clarify accountability when AI-assisted clinical decisions lead to adverse outcomes',
      'manufacturing': 'Clarify accountability when AI-assisted quality decisions cause defects',
      'government': 'Clarify accountability when AI-assisted program decisions impact citizens',
    },
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
    industryTeaser: {
      'financial-services': 'Identify high-value opportunities in trading, risk, and client service workflows',
      'healthcare': 'Identify high-value opportunities in clinical and administrative workflows',
      'manufacturing': 'Identify high-value opportunities in production, quality, and supply chain',
      'retail': 'Identify high-value opportunities in merchandising, marketing, and fulfillment',
      'professional-services': 'Identify high-value opportunities in research, analysis, and client delivery',
    },
  },
  {
    id: 'embed-ai-processes',
    title: 'Embed AI in Standard Processes',
    teaser: 'Make AI assistance the default rather than optional',
    fullDescription: 'Update process documentation to include AI tools. Integrate AI into CI/CD pipelines, documentation workflows, and code review.',
    dimension: 'Workflow Integration',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Workflow Integration') || 0) < 3,
    industryTeaser: {
      'technology': 'Embed AI in CI/CD pipelines, code review, documentation, and incident response',
      'professional-services': 'Embed AI in research methodologies, analysis frameworks, and deliverable creation',
      'retail': 'Embed AI in pricing, personalization, and demand planning processes',
    },
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
    industryTeaser: {
      'financial-services': 'Plan centralized AI capabilities with model risk management and compliance integration',
      'healthcare': 'Plan centralized AI capabilities with EHR integration and clinical validation',
      'manufacturing': 'Plan centralized AI capabilities with IIoT, edge computing, and MES integration',
      'technology': 'Plan centralized ML platform with model registry, feature store, and RAG capabilities',
    },
  },
  {
    id: 'implement-rag',
    title: 'Implement RAG for Internal Knowledge',
    teaser: 'Connect AI tools to company documentation and data',
    fullDescription: 'Deploy retrieval-augmented generation to enable AI access to internal knowledge bases, documentation, and code repositories.',
    dimension: 'Platform & Architecture',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Platform & Architecture') || 0) < 3,
    industryTeaser: {
      'financial-services': 'Connect AI to internal research, policies, and compliance documentation',
      'healthcare': 'Connect AI to clinical protocols, patient records, and research securely',
      'professional-services': 'Connect AI to methodologies, past engagements, and firm expertise',
      'technology': 'Connect AI to codebase, documentation, and internal knowledge bases',
    },
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
    industryTeaser: {
      'financial-services': 'Track AI ROI with metrics on alpha generation, efficiency, and risk reduction',
      'healthcare': 'Track AI ROI with metrics on clinical outcomes, efficiency, and patient satisfaction',
      'manufacturing': 'Track AI ROI with metrics on yield, uptime, quality, and cost savings',
      'retail': 'Track AI ROI with metrics on revenue, margin, and customer lifetime value',
    },
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
    industryTeaser: {
      'financial-services': 'Standardize prompts for financial analysis, client communications, and compliance',
      'healthcare': 'Standardize prompts for clinical documentation, patient communication, and research',
      'professional-services': 'Standardize prompts for research, analysis, and deliverable creation',
      'technology': 'Standardize prompts for coding, documentation, and product development',
    },
  },
  {
    id: 'vendor-privacy-review',
    title: 'Establish AI Vendor Review Process',
    teaser: 'Ensure data protection before adopting new AI tools',
    fullDescription: 'Create formal review process for AI vendor data handling, privacy policies, and security practices. Include Legal and Security in evaluations.',
    dimension: 'Data & Model Lifecycle',
    priority: 'medium',
    triggerCondition: (scores) => (scores.get('Data & Model Lifecycle') || 0) < 3,
    industryTeaser: {
      'financial-services': 'Ensure AI vendors meet financial regulatory and client data requirements',
      'healthcare': 'Ensure AI vendors have proper HIPAA compliance and BAAs in place',
      'government': 'Ensure AI vendors meet FedRAMP authorization and data sovereignty requirements',
      'professional-services': 'Ensure AI vendors meet client confidentiality and data protection standards',
    },
  },
]

/**
 * Get the teaser text for a recommendation, with industry-specific variant if available
 */
export function getRecommendationTeaser(rec: Recommendation, industry: Industry): string {
  if (industry !== 'general' && rec.industryTeaser?.[industry]) {
    return rec.industryTeaser[industry]
  }
  return rec.teaser
}

/**
 * Get the full description for a recommendation, with industry-specific variant if available
 */
export function getRecommendationDescription(rec: Recommendation, industry: Industry): string {
  if (industry !== 'general' && rec.industryDescription?.[industry]) {
    return rec.industryDescription[industry]
  }
  return rec.fullDescription
}

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
