import { describe, it, expect } from 'vitest'
import { rateLimit } from '../rate-limit'

// We test the module's behavior when Upstash env vars are NOT set.
// In that case, rateLimit() should always return null (allow).
describe('rate-limit (no Upstash configured)', () => {
  it('returns null (allow) when Upstash is not configured', async () => {
    const fakeRequest = {
      headers: new Headers({ 'x-forwarded-for': '1.2.3.4' }),
    } as any

    const result = await rateLimit(fakeRequest, 'submit')
    expect(result).toBeNull()
  })

  it('returns null for all tiers', async () => {
    const fakeRequest = { headers: new Headers() } as any

    for (const tier of ['submit', 'pdf', 'graphic', 'booking'] as const) {
      const result = await rateLimit(fakeRequest, tier)
      expect(result).toBeNull()
    }
  })
})
