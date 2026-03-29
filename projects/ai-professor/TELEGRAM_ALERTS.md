# Telegram Alerts Setup Guide

## Step 1: Create Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Send `/newbot`
3. Give it a name (e.g., "AI Professor Alerts")
4. Give it a username (e.g., "aiprof_alerts_bot")
5. **Copy the API token** (looks like `123456789:ABCdefGHIjklMNOpqrsTUVwxyz`)

## Step 2: Get Your Chat ID

1. Start a chat with your new bot
2. Send any message to it
3. Go to: `https://api.telegram.org/bot<YOUR_BOT_TOKEN>/getUpdates`
4. Look for `"chat":{"id":123456789}`
5. **Copy the chat ID**

## Step 3: Configure Environment Variables

Add these to **Vercel** (not local):

1. Go to: **https://vercel.com/dashboard**
2. Select **ai-professor** project
3. Click **Settings** → **Environment Variables**
4. Add:

| Variable | Value |
|----------|-------|
| `TELEGRAM_BOT_TOKEN` | `123456789:ABCdef...` (from Step 1) |
| `TELEGRAM_CHAT_ID` | `123456789` (from Step 2) |
| `ALERT_SECRET` | Generate with: `openssl rand -hex 32` |

5. Click **Save**

## Step 4: Redeploy

1. Go to **Deployments**
2. Click **...** on latest deployment
3. Select **Redeploy**

## Step 5: Test the Alert

Run this in your terminal:

```bash
curl -X GET https://ai-professor-red.vercel.app/api/alerts \
  -H "Authorization: Bearer YOUR_ALERT_SECRET"
```

You should receive a test message in Telegram!

---

## Using Alerts in Your Code

Send alerts from anywhere in your codebase:

```typescript
// Example: Alert on failed login
await fetch('/api/alerts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.ALERT_SECRET}`
  },
  body: JSON.stringify({
    type: 'auth_failure',
    severity: 'high',
    message: 'Multiple failed login attempts detected',
    details: {
      ip: '192.168.1.1',
      attempts: 5,
      email: 'user@example.com'
    }
  })
})
```

---

## Alert Types

| Type | Emoji | Use Case |
|------|-------|----------|
| `auth_failure` | 🔐 | Failed logins, brute force |
| `api_error` | 💥 | Server errors, crashes |
| `service_role` | 🔑 | Service role key usage |
| `high_volume` | 📈 | Traffic spikes |
| `custom` | 📢 | Custom alerts |

---

## Severity Levels

| Severity | Emoji | When to Use |
|----------|-------|-------------|
| `low` | ℹ️ | Info, test alerts |
| `medium` | ⚠️ | Warnings, unusual activity |
| `high` | 🚨 | Errors, security concerns |
| `critical` | 🔴 | Urgent, immediate action needed |

---

## Setting Up Supabase Webhooks (Optional)

To auto-alert on database changes:

1. Go to: **Supabase Dashboard** → **Database** → **Webhooks**
2. Click **Create Webhook**
3. Configure:
   - **Name:** `Telegram Alerts`
   - **URL:** `https://ai-professor-red.vercel.app/api/webhooks/supabase`
   - **Secret:** Same as `ALERT_SECRET`
   - **Tables:** Select sensitive tables (users, subscriptions, etc.)
   - **Events:** INSERT, UPDATE, DELETE

Now any database change on those tables will send you a Telegram alert!
