"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

export function AboutOrigin() {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-16 lg:items-center">
      <FadeIn className="order-last lg:order-none">
        <div className="relative aspect-square max-w-[240px] md:max-w-md lg:max-w-none lg:aspect-[4/3] mx-auto lg:mx-0 overflow-hidden bg-[var(--color-surface-dim)]">
          <Image
            src="/change2.png"
            alt="Soraia observing artwork in a gallery"
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-[1.1] text-[var(--color-ink)]">
            How did it all started?
          </h2>
          <div className="space-y-4 text-[var(--color-ink-light)] leading-relaxed">
            <p>
              It began with curiosity, but became more serious in 2019, when I started experimenting with fine arts and later with photography.
            </p>
            <p>
              What began as an intuitive practice quickly turned into a need to tell stories. Photography became a way to explore places, perform within them, and use the body as a tool for observation and presence.
            </p>
            <p>
              Through self-portraiture and experimentation, this research expanded into performance, drawing, and material processes, shaping a practice where intuition becomes method and the body remains central.
            </p>
          </div>

          {/* What's Next CTA — right-aligned on small screens */}
          <div className="pt-4 space-y-4 text-right sm:text-left">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              What&apos;s Next
            </p>
            <div className="flex flex-col sm:flex-row items-end sm:items-start gap-6 ml-auto sm:ml-0 max-w-full">
              <Link
                href="/artworks"
                className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
              >
                Explore the Work
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/soraia-space"
                className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
              >
                Book a Studio Visit
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </FadeIn>
    </div>
  );
}
