import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { AppointmentSection } from "@/components/features/appointment-section";
import { NewsList } from "@/components/features/news-list";
import { FadeIn } from "@/components/shared/fade-in";
import { getSettings, getVisibleNews } from "@/lib/queries";
import { toPublicNews } from "@/lib/mappers";
import { mockNews } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Soraia Space",
  description: "Visit the studio, book an appointment, or catch up on the latest news from Soraia Oliveira.",
};

export default async function SoraiaSpacePage() {
  const settings = await getSettings();
  const dbNews = await getVisibleNews();
  const visibleNews =
    dbNews.length > 0 ? dbNews.map(toPublicNews) : mockNews;

  return (
    <>
      {/* Hero with studio image */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <FadeIn>
              <div className="flex items-center gap-4">
                <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
                <p className="label text-[var(--color-ink-muted)]">The Studio</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="heading-1">Soraia Space</h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-base md:text-lg text-[var(--color-ink-light)] leading-relaxed">
                {settings.studio_description}
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.15} className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src="/images/studio/studio.png"
                alt="Soraia Space — creative studio in Guimaraes"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* Appointments */}
      <Section className="bg-[var(--color-surface-dim)]">
        <AppointmentSection
          text={settings.appointment_text}
          studioUrl={settings.appointment_url}
          callUrl={settings.call_url}
        />
      </Section>

      {/* News */}
      <Section>
        <NewsList items={visibleNews} />
      </Section>
    </>
  );
}
