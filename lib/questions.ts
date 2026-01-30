import { type Industry } from './industries'

export interface QuestionOption {
  value: number
  label: string
  description?: string
}

export interface Question {
  id: string
  dimension: string
  text: string // Base text (used for 'general' industry)
  industryText?: Partial<Record<Industry, string>> // Industry-specific question text
  options: QuestionOption[] // Base options (used for 'general' industry)
  industryOptions?: Partial<Record<Industry, QuestionOption[]>> // Industry-specific options
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
    industryText: {
      'financial-services': 'Does your organization have a dedicated AI governance team or Center of Excellence for financial AI applications?',
      'healthcare': 'Does your organization have a dedicated AI governance team or Center of Excellence for clinical and administrative AI?',
      'manufacturing': 'Does your organization have a dedicated AI governance team or Center of Excellence for industrial AI applications?',
      'retail': 'Does your organization have a dedicated AI governance team or Center of Excellence for retail AI applications?',
      'technology': 'Does your organization have a dedicated AI governance team or Center of Excellence?',
      'professional-services': 'Does your firm have a dedicated AI governance team or Center of Excellence for client-facing and internal AI?',
      'energy-utilities': 'Does your organization have a dedicated AI governance team or Center of Excellence for operational AI?',
      'government': 'Does your agency have a dedicated AI governance team or Center of Excellence aligned with federal AI guidelines?',
      'education': 'Does your institution have a dedicated AI governance team or Center of Excellence for educational AI?',
      'media-entertainment': 'Does your organization have a dedicated AI governance team or Center of Excellence for content and production AI?',
      'transportation-logistics': 'Does your organization have a dedicated AI governance team or Center of Excellence for logistics AI?',
    },
    options: [
      { value: 0, label: 'No AI governance structure', description: 'No dedicated team or formal governance' },
      { value: 1, label: 'Informal oversight only', description: 'Ad-hoc governance by IT or leadership' },
      { value: 2, label: 'Part-time governance role', description: 'Someone owns AI governance alongside other duties' },
      { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE or governance committee' },
      { value: 4, label: 'Mature AI governance', description: 'Full CoE with cross-functional authority' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'Risk or IT occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Compliance or risk officer has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with risk and compliance integration' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with regulatory expertise and model risk management' },
      ],
      'healthcare': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'IT or clinical informatics occasionally reviews' },
        { value: 2, label: 'Part-time governance role', description: 'CMIO or informaticist has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with clinical and compliance representation' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with IRB integration and clinical validation processes' },
      ],
      'manufacturing': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'Engineering or IT occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Someone owns AI governance alongside plant duties' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE spanning operations and quality' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with safety, quality, and supply chain authority' },
      ],
      'retail': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'E-commerce or IT occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Digital or analytics lead has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with merchandising and marketing input' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with customer experience and pricing authority' },
      ],
      'technology': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'Engineering leads occasionally review AI use' },
        { value: 2, label: 'Part-time governance role', description: 'ML platform or product lead has partial oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with product and security integration' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with responsible AI, security, and product authority' },
      ],
      'professional-services': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made by partners ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'Practice leads occasionally review AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Knowledge management or IT has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with risk and quality partners' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with client delivery and ethics authority' },
      ],
      'energy-utilities': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'Operations or IT occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Digital or engineering lead has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with operations and safety integration' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with regulatory, safety, and grid authority' },
      ],
      'government': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'CIO office occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'CDO or program manager has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE aligned with OMB/agency guidance' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with inter-agency coordination and compliance authority' },
      ],
      'education': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc by faculty' },
        { value: 1, label: 'Informal oversight only', description: 'IT or academic affairs occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Someone owns AI governance alongside academic duties' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with faculty and admin representation' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with academic integrity and student privacy authority' },
      ],
      'media-entertainment': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc by creators' },
        { value: 1, label: 'Informal oversight only', description: 'Production or tech leads occasionally review AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Creative tech or digital lead has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with creative and legal representation' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with IP, talent relations, and content authority' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'No AI governance structure', description: 'No dedicated team; AI decisions made ad-hoc' },
        { value: 1, label: 'Informal oversight only', description: 'Operations or IT occasionally reviews AI use' },
        { value: 2, label: 'Part-time governance role', description: 'Digital or logistics lead has partial AI oversight' },
        { value: 3, label: 'Dedicated governance team', description: 'Formal AI CoE with operations and safety integration' },
        { value: 4, label: 'Mature AI governance', description: 'Full CoE with safety, fleet, and supply chain authority' },
      ],
    },
    isCore: true,
  },
  {
    id: 'dev-tools',
    dimension: 'Developer Enablement',
    text: 'What AI coding/productivity tools are available to your teams?',
    industryText: {
      'financial-services': 'What AI coding and productivity tools are available to your development and analysis teams?',
      'healthcare': 'What AI coding and productivity tools are available to your clinical informatics and IT teams?',
      'manufacturing': 'What AI tools are available to your engineering and shop floor teams?',
      'retail': 'What AI tools are available to your e-commerce, merchandising, and marketing teams?',
      'technology': 'What AI coding and productivity tools are available across your engineering organization?',
      'professional-services': 'What AI productivity tools are available to your consultants and analysts?',
      'energy-utilities': 'What AI tools are available to your field operations and engineering teams?',
      'government': 'What AI productivity tools are available to your program and technical staff?',
      'education': 'What AI tools are available to faculty, administrators, and IT staff?',
      'media-entertainment': 'What AI tools are available to your creative, production, and technical teams?',
      'transportation-logistics': 'What AI tools are available to your operations, planning, and dispatch teams?',
    },
    options: [
      { value: 0, label: 'No AI tools available', description: 'No approved AI development tools' },
      { value: 1, label: 'Limited personal use', description: 'Some individuals use free tools' },
      { value: 2, label: 'Select team access', description: 'AI tools available to some teams' },
      { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools for all developers' },
      { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite with training and best practices' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for development or analysis' },
        { value: 1, label: 'Limited personal use', description: 'Some individuals use free tools on non-sensitive work' },
        { value: 2, label: 'Select team access', description: 'AI tools available to some development teams' },
        { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools with compliance controls' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including code, analysis, and client tools' },
      ],
      'healthcare': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for clinical or IT staff' },
        { value: 1, label: 'Limited personal use', description: 'Some staff use consumer AI for non-PHI tasks' },
        { value: 2, label: 'Select team access', description: 'AI tools available to IT or research teams only' },
        { value: 3, label: 'Organization-wide tools', description: 'HIPAA-compliant AI tools broadly available' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite with clinical, operational, and research AI' },
      ],
      'manufacturing': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for any teams' },
        { value: 1, label: 'Limited personal use', description: 'Some engineers use consumer AI informally' },
        { value: 2, label: 'Select team access', description: 'AI tools available to design or analytics teams' },
        { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools across engineering and operations' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including CAD, quality, and process AI' },
      ],
      'retail': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for any teams' },
        { value: 1, label: 'Limited personal use', description: 'Some marketers use consumer AI informally' },
        { value: 2, label: 'Select team access', description: 'AI tools available to e-commerce or analytics teams' },
        { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools across merchandising and marketing' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including personalization, pricing, and content AI' },
      ],
      'technology': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI coding assistants' },
        { value: 1, label: 'Limited personal use', description: 'Some engineers use free AI tools' },
        { value: 2, label: 'Select team access', description: 'GitHub Copilot or similar for some teams' },
        { value: 3, label: 'Organization-wide tools', description: 'AI coding tools for all engineers with training' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including coding, testing, docs, and security AI' },
      ],
      'professional-services': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for client work' },
        { value: 1, label: 'Limited personal use', description: 'Some consultants use consumer AI informally' },
        { value: 2, label: 'Select team access', description: 'AI tools piloted with specific practices' },
        { value: 3, label: 'Firm-wide tools', description: 'Enterprise AI tools for research and deliverables' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite with client-safe AI and knowledge management' },
      ],
      'energy-utilities': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for field or office staff' },
        { value: 1, label: 'Limited personal use', description: 'Some engineers use consumer AI informally' },
        { value: 2, label: 'Select team access', description: 'AI tools available to analytics or planning teams' },
        { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools across operations and engineering' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including SCADA, predictive, and planning AI' },
      ],
      'government': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for government work' },
        { value: 1, label: 'Limited personal use', description: 'Some staff use consumer AI for non-sensitive tasks' },
        { value: 2, label: 'Select team access', description: 'FedRAMP AI tools for some programs' },
        { value: 3, label: 'Agency-wide tools', description: 'Compliant AI tools broadly available' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite with mission-specific AI capabilities' },
      ],
      'education': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for faculty or staff' },
        { value: 1, label: 'Limited personal use', description: 'Some faculty experiment with consumer AI' },
        { value: 2, label: 'Select department access', description: 'AI tools available to specific departments' },
        { value: 3, label: 'Institution-wide tools', description: 'Enterprise AI tools with academic integrity controls' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including teaching, research, and admin AI' },
      ],
      'media-entertainment': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for creative or production' },
        { value: 1, label: 'Limited personal use', description: 'Some creators experiment with consumer AI' },
        { value: 2, label: 'Select team access', description: 'AI tools available to VFX or post-production' },
        { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools across creative and production' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including content, production, and distribution AI' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'No AI tools available', description: 'No approved AI tools for operations staff' },
        { value: 1, label: 'Limited personal use', description: 'Some planners use consumer AI informally' },
        { value: 2, label: 'Select team access', description: 'AI tools available to route planning or analytics' },
        { value: 3, label: 'Organization-wide tools', description: 'Enterprise AI tools across planning and dispatch' },
        { value: 4, label: 'Comprehensive AI toolkit', description: 'Full suite including routing, forecasting, and fleet AI' },
      ],
    },
    isCore: true,
  },
  {
    id: 'human-review',
    dimension: 'Human Oversight',
    text: 'Are there defined review checkpoints for AI-generated outputs?',
    industryText: {
      'financial-services': 'Are there defined review checkpoints for AI-generated financial analyses, recommendations, or client communications?',
      'healthcare': 'Are there defined review checkpoints for AI-generated clinical recommendations or documentation?',
      'manufacturing': 'Are there defined review checkpoints for AI-generated quality decisions or production schedules?',
      'retail': 'Are there defined review checkpoints for AI-generated pricing, promotions, or customer communications?',
      'technology': 'Are there defined review checkpoints for AI-generated code, documentation, or product decisions?',
      'professional-services': 'Are there defined review checkpoints for AI-generated client deliverables or advice?',
      'energy-utilities': 'Are there defined review checkpoints for AI-generated operational decisions or safety assessments?',
      'government': 'Are there defined review checkpoints for AI-generated policy recommendations or citizen communications?',
      'education': 'Are there defined review checkpoints for AI-generated educational content or assessments?',
      'media-entertainment': 'Are there defined review checkpoints for AI-generated creative content or production decisions?',
      'transportation-logistics': 'Are there defined review checkpoints for AI-generated routing decisions or capacity plans?',
    },
    options: [
      { value: 0, label: 'No review process', description: 'AI outputs used without verification' },
      { value: 1, label: 'Informal review', description: 'Individual discretion on review' },
      { value: 2, label: 'Team guidelines', description: 'Teams have review expectations' },
      { value: 3, label: 'Formal review process', description: 'Documented review checkpoints' },
      { value: 4, label: 'Systematic oversight', description: 'Comprehensive review with metrics' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'No review process', description: 'AI outputs used without compliance review' },
        { value: 1, label: 'Informal review', description: 'Individual discretion, no documented process' },
        { value: 2, label: 'Team guidelines', description: 'Teams have review expectations for client work' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints aligned with regulations' },
        { value: 4, label: 'Systematic oversight', description: 'Comprehensive review with audit trails and metrics' },
      ],
      'healthcare': [
        { value: 0, label: 'No review process', description: 'AI outputs used without clinical validation' },
        { value: 1, label: 'Informal review', description: 'Clinician discretion, no documented process' },
        { value: 2, label: 'Team guidelines', description: 'Clinical teams have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints for clinical AI' },
        { value: 4, label: 'Systematic oversight', description: 'Clinical validation with outcomes tracking' },
      ],
      'manufacturing': [
        { value: 0, label: 'No review process', description: 'AI outputs used without quality review' },
        { value: 1, label: 'Informal review', description: 'Operator discretion on AI recommendations' },
        { value: 2, label: 'Team guidelines', description: 'Production teams have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints in quality system' },
        { value: 4, label: 'Systematic oversight', description: 'Integrated with QMS and safety protocols' },
      ],
      'retail': [
        { value: 0, label: 'No review process', description: 'AI pricing/promos go live without review' },
        { value: 1, label: 'Informal review', description: 'Manager discretion on AI recommendations' },
        { value: 2, label: 'Team guidelines', description: 'Category teams have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints for pricing and promos' },
        { value: 4, label: 'Systematic oversight', description: 'Automated guardrails with escalation protocols' },
      ],
      'technology': [
        { value: 0, label: 'No review process', description: 'AI-generated code merged without review' },
        { value: 1, label: 'Informal review', description: 'Developer discretion on AI code review' },
        { value: 2, label: 'Team guidelines', description: 'Teams have AI code review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints in CI/CD pipeline' },
        { value: 4, label: 'Systematic oversight', description: 'Automated testing with human review gates' },
      ],
      'professional-services': [
        { value: 0, label: 'No review process', description: 'AI deliverables sent without partner review' },
        { value: 1, label: 'Informal review', description: 'Individual consultant discretion' },
        { value: 2, label: 'Team guidelines', description: 'Engagement teams have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Quality review gates for AI deliverables' },
        { value: 4, label: 'Systematic oversight', description: 'Partner sign-off with quality metrics' },
      ],
      'energy-utilities': [
        { value: 0, label: 'No review process', description: 'AI decisions implemented without safety review' },
        { value: 1, label: 'Informal review', description: 'Operator discretion on AI recommendations' },
        { value: 2, label: 'Team guidelines', description: 'Operations has review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints for critical systems' },
        { value: 4, label: 'Systematic oversight', description: 'Safety-integrated review with NERC compliance' },
      ],
      'government': [
        { value: 0, label: 'No review process', description: 'AI outputs used without policy review' },
        { value: 1, label: 'Informal review', description: 'Staff discretion, no documented process' },
        { value: 2, label: 'Team guidelines', description: 'Programs have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints per agency guidance' },
        { value: 4, label: 'Systematic oversight', description: 'IG-ready audit trails with bias testing' },
      ],
      'education': [
        { value: 0, label: 'No review process', description: 'AI content used without faculty review' },
        { value: 1, label: 'Informal review', description: 'Individual faculty discretion' },
        { value: 2, label: 'Department guidelines', description: 'Departments have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints for AI in curriculum' },
        { value: 4, label: 'Systematic oversight', description: 'Academic integrity integration with tracking' },
      ],
      'media-entertainment': [
        { value: 0, label: 'No review process', description: 'AI content published without creative review' },
        { value: 1, label: 'Informal review', description: 'Individual creator discretion' },
        { value: 2, label: 'Team guidelines', description: 'Production teams have review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints for AI content' },
        { value: 4, label: 'Systematic oversight', description: 'Creative approval with IP and rights tracking' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'No review process', description: 'AI routing decisions executed without review' },
        { value: 1, label: 'Informal review', description: 'Dispatcher discretion on AI recommendations' },
        { value: 2, label: 'Team guidelines', description: 'Operations has review expectations' },
        { value: 3, label: 'Formal review process', description: 'Documented checkpoints for critical decisions' },
        { value: 4, label: 'Systematic oversight', description: 'Safety-integrated review with performance tracking' },
      ],
    },
    isCore: true,
  },
  {
    id: 'workflow-stages',
    dimension: 'Workflow Integration',
    text: 'At how many stages of your workflows is AI currently integrated?',
    industryText: {
      'financial-services': 'At how many stages of your trading, risk, and client service workflows is AI currently integrated?',
      'healthcare': 'At how many stages of your clinical and administrative workflows is AI currently integrated?',
      'manufacturing': 'At how many stages of your design, production, and supply chain workflows is AI currently integrated?',
      'retail': 'At how many stages of your merchandising, marketing, and fulfillment workflows is AI currently integrated?',
      'technology': 'At how many stages of your development and product workflows is AI currently integrated?',
      'professional-services': 'At how many stages of your research, analysis, and client delivery workflows is AI currently integrated?',
      'energy-utilities': 'At how many stages of your generation, distribution, and maintenance workflows is AI currently integrated?',
      'government': 'At how many stages of your program management and citizen service workflows is AI currently integrated?',
      'education': 'At how many stages of your teaching, research, and administrative workflows is AI currently integrated?',
      'media-entertainment': 'At how many stages of your content creation, production, and distribution workflows is AI currently integrated?',
      'transportation-logistics': 'At how many stages of your planning, dispatch, and delivery workflows is AI currently integrated?',
    },
    options: [
      { value: 0, label: 'None', description: 'AI not integrated in any workflows' },
      { value: 1, label: '1-2 stages', description: 'AI in limited workflow phases' },
      { value: 2, label: '3-4 stages', description: 'AI across multiple workflow phases' },
      { value: 3, label: '5+ stages', description: 'AI embedded throughout processes' },
      { value: 4, label: 'AI-native workflows', description: 'Workflows designed around AI' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'None', description: 'AI not used in trading or client workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic fraud detection or chatbots' },
        { value: 2, label: '3-4 stages', description: 'AI in credit scoring, portfolio, or compliance' },
        { value: 3, label: '5-6 stages', description: 'AI across risk modeling, trading, and underwriting' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all trading and servicing processes' },
      ],
      'healthcare': [
        { value: 0, label: 'None', description: 'AI not used in clinical or operational workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in scheduling or basic documentation' },
        { value: 2, label: '3-4 stages', description: 'AI in diagnosis support, imaging, or coding' },
        { value: 3, label: '5-6 stages', description: 'AI across clinical decision support and revenue cycle' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all clinical and operational processes' },
      ],
      'manufacturing': [
        { value: 0, label: 'None', description: 'AI not used in production workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic quality inspection or forecasting' },
        { value: 2, label: '3-4 stages', description: 'AI in predictive maintenance, scheduling, or design' },
        { value: 3, label: '5-6 stages', description: 'AI across production, quality, and supply chain' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all manufacturing processes' },
      ],
      'retail': [
        { value: 0, label: 'None', description: 'AI not used in retail workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic recommendations or inventory' },
        { value: 2, label: '3-4 stages', description: 'AI in personalization, pricing, or demand planning' },
        { value: 3, label: '5-6 stages', description: 'AI across merchandising, marketing, and fulfillment' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all retail operations' },
      ],
      'technology': [
        { value: 0, label: 'None', description: 'AI not used in development workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in code completion or testing' },
        { value: 2, label: '3-4 stages', description: 'AI in coding, review, documentation, or ops' },
        { value: 3, label: '5-6 stages', description: 'AI across SDLC, security, and product decisions' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all development and product processes' },
      ],
      'professional-services': [
        { value: 0, label: 'None', description: 'AI not used in client delivery workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in research or document drafting' },
        { value: 2, label: '3-4 stages', description: 'AI in analysis, writing, or knowledge retrieval' },
        { value: 3, label: '5-6 stages', description: 'AI across research, analysis, and client presentations' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all consulting methodologies' },
      ],
      'energy-utilities': [
        { value: 0, label: 'None', description: 'AI not used in operational workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic forecasting or monitoring' },
        { value: 2, label: '3-4 stages', description: 'AI in load forecasting, maintenance, or trading' },
        { value: 3, label: '5-6 stages', description: 'AI across generation, grid, and customer operations' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all energy operations' },
      ],
      'government': [
        { value: 0, label: 'None', description: 'AI not used in agency workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic document processing or chatbots' },
        { value: 2, label: '3-4 stages', description: 'AI in case management, analysis, or citizen services' },
        { value: 3, label: '5-6 stages', description: 'AI across program delivery and policy analysis' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all mission-critical processes' },
      ],
      'education': [
        { value: 0, label: 'None', description: 'AI not used in educational workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic tutoring or grading assistance' },
        { value: 2, label: '3-4 stages', description: 'AI in content creation, assessment, or advising' },
        { value: 3, label: '5-6 stages', description: 'AI across teaching, research, and student services' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all educational processes' },
      ],
      'media-entertainment': [
        { value: 0, label: 'None', description: 'AI not used in content workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic editing or recommendations' },
        { value: 2, label: '3-4 stages', description: 'AI in content creation, VFX, or personalization' },
        { value: 3, label: '5-6 stages', description: 'AI across production, distribution, and monetization' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all creative and business processes' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'None', description: 'AI not used in logistics workflows' },
        { value: 1, label: '1-2 stages', description: 'AI in basic route planning or tracking' },
        { value: 2, label: '3-4 stages', description: 'AI in routing, capacity, or demand forecasting' },
        { value: 3, label: '5-6 stages', description: 'AI across planning, dispatch, and fleet management' },
        { value: 4, label: 'AI-native workflows', description: 'AI embedded in all logistics operations' },
      ],
    },
    isCore: true,
  },
  {
    id: 'platform-internal',
    dimension: 'Platform & Architecture',
    text: 'Is your organization building an internal AI platform or using vendor tools only?',
    industryText: {
      'financial-services': 'Is your organization building an internal AI platform or relying solely on vendor solutions for AI capabilities?',
      'healthcare': 'Is your organization building an internal AI platform or relying solely on EHR and vendor AI solutions?',
      'manufacturing': 'Is your organization building an internal AI platform or relying solely on vendor AI and MES solutions?',
      'retail': 'Is your organization building an internal AI platform or relying solely on vendor AI and commerce platforms?',
      'technology': 'Is your organization building an internal AI platform or using vendor tools only?',
      'professional-services': 'Is your firm building an internal AI platform or relying solely on vendor productivity tools?',
      'energy-utilities': 'Is your organization building an internal AI platform or relying solely on vendor and SCADA systems?',
      'government': 'Is your agency building an internal AI platform or relying solely on FedRAMP vendor solutions?',
      'education': 'Is your institution building an internal AI platform or relying solely on LMS and vendor tools?',
      'media-entertainment': 'Is your organization building an internal AI platform or relying solely on creative software vendors?',
      'transportation-logistics': 'Is your organization building an internal AI platform or relying solely on TMS and vendor solutions?',
    },
    options: [
      { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
      { value: 1, label: 'Vendor tools only', description: 'Using external SaaS AI tools' },
      { value: 2, label: 'Emerging platform', description: 'Building internal AI capabilities' },
      { value: 3, label: 'Internal AI platform', description: 'Centralized platform with APIs' },
      { value: 4, label: 'Enterprise AI platform', description: 'Full platform with RAG/fine-tuning' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using Bloomberg, vendor ML models' },
        { value: 2, label: 'Emerging platform', description: 'Building internal ML infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Model registry, feature store, APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with model risk management' },
      ],
      'healthcare': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI beyond EHR vendor' },
        { value: 1, label: 'Vendor tools only', description: 'Using Epic/Cerner AI, vendor models' },
        { value: 2, label: 'Emerging platform', description: 'Building clinical AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Clinical data platform with AI APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with clinical validation' },
      ],
      'manufacturing': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using MES and vendor analytics' },
        { value: 2, label: 'Emerging platform', description: 'Building IIoT and AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Data lake, ML ops, edge AI APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with digital twin integration' },
      ],
      'retail': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using Salesforce, Adobe, vendor AI' },
        { value: 2, label: 'Emerging platform', description: 'Building customer data and AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'CDP, recommendation APIs, personalization' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with real-time decisioning' },
      ],
      'technology': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using cloud AI services only' },
        { value: 2, label: 'Emerging platform', description: 'Building internal ML platform' },
        { value: 3, label: 'Internal AI platform', description: 'ML platform with model registry, APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with LLM fine-tuning, RAG' },
      ],
      'professional-services': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using Microsoft, vendor AI tools' },
        { value: 2, label: 'Emerging platform', description: 'Building knowledge AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Knowledge base with AI retrieval APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with methodology AI' },
      ],
      'energy-utilities': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI beyond SCADA' },
        { value: 1, label: 'Vendor tools only', description: 'Using OSIsoft, vendor analytics' },
        { value: 2, label: 'Emerging platform', description: 'Building operational AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'ADMS integration, forecasting APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with grid optimization' },
      ],
      'government': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using FedRAMP SaaS AI tools' },
        { value: 2, label: 'Emerging platform', description: 'Building agency AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Compliant platform with citizen APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with inter-agency sharing' },
      ],
      'education': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using LMS vendor AI, consumer tools' },
        { value: 2, label: 'Emerging platform', description: 'Building educational AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Learning analytics with AI APIs' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with adaptive learning' },
      ],
      'media-entertainment': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using Adobe, Autodesk AI tools' },
        { value: 2, label: 'Emerging platform', description: 'Building content AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Content APIs, recommendation engines' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with generative AI pipeline' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'No AI platform', description: 'No centralized AI capabilities' },
        { value: 1, label: 'Vendor tools only', description: 'Using TMS, telematics vendor AI' },
        { value: 2, label: 'Emerging platform', description: 'Building logistics AI infrastructure' },
        { value: 3, label: 'Internal AI platform', description: 'Routing APIs, predictive analytics' },
        { value: 4, label: 'Enterprise AI platform', description: 'Full platform with real-time optimization' },
      ],
    },
    isCore: true,
  },
  {
    id: 'value-roi',
    dimension: 'Value Measurement',
    text: 'How do you measure return on AI investments?',
    industryText: {
      'financial-services': 'How do you measure return on AI investments in trading, risk, and client services?',
      'healthcare': 'How do you measure return on AI investments in clinical outcomes and operational efficiency?',
      'manufacturing': 'How do you measure return on AI investments in production, quality, and supply chain?',
      'retail': 'How do you measure return on AI investments in sales, customer experience, and operations?',
      'technology': 'How do you measure return on AI investments in product development and operations?',
      'professional-services': 'How do you measure return on AI investments in consultant productivity and client delivery?',
      'energy-utilities': 'How do you measure return on AI investments in operations, reliability, and customer service?',
      'government': 'How do you measure return on AI investments in mission outcomes and citizen services?',
      'education': 'How do you measure return on AI investments in student outcomes and operational efficiency?',
      'media-entertainment': 'How do you measure return on AI investments in content production and audience engagement?',
      'transportation-logistics': 'How do you measure return on AI investments in fleet efficiency and delivery performance?',
    },
    options: [
      { value: 0, label: 'No measurement', description: 'AI value not tracked' },
      { value: 1, label: 'Anecdotal benefits', description: 'Informal feedback only' },
      { value: 2, label: 'Basic metrics', description: 'Some productivity tracking' },
      { value: 3, label: 'ROI dashboard', description: 'Formal metrics and reporting' },
      { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with competitive analysis' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal feedback from traders or advisors' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of processing time or accuracy' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on alpha, efficiency, risk' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with attribution modeling' },
      ],
      'healthcare': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal clinician feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of time savings or throughput' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on outcomes and efficiency' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with clinical outcomes correlation' },
      ],
      'manufacturing': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal feedback from plant managers' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of OEE or defect rates' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on yield, uptime, quality' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with total cost of ownership' },
      ],
      'retail': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal feedback from merchants' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of conversion or AOV' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on revenue and margin impact' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with customer lifetime value' },
      ],
      'technology': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal developer feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of velocity or code quality' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on productivity and quality' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with product impact analysis' },
      ],
      'professional-services': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal consultant feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of utilization or delivery time' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on realization and efficiency' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with client outcome correlation' },
      ],
      'energy-utilities': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal operations feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of reliability or efficiency' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on operations and outages' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with regulatory and SAIDI impact' },
      ],
      'government': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal staff feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of processing time or accuracy' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on mission and citizen impact' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with OMB reporting integration' },
      ],
      'education': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal faculty feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of time savings or engagement' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on learning outcomes' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with student success correlation' },
      ],
      'media-entertainment': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal creative team feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of production time or cost' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on content performance' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with audience impact analysis' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'No measurement', description: 'AI investment value not tracked' },
        { value: 1, label: 'Anecdotal benefits', description: 'Informal operations feedback' },
        { value: 2, label: 'Basic metrics', description: 'Some tracking of on-time delivery or cost' },
        { value: 3, label: 'ROI dashboard', description: 'Formal metrics on efficiency and service' },
        { value: 4, label: 'Comprehensive analytics', description: 'Full ROI with network optimization impact' },
      ],
    },
    isCore: true,
  },
  {
    id: 'data-prompts',
    dimension: 'Data & Model Lifecycle',
    text: 'Do you have standardized, reusable prompts or prompt templates?',
    industryText: {
      'financial-services': 'Do you have standardized, reusable prompts for financial analysis, client communications, and compliance tasks?',
      'healthcare': 'Do you have standardized, reusable prompts for clinical documentation, patient communication, and research?',
      'manufacturing': 'Do you have standardized, reusable prompts for quality analysis, maintenance, and production planning?',
      'retail': 'Do you have standardized, reusable prompts for product content, marketing copy, and customer service?',
      'technology': 'Do you have standardized, reusable prompts for coding, documentation, and product work?',
      'professional-services': 'Do you have standardized, reusable prompts for research, analysis, and deliverable creation?',
      'energy-utilities': 'Do you have standardized, reusable prompts for operational analysis, customer service, and reporting?',
      'government': 'Do you have standardized, reusable prompts for policy analysis, citizen services, and reporting?',
      'education': 'Do you have standardized, reusable prompts for curriculum development, assessment, and student support?',
      'media-entertainment': 'Do you have standardized, reusable prompts for creative development, production, and marketing?',
      'transportation-logistics': 'Do you have standardized, reusable prompts for route planning, customer communication, and operations?',
    },
    options: [
      { value: 0, label: 'No prompt standards', description: 'Individual ad-hoc prompts' },
      { value: 1, label: 'Informal sharing', description: 'Some prompts shared informally' },
      { value: 2, label: 'Team libraries', description: 'Teams maintain prompt collections' },
      { value: 3, label: 'Centralized library', description: 'Organization-wide prompt repository' },
      { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with governance' },
    ],
    industryOptions: {
      'financial-services': [
        { value: 0, label: 'No prompt standards', description: 'Analysts create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some analysts share prompts via chat' },
        { value: 2, label: 'Team libraries', description: 'Desks maintain their own prompt collections' },
        { value: 3, label: 'Centralized library', description: 'Firm-wide prompt repository with compliance review' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with regulatory alignment' },
      ],
      'healthcare': [
        { value: 0, label: 'No prompt standards', description: 'Clinicians create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some staff share prompts informally' },
        { value: 2, label: 'Department libraries', description: 'Departments maintain prompt collections' },
        { value: 3, label: 'Centralized library', description: 'Organization-wide repository with clinical review' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with clinical validation' },
      ],
      'manufacturing': [
        { value: 0, label: 'No prompt standards', description: 'Engineers create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some engineers share prompts informally' },
        { value: 2, label: 'Team libraries', description: 'Plants maintain their own prompt collections' },
        { value: 3, label: 'Centralized library', description: 'Enterprise-wide prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled in quality system' },
      ],
      'retail': [
        { value: 0, label: 'No prompt standards', description: 'Marketers create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some teams share prompts via chat' },
        { value: 2, label: 'Team libraries', description: 'Categories maintain prompt collections' },
        { value: 3, label: 'Centralized library', description: 'Company-wide prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with brand guidelines' },
      ],
      'technology': [
        { value: 0, label: 'No prompt standards', description: 'Engineers create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some prompts shared in Slack/docs' },
        { value: 2, label: 'Team libraries', description: 'Teams maintain prompt collections' },
        { value: 3, label: 'Centralized library', description: 'Company-wide prompt repository in Git' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with CI/CD integration' },
      ],
      'professional-services': [
        { value: 0, label: 'No prompt standards', description: 'Consultants create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some prompts shared among teams' },
        { value: 2, label: 'Practice libraries', description: 'Practices maintain prompt collections' },
        { value: 3, label: 'Firm-wide library', description: 'Knowledge management prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with methodology integration' },
      ],
      'energy-utilities': [
        { value: 0, label: 'No prompt standards', description: 'Operators create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some staff share prompts informally' },
        { value: 2, label: 'Team libraries', description: 'Operations teams maintain prompt collections' },
        { value: 3, label: 'Centralized library', description: 'Enterprise-wide prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with safety review' },
      ],
      'government': [
        { value: 0, label: 'No prompt standards', description: 'Staff create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some prompts shared among colleagues' },
        { value: 2, label: 'Program libraries', description: 'Programs maintain prompt collections' },
        { value: 3, label: 'Agency-wide library', description: 'Centralized prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with policy alignment' },
      ],
      'education': [
        { value: 0, label: 'No prompt standards', description: 'Faculty create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some faculty share prompts informally' },
        { value: 2, label: 'Department libraries', description: 'Departments maintain prompt collections' },
        { value: 3, label: 'Institution-wide library', description: 'Teaching and learning center repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with pedagogy review' },
      ],
      'media-entertainment': [
        { value: 0, label: 'No prompt standards', description: 'Creators develop prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some prompts shared among teams' },
        { value: 2, label: 'Team libraries', description: 'Production teams maintain collections' },
        { value: 3, label: 'Centralized library', description: 'Studio-wide creative prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with creative review' },
      ],
      'transportation-logistics': [
        { value: 0, label: 'No prompt standards', description: 'Planners create prompts ad-hoc' },
        { value: 1, label: 'Informal sharing', description: 'Some prompts shared among dispatchers' },
        { value: 2, label: 'Team libraries', description: 'Operations teams maintain collections' },
        { value: 3, label: 'Centralized library', description: 'Company-wide prompt repository' },
        { value: 4, label: 'Managed prompt lifecycle', description: 'Version-controlled with ops integration' },
      ],
    },
    isCore: true,
  },
]

// Deep-dive questions (optional, for more detailed assessment)
export const deepDiveQuestions: Question[] = [
  {
    id: 'gov-shadow',
    dimension: 'Governance & Risk',
    text: 'How confident are you in managing shadow AI usage across your organization?',
    industryText: {
      'financial-services': 'How confident are you in managing shadow AI usage that could create regulatory or client data risks?',
      'healthcare': 'How confident are you in managing shadow AI usage that could create HIPAA or patient safety risks?',
      'manufacturing': 'How confident are you in managing shadow AI usage across plants and engineering teams?',
      'retail': 'How confident are you in managing shadow AI usage in marketing, merchandising, and customer data?',
      'technology': 'How confident are you in managing shadow AI usage across engineering and product teams?',
      'professional-services': 'How confident are you in managing shadow AI usage in client deliverables and confidential work?',
      'energy-utilities': 'How confident are you in managing shadow AI usage that could impact grid safety or operations?',
      'government': 'How confident are you in managing shadow AI usage that could create compliance or security risks?',
      'education': 'How confident are you in managing shadow AI usage by faculty and students?',
      'media-entertainment': 'How confident are you in managing shadow AI usage that could create IP or talent risks?',
      'transportation-logistics': 'How confident are you in managing shadow AI usage in routing and customer communications?',
    },
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
    industryText: {
      'financial-services': 'Does your organization have structured AI training for traders, analysts, and client-facing staff?',
      'healthcare': 'Does your organization have structured AI training for clinical and administrative staff?',
      'manufacturing': 'Does your organization have structured AI training for engineers and shop floor workers?',
      'retail': 'Does your organization have structured AI training for merchandisers, marketers, and store teams?',
      'technology': 'Does your organization have structured AI training for engineers and product managers?',
      'professional-services': 'Does your firm have structured AI training for consultants across all levels?',
      'energy-utilities': 'Does your organization have structured AI training for operators and field staff?',
      'government': 'Does your agency have structured AI training for program staff and technical teams?',
      'education': 'Does your institution have structured AI training for faculty and administrative staff?',
      'media-entertainment': 'Does your organization have structured AI training for creative and production teams?',
      'transportation-logistics': 'Does your organization have structured AI training for planners, dispatchers, and drivers?',
    },
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
    industryText: {
      'financial-services': 'Is there clear accountability when AI-assisted trading or client decisions go wrong?',
      'healthcare': 'Is there clear accountability when AI-assisted clinical decisions lead to adverse outcomes?',
      'manufacturing': 'Is there clear accountability when AI-assisted quality or production decisions cause defects?',
      'retail': 'Is there clear accountability when AI-assisted pricing or inventory decisions impact margins?',
      'technology': 'Is there clear accountability when AI-assisted code or product decisions cause incidents?',
      'professional-services': 'Is there clear accountability when AI-assisted client advice proves incorrect?',
      'energy-utilities': 'Is there clear accountability when AI-assisted operations decisions cause outages?',
      'government': 'Is there clear accountability when AI-assisted program decisions harm citizens?',
      'education': 'Is there clear accountability when AI-assisted educational decisions impact students?',
      'media-entertainment': 'Is there clear accountability when AI-assisted content decisions create issues?',
      'transportation-logistics': 'Is there clear accountability when AI-assisted routing decisions cause delays?',
    },
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
    industryText: {
      'financial-services': 'Do any critical trading, risk, or compliance processes depend on AI?',
      'healthcare': 'Do any critical clinical or operational processes depend on AI?',
      'manufacturing': 'Do any critical production or quality processes depend on AI?',
      'retail': 'Do any critical pricing, inventory, or fulfillment processes depend on AI?',
      'technology': 'Do any critical product or infrastructure processes depend on AI?',
      'professional-services': 'Do any critical client delivery processes depend on AI?',
      'energy-utilities': 'Do any critical grid operations or safety processes depend on AI?',
      'government': 'Do any critical citizen services or program processes depend on AI?',
      'education': 'Do any critical educational or administrative processes depend on AI?',
      'media-entertainment': 'Do any critical content production or distribution processes depend on AI?',
      'transportation-logistics': 'Do any critical routing, scheduling, or safety processes depend on AI?',
    },
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
    industryText: {
      'financial-services': 'Can your AI tools access and reason over internal research, policies, and client data?',
      'healthcare': 'Can your AI tools access and reason over clinical protocols, patient records, and research?',
      'manufacturing': 'Can your AI tools access and reason over specs, manuals, and production data?',
      'retail': 'Can your AI tools access and reason over product data, customer insights, and policies?',
      'technology': 'Can your AI tools access and reason over codebase, docs, and internal knowledge?',
      'professional-services': 'Can your AI tools access and reason over methodologies, past work, and expertise?',
      'energy-utilities': 'Can your AI tools access and reason over procedures, asset data, and regulations?',
      'government': 'Can your AI tools access and reason over policies, case files, and regulations?',
      'education': 'Can your AI tools access and reason over curriculum, research, and institutional knowledge?',
      'media-entertainment': 'Can your AI tools access and reason over content libraries, IP, and production data?',
      'transportation-logistics': 'Can your AI tools access and reason over routes, schedules, and customer data?',
    },
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
    industryText: {
      'financial-services': 'Do you have documented AI success stories showing trading, risk, or efficiency wins?',
      'healthcare': 'Do you have documented AI success stories showing clinical or operational improvements?',
      'manufacturing': 'Do you have documented AI success stories showing quality, yield, or efficiency gains?',
      'retail': 'Do you have documented AI success stories showing sales, margin, or customer wins?',
      'technology': 'Do you have documented AI success stories showing productivity or product improvements?',
      'professional-services': 'Do you have documented AI success stories showing client impact or efficiency?',
      'energy-utilities': 'Do you have documented AI success stories showing reliability or efficiency gains?',
      'government': 'Do you have documented AI success stories showing mission or citizen service improvements?',
      'education': 'Do you have documented AI success stories showing learning outcomes or efficiency?',
      'media-entertainment': 'Do you have documented AI success stories showing creative or production wins?',
      'transportation-logistics': 'Do you have documented AI success stories showing delivery or efficiency improvements?',
    },
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
    industryText: {
      'financial-services': 'Do you review vendor data privacy and regulatory compliance before using AI tools?',
      'healthcare': 'Do you review vendor HIPAA compliance and BAAs before using AI tools?',
      'manufacturing': 'Do you review vendor data handling and IP protection before using AI tools?',
      'retail': 'Do you review vendor customer data privacy policies before using AI tools?',
      'technology': 'Do you review vendor data policies and code ownership before using AI tools?',
      'professional-services': 'Do you review vendor client confidentiality policies before using AI tools?',
      'energy-utilities': 'Do you review vendor NERC/CIP compliance before using AI tools?',
      'government': 'Do you review vendor FedRAMP and data sovereignty before using AI tools?',
      'education': 'Do you review vendor FERPA compliance before using AI tools?',
      'media-entertainment': 'Do you review vendor IP and content rights before using AI tools?',
      'transportation-logistics': 'Do you review vendor data security and compliance before using AI tools?',
    },
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

/**
 * Get the question text for a specific industry
 * Falls back to base text if no industry-specific text exists
 */
export function getQuestionText(question: Question, industry: Industry): string {
  if (industry === 'general' || !question.industryText?.[industry]) {
    return question.text
  }
  return question.industryText[industry]
}

/**
 * Get the question options for a specific industry
 * Falls back to base options if no industry-specific options exist
 */
export function getQuestionOptions(question: Question, industry: Industry): QuestionOption[] {
  if (industry === 'general' || !question.industryOptions?.[industry]) {
    return question.options
  }
  return question.industryOptions[industry]
}

/**
 * Get a fully resolved question for a specific industry
 * Returns a new question object with industry-specific text and options
 */
export function getQuestionForIndustry(question: Question, industry: Industry): Question {
  return {
    ...question,
    text: getQuestionText(question, industry),
    options: getQuestionOptions(question, industry),
  }
}
