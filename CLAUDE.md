# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

- `pnpm dev` — start dev server
- `pnpm build` — production build
- `pnpm lint` — ESLint
- `npx drizzle-kit push` — push schema to Supabase
- `npx drizzle-kit generate` — generate migrations
- `npx drizzle-kit studio` — open Drizzle Studio
- No test runner configured yet

## Tech Stack

- **Next.js 16.2** (App Router) + React 19 + TypeScript strict
- **Tailwind CSS v4** — PostCSS-based, design tokens as CSS custom properties in `globals.css`
- **shadcn (base-nova)** — `@base-ui/react` primitives, not Radix
- **Drizzle ORM** + Supabase PostgreSQL (postgres-js driver, `prepare: false` for Supavisor pooler)
- **NextAuth v5 beta** — Credentials provider (email + bcrypt hash from env vars)
- **Stripe** — checkout sessions via `/api/checkout`
- **Uploadthing** — image uploads in admin
- **Resend** — transactional email
- **Zod v4** — form validation (not v3 — import from `zod` not `zod/v4`)

## Architecture

### Data flow
- Public pages are Server Components that call query functions in `src/lib/queries/`
- Queries return raw DB rows; `src/lib/mappers.ts` converts them to public types (`src/lib/types.ts`)
- Admin mutations use Server Actions defined in `src/app/admin/(dashboard)/actions.ts`
- Admin form components are Client Components using react-hook-form + Zod

### Route protection
- `proxy.ts` (Next.js 16 proxy, replaces middleware) protects `/admin/*` except `/admin/login`
- Auth checks JWT session via NextAuth v5 `auth()` helper

### Database
- Schema: `src/db/schema.ts` (8 tables: artworks, artwork_images, news, exhibitions, site_settings, contacts, newsletter_subscribers, + auth tables)
- Client: `src/db/index.ts` — `postgres()` + `drizzle()` with `prepare: false` (Supabase Supavisor)
- Config: `drizzle.config.ts`
- Artwork categories: `photography | artist-proofs | drawings | jewelry`
- Prices stored as decimal in DB, converted to cents via `decimalToCents()` in mappers

### Design tokens
Custom properties in `src/app/globals.css` — use these, not raw colors:
- `--color-ink`, `--color-ink-light`, `--color-ink-muted`
- `--color-surface`, `--color-surface-dim`, `--color-surface-hover`
- `--color-border`, `--color-border-strong`
- `--color-accent`, `--color-accent-hover`
- `--color-sold`, `--color-sale`
- Font: Satoshi Variable (`--font-primary`)

### Key utilities
- `cn()` — clsx + tailwind-merge (`src/lib/utils.ts`)
- `formatPrice(cents)` — EUR Intl formatter (`src/lib/utils.ts`)
- `slugify(text)` — kebab-case slug (`src/lib/utils.ts`)
- `src/lib/structured-data.ts` — JSON-LD generators for SEO

### Path alias
`@/*` maps to `./src/*`

## Conventions

- Admin pages use `export const dynamic = "force-dynamic"` to prevent static generation
- Image remotes allowed: `placehold.co`, `images.squarespace-cdn.com`, `utfs.io`
- Named exports everywhere (no default exports in shared modules)
- Validation schemas live in `src/lib/validations/`
