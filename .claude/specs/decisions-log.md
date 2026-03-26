# Architecture Decisions Log

## 2026-03-25: Data Layer Unification Strategy

**Decision**: Created separate `src/lib/types.ts` (public-facing types) and `src/lib/mappers.ts` (DB→public converters) rather than modifying DB schema or component types.

**Why**: Mock types used `id: string`, `priceCents: number`, `isFeatured: boolean`. DB schema uses `id: integer`, `price: decimal`, no `isFeatured`. Converting at the mapper layer preserves all existing component contracts without touching 13+ component files.

**Trade-off**: Extra mapping layer, but clean separation between DB types and UI types. Components never import from `@/db/schema`.

## 2026-03-25: Featured Artwork via Settings, Not DB Column

**Decision**: Use `featured_artwork_id` in `site_settings` table rather than adding `is_featured` boolean column to artworks.

**Why**: Only one artwork can be featured at a time. A boolean column requires a migration + constraint logic. The settings table already exists and the admin settings editor handles it. Avoids DB schema change.

## 2026-03-25: Edge Runtime for OG Images

**Decision**: OG image generation uses `runtime = "edge"` with Neon HTTP queries.

**Why**: `@neondatabase/serverless` is edge-compatible (HTTP-based, no persistent connections). This allows OG images to be generated at the edge without Node.js runtime, improving latency.

## 2026-03-26: Mock Data Fallback in Query Functions

**Decision**: All query functions in `src/lib/queries/` wrapped with try/catch that falls back to mock data from `src/lib/mock-data.ts`.

**Why**: DB credentials are placeholders during development. Without fallback, every page crashes with `NeonDbError: password authentication failed`. Wrapping enables UI-first development without DB dependency.

**Trade-off**: Settings return rich mock content (hero text, bio, etc.) while artworks/exhibitions/news return mock arrays. Pages also check `dbResult.length > 0` before using DB data, falling back to mock if empty.

## 2026-03-26: Local Images for Development, CDN for Production

**Decision**: Downloaded all 55 images from Squarespace CDN to `/public/images/` for local development. Mock data references local paths. Production will use Uploadthing CDN URLs stored in DB.

**Why**: External CDN URLs may change or have CORS issues during development. Local files ensure the site always renders correctly. Migration to Uploadthing happens during Sprint 8 content migration.

## 2026-03-26: Geist Over Satoshi Font

**Decision**: Keep Geist (from next/font/google) as the primary font instead of installing Satoshi Variable.

**Why**: Geist is already loading correctly, visually similar to Satoshi (both clean geometric sans-serifs), and avoids adding another dependency. The CSS variable was renamed from `--font-satoshi` to `--font-sans` for clarity.

## 2026-03-25: Path Allowlist on Revalidation Endpoint

**Decision**: Revalidation endpoint validates paths against an allowlist + regex pattern rather than accepting arbitrary paths.

**Why**: Leaked `REVALIDATION_SECRET` could allow mass cache invalidation. Allowlist limits blast radius.
