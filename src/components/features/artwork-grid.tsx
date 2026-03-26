"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArtworkCard } from "./artwork-card";
import { FadeIn } from "@/components/shared/fade-in";
import type { Artwork } from "@/lib/types";

type ArtworkGridProps = {
  artworks: Artwork[];
};

const CATEGORY_INTROS: Record<string, { title: string; description: string }> = {
  photography: {
    title: "Photography",
    description: "Self-portraiture and fine art prints exploring identity, presence, and the body as territory.",
  },
  drawings: {
    title: "Drawings",
    description: "Works in charcoal, graphite, and ink — intimate gestures captured on paper.",
  },
  "artist-proofs": {
    title: "Artist Proofs",
    description: "Rare annotated editions, each uniquely marked by the artist's hand.",
  },
  jewelry: {
    title: "Wearable Sculpture",
    description: "Handcrafted in silver, in collaboration with Sofia Arantes. Limited editions.",
  },
};

type SortOption = "curated" | "price-asc" | "price-desc" | "newest";

function sortArtworks(artworks: Artwork[], sort: SortOption): Artwork[] {
  if (sort === "curated") return artworks;

  return [...artworks].sort((a, b) => {
    if (sort === "price-asc") {
      const pa = a.priceCents ?? Infinity;
      const pb = b.priceCents ?? Infinity;
      return pa - pb;
    }
    if (sort === "price-desc") {
      const pa = a.priceCents ?? -Infinity;
      const pb = b.priceCents ?? -Infinity;
      return pb - pa;
    }
    if (sort === "newest") {
      const ya = parseInt(a.year ?? "0", 10);
      const yb = parseInt(b.year ?? "0", 10);
      return yb - ya;
    }
    return 0;
  });
}

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";
  const [sort, setSort] = useState<SortOption>("curated");

  const filtered =
    activeCategory === "all"
      ? artworks
      : artworks.filter((a) => a.category === activeCategory);

  const sorted = sortArtworks(filtered, sort);
  const categoryIntro = activeCategory !== "all" ? CATEGORY_INTROS[activeCategory] : null;

  return (
    <>
      {/* Category intro + sort controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        {categoryIntro ? (
          <FadeIn key={activeCategory}>
            <div className="max-w-lg">
              <p className="text-[14px] text-[var(--color-ink-light)] leading-[1.75] tracking-[0.01em]">
                {categoryIntro.description}
              </p>
            </div>
          </FadeIn>
        ) : (
          <div />
        )}

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SortOption)}
          className="self-end text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] bg-transparent border border-transparent hover:border-[var(--color-border)] px-2 py-1.5 focus:outline-none focus:border-[var(--color-ink)] focus:text-[var(--color-ink)] hover:text-[var(--color-ink)] transition-all duration-300 cursor-pointer appearance-none"
        >
          <option value="curated">Curated</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {sorted.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[var(--color-ink-muted)]">No artworks in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 sm:gap-x-6 sm:gap-y-10">
          {sorted.map((artwork, i) => (
            <FadeIn key={artwork.id} delay={Math.min(i * 0.05, 0.3)}>
              <ArtworkCard artwork={artwork} />
            </FadeIn>
          ))}
        </div>
      )}
    </>
  );
}
