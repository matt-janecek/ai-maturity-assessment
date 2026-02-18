import { Ratelimit, type Duration } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'
import logger from './logger'

// Create Redis client only if env vars are set
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : null

function createLimiter(requests: number, window: Duration) {
  if (!redis) return null
  return new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(requests, window),
    analytics: true,
    prefix: 'ai-assessment',
  })
}

// Pre-built limiters for different route tiers
const limiters = {
  submit: createLimiter(10, '1 m'),
  pdf: createLimiter(5, '1 m'),
  graphic: createLimiter(20, '1 m'),
  booking: createLimiter(10, '1 m'),
}

export type RateLimitTier = keyof typeof limiters

function getClientIdentifier(request: NextRequest): string {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) return forwarded.split(',')[0].trim()

  const realIp = request.headers.get('x-real-ip')
  if (realIp) return realIp

  const vercelIp = request.headers.get('x-vercel-forwarded-for')
  if (vercelIp) return vercelIp.split(',')[0].trim()

  return 'anonymous'
}

/**
 * Apply rate limiting to a request. Returns null if allowed, or a 429 Response if blocked.
 * Gracefully skips rate limiting if Upstash is not configured.
 */
export async function rateLimit(
  request: NextRequest,
  tier: RateLimitTier
): Promise<NextResponse | null> {
  const limiter = limiters[tier]
  if (!limiter) return null // Upstash not configured — allow all

  try {
    const identifier = getClientIdentifier(request)
    const { success, limit, remaining, reset } = await limiter.limit(identifier)

    if (!success) {
      const retryAfter = Math.ceil((reset - Date.now()) / 1000)
      logger.warn({ tier, identifier, limit, remaining }, 'Rate limit exceeded')
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        {
          status: 429,
          headers: {
            'Retry-After': String(retryAfter),
            'X-RateLimit-Limit': String(limit),
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': String(reset),
          },
        }
      )
    }

    return null // Allowed
  } catch (error) {
    // If Redis is down, allow the request through
    logger.error({ err: error, tier }, 'Rate limit check failed — allowing request')
    return null
  }
}
