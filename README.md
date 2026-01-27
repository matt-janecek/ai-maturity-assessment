# AI Maturity Self-Service Assessment

A lead generation web app for potential clients to complete a quick AI maturity assessment (5-10 min), receive a personalized mini-report with infographic, and schedule a consultation with Donyati.

## Features

- **Landing Page**: Value proposition and call-to-action
- **7-Question Assessment**: Core questions covering all 7 AI maturity dimensions
- **Optional Deep-Dive**: 7 additional questions for more detailed analysis
- **Lead Capture**: Name, email, company, title collection
- **Results Dashboard**:
  - Overall maturity score (0-4 scale)
  - Maturity level badge (L0-L4)
  - Dimension breakdown chart
  - Top 3 personalized recommendations
  - Visual maturity progression indicator
- **PDF Summary**: Downloadable report with all results
- **Microsoft Bookings Integration**: Schedule consultation directly
- **Email Notifications**: Lead details sent to sales team (optional)

## Tech Stack

| Component | Technology |
|-----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Email | Resend (optional) |
| Hosting | Vercel (recommended) |

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

```
apps/self-service/
├── app/
│   ├── page.tsx                    # Landing page
│   ├── assess/
│   │   ├── page.tsx                # Assessment wizard
│   │   └── results/page.tsx        # Results dashboard
│   ├── api/
│   │   ├── submit/route.ts         # Lead capture API
│   │   ├── generate-pdf/route.ts   # PDF generation API
│   │   └── generate-graphic/route.ts  # Infographic API
│   ├── layout.tsx                  # Root layout
│   └── globals.css                 # Global styles
├── components/
│   ├── QuestionCard.tsx            # Question display
│   ├── ProgressBar.tsx             # Progress indicator
│   ├── LeadCaptureForm.tsx         # Contact form
│   ├── ScoreDisplay.tsx            # Circular score display
│   ├── DimensionChart.tsx          # Bar chart for dimensions
│   ├── RecommendationsPreview.tsx  # Top recommendations
│   └── BookingsEmbed.tsx           # Consultation scheduling
├── lib/
│   ├── questions.ts                # Question definitions
│   ├── scoring.ts                  # Scoring logic
│   └── recommendations.ts          # Recommendation engine
├── public/
│   └── DonyatiLogo.png             # Brand logo
├── tailwind.config.js              # Donyati brand theme
└── package.json
```

## Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# Email Notifications (optional - uses Resend)
RESEND_API_KEY=your_resend_api_key

# Email addresses for lead notifications
NOTIFICATION_EMAIL=leads@donyati.com
FROM_EMAIL=noreply@donyati.com

# Microsoft Bookings URL
BOOKINGS_URL=https://outlook.office365.com/book/YourOrg@domain.com/
```

### Email Notifications

To enable email notifications when leads complete the assessment:

1. Sign up at [Resend](https://resend.com)
2. Create an API key
3. Verify your sending domain
4. Add `RESEND_API_KEY` to environment variables

### Microsoft Bookings

To enable consultation scheduling:

1. Set up a Microsoft Bookings page
2. Update `BOOKINGS_URL` in environment variables
3. Or modify `BookingsEmbed.tsx` to use your URL directly

## Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

```bash
# Or use Vercel CLI
npm i -g vercel
vercel
```

### Other Platforms

The app can be deployed to any platform supporting Next.js:

- Netlify
- AWS Amplify
- Railway
- Self-hosted with Node.js

## Customization

### Questions

Edit `lib/questions.ts` to modify assessment questions. Each question has:
- `id`: Unique identifier
- `dimension`: One of the 7 AI maturity dimensions
- `text`: Question text
- `options`: Array of answer choices with scores (0-4)
- `isCore`: Whether it's a required core question

### Recommendations

Edit `lib/recommendations.ts` to modify the recommendation engine:
- Add/remove recommendations
- Adjust trigger conditions
- Modify priority levels

### Branding

Update `tailwind.config.js` to change colors and styling:
- `donyati` colors for brand colors
- `level` colors for maturity level indicators
- Fonts, shadows, and gradients

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/submit` | POST | Capture lead info and assessment results |
| `/api/generate-pdf` | POST | Generate PDF summary report |
| `/api/generate-graphic` | POST | Generate maturity infographic HTML |

## The 7 Dimensions

1. **Governance & Risk** - AI policies, compliance, auditability
2. **Developer Enablement** - Tools, training, best practices
3. **Human Oversight** - Review processes, accountability
4. **Workflow Integration** - SDLC coverage, process embedding
5. **Platform & Architecture** - Internal platform, RAG capabilities
6. **Value Measurement** - ROI tracking, productivity metrics
7. **Data & Model Lifecycle** - Data readiness, prompt governance

## Maturity Levels

| Level | Name | Score Range |
|-------|------|-------------|
| L0 | AI-Aware | 0.0 - 0.9 |
| L1 | Tool Adoption | 1.0 - 1.9 |
| L2 | Workflow Integration | 2.0 - 2.9 |
| L3 | Platform & Governance | 3.0 - 3.5 |
| L4 | AI-Native Strategic | 3.6 - 4.0 |

## License

Proprietary - Donyati © 2026
