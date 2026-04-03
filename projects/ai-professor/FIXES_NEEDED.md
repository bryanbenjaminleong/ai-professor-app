# CXO Academy Audit — Fixes Report
**Date:** 2026-04-03  
**Auditor:** STAR (QA subagent)

## Issues Found & Fixed (P0/P1)

### Pricing (P0 — User-Visible)

| # | File | Line | Was | Fixed To |
|---|------|------|-----|----------|
| 1 | `lib/stripe.ts` | 5-7 | `$14.99` (1499 cents) | `$19.99` (1999 cents) |
| 2 | `lib/stripe-config.ts` | 4,12 | `$14.99` (1499 cents) | `$19.99` (1999 cents) |
| 3 | `components/seo/CourseJsonLd.tsx` | 34 | `price = 14.99` | `price = 19.99` |
| 4 | `app/courses/CoursesClient.tsx` | 112 | `$14.99` | `$19.99` |
| 5 | `app/courses/[id]/CourseDetailClient.tsx` | 99 | `$14.99` | `$19.99` |

### Stats (P0 — User-Visible)

| # | File | Line | Was | Fixed To |
|---|------|------|-----|----------|
| 6 | `app/page.tsx` | ~113 | `226+` lessons | `236+` lessons |

### Old Branding (P0 — User-Visible)

| # | File | Line | Was | Fixed To |
|---|------|------|-----|----------|
| 7 | `public/sw.js` | 3 | `CACHE_NAME = 'ai-professor-v1'` | `CACHE_NAME = 'cxo-academy-v1'` |
| 8 | `public/sw.js` | 139 | `'AI Professor'` (notification) | `'CXO Academy'` |
| 9 | `app/terms/page.tsx` | 65 | `AI PROFESSOR SHALL NOT BE LIABLE` | `CXO ACADEMY SHALL NOT BE LIABLE` |

### Old Domains (P0/P1)

| # | File | Line | Was | Fixed To |
|---|------|------|-----|----------|
| 10 | `app/layout.tsx` | 52 | `https://ai-professor-app.vercel.app` (OG URL) | `https://cxoacademy.co` |
| 11 | `playwright.config.ts` | 12 | `https://ai-professor-red.vercel.app` | `https://cxoacademy.co` |
| 12 | `middleware.ts` | 5-6 | Both old vercel.app URLs | `https://cxoacademy.co` |
| 13 | `app/api/webhooks/supabase/route.ts` | 8 (comment) | `https://ai-professor-red.vercel.app/...` | `https://cxoacademy.co/...` |

### Old Bot User-Agent (P2 — Comments/Internal)

| # | File | Was | Fixed To |
|---|------|-----|----------|
| 14 | `scripts/scrape-ai-tools.ts` (×2) | `AI-Professor-Bot/1.0` | `CXO-Academy-Bot/1.0` |
| 15 | `lib/news/scraper-simple.ts` (×2) | `AI-Professor-Bot/1.0` | `CXO-Academy-Bot/1.0` |

### Code Bug (P1)

| # | File | Was | Fixed To |
|---|------|-----|----------|
| 16 | `components/layout/Header.tsx` | Duplicate `import Image from 'next/image'` | Removed duplicate import |

### Cron Comment (P2)

| # | File | Was | Fixed To |
|---|------|-----|----------|
| 17 | `scripts/voice-cron.ts` | `/path/to/ai-professor` | `/path/to/cxo-academy` |

---

## Second Sweep — Confirmed Clean ✅

After all fixes, re-grepped for:
- `$14.99` / `1499` → **0 results**
- `AI Professor` / `AI PROFESSOR` → **0 results**
- `ai-professor-red` / `ai-professor-app` → **0 results**
- `226+` → **0 results**
- `ai-professor` (any case, excluding animate-pulse CSS) → **0 results**

---

## Items That Are CORRECT (No Changes Needed)

- ✅ `app/layout.tsx` — metadata title, description, OG tags all say "CXO Academy"
- ✅ `public/manifest.json` — name, short_name, description all correct
- ✅ `components/layout/Footer.tsx` — branding, social links, email all correct
- ✅ `components/layout/Header.tsx` — logo, nav links correct
- ✅ `app/about/page.tsx` — mentions 7 programs, correct branding
- ✅ `app/contact/page.tsx` — email, branding correct
- ✅ `app/pricing/PricingClient.tsx` — $19.99/$49.99, no subs, correct
- ✅ `app/news/NewsClient.tsx` — "19 sources", correct branding
- ✅ `package.json` — name: "cxo-academy", author: "CXO Academy"
- ✅ `components/seo/OrganizationJsonLd.tsx` — correct URL, name, social
- ✅ `components/pwa/InstallPrompt.tsx` — "C" icon, "CXO Academy" branding
- ✅ Social links — twitter.com/cxoacademy, linkedin.com/company/cxo-academy
- ✅ Email — support@cxoacademy.co throughout
- ✅ No references to "Sahakom" found
- ✅ `tests/e2e/critical.spec.ts` — already uses cxoacademy.co

---

## P2 Items for Bryan to Decide

These are in content describing OTHER products (not CXO Academy pricing):
1. `app/guides/[id]/GuideContent.tsx:1849` — `$99` (comparing competitor pricing)
2. `app/guides/[id]/GuideContent.tsx:7620` — `$99/mo` (ElevenLabs pricing)
3. `app/guides/[id]/GuideContent.tsx:9329` — `$29/user/mo` (some SaaS pricing)

These are factual descriptions of other products' pricing — **no change needed unless you want to verify accuracy of those third-party prices.**
