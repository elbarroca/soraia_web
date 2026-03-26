# Agent Routing — Effectiveness Log

## Learned Rules

### design-engineer: Use for multi-component UI overhauls
**Pattern**: When 3+ UI components need visual redesign with design judgment (layout, typography, spacing, hover states)
**Route to**: design-engineer agent with comprehensive context (design tokens, file paths, brand assets, design principles)
**Why**: 3/3 sessions show excellent results. Agent handles component rewrites, creates new shared components, and maintains design consistency. Always verify TypeScript compiles after — agent sometimes leaves import errors.

### Explore: Always use parallel agents for full-codebase audits
**Pattern**: When auditing structure + data + components across a project
**Route to**: 3 parallel Explore agents with distinct focus areas
**Why**: 2/2 sessions show 3x faster coverage. Each agent examines ~20 files without context window pressure.

## Session Log

### 2026-03-25

| Agent | Task | Outcome | Notes |
|-------|------|---------|-------|
| Explore x2 | Codebase audit (structure + data sources) | Excellent | Parallel agents: one for file structure, one for data source analysis. Both returned comprehensive reports. |
| Plan x1 | Design implementation plan (Sprints 3-8) | Excellent | Identified key type mismatch, proposed mapper pattern, correct execution order. |
| reviewer x1 | Post-implementation code review | Excellent | Found 6 critical issues (webhook payment_status, revalidation path validation, JSON.parse safety, etc.) and 12 important suggestions. All criticals fixed. |

### 2026-03-26

| Agent | Task | Outcome | Notes |
|-------|------|---------|-------|
| Explore x3 | Full codebase audit (structure/routes/favicon, DB/queries/admin, public pages/components) | Excellent | Parallel 3-agent audit found 10 issues. Each agent focused on distinct area, no overlap. |
| Plan x1 | Audit fix plan (5 phases) | Good | Plan was comprehensive but some items were simpler than planned. |
| reviewer x1 | Post-audit-fix review | Good | Found 3 critical issues (font self-ref was false positive, order status/artworkSlug were real). Some findings need judgment to filter. |
| design-engineer x1 | Favicon creation (SO monogram) | Excellent | Created icon.tsx + apple-icon.tsx with gallery aesthetic. Clean, minimal, on-brand. |
| researcher x1 | Scrape original website | Good | WebFetch was blocked, fell back to web search + codebase analysis. Got bio details right but missed image URLs. Direct WebFetch calls were more effective. |
| design-engineer x1 | Major UI overhaul (8 components) | Excellent | CategoryGrid, Header, Footer, SuccessModal, ArtworkCard, ArtworkGrid, AboutBio all improved. Left minor TS errors (stale diagnostics, not real). |
