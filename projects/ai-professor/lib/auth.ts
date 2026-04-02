// Authentication Helpers

import { getSupabaseAdmin } from './supabase'
import { User } from '../types/database'
import { NextRequest } from 'next/server'

// Re-export auth store for client components
export { useAuthStore } from '../stores/auth-store'

// Get user by email (server-side)
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const supabaseAdmin = getSupabaseAdmin()
    const { data } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .single()
    return data
  } catch (error) {
    return null
  }
}

// Get user from API route — checks Bearer token OR x-user-email header
export async function getApiUser(request: NextRequest): Promise<User | null> {
  // Check for x-user-email header (sent by client from localStorage)
  const userEmail = request.headers.get('x-user-email')
  if (userEmail) {
    return getUserByEmail(userEmail)
  }

  // Check for x-admin-email header (admin dashboard)
  const adminEmail = request.headers.get('x-admin-email')
  if (adminEmail) {
    return getUserByEmail(adminEmail)
  }

  // Check Bearer token (if client sends Supabase access token)
  const authHeader = request.headers.get('Authorization')
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.substring(7)
    try {
      const supabaseAdmin = getSupabaseAdmin()
      const { data: { user } } = await supabaseAdmin.auth.getUser(token)
      if (user) {
        return getUserByEmail(user.email!)
      }
    } catch {
      // Invalid token
    }
  }

  return null
}

// Require authentication middleware
export async function requireAuth(request: NextRequest): Promise<User> {
  const user = await getApiUser(request)
  
  if (!user) {
    throw new AuthError('Authentication required', 401)
  }

  return user
}

// Require specific subscription tier
export async function requireTier(
  request: NextRequest,
  requiredTier: 'basic' | 'pro' | 'enterprise'
): Promise<User> {
  const user = await requireAuth(request)

  const tierLevels: Record<string, number> = {
    free: 0,
    basic: 1,
    pro: 2,
    enterprise: 3,
  }

  const userLevel = tierLevels[user.subscription_tier] || 0
  const requiredLevel = tierLevels[requiredTier] || 0

  if (userLevel < requiredLevel) {
    throw new AuthError(
      `This feature requires ${requiredTier} subscription or higher`,
      403
    )
  }

  return user
}

// Check if user is admin by email
export function isAdminEmail(email: string): boolean {
  const ADMIN_EMAILS = ['bryanbleong@gmail.com']
  return ADMIN_EMAILS.includes(email)
}

// Rate limiting — delegates to lib/rate-limit.ts (Upstash Redis with in-memory fallback)
import { checkRateLimit as redisCheckRateLimit, RATE_LIMIT_PRESETS } from './rate-limit'

// Internal store for the synchronous fallback
const _fallbackStore = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 100,
  windowMs: number = 60000
): { allowed: boolean; remaining: number; resetTime: number } {
  const now = Date.now()
  const record = _fallbackStore.get(identifier)

  if (!record || now > record.resetTime) {
    const newRecord = { count: 1, resetTime: now + windowMs }
    _fallbackStore.set(identifier, newRecord)
    return { allowed: true, remaining: maxRequests - 1, resetTime: newRecord.resetTime }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetTime: record.resetTime }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count, resetTime: record.resetTime }
}

// Apply rate limiting to request — uses Redis-backed sliding window
export async function applyRateLimit(
  request: NextRequest,
  maxRequests?: number
): Promise<void> {
  const user = await getApiUser(request)
  const identifier = user?.id || 'anonymous'

  let config
  if (maxRequests === undefined || maxRequests === 60) {
    config = RATE_LIMIT_PRESETS.general
  } else {
    config = { maxRequests, windowSeconds: 60 }
  }

  const result = await redisCheckRateLimit(identifier, config)

  if (!result.allowed) {
    throw new RateLimitError(
      'Too many requests. Please try again later.',
      result.resetTime
    )
  }
}

// Validate email format
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Validate password strength
export function validatePassword(password: string): {
  valid: boolean
  errors: string[]
} {
  const errors: string[] = []

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)')
  }

  return {
    valid: errors.length === 0,
    errors,
  }
}

// Generate secure token
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let token = ''
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return token
}

// Sanitize user input
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, '')
    .substring(0, 10000)
}

// Validate UUID
export function isValidUUID(uuid: string): boolean {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(uuid)
}

// Error classes
export class AuthError extends Error {
  statusCode: number
  constructor(
    message: string,
    statusCode: number = 401
  ) {
    super(message)
    this.name = 'AuthError'
    this.statusCode = statusCode
  }
}

export class RateLimitError extends Error {
  resetTime: number
  constructor(
    message: string,
    resetTime: number
  ) {
    super(message)
    this.name = 'RateLimitError'
    this.resetTime = resetTime
  }
}

// Helper to create error response
export function createErrorResponse(
  error: any,
  defaultMessage: string = 'An error occurred',
  statusCode?: number
): Response {
  console.error('API Error:', error)

  if (error instanceof AuthError) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
      }),
      {
        status: error.statusCode,
        headers: { 'Content-Type': 'application/json' },
      }
    )
  }

  if (error instanceof RateLimitError) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error.message,
        retryAfter: Math.ceil((error.resetTime - Date.now()) / 1000),
      }),
      {
        status: 429,
        headers: {
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil((error.resetTime - Date.now()) / 1000)),
        },
      }
    )
  }

  return new Response(
    JSON.stringify({
      success: false,
      error: error.message || defaultMessage,
    }),
    {
      status: statusCode || 500,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}

// Helper to create success response
export function createSuccessResponse<T>(data: T, status: number = 200): Response {
  return new Response(
    JSON.stringify({
      success: true,
      data,
    }),
    {
      status,
      headers: { 'Content-Type': 'application/json' },
    }
  )
}
