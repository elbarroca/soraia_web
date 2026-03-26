"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

type ArtistStatementProps = {
  line1: string;
  line2: string;
};

export function ArtistStatement({ line1, line2 }: ArtistStatementProps) {
  return (
    <Section className="bg-[var(--color-surface-dim)] overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Image accent */}
        <FadeIn className="lg:col-span-4 hidden lg:block">
          <div className="relative aspect-[3/4] overflow-hidden">
            <Image
              src="/images/about/studio-work.jpg"
              alt="Soraia Oliveira working in studio"
              fill
              className="object-cover"
              sizes="33vw"
            />
          </div>
        </FadeIn>

        {/* Statement */}
        <div className="lg:col-span-7 lg:col-start-6 space-y-8">
          <FadeIn>
            <div className="flex items-center gap-4 mb-2">
              <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
              <p className="label text-[var(--color-ink-muted)]">About the Artist</p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="text-2xl md:text-3xl font-semibold leading-snug tracking-tight text-[var(--color-ink)]">
              {line1}
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed max-w-lg">
              {line2}
            </p>
          </FadeIn>
          <FadeIn delay={0.3}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors"
            >
              Read more
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
