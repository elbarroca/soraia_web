import type { Metadata } from "next";
import { Section } from "@/components/layout/section";
import { AboutBio } from "@/components/features/about-bio";
import { AboutIdentity } from "@/components/features/about-identity";
import { ExhibitionList } from "@/components/features/exhibition-list";
import { getSettings, getVisibleExhibitions } from "@/lib/queries";
import { toPublicExhibition } from "@/lib/mappers";
import { artistPersonJsonLd } from "@/lib/structured-data";
import { mockExhibitions } from "@/lib/mock-data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About",
  description: "Learn about Soraia Oliveira — multidisciplinary visual artist based in Guimaraes, Portugal.",
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
      <Section>
        <AboutBio intro={settings.about_intro ?? ""} paragraphs={bioParagraphs} />
      </Section>

      <AboutIdentity words={identityWords} />

      <Section>
        <ExhibitionList exhibitions={exhibitions} />
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
