# Deployment Guide — Soraia Oliveira Portfolio

This guide walks you through setting up every external service and environment variable needed to deploy the website to production. Follow each section in order.

---

## Table of Contents

1. [Overview](#1-overview)
2. [Neon (Database)](#2-neon-database)
3. [Stripe (Payments)](#3-stripe-payments)
4. [Resend (Email)](#4-resend-email)
5. [Uploadthing (Image Storage)](#5-uploadthing-image-storage)
6. [Auth.js (Admin Authentication)](#6-authjs-admin-authentication)
7. [Vercel (Hosting)](#7-vercel-hosting)
8. [Domain & DNS](#8-domain--dns)
9. [Final Environment Variables](#9-final-environment-variables)
10. [Post-Deploy Checklist](#10-post-deploy-checklist)

---

## 1. Overview

The website needs **6 external services** (all have free tiers):

| Service | Purpose | Free Tier |
|---------|---------|-----------|
| **Neon** | PostgreSQL database | 0.5 GB storage, always free |
| **Stripe** | Payment processing | No monthly fee, 1.5% + €0.25 per transaction |
| **Resend** | Email notifications (contact form) | 3,000 emails/month |
| **Uploadthing** | Image uploads (admin panel) | 2 GB storage, 2 GB bandwidth |
| **Vercel** | Web hosting | Hobby tier free |
| **Domain** | soraia-oliveira.com | Already owned |

You will collect **11 environment variables** across these services.

---

## 2. Neon (Database)

Neon is a serverless PostgreSQL database. It stores all artworks, exhibitions, news, contacts, newsletter subscribers, and orders.

### Step 1: Create Account

1. Go to [neon.tech](https://neon.tech)
2. Click **"Sign Up"** — use Google or GitHub account
3. You'll land on the dashboard

### Step 2: Create a Project

1. Click **"New Project"**
2. **Project name**: `soraia-portfolio`
3. **Region**: `AWS eu-central-1 (Frankfurt)` — closest to Portugal
4. **Database name**: `soraia`
5. Click **"Create Project"**

### Step 3: Get Connection String

1. After creating the project, you'll see a **"Connection Details"** panel
2. Make sure **"Pooled connection"** is selected (not direct)
3. Copy the full connection string. It looks like:

```
postgresql://username:password@ep-xxx-xxx-123456.eu-central-1.aws.neon.tech/soraia?sslmode=require
```

### Environment Variable

```env
DATABASE_URL="postgresql://username:password@ep-xxx.eu-central-1.aws.neon.tech/soraia?sslmode=require"
```

### Step 4: Initialize Database

After deploying, run this command once to create all tables:

```bash
npx drizzle-kit push
```

To populate with initial data (artworks, exhibitions, settings):

```bash
npx tsx src/db/seed.ts
```

---

## 3. Stripe (Payments)

Stripe handles artwork purchases. Customers pay via credit card and Stripe sends a webhook to confirm the order.

### Step 1: Create Account

1. Go to [stripe.com](https://stripe.com)
2. Click **"Start now"** and create an account
3. **Business name**: `Soraia Oliveira — Visual Artist`
4. **Country**: Portugal
5. Complete the verification process (ID, bank account for payouts)

### Step 2: Get API Keys

1. In the Stripe Dashboard, go to **Developers → API keys**
2. You'll see two keys:
   - **Publishable key** (starts with `pk_test_` or `pk_live_`)
   - **Secret key** (starts with `sk_test_` or `sk_live_`)
3. Copy both

> **Important**: Use `test` keys during development. Switch to `live` keys only after the site is ready for real payments.

### Step 3: Set Up Webhook

The webhook tells your site when a payment is completed.

1. Go to **Developers → Webhooks**
2. Click **"Add endpoint"**
3. **Endpoint URL**: `https://soraia-oliveira.com/api/webhooks/stripe`
4. **Events to listen to**: Select only `checkout.session.completed`
5. Click **"Add endpoint"**
6. On the webhook details page, click **"Reveal"** under Signing secret
7. Copy the signing secret (starts with `whsec_`)

### Step 4: Configure Payout

1. Go to **Settings → Payouts**
2. Add your Portuguese bank account (IBAN)
3. Payouts will arrive automatically (usually 7 days after purchase)

### Environment Variables

```env
STRIPE_SECRET_KEY="sk_test_xxx"                        # Secret key from Step 2
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_xxx"       # Publishable key from Step 2
STRIPE_WEBHOOK_SECRET="whsec_xxx"                      # Webhook signing secret from Step 3
```

### How Pricing Works

- Prices are set in the admin panel per artwork (in EUR)
- Stripe creates a checkout session dynamically — **no Stripe Price IDs needed**
- Each artwork's price is sent to Stripe at the time of purchase
- Shipping countries allowed: Portugal, Spain, France, Germany, Italy, UK, US, Netherlands, Belgium

---

## 4. Resend (Email)

Resend sends email notifications when someone submits the contact form.

### Step 1: Create Account

1. Go to [resend.com](https://resend.com)
2. Click **"Sign Up"** — use Google or GitHub
3. You'll land on the dashboard

### Step 2: Get API Key

1. Go to **API Keys** in the left sidebar
2. Click **"Create API Key"**
3. **Name**: `soraia-portfolio`
4. **Permission**: `Sending access`
5. **Domain**: `All domains` (for now)
6. Click **"Create"** and copy the key (starts with `re_`)

### Step 3: Add Domain (Production)

For emails to not go to spam, verify your domain:

1. Go to **Domains** in the left sidebar
2. Click **"Add Domain"**
3. Enter: `soraia-oliveira.com`
4. Resend will show you **3 DNS records** to add:
   - 1 MX record
   - 1 SPF record (TXT)
   - 1 DKIM record (TXT)
5. Add these records at your domain registrar (see [Domain & DNS](#8-domain--dns))
6. Click **"Verify"** — may take a few minutes

### Environment Variables

```env
RESEND_API_KEY="re_xxx"                                # API key from Step 2
CONTACT_NOTIFICATION_EMAIL="info@soraia-oliveira.com"  # Where contact form messages are sent
```

---

## 5. Uploadthing (Image Storage)

Uploadthing handles image uploads in the admin panel (artwork images, news images).

### Step 1: Create Account

1. Go to [uploadthing.com](https://uploadthing.com)
2. Click **"Sign Up"** — use Google or GitHub
3. You'll land on the dashboard

### Step 2: Create an App

1. Click **"Create a new app"**
2. **App name**: `soraia-portfolio`
3. Click **"Create App"**

### Step 3: Get Token

1. Go to **API Keys** tab in your app
2. Copy the **UPLOADTHING_TOKEN** value

### Configuration

- **Max file sizes**: 8MB for artwork images, 4MB for news images
- **Max files per upload**: 10 artwork images, 1 news image
- **Allowed types**: Images only (JPG, PNG, WebP)
- Only authenticated admins can upload (protected by Auth.js session check)

### Environment Variable

```env
UPLOADTHING_TOKEN="eyJhcH..."                          # Token from Step 3
```

---

## 6. Auth.js (Admin Authentication)

The admin panel (`/admin`) is protected by a simple email + password login. No external service needed — credentials are stored as environment variables.

### Step 1: Generate Auth Secret

Run this command in your terminal:

```bash
openssl rand -base64 32
```

Copy the output — this is your `AUTH_SECRET`.

### Step 2: Choose Admin Credentials

Pick the email and password for the admin login:

- **Email**: `soraia@soraia-oliveira.com` (or any email you prefer)
- **Password**: Choose a strong password

### Step 3: Hash the Password

Run this in your terminal (replace `your-password-here`):

```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('your-password-here', 12).then(h => console.log(h))"
```

Copy the output — it looks like `$2a$12$xxxxx...`. This is your `ADMIN_PASSWORD_HASH`.

> **Important**: Never store the actual password in environment variables. Only the bcrypt hash.

### Environment Variables

```env
AUTH_SECRET="base64-string-from-step-1"
ADMIN_EMAIL="soraia@soraia-oliveira.com"
ADMIN_PASSWORD_HASH="$2a$12$xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### How to Login

1. Go to `https://soraia-oliveira.com/admin`
2. Enter the email and password from Step 2
3. You'll be redirected to the admin dashboard

---

## 7. Vercel (Hosting)

Vercel hosts the website and handles deployments automatically when you push to GitHub.

### Step 1: Create Account

1. Go to [vercel.com](https://vercel.com)
2. Click **"Sign Up"** — use your GitHub account
3. Select the **"Hobby"** plan (free)

### Step 2: Import Project

1. Click **"Add New → Project"**
2. Select the **soraia-web** repository from GitHub
3. Vercel will auto-detect it's a Next.js project

### Step 3: Configure Environment Variables

Before deploying, add ALL environment variables:

1. In the project settings, go to **"Environment Variables"**
2. Add each variable from [Section 9](#9-final-environment-variables) below
3. Make sure to add them for **Production**, **Preview**, and **Development** environments

### Step 4: Deploy

1. Click **"Deploy"**
2. Vercel will build and deploy the site
3. You'll get a URL like `soraia-web.vercel.app`

### Step 5: Initialize Database

After the first deploy, open a terminal and run:

```bash
# From your local machine with DATABASE_URL set
npx drizzle-kit push
npx tsx src/db/seed.ts
```

### Automatic Deployments

Every time you push to the `main` branch on GitHub, Vercel automatically deploys the changes. No manual intervention needed.

---

## 8. Domain & DNS

### Connect Custom Domain

1. In Vercel project settings, go to **"Domains"**
2. Click **"Add"** and enter: `soraia-oliveira.com`
3. Also add: `www.soraia-oliveira.com`

### DNS Records

At your domain registrar, set these DNS records:

| Type | Name | Value |
|------|------|-------|
| **A** | `@` | `76.76.21.21` |
| **CNAME** | `www` | `cname.vercel-dns.com` |

If you configured Resend (email), also add the DNS records from [Section 4, Step 3](#step-3-add-domain-production).

### SSL

Vercel automatically provisions a free SSL certificate. No action needed — `https://` will work immediately.

---

## 9. Final Environment Variables

Here is the complete list of all 11 environment variables. Copy this template, fill in your values, and add them all to Vercel.

```env
# ─── Database (Neon) ───
DATABASE_URL="postgresql://user:pass@ep-xxx.eu-central-1.aws.neon.tech/soraia?sslmode=require"

# ─── Authentication ───
AUTH_SECRET="your-openssl-rand-base64-32-output"
ADMIN_EMAIL="soraia@soraia-oliveira.com"
ADMIN_PASSWORD_HASH="$2a$12$your-bcrypt-hash-here"

# ─── Payments (Stripe) ───
STRIPE_SECRET_KEY="sk_live_xxx"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_xxx"
STRIPE_WEBHOOK_SECRET="whsec_xxx"

# ─── Email (Resend) ───
RESEND_API_KEY="re_xxx"
CONTACT_NOTIFICATION_EMAIL="info@soraia-oliveira.com"

# ─── Image Upload (Uploadthing) ───
UPLOADTHING_TOKEN="eyJhcH..."

# ─── Application ───
NEXT_PUBLIC_BASE_URL="https://soraia-oliveira.com"
REVALIDATION_SECRET="generate-a-random-string-here"
```

> **Tip**: Generate `REVALIDATION_SECRET` with `openssl rand -base64 32`

---

## 10. Post-Deploy Checklist

After everything is set up and the site is live:

- [ ] **Database**: Run `npx drizzle-kit push` to create tables
- [ ] **Database**: Run `npx tsx src/db/seed.ts` to populate initial data
- [ ] **Admin**: Login at `/admin` and verify access
- [ ] **Admin**: Upload real artwork images via the admin panel (replaces local dev images)
- [ ] **Admin**: Update site settings (hero statement, bio, studio description)
- [ ] **Stripe**: Switch from `test` keys to `live` keys in Vercel env vars
- [ ] **Stripe**: Update webhook URL to `https://soraia-oliveira.com/api/webhooks/stripe`
- [ ] **Stripe**: Do a test purchase with a real card (refund after)
- [ ] **Email**: Verify the contact form sends notifications to `info@soraia-oliveira.com`
- [ ] **Newsletter**: Test newsletter subscription
- [ ] **SEO**: Submit `https://soraia-oliveira.com/sitemap.xml` to [Google Search Console](https://search.google.com/search-console)
- [ ] **SEO**: Verify Open Graph images render correctly at [opengraph.xyz](https://www.opengraph.xyz/)
- [ ] **Social**: Update Instagram/Facebook/TikTok bio links to `soraia-oliveira.com`
- [ ] **Analytics**: (Optional) Add Google Analytics or Plausible for traffic tracking

---

## Troubleshooting

### "Site works but shows no artworks"
The database is empty. Run `npx drizzle-kit push` then `npx tsx src/db/seed.ts`.

### "Contact form doesn't send emails"
Check that `RESEND_API_KEY` and `CONTACT_NOTIFICATION_EMAIL` are set in Vercel. If emails go to spam, verify your domain in Resend (Section 4, Step 3).

### "Image uploads fail"
Check that `UPLOADTHING_TOKEN` is set correctly. The token is a long base64 string starting with `eyJ`.

### "Payment button doesn't work"
Verify `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` are set. For live payments, both must start with `sk_live_` and `pk_live_`.

### "Admin login doesn't work"
Verify `ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, and `AUTH_SECRET` are all set. The password hash must be generated with `bcryptjs` — not a plain-text password.

### "Webhook payments not confirming"
Check that `STRIPE_WEBHOOK_SECRET` matches the webhook in your Stripe dashboard. The webhook URL must be `https://soraia-oliveira.com/api/webhooks/stripe` (not localhost).

---

## Support

For technical issues with the website code, contact the developer.

For account issues with Stripe, Neon, Resend, or Uploadthing, visit their respective support pages:

- Stripe: [support.stripe.com](https://support.stripe.com)
- Neon: [neon.tech/docs](https://neon.tech/docs)
- Resend: [resend.com/docs](https://resend.com/docs)
- Uploadthing: [docs.uploadthing.com](https://docs.uploadthing.com)
