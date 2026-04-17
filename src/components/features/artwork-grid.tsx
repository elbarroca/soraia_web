"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ArtworkCard } from "./artwork-card";
import { ArtworkFilter } from "./artwork-filter";
import { FadeIn } from "@/components/shared/fade-in";
import type { Artwork } from "@/lib/types";

type ArtworkGridProps = {
  artworks: Artwork[];
};

const CATEGORY_INTROS: Record<string, { title: string; description: string }> = {
  photography: {
    title: "Photography",
    description: "Photography and self-portraiture exploring identity, presence, and the body through performance and experimentation.",
  },
  drawings: {
    title: "Drawings",
    description: "Works in charcoal, graphite, and other media where gesture and thought take form.",
  },
  "artist-proofs": {
    title: "Artist Proofs",
    description: "A space for testing, where each work takes a different direction before the final artwork.",
  },
  jewelry: {
    title: "Jewelry",
    description: "Handcrafted pieces where sculpture meets adornment.",
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

const VALID_SORTS: SortOption[] = ["curated", "price-asc", "price-desc", "newest"];

export function ArtworkGrid({ artworks }: ArtworkGridProps) {
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("cat") || "all";
  const sortParam = searchParams.get("sort") as SortOption | null;
  const initialSort: SortOption =
    sortParam && VALID_SORTS.includes(sortParam) ? sortParam : "curated";
  const [sort, setSort] = useState<SortOption>(initialSort);

  const filtered =
    activeCategory === "all"
      ? artworks.filter((a) => a.category !== "jewelry")
      : artworks.filter((a) => a.category === activeCategory);

  const sorted = sortArtworks(filtered, sort);
  const categoryIntro = activeCategory !== "all" ? CATEGORY_INTROS[activeCategory] : null;

  return (
    <>
      {/* Filter tabs + sort */}
      <ArtworkFilter sort={sort} onSortChange={setSort} />

      {/* Category intro */}
      {categoryIntro && (
        <div className="mb-8">
          <FadeIn key={activeCategory}>
            <div className="max-w-lg">
              <p className="text-[14px] text-[var(--color-ink-light)] leading-[1.75] tracking-[0.01em]">
                {categoryIntro.description}
              </p>
            </div>
          </FadeIn>
        </div>
      )}

      {sorted.length === 0 ? (
        <div className="py-24 text-center">
          <p className="text-[var(--color-ink-muted)]">No artworks in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10 sm:gap-x-8 sm:gap-y-14">
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
