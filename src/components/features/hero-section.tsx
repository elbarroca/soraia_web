"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type HeroSectionProps = {
  statement?: string;
  tagline?: string;
  featuredImage?: string;
};

export function HeroSection({ featuredImage }: HeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();
  const d = prefersReducedMotion ? 0 : 1;

  return (
    <section className="min-h-[calc(100vh-var(--header-h))] md:min-h-[calc(100vh-var(--header-h-md))] flex items-center py-10 md:py-24 overflow-hidden">
      <div className="mx-auto w-full max-w-[var(--max-width)] px-[var(--space-page-x)] py-6 md:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-4 items-center">
          
          {/* Desktop Left Column & Mobile Top Text */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="space-y-8 lg:space-y-12">
              {/* Animated label */}
              <motion.div
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 * d, delay: 0.1 * d }}
              >
                <span className="block h-px w-12 bg-[var(--color-ink)]" aria-hidden="true" />
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                  Visual Artist — Portugal
                </p>
              </motion.div>
    
              <motion.h1
                className="heading-display leading-[1.0] tracking-[-0.015em]"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 * d, delay: 0.25 * d, ease: [0.22, 1, 0.36, 1] }}
              >
                Soraia Oliveira
              </motion.h1>
    
              <motion.p
                className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed max-w-xs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 * d, delay: 0.5 * d }}
              >
                Self-portraiture, photography and drawing, exploring experimental printing and performance.
              </motion.p>
            </div>

            {/* Desktop Buttons */}
            <motion.div
              className="hidden lg:block mt-8 lg:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 * d, delay: 0.75 * d }}
            >
              <div className="flex items-start gap-6 text-left max-w-full">
                <Link
                  href="/artworks"
                  className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] transition-[color,transform] duration-500 hover:text-[var(--color-ink-light)] hover:scale-[1.02]"
                >
                  Explore Work
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/soraia-space"
                  className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] transition-[color,transform] duration-500 hover:text-[var(--color-ink-light)] hover:scale-[1.02]"
                >
                  Book a Studio Visit
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Image */}
          <motion.div
            className="relative lg:col-span-6 lg:col-start-7 lg:row-span-2 overflow-hidden"
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 * d, delay: 0.2 * d, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative mx-auto w-full max-w-[min(100%,420px)] lg:max-w-none">
              {featuredImage ? (
                <Image
                  src={featuredImage}
                  alt="Featured artwork by Soraia Oliveira"
                  width={1200}
                  height={1200}
                  className="w-full h-auto object-contain"
                  priority
                  sizes="(max-width: 1024px) 92vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 bg-[var(--color-surface-dim)] flex items-center justify-center text-[var(--color-ink-muted)]">
                  <span className="label">Featured Artwork</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Mobile Buttons */}
          <motion.div
            className="lg:hidden mt-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 * d, delay: 0.75 * d }}
          >
            <div className="flex flex-col items-start gap-6 text-left w-full">
              <Link
                href="/artworks"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] transition-[color,transform] duration-500 hover:text-[var(--color-ink-light)] hover:scale-[1.02]"
              >
                Explore Work
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/soraia-space"
                className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] transition-[color,transform] duration-500 hover:text-[var(--color-ink-light)] hover:scale-[1.02]"
              >
                Book a Studio Visit
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
