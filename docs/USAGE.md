# Usage Guide
## AI Maturity Self-Service Assessment

**Version:** 1.0
**Date:** February 2, 2026
**Author:** Donyati

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Taking the Assessment](#2-taking-the-assessment)
3. [Understanding Your Results](#3-understanding-your-results)
4. [Admin Dashboard](#4-admin-dashboard)
5. [Configuration](#5-configuration)
6. [Troubleshooting](#6-troubleshooting)

---

## 1. Getting Started

### 1.1 For End Users

Visit the assessment at: **https://ai-maturity-assessment-dvro.vercel.app/**

No account or login required. The assessment takes approximately 5 minutes.

### 1.2 For Administrators

Access the admin dashboard at: **https://ai-maturity-assessment-dvro.vercel.app/admin**

Sign in with your @donyati.com Microsoft account.

### 1.3 For Developers

#### Prerequisites

- Node.js 18+
- npm 9+
- PostgreSQL database (Neon recommended)

#### Local Development Setup

```bash
# Clone the repository
git clone https://github.com/matt-janecek/ai-maturity-assessment.git
cd ai-maturity-assessment

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Configure environment variables (see Section 5)

# Start development server
npm run dev
```

Visit `http://localhost:3000` to view the application.

---

## 2. Taking the Assessment

### 2.1 Step 1: Select Your Industry

Choose the industry that best describes your organization:

| Industry | Description |
|----------|-------------|
| Financial Services | Banking, insurance, investment, fintech |
| Healthcare | Hospitals, clinics, pharma, health tech |
| Manufacturing | Production, supply chain, industrial |
| Retail | E-commerce, stores, consumer goods |
| Technology | Software, SaaS, IT services |
| Professional Services | Consulting, legal, accounting |
| Energy & Utilities | Oil, gas, power, utilities |
| Government | Federal, state, local agencies |
| Education | Universities, K-12, EdTech |
| Media & Entertainment | Publishing, streaming, gaming |
| Transportation & Logistics | Shipping, airlines, logistics |
| General | Cross-industry or other |

### 2.2 Step 2: Answer Core Questions

You'll answer 7 questions, one for each maturity dimension:

1. **Governance & Risk** - AI policies and oversight
2. **Developer Enablement** - Tools and training for developers
3. **Workflow Integration** - AI in daily processes
4. **Platform & Architecture** - AI infrastructure
5. **Value Measurement** - ROI and success metrics
6. **Data & Model Lifecycle** - Data management practices
7. **Human Oversight** - Accountability and review

For each question, select the option that best describes your organization (0-4 scale).

### 2.3 Step 3: Provide Contact Information

Enter your details to receive your personalized results:

| Field | Required | Description |
|-------|----------|-------------|
| Full Name | Yes | Your name |
| Work Email | Yes | Business email address |
| Company | Yes | Organization name |
| Job Title | Yes | Your role |
| Phone | No | Contact number |
| Company Size | No | Number of employees |

### 2.4 Step 4: Optional Deep-Dive Questions

After submitting, you can answer 7 additional questions for more detailed scoring. These are optional but improve accuracy.

---

## 3. Understanding Your Results

### 3.1 Overall Maturity Score

Your score ranges from 0.0 to 4.0:

| Score Range | Level | Name | Description |
|-------------|-------|------|-------------|
| 0.0 - 0.9 | L0 | AI-Aware | Recognizes AI potential, no formal adoption |
| 1.0 - 1.9 | L1 | Tool Adoption | Point solutions deployed, no integration |
| 2.0 - 2.9 | L2 | Workflow Integration | AI in specific workflows, some standards |
| 3.0 - 3.5 | L3 | Platform & Governance | Enterprise platform, CoE, measured ROI |
| 3.6 - 4.0 | L4 | AI-Native Strategic | AI core to strategy, industry leader |

### 3.2 Dimension Breakdown

The bar chart shows your score in each of the 7 dimensions. Focus improvement efforts on the lowest-scoring dimensions.

### 3.3 Industry Benchmark

See how you compare to peers in your industry:

- **Your percentile** - e.g., "75th percentile" means you score higher than 75% of similar organizations
- **Industry average** - Typical score for your industry
- **Top quartile** - Score needed to be in the top 25%

### 3.4 Recommendations

Based on your scores, you'll receive personalized recommendations:

- **High Priority** - Address within 30-60 days
- **Medium Priority** - Address within 3-6 months
- **Low Priority** - Address within 6-12 months

### 3.5 Download PDF Report

Click "Download PDF Summary" to get a shareable report containing:

- Overall score and level
- Dimension breakdown
- Industry comparison
- Top recommendations
- Donyati contact information

### 3.6 Schedule a Consultation

Use the embedded booking widget to schedule a free consultation with a Donyati AI expert.

---

## 4. Admin Dashboard

### 4.1 Logging In

1. Navigate to `/admin`
2. Click "Sign in with Microsoft"
3. Authenticate with your @donyati.com account
4. You'll be redirected to the dashboard

**Development Mode**: If `DEV_AUTH_ENABLED=true`, you can also log in with:
- Email: `admin@donyati.com`
- Password: `admin123`

### 4.2 Dashboard Overview

The main dashboard displays:

| Card | Description |
|------|-------------|
| Total Submissions | Count of all assessments |
| Average Score | Mean maturity score |
| This Month | Submissions in current month |
| Meetings Scheduled | Consultations booked |

**Charts:**
- **Submissions Trend** - Daily submissions over last 30 days
- **By Industry** - Distribution of submissions by industry
- **Score Distribution** - Histogram of maturity scores
- **Maturity Levels** - Pie chart of L0-L4 distribution

### 4.3 Submissions List

Access via **Submissions** in the sidebar.

#### Filtering

| Filter | Options |
|--------|---------|
| Industry | Any industry from the list |
| Date Range | From/To date pickers |
| Search | Name, email, or company |

#### Columns

| Column | Description |
|--------|-------------|
| Name | Assessor's full name |
| Company | Organization name |
| Industry | Selected industry |
| Score | Overall maturity score |
| Level | Maturity level (L0-L4) |
| Date | Submission timestamp |
| Actions | View details, delete |

#### Exporting

Click "Export" to download submissions as CSV or Excel:

- Filtered by current filter settings
- Includes all fields (contact, scores, tracking)

### 4.4 Submission Detail

Click any submission to view full details:

**Contact Information:**
- Name, email, company, title
- Phone, company size
- Direct email link

**Assessment Results:**
- Overall score and level
- Dimension scores breakdown
- Industry percentile

**Tracking Data:**
- IP address and location
- Referrer URL
- UTM parameters (source, medium, campaign)
- Time to complete

**Meeting Tracking:**
- Booking clicked timestamp
- Meeting scheduled timestamp
- Admin notes field

**Actions:**
- Email the lead
- Mark meeting as scheduled
- Add notes
- Delete submission

### 4.5 Signing Out

Click "Sign Out" at the bottom of the sidebar navigation.

---

## 5. Configuration

### 5.1 Environment Variables

Create a `.env.local` file with the following variables:

```bash
# ===========================================
# Database (Required for persistence)
# ===========================================
DATABASE_URL=postgresql://user:pass@host.neon.tech/neondb?sslmode=require

# ===========================================
# NextAuth (Required)
# ===========================================
NEXTAUTH_URL=https://your-domain.com
NEXTAUTH_SECRET=your-random-secret-key-here

# ===========================================
# Azure AD (Production Authentication)
# ===========================================
AZURE_AD_CLIENT_ID=your-azure-app-client-id
AZURE_AD_CLIENT_SECRET=your-azure-app-secret
AZURE_AD_TENANT_ID=your-azure-tenant-id

# ===========================================
# Development Mode (Optional)
# ===========================================
# Set to "true" to enable dev login (admin@donyati.com / admin123)
DEV_AUTH_ENABLED=false

# ===========================================
# Email Notifications (Optional)
# ===========================================
RESEND_API_KEY=re_your_api_key
NOTIFICATION_EMAIL=leads@yourdomain.com
FROM_EMAIL=noreply@yourdomain.com

# ===========================================
# Microsoft Bookings (Optional)
# ===========================================
BOOKINGS_URL=https://outlook.office365.com/book/YourBooking/
```

### 5.2 Database Setup

#### Using Neon (Recommended)

1. Create a free account at [neon.tech](https://neon.tech)
2. Create a new project
3. Copy the connection string to `DATABASE_URL`
4. Run the schema migration:

```bash
# Connect to your database and run:
psql $DATABASE_URL -f db/schema.sql

# Apply tracking fields migration:
psql $DATABASE_URL -f db/migrations/001_add_tracking_fields.sql
```

#### Seeding Test Data

```bash
npm run db:seed
```

This creates 25 realistic test submissions.

### 5.3 Azure AD Setup

1. Go to [Azure Portal](https://portal.azure.com)
2. Navigate to **Azure Active Directory** → **App registrations**
3. Click **New registration**
4. Configure:
   - Name: "AI Maturity Assessment"
   - Supported account types: Single tenant
   - Redirect URI: `https://your-domain.com/api/auth/callback/azure-ad`
5. Copy **Application (client) ID** → `AZURE_AD_CLIENT_ID`
6. Copy **Directory (tenant) ID** → `AZURE_AD_TENANT_ID`
7. Go to **Certificates & secrets** → **New client secret**
8. Copy the secret value → `AZURE_AD_CLIENT_SECRET`

### 5.4 Resend Email Setup

1. Create account at [resend.com](https://resend.com)
2. Verify your sending domain
3. Create an API key
4. Set `RESEND_API_KEY` in environment

### 5.5 Vercel Deployment

1. Push code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add all environment variables
4. Deploy

The app auto-deploys on push to `master` branch.

---

## 6. Troubleshooting

### 6.1 Common Issues

#### "No authentication providers configured"

**Cause:** Neither Azure AD credentials nor `DEV_AUTH_ENABLED` is set.

**Solution:** Set environment variables:
- For production: Configure `AZURE_AD_*` variables
- For development: Set `DEV_AUTH_ENABLED=true`

#### "Access denied" on admin login

**Cause:** Email doesn't end with `@donyati.com`.

**Solution:** Only @donyati.com emails can access admin. Modify `lib/auth.ts` to allow other domains.

#### Assessment submissions not saving

**Cause:** Database not configured or connection error.

**Solution:**
1. Verify `DATABASE_URL` is set
2. Check database is accessible
3. Ensure schema has been applied

#### PDF download fails

**Cause:** Server-side rendering error.

**Solution:** Check browser console and server logs for specific error.

#### Emails not sending

**Cause:** Resend API key invalid or not set.

**Solution:**
1. Verify `RESEND_API_KEY` is correct
2. Check sending domain is verified in Resend
3. Application works without email (non-blocking)

### 6.2 Debug Mode

Add to your `.env.local`:

```bash
# Enable verbose logging
DEBUG=true
```

### 6.3 Checking Deployment Status

```bash
# View recent Vercel deployments
npx vercel ls

# View deployment logs
npx vercel logs
```

### 6.4 Database Queries

Useful queries for debugging:

```sql
-- Count submissions by industry
SELECT industry, COUNT(*)
FROM assessment_submissions
GROUP BY industry;

-- Recent submissions
SELECT name, company, overall_score, created_at
FROM assessment_submissions
ORDER BY created_at DESC
LIMIT 10;

-- Average score by industry
SELECT industry, AVG(overall_score) as avg_score
FROM assessment_submissions
GROUP BY industry
ORDER BY avg_score DESC;
```

### 6.5 Getting Help

- **GitHub Issues**: [github.com/matt-janecek/ai-maturity-assessment/issues](https://github.com/matt-janecek/ai-maturity-assessment/issues)
- **Email**: support@donyati.com

---

## Appendix A: Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Enter` | Advance to next question |
| `1-5` | Select option on question |
| `←` / `→` | Navigate questions |

## Appendix B: Browser Support

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

## Appendix C: Mobile Support

The application is fully responsive and works on:

- iOS Safari (iOS 14+)
- Chrome for Android
- Samsung Internet

Recommended minimum screen width: 320px
