const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, Header, Footer,
        AlignmentType, LevelFormat, TableOfContents, HeadingLevel, BorderStyle, WidthType,
        ShadingType, VerticalAlign, PageNumber, PageBreak } = require('docx');
const fs = require('fs');

// Donyati Brand Colors
const COLORS = {
  purple: '4A4778',
  lime: 'ACC953',
  black: '12002A',
  white: 'FFFFFF',
  lightPurple: 'E8DEF6',
  gray: '666666'
};

// Common styles for all documents
const commonStyles = {
  default: { document: { run: { font: 'Arial', size: 22 } } },
  paragraphStyles: [
    { id: 'Title', name: 'Title', basedOn: 'Normal',
      run: { size: 56, bold: true, color: COLORS.purple, font: 'Arial' },
      paragraph: { spacing: { before: 0, after: 200 }, alignment: AlignmentType.CENTER } },
    { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { size: 32, bold: true, color: COLORS.purple, font: 'Arial' },
      paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 } },
    { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { size: 26, bold: true, color: COLORS.black, font: 'Arial' },
      paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 } },
    { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
      run: { size: 24, bold: true, color: COLORS.gray, font: 'Arial' },
      paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
  ]
};

// Common numbering config
const commonNumbering = {
  config: [
    { reference: 'bullet-list',
      levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: 'numbered-list',
      levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
  ]
};

// Table border style
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: COLORS.purple };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

// Helper functions
function createHeader(title, subtitle) {
  return new Header({
    children: [
      new Paragraph({
        alignment: AlignmentType.RIGHT,
        children: [
          new TextRun({ text: title, bold: true, color: COLORS.purple, size: 20 }),
          new TextRun({ text: ' | ', color: COLORS.gray, size: 20 }),
          new TextRun({ text: subtitle, color: COLORS.gray, size: 20 })
        ]
      })
    ]
  });
}

function createFooter() {
  return new Footer({
    children: [
      new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [
          new TextRun({ text: 'Donyati', bold: true, color: COLORS.purple, size: 18 }),
          new TextRun({ text: ' | Confidential | Page ', color: COLORS.gray, size: 18 }),
          new TextRun({ children: [PageNumber.CURRENT], size: 18 }),
          new TextRun({ text: ' of ', color: COLORS.gray, size: 18 }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 18 })
        ]
      })
    ]
  });
}

function heading1(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun(text)] });
}

function heading2(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(text)] });
}

function heading3(text) {
  return new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(text)] });
}

function para(text, opts = {}) {
  return new Paragraph({
    spacing: { after: 120 },
    ...opts,
    children: [new TextRun({ text, ...opts.run })]
  });
}

function boldPara(label, value) {
  return new Paragraph({
    spacing: { after: 80 },
    children: [
      new TextRun({ text: label, bold: true }),
      new TextRun({ text: value })
    ]
  });
}

function bullet(text, ref = 'bullet-list') {
  return new Paragraph({
    numbering: { reference: ref, level: 0 },
    children: [new TextRun(text)]
  });
}

function createTable(headers, rows, colWidths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: headers.map((h, i) => new TableCell({
      borders: cellBorders,
      width: { size: colWidths[i], type: WidthType.DXA },
      shading: { fill: COLORS.purple, type: ShadingType.CLEAR },
      verticalAlign: VerticalAlign.CENTER,
      children: [new Paragraph({
        alignment: AlignmentType.CENTER,
        children: [new TextRun({ text: h, bold: true, color: COLORS.white, size: 20 })]
      })]
    }))
  });

  const dataRows = rows.map(row => new TableRow({
    children: row.map((cell, i) => new TableCell({
      borders: cellBorders,
      width: { size: colWidths[i], type: WidthType.DXA },
      children: [new Paragraph({ children: [new TextRun({ text: cell, size: 20 })] })]
    }))
  }));

  return new Table({
    columnWidths: colWidths,
    rows: [headerRow, ...dataRows]
  });
}

function pageBreak() {
  return new Paragraph({ children: [new PageBreak()] });
}

// =============================================================================
// PRD Document
// =============================================================================
function createPRD() {
  const children = [
    // Title Page
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('Product Requirements Document')] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [new TextRun({ text: 'AI Maturity Self-Service Assessment', size: 36, color: COLORS.black })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'Version 1.0 | February 2, 2026', size: 24, color: COLORS.gray })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Donyati', size: 28, bold: true, color: COLORS.lime })] }),
    pageBreak(),

    // TOC
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Table of Contents')] }),
    new TableOfContents('Table of Contents', { hyperlink: true, headingStyleRange: '1-3' }),
    pageBreak(),

    // 1. Executive Summary
    heading1('1. Executive Summary'),
    para('The AI Maturity Self-Service Assessment is a web application that enables organizations to evaluate their AI adoption maturity through a guided questionnaire. Users receive an instant maturity score, personalized recommendations, and the option to schedule a consultation with Donyati experts.'),

    heading2('1.1 Business Objectives'),
    bullet('Lead Generation: Capture qualified leads interested in AI consulting services'),
    bullet('Thought Leadership: Demonstrate Donyati\'s AI assessment methodology'),
    bullet('Sales Enablement: Provide sales team with pre-qualified leads and assessment data'),
    bullet('Market Intelligence: Gather industry-wide AI maturity benchmarking data'),

    heading2('1.2 Success Metrics'),
    createTable(
      ['Metric', 'Target'],
      [
        ['Assessment Completion Rate', '> 70%'],
        ['Lead-to-Meeting Conversion', '> 15%'],
        ['Average Time to Complete', '< 5 minutes'],
        ['User Satisfaction (NPS)', '> 40']
      ],
      [4680, 4680]
    ),
    pageBreak(),

    // 2. Product Overview
    heading1('2. Product Overview'),
    heading2('2.1 Target Users'),
    createTable(
      ['Persona', 'Description', 'Goals'],
      [
        ['IT Leader', 'CIO, CTO, VP Engineering', 'Benchmark AI capabilities, justify investments'],
        ['Business Executive', 'CEO, COO, Line of Business Leader', 'Understand AI readiness, plan transformation'],
        ['Innovation Lead', 'AI/ML Manager, Digital Transformation Lead', 'Assess current state, identify gaps'],
        ['Consultant', 'Strategy consultant evaluating client', 'Quick AI maturity snapshot']
      ],
      [2500, 3430, 3430]
    ),

    heading2('2.2 User Journey'),
    para('Landing Page → Start Assessment → Select Industry → Answer Questions → Submit Contact Info → View Results → Download PDF → Schedule Consultation'),

    heading2('2.3 Key Value Propositions'),
    bullet('Free & Instant: No cost, immediate results'),
    bullet('Industry-Specific: Tailored questions and benchmarks for 12 industries'),
    bullet('Actionable: Personalized recommendations based on scores'),
    bullet('Professional: Downloadable PDF report for stakeholders'),
    bullet('Easy Next Steps: Integrated consultation scheduling'),
    pageBreak(),

    // 3. Functional Requirements
    heading1('3. Functional Requirements'),
    heading2('3.1 Assessment Flow'),
    heading3('FR-001: Industry Selection'),
    bullet('Display 12 industry options in a grid layout'),
    bullet('Each industry has an icon and description'),
    bullet('"General" option for cross-industry assessments'),
    bullet('Selection advances to questions automatically'),

    heading3('FR-002: Core Questions'),
    bullet('7 questions, one per maturity dimension'),
    bullet('5-point scale (0-4) with descriptive labels'),
    bullet('Industry-specific question wording'),
    bullet('Progress bar showing completion'),

    heading3('FR-003: Lead Capture Form'),
    bullet('Required fields: Name, Email, Company, Job Title'),
    bullet('Optional fields: Phone, Company Size'),
    bullet('Email validation (format check)'),

    heading3('FR-004: Results Display'),
    bullet('Overall maturity score (0.0-4.0)'),
    bullet('Maturity level badge (L0-L4)'),
    bullet('7-dimension bar chart'),
    bullet('Industry benchmark comparison'),
    bullet('Top 3 personalized recommendations'),

    heading2('3.2 Scoring & Recommendations'),
    heading3('FR-006: Scoring Algorithm'),
    para('Average dimension scores for overall score. Map score to maturity level:'),
    bullet('L0 (0.0-0.9): AI-Aware'),
    bullet('L1 (1.0-1.9): Tool Adoption'),
    bullet('L2 (2.0-2.9): Workflow Integration'),
    bullet('L3 (3.0-3.5): Platform & Governance'),
    bullet('L4 (3.6-4.0): AI-Native Strategic'),

    heading3('FR-007: Recommendation Engine'),
    bullet('40+ recommendations across 7 dimensions'),
    bullet('Triggered by dimension score thresholds'),
    bullet('Priority levels: High, Medium, Low'),
    bullet('Industry-specific recommendation variants'),

    heading2('3.3 Admin Dashboard'),
    heading3('FR-011: Authentication'),
    bullet('Azure AD SSO for @donyati.com users'),
    bullet('Development login for testing'),
    bullet('Protected routes with session management'),

    heading3('FR-012: Analytics Dashboard'),
    bullet('Total submissions count and average score'),
    bullet('Submissions trend (30-day chart)'),
    bullet('Industry and score distribution'),
    bullet('Maturity level breakdown'),

    heading3('FR-013: Submission Management'),
    bullet('Paginated submissions table with filters'),
    bullet('View full submission details'),
    bullet('Track meeting status and add notes'),
    bullet('Export to CSV/Excel'),
    pageBreak(),

    // 4. Non-Functional Requirements
    heading1('4. Non-Functional Requirements'),
    heading2('4.1 Performance'),
    createTable(
      ['Requirement', 'Target'],
      [
        ['Page Load Time', '< 2 seconds'],
        ['Assessment Submit', '< 3 seconds'],
        ['PDF Generation', '< 5 seconds'],
        ['Admin Dashboard Load', '< 3 seconds']
      ],
      [4680, 4680]
    ),

    heading2('4.2 Security'),
    createTable(
      ['Requirement', 'Implementation'],
      [
        ['Authentication', 'Azure AD with JWT tokens'],
        ['Authorization', 'Domain-based access control'],
        ['Data Protection', 'HTTPS, encrypted database'],
        ['SQL Injection', 'Parameterized queries'],
        ['Session Security', 'Secure, httpOnly cookies']
      ],
      [4680, 4680]
    ),
    pageBreak(),

    // 5. Technical Specifications
    heading1('5. Technical Specifications'),
    heading2('5.1 Technology Stack'),
    createTable(
      ['Component', 'Technology'],
      [
        ['Frontend', 'Next.js 14, React 18, TypeScript'],
        ['Styling', 'Tailwind CSS'],
        ['Charts', 'Recharts'],
        ['PDF', '@react-pdf/renderer'],
        ['Database', 'Neon PostgreSQL (serverless)'],
        ['Auth', 'NextAuth with Azure AD'],
        ['Email', 'Resend'],
        ['Hosting', 'Vercel']
      ],
      [4680, 4680]
    ),

    heading2('5.2 API Endpoints'),
    createTable(
      ['Endpoint', 'Method', 'Purpose'],
      [
        ['/api/submit', 'POST', 'Submit assessment'],
        ['/api/generate-pdf', 'POST', 'Generate PDF report'],
        ['/api/admin/submissions', 'GET', 'List submissions'],
        ['/api/admin/analytics', 'GET', 'Dashboard analytics'],
        ['/api/admin/export', 'GET', 'Export to CSV']
      ],
      [3500, 1500, 4360]
    ),
    pageBreak(),

    // 6. Dimensions & Questions
    heading1('6. Dimensions & Questions'),
    heading2('6.1 Seven Maturity Dimensions'),
    createTable(
      ['Dimension', 'Description'],
      [
        ['Governance & Risk', 'AI policies, oversight, risk management'],
        ['Developer Enablement', 'Tools, training, coding assistance'],
        ['Workflow Integration', 'AI in daily processes, automation'],
        ['Platform & Architecture', 'Infrastructure, MLOps, scalability'],
        ['Value Measurement', 'ROI tracking, success metrics'],
        ['Data & Model Lifecycle', 'Data management, model operations'],
        ['Human Oversight', 'Accountability, review processes']
      ],
      [3500, 5860]
    ),

    heading2('6.2 Scoring Scale'),
    createTable(
      ['Score', 'Label', 'Description'],
      [
        ['0', 'None', 'No AI adoption in this area'],
        ['1', 'Initial', 'Ad-hoc, individual experiments'],
        ['2', 'Developing', 'Structured pilots, some standards'],
        ['3', 'Established', 'Organization-wide, documented'],
        ['4', 'Optimized', 'Industry-leading, continuous improvement']
      ],
      [1500, 2000, 5860]
    ),
    pageBreak(),

    // 7. Industries Supported
    heading1('7. Industries Supported'),
    para('The assessment supports 12 industries with tailored questions and benchmarks:'),
    bullet('Financial Services'),
    bullet('Healthcare'),
    bullet('Manufacturing'),
    bullet('Retail'),
    bullet('Technology'),
    bullet('Professional Services'),
    bullet('Energy & Utilities'),
    bullet('Government'),
    bullet('Education'),
    bullet('Media & Entertainment'),
    bullet('Transportation & Logistics'),
    bullet('General (cross-industry)'),
    pageBreak(),

    // 8. Future Enhancements
    heading1('8. Future Enhancements'),
    heading2('Phase 2 (Q2 2026)'),
    bullet('Payment integration for detailed reports'),
    bullet('Multi-language support'),
    bullet('Competitive benchmarking by company size'),
    bullet('Email drip campaigns for nurturing'),

    heading2('Phase 3 (Q3 2026)'),
    bullet('White-label/custom branding'),
    bullet('Team assessments (multiple users)'),
    bullet('Historical tracking (reassessment over time)'),
    bullet('API for enterprise integrations'),
    pageBreak(),

    // 9. Appendix
    heading1('9. Appendix'),
    heading2('A. Maturity Level Definitions'),
    boldPara('L0 - AI-Aware: ', 'Organization recognizes AI potential but has no formal adoption. Individual experimentation may exist.'),
    boldPara('L1 - Tool Adoption: ', 'Point solutions deployed (e.g., Copilot, ChatGPT). No governance or integration strategy.'),
    boldPara('L2 - Workflow Integration: ', 'AI embedded in specific workflows. Some standardization and training programs.'),
    boldPara('L3 - Platform & Governance: ', 'Enterprise AI platform, CoE established, comprehensive policies, measured ROI.'),
    boldPara('L4 - AI-Native Strategic: ', 'AI is core to business strategy. Continuous optimization, industry leadership.'),

    heading2('B. Recommendation Priority Definitions'),
    boldPara('High: ', 'Critical gap impacting AI success; address within 30-60 days'),
    boldPara('Medium: ', 'Important improvement; address within 3-6 months'),
    boldPara('Low: ', 'Nice-to-have enhancement; address within 6-12 months')
  ];

  return new Document({
    styles: commonStyles,
    numbering: commonNumbering,
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: createHeader('AI Maturity Assessment', 'PRD v1.0') },
      footers: { default: createFooter() },
      children
    }]
  });
}

// =============================================================================
// Architecture Document
// =============================================================================
function createArchitecture() {
  const children = [
    // Title Page
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('Architecture Document')] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [new TextRun({ text: 'AI Maturity Self-Service Assessment', size: 36, color: COLORS.black })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'Version 1.0 | February 2, 2026', size: 24, color: COLORS.gray })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Donyati', size: 28, bold: true, color: COLORS.lime })] }),
    pageBreak(),

    // TOC
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Table of Contents')] }),
    new TableOfContents('Table of Contents', { hyperlink: true, headingStyleRange: '1-3' }),
    pageBreak(),

    // 1. System Overview
    heading1('1. System Overview'),
    para('The AI Maturity Self-Service Assessment is a serverless web application built on Next.js 14, deployed on Vercel, with a Neon PostgreSQL database. The architecture follows a JAMstack pattern with server-side rendering for dynamic content.'),

    heading2('1.1 Architecture Layers'),
    bullet('Users: Public assessors, Admin users (@donyati.com), Sales team (via email)'),
    bullet('CDN/Edge: Vercel Edge Network for static assets'),
    bullet('Application: Next.js 14 with App Router'),
    bullet('API Layer: Serverless API routes'),
    bullet('External Services: Database, Auth, Email, Geolocation'),

    heading2('1.2 Key Components'),
    createTable(
      ['Component', 'Technology', 'Purpose'],
      [
        ['Frontend', 'Next.js 14 + React 18', 'User interface and SSR'],
        ['API Routes', 'Next.js API Routes', 'Serverless endpoints'],
        ['Database', 'Neon PostgreSQL', 'Submission storage'],
        ['Authentication', 'NextAuth + Azure AD', 'Admin SSO'],
        ['Email', 'Resend', 'Lead notifications'],
        ['Hosting', 'Vercel', 'Deployment and CDN']
      ],
      [2500, 3000, 3860]
    ),
    pageBreak(),

    // 2. Component Architecture
    heading1('2. Component Architecture'),
    heading2('2.1 Frontend Components'),
    para('The application uses a component-based architecture with clear separation of concerns:'),

    heading3('Public Pages'),
    bullet('Landing Page (/) - Hero section, value proposition, CTA'),
    bullet('Assessment Page (/assess) - Industry selection, questions, lead capture'),
    bullet('Results Page (/assess/results) - Score display, recommendations, PDF download'),

    heading3('Admin Pages'),
    bullet('Login (/admin/login) - Azure AD SSO authentication'),
    bullet('Dashboard (/admin) - Analytics and recent submissions'),
    bullet('Submissions (/admin/submissions) - Filterable table with export'),
    bullet('Detail (/admin/submissions/[id]) - Full submission view'),

    heading3('Shared Components'),
    bullet('QuestionCard - Question display with 5-point scale'),
    bullet('ProgressBar - Assessment progress indicator'),
    bullet('ScoreDisplay - Circular score visualization'),
    bullet('DimensionChart - 7-dimension bar chart (Recharts)'),
    bullet('RecommendationsPreview - Top 3 recommendations'),
    bullet('AdminNav - Sidebar navigation with sign-out'),

    heading2('2.2 API Routes'),
    createTable(
      ['Endpoint', 'Method', 'Description'],
      [
        ['/api/submit', 'POST', 'Submit assessment, calculate scores, send email'],
        ['/api/generate-pdf', 'POST', 'Generate PDF report with @react-pdf/renderer'],
        ['/api/admin/submissions', 'GET', 'Paginated submissions with filters'],
        ['/api/admin/submissions/[id]', 'GET/PATCH/DELETE', 'Single submission CRUD'],
        ['/api/admin/analytics', 'GET', 'Dashboard analytics data'],
        ['/api/admin/export', 'GET', 'Export submissions to CSV/Excel'],
        ['/api/auth/[...nextauth]', 'GET/POST', 'NextAuth authentication handlers']
      ],
      [3500, 2000, 3860]
    ),
    pageBreak(),

    // 3. Data Flow
    heading1('3. Data Flow'),
    heading2('3.1 Assessment Submission Flow'),
    para('The assessment submission follows this sequence:'),
    bullet('1. User fills assessment form in browser'),
    bullet('2. Browser sends POST to /api/submit'),
    bullet('3. API calculates dimension and overall scores'),
    bullet('4. API performs async geolocation lookup (ip-api.com)'),
    bullet('5. API inserts record into Neon PostgreSQL'),
    bullet('6. API sends email notification via Resend'),
    bullet('7. API returns submission ID to browser'),
    bullet('8. Browser stores results in sessionStorage'),
    bullet('9. Browser navigates to /assess/results'),
    bullet('10. User views results and can download PDF'),

    heading2('3.2 Admin Authentication Flow'),
    para('Admin authentication uses Azure AD SSO:'),
    bullet('1. Admin visits /admin'),
    bullet('2. Middleware checks for NextAuth session'),
    bullet('3. No session: redirect to /admin/login'),
    bullet('4. Admin clicks "Sign in with Microsoft"'),
    bullet('5. NextAuth initiates OAuth flow to Azure AD'),
    bullet('6. User authenticates with Microsoft'),
    bullet('7. Azure AD returns authorization code'),
    bullet('8. NextAuth exchanges code for tokens'),
    bullet('9. signIn callback verifies @donyati.com domain'),
    bullet('10. JWT session created, user redirected to /admin'),
    pageBreak(),

    // 4. Database Schema
    heading1('4. Database Schema'),
    heading2('4.1 Primary Table: assessment_submissions'),

    heading3('Contact Information'),
    createTable(
      ['Column', 'Type', 'Description'],
      [
        ['id', 'SERIAL PK', 'Auto-increment ID'],
        ['name', 'VARCHAR(255)', 'Full name'],
        ['email', 'VARCHAR(255)', 'Email address'],
        ['company', 'VARCHAR(255)', 'Organization name'],
        ['title', 'VARCHAR(255)', 'Job title'],
        ['phone', 'VARCHAR(50)', 'Contact phone (optional)'],
        ['company_size', 'VARCHAR(50)', 'Employee count range']
      ],
      [3000, 2500, 3860]
    ),

    heading3('Assessment Data'),
    createTable(
      ['Column', 'Type', 'Description'],
      [
        ['industry', 'VARCHAR(100)', 'Selected industry'],
        ['overall_score', 'DECIMAL(5,2)', 'Maturity score 0.0-4.0'],
        ['maturity_level', 'INTEGER', 'Level 0-4'],
        ['maturity_name', 'VARCHAR(50)', 'Level name'],
        ['dimension_scores', 'JSONB', 'Array of dimension scores'],
        ['industry_percentile', 'INTEGER', 'Percentile within industry']
      ],
      [3000, 2500, 3860]
    ),

    heading3('Tracking Data'),
    createTable(
      ['Column', 'Type', 'Description'],
      [
        ['ip_address', 'VARCHAR(45)', 'Client IP'],
        ['country/city/region', 'VARCHAR(100)', 'Geolocation'],
        ['user_agent', 'TEXT', 'Browser info'],
        ['referrer_url', 'TEXT', 'HTTP referrer'],
        ['utm_*', 'VARCHAR(255)', 'UTM tracking parameters'],
        ['time_to_complete', 'INTEGER', 'Seconds to complete'],
        ['created_at', 'TIMESTAMP', 'Submission timestamp']
      ],
      [3000, 2500, 3860]
    ),

    heading2('4.2 Indexes'),
    bullet('idx_submissions_created_at (created_at DESC)'),
    bullet('idx_submissions_industry (industry)'),
    bullet('idx_submissions_company (company)'),
    bullet('idx_submissions_email (email)'),
    pageBreak(),

    // 5. Technology Stack
    heading1('5. Technology Stack'),
    heading2('5.1 Frontend'),
    createTable(
      ['Technology', 'Version', 'Purpose'],
      [
        ['Next.js', '14.x', 'React framework with App Router'],
        ['React', '18.x', 'UI component library'],
        ['TypeScript', '5.x', 'Type-safe JavaScript'],
        ['Tailwind CSS', '3.4.x', 'Utility-first CSS framework'],
        ['Recharts', '3.7.x', 'Chart visualizations']
      ],
      [3000, 2000, 4360]
    ),

    heading2('5.2 Backend'),
    createTable(
      ['Technology', 'Version', 'Purpose'],
      [
        ['Next.js API Routes', '14.x', 'Serverless API endpoints'],
        ['NextAuth', '4.24.x', 'Authentication framework'],
        ['@react-pdf/renderer', '3.4.x', 'PDF generation']
      ],
      [3500, 2000, 3860]
    ),

    heading2('5.3 External Services'),
    createTable(
      ['Service', 'Purpose'],
      [
        ['Vercel', 'Hosting & deployment'],
        ['Neon PostgreSQL', 'Serverless database'],
        ['Azure AD', 'Admin SSO authentication'],
        ['Resend', 'Transactional email'],
        ['ip-api.com', 'IP geolocation'],
        ['Microsoft Bookings', 'Consultation scheduling']
      ],
      [4000, 5360]
    ),
    pageBreak(),

    // 6. Security Architecture
    heading1('6. Security Architecture'),
    heading2('6.1 Authentication Layers'),
    para('The application uses a multi-layer security model:'),
    bullet('Middleware Layer: Intercepts /admin/* routes, checks NextAuth session'),
    bullet('NextAuth Layer: Manages Azure AD OAuth flow and JWT tokens'),
    bullet('Domain Validation: signIn callback verifies @donyati.com emails'),
    bullet('Session Strategy: JWT tokens (stateless, no server sessions)'),

    heading2('6.2 Security Controls'),
    createTable(
      ['Control', 'Implementation'],
      [
        ['Transport Security', 'HTTPS enforced by Vercel'],
        ['Authentication', 'Azure AD SSO with JWT tokens'],
        ['Authorization', 'Domain-based (@donyati.com)'],
        ['SQL Injection', 'Parameterized queries via Neon'],
        ['XSS Prevention', 'React\'s built-in escaping'],
        ['CSRF Protection', 'NextAuth CSRF tokens'],
        ['Rate Limiting', 'Vercel Edge rate limiting']
      ],
      [3500, 5860]
    ),
    pageBreak(),

    // 7. Deployment Architecture
    heading1('7. Deployment Architecture'),
    heading2('7.1 Vercel Platform'),
    para('The application is deployed on Vercel with the following architecture:'),

    heading3('Edge Network'),
    bullet('CDN edges in US-East, EU-West, Asia'),
    bullet('Static assets cached globally'),
    bullet('Automatic SSL/HTTPS'),

    heading3('Serverless Functions'),
    bullet('Auto-scaled, pay-per-use'),
    bullet('Cold start optimization'),
    bullet('Regional deployment (US-East)'),

    heading3('Environment Variables'),
    bullet('DATABASE_URL - Neon connection string'),
    bullet('NEXTAUTH_SECRET - Session encryption'),
    bullet('AZURE_AD_* - Azure credentials'),
    bullet('RESEND_API_KEY - Email service'),

    heading2('7.2 CI/CD Pipeline'),
    bullet('1. Push to GitHub master branch'),
    bullet('2. Vercel Build: npm install, npm run build, type check, lint'),
    bullet('3. Deploy Preview for pull requests'),
    bullet('4. Production deployment on merge to master'),
    pageBreak(),

    // 8. Error Handling
    heading1('8. Error Handling & Monitoring'),
    heading2('8.1 Error Handling Strategy'),
    createTable(
      ['Layer', 'Strategy'],
      [
        ['Client', 'Try/catch with user-friendly messages'],
        ['API Routes', 'Try/catch, appropriate HTTP codes'],
        ['Database', 'Connection retry, graceful degradation'],
        ['External APIs', 'Timeout handling, fallback values']
      ],
      [3000, 6360]
    ),

    heading2('8.2 Graceful Degradation'),
    bullet('Database unavailable: Assessment works, results in session only'),
    bullet('Email service down: Submission succeeds, email skipped'),
    bullet('Geolocation timeout: IP stored, location fields empty'),
    bullet('PDF generation fails: User sees error, can retry'),
    pageBreak(),

    // 9. Appendix
    heading1('9. Appendix'),
    heading2('A. Environment Variables Reference'),
    createTable(
      ['Variable', 'Required', 'Description'],
      [
        ['DATABASE_URL', 'No', 'Neon PostgreSQL connection string'],
        ['NEXTAUTH_URL', 'Yes', 'Application URL'],
        ['NEXTAUTH_SECRET', 'Yes', 'Session encryption key'],
        ['AZURE_AD_CLIENT_ID', 'Prod', 'Azure app client ID'],
        ['AZURE_AD_CLIENT_SECRET', 'Prod', 'Azure app secret'],
        ['AZURE_AD_TENANT_ID', 'Prod', 'Azure tenant ID'],
        ['DEV_AUTH_ENABLED', 'Dev', 'Enable dev login'],
        ['RESEND_API_KEY', 'No', 'Resend API key'],
        ['BOOKINGS_URL', 'No', 'Microsoft Bookings URL']
      ],
      [3500, 1500, 4360]
    ),

    heading2('B. API Response Codes'),
    createTable(
      ['Code', 'Meaning'],
      [
        ['200', 'Success'],
        ['201', 'Created (new submission)'],
        ['400', 'Bad Request (validation error)'],
        ['401', 'Unauthorized (no session)'],
        ['403', 'Forbidden (wrong domain)'],
        ['404', 'Not Found'],
        ['500', 'Internal Server Error']
      ],
      [2000, 7360]
    )
  ];

  return new Document({
    styles: commonStyles,
    numbering: commonNumbering,
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: createHeader('AI Maturity Assessment', 'Architecture v1.0') },
      footers: { default: createFooter() },
      children
    }]
  });
}

// =============================================================================
// Usage Guide Document
// =============================================================================
function createUsageGuide() {
  const children = [
    // Title Page
    new Paragraph({ spacing: { before: 2000 } }),
    new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('Usage Guide')] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [new TextRun({ text: 'AI Maturity Self-Service Assessment', size: 36, color: COLORS.black })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 },
      children: [new TextRun({ text: 'Version 1.0 | February 2, 2026', size: 24, color: COLORS.gray })] }),
    new Paragraph({ alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: 'Donyati', size: 28, bold: true, color: COLORS.lime })] }),
    pageBreak(),

    // TOC
    new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('Table of Contents')] }),
    new TableOfContents('Table of Contents', { hyperlink: true, headingStyleRange: '1-3' }),
    pageBreak(),

    // 1. Getting Started
    heading1('1. Getting Started'),
    heading2('1.1 For End Users'),
    para('Visit the assessment at: https://ai-maturity-assessment-dvro.vercel.app/'),
    para('No account or login required. The assessment takes approximately 5 minutes.'),

    heading2('1.2 For Administrators'),
    para('Access the admin dashboard at: https://ai-maturity-assessment-dvro.vercel.app/admin'),
    para('Sign in with your @donyati.com Microsoft account.'),

    heading2('1.3 For Developers'),
    heading3('Prerequisites'),
    bullet('Node.js 18+'),
    bullet('npm 9+'),
    bullet('PostgreSQL database (Neon recommended)'),

    heading3('Local Development Setup'),
    para('Clone the repository and install dependencies:'),
    para('git clone https://github.com/matt-janecek/ai-maturity-assessment.git', { run: { font: 'Courier New', size: 20 } }),
    para('npm install', { run: { font: 'Courier New', size: 20 } }),
    para('npm run dev', { run: { font: 'Courier New', size: 20 } }),
    para('Visit http://localhost:3000 to view the application.'),
    pageBreak(),

    // 2. Taking the Assessment
    heading1('2. Taking the Assessment'),
    heading2('2.1 Step 1: Select Your Industry'),
    para('Choose the industry that best describes your organization:'),
    createTable(
      ['Industry', 'Description'],
      [
        ['Financial Services', 'Banking, insurance, investment, fintech'],
        ['Healthcare', 'Hospitals, clinics, pharma, health tech'],
        ['Manufacturing', 'Production, supply chain, industrial'],
        ['Retail', 'E-commerce, stores, consumer goods'],
        ['Technology', 'Software, SaaS, IT services'],
        ['Professional Services', 'Consulting, legal, accounting'],
        ['Energy & Utilities', 'Oil, gas, power, utilities'],
        ['Government', 'Federal, state, local agencies'],
        ['Education', 'Universities, K-12, EdTech'],
        ['Media & Entertainment', 'Publishing, streaming, gaming'],
        ['Transportation & Logistics', 'Shipping, airlines, logistics'],
        ['General', 'Cross-industry or other']
      ],
      [3500, 5860]
    ),

    heading2('2.2 Step 2: Answer Core Questions'),
    para('You\'ll answer 7 questions, one for each maturity dimension:'),
    bullet('Governance & Risk - AI policies and oversight'),
    bullet('Developer Enablement - Tools and training for developers'),
    bullet('Workflow Integration - AI in daily processes'),
    bullet('Platform & Architecture - AI infrastructure'),
    bullet('Value Measurement - ROI and success metrics'),
    bullet('Data & Model Lifecycle - Data management practices'),
    bullet('Human Oversight - Accountability and review'),
    para('For each question, select the option that best describes your organization (0-4 scale).'),

    heading2('2.3 Step 3: Provide Contact Information'),
    createTable(
      ['Field', 'Required', 'Description'],
      [
        ['Full Name', 'Yes', 'Your name'],
        ['Work Email', 'Yes', 'Business email address'],
        ['Company', 'Yes', 'Organization name'],
        ['Job Title', 'Yes', 'Your role'],
        ['Phone', 'No', 'Contact number'],
        ['Company Size', 'No', 'Number of employees']
      ],
      [2500, 1500, 5360]
    ),

    heading2('2.4 Step 4: Optional Deep-Dive Questions'),
    para('After submitting, you can answer 7 additional questions for more detailed scoring. These are optional but improve accuracy.'),
    pageBreak(),

    // 3. Understanding Your Results
    heading1('3. Understanding Your Results'),
    heading2('3.1 Overall Maturity Score'),
    para('Your score ranges from 0.0 to 4.0:'),
    createTable(
      ['Score Range', 'Level', 'Name', 'Description'],
      [
        ['0.0 - 0.9', 'L0', 'AI-Aware', 'Recognizes AI potential, no formal adoption'],
        ['1.0 - 1.9', 'L1', 'Tool Adoption', 'Point solutions deployed, no integration'],
        ['2.0 - 2.9', 'L2', 'Workflow Integration', 'AI in specific workflows, some standards'],
        ['3.0 - 3.5', 'L3', 'Platform & Governance', 'Enterprise platform, CoE, measured ROI'],
        ['3.6 - 4.0', 'L4', 'AI-Native Strategic', 'AI core to strategy, industry leader']
      ],
      [1800, 1000, 2500, 4060]
    ),

    heading2('3.2 Dimension Breakdown'),
    para('The bar chart shows your score in each of the 7 dimensions. Focus improvement efforts on the lowest-scoring dimensions.'),

    heading2('3.3 Industry Benchmark'),
    para('See how you compare to peers in your industry:'),
    bullet('Your percentile - e.g., "75th percentile" means you score higher than 75% of similar organizations'),
    bullet('Industry average - Typical score for your industry'),
    bullet('Top quartile - Score needed to be in the top 25%'),

    heading2('3.4 Recommendations'),
    para('Based on your scores, you\'ll receive personalized recommendations:'),
    bullet('High Priority - Address within 30-60 days'),
    bullet('Medium Priority - Address within 3-6 months'),
    bullet('Low Priority - Address within 6-12 months'),

    heading2('3.5 Download PDF Report'),
    para('Click "Download PDF Summary" to get a shareable report containing your score, dimensions, recommendations, and Donyati contact information.'),

    heading2('3.6 Schedule a Consultation'),
    para('Use the embedded booking widget to schedule a free consultation with a Donyati AI expert.'),
    pageBreak(),

    // 4. Admin Dashboard
    heading1('4. Admin Dashboard'),
    heading2('4.1 Logging In'),
    para('1. Navigate to /admin'),
    para('2. Click "Sign in with Microsoft"'),
    para('3. Authenticate with your @donyati.com account'),
    para('4. You\'ll be redirected to the dashboard'),
    para('Development Mode: If DEV_AUTH_ENABLED=true, you can also log in with:'),
    bullet('Email: admin@donyati.com'),
    bullet('Password: admin123'),

    heading2('4.2 Dashboard Overview'),
    para('The main dashboard displays:'),
    createTable(
      ['Card', 'Description'],
      [
        ['Total Submissions', 'Count of all assessments'],
        ['Average Score', 'Mean maturity score'],
        ['This Month', 'Submissions in current month'],
        ['Meetings Scheduled', 'Consultations booked']
      ],
      [3500, 5860]
    ),
    para('Charts: Submissions Trend, By Industry, Score Distribution, Maturity Levels'),

    heading2('4.3 Submissions List'),
    para('Access via Submissions in the sidebar.'),

    heading3('Filtering'),
    createTable(
      ['Filter', 'Options'],
      [
        ['Industry', 'Any industry from the list'],
        ['Date Range', 'From/To date pickers'],
        ['Search', 'Name, email, or company']
      ],
      [3000, 6360]
    ),

    heading3('Columns'),
    createTable(
      ['Column', 'Description'],
      [
        ['Name', 'Assessor\'s full name'],
        ['Company', 'Organization name'],
        ['Industry', 'Selected industry'],
        ['Score', 'Overall maturity score'],
        ['Level', 'Maturity level (L0-L4)'],
        ['Date', 'Submission timestamp'],
        ['Actions', 'View details, delete']
      ],
      [3000, 6360]
    ),

    heading2('4.4 Submission Detail'),
    para('Click any submission to view full details:'),
    bullet('Contact Information: Name, email, company, title, phone, company size'),
    bullet('Assessment Results: Overall score, dimension breakdown, industry percentile'),
    bullet('Tracking Data: IP, location, referrer, UTM parameters, time to complete'),
    bullet('Meeting Tracking: Booking clicked, meeting scheduled, admin notes'),
    bullet('Actions: Email lead, mark meeting scheduled, add notes, delete'),

    heading2('4.5 Signing Out'),
    para('Click "Sign Out" at the bottom of the sidebar navigation.'),
    pageBreak(),

    // 5. Configuration
    heading1('5. Configuration'),
    heading2('5.1 Environment Variables'),
    para('Create a .env.local file with the following variables:'),
    createTable(
      ['Variable', 'Required', 'Description'],
      [
        ['DATABASE_URL', 'No', 'Neon PostgreSQL connection string'],
        ['NEXTAUTH_URL', 'Yes', 'Application URL'],
        ['NEXTAUTH_SECRET', 'Yes', 'Session encryption key'],
        ['AZURE_AD_CLIENT_ID', 'Prod', 'Azure app client ID'],
        ['AZURE_AD_CLIENT_SECRET', 'Prod', 'Azure app secret'],
        ['AZURE_AD_TENANT_ID', 'Prod', 'Azure tenant ID'],
        ['DEV_AUTH_ENABLED', 'Dev', 'Enable dev login (true/false)'],
        ['RESEND_API_KEY', 'No', 'Resend API key'],
        ['NOTIFICATION_EMAIL', 'No', 'Lead notification recipient'],
        ['BOOKINGS_URL', 'No', 'Microsoft Bookings URL']
      ],
      [3500, 1500, 4360]
    ),

    heading2('5.2 Database Setup'),
    heading3('Using Neon (Recommended)'),
    bullet('1. Create a free account at neon.tech'),
    bullet('2. Create a new project'),
    bullet('3. Copy the connection string to DATABASE_URL'),
    bullet('4. Run: psql $DATABASE_URL -f db/schema.sql'),

    heading3('Seeding Test Data'),
    para('npm run db:seed', { run: { font: 'Courier New', size: 20 } }),
    para('This creates 25 realistic test submissions.'),

    heading2('5.3 Azure AD Setup'),
    bullet('1. Go to Azure Portal → Azure Active Directory → App registrations'),
    bullet('2. Click New registration'),
    bullet('3. Set Redirect URI: https://your-domain.com/api/auth/callback/azure-ad'),
    bullet('4. Copy Application ID → AZURE_AD_CLIENT_ID'),
    bullet('5. Copy Directory ID → AZURE_AD_TENANT_ID'),
    bullet('6. Create client secret → AZURE_AD_CLIENT_SECRET'),

    heading2('5.4 Vercel Deployment'),
    bullet('1. Push code to GitHub'),
    bullet('2. Import project in Vercel'),
    bullet('3. Add all environment variables'),
    bullet('4. Deploy - app auto-deploys on push to master'),
    pageBreak(),

    // 6. Troubleshooting
    heading1('6. Troubleshooting'),
    heading2('6.1 Common Issues'),

    heading3('"No authentication providers configured"'),
    boldPara('Cause: ', 'Neither Azure AD credentials nor DEV_AUTH_ENABLED is set.'),
    boldPara('Solution: ', 'Configure AZURE_AD_* variables or set DEV_AUTH_ENABLED=true'),

    heading3('"Access denied" on admin login'),
    boldPara('Cause: ', 'Email doesn\'t end with @donyati.com.'),
    boldPara('Solution: ', 'Only @donyati.com emails can access admin. Modify lib/auth.ts to allow other domains.'),

    heading3('Assessment submissions not saving'),
    boldPara('Cause: ', 'Database not configured or connection error.'),
    boldPara('Solution: ', 'Verify DATABASE_URL is set and schema has been applied.'),

    heading3('PDF download fails'),
    boldPara('Cause: ', 'Server-side rendering error.'),
    boldPara('Solution: ', 'Check browser console and server logs.'),

    heading3('Emails not sending'),
    boldPara('Cause: ', 'Resend API key invalid or not set.'),
    boldPara('Solution: ', 'Verify RESEND_API_KEY and domain verification. App works without email.'),

    heading2('6.2 Getting Help'),
    bullet('GitHub Issues: github.com/matt-janecek/ai-maturity-assessment/issues'),
    bullet('Email: support@donyati.com'),
    pageBreak(),

    // Appendices
    heading1('Appendices'),
    heading2('A. Keyboard Shortcuts'),
    createTable(
      ['Shortcut', 'Action'],
      [
        ['Enter', 'Advance to next question'],
        ['1-5', 'Select option on question'],
        ['← / →', 'Navigate questions']
      ],
      [3000, 6360]
    ),

    heading2('B. Browser Support'),
    createTable(
      ['Browser', 'Minimum Version'],
      [
        ['Chrome', '90+'],
        ['Firefox', '88+'],
        ['Safari', '14+'],
        ['Edge', '90+']
      ],
      [4680, 4680]
    ),

    heading2('C. Mobile Support'),
    para('The application is fully responsive and works on:'),
    bullet('iOS Safari (iOS 14+)'),
    bullet('Chrome for Android'),
    bullet('Samsung Internet'),
    para('Recommended minimum screen width: 320px')
  ];

  return new Document({
    styles: commonStyles,
    numbering: commonNumbering,
    sections: [{
      properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
      headers: { default: createHeader('AI Maturity Assessment', 'Usage Guide v1.0') },
      footers: { default: createFooter() },
      children
    }]
  });
}

// =============================================================================
// Generate all documents
// =============================================================================
async function main() {
  const outputDir = '/mnt/c/Users/MattJanecek/Claude/AIAssessment/apps/self-service/docs';

  console.log('Generating PRD document...');
  const prdDoc = createPRD();
  const prdBuffer = await Packer.toBuffer(prdDoc);
  fs.writeFileSync(`${outputDir}/AI-Maturity-Assessment-PRD.docx`, prdBuffer);
  console.log('Created: AI-Maturity-Assessment-PRD.docx');

  console.log('Generating Architecture document...');
  const archDoc = createArchitecture();
  const archBuffer = await Packer.toBuffer(archDoc);
  fs.writeFileSync(`${outputDir}/AI-Maturity-Assessment-Architecture.docx`, archBuffer);
  console.log('Created: AI-Maturity-Assessment-Architecture.docx');

  console.log('Generating Usage Guide document...');
  const usageDoc = createUsageGuide();
  const usageBuffer = await Packer.toBuffer(usageDoc);
  fs.writeFileSync(`${outputDir}/AI-Maturity-Assessment-Usage-Guide.docx`, usageBuffer);
  console.log('Created: AI-Maturity-Assessment-Usage-Guide.docx');

  console.log('\nAll documents generated successfully!');
}

main().catch(console.error);
