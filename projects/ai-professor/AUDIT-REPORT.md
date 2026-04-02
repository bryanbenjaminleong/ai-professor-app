# AI Professor - Comprehensive Audit Report

**Date:** 2026-04-01  
**Auditor:** STAR (subagent)  
**Status:** ⚠️ Could not run build or shell commands (exec approval required from Web UI/Terminal)

> **IMPORTANT:** This audit was performed via read-only file analysis. The build (`npx next build --no-lint`), TypeScript check (`npx tsc --noEmit`), and grep/find commands could NOT be executed due to Telegram subagent exec restrictions. To complete the audit, Bryan needs to either:
> 1. Re-run this audit from the Web UI or terminal where exec is available, OR
> 2. Run the build/fix commands manually based on the issues identified below.

---

## 1. Build & TypeScript

### Issues Found
- **Cannot verify** — `npx next build --no-lint` and `npx tsc --noEmit` could not be run.
- `next.config.js` sets `typescript.ignoreBuildErrors: false`, which is good — the build will catch TS errors.
- `tsconfig.json` has `noUnusedLocals: false` and `noUnusedParameters: false` — potential dead code won't be flagged.

### Action Required
```bash
cd /home/watson/.openclaw/workspace/projects/ai-professor
npx next build --no-lint 2>&1 | tee build-errors.log
npx tsc --noEmit 2>&1 | tee tsc-errors.log
```

---

## 2. Architecture Issues

### 2.1 next.config.js — Deprecated Options

| Issue | Severity | Status |
|-------|----------|--------|
| `experimental.serverActions: true` | Medium | **Deprecated in Next.js 14.0.0** — server actions are stable. Should be removed. |
| `experimental.serverComponentsExternalPackages` | Low | Valid but consider moving to `serverExternalPackages` (stable API in newer Next.js). |
| `webpack` config is a no-op passthrough | Low | Should be removed — adds unnecessary overhead. |
| `images.domains` only has `localhost` | Medium | Supabase storage images (`*.supabase.co`) are NOT listed. Cover images from Supabase storage bucket will fail with `next/image`. However, `CourseDetailClient.tsx` uses `<img>` tag (not `next/image`), so this may be fine for now. |
| `env` block manually re-exports `NEXT_PUBLIC_*` vars | Low | Unnecessary — Next.js auto-exposes `NEXT_PUBLIC_*` env vars to the browser. This block can be removed. |

### 2.2 Auth Pattern Inconsistency — CRITICAL

The app has **three different auth patterns** running simultaneously:

| Pattern | Used By | Works? |
|---------|---------|--------|
| **NextAuth (`getServerSession`)** | `lib/auth.ts` → `getCurrentSession()`, `getCurrentUser()` | ❌ **Broken** — auth is localStorage-based via Zustand, not cookie-based NextAuth sessions |
| **Bearer token (Supabase Auth)** | `lib/auth.ts` → `getApiUser()`, `requireAuth()` | ⚠️ Partially — requires client to send `Authorization: Bearer <token>` header. The auth store (`stores/auth-store.ts`) calls `/api/auth/login` which returns a session but the client **doesn't store or send the Supabase access token** for subsequent API calls |
| **localStorage (Zustand + persist)** | `stores/auth-store.ts` | ✅ Works on client side — persists `user` object to localStorage |
| **`x-admin-email` header** | N/A — not found in codebase | N/A |

**Key Problem:** The client-side auth store (`useAuthStore`) stores the user object in localStorage after `/api/auth/login`, but:
- It does NOT store the Supabase access token
- It does NOT send `Authorization: Bearer <token>` on subsequent API calls
- Server routes that call `requireAuth()` look for a Bearer token that the client never sends

**This means:** Any API route using `requireAuth()` (like `POST /api/courses`, `PUT /api/courses/[id]`, `DELETE /api/courses/[id]`) will always return 401 for authenticated users.

### 2.3 API Route Auth Summary

| Route | Auth Pattern | Issue |
|-------|-------------|-------|
| `GET /api/courses` | `requireAuth()` in try/catch (optional) | ⚠️ Falls back to showing only published courses — works |
| `POST /api/courses` | `requireAuth()` (required) | ❌ Will always 401 — client never sends Bearer token |
| `GET /api/courses/[id]` | `requireAuth()` (optional) | ⚠️ Works for published courses |
| `PUT /api/courses/[id]` | `requireAuth()` (required) | ❌ Will always 401 |
| `DELETE /api/courses/[id]` | `requireAuth()` (required) | ❌ Will always 401 |
| `GET /api/news` | None | ✅ Works |
| `GET /api/stats` | None | ✅ Works |
| `POST /api/auth/signup` | None | ✅ Works |
| `POST /api/auth/login` | None | ✅ Works |
| `POST /api/stripe/checkout` | None | Placeholder — returns error |
| `POST /api/auth/[...nextauth]` | NextAuth | ⚠️ Configured but client uses custom login endpoint instead |

### 2.4 NextAuth Configuration — Partially Dead

The `[...nextauth]/route.ts` file configures Google and GitHub OAuth providers but:
- The client-side auth store calls `/api/auth/login` (custom endpoint), not NextAuth's sign-in
- `SessionProvider` wraps the app in `providers.tsx` but is unused
- `authOptions` is imported in `lib/auth.ts` via `getCurrentSession()` which is dead code
- OAuth credentials (`GOOGLE_CLIENT_ID`, `GITHUB_CLIENT_ID`) would need to be configured but may never be used

---

## 3. Security

### 3.1 Hardcoded Secrets / API Keys
- **No hardcoded secrets found** in reviewed files ✅
- Email lib uses `'dummy-key-for-build'` as fallback for `RESEND_API_KEY` — safe for build but will fail silently at runtime

### 3.2 Admin Route Protection
- **No `/api/admin/` routes found** — the admin dashboard likely doesn't exist yet or is at a different path
- No admin-only middleware protection exists
- Any user can call `POST /api/courses` (if auth worked) — no admin role check

### 3.3 Middleware (`middleware.ts`)
- Only handles CORS for `/api/*` routes
- Does NOT protect any routes with auth checks
- CORS allows `vercel.live` script in CSP but not in allowed origins — potential issue
- CORS allowed origins include the production domains ✅

### 3.4 CSP Headers
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://vercel.live; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' https://api.openai.com https://*.supabase.co; frame-ancestors 'none';
```

**Issues:**
- `connect-src` includes `api.openai.com` — needed for AI features
- `connect-src` includes `*.supabase.co` — good for Supabase client
- `img-src` includes `https:` — allows any HTTPS image, including Supabase storage ✅
- `script-src` includes `'unsafe-eval' 'unsafe-inline'` — reduces security but needed for some Next.js features
- **Missing from `connect-src`:** `https://api.stripe.com` if Stripe is ever enabled
- **Missing:** `font-src` directive — Google Fonts may be blocked

### 3.5 SQL Injection Risk
- `db.courses.getAll()` uses `query.or(...)` with string interpolation for search: `title.ilike.%${filters.search}%` — this uses Supabase's query builder which parameterizes values, so it should be safe. But the search input is not sanitized in `getAll()` — the `sanitizeInput` function is only used in POST.

---

## 4. Data Flow Issues

### 4.1 Course Enrollment Verification
- **Client-side only** — `useAuthStore` checks `isAuthenticated` from localStorage
- Lesson pages likely check enrollment client-side (based on auth store)
- Server-side enrollment verification in `db.enrollments.checkEnrollment()` exists but requires `userId` which can't be obtained server-side without proper auth

### 4.2 Cron Endpoints
- **No cron API routes found** — cron functionality exists in `scripts/` but not as API routes
- Vercel cron would need `vercel.json` config (not reviewed)

### 4.3 Supabase Error Handling
- `lib/supabase.ts` has good error handling with `handleSupabaseError()` utility
- Most DB operations throw on error which is caught by route handlers
- `getCourses()` in `courses/page.tsx` catches errors and returns `[]` — good fallback
- `GET /api/stats` catches errors and returns fallback values — good

---

## 5. Frontend Issues

### 5.1 Missing Components / Imports

| Import | File | Status |
|--------|------|--------|
| `@/components/seo` (OrganizationJsonLd, WebSiteJsonLd) | `app/layout.tsx` | ❓ Could not verify — may be at `components/seo.tsx` or `components/seo/index.tsx` |
| `@/components/ui` (Button, Card, Badge, ToastContainer) | Multiple files | ❓ Barrel file location unknown — may be `components/ui/index.tsx` |
| `@/components/layout` (Header, Footer) | `app/providers.tsx` | ❓ Location unknown |
| `@/components/pwa/InstallPrompt` | `app/providers.tsx` | ❓ Location unknown |
| `@/hooks` (useTheme, useMediaQuery, etc.) | Various | ✅ `hooks/index.ts` exists with proper exports |
| `@/components/UpdatesSection` | `CourseDetailClient.tsx` | ✅ File exists |

### 5.2 Cover Images
- `courses/page.tsx` passes `image_url` to `CoursesClient` — need to verify `CoursesClient` renders it
- `CourseDetailClient.tsx` renders `course.image_url` as a banner using `<img>` tag (not `next/image`) — this avoids the image domains config issue but loses optimization

### 5.3 Pricing Page
- Looks complete and functional ✅
- Uses `formatCurrency` utility
- Links point to `/courses` and `/guides`

### 5.4 Navigation
- Header includes: `/guides`, `/breaking`, `/news`, `/courses`, `/pricing`
- Auth links: `/auth/login`, `/auth/signup`, `/dashboard`
- Footer includes: `/breaking`, `/news`, `/guides`, `/courses`
- All links appear valid based on file structure

### 5.5 `providers.tsx`
- Wraps with `SessionProvider` from `next-auth/react` — this adds overhead for an unused feature
- The SessionProvider will try to fetch `/api/auth/session` on mount (NextAuth's default behavior) which will add an unnecessary network request

---

## 6. Environment Variables

### Required ENV Vars

| Variable | Used In | Client/Server | Required |
|----------|---------|---------------|----------|
| `NEXT_PUBLIC_APP_URL` | `lib/email.ts`, `next.config.js` | Both | Yes |
| `NEXT_PUBLIC_SUPABASE_URL` | `lib/supabase.ts`, `next.config.js` | Both | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `lib/supabase.ts`, `next.config.js` | Both | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | `lib/supabase.ts`, `login/route.ts` | Server only | Yes |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `next.config.js` | Client | No (Stripe not active) |
| `RESEND_API_KEY` | `lib/email.ts` | Server | Yes (for email) |
| `NEXTAUTH_SECRET` | `auth/[...nextauth]/route.ts` | Server | Yes (if NextAuth used) |
| `GOOGLE_CLIENT_ID` | `auth/[...nextauth]/route.ts` | Server | Optional (OAuth) |
| `GOOGLE_CLIENT_SECRET` | `auth/[...nextauth]/route.ts` | Server | Optional (OAuth) |
| `GITHUB_CLIENT_ID` | `auth/[...nextauth]/route.ts` | Server | Optional (OAuth) |
| `GITHUB_CLIENT_SECRET` | `auth/[...nextauth]/route.ts` | Server | Optional (OAuth) |
| `EMAIL_FROM` | `lib/email.ts` | Server | Optional (has default) |
| `UPSTASH_REDIS_REST_URL` | `lib/rate-limit.ts` | Server | Optional (falls back to in-memory) |
| `UPSTASH_REDIS_REST_TOKEN` | `lib/rate-limit.ts` | Server | Optional (falls back to in-memory) |

---

## 7. Code Quality

### 7.1 console.log / console.error Statements
- Found in many files: `app/page.tsx`, `app/api/auth/login/route.ts`, `app/api/auth/signup/route.ts`, `app/api/stats/route.ts`, `app/api/news/route.ts`, `lib/auth.ts`, `stores/auth-store.ts`, `app/courses/page.tsx`, `components/UpdatesSection.tsx`, `lib/rate-limit.ts`
- Most are in catch blocks — acceptable for error logging
- `app/page.tsx` has `console.error('Failed to fetch stats:', err)` — minor, in a catch block
- `app/layout.tsx` has `console.log('SW registered:...')` in a service worker script — fine for debugging

### 7.2 TODO/FIXME/HACK Comments
- `lib/stripe.ts`: `// TODO: Enable Stripe when ready for production payments`
- `app/api/stripe/checkout/route.ts`: `// TODO: Integrate Stripe when ready for production`
- `lib/auth.ts`: `checkRateLimit` has a `_store` hack for in-memory fallback
- Various `@deprecated` type annotations in `types/index.ts`

### 7.3 Dead Code
- `lib/auth.ts`: `getCurrentSession()` and `getCurrentUser()` use NextAuth's `getServerSession` — dead code since auth is localStorage-based
- `app/providers.tsx`: `SessionProvider` wrapper — unnecessary overhead
- `lib/supabase.ts`: Legacy `supabase` and `supabaseAdmin` proxy objects — still referenced by `news/route.ts`
- `types/index.ts`: Many `@deprecated` type aliases
- `next.config.js`: No-op `webpack` config, unnecessary `env` block, empty `rewrites` block

---

## Issues Fixed

> ⚠️ No fixes were applied — exec was not available. All issues below require manual fixing or re-running the audit with exec permissions.

---

## Issues Needing Manual Attention

### CRITICAL (App won't work correctly)

1. **Auth token not sent from client to server** — The auth store doesn't store or send the Supabase access token. Fix:
   - Store the session/access token in the Zustand store (persist to localStorage)
   - Create an API client wrapper that attaches `Authorization: Bearer <token>` to requests
   - OR switch all server routes to a different auth verification method (e.g., verify via Supabase session cookie)

2. **Remove or fix NextAuth dependency** — Either:
   - Fully adopt NextAuth (remove custom login/signup, use NextAuth's `signIn`)
   - OR remove NextAuth entirely (remove `SessionProvider`, `[...nextauth]` route, `next-auth` dep)
   - Current hybrid state wastes resources and confuses the codebase

### HIGH (Should fix soon)

3. **Clean up `next.config.js`:**
   - Remove `experimental.serverActions: true`
   - Remove no-op `webpack` config
   - Remove unnecessary `env` block
   - Add Supabase storage domain to `images.domains` if using `next/image`
   - Add `font-src` to CSP for Google Fonts

4. **Stripe integration is a stub** — The checkout endpoint just returns an error. Either implement it or remove the endpoint and Stripe dependencies.

5. **No admin routes/protection** — If admin functionality is needed, create proper admin routes with role-based access control.

### MEDIUM (Good to fix)

6. **Remove `SessionProvider` from `providers.tsx`** — Adds unnecessary network request to `/api/auth/session`

7. **Clean up dead code** — `getCurrentSession()`, `getCurrentUser()`, NextAuth-related code

8. **Rate limiting** — Without Redis, rate limiting is in-memory per-serverless-function invocation, which means it's effectively disabled on Vercel (each invocation gets its own memory)

9. **Service Worker** — `sw.js` is referenced in `layout.tsx` but may not exist in `public/`

---

## Recommendations for Stability

1. **Run the build** — This is the most important next step. Run `npx next build --no-lint` and fix all errors.

2. **Fix the auth architecture** — Pick ONE auth strategy:
   - **Recommended:** Supabase Auth with cookies (use `@supabase/auth-helpers-nextjs` properly)
   - Remove NextAuth entirely
   - Store access tokens client-side and send them on API calls

3. **Add `images.remotePatterns`** — Replace deprecated `images.domains` with:
   ```js
   images: {
     remotePatterns: [
       { protocol: 'https', hostname: '*.supabase.co' },
     ],
   }
   ```

4. **Clean up `next.config.js`** — Remove deprecated experimental options, no-op webpack, unnecessary env block.

5. **Test the critical user flow:**
   - Sign up → Login → Browse courses → View course → Enroll → Access lesson
   - Currently this flow breaks at the "Enroll" step because auth tokens aren't sent

6. **Set up proper error monitoring** — Consider Sentry or similar for production error tracking.

7. **Add environment variable validation** — Create a `env.ts` that validates all required vars at startup and provides clear error messages.

---

## Summary

| Category | Critical | High | Medium | Low |
|----------|----------|------|--------|-----|
| Auth | 2 | - | - | - |
| Config | - | 1 | 1 | 2 |
| Security | - | 1 | 1 | - |
| Frontend | - | - | 2 | - |
| Code Quality | - | - | 2 | 1 |
| **Total** | **2** | **2** | **6** | **3** |

**Bottom line:** The app's core auth architecture is broken — the client and server don't agree on how auth works. Fix auth first, then clean up the config and dead code, then verify the build passes.
