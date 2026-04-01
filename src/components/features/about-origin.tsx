"use client";

import Image from "next/image";
import { FadeIn } from "@/components/shared/fade-in";

export function AboutOrigin() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      <FadeIn>
        <div className="relative aspect-[4/3] overflow-hidden bg-[var(--color-surface-dim)]">
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
        </div>
      </FadeIn>
    </div>
  );
}
