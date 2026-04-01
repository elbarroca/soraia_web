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

  const newest =
    [...artworks]
      .sort((a, b) => parseInt(b.year ?? "0", 10) - parseInt(a.year ?? "0", 10))
      .find((a) => a.images.length > 0) ?? null;

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
      label: "drawings",
      href: "/artworks?cat=drawings",
      artwork: byCategory("drawings"),
    },
    {
      label: "new in",
      href: "/artworks?sort=newest",
      artwork: newest,
    },
  ];

  return (
    <Section>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
        {tiles.map((tile, i) => {
          const img =
            tile.artwork?.images.find((im) => im.isPrimary) ??
            tile.artwork?.images[0];

          return (
            <FadeIn key={tile.href} delay={i * 0.08}>
              <Link href={tile.href} className="group flex items-stretch">
                {/* Image */}
                <div className="relative overflow-hidden flex-1 aspect-[3/4] bg-[var(--color-surface-dim)]">
                  {img && (
                    <Image
                      src={img.url}
                      alt={img.altText || tile.artwork?.title || tile.label}
                      fill
                      className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.015]"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                  )}
                </div>
                {/* Label — vertical, right side */}
                <div className="w-6 flex items-center justify-center flex-shrink-0">
                  <span className="block -rotate-90 whitespace-nowrap text-[11px] font-semibold tracking-[0.08em] text-[var(--color-ink)] group-hover:underline underline-offset-4 decoration-1">
                    {tile.label} →
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
