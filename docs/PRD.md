# Product Requirements Document (PRD)
## AI Maturity Self-Service Assessment

**Version:** 1.0
**Date:** February 2, 2026
**Author:** Donyati
**Status:** Production

---

## 1. Executive Summary

The AI Maturity Self-Service Assessment is a web application that enables organizations to evaluate their AI adoption maturity through a guided questionnaire. Users receive an instant maturity score, personalized recommendations, and the option to schedule a consultation with Donyati experts.

### Business Objectives

1. **Lead Generation**: Capture qualified leads interested in AI consulting services
2. **Thought Leadership**: Demonstrate Donyati's AI assessment methodology
3. **Sales Enablement**: Provide sales team with pre-qualified leads and assessment data
4. **Market Intelligence**: Gather industry-wide AI maturity benchmarking data

### Success Metrics

| Metric | Target |
|--------|--------|
| Assessment Completion Rate | > 70% |
| Lead-to-Meeting Conversion | > 15% |
| Average Time to Complete | < 5 minutes |
| User Satisfaction (NPS) | > 40 |

---

## 2. Product Overview

### 2.1 Target Users

| Persona | Description | Goals |
|---------|-------------|-------|
| **IT Leader** | CIO, CTO, VP Engineering | Benchmark AI capabilities, justify AI investments |
| **Business Executive** | CEO, COO, Line of Business Leader | Understand AI readiness, plan transformation |
| **Innovation Lead** | AI/ML Manager, Digital Transformation Lead | Assess current state, identify gaps |
| **Consultant** | Strategy consultant evaluating client | Quick AI maturity snapshot |

### 2.2 User Journey

```
Landing Page → Start Assessment → Select Industry → Answer Questions →
Submit Contact Info → View Results → Download PDF → Schedule Consultation
```

### 2.3 Key Value Propositions

1. **Free & Instant**: No cost, immediate results
2. **Industry-Specific**: Tailored questions and benchmarks for 12 industries
3. **Actionable**: Personalized recommendations based on scores
4. **Professional**: Downloadable PDF report for stakeholders
5. **Easy Next Steps**: Integrated consultation scheduling

---

## 3. Functional Requirements

### 3.1 Assessment Flow

#### FR-001: Industry Selection
- Display 12 industry options in a grid layout
- Each industry has an icon and description
- "General" option for cross-industry assessments
- Selection advances to questions automatically

#### FR-002: Core Questions (Required)
- 7 questions, one per maturity dimension
- 5-point scale (0-4) with descriptive labels
- Industry-specific question wording
- Progress bar showing completion
- Previous/Next navigation

#### FR-003: Lead Capture Form
- Required fields: Name, Email, Company, Job Title
- Optional fields: Phone, Company Size
- Email validation (format check)
- Form appears after core questions

#### FR-004: Deep-Dive Questions (Optional)
- 7 additional questions for detailed assessment
- Skippable (proceed to results without answering)
- Improve scoring accuracy

#### FR-005: Results Display
- Overall maturity score (0.0-4.0)
- Maturity level badge (L0-L4)
- 7-dimension bar chart
- Industry benchmark comparison
- Top 3 personalized recommendations
- Maturity journey visualization

### 3.2 Scoring & Recommendations

#### FR-006: Scoring Algorithm
- Average dimension scores for overall score
- Map score to maturity level:
  - L0 (0.0-0.9): AI-Aware
  - L1 (1.0-1.9): Tool Adoption
  - L2 (2.0-2.9): Workflow Integration
  - L3 (3.0-3.5): Platform & Governance
  - L4 (3.6-4.0): AI-Native Strategic

#### FR-007: Recommendation Engine
- 40+ recommendations across 7 dimensions
- Triggered by dimension score thresholds
- Priority levels: High, Medium, Low
- Industry-specific recommendation variants

#### FR-008: Industry Benchmarking
- Compare user score to industry average
- Calculate percentile ranking
- Display comparison visualization

### 3.3 Deliverables

#### FR-009: PDF Report
- Branded PDF with Donyati logo
- Contains: Score, dimensions, recommendations
- Downloadable from results page
- Shareable with stakeholders

#### FR-010: Consultation Booking
- Embedded Microsoft Bookings widget
- Pre-filled with user information
- Track booking clicks and completions

### 3.4 Admin Dashboard

#### FR-011: Authentication
- Azure AD SSO for @donyati.com users
- Development login for testing
- Protected routes with session management

#### FR-012: Analytics Dashboard
- Total submissions count
- Average maturity score
- Submissions trend (30-day chart)
- Industry distribution
- Score distribution histogram
- Maturity level breakdown

#### FR-013: Submission Management
- Paginated submissions table
- Filter by: Industry, Date Range, Search
- View full submission details
- Track meeting status
- Add notes to submissions
- Export to CSV/Excel

### 3.5 Tracking & Notifications

#### FR-014: Submission Tracking
- IP address and geolocation
- UTM parameters (source, medium, campaign)
- HTTP referrer
- Time to complete assessment
- User agent

#### FR-015: Email Notifications
- Send notification on new submission
- Include: Lead info, scores, tracking data
- Quick action buttons (email lead, view bookings)

---

## 4. Non-Functional Requirements

### 4.1 Performance

| Requirement | Target |
|-------------|--------|
| Page Load Time | < 2 seconds |
| Assessment Submit | < 3 seconds |
| PDF Generation | < 5 seconds |
| Admin Dashboard Load | < 3 seconds |

### 4.2 Scalability

- Support 1,000+ concurrent users
- Handle 10,000+ submissions per month
- Serverless architecture for auto-scaling

### 4.3 Availability

- 99.9% uptime SLA
- Graceful degradation if database unavailable
- Error handling with user-friendly messages

### 4.4 Security

| Requirement | Implementation |
|-------------|----------------|
| Authentication | Azure AD with JWT tokens |
| Authorization | Domain-based access control |
| Data Protection | HTTPS, encrypted database |
| SQL Injection | Parameterized queries |
| Session Security | Secure, httpOnly cookies |

### 4.5 Accessibility

- WCAG 2.1 AA compliance target
- Keyboard navigation support
- Screen reader compatible
- Color contrast ratios met

### 4.6 Browser Support

- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile: iOS Safari, Chrome for Android

---

## 5. Technical Specifications

### 5.1 Technology Stack

| Component | Technology |
|-----------|------------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS |
| Charts | Recharts |
| PDF | @react-pdf/renderer |
| Database | Neon PostgreSQL (serverless) |
| Auth | NextAuth with Azure AD |
| Email | Resend |
| Hosting | Vercel |

### 5.2 API Endpoints

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/submit` | POST | Submit assessment |
| `/api/generate-pdf` | POST | Generate PDF report |
| `/api/admin/submissions` | GET | List submissions |
| `/api/admin/analytics` | GET | Dashboard analytics |
| `/api/admin/export` | GET | Export to CSV |

### 5.3 Database Schema

Primary table: `assessment_submissions`
- Contact fields: name, email, company, title, phone, company_size
- Assessment fields: industry, overall_score, maturity_level, dimension_scores
- Tracking fields: ip_address, country, city, utm_*, referrer_url
- Timestamps: created_at, booking_clicked_at, meeting_scheduled_at

---

## 6. Dimensions & Questions

### 6.1 Seven Maturity Dimensions

| Dimension | Description |
|-----------|-------------|
| **Governance & Risk** | AI policies, oversight, risk management |
| **Developer Enablement** | Tools, training, coding assistance |
| **Workflow Integration** | AI in daily processes, automation |
| **Platform & Architecture** | Infrastructure, MLOps, scalability |
| **Value Measurement** | ROI tracking, success metrics |
| **Data & Model Lifecycle** | Data management, model operations |
| **Human Oversight** | Accountability, review processes |

### 6.2 Scoring Scale

| Score | Label | Description |
|-------|-------|-------------|
| 0 | None | No AI adoption in this area |
| 1 | Initial | Ad-hoc, individual experiments |
| 2 | Developing | Structured pilots, some standards |
| 3 | Established | Organization-wide, documented |
| 4 | Optimized | Industry-leading, continuous improvement |

---

## 7. Industries Supported

1. Financial Services
2. Healthcare
3. Manufacturing
4. Retail
5. Technology
6. Professional Services
7. Energy & Utilities
8. Government
9. Education
10. Media & Entertainment
11. Transportation & Logistics
12. General (cross-industry)

---

## 8. Future Enhancements

### Phase 2 (Q2 2026)
- [ ] Payment integration for detailed reports
- [ ] Multi-language support
- [ ] Competitive benchmarking by company size
- [ ] Email drip campaigns for nurturing

### Phase 3 (Q3 2026)
- [ ] White-label/custom branding
- [ ] Team assessments (multiple users)
- [ ] Historical tracking (reassessment over time)
- [ ] API for enterprise integrations

---

## 9. Appendix

### A. Maturity Level Definitions

**L0 - AI-Aware**: Organization recognizes AI potential but has no formal adoption. Individual experimentation may exist.

**L1 - Tool Adoption**: Point solutions deployed (e.g., Copilot, ChatGPT). No governance or integration strategy.

**L2 - Workflow Integration**: AI embedded in specific workflows. Some standardization and training programs.

**L3 - Platform & Governance**: Enterprise AI platform, CoE established, comprehensive policies, measured ROI.

**L4 - AI-Native Strategic**: AI is core to business strategy. Continuous optimization, industry leadership, competitive advantage.

### B. Recommendation Priority Definitions

- **High**: Critical gap impacting AI success; address within 30-60 days
- **Medium**: Important improvement; address within 3-6 months
- **Low**: Nice-to-have enhancement; address within 6-12 months
