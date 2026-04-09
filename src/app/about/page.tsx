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
      <Section className="pt-14 md:pt-20 pb-24 md:pb-32">
        <AboutBio intro={settings.about_intro ?? ""} paragraphs={bioParagraphs} />
      </Section>

      <Section className="bg-[var(--color-surface-dim)] py-24 md:py-32">
        <EducationTimeline />
      </Section>

      <AboutIdentity words={identityWords} />

      <Section className="py-24 md:py-32">
        <AboutOrigin />
      </Section>

      {/* "Let's talk" CTA */}
      <Section className="pb-28 md:pb-36">
        <FadeIn>
          <Link href="/contact" className="group block">
            <div className="flex flex-col">
              <div className="mb-4">
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                  ( Contact )
                </p>
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[1.0] tracking-tight text-[var(--color-ink)]">
                More questions?
              </h2>
              <div className="flex items-center ml-[20%] sm:ml-[40%] md:ml-[50%] mt-1">
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase leading-[1.0] tracking-tight text-[var(--color-ink)] whitespace-nowrap">
                  Let&apos;s talk!
                </h2>
                <div className="hidden sm:flex flex-1 justify-center items-center">
                  <div className="relative w-12 h-12 md:w-14 md:h-14 lg:w-16 lg:h-16 flex items-center justify-center group-hover:opacity-70 transition-opacity duration-300">
                    <span className="absolute top-0 left-0 w-3.5 h-3.5 border-t-2 border-l-2 border-[var(--color-ink)]" />
                    <span className="absolute top-0 right-0 w-3.5 h-3.5 border-t-2 border-r-2 border-[var(--color-ink)]" />
                    <span className="absolute bottom-0 left-0 w-3.5 h-3.5 border-b-2 border-l-2 border-[var(--color-ink)]" />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 border-b-2 border-r-2 border-[var(--color-ink)]" />
                    <ArrowRight size={20} className="rotate-45 text-[var(--color-ink)] transition-transform duration-300 group-hover:rotate-0" />
                  </div>
                </div>
              </div>
            </div>
          </Link>
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
