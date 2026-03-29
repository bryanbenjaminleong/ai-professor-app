# Outstanding Tasks - AI Professor

> **Purpose:** Track all incomplete tasks. Remove items ONLY when fully done.
> **Last Updated:** 2026-03-29 09:52 UTC

---

## 🔴 Critical (Must Do Now)

### 1. Fix TypeScript Errors (288 remaining)
**Status:** 🔄 Agent Running
**Agent:** `typescript-fix-continue`
**Started:** 2026-03-29 09:51 UTC
**Details:** Reduce from 288 errors to 0, then remove `ignoreBuildErrors: true`

---

## 🟠 High Priority (This Week)

### 2. Run Database Cleanup Script
**Status:** ⏳ Pending (Script created, not run)
**File:** `scripts/cleanup-users.ts`
**Instructions:**
```bash
cd /home/watson/.openclaw/workspace/projects/ai-professor
npx ts-node scripts/cleanup-users.ts --dry-run  # Test first
npx ts-node scripts/cleanup-users.ts            # Actually run
```
**What it does:** Removes all users except `bryanbleong@gmail.com`

### 3. Remove `ignoreBuildErrors: true`
**Status:** ⏳ Blocked (waiting for TypeScript errors = 0)
**File:** `next.config.js`
**Change:**
```javascript
// FROM:
typescript: { ignoreBuildErrors: true }
// TO:
typescript: { ignoreBuildErrors: false }
```

### 4. Fix Remaining TypeScript Errors
**Status:** ⏳ Blocked (waiting for agent)
**Current Count:** 288
**Target:** 0
**Categories:**
- Database types returning `never`
- NextAuth session types
- Null vs undefined mismatches

---

## 🟡 Medium Priority (This Month)

### 5. Implement Stripe Payments
**Status:** ❌ Not Started
**Files Needed:**
- Update `/api/webhooks/stripe/route.ts` (currently placeholder)
- Create subscription flow
- Connect to enrollment system
**Impact:** Revenue generation

### 6. Add Missing Course Content
**Status:** ❌ Not Started
**Courses needing content:**
- All 5 courses have placeholder lessons
- Need real lesson content in database
**Impact:** User experience, course value

### 7. Move Guides to Database
**Status:** ❌ Not Started
**Current:** Guides hardcoded in `app/guides/[id]/GuideContent.tsx`
**Goal:** CMS-style management via database
**Impact:** Easier content updates

---

## 🟢 Low Priority (Backlog)

### 8. Add Upstash Redis for Rate Limiting
**Status:** ❌ Not Started
**Current:** In-memory rate limiting (doesn't work in serverless)
**Solution:** Use Upstash Redis
**Impact:** Better security

### 9. Add Video Content to Courses
**Status:** ❌ Not Started
**Impact:** Course value, engagement

### 10. Mobile App (PWA or Native)
**Status:** ❌ Not Started
**Impact:** User reach

---

## ✅ Completed Tasks (Moved Here When Done)

### Completed 2026-03-29
- ✅ Fix course page crash (avgRating undefined)
- ✅ Protect paid content (enrollment checks)
- ✅ Create admin dashboard
- ✅ Create database cleanup script
- ✅ Create admin guide
- ✅ Set up Telegram alerts
- ✅ Rotate OpenAI API key
- ✅ Add GitHub secrets
- ✅ Expand Gemini, Grok, Kimi guides
- ✅ Add E2E tests for courses
- ✅ Reduce TypeScript errors from 329 → 288

### Completed 2026-03-28
- ✅ Security audit and fixes
- ✅ Code quality audit and fixes
- ✅ Content management audit and fixes
- ✅ Set up hourly news scraping
- ✅ Create PROJECT_MEMORY.md
- ✅ Fix RLS on 5 exposed tables

---

## 📋 How to Use This File

### For STAR (Me)
1. **Read at start of every session** - Know what's pending
2. **Update when tasks are added** - Don't lose track
3. **Move to ✅ Completed** when fully done
4. **Never delete items** - Move to completed section

### For Bryan
1. **Check to see what's pending**
2. **Add new tasks** by telling me
3. **Prioritize** by telling me what's urgent
4. **Track progress** over time

---

## 🔔 Reminder System

Outstanding items are tracked in:
- This file: `OUTSTANDING.md`
- Reminder state: `memory/reminders-state.json`
- Project memory: `PROJECT_MEMORY.md`

I will:
- Check this file at session start
- Update status as work progresses
- Move items to ✅ only when fully complete
- Prompt you when deviating from priorities

---

## 📊 Summary

| Priority | Count | Items |
|----------|-------|-------|
| 🔴 Critical | 1 | TypeScript errors |
| 🟠 High | 3 | Cleanup script, Remove ignoreBuildErrors, Fix remaining TS |
| 🟡 Medium | 3 | Stripe, Course content, Guides to DB |
| 🟢 Low | 3 | Redis, Video, Mobile |
| ✅ Done | 16 | (see completed section) |

**Total Outstanding:** 10 tasks
**Total Completed:** 16 tasks

---

_Last Updated: 2026-03-29 09:52 UTC by STAR_
