import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AboutBio } from "@/components/features/about-bio";
import { AboutIdentity } from "@/components/features/about-identity";
import { AboutOrigin } from "@/components/features/about-origin";
import { EducationTimeline } from "@/components/features/education-timeline";
import { FadeIn } from "@/components/shared/fade-in";
import { getSettings } from "@/lib/queries";
import { artistPersonJsonLd } from "@/lib/structured-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Soraia Oliveira — multidisciplinary visual artist based in Guimarães, Portugal.",
};

export default async function AboutPage() {
  const settings = await getSettings();

  let bioParagraphs: string[] = [];
  let identityWords: string[] = [];
  try {
    if (settings.about_bio) bioParagraphs = JSON.parse(settings.about_bio);
  } catch { /* invalid JSON in DB — use empty */ }
  try {
    if (settings.about_identity) identityWords = JSON.parse(settings.about_identity);
  } catch { /* invalid JSON in DB — use empty */ }

  return (
    <>
      <Section className="pt-20 md:pt-28">
        <AboutBio intro={settings.about_intro ?? ""} paragraphs={bioParagraphs} />
      </Section>

      <Section className="bg-[var(--color-surface-dim)]">
        <EducationTimeline />
      </Section>

      <AboutIdentity words={identityWords} />

      <Section>
        <AboutOrigin />
      </Section>

      {/* "Let's talk" CTA */}
      <Section>
        <FadeIn>
          <Link href="/contact" className="group block">
            <div className="flex items-end justify-between gap-8">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                    Contact
                  </p>
                </div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.0] tracking-tight text-[var(--color-ink)]">
                  More questions?
                </h2>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-[1.0] tracking-tight text-[var(--color-ink)] ml-[20%] md:ml-[30%]">
                  Let&apos;s talk!
                </h2>
              </div>
              <div className="hidden sm:block flex-shrink-0 mb-2">
                <div className="relative w-16 h-16 md:w-20 md:h-20 border-2 border-[var(--color-ink)] flex items-center justify-center group-hover:bg-[var(--color-ink)] transition-colors duration-300">
                  <ArrowRight size={24} className="rotate-45 group-hover:rotate-0 text-[var(--color-ink)] group-hover:text-white transition-all duration-300" />
                </div>
              </div>
            </div>
          </Link>
        </FadeIn>
      </Section>

      {/* Closing CTA */}
      <Section className="pb-24 md:pb-32">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              What&apos;s Next
            </p>
            <h2 className="heading-editorial text-[var(--color-ink)]">
              Every piece holds a story
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
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
        </FadeIn>
      </Section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(artistPersonJsonLd()),
        }}
      />
    </>
  );
}
