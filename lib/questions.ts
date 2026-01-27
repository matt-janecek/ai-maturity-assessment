export interface QuestionOption {
  value: number
  label: string
  description?: string
}

export interface Question {
  id: string
  dimension: string
  text: string
  options: QuestionOption[]
  isCore: boolean
}

export const DIMENSIONS = [
  'Governance & Risk',
  'Developer Enablement',
  'Human Oversight',
  'Workflow Integration',
  'Platform & Architecture',
  'Value Measurement',
  'Data & Model Lifecycle',
] as const

export type Dimension = (typeof DIMENSIONS)[number]

// Core questions (1 per dimension, required)
export const coreQuestions: Question[] = [
  {
    id: 'gov-coe',
    dimension: 'Governance & Risk',
    text: 'Does your organization have a dedicated AI governance team or Center of Excellence?',
    options: [
      { value: 0, label: 'No AI governance structure', description: 'No dedicated team or formal governance' },
      { value: 1, label: 'Informal oversight only', description: 'Ad-hoc governance by IT or leadership' },
      { value: 2, label: 'Part-time governance role', description: 'Someone owns AI governance alongside other duties' },
      { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE or governance committee' },
      { value: 4, label: 'Mature AI governance', description: 'Full CoE with cross-functional authority' },
    ],
    isCore: true,
  },
  {
    id: 'dev-tools',
    dimension: 'Developer Enablement',
    text: 'What AI coding/productivity tools are available to your teams?',
    options: [
      { value: 0, label: 'No AI tools available', description: 'No approved AI development tools' },
      { value: 1, label: 'Limited personal use', description: 'Some individuals use free tools' },
      { value: 2, label: 'Select team access', description: 'AI tools available to some teams' },
      { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools for all developers' },
      { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite with training and best practices' },
    ],
    isCore: true,
  },
  {
    id: 'human-review',
    dimension: 'Human Oversight',
    text: 'Are there defined review checkpoints for AI-generated outputs?',
    options: [
      { value: 0, label: 'No review process', description: 'AI outputs used without verification' },
      { value: 1, label: 'Informal review', description: 'Individual discretion on review' },
      { value: 2, label: 'Team guidelines', description: 'Teams have review expectations' },
      { value: 3, label: 'Formal review process', description: 'Documented review checkpoints' },
      { value: 4, label: 'Systematic oversight', description: 'Comprehensive review with metrics' },
    ],
    isCore: true,
  },
  {
    id: 'workflow-stages',
    dimension: 'Workflow Integration',
    text: 'At how many stages of your workflows is AI currently integrated?',
    options: [
      { value: 0, label: 'None', description: 'AI not integrated in any workflows' },
      { value: 1, label: '1-2 stages', description: 'AI in limited workflow phases' },
      { value: 2, label: '3-4 stages', description: 'AI across multiple workflow phases' },
      { value: 3, label: '5+ stages', description: 'AI embedded throughout processes' },
      { value: 4, label: 'AI-native workflows', description: 'Workflows designed around AI' },
    ],
    isCore: true,
  },
  {
    id: 'platform-internal',
    dimension: 'Platform & Architecture',
    text: 'Is your organization building an internal AI platform or using vendor tools only?',
    options: [
      { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
      { value: 1, label: 'Vendor tools only', description: 'Using external SaaS AI tools' },
      { value: 2, label: 'Emerging platform', description: 'Building internal AI capabilities' },
      { value: 3, label: 'Internal AI platform', description: 'Centralized platform with APIs' },
      { value: 4, label: 'Enterprise AI platform', description: 'Full platform with RAG/fine-tuning' },
    ],
    isCore: true,
  },
  {
    id: 'value-roi',
    dimension: 'Value Measurement',
    text: 'How do you measure return on AI investments?',
    options: [
      { value: 0, label: 'No measurement', description: 'AI value not tracked' },
      { value: 1, label: 'Anecdotal benefits', description: 'Informal feedback only' },
      { value: 2, label: 'Basic metrics', description: 'Some productivity tracking' },
      { value: 3, label: 'ROI dashboard', description: 'Formal metrics and reporting' },
      { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with competitive analysis' },
    ],
    isCore: true,
  },
  {
    id: 'data-prompts',
    dimension: 'Data & Model Lifecycle',
    text: 'Do you have standardized, reusable prompts or prompt templates?',
    options: [
      { value: 0, label: 'No prompt standards', description: 'Individual ad-hoc prompts' },
      { value: 1, label: 'Informal sharing', description: 'Some prompts shared informally' },
      { value: 2, label: 'Team libraries', description: 'Teams maintain prompt collections' },
      { value: 3, label: 'Centralized library', description: 'Organization-wide prompt repository' },
      { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with governance' },
    ],
    isCore: true,
  },
]

// Deep-dive questions (optional, for more detailed assessment)
export const deepDiveQuestions: Question[] = [
  {
    id: 'gov-shadow',
    dimension: 'Governance & Risk',
    text: 'How confident are you in managing shadow AI usage across your organization?',
    options: [
      { value: 0, label: 'Not aware of shadow AI', description: 'No visibility into unauthorized usage' },
      { value: 1, label: 'Aware but no controls', description: 'Know it exists, no management' },
      { value: 2, label: 'Monitoring in place', description: 'Can detect but not prevent' },
      { value: 3, label: 'Controls implemented', description: 'Policies and technical controls' },
      { value: 4, label: 'Fully managed', description: 'Comprehensive shadow AI program' },
    ],
    isCore: false,
  },
  {
    id: 'dev-training',
    dimension: 'Developer Enablement',
    text: 'Does your organization have structured AI training programs?',
    options: [
      { value: 0, label: 'No training', description: 'No AI training available' },
      { value: 1, label: 'Self-directed only', description: 'Employees learn on their own' },
      { value: 2, label: 'Informal sessions', description: 'Occasional lunch-and-learns' },
      { value: 3, label: 'Structured curriculum', description: 'Formal training program' },
      { value: 4, label: 'Comprehensive academy', description: 'Role-based tracks with certification' },
    ],
    isCore: false,
  },
  {
    id: 'human-accountability',
    dimension: 'Human Oversight',
    text: 'Is there clear accountability when AI-assisted decisions go wrong?',
    options: [
      { value: 0, label: 'No accountability structure', description: 'Unclear who is responsible' },
      { value: 1, label: 'Follows existing chains', description: 'Uses general reporting' },
      { value: 2, label: 'Informal understanding', description: 'Generally understood, not documented' },
      { value: 3, label: 'Documented RACI', description: 'Clear ownership documented' },
      { value: 4, label: 'Mature accountability', description: 'Full framework with escalation' },
    ],
    isCore: false,
  },
  {
    id: 'workflow-critical',
    dimension: 'Workflow Integration',
    text: 'Do any critical business processes depend on AI?',
    options: [
      { value: 0, label: 'No AI dependencies', description: 'AI is optional everywhere' },
      { value: 1, label: 'Enhancement only', description: 'AI helps but not required' },
      { value: 2, label: 'Some dependencies', description: 'A few processes need AI' },
      { value: 3, label: 'Mission-critical use', description: 'Key processes depend on AI' },
      { value: 4, label: 'AI-essential operations', description: 'Business relies on AI' },
    ],
    isCore: false,
  },
  {
    id: 'platform-rag',
    dimension: 'Platform & Architecture',
    text: 'Can your AI tools access and reason over internal documents?',
    options: [
      { value: 0, label: 'No internal access', description: 'AI cannot access company data' },
      { value: 1, label: 'Manual copy/paste', description: 'Users paste content into AI' },
      { value: 2, label: 'Limited integration', description: 'Some docs connected to AI' },
      { value: 3, label: 'RAG implemented', description: 'AI retrieves from doc stores' },
      { value: 4, label: 'Full knowledge platform', description: 'Comprehensive RAG with updates' },
    ],
    isCore: false,
  },
  {
    id: 'value-stories',
    dimension: 'Value Measurement',
    text: 'Do you have documented AI success stories to share internally?',
    options: [
      { value: 0, label: 'No success stories', description: 'No documentation of wins' },
      { value: 1, label: 'Verbal sharing', description: 'Stories shared informally' },
      { value: 2, label: 'Some case studies', description: 'A few documented examples' },
      { value: 3, label: 'Internal library', description: 'Collection of success stories' },
      { value: 4, label: 'Marketing AI wins', description: 'Used in external communications' },
    ],
    isCore: false,
  },
  {
    id: 'data-privacy',
    dimension: 'Data & Model Lifecycle',
    text: 'Do you review vendor data privacy policies before using AI tools?',
    options: [
      { value: 0, label: 'No review process', description: 'Policies not reviewed' },
      { value: 1, label: 'Ad-hoc review', description: 'Sometimes reviewed' },
      { value: 2, label: 'IT review required', description: 'IT checks before approval' },
      { value: 3, label: 'Formal review process', description: 'Legal/security review' },
      { value: 4, label: 'Comprehensive vetting', description: 'Full due diligence process' },
    ],
    isCore: false,
  },
]

export const allQuestions = [...coreQuestions, ...deepDiveQuestions]

export function getQuestionsByDimension(dimension: Dimension): Question[] {
  return allQuestions.filter(q => q.dimension === dimension)
}

export function getCoreQuestions(): Question[] {
  return coreQuestions
}

export function getDeepDiveQuestions(): Question[] {
  return deepDiveQuestions
}
