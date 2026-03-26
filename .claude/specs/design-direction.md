# Design Direction — Soraia Oliveira Portfolio

## Design Philosophy

This is not a generic portfolio template. This is the digital extension of a monumental visual artist whose work centers on the body, presence, and transformation. Every pixel should feel **intentional, quiet, and powerful** — like walking into a gallery where the walls breathe and the art holds you.

**Reference aesthetic:** Think Gagosian meets Acne Studios meets Apartamento Magazine. Editorial, warm, unhurried. The site should feel like an art book you want to keep on your coffee table.

---

## Current State → Target State

### What's Working
- Clean architecture and component separation
- Framer Motion animations with a11y fallbacks
- DB-driven content with mock data fallback
- Responsive foundations
- E-commerce flow (Stripe + inquiry)

### What's Generic (Must Fix)
The current implementation feels like a well-built template. A senior collector or curator visiting this site should feel they're entering Soraia's world — not browsing a Squarespace alternative.

---

## Component-Level Improvements

### 1. HEADER / NAVIGATION
**Current:** Fixed header, logo + 4 nav links, mobile hamburger. Fine but forgettable.

**Target:**
- Reduce visual weight — thinner, more transparent, let content breathe
- Navigation should feel curated: consider separating "Soraia Space" visually (it's a brand extension, not a page)
- Active state: use a subtle dot or line animation, not just a border
- On scroll: elegant transition from transparent to surface (current approach is correct, refine timing)
- Mobile: full-screen takeover with staggered reveal, large type — make it feel like an event, not a dropdown
- Consider adding a subtle "Cart" or "Inquire" icon for collectors browsing

### 2. HERO SECTION (Homepage)
**Current:** Large heading + tagline + featured image + 2 CTAs. Standard layout.

**Target:**
- This is the first impression — it should be cinematic
- Split-screen or asymmetric layout: text on one side, full-bleed image on the other
- The statement "VISUAL ARTIST BASED IN PORTUGAL, GUIMARÃES" should feel monumental — consider split across multiple lines with staggered animation
- Featured artwork image should be large, atmospheric, edge-to-edge or with intentional negative space
- Reduce CTA buttons to a single, understated "Explore Work" or just a scroll indicator
- Add a subtle horizontal line or divider that creates editorial rhythm
- Consider a slow Ken Burns effect on the hero image (very subtle, gallery-like)

### 3. CATEGORY GRID (Homepage)
**Current:** 3-column grid with image cards + gradient overlay. Generic portfolio pattern.

**Target:**
- Reimagine as an editorial spread — asymmetric sizes, magazine-like layout
- Each category should feel distinct: Photography gets the hero treatment (largest), Drawings feel intimate (smaller, detailed), Jewelry feels precious (close-up), Artist Proofs bridge the two
- Hover: reveal the category description with a smooth slide-up, not just an overlay
- Add a subtle "series count" or "x works" indicator
- Consider a horizontal scroll on mobile instead of stacking (more gallery-like)
- Use real artwork images with intentional cropping, not generic thumbnails

### 4. ARTIST STATEMENT (Homepage)
**Current:** Image left + quote right. Minimal, fine, but doesn't land.

**Target:**
- Make the quote feel like it's carved into the page — large, serif or italic treatment for the quote marks
- The pull-quote should be typographically distinct: oversized quotation marks, tighter leading
- Add Soraia's signature or name beneath the quote for attribution feel
- Image should feel like a window into the studio, not a decorative element
- Consider making this a full-width section with the text overlaid on a muted background
- The "Read more about Soraia" link should feel like an invitation, not a button

### 5. NEWSLETTER SECTION (Homepage + Footer)
**Current:** "JOIN SORAIA" heading + email input + arrow button. Functional.

**Target:**
- This is one of the most personal touchpoints — "JOIN SORAIA" is brilliant copy, honor it
- Give this section more breathing room and visual distinction
- Consider a warm background treatment (subtle texture or color shift)
- The input should feel elegant — thin border, generous padding, refined button
- Add a one-line value prop: "Behind-the-scenes, new releases, and studio stories"
- Deduplicate: footer newsletter should be simpler (just the input), homepage version gets the full treatment

### 6. ABOUT PAGE
**Current:** Bio + profile image + paragraphs + rotating identity words + exhibition list. Decent structure.

**Target:**
- **Bio section:** Make the intro text feel monumental — consider a full-width text treatment for the opening line, then drop into two-column for body paragraphs
- **Profile image:** Should feel editorial — consider a larger treatment, or multiple images showing studio/process/work
- **Identity words:** The rotating animation is good. Push further: make each word fill the screen width, use ultra-bold weight, consider a horizontal marquee or scroll-triggered reveal instead of timed rotation
- **Exhibition list:** Currently a plain table. Transform into a proper timeline or accordion — each exhibition could expand to show details. Add visual distinction between types (solo gets prominent treatment, groups are quieter)
- **Add:** Education section with the three institutions (this is credibility for collectors/curators)
- **Add:** Collaborators section (Sofia Arantes, Tales Frey)
- **Consider:** A downloadable CV/PDF for press

### 7. ARTWORKS PAGE
**Current:** Filter tabs + 3-column grid. Functional but gallery-standard.

**Target:**
- **Filter:** Refine to feel more editorial — consider text-only tabs with an animated underline indicator, not buttons
- **Grid:** Vary the grid rhythm — not all cards same size. Feature some works larger (editor's picks or featured flag). Consider a masonry-like approach for drawings specifically
- **Card hover:** Instead of just scale, reveal title/price with a smooth overlay
- **Sorting:** Add sort by year, price, availability
- **Empty state:** More personal — "New work coming soon" with Soraia's signature
- **Category headers:** When filtering, show a brief intro text for each category (already exists in original site for Drawings and Jewelry)

### 8. ARTWORK DETAIL PAGE
**Current:** Image gallery left + sticky sidebar right. Good foundation.

**Target:**
- **Image gallery:** Make images massive — the art IS the page. Consider full-width hero image treatment for the primary image
- **Thumbnails:** Refine — consider a vertical strip or dots instead of horizontal row
- **Details table:** Style as a discrete, elegant data card — edition info, dimensions, medium should feel like a gallery label
- **"Inquire" flow:** Should feel personal, not transactional. "Ask about this work" with pre-filled subject
- **Related works:** Add a "More from [category]" section at the bottom
- **Provenance/edition details:** If it's a limited edition, show "Edition X of Y" prominently

### 9. CONTACT PAGE
**Current:** Split — info left, form right. Standard.

**Target:**
- **Left panel:** More than just contact info. This is an invitation to connect. Add the quote "Connecting with you is what fulfils me the most."
- **Studio image:** Should show the actual space or Soraia at work
- **Form:** Refine field styling — thinner borders, more elegant placeholder text
- **Subject options:** Consider a dropdown with pre-set options (Purchase inquiry, Press, Collaboration, Studio visit, Other)
- **Social links:** Style as subtle icons, not a list
- **Consider:** Map or location hint for Guimarães (without full address for privacy)

### 10. SORAIA SPACE PAGE
**Current:** Hero + appointment cards + news list. Feels like a landing page.

**Target:**
- This page should feel like entering the studio — atmospheric and immersive
- **Hero:** Full-bleed studio image with text overlay, darker/moodier treatment
- **Appointment section:** Cards are too corporate. Make them feel like personal invitations: "Visit the Studio" and "Book a Call" with warmer copy
- **News section:** Transform from a list to a magazine-style layout — featured article gets hero treatment, others in a grid
- **Add:** YouTube section (even if "coming soon") with a cinematic placeholder
- **Add:** Process images or a gallery of studio shots

### 11. FOOTER
**Current:** 4-column grid (brand/newsletter/explore/connect). Adequate.

**Target:**
- Simplify — the footer should feel like a closing statement, not a navigation hub
- Signature logo + minimal links + social icons + copyright
- Newsletter can stay but simplified (input only, no heading)
- Consider adding a pull-quote or tagline as a parting thought
- "Guimarães, Portugal" should feel like a location stamp, not footer text

---

## New Components Needed

### 1. Horizontal Divider / Editorial Rule
A styled `<hr>` or divider component that creates editorial rhythm between sections. Thin line, generous vertical spacing.

### 2. Pull Quote
Large-format quote component with oversized quotation marks, serif/italic treatment. Used in About and Artist Statement.

### 3. Category Header
When filtering artworks by category, display a header with category name + descriptive text + work count. The Drawings and Jewelry pages on the original site have dedicated intro text.

### 4. Related Artworks
"More from [category]" or "You might also like" — a horizontal scroll of 3-4 artwork cards at the bottom of detail pages.

### 5. Timeline / CV Component
For exhibitions — a vertical timeline or expandable list that feels more intentional than a plain table. Potentially reusable for an education section.

### 6. Process Gallery
A curated set of studio/process images for the Soraia Space page. Could be a horizontal scroll or a simple grid.

### 7. Marquee / Scrolling Text
For the identity words section — a continuous horizontal scroll of identity words, replacing the timed rotation. More dynamic, more editorial.

### 8. Stat / Credential Bar
A subtle bar showing key credentials: "3 countries of study · X exhibitions · Since 2019" — social proof for collectors without being salesy.

---

## Design Token Refinements

### Typography
- Consider adding a serif or display font for quotes and special moments (currently all Satoshi)
- Increase heading sizes for key moments (hero, about intro)
- Wider letter-spacing on labels/nav (more editorial)

### Color
- Current palette is correct (monochromatic) but could use one warm accent
- Consider a very subtle warm gray (`#f8f7f5`) for alternating section backgrounds instead of pure white — adds warmth, feels less clinical
- The dark sections (About Identity) should use `--color-ink` as background with `--color-surface` text — already doing this, ensure consistency

### Spacing
- Increase section spacing for key moments — the site should breathe
- Hero section needs extra generous top padding (after the transparent header)

### Interactions
- Cursor: consider a custom cursor (the original site has one)
- Page transitions: smooth scroll between sections, consider page transition animations
- Image loading: elegant fade-in on load (not just snap)

---

## Content Priorities

1. **Real images everywhere** — replace all placeholders with actual artwork/studio photos
2. **Exhibition history** — populate with full CV data
3. **Category descriptions** — add intro text for each artwork category
4. **Education section** — three institutions with dates
5. **Collaborator credits** — Sofia Arantes (jewelry), Tales Frey (Apenas Ser)
6. **Press clippings** — Jornal de Guimarães articles
7. **Studio photographs** — for Soraia Space and Contact pages

---

## Implementation Priority

### Phase 1: Foundation (Design Tokens + Layout)
1. Typography refinements (letter-spacing, sizes, optional serif for quotes)
2. Warm gray alternating backgrounds
3. Section spacing increases
4. Header/footer refinements
5. Editorial divider component

### Phase 2: Homepage Transformation
1. Hero section reimagining
2. Category grid editorial layout
3. Artist statement elevation
4. Newsletter section refinement

### Phase 3: Key Pages
1. About page — bio, identity words, exhibition timeline, education
2. Artwork detail — larger images, related works, refined details
3. Artworks grid — varied sizing, category headers, sorting
4. Contact page — warmer, more invitational

### Phase 4: Soraia Space + Polish
1. Soraia Space atmospheric redesign
2. Custom cursor
3. Page transitions
4. Final content polish
