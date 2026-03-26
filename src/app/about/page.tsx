import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout/section";
import { AboutBio } from "@/components/features/about-bio";
import { AboutIdentity } from "@/components/features/about-identity";
import { EducationTimeline } from "@/components/features/education-timeline";
import { ExhibitionList } from "@/components/features/exhibition-list";
import { CollaboratorsSection } from "@/components/features/collaborators-section";
import { PressSection } from "@/components/features/press-section";
import { FadeIn } from "@/components/shared/fade-in";
import { getSettings, getVisibleExhibitions } from "@/lib/queries";
import { toPublicExhibition } from "@/lib/mappers";
import { artistPersonJsonLd } from "@/lib/structured-data";
import { mockExhibitions } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Soraia Oliveira — multidisciplinary visual artist based in Guimarães, Portugal.",
};

export default async function AboutPage() {
  const settings = await getSettings();
  const dbExhibitions = await getVisibleExhibitions();
  const exhibitions =
    dbExhibitions.length > 0
      ? dbExhibitions.map(toPublicExhibition)
      : mockExhibitions;

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
      <Section className="pt-8 md:pt-12">
        <AboutBio intro={settings.about_intro ?? ""} paragraphs={bioParagraphs} />
      </Section>

      <Section className="bg-[var(--color-surface-dim)]">
        <EducationTimeline />
      </Section>

      <AboutIdentity words={identityWords} />

      <Section>
        <ExhibitionList exhibitions={exhibitions} />
      </Section>

      <Section className="bg-[var(--color-surface-dim)]">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <CollaboratorsSection />
          <PressSection />
        </div>
      </Section>

      {/* Closing CTA */}
      <Section className="bg-[var(--color-ink)] text-white">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-white/40">
              What&apos;s Next
            </p>
            <h2 className="heading-editorial text-white">
              The work speaks for itself
            </h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-2">
              <Link
                href="/artworks"
                className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors duration-300"
              >
                Explore the Work
                <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                href="/soraia-space"
                className="group inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em] uppercase text-white/70 hover:text-white transition-colors duration-300"
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
