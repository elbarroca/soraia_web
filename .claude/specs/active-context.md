# Active Context — Soraia Oliveira Portfolio

## Last Session: 2026-04-07

### What Was Completed

**Notion UI Feedback — 10 Changes (Playwright-validated)**:

Used Playwright e2e tests to validate each change request from Notion screenshots. All 15 tests passed before commit. Playwright was installed temporarily for validation then removed.

Changes implemented:
1. **Featured artworks tile order** → all artworks > photography > artist proofs > drawings (was: drawings > new in)
2. **Featured artworks tile hrefs** → corrected to `/artworks?cat=artist-proofs` and `/artworks?cat=drawings`
3. **"ARTWORKS" heading** → added above the tile grid on homepage
4. **Tile labels** → repositioned from below image to overlaid at bottom-right (white text, drop-shadow)
5. **"View artworks →" link** → added light gray button at top-right of featured section
6. **"Soraia Studio" h1** → removed from artworks page
7. **"Edition" badge** → removed from artwork cards
8. **About page top spacing** → increased from `pt-8 md:pt-12` to `pt-20 md:pt-28`
9. **About bio text alignment** → centered (was left-aligned in grid column)
10. **Soraia Space hero spacing** → increased bottom padding from `pb-10 md:pb-16` to `pb-24 md:pb-32`, added wrapper margin on nav

### Files Modified

- `src/components/features/featured-artworks.tsx` — tile order, labels overlay, heading, view link
- `src/app/artworks/page.tsx` — removed "Soraia Studio" h1
- `src/components/features/artwork-card.tsx` — removed Edition badge
- `src/app/about/page.tsx` — increased top padding
- `src/components/features/about-bio.tsx` — centered text alignment
- `src/app/soraia-space/page.tsx` — increased hero spacing + nav wrapper

### Current State

- Build passes, all routes render
- Commit `bdd4812` pushed to `main`
- 5 items from Notion already passing before changes (F14, F15, F16, E11, D8)
- Admin image upload works fine (E11 passed — no bug found)

### Open Questions / Blockers

- **Notion screenshots also mentioned**: featured images should use specific artwork images per category (woman in water for "all artworks", specific drawing, warm-toned artist proof) — these depend on which artworks are in the DB/mock data and which is set as primary image. Not a code change, but a data/content task.
- Stripe live webhook still pending
- "Driven by Curiosity" section style — user mentioned "revert to first version" but current version already passes (words display correctly). May need visual comparison if user wants specific styling changes.
- Footer "navigation toda mais para a direita" — already passes at 60%+ threshold, but user may want it even further right.

### Next Steps

- [ ] Verify deployed site matches expectations visually
- [ ] Upload correct featured images per category tile (content task, not code)
- [ ] Mobile responsive QA pass
- [ ] Stripe live webhook setup
- [ ] DB seeding with real artworks
