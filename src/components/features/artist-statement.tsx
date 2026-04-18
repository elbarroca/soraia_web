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
    <Section>
      <FadeIn>
        <div className="flex items-center gap-4 mb-10">
          <span className="block h-px w-10 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            About the Artist
          </p>
        </div>
      </FadeIn>

      {/* Mobile: line1 → image → line2; lg: three-column row */}
      <div className="flex flex-col lg:grid lg:grid-cols-3 gap-10 lg:gap-12 lg:items-center">
        <FadeIn>
          <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-[#000] whitespace-pre-line">
            {line1}
          </p>
        </FadeIn>

        <FadeIn delay={0.1} className="flex justify-center order-2 lg:order-none">
          <div className="relative aspect-square w-full max-w-[220px] md:max-w-[280px] lg:max-w-[380px] overflow-hidden">
            <Image
              src="/images/about/silhouette.png"
              alt="Soraia Oliveira — studio work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 75vw, 380px"
            />
          </div>
        </FadeIn>

        <FadeIn delay={0.2} className="order-3 lg:order-none">
          <div className="space-y-6 text-left lg:text-right">
            <p className="text-xl md:text-2xl lg:text-3xl font-bold leading-snug text-[#000] whitespace-pre-line">
              {line2}
            </p>
            {credentialLine && (
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.7] lg:ml-0">
                {credentialLine}
              </p>
            )}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300 lg:ml-auto"
            >
              About
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}
