# AI Maturity Assessment - Features & Functionality

## Overview

A self-service AI maturity assessment tool that allows organizations to evaluate their AI readiness across 7 dimensions, receive personalized results, and connect with Donyati consultants.

**Live URL:** https://ai-maturity-assessment-dvro.vercel.app/

---

## Public Assessment Features

### Industry Selection
- 12 industry options with tailored question wording
- Industries: Financial Services, Healthcare, Manufacturing, Retail, Technology, Professional Services, Energy & Utilities, Government, Education, Media & Entertainment, Transportation & Logistics, General
- Industry-specific benchmarks and percentile rankings

### Assessment Questions
- **7 Core Questions** covering all dimensions
- **7 Optional Deep-Dive Questions** for more detailed analysis
- 5-point Likert scale responses (0-4)
- Auto-advance after selection with visual feedback
- Progress bar showing completion status

### 7 Assessment Dimensions
1. **Governance & Risk** - AI policies, oversight, compliance
2. **Developer Enablement** - Tools, training, prompt engineering
3. **Workflow Integration** - AI in business processes
4. **Platform & Architecture** - Infrastructure, scalability
5. **Human Oversight** - Review processes, accountability
6. **Knowledge & Documentation** - Best practices, knowledge sharing
7. **Value Measurement** - ROI tracking, metrics

### Lead Capture Form
- Required fields: Name, Email, Company
- Optional fields: Title, Phone, Company Size
- Company size dropdown (1-50 to 5,001+ employees)
- Email validation
- Privacy notice

### Results Page
- **Overall Score** (0-4 scale)
- **Maturity Level** (0-4) with descriptions:
  - Level 0: AI-Aware
  - Level 1: Tool Adoption
  - Level 2: Workflow Integration
  - Level 3: Platform & Governance
  - Level 4: AI-Native Strategic
- **Dimension Breakdown** - Visual chart of all 7 dimensions
- **Industry Benchmark** - Percentile ranking vs industry peers
- **Top 3 Recommendations** with teasers
- **Maturity Journey Visualization** - Shows position on 5-level scale
- **PDF Download** - Branded report with all results
- **Schedule Consultation** - Direct link to Microsoft Bookings

---

## Admin Dashboard

### Authentication
- Microsoft Azure AD SSO (for @donyati.com accounts)
- Development mode login (admin@donyati.com / admin123)
- Protected routes via NextAuth.js middleware

### Analytics Dashboard (`/admin`)
- **Total Submissions** - All-time count
- **Average Score** - Overall average
- **Submissions This Month** - Current month count
- **Submissions Over Time** - 30-day trend chart
- **Industry Distribution** - Pie chart by industry
- **Score Distribution** - Histogram (0-1, 1-2, 2-3, 3-4)
- **Maturity Level Distribution** - Bar chart by level
- **Recent Submissions** - Quick view of latest 5

### Submissions List (`/admin/submissions`)
- **Sortable Columns**: Date, Name, Company, Industry, Score, Level
- **Filters**: Industry dropdown, date range, search
- **Search**: Name, email, or company
- **Pagination**: 20 per page with navigation
- **Actions**: View details, Delete

### Submission Detail (`/admin/submissions/[id]`)

#### Contact Information
- Name, Email (clickable mailto link)
- Company, Title
- Phone (clickable tel link)
- Company Size
- Industry
- Submission date/time

#### Assessment Results
- Overall score with visual display
- Maturity level badge with description
- Industry percentile (if applicable)

#### Meeting Status
- **Booking Link Clicked** - Timestamp when user clicked scheduling link
- **Meeting Scheduled** - Toggle to mark when meeting is confirmed
- **Meeting Notes** - Text area for notes about the meeting

#### Location & Device Tracking
- IP Address
- Location (City, Region, Country)
- User Agent (browser/device info)
- Time to Complete (minutes:seconds)

#### Marketing Attribution
- Referrer URL
- UTM Source
- UTM Medium
- UTM Campaign
- UTM Term
- UTM Content

#### Dimension Scores
- All 7 dimensions with scores and progress bars
- Questions answered count per dimension

#### Quick Actions
- Email Lead (pre-filled template)
- Book Meeting (Outlook link)
- Delete Submission

### CSV Export
- Export all submissions with current filters
- Includes all fields for CRM import

---

## Tracking & Analytics

### Automatic Tracking (Captured on Submit)
| Field | Description |
|-------|-------------|
| IP Address | From request headers (x-forwarded-for, x-real-ip) |
| Country | Geolocation lookup via ip-api.com |
| City | Geolocation lookup |
| Region | Geolocation lookup |
| User Agent | Browser and device information |
| Referrer URL | Previous page/site |
| UTM Source | Marketing campaign source |
| UTM Medium | Marketing campaign medium |
| UTM Campaign | Campaign name |
| UTM Term | Paid search keywords |
| UTM Content | Ad/link variant |
| Time to Complete | Seconds from start to submit |

### Behavioral Tracking
| Event | Description |
|-------|-------------|
| Booking Click | When user clicks "Schedule Consultation" |
| Meeting Scheduled | Manual toggle by admin |

### UTM Parameter Usage
Link format for campaigns:
```
https://ai-maturity-assessment-dvro.vercel.app/assess?utm_source=linkedin&utm_medium=social&utm_campaign=q1-awareness
```

---

## Email Notifications

### Lead Notification Email
Sent to configured email when assessment is submitted:
- Contact information with location
- Assessment results and scores
- Dimension breakdown table
- Marketing attribution (if UTM present)
- Quick action buttons (Email Lead, Bookings Page)

### Configuration
- `RESEND_API_KEY` - Resend.com API key
- `NOTIFICATION_EMAIL` - Recipient for lead notifications
- `FROM_EMAIL` - Sender email (must be verified domain)

---

## PDF Report

### Contents
- Donyati branding and date
- Company name and industry
- Overall score (large display)
- Maturity level with description
- Industry benchmark comparison (if applicable)
- Dimension scores table with progress bars
- Call-to-action for consultation

### Generation
- Server-side rendering using @react-pdf/renderer
- Automatic download with company name in filename

---

## Technical Stack

### Frontend
- Next.js 14 (App Router)
- React 18
- Tailwind CSS
- Recharts (analytics charts)

### Backend
- Next.js API Routes
- NextAuth.js (authentication)
- Neon Postgres (serverless database)

### External Services
- **Resend** - Email notifications
- **Microsoft Bookings** - Consultation scheduling
- **ip-api.com** - Geolocation lookup
- **Vercel** - Hosting with auto-deploy from GitHub

### Database Schema
```sql
assessment_submissions (
  id SERIAL PRIMARY KEY,
  -- Contact
  name, email, company, title, phone, company_size,
  -- Assessment
  industry, overall_score, maturity_level, maturity_name,
  dimension_scores (JSONB), industry_percentile,
  -- Tracking
  ip_address, country, city, region, user_agent,
  referrer_url, utm_source, utm_medium, utm_campaign,
  utm_term, utm_content, time_to_complete_seconds,
  -- Meeting
  booking_clicked_at, meeting_scheduled_at, meeting_notes,
  -- Timestamp
  created_at
)
```

---

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | Neon Postgres connection string |
| `NEXTAUTH_URL` | Yes | App URL for authentication |
| `NEXTAUTH_SECRET` | Yes | Secret for JWT signing |
| `DEV_AUTH_ENABLED` | No | Set to "true" for dev login |
| `AZURE_AD_CLIENT_ID` | No | Azure AD app client ID |
| `AZURE_AD_CLIENT_SECRET` | No | Azure AD app secret |
| `AZURE_AD_TENANT_ID` | No | Azure AD tenant ID |
| `RESEND_API_KEY` | No | Resend API key for emails |
| `NOTIFICATION_EMAIL` | No | Email for lead notifications |
| `FROM_EMAIL` | No | Sender email address |

---

## Future Enhancements

- [ ] Microsoft Graph API integration for automatic booking detection
- [ ] Webhook notifications to external CRM
- [ ] A/B testing for question variants
- [ ] Multi-language support
- [ ] Custom branding/white-label options
- [ ] API for programmatic assessment submission
