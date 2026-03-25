"use client";

import Link from "next/link";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

const CATEGORIES = [
  {
    slug: "photography",
    title: "Photography",
    subtitle: "Self-portraiture & fine art prints",
    span: "col-span-1 md:col-span-2 aspect-[16/10]",
  },
  {
    slug: "drawings",
    title: "Drawings",
    subtitle: "Charcoal, graphite & ink on paper",
    span: "col-span-1 aspect-[3/4] md:aspect-auto",
  },
  {
    slug: "artist-proofs",
    title: "Artist Proofs",
    subtitle: "Rare annotated editions",
    span: "col-span-1 aspect-[3/4] md:aspect-auto",
  },
  {
    slug: "jewelry",
    title: "Jewelry",
    subtitle: "Wearable sculpture in silver",
    span: "col-span-1 md:col-span-2 aspect-[16/10]",
  },
];

export function CategoryGrid() {
  return (
    <Section>
      <FadeIn>
        <div className="flex items-baseline justify-between mb-10">
          <h2 className="heading-1">Explore by Category</h2>
          <Link
            href="/artworks"
            className="label text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors hidden sm:block"
          >
            View all &rarr;
          </Link>
        </div>
      </FadeIn>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATEGORIES.map((cat, i) => (
          <FadeIn key={cat.slug} delay={i * 0.1}>
            <Link
              href={`/artworks?cat=${cat.slug}`}
              className={`group relative block overflow-hidden bg-[var(--color-surface-dim)] ${cat.span}`}
            >
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

              {/* Placeholder bg */}
              <div className="absolute inset-0 bg-[var(--color-ink)] opacity-10 transition-transform duration-500 group-hover:scale-[1.03]" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-20">
                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight">
                  {cat.title}
                </h3>
                <p className="text-white/70 text-sm mt-1">{cat.subtitle}</p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
