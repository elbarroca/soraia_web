import { HeroSection } from "@/components/features/hero-section";
import { CategoryGrid } from "@/components/features/category-grid";
import { ArtistStatement } from "@/components/features/artist-statement";
import { NewsletterSection } from "@/components/features/newsletter-section";
import { getSettings } from "@/lib/queries";
import { getVisibleArtworks } from "@/lib/queries";
import { toPublicArtwork } from "@/lib/mappers";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const settings = await getSettings();
  const dbArtworks = await getVisibleArtworks();
  const featuredId = settings.featured_artwork_id
    ? parseInt(settings.featured_artwork_id, 10)
    : undefined;
  const artworks = dbArtworks.map((a) => toPublicArtwork(a, featuredId));
  const featuredArtwork = artworks.find((a) => a.isFeatured && a.isVisible);

  return (
    <>
      <HeroSection
        statement={settings.hero_statement}
        tagline={settings.hero_tagline}
        featuredImage={featuredArtwork?.images?.[0]?.url}
      />
      <CategoryGrid />
      <ArtistStatement
        line1="Multidisciplinary artist working across photography and drawing."
        line2="Creating and exploring through the body, self-portraiture and transformation."
      />
      <NewsletterSection />
    </>
  );
}
