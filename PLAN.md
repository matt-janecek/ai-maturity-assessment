# Phase 2: Validation, Rate Limiting & Tests

## Status: Complete ✅

## Tasks

### 1. Install Dependencies ✅
- `zod` — input validation
- `@upstash/ratelimit` — rate limiting
- `@upstash/redis` — Redis client for rate limiter backing store

### 2. Create lib/schemas.ts — Zod Schemas ✅
Centralized schemas for all API route inputs:
- `submitSchema` — /api/submit POST body (lead, result, tracking)
- `generatePdfSchema` — /api/generate-pdf POST body
- `generateGraphicSchema` — /api/generate-graphic POST body
- `trackBookingSchema` — /api/track-booking POST body
- `submissionsQuerySchema` — /api/admin/submissions GET query params
- `meetingUpdateSchema` — /api/admin/submissions/[id]/meeting PATCH body
- `bulkDeleteSchema` — /api/admin/submissions/bulk DELETE body
- `settingsUpdateSchema` — /api/admin/settings PUT body

### 3. Add Zod Validation to API Routes
Wire schemas into each route with consistent error responses:
- `400 { error: string, details?: ZodError.issues }` on validation failure
- Routes to update: submit, generate-pdf, generate-graphic, track-booking,
  admin/submissions (query), admin/submissions/[id]/meeting, admin/submissions/bulk,
  admin/settings

### 4. Create lib/rate-limit.ts
- Upstash Redis-backed sliding window rate limiter
- Graceful degradation: if UPSTASH_REDIS_REST_URL not set, rate limiting is skipped
- Apply to 4 public routes: submit (10/min), generate-pdf (5/min),
  generate-graphic (20/min), track-booking (10/min)
- Returns 429 with `Retry-After` header on limit exceeded

### 5. Set Up Vitest & Write Tests
- Install vitest + happy-dom as devDependencies
- Create vitest.config.ts
- Test suites:
  - `lib/__tests__/schemas.test.ts` — schema validation (valid/invalid inputs)
  - `lib/__tests__/scoring.test.ts` — scoring logic unit tests
  - `lib/__tests__/rate-limit.test.ts` — rate limiter behavior

### 6. Verify Build & Tests Pass
- `npm run build` succeeds
- `npx vitest run` passes all tests
