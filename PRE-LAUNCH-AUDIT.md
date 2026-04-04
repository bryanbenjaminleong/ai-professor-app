# CXO Academy — Pre-Launch Audit Report

**Date:** April 4, 2026  
**Auditor:** Solutions Architect (via STAR)  
**Launch Date:** April 13, 2026 (9 days)  
**Codebase:** `/tmp/ai-professor-app/projects/ai-professor/`

---

## Executive Summary (TL;DR for Bryan)

**The platform is ~80% launch-ready but has CRITICAL security issues that must be fixed before any public access.** The architecture is fundamentally sound (Supabase + Next.js 14 + Vercel is a proven stack), but there are hardcoded admin credentials in client-side code, secrets committed to `.env.production`, an unprotected news scraping endpoint, and significant dead code from a subscription-era model that contradicts your current one-time pricing strategy. The good news: the brand migration to "CXO Academy" is clean in the UI, pricing pages are correct ($19.99/course, $49.99/program), and the core learning flow works. With focused effort over the next week, this is shippable.

**Verdict: 🟡 Launch possible April 13 IF critical items below are addressed.**

---

## 🔴 Critical Issues (MUST FIX before launch)

### C1. Hardcoded Admin Credentials in Client-Side Code
**File:** `app/analytics/page.tsx` (lines 17-18)
```
const ADMIN_EMAIL = 'bryanbleong@gmail.com'
const ADMIN_PASSWORD = 'OriginLabs2024!'
```
**Severity: 🔴 CRITICAL**  
This is shipped to every user's browser. Anyone who views source has your admin credentials. This is the single biggest security risk.

**Fix:** Remove this page entirely or replace with server-side auth via NextAuth session (same pattern as `/admin`).

### C2. Secrets Committed to Repository
**File:** `.env.production` contains:
- `SUPABASE_SERVICE_ROLE_KEY` — full admin access to your database
- `OPENAI_API_KEY` — billing-attached API key
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — exposed by design, but still should be in Vercel env vars, not in code

This file is in the repo. If the repo is ever public or leaked, your entire database and OpenAI account are compromised.

**Fix:** 
1. Add `.env.production` to `.gitignore`
2. Set all env vars in Vercel dashboard
3. Rotate the Supabase service role key and OpenAI API key immediately

### C3. Unauthenticated News Scraping Endpoint
**File:** `app/api/news/scrape/route.ts`
```ts
// For now, allow scraping without auth (for testing)
```
Anyone can POST to `/api/news/scrape` and trigger expensive scraping + AI summarization, burning your OpenAI credits.

**Fix:** Add admin auth check (same pattern as `/api/admin/stats`).

### C4. Unauthenticated AI Generation Endpoint
**File:** `app/api/ai/generate/route.ts`  
The `requireAuth` is called, but the rate-limiting for free-tier users is a no-op comment (`// Already handled by applyRateLimit`). If auth can be bypassed (e.g., via the `users` table which uses service_role for all queries), this is an open vector for abuse.

**Fix:** Verify auth flow end-to-end. Ensure the `users` table RLS is actually enforced (see C5).

### C5. All Database Queries Use Service Role Key
**File:** `lib/supabase.ts`  
Every single `db.*` operation uses `getSupabaseAdmin()` (service role key), which **bypasses all RLS policies**. The RLS policies in `supabase/fix-rls-policies.sql` are effectively useless because the API routes never use the anon-key client.

**Fix:** For user-scoped operations (progress, ratings, enrollments), use the user's JWT token to create a scoped Supabase client. Only use admin client for admin operations.

---

## 🟠 High Priority (Should Fix Before Launch)

### H1. Subscription Era Dead Code
The codebase still has extensive subscription-tier infrastructure that contradicts your one-time pricing model:
- `types/subscription.ts` — defines Free/Basic/Pro/Enterprise monthly plans ($19/$49/$199/mo)
- `lib/constants.ts` — `SUBSCRIPTION_LIMITS` with free/basic/pro/enterprise tiers
- `lib/constants.ts` — `SUBSCRIPTION_REQUIRED` error message
- `app/api/subscriptions/route.ts` — placeholder that returns "not available"
- `app/api/webhooks/stripe/route.ts` — stub webhook handler
- `app/api/stripe/checkout/route.ts` — returns "Payments not yet configured"
- `lib/stripe.ts` — stub with `throw new Error('Stripe not configured')`
- DB schema has `subscription_tier` enum with `free/basic/pro/enterprise`
- DB schema has `subscriptions` table with `stripe_subscription_id`

**Risk:** Confusing to maintain, potential for accidentally showing subscription UI. Not blocking for launch but adds tech debt.

**Fix:** Either clean up now or accept the debt. The `/pricing` page correctly shows one-time pricing, so users won't be confused.

### H2. Dashboard Uses Hardcoded Mock Data
**File:** `app/dashboard/page.tsx`  
The enrolled courses section uses hardcoded mock data with Unsplash image URLs and fake instructor names. This will confuse real users who see fake courses they never enrolled in.

**Fix:** Fetch real enrollment data from `/api/progress` or show an empty state for new users.

### H3. No Payment Flow
There is no working payment flow. The Stripe checkout returns "Payments not yet configured." Users can browse courses but cannot purchase them.

**Impact:** If you're charging $19.99/course at launch, this is blocking. If soft launch is free access, this is a post-launch item.

**Decision needed from Bryan:** Is the soft launch free access? If so, this becomes medium priority.

### H4. Auth Flow — Missing Environment Variables
**File:** `app/api/auth/[...nextauth]/route.ts` references:
- `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID` / `GITHUB_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`

None of these are in `.env.production`. If not set in Vercel, OAuth login will fail silently. The `!` non-null assertions will crash at runtime.

**Fix:** Configure all OAuth env vars in Vercel, or remove unused OAuth providers.

### H5. N+1 Query in Progress API
**File:** `app/api/progress/route.ts` (lines 78-95)  
For each enrollment, it fetches lessons for that course sequentially:
```ts
const enrollmentsWithProgress = await Promise.all(
  enrollments.map(async (enrollment) => {
    const lessons = await db.lessons.getByCourse(course.id)
```
If a user has 10 enrollments, this is 10+ separate DB queries.

**Fix:** Batch-fetch all lessons for enrolled courses in a single query.

### H6. `notifications` Table May Not Exist
**File:** `app/api/notifications/route.ts` queries `notifications` table, but no migration creates this table (not in `schema.sql`, `complete-schema.sql`, or any migration file). The `notifications` table is also referenced by `components/NotificationBell.tsx`.

**Fix:** Create the `notifications` table in Supabase, or remove the notification feature.

### H7. x-user-email Auth Pattern is Insecure
**File:** `app/api/notifications/route.ts`  
Auth is done via `x-user-email` header. Anyone can set this header to any email and access another user's notifications. This is not authentication.

**Fix:** Use the Bearer token pattern (like `/api/voice/route.ts` does correctly).

---

## 🟡 Medium Priority (Recommended)

### M1. `/test` Page and `public/test.html` Should Be Removed
- `app/test/page.tsx` — generic test page
- `public/test.html` — references "Pulse + AI Professor" (old branding)

These are developer artifacts that shouldn't be in production.

### M2. Duplicate STRIPE_CONFIG Definitions
- `lib/stripe-config.ts` defines `STRIPE_CONFIG`
- `lib/stripe.ts` also defines `STRIPE_CONFIG`
- `lib/constants.ts` also defines `STRIPE_CONFIG`

Three competing sources of truth for the same config.

### M3. `experimental.serverActions: true` in next.config.js
In Next.js 14, server actions are stable. The `experimental` flag is unnecessary (harmless but noisy).

### M4. Duplicate ALLOWED_ORIGINS in middleware.ts
```ts
'https://cxoacademy.co',
'https://cxoacademy.co',  // duplicate
```

### M5. Many Markdown Planning Docs in Root
30+ `.md` files in the project root (SECURITY_AUDIT.md, BRANDING_UPDATE.md, etc.). These are internal planning docs that should be in a `docs/` folder or removed.

### M6. CSP Header Blocks Needed Resources
**File:** `next.config.js` CSP header:
```
connect-src 'self' https://api.openai.com https://*.supabase.co;
```
Missing: `https://api.telegram.org` (for alerts), `https://vercel.live` (for Vercel toolbar), any ElevenLabs URLs if voice is used.

### M7. No Error Boundary Around Course/Lesson Pages
While `courses/[id]/ErrorBoundary.tsx` exists, it's unclear if it's properly integrated. Most pages lack error boundaries.

### M8. Service Worker (`public/sw.js`) Needs Review
A basic service worker is registered. Ensure it doesn't cache API responses aggressively (stale course data, old news).

### M9. `supabaseAdmin` Singleton May Leak in Edge Runtime
The module-level `_supabaseAdmin` variable persists across requests in serverless. This is fine for standard Node runtime but could cause issues if Vercel switches to edge runtime for any routes.

### M10. No Image Domains Configured for Next.js Image Optimization
`next.config.js` only allows `localhost` for images. External images (Unsplash, etc.) won't be optimized and will generate warnings.

---

## 🟢 Low Priority (Backlog)

### L1. Old Brand Names in Non-UI Files
"AI Professor" appears in ~30 markdown docs and SQL files. Not user-facing, but confusing for future devs.

### L2. `public/icons/icon.svg.bak` — Backup File in Production
### L3. `lib/news/scraper.ts.bak` — Backup File
### L4. No `.env.example` file documenting required environment variables
### L5. `dist/` directory is committed (TypeScript build output)
### L6. No tests actually running (`jest` is configured but no test files exist)
### L7. Playwright test exists (`tests/e2e/critical.spec.ts`) but unclear if it passes
### L8. `package.json` has `next: 14.0.0` — several patch versions behind
### L9. Several `scripts/` reference models/topics not in current course catalog
### L10. Dashboard mock data references Unsplash images — should use own assets

---

## Architecture Recommendations

### 1. Auth Layer Overhaul
The current auth is a mix of NextAuth (for web sessions), Bearer tokens (for some APIs), and `x-user-email` headers (for notifications). Standardize on one pattern:
- **Web pages:** NextAuth session (server components)
- **API routes:** Bearer token from NextAuth session → verify with Supabase admin
- **Client-side API calls:** Use NextAuth's `getSession()` to get token, pass as Bearer

### 2. Database Client Strategy
Split Supabase usage into:
- **Admin client (service_role):** Only for admin routes, cron jobs, and operations where no user context exists
- **User client (anon + JWT):** For all user-scoped operations — lets RLS actually work

### 3. Payment Integration
Before enabling payments:
1. Set up Stripe account and get live keys
2. Implement proper checkout session creation (replace the stub in `app/api/stripe/checkout/route.ts`)
3. Implement webhook handler for `checkout.session.completed`
4. Add `purchased_courses` table or `purchases` table (separate from subscriptions)
5. Check enrollment eligibility based on purchases, not subscription tier

### 4. Content Management
Consider moving course content out of the database and into a headless CMS or markdown files. The current approach (DB-stored content with AI generation) works but makes content updates require database migrations.

### 5. Environment Configuration
Create a proper `.env.example` and documentation:
```
# Required
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
NEXTAUTH_SECRET=
OPENAI_API_KEY=

# OAuth (if enabled)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Optional
CRON_SECRET=
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

---

## Pre-Launch Checklist

| Item | Status | Priority |
|------|--------|----------|
| Remove hardcoded admin credentials | ❌ | 🔴 Critical |
| Rotate leaked secrets (Supabase, OpenAI) | ❌ | 🔴 Critical |
| Protect `/api/news/scrape` endpoint | ❌ | 🔴 Critical |
| Set up Vercel environment variables | ❌ | 🔴 Critical |
| Verify OAuth providers configured | ❌ | 🟠 High |
| Remove/protect analytics page | ❌ | 🔴 Critical |
| Remove `/test` page and `test.html` | ❌ | 🟡 Medium |
| Create `notifications` table | ❌ | 🟠 High |
| Fix `x-user-email` auth pattern | ❌ | 🟠 High |
| Verify payment flow works (or disable purchase CTAs) | ⚠️ | 🟠 High |
| Brand name cleanup in SQL files | ✅ (UI clean) | 🟢 Low |
| Pricing pages match strategy | ✅ | — |
| SEO metadata | ✅ | — |
| PWA manifest | ✅ | — |
| Sitemap & robots.txt | ✅ | — |
| Security headers | ✅ | — |
| News cron jobs configured | ✅ | — |

---

## Bottom Line

**The platform is architecturally sound and 80% ready.** The Supabase + Next.js + Vercel stack is well-configured, SEO is good, the news feature is solid, and the pricing pages correctly reflect your one-time purchase model. 

**But the 20% that's wrong is DANGEROUS.** Hardcoded credentials in client code and secrets in the repo are show-stoppers. Fix those 4-5 critical items, and you're good to soft-launch on April 13 with free course access while you build out the payment flow post-launch.

**Recommended launch plan:**
1. **Week 1 (now):** Fix C1-C5, H4, H6, H7 → Deploy
2. **Soft launch (Apr 13):** Free access, gather feedback
3. **Week 2-3:** Build payment flow (Stripe), clean up subscription dead code
4. **Full launch:** Enable purchases at $19.99/$49.99
