// Redis-based Rate Limiting via Upstash
// Works with Vercel Edge/Serverless — no persistent connections needed

import { Redis } from '@upstash/redis'

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const UPSTASH_URL = process.env.UPSTASH_REDIS_REST_URL
const UPSTASH_TOKEN = process.env.UPSTASH_REDIS_REST_TOKEN

let redis: Redis | null = null

function getRedis(): Redis | null {
  if (!UPSTASH_URL || !UPSTASH_TOKEN) return null
  if (!redis) {
    redis = new Redis({ url: UPSTASH_URL, token: UPSTASH_TOKEN })
  }
  return redis
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface RateLimitResult {
  allowed: boolean
  remaining: number
  resetTime: number // epoch ms when the window resets
  limit: number
}

export interface RateLimitConfig {
  /** Max requests per window */
  maxRequests: number
  /** Window duration in seconds (default 60) */
  windowSeconds?: number
}

// ---------------------------------------------------------------------------
// Pre-built presets
// ---------------------------------------------------------------------------

export const RATE_LIMIT_PRESETS = {
  /** General read APIs — 60 req/min */
  general: { maxRequests: 60, windowSeconds: 60 },
  /** Write endpoints (ratings, progress, etc.) — 10 req/min */
  write: { maxRequests: 10, windowSeconds: 60 },
  /** Auth endpoints (login, signup) — 10 req/min */
  auth: { maxRequests: 10, windowSeconds: 60 },
  /** AI generation — 20 req/min */
  ai: { maxRequests: 20, windowSeconds: 60 },
  /** Admin endpoints — 30 req/min */
  admin: { maxRequests: 30, windowSeconds: 60 },
  /** Cron endpoints — 6 req/min (one every 10s) */
  cron: { maxRequests: 6, windowSeconds: 60 },
} as const

// ---------------------------------------------------------------------------
// Sliding-window rate limiter (Upstash Redis)
// ---------------------------------------------------------------------------

/**
 * Sliding window counter using a sorted set.
 * Each request is stored as a member with its timestamp as the score.
 * Old entries outside the window are pruned on every check.
 */
async function redisRateLimit(
  identifier: string,
  config: RateLimitConfig,
): Promise<RateLimitResult> {
  const r = getRedis()
  if (!r) {
    // Fallback to in-memory (see below)
    return memoryRateLimit(identifier, config)
  }

  const now = Date.now()
  const windowMs = (config.windowSeconds ?? 60) * 1000
  const windowStart = now - windowMs
  const key = `ratelimit:${identifier}`

  // Lua script for atomic sliding-window check
  // 1. Remove expired entries
  // 2. Count current window entries
  // 3. If under limit, add new entry
  // Returns: [allowed (0/1), current_count, ttl_of_key]
  const luaScript = `
    redis.call('ZREMRANGEBYSCORE', KEYS[1], '-inf', ARGV[1])
    local count = redis.call('ZCARD', KEYS[1])
    if tonumber(count) < tonumber(ARGV[2]) then
      redis.call('ZADD', KEYS[1], ARGV[3], ARGV[3] .. ':' .. math.random(1, 1000000))
      redis.call('PEXPIRE', KEYS[1], ARGV[4])
      return {1, count + 1, ARGV[4]}
    end
    return {0, count, ARGV[4]}
  `

  const maxRequests = config.maxRequests
  const ttl = String(windowMs) // pexpire in ms

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = await r.eval(
    luaScript,
    [key],          // KEYS
    [               // ARGV
      String(windowStart),
      String(maxRequests),
      String(now),
      ttl,
    ],
  )

  const allowed = Number(result?.[0] ?? 0) === 1
  const currentCount = Number(result?.[1] ?? 0)
  const resetTime = now + windowMs

  return {
    allowed,
    remaining: Math.max(0, maxRequests - currentCount),
    resetTime,
    limit: maxRequests,
  }
}

// ---------------------------------------------------------------------------
// In-memory fallback (for local dev / no Redis)
// ---------------------------------------------------------------------------

const memoryStore = new Map<string, { count: number; resetTime: number }>()

function memoryRateLimit(
  identifier: string,
  config: RateLimitConfig,
): RateLimitResult {
  const now = Date.now()
  const windowMs = (config.windowSeconds ?? 60) * 1000
  const maxRequests = config.maxRequests
  const record = memoryStore.get(identifier)

  if (!record || now > record.resetTime) {
    const newRecord = { count: 1, resetTime: now + windowMs }
    memoryStore.set(identifier, newRecord)
    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime,
      limit: maxRequests,
    }
  }

  if (record.count >= maxRequests) {
    return {
      allowed: false,
      remaining: 0,
      resetTime: record.resetTime,
      limit: maxRequests,
    }
  }

  record.count++
  return {
    allowed: true,
    remaining: maxRequests - record.count,
    resetTime: record.resetTime,
    limit: maxRequests,
  }
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Check rate limit for an identifier + config.
 * Uses Upstash Redis when available, falls back to in-memory for local dev.
 */
export async function checkRateLimit(
  identifier: string,
  config: RateLimitConfig = RATE_LIMIT_PRESETS.general,
): Promise<RateLimitResult> {
  try {
    return await redisRateLimit(identifier, config)
  } catch (error) {
    console.warn('[rate-limit] Redis error, falling back to memory:', error)
    return memoryRateLimit(identifier, config)
  }
}

/**
 * Build a Response for rate-limited requests (HTTP 429).
 */
export function rateLimitResponse(result: RateLimitResult): Response {
  const retryAfter = Math.max(1, Math.ceil((result.resetTime - Date.now()) / 1000))
  return new Response(
    JSON.stringify({
      success: false,
      error: 'Too many requests. Please try again later.',
      retryAfter,
    }),
    {
      status: 429,
      headers: {
        'Content-Type': 'application/json',
        'Retry-After': String(retryAfter),
        'X-RateLimit-Limit': String(result.limit),
        'X-RateLimit-Remaining': String(result.remaining),
        'X-RateLimit-Reset': String(Math.ceil(result.resetTime / 1000)),
      },
    },
  )
}

/**
 * Add rate-limit headers to a successful response.
 */
export function addRateLimitHeaders(
  response: Response,
  result: RateLimitResult,
): Response {
  response.headers.set('X-RateLimit-Limit', String(result.limit))
  response.headers.set('X-RateLimit-Remaining', String(result.remaining))
  response.headers.set('X-RateLimit-Reset', String(Math.ceil(result.resetTime / 1000)))
  return response
}
