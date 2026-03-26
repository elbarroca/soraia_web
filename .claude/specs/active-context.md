# Active Context — Soraia Oliveira Portfolio

## Last Session: 2026-03-26

### What Was Completed

**Comprehensive Codebase Audit** (3 parallel Explore agents):
- Full structure, DB, queries, components, routes audited
- Identified 10 issues across high/medium/low priority

**Audit Fixes (9 items)**:
- Dynamic favicon: `icon.tsx` (32x32 SO monogram) + `apple-icon.tsx` (180x180 inverted)
- Font variable renamed `--font-satoshi` → `--font-sans` (matches Geist actually loaded)
- Orders page: fixed amount formatting + badge status ("paid" now renders correctly)
- Dashboard: real DB counts via `Promise.all` of 6 count queries
- Contact API: separated validation (400) from server errors (500) via `safeParse`
- llms.txt: now dynamic with DB artwork counts, graceful fallback
- Dead code deleted: `mobile-nav.tsx`, old `mock-data.ts`
- Newsletter DRY: extracted `useNewsletter` hook, both Footer + Section use it
- Barrel export cleaned

**DB Fallback for Development**:
- All query functions wrapped with try/catch → mock data fallback
- Site renders fully without DB connection (all 5 pages return 200)

**Content Scraping** (from soraia-oliveira.com):
- Scraped all 45 real artworks with titles, prices, categories, sold status
- Downloaded 55 images (46 artworks + branding + about + studio + contact) to `/public/images/`
- Extracted real bio, identity words, exhibitions, news, social links, appointment URLs
- Updated mock-data.ts with all real content

**UI Overhaul (2 passes)**:

Pass 1 (design-engineer agent):
- CategoryGrid: real artwork images, proper 3-col grid, hover zoom + subtitle reveal
- Header: signature image replaces text logo
- Footer: bold signature, 4 social links (Instagram/Facebook/TikTok/YouTube)
- SuccessModal: reusable component with animated checkmark
- ArtworkCard: removed category badge, cleaner hover
- ArtworkGrid: 2-col from mobile up
- AboutBio: profile photo integrated

Pass 2 (direct implementation):
- Header: full Framer Motion entrance animation, staggered nav links, AnimatePresence mobile menu, signature watermark in mobile overlay
- Hero: tighter 12-col grid (5/6 split), scale-in image entrance, staggered text reveals, buttons stack on mobile
- ArtistStatement: asymmetric layout with studio image, blockquote styling, accent line
- ExhibitionList: styled type badges (filled/outlined), external link icon on hover, accent line header
- AppointmentSection: vertical card layout with icon/title/description/CTA, 12-col grid with text
- ContactForm: personalized placeholders, Instagram link added
- Contact page: contact image on desktop, accent line headers
- Soraia Space: studio image alongside intro text

**README**: Comprehensive Portuguese README with 5 Mermaid diagrams, pushed to GitHub

**GitHub**: Remote added, all changes committed and pushed to `github.com/elbarroca/soraia_web`

### Current State

- Build passes clean, all routes render, TypeScript clean
- Site works fully with mock data (no DB needed for UI development)
- 45 real artworks + 55 images + real content in mock-data.ts
- UI is gallery-grade with animations, signature branding, responsive design

### Open Questions / Blockers

- Real Neon DB credentials needed for production
- Stripe test keys needed for payment flow testing
- Resend API key needed for email testing
- Satoshi Variable font was in original design spec but Geist is loaded — acceptable trade-off, both are clean sans-serifs
- Some artwork images from Squarespace CDN have black borders (original source quality issue)

### Next Steps

- [ ] **Sprint 6 remaining**: Mobile responsive QA pass (test all pages on phone viewport)
- [ ] **Sprint 6 remaining**: Lighthouse audit (performance, accessibility, SEO scores)
- [ ] **Sprint 6 remaining**: Reduced motion audit (verify all animations respect `prefers-reduced-motion`)
- [ ] **Sprint 8**: Connect real Neon DB credentials + push schema
- [ ] **Sprint 8**: Seed DB with real 45 artworks from mock-data.ts
- [ ] **Sprint 8**: Upload images to Uploadthing (replace local `/public/images/` with CDN URLs)
- [ ] **Sprint 8**: Connect Stripe test keys + verify purchase flow
- [ ] **Sprint 8**: Vercel deploy + DNS configuration
- [ ] Delete old root-level `app/`, `components/`, `lib/` directories (git status shows them as deleted but not committed)
- [ ] Add admin order status update action (paid → shipped → delivered)
