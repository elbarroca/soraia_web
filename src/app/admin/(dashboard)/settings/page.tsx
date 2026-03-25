import { db } from "@/db";
import { siteSettings } from "@/db/schema";
import { SettingsEditor } from "@/components/admin/settings-editor";

export const dynamic = "force-dynamic";

const SETTING_KEYS = [
  { key: "hero_statement", label: "Hero Statement", type: "text" as const },
  { key: "hero_tagline", label: "Hero Tagline", type: "textarea" as const },
  { key: "about_intro", label: "About Intro", type: "textarea" as const },
  { key: "about_bio", label: "About Bio (JSON array)", type: "textarea" as const },
  { key: "about_identity", label: "Identity Tags (JSON array)", type: "textarea" as const },
  { key: "contact_email", label: "Contact Email", type: "text" as const },
  { key: "studio_description", label: "Studio Description", type: "textarea" as const },
  { key: "appointment_text", label: "Appointment Text", type: "textarea" as const },
  { key: "appointment_url", label: "Appointment URL", type: "text" as const },
  { key: "call_url", label: "Call URL", type: "text" as const },
  { key: "social_instagram", label: "Instagram URL", type: "text" as const },
];

export default async function AdminSettingsPage() {
  const allSettings = await db.select().from(siteSettings);
  const settingsMap = Object.fromEntries(
    allSettings.map((s) => [s.key, s.value])
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="heading-2">Site Settings</h1>
        <p className="text-sm text-[var(--color-ink-muted)]">
          Edit content blocks displayed on the public site.
        </p>
      </div>
      <SettingsEditor settings={settingsMap} keys={SETTING_KEYS} />
    </div>
  );
}
