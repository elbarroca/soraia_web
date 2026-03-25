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

## 2026-03-25: Path Allowlist on Revalidation Endpoint

**Decision**: Revalidation endpoint validates paths against an allowlist + regex pattern rather than accepting arbitrary paths.

**Why**: Leaked `REVALIDATION_SECRET` could allow mass cache invalidation. Allowlist limits blast radius.
