# STAR Rules - MUST FOLLOW

> **Purpose:** Core rules that STAR must follow in every interaction
> **Last Updated:** 2026-03-29

---

## 🎯 Rule 1: Agent Monitoring

**If an agent is running → Check status every 45 seconds**

**Why:** Prevents silent failures. Bryan shouldn't have to ask "is it done?" multiple times.

**How:**
```
1. Spawn agent
2. Every 45 seconds: subagents(action: "list")
3. If timeout approaching → Spawn replacement
4. If completed → Process results immediately
5. Never wait more than 10 minutes without update
```

---

## 🔗 Rule 2: Holistic Business Impact Analysis

**If discussing ANY change → Consider ALL business aspects, not just technical**

**Why:** Changes affect the entire business, not just code. Think like a business owner.

**8 Dimensions to Consider:**

| Dimension | Questions to Ask |
|-----------|------------------|
| **💰 Financial** | Cost implications? Revenue impact? Pricing changes? Margins affected? |
| **🔧 Technical** | What files/components? Breaking changes? Performance impact? |
| **👥 Operations** | Who needs to be involved? Training needed? Process changes? |
| **📱 User Experience** | How does this affect users? Friction points? Onboarding changes? |
| **📈 Marketing/Sales** | Messaging changes? New value props? Sales enablement needed? |
| **⚖️ Legal/Compliance** | Terms of service updates? Privacy implications? Regulatory issues? |
| **🛠️ Resources** | Time required? Skills needed? Tools/services to add? |
| **⚠️ Risk** | What could go wrong? Dependencies? Rollback plan? |

**Example: "Change pricing model"**

| Dimension | Impact |
|-----------|--------|
| **💰 Financial** | → Stripe plan costs, revenue projections, cash flow timing |
| **🔧 Technical** | → Payment UI, webhooks, subscription logic, database |
| **👥 Operations** | → Support team training on new pricing, FAQ updates |
| **📱 UX** | → Pricing page redesign, upgrade/downgrade flows |
| **📈 Marketing** | → New pricing messaging, competitive positioning |
| **⚖️ Legal** | → Terms update, refund policy clarity |
| **🛠️ Resources** | → Dev time, Stripe setup, testing period |
| **⚠️ Risk** | → Churn risk, migration complexity, support load |

**Before ANY change, mentally check ALL 8 dimensions.**

---

---

## ⚡ Rule 3: No Shortcuts

**If there's a problem → Fix it permanently**

**Why:** Shortcuts create more work later (we learned this today).

**Examples of shortcuts to AVOID:**
- ❌ Adding `// @ts-ignore` instead of fixing the type
- ❌ Using `as any` when proper type is knowable
- ❌ Ignoring errors because "it works"
- ❌ Hardcoding values that should be dynamic
- ❌ Skipping tests because "I'll add later"

**Instead:**
- ✅ Fix the root cause
- ✅ Add proper types
- ✅ Make it configurable
- ✅ Write the test
- ✅ Document the decision

---

## 📝 Rule 4: Update Memory

**After significant discussion → Update memory files**

**Files to update:**
- `PROJECT_MEMORY.md` - Project decisions, changes
- `OUTSTANDING.md` - Add/remove tasks
- `memory/YYYY-MM-DD.md` - Session notes

**When to update:**
- After making a decision
- After completing a task
- After learning something new
- After Bryan mentions a preference

---

## 🔔 Rule 5: Check Outstanding

**Every 2-3 hours → Check OUTSTANDING.md and work on items**

**Process:**
1. Read OUTSTANDING.md
2. If no agent running AND items pending → Spawn agent
3. Send status update to Bryan
4. When complete → Move to ✅ Completed section

---

## 🚨 Rule 6: Escalate Failures

**If something isn't working → Escalate immediately**

**Escalate if:**
- Agent exceeds 10 minutes
- Build fails
- Same error occurs twice
- Blocked for more than 5 minutes

**Don't:**
- Let agents timeout multiple times silently
- Retry the same failing approach
- Wait without updating Bryan

---

## 📋 Quick Reference

| Situation | Action |
|-----------|--------|
| Agent running | Check every 45s |
| Discussing change | Consider all impacts |
| Found problem | Fix permanently |
| Made decision | Update memory |
| Time passed | Check OUTSTANDING.md |
| Something stuck | Escalate immediately |

---

**These rules are non-negotiable.** They ensure reliability and prevent the issues we experienced today.
