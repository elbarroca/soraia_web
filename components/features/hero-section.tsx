"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  statement: string;
  tagline: string;
  featuredImage?: string;
};

export function HeroSection({ statement, tagline, featuredImage }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : 1;

  return (
    <section className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--space-page-x)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="space-y-8 lg:space-y-10">
            <motion.p
              className="label text-[var(--color-ink-muted)]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 * d, delay: 0.1 * d }}
            >
              Visual Artist
            </motion.p>

            <motion.h1
              className="heading-display"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 * d, delay: 0.2 * d, ease: [0.22, 1, 0.36, 1] }}
            >
              {statement}
            </motion.h1>

            <motion.p
              className="text-lg md:text-xl text-[var(--color-ink-light)] max-w-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 * d, delay: 0.5 * d }}
            >
              {tagline}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 * d, delay: 0.7 * d }}
            >
              <Link
                href="/artworks"
                className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 text-sm font-semibold tracking-[0.05em] uppercase transition-all hover:bg-[var(--color-accent-hover)] active:scale-[0.98] group"
              >
                View Artworks
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 border border-[var(--color-border-strong)] px-8 py-4 text-sm font-semibold tracking-[0.05em] uppercase transition-all hover:border-[var(--color-ink)] hover:bg-[var(--color-surface-dim)]"
              >
                About the Artist
              </Link>
            </motion.div>
          </div>

          {/* Image side */}
          <motion.div
            className="relative aspect-[3/4] lg:aspect-[4/5] bg-[var(--color-surface-dim)] overflow-hidden"
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 * d, delay: 0.4 * d, ease: [0.22, 1, 0.36, 1] }}
          >
            {featuredImage ? (
              <Image
                src={featuredImage}
                alt="Featured artwork by Soraia Oliveira"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[var(--color-ink-muted)]">
                <span className="label">Featured Artwork</span>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
