import { stripe } from "@/lib/stripe";
import { getArtworkById } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";

export async function POST(req: Request) {
  try {
    const { artworkId } = await req.json();
    const id = parseInt(artworkId, 10);
    if (isNaN(id)) {
      return Response.json({ error: "Invalid artwork ID" }, { status: 400 });
    }

    const dbArtwork = await getArtworkById(id);
    if (!dbArtwork || !dbArtwork.isVisible) {
      return Response.json({ error: "Artwork not found" }, { status: 404 });
    }

    const artwork = toPublicArtwork(dbArtwork);
    if (artwork.isSold || !artwork.priceCents) {
      return Response.json({ error: "Not available for purchase" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: {
              name: artwork.title,
              images: artwork.images[0]?.url ? [artwork.images[0].url] : [],
              description: [artwork.medium, artwork.dimensions, artwork.edition]
                .filter(Boolean)
                .join(" · "),
            },
            unit_amount: artwork.priceCents,
          },
          quantity: 1,
        },
      ],
      metadata: {
        artworkId: String(dbArtwork.id),
        artworkSlug: artwork.slug,
      },
      shipping_address_collection: {
        allowed_countries: ["PT", "ES", "FR", "DE", "IT", "GB", "US", "NL", "BE"],
      },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/artworks/${artwork.slug}?success=true`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/artworks/${artwork.slug}`,
    });

    return Response.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return Response.json({ error: "Checkout failed" }, { status: 500 });
  }
}
