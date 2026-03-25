# SORAIA OLIVEIRA — Sprint Execution Playbook

> **Total Duration:** 8 sprints × 2 days = 16 days
> **Starting Point:** Fresh `create-next-app` (latest Next.js) already created
> **Goal:** Production-ready artist portfolio + e-commerce + admin panel

---

## ⚠️ BEFORE YOU START — One-Time Setup

These are accounts/services you need created BEFORE Sprint 1 begins.
Do this TODAY so there's zero blockers:

```bash
# 1. Create a Neon account + project (free tier)
#    → https://console.neon.tech
#    → Create project "soraia-oliveira"
#    → Copy the DATABASE_URL connection string

# 2. Create an Uploadthing account + app (free tier)
#    → https://uploadthing.com
#    → Create app "soraia-oliveira"
#    → Copy UPLOADTHING_SECRET and UPLOADTHING_APP_ID

# 3. Create a Stripe account (if not already)
#    → https://dashboard.stripe.com
#    → Copy STRIPE_SECRET_KEY and STRIPE_PUBLISHABLE_KEY
#    → Set up webhook endpoint later (Sprint 5)

# 4. Create a Resend account (free tier)
#    → https://resend.com
#    → Copy RESEND_API_KEY
#    → Verify your domain (info@soraia-oliveira.com)

# 5. Have the Squarespace site open for content/image scraping
```

---

## SPRINT 1 — Foundation & Plumbing (Days 1–2)

> **Goal:** Working Next.js app with database connected, auth working, image upload working, design tokens set, and layout components built. At the end of Sprint 1, you should be able to log into `/admin` and see a blank dashboard.

### Day 1: Project Bootstrap + Database + Auth

**Step 1: Install core dependencies**

```bash
cd soraia-oliveira  # your existing next.js project

# Database (Neon + Drizzle)
npm install drizzle-orm @neondatabase/serverless
npm install -D drizzle-kit

# Auth
npm install next-auth@beta @auth/drizzle-adapter bcryptjs
npm install -D @types/bcryptjs

# UI
npx shadcn@latest init
# When prompted:
#   Style: Default
#   Base color: Neutral
#   CSS variables: Yes

# Add shadcn components we'll need
npx shadcn@latest add button input textarea badge skeleton dialog separator toast accordion table dropdown-menu label select switch tabs card sheet

# Forms
npm install react-hook-form @hookform/resolvers zod

# Animation
npm install framer-motion

# Utilities
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react
```

**Step 2: Environment variables**

```bash
# Create .env.local
cat > .env.local << 'EOF'
# Database (Neon)
DATABASE_URL="postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/soraia?sslmode=require"

# Auth
AUTH_SECRET="generate-with-openssl-rand-base64-32"
ADMIN_EMAIL="soraia@soraia-oliveira.com"
ADMIN_PASSWORD_HASH="generate-with-bcryptjs"

# Uploadthing
UPLOADTHING_TOKEN="your-token-here"

# Stripe
STRIPE_SECRET_KEY="sk_test_xxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# Email
RESEND_API_KEY="re_xxx"
CONTACT_NOTIFICATION_EMAIL="info@soraia-oliveira.com"

# App
NEXT_PUBLIC_BASE_URL="http://localhost:3000"
REVALIDATION_SECRET="generate-random-string"
EOF
```

```bash
# Generate auth secret
openssl rand -base64 32

# Generate password hash (run in node REPL)
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password-here', 10).then(h => console.log(h))"
```

**Step 3: Database schema**

Create `src/db/schema.ts` — copy the FULL Drizzle schema from the blueprint (Section 3.3).
Then:

```bash
# Create the drizzle config
cat > drizzle.config.ts << 'EOF'
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
EOF

# Create db client
mkdir -p src/db
# Create src/db/index.ts (copy from blueprint Section 3.3)

# Push schema to Neon
npx drizzle-kit push

# Verify tables exist
npx drizzle-kit studio
# Opens browser — you should see all 8 tables
```

**Step 4: Auth setup**

Create these files (copy from blueprint Section 3.4):
- `src/lib/auth.ts` — Auth.js config with Credentials provider
- `src/app/api/auth/[...nextauth]/route.ts` — Route handler
- `src/middleware.ts` — Admin route protection

Test: Navigate to `/admin` → should redirect to `/admin/login`.

**Step 5: Font loading**

```bash
# Install Satoshi font
npm install @fontsource-variable/satoshi
```

```typescript
// src/app/layout.tsx — import at the top
import '@fontsource-variable/satoshi';
```

Or use `next/font/local` if you have the Satoshi font files. Add to your root layout and set the CSS variable `--font-primary`.

### Day 2: Design System + Layout Components + Uploadthing

**Step 6: Design tokens**

Update `src/app/globals.css` with the full design token system from the blueprint (Section 5.2–5.4). This includes all CSS custom properties for colors, typography, spacing, and radius.

**Step 7: Build layout components**

Create these files:

```
src/components/layout/
├── header.tsx        # Fixed nav: logo left, links right, hamburger mobile
├── footer.tsx        # Signature image, newsletter form, link columns
├── mobile-nav.tsx    # Full-screen overlay menu (Sheet from shadcn)
├── section.tsx       # Reusable section wrapper with consistent py spacing
├── container.tsx     # max-w-[1440px] mx-auto px-6 md:px-10 lg:px-20
└── index.ts          # Barrel exports
```

For `header.tsx`:
- Fixed position, transparent initially, solid white on scroll (use `useScrollPosition` hook)
- Logo: Soraia's signature image (hardcode a placeholder for now)
- Nav links: SORAIA SPACE, ARTWORKS, ABOUT, CONTACT
- Mobile: Sheet component from shadcn for hamburger menu

For `footer.tsx`:
- Bold signature image
- Newsletter email input + submit arrow
- Two columns of links
- Copyright line

**Step 8: Uploadthing setup**

```bash
npm install uploadthing @uploadthing/react
```

Create:
- `src/lib/uploadthing.ts` — File router (from blueprint Section 3.5)
- `src/app/api/uploadthing/route.ts` — API route handler

**Step 9: Admin layout**

```
src/app/admin/
├── layout.tsx        # Sidebar + header, wraps all admin pages
├── page.tsx          # Dashboard (placeholder cards for now)
└── login/
    └── page.tsx      # Login form (email + password)
```

Use shadcn's `Sheet` for a collapsible sidebar on mobile. Sidebar links:
Dashboard, Artworks, News, Exhibitions, Orders, Contacts, Newsletter, Settings.

**✅ Sprint 1 Checkpoint:**
- [ ] `npm run dev` works, site loads with header + footer
- [ ] `/admin/login` shows login form
- [ ] Login with admin credentials → redirects to `/admin`
- [ ] `/admin` shows empty dashboard with sidebar
- [ ] `npx drizzle-kit studio` shows all 8 tables in Neon
- [ ] Fonts load correctly (Satoshi)

---

## SPRINT 2 — Admin Panel CRUD (Days 3–4)

> **Goal:** Full artwork management — create, edit, delete artworks with image upload. Plus News, Exhibitions, and Site Settings CRUD. At the end of Sprint 2, you can populate the entire site from the admin panel.

### Day 3: Artwork CRUD (the big one)

**Step 10: Server actions for artworks**

```
src/app/admin/artworks/
├── page.tsx                  # List all artworks (DataTable)
├── new/
│   └── page.tsx              # Create artwork form
├── [id]/
│   └── edit/
│       └── page.tsx          # Edit artwork form
└── actions.ts                # Server actions: create, update, delete, reorder
```

```
src/lib/
├── queries/
│   ├── artworks.ts           # DB queries: getAll, getBySlug, getByCategory
│   └── index.ts
└── validations/
    ├── artworks.ts           # Zod schemas for artwork form
    └── index.ts
```

**Artwork list page (`/admin/artworks/page.tsx`):**
- Use TanStack Table (`npm install @tanstack/react-table`)
- Columns: Thumbnail (40x40), Title, Category, Price, Status (Available/Sold badge), Visible toggle, Actions (Edit/Delete)
- Filter by category dropdown
- "Add Artwork" button top-right

**Artwork form (shared between new + edit):**

```
src/components/admin/artwork-form.tsx
```

Fields (react-hook-form + zod):
- Title → auto-generates slug (on blur, slugify)
- Slug (editable)
- Description (textarea)
- Category (select: photography, artist-proofs, drawings, jewelry)
- Tags (multi-checkbox: new, featured)
- Year, Medium, Edition, Dimensions (text inputs)
- Price (number input, EUR) + "Price on request" toggle (hides price input)
- Original price (shows only when category = jewelry, for sale items)
- Is Sold toggle
- Is Visible toggle
- Meta title / description (collapsible SEO section)
- Image uploader (see Step 11)

**Step 11: Image upload component**

```
src/components/admin/image-uploader.tsx
```

- Uses Uploadthing's `useUploadThing` hook
- Drag-and-drop zone (or click to browse)
- Shows upload progress
- After upload: displays thumbnails in a sortable list (drag to reorder)
- Each image: thumbnail, "Set as primary" radio, alt text input, delete button
- On form submit: saves image URLs + sort order + primary flag to `artwork_images` table

**Step 12: Server actions**

```typescript
// src/app/admin/artworks/actions.ts
"use server"

import { db } from "@/db";
import { artworks, artworkImages } from "@/db/schema";
import { auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export async function createArtwork(data: NewArtworkInput) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const [artwork] = await db.insert(artworks).values({
    title: data.title,
    slug: data.slug,
    // ... all fields
  }).returning();

  // Insert images
  if (data.images?.length) {
    await db.insert(artworkImages).values(
      data.images.map((img, i) => ({
        artworkId: artwork.id,
        url: img.url,
        fileKey: img.fileKey,
        altText: img.altText,
        sortOrder: i,
        isPrimary: i === 0,
      }))
    );
  }

  revalidatePath("/artworks");
  revalidatePath("/admin/artworks");
  return artwork;
}

export async function updateArtwork(id: string, data: UpdateArtworkInput) { /* similar */ }
export async function deleteArtwork(id: string) { /* similar */ }
export async function toggleVisibility(id: string, visible: boolean) { /* similar */ }
```

### Day 4: Supporting CRUD + Content Migration Prep

**Step 13: News CRUD**

```
src/app/admin/news/
├── page.tsx          # List + inline edit (simpler than artworks)
└── actions.ts        # create, update, delete
```

Simple table: Title, Excerpt, External URL, Published Date, Visible toggle. Modal-based create/edit (no separate page needed — news items are simple).

**Step 14: Exhibitions CRUD**

```
src/app/admin/exhibitions/
├── page.tsx
└── actions.ts
```

Same pattern as News. Fields: Title, Location, Year, Type (solo/group/residency/award), External URL.

**Step 15: Site Settings editor**

```
src/app/admin/settings/
├── page.tsx
└── actions.ts
```

Key-value editor for editable content blocks. Each setting is a row with a key label and a textarea/input for the value. Settings:

```
hero_statement      → "VISUAL ARTIST BASED IN PORTUGAL, GUIMARÃES."
hero_tagline        → "Self-portraiture, photography and drawing..."
about_intro         → "I'm Soraia, a multidisciplinary artist..."
about_bio           → [JSON array of paragraphs]
about_identity      → [JSON array: "CREATIVE THINKER", "DREAMER", ...]
contact_email       → "info@soraia-oliveira.com"
studio_description  → "A creative studio based in Portugal..."
appointment_text    → "Connecting with you is what fulfils me..."
appointment_url     → "https://tidycal.com/soraiaoliveira/studio-visit"
call_url            → "https://tidycal.com/soraiaoliveira/online-meeting"
social_instagram    → "https://instagram.com/..."
```

**Step 16: Contacts + Newsletter viewers**

```
src/app/admin/contacts/page.tsx    # Read-only list + "mark as read"
src/app/admin/newsletter/page.tsx  # Subscriber list + export CSV button
```

These are read-only admin views — no create/edit needed. Just tables with data.

**Step 17: Seed script for development**

```bash
# Create src/db/seed.ts
# This populates the database with all 41 artworks from the content inventory
# Run with: npx tsx src/db/seed.ts
```

Pull all artwork data from the blueprint's product catalog (Section 2.3). For images, use the Squarespace CDN URLs temporarily — we'll migrate to Uploadthing in Sprint 8.

**✅ Sprint 2 Checkpoint:**
- [ ] Can create an artwork with images from `/admin/artworks/new`
- [ ] Artwork list shows all seeded artworks with thumbnails
- [ ] Can edit any artwork, toggle visibility, mark as sold
- [ ] Can add/edit/delete news items and exhibitions
- [ ] Can edit site settings (hero text, bio, etc.)
- [ ] Contact submissions and newsletter subscribers show in admin
- [ ] Seed script populates all 41 artworks

---