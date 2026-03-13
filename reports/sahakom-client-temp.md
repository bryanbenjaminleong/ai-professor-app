# Sahakom - Temporary Client Notes

**Client:** Keat Farm Partner Platform (Paul - Keat family)
**Project:** Troubleshooting website security
**Date:** March 10, 2026
**Status:** Temporary - for troubleshooting only

---

## Client Background

### Business
- Keat family are business/land owners in Cambodia
- Ministry and outreach leaders with powerful networks
- Agriculture & livestock business connections
- Monthly trainings for local farmers at fraction of actual costs
- Land used as retreat location for local and overseas churches
- Bridge foreign help (Singaporeans) to local pastors/leaders

### Platform Mission
- Create direct connection: Farmers/Producers → Consumers
- Skip multiple middlemen
- Kingdom objective: Support local farmers (including pastors) → business-funded ministry

### Business Model
- **Coverage:** Pig farmers first → full ecosystem (feed, fertilizers, waste management)
- **Locality:** Test in Kg Chennang → roll out to other provinces
- **Revenue:** 15% transaction fee
- **Ownership:** Keat owns/operates; BridgeLife retains rights to modify for other regions
- **Funding:** Not needed (Keat is asset-rich)

### Risks & Mitigation
1. **Political:** Middlemen backlash → Paul has state-level connections
2. **Quality control:** Peer review + small audit team
3. **Tech savvy:** Farmers can handle simple systems

---

## Security Audit Results

**URL:** https://sahakom.app
**Date:** March 10, 2026

### Infrastructure Security: 7/10
- ✅ HTTPS + HSTS enforced
- ✅ Cloudflare CDN + DDoS protection
- ✅ Supabase Auth (JWT)
- ⚠️ Missing security headers (X-Frame-Options, Permissions-Policy)
- ⚠️ CSP allows 'unsafe-inline' and 'unsafe-eval'

### Code Security: 7.5/10
- ✅ No hardcoded secrets
- ✅ Server-side RPC functions for business logic
- ✅ Input sanitization functions present
- ⚠️ 20+ uses of dangerouslySetInnerHTML (XSS risk)
- ⚠️ Client-side business logic (needs RLS verification)

### Reports Created
- `sahakom-security-report.md` — Full infrastructure analysis
- `sahakom-security-fixes.md` — Step-by-step fix guide
- `sahakom-code-security.md` — Code-level analysis

### Vulnerabilities Found
1. **Clickjacking** (Medium) — Missing X-Frame-Options
2. **XSS Risk** (Medium) — dangerouslySetInnerHTML usage
3. **Weak CSP** (Medium) — Allows unsafe-inline, unsafe-eval
4. **Information Disclosure** (Low) — API errors, tech stack exposed
5. **No Rate Limiting** (Low) — Visible issue

---

## Technology Stack

- **Frontend:** React 18+ (Vite build)
- **Backend:** Supabase (PostgreSQL + Auth)
- **CDN:** Cloudflare
- **Build Tool:** Vite
- **Language:** TypeScript (compiled to JS)

---

## Next Steps

- [ ] Client reviews security reports
- [ ] Implement critical fixes (X-Frame-Options, DOMPurify)
- [ ] Test XSS vulnerabilities
- [ ] Verify RLS policies

---

**Note:** This file is temporary for troubleshooting. Delete after client work is complete.
