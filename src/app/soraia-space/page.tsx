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
      <Section className="pt-14 md:pt-20 pb-24 md:pb-32 overflow-hidden">
        {/* Centred title */}
        <div className="text-center mb-16 md:mb-20">
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

        {/* Horizontal hero image */}
        <FadeIn delay={0.1}>
          <div className="relative aspect-[2000/1344] w-full overflow-hidden mb-12 md:mb-16">
            <Image
              src="/images/soraia-space/hero.jpg"
              alt="Soraia in the gallery, in conversation with a visitor"
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </FadeIn>

        {/* Text */}
        <div className="max-w-3xl mx-auto text-center space-y-6">
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
      </Section>

      {/* Anchor navigation */}
      <div className="mt-6 md:mt-10">
        <SpaceNav />
      </div>

      {/* The Practice — mirrors hero: text | image, reversed */}
      <Section id="the-practice" className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          <FadeIn className="lg:col-span-6">
            <div className="space-y-6 text-left">
              <h2 className="heading-editorial text-[var(--color-ink)]">
                Where the work happens
              </h2>
              <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7]">
                Visiting the studio means stepping into the creative process — seeing work at every stage, understanding scale and texture up close, and experiencing the atmosphere where each piece begins. Whether in person or via a video call, these conversations are where real connections happen.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.08} className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src="/images/soraia-space/where-work-happens.png"
                alt="Artist in the studio, seated in front of a framed black-and-white landscape photograph"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Appointments */}
      <Section id="appointments" className="py-16 md:py-24">
        <AppointmentSection
          text={settings.appointment_text}
          studioUrl={settings.appointment_url}
          callUrl={settings.call_url}
        />
      </Section>

      {/* News */}
      <Section id="news" className="py-16 md:py-24">
        <NewsList items={visibleNews} />
      </Section>

      {/* Newsletter */}
      <NewsletterSection />
    </>
  );
}
