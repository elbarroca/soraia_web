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

## SPRINT 3 — Public Pages: Home + Artworks (Days 5–6)

> **Goal:** The two most important pages — Home and Artworks index — are live, pulling real data from Neon, with proper animations and responsive design.

### Day 5: Home Page

**Step 18: Home page**

```
src/app/page.tsx                    # Home (Server Component)
src/components/features/
├── hero-section.tsx                # Split hero: statement + featured image
├── category-preview.tsx            # Single category card with hover
├── category-grid.tsx               # 4-card asymmetric grid
├── artist-statement.tsx            # Mid-section text + image
├── newsletter-section.tsx          # CTA + email form
└── index.ts
```

Data fetching (in `page.tsx` as a Server Component):
```typescript
import { db } from "@/db";
import { artworks, siteSettings } from "@/db/schema";
import { eq, and } from "drizzle-orm";

export default async function HomePage() {
  // Get hero content from settings
  const settings = await db.select().from(siteSettings);
  const settingsMap = Object.fromEntries(settings.map(s => [s.key, s.value]));

  // Get featured artwork for hero
  const [featuredArtwork] = await db.query.artworks.findMany({
    where: and(eq(artworks.isFeatured, true), eq(artworks.isVisible, true)),
    with: { images: true },
    limit: 1,
  });

  return (
    <>
      <HeroSection
        statement={settingsMap.hero_statement}
        tagline={settingsMap.hero_tagline}
        featuredImage={featuredArtwork?.images?.[0]?.url}
      />
      <CategoryGrid />
      <ArtistStatement
        line1="Multidisciplinary artist working across photography and drawing."
        line2="Creating and exploring through the body, self-portraiture and transformation."
      />
      <NewsletterSection />
    </>
  );
}
```

**Step 19: Scroll animations**

```
src/components/shared/fade-in.tsx   # Reusable scroll-triggered entrance
```

Use Framer Motion `whileInView` with `viewport={{ once: true }}`. Apply to every section on Home for staggered reveals.

**Step 20: Newsletter API route**

```
src/app/api/newsletter/route.ts
```

POST handler: validate email with zod → insert into `newsletter_subscribers` → return success. Optionally sync to Resend Audiences.

### Day 6: Artworks Index Page

**Step 21: Artworks page**

```
src/app/artworks/
├── page.tsx                        # Server Component, fetches all artworks
└── layout.tsx                      # Optional: metadata

src/components/features/
├── artwork-grid.tsx                # Client Component: filterable masonry grid
├── artwork-card.tsx                # Image + title + price/status
├── artwork-filter.tsx              # Sticky category filter bar
├── price-display.tsx               # Handles all 4 price states
└── index.ts
```

Data fetching:
```typescript
// src/app/artworks/page.tsx
export default async function ArtworksPage({
  searchParams,
}: {
  searchParams: Promise<{ cat?: string }>;
}) {
  const { cat } = await searchParams;

  const allArtworks = await db.query.artworks.findMany({
    where: eq(artworks.isVisible, true),
    with: { images: { where: eq(artworkImages.isPrimary, true) } },
    orderBy: [asc(artworks.sortOrder)],
  });

  return (
    <Section>
      <ArtworkFilter activeCategory={cat || "all"} />
      <ArtworkGrid artworks={allArtworks} activeCategory={cat || "all"} />
    </Section>
  );
}
```

**Filter behavior:** Category filter updates URL search params (`/artworks?cat=photography`). ArtworkGrid is a Client Component that filters the pre-fetched array client-side. This keeps the page fast (one DB query) while making filters feel instant (no round-trip).

**Price display logic (`price-display.tsx`):**
```
if (isSold)             → "SOLD" badge (gray)
if (isPriceOnRequest)   → "Price on request"
if (originalPriceCents)  → "€300" strikethrough + "€210" (sale)
if (priceCents)          → "€1,800.00"
```

**Artwork card hover:** Subtle 1.02x scale on the image within `overflow-hidden`. Title underlines on hover.

**✅ Sprint 3 Checkpoint:**
- [ ] Home page loads with hero, category grid, artist statement, newsletter
- [ ] Home pulls real data from Neon (settings, featured artwork)
- [ ] Scroll animations work (staggered fade-in on each section)
- [ ] Newsletter form submits and stores in database
- [ ] Artworks page shows all artworks in a grid
- [ ] Category filter works via URL params
- [ ] Price displays correctly for all 4 states
- [ ] Responsive: both pages look good on mobile

---

## SPRINT 4 — Public Pages: Detail + About + Space + Contact (Days 7–8)

> **Goal:** All public pages complete. Every page pulls dynamic content. Contact form works end-to-end.

### Day 7: Artwork Detail + About

**Step 22: Artwork detail page**

```
src/app/artworks/[slug]/
├── page.tsx                        # SSG with revalidate
└── layout.tsx                      # metadata from artwork data

src/components/features/
├── artwork-detail.tsx              # Full product layout
├── image-gallery.tsx               # Multi-image thumbnails + main image
├── image-lightbox.tsx              # Full-screen viewer (Radix Dialog)
├── purchase-button.tsx             # Stripe checkout trigger
└── index.ts
```

```typescript
// src/app/artworks/[slug]/page.tsx
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const allArtworks = await db.select({ slug: artworks.slug }).from(artworks);
  return allArtworks.map((a) => ({ slug: a.slug }));
}

export const revalidate = 3600; // ISR: revalidate every hour

export default async function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const artwork = await db.query.artworks.findFirst({
    where: eq(artworks.slug, slug),
    with: { images: { orderBy: [asc(artworkImages.sortOrder)] } },
  });

  if (!artwork || !artwork.isVisible) notFound();

  return <ArtworkDetail artwork={artwork} />;
}
```

**Purchase button logic:**
- Has price + not sold → "PURCHASE" button → creates Stripe Checkout session via `/api/checkout`
- Price on request → "INQUIRE" button → redirects to `/contact?artwork={slug}`
- Sold → no button, just "SOLD" badge
- Sale item → shows both prices, "PURCHASE" button

**Image lightbox:** Radix Dialog, fullscreen black overlay, image centered with `object-contain`. Arrow keys + click to navigate between images. Click overlay or X to close.

**Step 23: About page**

```
src/app/about/page.tsx

src/components/features/
├── about-bio.tsx                   # Two-column bio layout
├── about-identity.tsx              # Animated "I AM..." cycling text
├── exhibition-list.tsx             # CV list from database
└── index.ts
```

About identity animation: Use Framer Motion `AnimatePresence` to cycle through identity words every 2 seconds. Words slide up and fade.

Exhibition list: Fetch from `exhibitions` table, sorted by year descending. Two-column layout: year on left, title + location on right. Hairline border between each item.

### Day 8: Soraia Space + Contact

**Step 24: Soraia Space page**

```
src/app/soraia-space/page.tsx

src/components/features/
├── appointment-section.tsx         # TidyCal CTAs
├── news-list.tsx                   # Press items from database
└── index.ts
```

Straightforward page. Fetch news items from `news` table. Appointment links are external (TidyCal). YouTube section is a placeholder.

**Step 25: Contact page + API**

```
src/app/contact/page.tsx

src/components/features/
├── contact-form.tsx                # react-hook-form + zod
└── index.ts

src/app/api/contact/route.ts        # POST handler
```

Contact form:
- Fields: Name, Email, Subject (pre-filled from URL param `?artwork=slug`), Message
- Validation: zod schema (name min 2, email valid, message min 10)
- Submit: POST to `/api/contact`

API route:
```typescript
// src/app/api/contact/route.ts
import { db } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();
  // Validate with zod...

  // Save to database
  await db.insert(contactSubmissions).values({
    name: body.name,
    email: body.email,
    subject: body.subject,
    message: body.message,
    artworkSlug: body.artworkSlug || null,
  });

  // Send email notification
  await resend.emails.send({
    from: "website@soraia-oliveira.com",
    to: process.env.CONTACT_NOTIFICATION_EMAIL!,
    subject: `New inquiry: ${body.subject || "General"}`,
    text: `From: ${body.name} (${body.email})\n\n${body.message}`,
  });

  return Response.json({ success: true });
}
```

**✅ Sprint 4 Checkpoint:**
- [ ] Artwork detail page shows full product info + images
- [ ] Lightbox opens on image click, arrow key navigation works
- [ ] "Inquire" button redirects to contact with pre-filled subject
- [ ] About page shows bio, animated identity block, exhibitions list
- [ ] Soraia Space shows studio info, appointments CTAs, news items
- [ ] Contact form submits, saves to DB, sends email notification
- [ ] All pages responsive on mobile

---

## SPRINT 5 — Stripe Commerce (Days 9–10)

> **Goal:** A visitor can purchase an artwork and pay via Stripe Checkout. Orders appear in the admin panel.

### Day 9: Stripe Checkout Integration

**Step 26: Install Stripe**

```bash
npm install stripe
```

**Step 27: Checkout API route**

```typescript
// src/app/api/checkout/route.ts
import Stripe from "stripe";
import { db } from "@/db";
import { artworks } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { artworkId } = await req.json();

  const artwork = await db.query.artworks.findFirst({
    where: eq(artworks.id, artworkId),
    with: { images: { limit: 1 } },
  });

  if (!artwork || artwork.isSold || !artwork.priceCents) {
    return Response.json({ error: "Not available" }, { status: 400 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [{
      price_data: {
        currency: "eur",
        product_data: {
          name: artwork.title,
          images: artwork.images?.[0]?.url ? [artwork.images[0].url] : [],
          description: [artwork.medium, artwork.dimensions, artwork.edition]
            .filter(Boolean).join(" · "),
        },
        unit_amount: artwork.priceCents,
      },
      quantity: 1,
    }],
    metadata: {
      artworkId: artwork.id,
    },
    shipping_address_collection: {
      allowed_countries: ["PT", "ES", "FR", "DE", "IT", "GB", "US", "NL", "BE"],
    },
    success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/artworks/${artwork.slug}?success=true`,
    cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/artworks/${artwork.slug}`,
  });

  return Response.json({ url: session.url });
}
```

**Step 28: Purchase button (client component)**

```typescript
// src/components/features/purchase-button.tsx
"use client"

export function PurchaseButton({ artworkId, disabled }: Props) {
  const [loading, setLoading] = useState(false);

  async function handlePurchase() {
    setLoading(true);
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ artworkId }),
    });
    const { url } = await res.json();
    window.location.href = url; // Redirect to Stripe Checkout
  }

  return (
    <Button onClick={handlePurchase} disabled={disabled || loading}>
      {loading ? "Redirecting..." : "PURCHASE"}
    </Button>
  );
}
```

### Day 10: Webhook + Order Management

**Step 29: Stripe webhook**

```bash
# Install Stripe CLI for local testing
brew install stripe/stripe-cli/stripe  # macOS
# or download from https://github.com/stripe/stripe-cli

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe
# Copy the webhook signing secret (whsec_xxx) to .env.local
```

```typescript
// src/app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { db } from "@/db";
import { orders, artworks } from "@/db/schema";
import { eq } from "drizzle-orm";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    // Create order
    await db.insert(orders).values({
      stripeCheckoutSessionId: session.id,
      stripePaymentIntentId: session.payment_intent as string,
      customerEmail: session.customer_details?.email,
      customerName: session.customer_details?.name,
      artworkId: session.metadata?.artworkId,
      amountCents: session.amount_total!,
      currency: session.currency!,
      status: "paid",
      shippingAddress: session.shipping_details?.address,
    });

    // Optionally mark artwork as sold (for 1/1 editions)
    // await db.update(artworks).set({ isSold: true }).where(eq(artworks.id, session.metadata?.artworkId));
  }

  return Response.json({ received: true });
}
```

**Step 30: Admin orders page**

```
src/app/admin/orders/
├── page.tsx          # Order list with status badges
└── actions.ts        # Update order status
```

Table columns: Date, Customer, Artwork Title, Amount, Status (badge), Actions (Update status dropdown).

**✅ Sprint 5 Checkpoint:**
- [ ] Click "Purchase" on artwork → redirected to Stripe Checkout
- [ ] Complete test payment → order appears in admin
- [ ] Webhook creates order record in database
- [ ] Admin can update order status (paid → shipped → delivered)
- [ ] "Inquire" flow works (redirects to contact with pre-filled subject)

---

## SPRINT 6 — Design Polish & Animations (Days 11–12)

> **Goal:** Transform the functional site into a gallery-grade experience. This is where the "Architectural Void" aesthetic comes alive.

### Day 11: Typography, Spacing, Visual Refinement

**Step 31: Global typography audit**

Go through EVERY page and verify:
- All headings use Satoshi 700 with tight tracking (-0.02em)
- Body text is 16px/160% line-height Satoshi 400
- Small labels are 12px uppercase 500 weight with 0.05em tracking
- Buttons are 14px 600 weight
- No font-size below 12px
- Heading hierarchy is correct (one h1 per page)

**Step 32: Spacing audit**

- Page margins: 24px mobile / 40px tablet / 80px desktop / 120px wide
- Section padding: py-16 sm:py-24 lg:py-32
- Max content width: 1440px
- Max text width: 600px (for body copy blocks)
- Zero border-radius everywhere (0px radius — this is the gallery aesthetic)
- No box shadows (clean, flat)

**Step 33: Interaction states**

Go through EVERY interactive element:
- Nav links: underline slides in from left on hover
- Image cards: 1.02x scale within overflow-hidden on hover
- Text CTAs: arrow translates 4px right on hover
- Buttons: bg → #333 on hover, scale 0.98 on active
- Inputs: border-bottom transitions to solid black on focus
- List rows: background → #FAFAFA on hover
- All interactive elements have `focus-visible` ring for keyboard nav

### Day 12: Animation Orchestration

**Step 34: Page load animations**

Home page entrance sequence:
1. Name "SORAIA OLIVEIRA" fades in (300ms)
2. Hero statement slides up (delay 200ms)
3. Tagline fades in (delay 400ms)
4. CTA fades in (delay 600ms)
5. Hero image fades in from right (delay 400ms)

Use Framer Motion `motion.div` with `initial`, `animate`, and `transition.delay`.

**Step 35: Scroll-triggered reveals**

Every section on every page uses the `FadeIn` component:
```tsx
<FadeIn delay={0}>
  <CategoryGrid />
</FadeIn>
```

Stagger child elements within sections:
```tsx
{categories.map((cat, i) => (
  <FadeIn key={cat} delay={i * 0.1}>
    <CategoryPreview {...cat} />
  </FadeIn>
))}
```

**Step 36: Page transitions**

Add `framer-motion` layout animations between routes if desired. Or keep it simple with CSS `view-transition-name` on shared elements (header, footer).

**Step 37: Reduced motion**

Wrap ALL animations in `prefers-reduced-motion` check:
```tsx
const prefersReducedMotion = useReducedMotion();
// or use Tailwind's motion-safe: / motion-reduce: modifiers
```

**✅ Sprint 6 Checkpoint:**
- [ ] Site looks gallery-grade on desktop AND mobile
- [ ] Typography is consistent and distinctive across all pages
- [ ] All interactive elements have proper hover/focus/active states
- [ ] Page load animation sequence works smoothly
- [ ] Scroll reveals are subtle and performant
- [ ] Reduced motion is respected

---

## SPRINT 7 — SEO, Performance, Accessibility (Days 13–14)

> **Goal:** Production-ready. Green Lighthouse scores. Proper metadata. Accessible to all users.

### Day 13: SEO + Metadata

**Step 38: generateMetadata on every page**

```typescript
// src/app/artworks/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params;
  const artwork = await db.query.artworks.findFirst({
    where: eq(artworks.slug, slug),
    with: { images: { limit: 1 } },
  });

  return {
    title: `${artwork?.title} — Soraia Oliveira`,
    description: artwork?.metaDescription || `${artwork?.medium} · ${artwork?.dimensions}`,
    openGraph: {
      images: artwork?.images?.[0]?.url ? [artwork.images[0].url] : [],
    },
  };
}
```

Do this for ALL pages: Home, Artworks, [slug], About, Soraia Space, Contact.

**Step 39: Sitemap + robots.txt**

```typescript
// src/app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const allArtworks = await db.select({ slug: artworks.slug, updatedAt: artworks.updatedAt }).from(artworks).where(eq(artworks.isVisible, true));

  return [
    { url: "https://soraia-oliveira.com", lastModified: new Date(), priority: 1 },
    { url: "https://soraia-oliveira.com/artworks", lastModified: new Date(), priority: 0.9 },
    { url: "https://soraia-oliveira.com/about", lastModified: new Date(), priority: 0.7 },
    { url: "https://soraia-oliveira.com/soraia-space", lastModified: new Date(), priority: 0.6 },
    { url: "https://soraia-oliveira.com/contact", lastModified: new Date(), priority: 0.5 },
    ...allArtworks.map((a) => ({
      url: `https://soraia-oliveira.com/artworks/${a.slug}`,
      lastModified: a.updatedAt,
      priority: 0.8,
    })),
  ];
}
```

```typescript
// src/app/robots.ts
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/admin/" },
    sitemap: "https://soraia-oliveira.com/sitemap.xml",
  };
}
```

**Step 40: Structured data (JSON-LD)**

Add `Product` schema to artwork detail pages. Add `Person` schema to about page.

**Step 41: 301 redirects from old Squarespace URLs**

```typescript
// next.config.ts
const nextConfig = {
  async redirects() {
    return [
      // Map old Squarespace URLs to new ones
      { source: "/artworks/p/:slug", destination: "/artworks/:slug", permanent: true },
      { source: "/home", destination: "/", permanent: true },
    ];
  },
};
```

### Day 14: Performance + Accessibility

**Step 42: Lighthouse audit**

```bash
# Build and run production locally
npm run build
npm run start

# Run Lighthouse in Chrome DevTools → Lighthouse tab
# Target: All scores > 90
```

Common fixes:
- Images: ensure all use `next/image` with proper `width`, `height`, `sizes`, and `priority` (hero image only)
- Fonts: verify `font-display: swap` and no layout shift
- Bundle: run `npm run build` and check output sizes
- CLS: all images have explicit dimensions or `aspect-ratio`

**Step 43: Accessibility audit**

```bash
npm install -D @axe-core/react  # development only
```

Check:
- All images have alt text
- All form inputs have associated labels
- Color contrast ≥ 4.5:1 for all text
- Keyboard navigation works on every page (Tab through all interactive elements)
- Focus indicators visible on all interactive elements
- Skip-to-content link present
- ARIA labels on icon-only buttons (hamburger menu, close buttons)
- Lightbox: focus trapped inside, Escape closes it

**Step 44: ISR revalidation endpoint**

```typescript
// src/app/api/revalidate/route.ts
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const { secret, path } = await req.json();
  if (secret !== process.env.REVALIDATION_SECRET) {
    return Response.json({ error: "Invalid secret" }, { status: 401 });
  }
  revalidatePath(path);
  return Response.json({ revalidated: true });
}
```

Call this from admin after saving artwork changes to bust the ISR cache instantly.

**✅ Sprint 7 Checkpoint:**
- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 95
- [ ] Lighthouse SEO > 95
- [ ] All pages have proper meta titles, descriptions, OG images
- [ ] Sitemap generates correctly
- [ ] robots.txt blocks /admin/
- [ ] 301 redirects work for old Squarespace URLs
- [ ] axe-core reports zero critical violations
- [ ] Keyboard navigation works end-to-end

---

## SPRINT 8 — Content Migration + Launch (Days 15–16)

> **Goal:** All real content is in the database. DNS pointed. Site is LIVE.

### Day 15: Content Migration

**Step 45: Download all images from Squarespace**

```bash
# Create a migration script
mkdir -p scripts
# Create scripts/download-images.ts

# For each artwork, download the image from Squarespace CDN:
# https://images.squarespace-cdn.com/content/v1/640b5708d06706091698b823/...
# Save locally, then upload to Uploadthing via their API

# Also download:
# - Logo/signature images
# - About page images (profile photo, studio shots)
# - Contact page image
# - Category preview images for home page
```

**Step 46: Populate database with real data**

Update the seed script to use real Uploadthing URLs (after images are uploaded). Verify all 41 artworks are correct:
- Titles match exactly
- Prices are correct (in cents)
- Categories are correct
- "Price on request" items have `isPriceOnRequest: true`
- Sold items have `isSold: true`
- Sale items (jewelry) have both `priceCents` and `originalPriceCents`

Populate:
- All 4 news items
- Site settings with real content
- Test that exhibitions can be added (may be empty initially)

**Step 47: Final content review with Soraia**

Walk through every page with Soraia:
- Home: hero image, statement text, category images
- Artworks: all 41 items display correctly
- Each artwork detail: images, prices, descriptions
- About: bio text, portrait, identity words
- Soraia Space: studio description, appointment links, news
- Contact: email address, form works

### Day 16: Deploy + Go Live

**Step 48: Deploy to Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy (first time — creates project)
vercel

# Set environment variables in Vercel dashboard
# → Settings → Environment Variables
# Add ALL variables from .env.local

# Deploy production
vercel --prod
```

**Step 49: DNS cutover**

1. In Vercel: Add custom domain `soraia-oliveira.com` + `www.soraia-oliveira.com`
2. In domain registrar: Update DNS records to point to Vercel
   - A record → `76.76.21.21`
   - CNAME for www → `cname.vercel-dns.com`
3. Wait for SSL certificate provisioning (automatic)
4. Wait for DNS propagation (up to 48 hours, usually faster)

**Step 50: Post-launch verification**

```bash
# Verify SSL
curl -I https://soraia-oliveira.com

# Verify redirects
curl -I https://www.soraia-oliveira.com  # should redirect to non-www (or vice versa)
curl -I https://soraia-oliveira.com/home  # should 301 to /

# Submit sitemap to Google Search Console
# → https://search.google.com/search-console
# Add property → submit sitemap.xml

# Verify Stripe webhook endpoint
# Update webhook URL in Stripe dashboard to production URL
# https://soraia-oliveira.com/api/webhooks/stripe

# Test a purchase in live mode (with a real card, refund after)

# Set up Vercel Analytics (optional)
# npm install @vercel/analytics
# Add <Analytics /> to root layout
```

**Step 51: Decommission Squarespace**

- Keep Squarespace active for 2-4 weeks after launch (for any redirects that need time)
- Monitor Google Search Console for crawl errors
- Cancel Squarespace subscription once confident

**✅ Sprint 8 Checkpoint:**
- [ ] All 41 artworks with real images live on production
- [ ] All site settings populated with real content
- [ ] DNS pointing to Vercel, SSL working
- [ ] Stripe webhook pointing to production URL
- [ ] Google Search Console has new sitemap
- [ ] Old Squarespace URLs redirect properly
- [ ] Soraia can log into admin and manage content
- [ ] Test purchase works in production

---

## QUICK REFERENCE — Daily Cadence

| Sprint | Days | Focus | Deliverable |
|--------|------|-------|-------------|
| 1 | 1–2 | Foundation | DB + Auth + Layout + Design tokens |
| 2 | 3–4 | Admin CRUD | Artwork management + all supporting CRUD |
| 3 | 5–6 | Home + Artworks | Two main public pages with animations |
| 4 | 7–8 | Remaining pages | Detail + About + Space + Contact |
| 5 | 9–10 | Commerce | Stripe Checkout + webhooks + orders |
| 6 | 11–12 | Design polish | Typography + animations + interactions |
| 7 | 13–14 | SEO + a11y | Metadata + Lighthouse + accessibility |
| 8 | 15–16 | Migration + Launch | Real content + deploy + DNS + go live |

---

## PACKAGES TO INSTALL (Complete List)

```bash
# Core
npm install drizzle-orm @neondatabase/serverless
npm install next-auth@beta @auth/drizzle-adapter bcryptjs
npm install stripe
npm install resend
npm install uploadthing @uploadthing/react
npm install framer-motion

# UI
npx shadcn@latest init
npx shadcn@latest add button input textarea badge skeleton dialog separator toast accordion table dropdown-menu label select switch tabs card sheet

# Forms
npm install react-hook-form @hookform/resolvers zod

# Utilities
npm install clsx tailwind-merge class-variance-authority
npm install lucide-react
npm install slugify

# Admin tables
npm install @tanstack/react-table

# Font
npm install @fontsource-variable/satoshi

# Dev
npm install -D drizzle-kit @types/bcryptjs
```