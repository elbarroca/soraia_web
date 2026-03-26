# Learnings & Non-Obvious Fixes

## 2026-03-25: Stripe webhook payment_status guard

**Bug**: `checkout.session.completed` fires even for async payment methods (SEPA, bank transfer) where `payment_status` is `"unpaid"`. Without checking, artwork gets marked sold before payment clears.

**Fix**: Guard with `session.payment_status === "paid"` before inserting order and marking artwork sold.

## 2026-03-25: Stripe Session.shipping_details renamed

**Bug**: `session.shipping_details` doesn't exist in latest Stripe types. It's now at `session.collected_information?.shipping_details`.

**Fix**: Use `session.collected_information?.shipping_details?.address`.

## 2026-03-25: generateStaticParams fails build with placeholder DB credentials

**Bug**: `generateStaticParams()` in artwork detail page queries DB at build time. With placeholder `user:pass` credentials, the build fails with `NeonDbError: password authentication failed`.

**Fix**: Wrap in try/catch, return `[]` on failure. Page still works via dynamic rendering at request time.

## 2026-03-26: Orders amount stored in EUR, not cents

**Bug**: Stripe webhook converts `session.amount_total` (cents) to EUR via `String((session.amount_total ?? 0) / 100)` before inserting. The orders page displayed `{order.currency} {Number(order.amount).toLocaleString()}` which showed "EUR 50" instead of "€50.00".

**Fix**: Use `Intl.NumberFormat("de-DE", { style: "currency", currency: order.currency })` with try/catch fallback for invalid currency codes.

## 2026-03-26: Stripe webhook writes status "paid", badge expected "completed"

**Bug**: Webhook inserts `status: "paid"`, but the orders page badge logic only handled "completed" (default) and "pending" (secondary). "Paid" fell through to "destructive" (red) — making successful orders look like errors.

**Fix**: Added `order.status === "paid"` to the default badge variant condition.

## 2026-03-26: @theme inline self-reference is NOT a CSS cycle

**Non-bug**: `@theme inline { --font-sans: var(--font-sans); }` in Tailwind v4 looks like a self-referencing CSS variable, but it's intentional. `@theme inline` doesn't create CSS custom properties — it tells Tailwind to read the runtime CSS variable. The `inline` keyword means no CSS output, just theme registration.

## 2026-03-26: lucide-react missing Instagram icon

**Bug**: `import { Instagram } from "lucide-react"` fails — not exported in the installed version.

**Fix**: Use inline SVG for Instagram icon. The footer already had this pattern with custom SVG social icons.

## 2026-03-25: Drizzle decimal returns string, not number

**Bug**: `decimal("price", { precision: 10, scale: 2 })` in Drizzle returns the value as a `string` (e.g. `"1800.00"`), not a `number`. Components expected `priceCents: number`.

**Fix**: Created `decimalToCents()` mapper: `parseFloat(value) * 100` with NaN guard.
