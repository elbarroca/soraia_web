"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  statement: string;
  tagline?: string;
  featuredImage?: string;
};

export function HeroSection({ statement, featuredImage }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : 1;

  return (
    <section className="min-h-[calc(100vh-var(--header-h))] md:min-h-[calc(100vh-var(--header-h-md))] flex items-center overflow-hidden">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)] py-12 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          {/* Image side */}
          <motion.div
            className="relative lg:col-span-6 lg:col-start-7 overflow-hidden order-first lg:order-last"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 * d, delay: 0.2 * d, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt="Featured artwork by Soraia Oliveira"
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--color-surface-dim)] flex items-center justify-center text-[var(--color-ink-muted)]">
                  <span className="label">Featured Artwork</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text side */}
          <div className="lg:col-span-5 space-y-8 lg:space-y-12 order-last lg:order-first">
            {/* Animated label */}
            <motion.div
              className="flex items-center gap-4"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 * d, delay: 0.1 * d }}
            >
              <span className="block h-px w-12 bg-[var(--color-ink)]" aria-hidden="true" />
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                Visual Artist — Images — Portugal
              </p>
            </motion.div>

            {/* Statement — monumental */}
            <motion.h1
              className="heading-display leading-[1.0] tracking-[-0.015em]"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 * d, delay: 0.25 * d, ease: [0.22, 1, 0.36, 1] }}
            >
              {statement}
            </motion.h1>

            {/* Single, understated CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 * d, delay: 0.75 * d }}
            >
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <Link
                  href="/artworks"
                  className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink)] transition-colors duration-300 hover:text-[var(--color-ink-light)]"
                >
                  Explore Work
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/soraia-space"
                  className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] transition-colors duration-300 hover:text-[var(--color-ink)]"
                >
                  Book a Studio Visit
                  <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
