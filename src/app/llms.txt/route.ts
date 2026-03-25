import { db } from "@/db";
import { artworks } from "@/db/schema";
import { eq, count, sql } from "drizzle-orm";

export async function GET() {
  let totalCount = 0;
  let categoryLines = "";

  try {
    const [countResult] = await db
      .select({ value: count() })
      .from(artworks)
      .where(eq(artworks.isVisible, true));
    totalCount = countResult.value;

    const categoryCounts = await db
      .select({
        category: artworks.category,
        count: count(),
      })
      .from(artworks)
      .where(eq(artworks.isVisible, true))
      .groupBy(artworks.category)
      .orderBy(sql`count(*) desc`);

    categoryLines = categoryCounts
      .map((c) => `- ${formatCategory(c.category)} (${c.count} works)`)
      .join("\n");
  } catch {
    categoryLines = [
      "- Photography — Fine art prints on archival papers, limited editions",
      "- Artist Proofs — Rare, uniquely annotated proofs from limited edition series",
      "- Drawings — Original works in graphite, charcoal, and ink on cotton paper",
      "- Jewelry — Wearable sculptures in sterling silver, handcrafted by the artist",
    ].join("\n");
  }

  const content = `# Soraia Oliveira

> Visual artist based in Guimarães, Portugal. Working across self-portraiture, photography, drawing, and wearable sculpture.

## Pages

- [Home](https://soraia-oliveira.com/) — Featured artwork, category grid, and artist statement
- [Artworks](https://soraia-oliveira.com/artworks) — Full catalog (${totalCount} works) with category filtering
- [About](https://soraia-oliveira.com/about) — Artist biography, identity, and exhibition history (CV)
- [Soraia Space](https://soraia-oliveira.com/soraia-space) — Studio information, appointment booking, and press
- [Contact](https://soraia-oliveira.com/contact) — Inquiries and commissions

## Artwork Categories

${categoryLines}

## About the Artist

Soraia Oliveira is a multidisciplinary visual artist based in Guimarães, Portugal. Her practice revolves around the body as a site of meaning — through self-portraiture, photography, and drawing, she explores the ways we inhabit, perform, and transform ourselves.

## Contact

- Email: info@soraia-oliveira.com
- Instagram: @soraiaoliveira.art
- Studio: Guimarães, Portugal (visits by appointment)

## Technical

- Artworks are available for purchase via Stripe checkout
- Price-on-request items can be inquired about via the contact form
- All artwork images are high-resolution with detailed metadata
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}

function formatCategory(slug: string): string {
  const map: Record<string, string> = {
    photography: "Photography — Fine art prints on archival papers, limited editions",
    "artist-proofs": "Artist Proofs — Rare, uniquely annotated proofs from limited edition series",
    drawings: "Drawings — Original works in graphite, charcoal, and ink on cotton paper",
    jewelry: "Jewelry — Wearable sculptures in sterling silver, handcrafted by the artist",
  };
  return map[slug] ?? slug;
}
