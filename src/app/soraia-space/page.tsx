import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { AppointmentSection } from "@/components/features/appointment-section";
import { NewsList } from "@/components/features/news-list";
import { SpaceNav } from "@/components/features/space-nav";
import { FadeIn } from "@/components/shared/fade-in";
import { getSettings, getVisibleNews } from "@/lib/queries";
import { toPublicNews } from "@/lib/mappers";
import { mockNews } from "@/lib/mock-data";
import { NewsletterSection } from "@/components/features/newsletter-section";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Soraia Space",
  description: "Visit the studio, book an appointment, or catch up on the latest news from Soraia Oliveira.",
};

export default async function SoraiaSpacePage() {
  const [settings, dbNews] = await Promise.all([
    getSettings(),
    getVisibleNews(),
  ]);

  const visibleNews =
    dbNews.length > 0 ? dbNews.map(toPublicNews) : mockNews;

  return (
    <>
      {/* Hero */}
      <Section className="pt-6 md:pt-10 overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 lg:gap-8 items-start">

          {/* Text sidebar */}
          <div className="lg:col-span-4 space-y-7 lg:pt-6 pb-10 lg:pb-0 pr-0 lg:pr-6">
            <FadeIn>
              <div className="flex items-center gap-4">
                <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
                <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                  The Studio
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="heading-display leading-[1.0] text-[var(--color-ink)]">
                Soraia<br />Space
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p
                className="heading-editorial text-[var(--color-ink)] text-lg md:text-xl leading-snug"
              >
                An extension of an ever-evolving creation
              </p>
            </FadeIn>

            <FadeIn delay={0.22}>
              <p className="text-[14px] text-[var(--color-ink-light)] leading-[1.75]">
                Guimarães, Portugal — self-portraiture, photography, experimental printing and drawing. Founded 2021.
              </p>
              <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.75] mt-3">
                Studio visits by appointment. Come to experience scale, texture, and the process behind the work.
              </p>
            </FadeIn>
          </div>

          {/* Studio image */}
          <FadeIn delay={0.1} className="lg:col-span-8">
            <div className="relative aspect-[4/3] lg:aspect-[16/10] overflow-hidden">
              <Image
                src="/images/studio/studio.png"
                alt="Soraia Space — creative studio in Guimarães"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 66vw"
                priority
              />
            </div>
          </FadeIn>

        </div>
      </Section>

      {/* Anchor navigation */}
      <SpaceNav />

      {/* The Practice */}
      <Section id="the-practice" className="bg-[var(--color-surface-warm)]">
        <FadeIn>
          <div className="max-w-2xl">
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                The Practice
              </p>
            </div>
            <h2 className="heading-editorial text-[var(--color-ink)] mb-6">
              Where the work happens
            </h2>
            <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7]">
              Visiting the studio means stepping into the creative process — seeing work at every stage, understanding scale and texture up close, and experiencing the atmosphere where each piece begins. Whether in person or via a video call, these conversations are where real connections happen.
            </p>
            <blockquote
              className="mt-8 border-l border-[var(--color-ink-muted)] pl-5"
              style={{ fontFamily: "var(--font-serif)", fontStyle: "italic" }}
            >
              <p className="text-base text-[var(--color-ink-muted)] leading-relaxed">
                &ldquo;The space where I hold my creative process, my world, where the first steps are made.&rdquo;
              </p>
              <footer className="mt-2 text-[11px] tracking-[0.12em] uppercase text-[var(--color-ink-muted)] not-italic" style={{ fontFamily: "inherit" }}>
                — Soraia
              </footer>
            </blockquote>
          </div>
        </FadeIn>
      </Section>

      {/* Appointments */}
      <Section id="appointments" className="bg-[var(--color-surface-dim)]">
        <AppointmentSection
          text={settings.appointment_text}
          studioUrl={settings.appointment_url}
          callUrl={settings.call_url}
        />
      </Section>

      {/* News */}
      <Section id="news" className="bg-[var(--color-surface-dim)]">
        <NewsList items={visibleNews} />
      </Section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
