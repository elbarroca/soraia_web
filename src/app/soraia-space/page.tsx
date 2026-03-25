import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { AppointmentSection } from "@/components/features/appointment-section";
import { NewsList } from "@/components/features/news-list";
import { FadeIn } from "@/components/shared/fade-in";
import { getSettings, getVisibleNews } from "@/lib/queries";
import { toPublicNews } from "@/lib/mappers";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Soraia Space",
  description: "Visit the studio, book an appointment, or catch up on the latest news from Soraia Oliveira.",
};

export default async function SoraiaSpacePage() {
  const settings = await getSettings();
  const dbNews = await getVisibleNews();
  const visibleNews = dbNews.map(toPublicNews);

  return (
    <>
      {/* Intro */}
      <Section>
        <div className="max-w-2xl">
          <FadeIn>
            <p className="label text-[var(--color-ink-muted)] mb-4">The Studio</p>
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="heading-1 mb-6">Soraia Space</h1>
          </FadeIn>
          <FadeIn delay={0.2}>
            <p className="text-lg text-[var(--color-ink-light)] leading-relaxed">
              {settings.studio_description}
            </p>
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
