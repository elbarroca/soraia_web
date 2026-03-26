import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { db } from "@/db";
import { orders, artworks } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return Response.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch {
    return Response.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" &&
    (event.data.object as Stripe.Checkout.Session).payment_status === "paid"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const artworkId = session.metadata?.artworkId
      ? parseInt(session.metadata.artworkId, 10)
      : null;
    const artworkSlug = session.metadata?.artworkSlug ?? null;

    await db.insert(orders).values({
      stripeSessionId: session.id,
      stripePaymentIntentId: (session.payment_intent as string) ?? null,
      customerEmail: session.customer_details?.email ?? "unknown",
      customerName: session.customer_details?.name ?? "unknown",
      artworkId: artworkId,
      amount: String((session.amount_total ?? 0) / 100),
      currency: session.currency?.toUpperCase() ?? "EUR",
      status: "paid",
      shippingAddress: session.collected_information?.shipping_details?.address ?? null,
    });

    if (artworkId) {
      await db
        .update(artworks)
        .set({ isSold: true })
        .where(eq(artworks.id, artworkId));

      // Bust ISR cache so the artwork shows as sold immediately
      revalidatePath("/artworks");
      if (artworkSlug) {
        revalidatePath(`/artworks/${artworkSlug}`);
      }
      revalidatePath("/admin/artworks");
      revalidatePath("/admin/orders");
    }
  }

  return Response.json({ received: true });
}
