import { HeroSection } from "@/components/features/hero-section";
import { FeaturedArtworks } from "@/components/features/featured-artworks";
import { ArtistStatement } from "@/components/features/artist-statement";
import { StudioBanner } from "@/components/features/collector-banner";
import { StudioVideo } from "@/components/features/studio-video";
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

  const visibleArtworks = artworks.filter((a) => a.isVisible);

  return (
    <>
      <HeroSection
        statement={settings.hero_statement}
        tagline={settings.hero_tagline}
        featuredImage={heroImage}
      />
      <FeaturedArtworks artworks={visibleArtworks} />
      <ArtistStatement
        line1={"Multidisciplinary\nartist working\nacross photography\nand drawing."}
        line2={"Creating and\nexploring through\nthe body, self-portraiture\nand transformation."}
      />
      <StudioBanner />
      <StudioVideo />
      <NewsletterSection />
    </>
  );
}
