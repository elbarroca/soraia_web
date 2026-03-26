"use client";

import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

type Category = {
  slug: string;
  title: string;
  subtitle: string;
  image: string;
  // wide = spans 2 of 3 cols on desktop, narrow = spans 1
  wide: boolean;
};

const CATEGORIES: Category[] = [
  {
    slug: "photography",
    title: "Photography",
    subtitle: "Self-portraiture & fine art prints",
    image: "/images/artworks/shared-my-soul.png",
    wide: true,
  },
  {
    slug: "drawings",
    title: "Drawings",
    subtitle: "Charcoal, graphite & ink on paper",
    image: "/images/artworks/dopamine.jpg",
    wide: false,
  },
  {
    slug: "artist-proofs",
    title: "Artist Proofs",
    subtitle: "Rare annotated editions",
    image: "/images/artworks/refugio-ap.png",
    wide: false,
  },
  {
    slug: "jewelry",
    title: "Jewelry",
    subtitle: "Wearable sculpture in silver",
    image: "/images/artworks/golden-necklace.jpg",
    wide: true,
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

      {/* 3-col grid: wide cards span 2 cols, narrow span 1 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {CATEGORIES.map((cat, i) => (
          <FadeIn
            key={cat.slug}
            delay={i * 0.08}
            className={cat.wide ? "sm:col-span-2 lg:col-span-2" : "sm:col-span-1 lg:col-span-1"}
          >
            <Link
              href={`/artworks?cat=${cat.slug}`}
              className={[
                "group relative block overflow-hidden w-full h-full",
                cat.wide ? "aspect-[16/10]" : "aspect-[3/4] sm:aspect-[5/6] lg:aspect-[3/4]",
              ].join(" ")}
            >
              {/* Background image */}
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes={
                  cat.wide
                    ? "(max-width: 640px) 100vw, (max-width: 1024px) 100vw, 66vw"
                    : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                }
              />

              {/* Gradient overlay — heavier at bottom for legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              {/* Hover tint */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

              {/* Text */}
              <div className="absolute bottom-0 left-0 right-0 p-5 md:p-7">
                <h3 className="text-white text-xl md:text-2xl font-semibold tracking-tight leading-tight">
                  {cat.title}
                </h3>
                <p className="text-white/70 text-sm mt-1 translate-y-1 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  {cat.subtitle}
                </p>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}
