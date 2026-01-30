export const INDUSTRIES = [
  'financial-services',
  'healthcare',
  'manufacturing',
  'retail',
  'technology',
  'professional-services',
  'energy-utilities',
  'government',
  'education',
  'media-entertainment',
  'transportation-logistics',
  'general',
] as const

export type Industry = (typeof INDUSTRIES)[number]

export interface IndustryInfo {
  id: Industry
  name: string
  description: string
  icon: string
  examples: string[]
}

export const industryData: Record<Industry, IndustryInfo> = {
  'financial-services': {
    id: 'financial-services',
    name: 'Financial Services',
    description: 'Banking, insurance, and investment management',
    icon: '🏦',
    examples: ['Banks', 'Insurance', 'Investment firms', 'Credit unions'],
  },
  'healthcare': {
    id: 'healthcare',
    name: 'Healthcare & Life Sciences',
    description: 'Hospitals, pharmaceuticals, and biotech',
    icon: '🏥',
    examples: ['Hospitals', 'Pharma', 'Biotech', 'Medical devices'],
  },
  'manufacturing': {
    id: 'manufacturing',
    name: 'Manufacturing',
    description: 'Discrete, process, and industrial manufacturing',
    icon: '🏭',
    examples: ['Automotive', 'Electronics', 'Industrial equipment', 'Consumer goods'],
  },
  'retail': {
    id: 'retail',
    name: 'Retail & Consumer Goods',
    description: 'E-commerce, CPG, and grocery',
    icon: '🛒',
    examples: ['E-commerce', 'Brick-and-mortar', 'CPG brands', 'Grocery chains'],
  },
  'technology': {
    id: 'technology',
    name: 'Technology & Software',
    description: 'SaaS, IT services, and tech companies',
    icon: '💻',
    examples: ['SaaS companies', 'IT services', 'Tech startups', 'Enterprise software'],
  },
  'professional-services': {
    id: 'professional-services',
    name: 'Professional Services',
    description: 'Consulting, legal, and accounting firms',
    icon: '💼',
    examples: ['Management consulting', 'Law firms', 'Accounting', 'Advisory'],
  },
  'energy-utilities': {
    id: 'energy-utilities',
    name: 'Energy & Utilities',
    description: 'Oil & gas, power, and renewables',
    icon: '⚡',
    examples: ['Oil & gas', 'Electric utilities', 'Renewables', 'Water utilities'],
  },
  'government': {
    id: 'government',
    name: 'Government & Public Sector',
    description: 'Federal, state, and local agencies',
    icon: '🏛️',
    examples: ['Federal agencies', 'State government', 'Local government', 'Public institutions'],
  },
  'education': {
    id: 'education',
    name: 'Education',
    description: 'K-12, higher education, and EdTech',
    icon: '🎓',
    examples: ['Universities', 'K-12 schools', 'EdTech companies', 'Training providers'],
  },
  'media-entertainment': {
    id: 'media-entertainment',
    name: 'Media & Entertainment',
    description: 'Broadcasting, streaming, publishing, and gaming',
    icon: '🎬',
    examples: ['Streaming services', 'Publishers', 'Gaming studios', 'Broadcasters'],
  },
  'transportation-logistics': {
    id: 'transportation-logistics',
    name: 'Transportation & Logistics',
    description: 'Airlines, shipping, freight, and logistics',
    icon: '🚚',
    examples: ['Airlines', 'Shipping', 'Freight', '3PL providers'],
  },
  'general': {
    id: 'general',
    name: 'General / Other',
    description: 'Cross-industry or not listed above',
    icon: '🏢',
    examples: ['Multi-industry', 'Non-profit', 'Other sectors'],
  },
}

export function getIndustryInfo(industry: Industry): IndustryInfo {
  return industryData[industry]
}

export function getIndustryName(industry: Industry): string {
  return industryData[industry].name
}

export function getAllIndustries(): IndustryInfo[] {
  return INDUSTRIES.map(id => industryData[id])
}
