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
    <section className="min-h-[calc(100vh-4rem)] md:min-h-[calc(100vh-5rem)] flex items-center overflow-hidden">
      <div className="mx-auto w-full max-w-[1440px] px-[var(--space-page-x)] py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
          {/* Image side — renders first in DOM on mobile */}
          <motion.div
            className="relative lg:col-span-6 lg:col-start-7 overflow-hidden order-first lg:order-last"
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 * d, delay: 0.2 * d, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative aspect-[3/4] lg:aspect-[4/5]">
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
                <div className="absolute inset-0 bg-[var(--color-surface-dim)] flex items-center justify-center text-[var(--color-ink-muted)]">
                  <span className="label">Featured Artwork</span>
                </div>
              )}
              {/* Thin accent border on left edge */}
              <div className="absolute left-0 top-[10%] bottom-[10%] w-px bg-[var(--color-ink)]/20 hidden lg:block" />
            </div>
          </motion.div>

          {/* Text side */}
          <div className="lg:col-span-5 space-y-8 lg:space-y-10 order-last lg:order-first">
            {/* Animated label */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 * d, delay: 0.1 * d }}
            >
              <span className="block h-px w-10 bg-[var(--color-ink)]" aria-hidden="true" />
              <p className="label tracking-[0.15em] text-[var(--color-ink-muted)]">Visual Artist</p>
            </motion.div>

            <div className="space-y-2">
              <motion.h1
                className="heading-display"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 * d, delay: 0.25 * d, ease: [0.22, 1, 0.36, 1] }}
              >
                {statement}
              </motion.h1>
            </div>

            <motion.p
              className="text-base md:text-lg text-[var(--color-ink-light)] max-w-md leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 * d, delay: 0.5 * d }}
            >
              {tagline}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-3 pt-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 * d, delay: 0.7 * d }}
            >
              <Link
                href="/artworks"
                className="inline-flex items-center justify-center gap-2 bg-[var(--color-accent)] text-white px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase transition-all hover:bg-[var(--color-accent-hover)] active:scale-[0.98] group"
              >
                View Artworks
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/about"
                className="inline-flex items-center justify-center gap-2 border border-[var(--color-border-strong)] px-8 py-4 text-xs font-semibold tracking-[0.1em] uppercase transition-all hover:border-[var(--color-ink)] hover:bg-[var(--color-surface-dim)]"
              >
                About the Artist
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
