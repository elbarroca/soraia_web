import { HeroSection } from "@/components/features/hero-section";
import { CategoryGrid } from "@/components/features/category-grid";
import { ArtistStatement } from "@/components/features/artist-statement";
import { NewsletterSection } from "@/components/features/newsletter-section";
import { mockSettings, mockArtworks } from "@/lib/mock-data";

export default function HomePage() {
  const settings = mockSettings;
  const featuredArtwork = mockArtworks.find((a) => a.isFeatured && a.isVisible);

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
