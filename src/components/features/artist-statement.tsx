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

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-8 items-center">
        {/* Left text */}
        <FadeIn className="lg:col-span-1">
          <p className="text-2xl md:text-3xl font-bold leading-snug text-[var(--color-ink)]">
            {line1}
          </p>
        </FadeIn>

        {/* Center image */}
        <FadeIn delay={0.1} className="lg:col-span-3 flex justify-center">
          <div className="relative aspect-square w-full max-w-[380px] overflow-hidden">
            <Image
              src="/images/about/silhouette.png"
              alt="Soraia Oliveira — studio work"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 80vw, 380px"
            />
          </div>
        </FadeIn>

        {/* Right text */}
        <FadeIn delay={0.2} className="lg:col-span-1">
          <div className="space-y-6 text-right">
            <p className="text-2xl md:text-3xl font-bold leading-snug text-[var(--color-ink)]">
              {line2}
            </p>
            {credentialLine && (
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-[1.7]">
                {credentialLine}
              </p>
            )}
            <Link
              href="/about"
              className="group inline-flex items-center gap-3 text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300 ml-auto"
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
