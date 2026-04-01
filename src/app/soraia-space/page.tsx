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
      <Section className="pt-14 md:pt-20 overflow-hidden">
        {/* Centred title */}
        <div className="text-center mb-10 md:mb-14">
          <FadeIn>
            <div className="flex items-center justify-center gap-4 mb-6">
              <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
                The Studio
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.0] tracking-[-0.02em] text-[var(--color-ink)]">
              Soraia Space
            </h1>
          </FadeIn>
        </div>

        {/* Two-column: image left, text right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image — smaller, left */}
          <FadeIn delay={0.1} className="lg:col-span-5">
            <div className="relative overflow-hidden">
              <Image
                src="/images/studio/studio.png"
                alt="Soraia Space — creative studio in Guimarães"
                width={900}
                height={1100}
                className="w-full h-auto object-contain"
                sizes="(max-width: 1024px) 100vw, 42vw"
                priority
              />
            </div>
          </FadeIn>

          {/* Text — right */}
          <div className="lg:col-span-6 lg:col-start-7 space-y-6">
            <FadeIn delay={0.16}>
              <p className="heading-editorial text-[var(--color-ink)] text-lg md:text-xl leading-snug">
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
        </div>
      </Section>

      {/* Anchor navigation */}
      <SpaceNav />

      {/* The Practice */}
      <Section id="the-practice" className="py-10 md:py-14">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
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
          </div>
        </FadeIn>
      </Section>

      {/* Appointments */}
      <Section id="appointments" className="py-10 md:py-14">
        <AppointmentSection
          text={settings.appointment_text}
          studioUrl={settings.appointment_url}
          callUrl={settings.call_url}
        />
      </Section>

      {/* News */}
      <Section id="news" className="py-10 md:py-14">
        <NewsList items={visibleNews} />
      </Section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
