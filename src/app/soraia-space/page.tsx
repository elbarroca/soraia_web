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
      {/* Hero — title, then image | editorial text (two columns on large screens) */}
      <Section className="pt-14 md:pt-20 pb-16 md:pb-20 overflow-hidden">
        <div className="text-center mb-12 md:mb-16">
          <FadeIn>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-semibold leading-[1.0] tracking-[-0.02em] text-[var(--color-ink)]">
              Soraia Space
            </h1>
          </FadeIn>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 lg:items-center">
          <FadeIn>
            <div className="relative aspect-[2000/1344] w-full overflow-hidden bg-[var(--color-surface-dim)]">
              <Image
                src="/images/soraia-space/hero.jpg"
                alt="Soraia in the gallery, in conversation with a visitor"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <div className="space-y-6 text-left lg:py-4">
              <p className="heading-editorial text-[var(--color-ink)]">
                An extension of an ever-evolving creation
              </p>
              <div className="space-y-3">
                <p className="text-[14px] text-[var(--color-ink-light)] leading-[1.75]">
                  Guimarães, Portugal — self-portraiture, photography, experimental printing and drawing. Founded 2021.
                </p>
                <p className="text-[14px] text-[var(--color-ink-muted)] leading-[1.75]">
                  Studio visits by appointment. Come to experience scale, texture, and the process behind the work.
                </p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Anchor navigation */}
      <div className="mt-6 md:mt-10">
        <SpaceNav />
      </div>

      {/* The Practice — text left | image right (narrower image than full half-width) */}
      <Section id="the-practice" className="py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-x-12 lg:gap-y-10 items-start">
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

          <FadeIn delay={0.08} className="lg:col-span-5 lg:col-start-8 flex justify-end">
            <div className="relative aspect-[4/3] w-full max-w-full lg:max-w-[min(100%,42rem)] overflow-hidden bg-[var(--color-surface-dim)]">
              <Image
                src="/images/soraia-space/where-work-happens.png"
                alt="Artist in the studio, seated in front of a framed black-and-white landscape photograph"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 42rem"
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
