import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { FadeIn } from "@/components/shared/fade-in";
import type { Artwork } from "@/lib/types";

type CategoryTile = {
  label: string;
  href: string;
  artwork: Artwork | null;
};

type FeaturedArtworksProps = {
  artworks: Artwork[];
};

export function FeaturedArtworks({ artworks }: FeaturedArtworksProps) {
  if (artworks.length === 0) return null;

  const byCategory = (cat: Artwork["category"]) =>
    artworks.find((a) => a.category === cat && a.images.length > 0) ?? null;

  const tiles: CategoryTile[] = [
    {
      label: "all artworks",
      href: "/artworks",
      artwork: artworks.find((a) => a.images.length > 0) ?? null,
    },
    {
      label: "photography",
      href: "/artworks?cat=photography",
      artwork: byCategory("photography"),
    },
    {
      label: "artist proofs",
      href: "/artworks?cat=artist-proofs",
      artwork: byCategory("artist-proofs"),
    },
    {
      label: "drawings",
      href: "/artworks?cat=drawings",
      artwork: byCategory("drawings"),
    },
  ];

  return (
    <Section>
      {/* Header row: title + View artworks link */}
      <div className="flex items-end justify-between mb-8">
        <FadeIn>
          <h2 className="text-2xl md:text-3xl font-semibold tracking-[-0.02em] uppercase text-[var(--color-ink)]">
            Artworks
          </h2>
        </FadeIn>
        <FadeIn delay={0.06}>
          <Link
            href="/artworks"
            className="text-[12px] font-medium tracking-[0.08em] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300 bg-[var(--color-surface-dim)] px-4 py-2"
          >
            View artworks &rarr;
          </Link>
        </FadeIn>
      </div>

      {/* Tile grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {tiles.map((tile, i) => {
          const img =
            tile.artwork?.images.find((im) => im.isPrimary) ??
            tile.artwork?.images[0];

          return (
            <FadeIn key={tile.href} delay={i * 0.08}>
              <Link href={tile.href} className="group block">
                {/* Image with overlaid label */}
                <div className="relative overflow-hidden aspect-[3/4] bg-[var(--color-surface-dim)]">
                  {img && (
                    <Image
                      src={img.url}
                      alt={img.altText || tile.artwork?.title || tile.label}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                  {/* Label — overlaid at bottom-right of image */}
                  <span className="absolute bottom-3 right-3 whitespace-nowrap text-[13px] md:text-[15px] font-semibold tracking-[0.04em] text-white drop-shadow-md group-hover:underline underline-offset-4 decoration-1">
                    {tile.label} &rarr;
                  </span>
                </div>
              </Link>
            </FadeIn>
          );
        })}
      </div>
    </Section>
  );
}
