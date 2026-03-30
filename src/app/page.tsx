import { HeroSection } from "@/components/features/hero-section";
import { FeaturedArtworks } from "@/components/features/featured-artworks";
import { ArtistStatement } from "@/components/features/artist-statement";
import { StudioBanner } from "@/components/features/collector-banner";
import { NewsletterSection } from "@/components/features/newsletter-section";
import { getSettings, getVisibleArtworks } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";
import { mockArtworks } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [settings, dbArtworks] = await Promise.all([
    getSettings(),
    getVisibleArtworks(),
  ]);

  const featuredId = settings.featured_artwork_id
    ? parseInt(settings.featured_artwork_id, 10)
    : undefined;

  const artworks =
    dbArtworks.length > 0
      ? dbArtworks.map((a) => toPublicArtwork(a, featuredId))
      : mockArtworks;

  const featuredArtwork = artworks.find((a) => a.isFeatured && a.isVisible);
  const heroImage = featuredArtwork?.images?.[0]?.url ?? "/images/hero-featured.png";

  // Featured artworks: prioritize those marked as featured, then first visible
  const featured = artworks
    .filter((a) => a.isVisible && !a.isSold)
    .sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured))
    .slice(0, 4);

  return (
    <>
      <HeroSection
        statement={settings.hero_statement}
        tagline={settings.hero_tagline}
        featuredImage={heroImage}
      />
      <FeaturedArtworks artworks={featured} />
      <ArtistStatement
        line1="Multidisciplinary artist working across photography and drawing."
        line2="Creating and exploring through the body, self-portraiture and transformation."
      />
      <StudioBanner />
      <NewsletterSection />
    </>
  );
}
