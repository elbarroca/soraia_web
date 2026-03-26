import { HeroSection } from "@/components/features/hero-section";
import { SocialProofBar } from "@/components/features/social-proof-bar";
import { FeaturedArtworks } from "@/components/features/featured-artworks";
import { CategoryGrid } from "@/components/features/category-grid";
import { ArtistStatement } from "@/components/features/artist-statement";
import { CollectorBanner } from "@/components/features/collector-banner";
import { NewsletterSection } from "@/components/features/newsletter-section";
import { getSettings, getVisibleArtworks, getVisibleExhibitions } from "@/lib/queries";
import { toPublicArtwork, toPublicExhibition } from "@/lib/mappers";
import { mockArtworks, mockExhibitions } from "@/lib/mock-data";
import type { Artwork } from "@/lib/types";

export const dynamic = "force-dynamic";

function getUniqueVenues(exhibitions: { location: string }[]): string[] {
  const seen = new Set<string>();
  const venues: string[] = [];
  for (const e of exhibitions) {
    // Extract venue name (before the comma if present)
    const venue = e.location.split(",")[0].trim();
    const normalized = venue.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    if (!seen.has(venue) && normalized !== "guimaraes") {
      seen.add(venue);
      venues.push(venue);
    }
  }
  return venues;
}

function getCategoryCounts(artworks: Artwork[]): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const a of artworks) {
    if (a.isVisible) {
      counts[a.category] = (counts[a.category] ?? 0) + 1;
    }
  }
  return counts;
}

export default async function HomePage() {
  const [settings, dbArtworks, dbExhibitions] = await Promise.all([
    getSettings(),
    getVisibleArtworks(),
    getVisibleExhibitions(),
  ]);

  const featuredId = settings.featured_artwork_id
    ? parseInt(settings.featured_artwork_id, 10)
    : undefined;

  const artworks =
    dbArtworks.length > 0
      ? dbArtworks.map((a) => toPublicArtwork(a, featuredId))
      : mockArtworks;

  const exhibitions =
    dbExhibitions.length > 0
      ? dbExhibitions.map(toPublicExhibition)
      : mockExhibitions;

  const featuredArtwork = artworks.find((a) => a.isFeatured && a.isVisible);
  const heroImage = featuredArtwork?.images?.[0]?.url ?? "/images/hero-featured.png";

  // Featured artworks: prioritize those marked as featured, then first visible
  const featured = artworks
    .filter((a) => a.isVisible && !a.isSold)
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    .slice(0, 4);

  const venues = getUniqueVenues(exhibitions);
  const categoryCounts = getCategoryCounts(artworks);

  return (
    <>
      <HeroSection
        statement={settings.hero_statement}
        tagline={settings.hero_tagline}
        featuredImage={heroImage}
      />
      <SocialProofBar venues={venues} />
      <FeaturedArtworks artworks={featured} />
      <CategoryGrid counts={categoryCounts} />
      <ArtistStatement
        line1="Multidisciplinary artist working across photography and drawing."
        line2="Creating and exploring through the body, self-portraiture and transformation."
        credentialLine="Trained across Portugal and Italy. Exhibited at Museu Alberto Sampaio, Culturgest."
      />
      <CollectorBanner />
      <NewsletterSection />
    </>
  );
}
