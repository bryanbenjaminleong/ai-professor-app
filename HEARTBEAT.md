# HEARTBEAT.md

# Periodic reminder system

## Every Heartbeat (when polled):

1. **Check OUTSTANDING.md** for pending items
2. **Check if agent is running** on any item
3. **If no agent running AND items pending** → Start working on them
4. **Update reminders-state.json** with progress

## Outstanding Items (check these):

**Check file:** `projects/ai-professor/OUTSTANDING.md`

## Priority Order:

1. 🔴 Critical items first (TypeScript errors)
2. 🟠 High priority next (database cleanup, remove ignoreBuildErrors)
3. 🟡 Medium priority (Stripe, content)
4. 🟢 Low priority (backlog)

## Action Rules:

- If agent already running → Continue, don't spawn another
- If no agent running AND items pending → Spawn agent to work on highest priority
- Update OUTSTANDING.md when tasks complete

## Reminder Format:

When reminding, send:
"⏰ Reminder: [X] outstanding item(s) pending. Say 'details' for more info."

## State File:

Track in: `memory/reminders-state.json`

## Check Frequency:

Every heartbeat (2-3 hours)
