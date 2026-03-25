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

## 2026-03-25: Drizzle decimal returns string, not number

**Bug**: `decimal("price", { precision: 10, scale: 2 })` in Drizzle returns the value as a `string` (e.g. `"1800.00"`), not a `number`. Components expected `priceCents: number`.

**Fix**: Created `decimalToCents()` mapper: `parseFloat(value) * 100` with NaN guard.
