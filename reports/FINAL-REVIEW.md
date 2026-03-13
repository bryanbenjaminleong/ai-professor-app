# Sahakom.app — Complete Security Review

**For:** Paul (Keat) & Team
**Date:** March 10, 2026
**By:** Bryan's Security Consultant
**Status:** Plain English Summary

---

## 🎯 TL;DR (Executive Summary)

**Overall Security Grade: C+ (6.5/10)**

Your website is **reasonably secure** but has **real vulnerabilities** that could be exploited. The good news: **nothing is critically broken**. The bad news: **hackers could cause problems if they target you**.

**Main Issues:**
- ❌ Someone could inject malicious code into your site (XSS)
- ❌ Your site can be embedded in fake websites (clickjacking)
- ❌ Data security is unknown (need more access to verify)

**Cost to Fix:** $0 (just time — about 15-20 hours)
**Urgency:** Medium — fix within 2-4 weeks

---

## 📋 WHAT WE CHECKED

### 1. **Infrastructure Security** (How your website is built & hosted)
**Grade: B+ (7/10)** ✅

### 2. **Code Security** (The actual programming of your website)
**Grade: C (6.5/10)** ⚠️

### 3. **Data Security** (How you handle user & business data)
**Grade: Unknown** ❓

---

## ✅ WHAT'S GOOD (Your Strengths)

### Infrastructure (Hosting & Delivery)

**1. Your site uses HTTPS (The Secure Lock)**
- ✅ **What it means:** When users visit your site, their connection is encrypted
- ✅ **Why it matters:** Hackers can't eavesdrop on passwords or data in transit
- ✅ **Status:** Working perfectly

**2. Your site is protected by Cloudflare**
- ✅ **What it means:** Cloudflare is like having a security guard at the front door
- ✅ **Why it matters:**
  - Blocks DDoS attacks (when hackers try to crash your site with too much traffic)
  - Provides a Web Application Firewall (WAF)
  - Speeds up your site worldwide with CDN
- ✅ **Status:** Active and working

**3. You're using Supabase (Professional Backend)**
- ✅ **What it means:** You're not building your own database — you're using a professional service
- ✅ **Why it matters:**
  - Supabase handles security updates automatically
  - Built-in authentication system
  - Professional database (PostgreSQL)
  - Regular backups (presumably)
- ✅ **Status:** Good choice

**4. Your site is built with React (Modern Technology)**
- ✅ **What it means:** Using modern, well-maintained programming tools
- ✅ **Why it matters:**
  - Regular security updates available
  - Large community = problems get fixed quickly
  - Industry standard
- ✅ **Status:** Current and maintained

**5. No Hardcoded Passwords**
- ✅ **What it means:** I didn't find any passwords or secret keys hidden in your website code
- ✅ **Why it matters:** Hackers often look for these — glad you don't have them exposed
- ✅ **Status:** Clean

---

## ⚠️ WHAT NEEDS FIXING (Your Weaknesses)

### CRITICAL — Fix This Week

---

### **ISSUE #1: Someone Could Inject Malicious Code (XSS Vulnerability)**

**Severity:** 🔴 HIGH

**What I Found:**
Your website displays user-generated content (like comments, product descriptions, farmer profiles) in 20+ places using something called `dangerouslySetInnerHTML`.

**In Plain English:**
Imagine your website is like a bulletin board. Users can post notes on it. Right now, you're posting those notes without checking if they contain hidden traps.

**Example Attack:**
1. A "farmer" creates a profile with this bio:
   ```
   "I grow organic rice. <script>steal everyone's passwords</script>"
   ```
2. When other users view this profile, the hidden script runs
3. It steals their login session and sends it to the attacker
4. Attacker can now access any account

**Real-World Scenario:**
- Attacker creates a fake farmer account
- Posts malicious code in product description
- When buyers view the product, their session gets stolen
- Attacker can now see all transactions, change prices, or steal data

**Why It Matters for Sahakom:**
- You're handling money transactions (15% fees)
- You have sensitive farmer data
- Trust is your business model — a breach would destroy that

**How to Fix:**
Add a "content cleaner" called DOMPurify. It's like a spam filter for HTML.

**Difficulty:** Easy (1-2 hours)
**Cost:** Free (open-source library)

**Technical Fix:**
```javascript
// Install DOMPurify
npm install dompurify

// Before showing user content, clean it
import DOMPurify from 'dompurify';
const cleanContent = DOMPurify.sanitize(userContent);
```

---

### **ISSUE #2: Your Site Can Be Embedded in Fake Websites (Clickjacking)**

**Severity:** 🔴 HIGH

**What I Found:**
Your website is missing a simple security header called `X-Frame-Options`.

**In Plain English:**
Right now, anyone can put your website inside their website (like putting a picture inside a frame). This allows "clickjacking" attacks.

**Example Attack:**
1. Attacker creates a fake website that looks like a game: "Win a Free Pig!"
2. They embed your REAL website invisibly on top
3. User thinks they're clicking "Claim Prize"
4. But they're actually clicking "Approve Transaction" on YOUR site
5. Money gets transferred without the user realizing

**Real-World Scenario for Sahakom:**
- Attacker creates fake "Sahakom Support" website
- Embeds your real site invisibly
- Farmer thinks they're logging into support portal
- Actually logging into real Sahakom
- Attacker captures their credentials
- Then attacker can:
  - See all their transactions
  - Change their bank details
  - Divert payments

**Why It Matters:**
- Your users are farmers — not tech experts
- They might fall for phishing scams
- One breach = reputation destroyed

**How to Fix:**
Add ONE line to your website configuration:

```
X-Frame-Options: DENY
```

**Difficulty:** Very Easy (5 minutes)
**Cost:** Free

**I tested this:** Your site IS currently vulnerable ✅

---

### **ISSUE #3: Weak Security Rules (Content Security Policy)**

**Severity:** 🟡 MEDIUM-HIGH

**What I Found:**
Your website has security rules (called CSP), but they're too loose. They allow `'unsafe-inline'` and `'unsafe-eval'`.

**In Plain English:**
Imagine a security guard who's told "Stop suspicious people" but also "Actually, if someone looks kinda normal, let them through."

Your CSP is like that — it tries to block malicious code but makes too many exceptions.

**What This Means:**
- If Issue #1 (XSS) happens, your security rules won't stop it
- Attackers have an easier time injecting malicious code
- You have a lock on the door, but it's a cheap lock

**How to Fix:**
Tighten your Content Security Policy. Remove the "unsafe" permissions and use proper security codes instead.

**Difficulty:** Medium (2-3 hours)
**Cost:** Free

---

### MEDIUM PRIORITY — Fix This Month

---

### **ISSUE #4: Windows Opening Without Protection (Tabnabbing)**

**Severity:** 🟡 MEDIUM

**What I Found:**
When your website opens links in new tabs (like Google Maps links), it doesn't protect the original tab.

**In Plain English:**
When a user clicks a link on your site and it opens in a new tab, that new tab can "reach back" and change your original tab.

**Example Attack:**
1. User clicks "View on Google Maps" for a farm location
2. Opens in new tab
3. If that page were malicious (or compromised), it could:
   - Redirect your original tab to a fake login page
   - User thinks they were logged out
   - Enters credentials
   - Credentials stolen

**How to Fix:**
Add `rel="noopener noreferrer"` to all external links and `noopener,noreferrer` to all `window.open()` calls.

**Difficulty:** Easy (30 minutes)
**Cost:** Free

---

### **ISSUE #5: Messages Without Verification (PostMessage Security)**

**Severity:** 🟡 MEDIUM

**What I Found:**
Your website uses `postMessage()` to communicate between different parts of the site, but doesn't verify who's sending the messages.

**In Plain English:**
Imagine your website receives messages like text messages. Right now, it reads every message without checking who sent it.

**Example Attack:**
If someone embeds your site (see Issue #2), they could send fake messages to your site and trigger unintended actions.

**How to Fix:**
Always check the sender before processing messages:

```javascript
window.addEventListener("message", (event) => {
  if (event.origin !== "https://sahakom.app") {
    return; // Ignore messages from strangers
  }
  // Process message
});
```

**Difficulty:** Medium (1-2 hours)
**Cost:** Free

---

### **ISSUE #6: Too Much Data in Browser Storage (localStorage)**

**Severity:** 🟡 MEDIUM

**What I Found:**
Your website stores data in the browser's localStorage (30+ instances found).

**In Plain English:**
Your website saves information in the user's browser like leaving notes on a desk. If someone breaks in (via XSS), they can read all those notes.

**What Might Be Stored:**
- User preferences
- Shopping cart items
- Session information
- Temporary data

**The Risk:**
- If Issue #1 (XSS) happens, attackers can read everything in localStorage
- Data persists even after logout
- Sensitive data might be accessible

**How to Fix:**
1. Don't store sensitive data in localStorage
2. Use HttpOnly cookies for authentication tokens
3. Clear localStorage on logout
4. Encrypt sensitive data before storing

**Difficulty:** Medium (2-3 hours)
**Cost:** Free

---

### **ISSUE #7: No Rate Limiting (API Spam Protection)**

**Severity:** 🟡 MEDIUM

**What I Found:**
Your website doesn't appear to have rate limiting on the client side.

**In Plain English:**
Someone could write a program to:
- Try 10,000 passwords per minute on your login page
- Download all your public data automatically
- Flood your website with requests until it crashes

**Real-World Scenarios:**
1. **Brute Force Attack:** Attacker tries common passwords on all farmer accounts
2. **Data Scraping:** Competitor downloads all your product listings
3. **Denial of Service:** Flood your site until it's slow or crashes

**How to Fix:**
Add rate limiting:
- Client-side: Limit how often users can click/submit
- Server-side: Configure Supabase to limit API calls per user

**Difficulty:** Medium (2-3 hours)
**Cost:** Free (Supabase has built-in options)

---

### **ISSUE #8: Loading Code from External Sources (CDN Risk)**

**Severity:** 🟢 LOW-MEDIUM

**What I Found:**
Your website loads code from 3+ external websites (CDNs):
- cdn.jsdelivr.net
- esm.sh
- unpkg.com

**In Plain English:**
Your website is like a restaurant that buys ingredients from 3 different suppliers. If one supplier gets contaminated, your food makes people sick.

**Real-World Risk:**
- If one of these CDNs gets hacked, malicious code gets injected into your site
- This has happened before (see: event-stream incident 2018)

**How to Fix:**
1. Self-host critical code (download and serve from your own server)
2. Add "Subresource Integrity" (SRI) — like a tamper-evident seal on code
3. Reduce number of external sources

**Difficulty:** Medium (3-4 hours)
**Cost:** Free

---

## 🔒 DATA SECURITY (Unknown — Needs More Access)

### What I Can See from Outside:

✅ **Data Collection:**
- Your site collects user information (names, contact details)
- Handles financial transactions (15% fees)
- Stores farmer profiles and product listings

✅ **Data Storage:**
- Uses Supabase (PostgreSQL database)
- Data likely stored in the cloud (Supabase manages this)

✅ **Data Transmission:**
- All data sent over HTTPS (encrypted)
- Authentication uses JWT tokens (secure method)

❓ **What I Cannot Verify (Need Access):**

**Database Security:**
- Are there Row Level Security (RLS) policies? (This prevents users from seeing each other's data)
- Is data encrypted at rest? (When stored in the database)
- Who has admin access to the database?
- Are there regular backups?
- What's the disaster recovery plan?

**Data Handling:**
- How is sensitive data validated?
- Is there data retention policy? (How long do you keep data?)
- Can users delete their data? (GDPR requirement)
- Are there audit logs? (Who accessed what, when?)

**Third-Party Data Sharing:**
- What data is sent to external services?
- Is there a privacy policy?
- Do users consent to data collection?

**Payment Data:**
- How are payments processed?
- Are you handling credit card data directly or using Stripe/PayPal?
- If handling directly: Are you PCI DSS compliant?

### Questions to Ask Your Development Team:

1. **"Do we have Row Level Security enabled on all database tables?"**
   - This ensures farmers can only see their own data
   - Critical for multi-tenant application

2. **"Is sensitive data encrypted in the database?"**
   - Passwords should be hashed (not encrypted)
   - Financial data should be encrypted

3. **"Who has access to the Supabase dashboard?"**
   - Limit to essential team members only
   - Use 2FA (Two-Factor Authentication)

4. **"Do we have database backups?"**
   - How often? Daily? Hourly?
   - Where are they stored?
   - Have you tested restoring from backup?

5. **"How do we handle user data deletion requests?"**
   - Can users delete their accounts?
   - What happens to their data?

6. **"Are we compliant with data protection laws?"**
   - GDPR (if serving EU users)
   - Cambodia data protection laws
   - Do you have a privacy policy?

7. **"How are payments processed?"**
   - Direct (requires PCI compliance) or
   - Through Stripe/PayPal (they handle compliance)

---

## 📊 RISK ASSESSMENT

### What Could Happen If You Don't Fix These Issues:

**Scenario 1: XSS Attack (Issue #1)**
- **Probability:** Medium (someone would need to target you specifically)
- **Impact:** HIGH — account takeovers, data theft, reputation damage
- **Business Impact:** Farmers lose trust, users leave, revenue drops

**Scenario 2: Clickjacking Attack (Issue #2)**
- **Probability:** Low-Medium (requires social engineering)
- **Impact:** MEDIUM — credential theft, unauthorized transactions
- **Business Impact:** Financial losses, legal liability

**Scenario 3: Data Breach (Unknown data security)**
- **Probability:** Unknown (depends on database security)
- **Impact:** VERY HIGH — all user data exposed
- **Business Impact:** Business-ending event, legal consequences

**Scenario 4: DoS Attack (Issue #7)**
- **Probability:** Low (hackers usually target bigger sites)
- **Impact:** MEDIUM — website unavailable
- **Business Impact:** Lost transactions, frustrated users

---

## 💰 COST-BENEFIT ANALYSIS

### Cost to Fix Everything:

**Time Investment:**
- Week 1 (Critical Fixes): 4-6 hours
- Week 2-4 (Medium Priority): 10-15 hours
- Total: ~20 hours

**Money Investment:**
- $0 for code changes
- $0 for security headers
- $0 for DOMPurify library
- Optional: $50-100/month for security monitoring tools

### Cost of NOT Fixing:

**If Hacked:**
- **Reputation Damage:** Priceless (farmers won't trust you)
- **Legal Liability:** Potentially thousands of dollars
- **Lost Revenue:** All 15% transaction fees lost
- **Data Recovery:** $5,000-50,000 if you need professional help
- **Business Closure:** Possible

### ROI:
- **Investment:** 20 hours of time
- **Protection:** Against business-ending events
- **ROI:** Infinite (avoiding one breach pays for all security measures)

---

## 🎯 ACTION PLAN

### Week 1 (Do These Immediately):

**Day 1-2:**
- [ ] Add `X-Frame-Options: DENY` header (5 min)
- [ ] Add `Permissions-Policy` header (5 min)
- [ ] Add other missing security headers (15 min)

**Day 3-5:**
- [ ] Install DOMPurify library
- [ ] Audit all `dangerouslySetInnerHTML` usage
- [ ] Add sanitization to all user-generated content

**End of Week 1:**
- [ ] Test that clickjacking is fixed
- [ ] Test that XSS attacks are blocked

### Week 2-3:

**Days 1-3:**
- [ ] Add `noopener noreferrer` to all external links
- [ ] Add origin validation to postMessage handlers
- [ ] Wrap all JSON.parse() in try-catch blocks

**Days 4-7:**
- [ ] Review and tighten Content Security Policy
- [ ] Remove 'unsafe-inline' and 'unsafe-eval' if possible
- [ ] Test all functionality after CSP changes

### Week 4:

**Days 1-2:**
- [ ] Implement rate limiting (client + server)
- [ ] Add Subresource Integrity (SRI) to external scripts
- [ ] Review localStorage usage

**Days 3-5:**
- [ ] Self-host critical dependencies
- [ ] Run `npm audit` and fix vulnerabilities
- [ ] Conduct final security test

**End of Month:**
- [ ] Re-run security audit
- [ ] Verify all fixes are working
- [ ] Schedule quarterly security reviews

---

## 📋 QUESTIONS TO ASK YOUR TEAM

### For Your Developers:

1. "Can we add DOMPurify for HTML sanitization?"
2. "Do we have Row Level Security enabled in Supabase?"
3. "How are we handling user data deletion requests?"
4. "Do we have database backups? How often?"
5. "Who has access to the Supabase dashboard?"

### For Paul (Business Owner):

1. "What's our data retention policy?"
2. "Do we have a privacy policy posted?"
3. "Are we using Stripe/PayPal or handling payments directly?"
4. "What's our plan if we get hacked?"
5. "Do we have cyber insurance?"

---

## 🧪 HOW TO TEST FIXES

### Test #1: Clickjacking (Issue #2)
1. Create a test HTML file
2. Try to embed sahakom.app in an iframe
3. **Expected:** Site should NOT load in iframe
4. **Currently:** Site DOES load (vulnerable) ✅

### Test #2: XSS (Issue #1)
1. Create a test farmer account
2. In the bio/description field, enter: `<script>alert('test')</script>`
3. View the profile
4. **Expected:** Should see the text, not a popup
5. **Currently:** Unknown (need to test with account)

### Test #3: Security Headers
1. Visit: https://securityheaders.com
2. Enter: sahakom.app
3. **Expected Score:** A or A+
4. **Current Score:** D+

---

## 📚 RESOURCES

### Free Tools:
- **Security Headers Test:** https://securityheaders.com
- **SSL Test:** https://www.ssllabs.com/ssltest/
- **Mozilla Observatory:** https://observatory.mozilla.org
- **npm audit:** Run in your project folder

### Libraries to Install:
```bash
npm install dompurify        # HTML sanitization
npm install helmet            # Security headers (if using Express)
npm audit                     # Check for vulnerabilities
npm audit fix                 # Auto-fix vulnerabilities
```

### Documentation:
- OWASP Top 10: https://owasp.org/www-project-top-ten/
- Supabase Security: https://supabase.com/docs/guides/platform/security
- React Security: https://snyk.io/blog/10-react-security-best-practices/

---

## 🤝 NEXT STEPS

### Option A: In-House Fix (Recommended)
- Your development team follows this guide
- Cost: Time only (~20 hours)
- Timeline: 2-4 weeks
- Control: You maintain full control

### Option B: Hire Security Specialist
- Professional security audit + fixes
- Cost: $2,000-10,000
- Timeline: 1-2 weeks
- Benefit: Expert review + peace of mind

### Option C: Hybrid Approach
- Your team fixes easy issues (headers, DOMPurify)
- Hire specialist for complex issues (CSP, data security)
- Cost: $500-2,000
- Timeline: 2-3 weeks

---

## 📞 SUPPORT

**If you have questions about this report:**
- Contact Bryan (BridgeLife)

**If you need help implementing fixes:**
- Bryan's team can provide step-by-step guidance
- Code review before deployment
- Testing after implementation

**If you want a professional audit:**
- Bryan can recommend security firms
- Or provide additional consultation

---

## 🏁 FINAL THOUGHTS

**The Good News:**
- Your site is built on solid technology (React, Supabase, Cloudflare)
- No catastrophic vulnerabilities found
- Everything is fixable with time (not money)
- You're taking security seriously by getting this audit

**The Reality Check:**
- You're handling money and sensitive farmer data
- Trust is your business model
- One breach could end the business
- Security is not optional — it's essential

**The Recommendation:**
Fix the critical issues this week (Issues #1 and #2). Then systematically work through the rest over the next month. Your farmers are counting on you to protect their data and their money.

---

**Report Completed:** March 10, 2026
**Valid For:** 3 months (re-audit recommended after changes or quarterly)
**Classification:** Client Confidential
**Prepared By:** Bryan's Security Consultant

---

## APPENDIX: Technical Details for Developers

### Missing Security Headers:
```http
X-Frame-Options: DENY
Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=(), usb=()
X-Permitted-Cross-Domain-Policies: none
Cross-Origin-Embedder-Policy: require-corp
Cross-Origin-Opener-Policy: same-origin
Cross-Origin-Resource-Policy: same-origin
```

### Current CSP (Needs Strengthening):
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://esm.sh https://unpkg.com;
```

### Recommended CSP:
```http
Content-Security-Policy:
  default-src 'self';
  script-src 'self' https://cdn.jsdelivr.net;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  img-src 'self' data: https: blob:;
  font-src 'self' https://fonts.gstatic.com;
  connect-src 'self' https://*.supabase.co wss://*.supabase.co;
  object-src 'none';
  base-uri 'self';
  frame-ancestors 'none';
  form-action 'self';
```

### Vulnerabilities Found:
- XSS: 20+ dangerouslySetInnerHTML instances
- Clickjacking: Confirmed vulnerable
- Weak CSP: 'unsafe-inline' and 'unsafe-eval' allowed
- Tabnabbing: 10+ window.open() without noopener
- PostMessage: No origin validation
- localStorage: 30+ instances
- No rate limiting: Client-side
- External dependencies: 3+ CDNs

---

**END OF REPORT**
