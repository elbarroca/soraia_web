# Active Context — Soraia Oliveira Portfolio

## Last Session: 2026-03-25

### What Was Completed

**Sprints 1-2** (previous session):
- Full admin panel CRUD, DB schema (8 tables), auth, uploadthing, layout components
- Public pages with mock data, seed script (12 artworks)

**Sprints 3-5, 7 partial** (this session):
- **Data layer unification**: `src/lib/types.ts`, `src/lib/mappers.ts`, query files for settings/news/exhibitions
- **All 6 public pages wired to real DB** (removed mock-data dependency)
- **Newsletter API** persists to DB
- **Contact API** persists to DB + sends email via Resend
- **Stripe Commerce**: checkout route, webhook (with payment_status guard), PurchaseButton component
- **SEO**: robots.txt, sitemap.xml, llms.txt, dynamic OG images (root + per-artwork), JSON-LD (WebSite/Person/Product), bilingual alternates, skip-to-content
- **ISR revalidation endpoint** with path allowlist
- **301 redirects** for old Squarespace URLs
- **Code review fixes**: payment_status check in webhook, decimalToCents NaN guard, safe JSON.parse, Resend error handling, checkout visibility check, replaceAll for category names, revalidation path in news/exhibition actions

### Current State

Build passes cleanly with 30 routes. `src/lib/mock-data.ts` still exists but is no longer imported — safe to delete.

### Open Questions / Blockers

- DB has placeholder credentials (`user:pass`) — real Neon credentials needed for runtime testing
- Stripe keys are placeholders — need real test keys + webhook setup
- Resend API key is placeholder — need real key + domain verification
- Admin route protection: `proxy.ts` exists at root level for Next.js 16 middleware, but reviewer flagged it should be verified
- No `@types/stripe` needed (Stripe has built-in types), the dev dep installed can be removed

### Next Steps

- [ ] **Sprint 6**: Design polish — typography audit, interaction states, reduced motion audit
- [ ] **Sprint 8**: Content migration — real images from Squarespace, all 41 artworks, Vercel deploy
- [ ] Delete `src/lib/mock-data.ts`
- [ ] Visual QA on mobile (responsive)
- [ ] Lighthouse audit (needs production env)
- [ ] Accessibility audit with axe-core
- [ ] Connect real DB credentials and test full flow
- [ ] Set up Stripe webhook forwarding for local testing
- [ ] Test Stripe purchase flow end-to-end
- [ ] Add admin order status update action (paid → shipped → delivered)
