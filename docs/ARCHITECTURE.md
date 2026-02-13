# Architecture Document
## AI Maturity Self-Service Assessment

**Version:** 1.0
**Date:** February 2, 2026
**Author:** Donyati

---

## 1. System Overview

The AI Maturity Self-Service Assessment is a serverless web application built on Next.js 14, deployed on Vercel, with a Neon PostgreSQL database. The architecture follows a JAMstack pattern with server-side rendering for dynamic content.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                   USERS                                      │
│                                                                              │
│   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐                  │
│   │  Public User │    │ Admin User   │    │ Sales Team   │                  │
│   │  (Assessor)  │    │ (@donyati)   │    │ (via Email)  │                  │
│   └──────┬───────┘    └──────┬───────┘    └──────┬───────┘                  │
└──────────┼───────────────────┼───────────────────┼──────────────────────────┘
           │                   │                   │
           ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              VERCEL EDGE                                     │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         CDN / Static Assets                             │ │
│  │                    (HTML, CSS, JS, Images, Fonts)                       │ │
│  └────────────────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
           │
           ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          NEXT.JS APPLICATION                                 │
│                                                                              │
│  ┌────────────────────────┐    ┌────────────────────────┐                   │
│  │     PUBLIC PAGES       │    │     ADMIN PAGES        │                   │
│  │  ┌──────────────────┐  │    │  ┌──────────────────┐  │                   │
│  │  │   Landing (/)    │  │    │  │  Login (/admin)  │  │                   │
│  │  │  Assessment      │  │    │  │  Dashboard       │  │                   │
│  │  │  Results         │  │    │  │  Submissions     │  │                   │
│  │  └──────────────────┘  │    │  └──────────────────┘  │                   │
│  └────────────────────────┘    └────────────────────────┘                   │
│                                          │                                   │
│                                          ▼                                   │
│                              ┌──────────────────────┐                        │
│                              │  NextAuth Middleware │                        │
│                              │  (Azure AD / JWT)    │                        │
│                              └──────────────────────┘                        │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────────┐ │
│  │                         API ROUTES (/api)                               │ │
│  │                                                                         │ │
│  │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐   │ │
│  │  │   /submit   │  │/generate-pdf│  │   /admin/*  │  │ /auth/*     │   │ │
│  │  │             │  │             │  │             │  │             │   │ │
│  │  │ Assessment  │  │    PDF      │  │ Submissions │  │  NextAuth   │   │ │
│  │  │ Submission  │  │ Generation  │  │  Analytics  │  │  Handlers   │   │ │
│  │  └──────┬──────┘  └─────────────┘  └──────┬──────┘  └──────┬──────┘   │ │
│  │         │                                  │                 │         │ │
│  └─────────┼──────────────────────────────────┼─────────────────┼─────────┘ │
│            │                                  │                 │           │
└────────────┼──────────────────────────────────┼─────────────────┼───────────┘
             │                                  │                 │
             ▼                                  ▼                 ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                          EXTERNAL SERVICES                                   │
│                                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐    │
│  │    Neon      │  │   Resend     │  │  Azure AD    │  │  ip-api.com  │    │
│  │  PostgreSQL  │  │   (Email)    │  │   (Auth)     │  │ (Geolocation)│    │
│  │              │  │              │  │              │  │              │    │
│  │  Submissions │  │ Notification │  │    SSO       │  │  IP Lookup   │    │
│  │  Analytics   │  │   Emails     │  │  Tokens      │  │   Country    │    │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘    │
│                                                                              │
│  ┌──────────────┐                                                           │
│  │  Microsoft   │                                                           │
│  │  Bookings    │                                                           │
│  │  (Embedded)  │                                                           │
│  └──────────────┘                                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Component Architecture

### 2.1 Frontend Components

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           COMPONENT HIERARCHY                                │
│                                                                              │
│  app/layout.tsx                                                             │
│  └── Providers (NextAuth SessionProvider)                                   │
│      │                                                                       │
│      ├── app/page.tsx (Landing)                                             │
│      │   └── Hero, Features, CTA Buttons                                    │
│      │                                                                       │
│      ├── app/assess/page.tsx (Assessment)                                   │
│      │   ├── IndustrySelector                                               │
│      │   ├── ProgressBar                                                    │
│      │   ├── QuestionCard                                                   │
│      │   └── LeadCaptureForm                                                │
│      │                                                                       │
│      ├── app/assess/results/page.tsx (Results)                              │
│      │   ├── ScoreDisplay                                                   │
│      │   ├── DimensionChart (Recharts)                                      │
│      │   ├── BenchmarkComparison                                            │
│      │   ├── RecommendationsPreview                                         │
│      │   └── BookingsEmbed                                                  │
│      │                                                                       │
│      └── app/admin/layout.tsx (Admin Shell)                                 │
│          ├── AdminNav (Sidebar)                                             │
│          │                                                                   │
│          ├── app/admin/page.tsx (Dashboard)                                 │
│          │   ├── AnalyticsCards                                             │
│          │   ├── TimeSeriesChart                                            │
│          │   ├── IndustryChart                                              │
│          │   ├── ScoreDistribution                                          │
│          │   └── MaturityLevelChart                                         │
│          │                                                                   │
│          ├── app/admin/submissions/page.tsx                                 │
│          │   ├── SubmissionFilters                                          │
│          │   ├── ExportButton                                               │
│          │   └── SubmissionsTable                                           │
│          │                                                                   │
│          └── app/admin/submissions/[id]/page.tsx                            │
│              └── SubmissionDetail                                           │
│                  └── DeleteConfirmModal                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 API Routes

```
/api
├── auth/
│   └── [...nextauth]/route.ts    # NextAuth handlers (GET, POST)
│
├── submit/route.ts               # POST: Submit assessment
│   ├── Validate input
│   ├── Calculate scores
│   ├── Lookup geolocation (async)
│   ├── Insert to database
│   └── Send email notification
│
├── generate-pdf/route.ts         # POST: Generate PDF report
│   └── Render PDF with @react-pdf/renderer
│
├── generate-graphic/route.ts     # POST: Generate HTML infographic
│
├── track-booking/route.ts        # POST: Track booking clicks
│
└── admin/
    ├── submissions/route.ts      # GET: List submissions (paginated)
    ├── submissions/[id]/route.ts # GET/PATCH/DELETE: Single submission
    ├── analytics/route.ts        # GET: Dashboard analytics
    └── export/route.ts           # GET: Export to CSV
```

---

## 3. Data Flow Diagrams

### 3.1 Assessment Submission Flow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│   User     │     │  Browser   │     │  Vercel    │     │  Database  │
│            │     │ (React)    │     │  (API)     │     │  (Neon)    │
└─────┬──────┘     └─────┬──────┘     └─────┬──────┘     └─────┬──────┘
      │                  │                  │                  │
      │ 1. Fill Form     │                  │                  │
      │─────────────────>│                  │                  │
      │                  │                  │                  │
      │                  │ 2. POST /api/submit                 │
      │                  │─────────────────>│                  │
      │                  │                  │                  │
      │                  │                  │ 3. Calculate Scores
      │                  │                  │──────────┐       │
      │                  │                  │<─────────┘       │
      │                  │                  │                  │
      │                  │                  │ 4. Geo Lookup    │
      │                  │                  │───────> ip-api   │
      │                  │                  │<─────── country  │
      │                  │                  │                  │
      │                  │                  │ 5. INSERT        │
      │                  │                  │─────────────────>│
      │                  │                  │<─────────────────│
      │                  │                  │   submission_id  │
      │                  │                  │                  │
      │                  │                  │ 6. Send Email    │
      │                  │                  │───────> Resend   │
      │                  │                  │                  │
      │                  │ 7. { success }   │                  │
      │                  │<─────────────────│                  │
      │                  │                  │                  │
      │                  │ 8. Store in sessionStorage          │
      │                  │ 9. Navigate to /results             │
      │                  │                  │                  │
      │ 10. View Results │                  │                  │
      │<─────────────────│                  │                  │
      │                  │                  │                  │
```

### 3.2 Admin Authentication Flow

```
┌────────────┐     ┌────────────┐     ┌────────────┐     ┌────────────┐
│   Admin    │     │  Browser   │     │  NextAuth  │     │  Azure AD  │
│   User     │     │            │     │            │     │            │
└─────┬──────┘     └─────┬──────┘     └─────┬──────┘     └─────┬──────┘
      │                  │                  │                  │
      │ 1. Visit /admin  │                  │                  │
      │─────────────────>│                  │                  │
      │                  │                  │                  │
      │                  │ 2. Check session │                  │
      │                  │─────────────────>│                  │
      │                  │   (no session)   │                  │
      │                  │<─────────────────│                  │
      │                  │                  │                  │
      │ 3. Redirect to   │                  │                  │
      │    /admin/login  │                  │                  │
      │<─────────────────│                  │                  │
      │                  │                  │                  │
      │ 4. Click "Sign in│                  │                  │
      │    with Microsoft│                  │                  │
      │─────────────────>│                  │                  │
      │                  │                  │                  │
      │                  │ 5. signIn()      │                  │
      │                  │─────────────────>│                  │
      │                  │                  │                  │
      │                  │                  │ 6. OAuth Redirect│
      │                  │                  │─────────────────>│
      │                  │                  │                  │
      │ 7. Microsoft Login                  │                  │
      │───────────────────────────────────────────────────────>│
      │                                     │                  │
      │ 8. Callback with code               │                  │
      │<───────────────────────────────────────────────────────│
      │                  │                  │                  │
      │                  │ 9. Exchange code │                  │
      │                  │─────────────────>│                  │
      │                  │                  │ 10. Validate     │
      │                  │                  │─────────────────>│
      │                  │                  │<─────────────────│
      │                  │                  │   user info      │
      │                  │                  │                  │
      │                  │                  │ 11. Check domain │
      │                  │                  │ (@donyati.com)   │
      │                  │                  │                  │
      │                  │ 12. Create JWT   │                  │
      │                  │<─────────────────│                  │
      │                  │                  │                  │
      │ 13. Redirect to  │                  │                  │
      │     /admin       │                  │                  │
      │<─────────────────│                  │                  │
      │                  │                  │                  │
```

---

## 4. Database Schema

### 4.1 Entity Relationship Diagram

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         assessment_submissions                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ PK │ id                  │ SERIAL         │ Auto-increment ID               │
├────┼─────────────────────┼────────────────┼─────────────────────────────────┤
│    │ CONTACT INFO        │                │                                 │
│    │ name                │ VARCHAR(255)   │ Full name                       │
│    │ email               │ VARCHAR(255)   │ Email address                   │
│    │ company             │ VARCHAR(255)   │ Organization name               │
│    │ title               │ VARCHAR(255)   │ Job title                       │
│    │ phone               │ VARCHAR(50)    │ Contact phone (optional)        │
│    │ company_size        │ VARCHAR(50)    │ Employee count range            │
├────┼─────────────────────┼────────────────┼─────────────────────────────────┤
│    │ ASSESSMENT DATA     │                │                                 │
│    │ industry            │ VARCHAR(100)   │ Selected industry               │
│    │ overall_score       │ DECIMAL(5,2)   │ Maturity score 0.0-4.0          │
│    │ maturity_level      │ INTEGER        │ Level 0-4                       │
│    │ maturity_name       │ VARCHAR(50)    │ Level name                      │
│    │ dimension_scores    │ JSONB          │ Array of dimension scores       │
│    │ industry_percentile │ INTEGER        │ Percentile within industry      │
├────┼─────────────────────┼────────────────┼─────────────────────────────────┤
│    │ TRACKING DATA       │                │                                 │
│    │ ip_address          │ VARCHAR(45)    │ Client IP                       │
│    │ country             │ VARCHAR(100)   │ Geolocation                     │
│    │ city                │ VARCHAR(100)   │ Geolocation                     │
│    │ region              │ VARCHAR(100)   │ Geolocation                     │
│    │ user_agent          │ TEXT           │ Browser info                    │
│    │ referrer_url        │ TEXT           │ HTTP referrer                   │
│    │ utm_source          │ VARCHAR(255)   │ UTM tracking                    │
│    │ utm_medium          │ VARCHAR(255)   │ UTM tracking                    │
│    │ utm_campaign        │ VARCHAR(255)   │ UTM tracking                    │
│    │ utm_term            │ VARCHAR(255)   │ UTM tracking                    │
│    │ utm_content         │ VARCHAR(255)   │ UTM tracking                    │
│    │ time_to_complete    │ INTEGER        │ Seconds to complete             │
├────┼─────────────────────┼────────────────┼─────────────────────────────────┤
│    │ MEETING TRACKING    │                │                                 │
│    │ booking_clicked_at  │ TIMESTAMP      │ When booking clicked            │
│    │ meeting_scheduled_at│ TIMESTAMP      │ When meeting confirmed          │
│    │ meeting_notes       │ TEXT           │ Admin notes                     │
├────┼─────────────────────┼────────────────┼─────────────────────────────────┤
│    │ METADATA            │                │                                 │
│    │ created_at          │ TIMESTAMP      │ Submission timestamp            │
└────┴─────────────────────┴────────────────┴─────────────────────────────────┘

INDEXES:
- idx_submissions_created_at (created_at DESC)
- idx_submissions_industry (industry)
- idx_submissions_company (company)
- idx_submissions_email (email)
```

### 4.2 Dimension Scores JSON Structure

```json
{
  "dimension_scores": [
    {
      "dimension": "Governance & Risk",
      "score": 2.5,
      "questionsAnswered": 2
    },
    {
      "dimension": "Developer Enablement",
      "score": 3.0,
      "questionsAnswered": 2
    }
    // ... 5 more dimensions
  ]
}
```

---

## 5. Technology Stack Details

### 5.1 Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 14.x | React framework with App Router |
| React | 18.x | UI component library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 3.4.x | Utility-first CSS framework |
| Recharts | 3.7.x | Chart visualizations |

### 5.2 Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js API Routes | 14.x | Serverless API endpoints |
| NextAuth | 4.24.x | Authentication framework |
| @react-pdf/renderer | 3.4.x | PDF generation |

### 5.3 Database

| Technology | Purpose |
|------------|---------|
| Neon PostgreSQL | Serverless database |
| @neondatabase/serverless | Database client |
| JSONB | Flexible dimension scores storage |

### 5.4 External Services

| Service | Purpose |
|---------|---------|
| Vercel | Hosting & deployment |
| Azure AD | Admin SSO authentication |
| Resend | Transactional email |
| ip-api.com | IP geolocation |
| Microsoft Bookings | Consultation scheduling |

---

## 6. Security Architecture

### 6.1 Authentication Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           AUTHENTICATION LAYERS                              │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        MIDDLEWARE (middleware.ts)                    │    │
│  │  - Intercepts requests to /admin/* (except /admin/login, /admin/test)│    │
│  │  - Checks for valid NextAuth session                                 │    │
│  │  - Redirects to /admin/login if no session                          │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                        NEXTAUTH (lib/auth.ts)                        │    │
│  │                                                                      │    │
│  │  Providers:                                                          │    │
│  │  ┌─────────────────────┐  ┌─────────────────────┐                   │    │
│  │  │     Azure AD        │  │  Dev Credentials    │                   │    │
│  │  │  (Production SSO)   │  │  (Local Testing)    │                   │    │
│  │  │                     │  │                     │                   │    │
│  │  │ - Client ID         │  │ - Email: admin@...  │                   │    │
│  │  │ - Client Secret     │  │ - Password: admin123│                   │    │
│  │  │ - Tenant ID         │  │                     │                   │    │
│  │  └─────────────────────┘  └─────────────────────┘                   │    │
│  │                                                                      │    │
│  │  Callbacks:                                                          │    │
│  │  - signIn: Verify email ends with @donyati.com                      │    │
│  │  - session: Add user ID to session                                   │    │
│  │  - jwt: Store user info in token                                    │    │
│  │                                                                      │    │
│  │  Session Strategy: JWT (stateless)                                   │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 6.2 Security Controls

| Control | Implementation |
|---------|----------------|
| Transport Security | HTTPS enforced by Vercel |
| Authentication | Azure AD SSO with JWT tokens |
| Authorization | Domain-based (@donyati.com) |
| SQL Injection | Parameterized queries via Neon |
| XSS Prevention | React's built-in escaping |
| CSRF Protection | NextAuth CSRF tokens |
| Rate Limiting | Vercel Edge rate limiting |

---

## 7. Deployment Architecture

### 7.1 Vercel Deployment

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              VERCEL PLATFORM                                 │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                           EDGE NETWORK                               │    │
│  │                                                                      │    │
│  │   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐         │    │
│  │   │   CDN Edge   │    │   CDN Edge   │    │   CDN Edge   │         │    │
│  │   │  (US-East)   │    │  (EU-West)   │    │  (Asia)      │         │    │
│  │   └──────────────┘    └──────────────┘    └──────────────┘         │    │
│  │                                                                      │    │
│  │   Static assets cached globally                                      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                    │                                         │
│                                    ▼                                         │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       SERVERLESS FUNCTIONS                           │    │
│  │                                                                      │    │
│  │   ┌──────────────────────────────────────────────────────────┐      │    │
│  │   │  Next.js API Routes (auto-scaled, pay-per-use)           │      │    │
│  │   │                                                          │      │    │
│  │   │  /api/submit         - Assessment submission             │      │    │
│  │   │  /api/generate-pdf   - PDF generation                    │      │    │
│  │   │  /api/admin/*        - Admin endpoints                   │      │    │
│  │   │  /api/auth/*         - NextAuth handlers                 │      │    │
│  │   └──────────────────────────────────────────────────────────┘      │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │                       ENVIRONMENT VARIABLES                          │    │
│  │                                                                      │    │
│  │   DATABASE_URL          AZURE_AD_CLIENT_ID                          │    │
│  │   NEXTAUTH_SECRET       AZURE_AD_CLIENT_SECRET                      │    │
│  │   NEXTAUTH_URL          AZURE_AD_TENANT_ID                          │    │
│  │   RESEND_API_KEY        DEV_AUTH_ENABLED                            │    │
│  │   NOTIFICATION_EMAIL    BOOKINGS_URL                                │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                              NEON DATABASE                                   │
│                                                                              │
│   Region: US-East-2 (AWS)                                                   │
│   Connection: Serverless driver with connection pooling                     │
│   Scaling: Auto-scale compute, auto-suspend when idle                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 7.2 CI/CD Pipeline

```
GitHub Repository
      │
      │ Push to master
      ▼
┌─────────────────┐
│  Vercel Build   │
│  - npm install  │
│  - npm run build│
│  - Type check   │
│  - Lint         │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Deploy Preview │ ◄── Pull Requests
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   Production    │ ◄── Merge to master
│   Deployment    │
└─────────────────┘
```

---

## 8. Error Handling & Monitoring

### 8.1 Error Handling Strategy

| Layer | Strategy |
|-------|----------|
| Client | Try/catch with user-friendly messages |
| API Routes | Try/catch, return appropriate HTTP codes |
| Database | Connection retry, graceful degradation |
| External APIs | Timeout handling, fallback values |

### 8.2 Graceful Degradation

- **Database unavailable**: Assessment works, results stored in session only
- **Email service down**: Submission succeeds, email skipped
- **Geolocation timeout**: IP stored, location fields empty
- **PDF generation fails**: User sees error, can retry

---

## 9. Appendix

### A. Environment Variables Reference

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | No | Neon PostgreSQL connection string |
| `NEXTAUTH_URL` | Yes | Application URL |
| `NEXTAUTH_SECRET` | Yes | Session encryption key |
| `AZURE_AD_CLIENT_ID` | Prod | Azure app client ID |
| `AZURE_AD_CLIENT_SECRET` | Prod | Azure app secret |
| `AZURE_AD_TENANT_ID` | Prod | Azure tenant ID |
| `DEV_AUTH_ENABLED` | Dev | Enable dev login |
| `RESEND_API_KEY` | No | Resend API key |
| `NOTIFICATION_EMAIL` | No | Lead notification recipient |
| `BOOKINGS_URL` | No | Microsoft Bookings URL |

### B. API Response Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Created (new submission) |
| 400 | Bad Request (validation error) |
| 401 | Unauthorized (no session) |
| 403 | Forbidden (wrong domain) |
| 404 | Not Found |
| 500 | Internal Server Error |
