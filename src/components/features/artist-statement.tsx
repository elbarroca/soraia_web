"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

type ArtistStatementProps = {
  line1: string;
  line2: string;
  credentialLine?: string;
};

export function ArtistStatement({ line1, line2, credentialLine }: ArtistStatementProps) {
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
              <span className="block h-px w-10 bg-[var(--color-ink-muted)]" aria-hidden="true" />
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                About the Artist
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.1}>
            <blockquote className="heading-editorial text-[var(--color-ink)]">
              &ldquo;{line1}&rdquo;
            </blockquote>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7] max-w-lg">
              {line2}
            </p>
          </FadeIn>
          {credentialLine && (
            <FadeIn delay={0.25}>
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.7]">
                {credentialLine}
              </p>
            </FadeIn>
          )}
          <FadeIn delay={0.3}>
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
            >
              Read more about Soraia
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
