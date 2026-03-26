"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "@/components/ui/tabs";
import { updateSettings } from "@/app/admin/(dashboard)/settings/actions";
import { toast } from "sonner";

type SettingKey = {
  key: string;
  label: string;
  type: "text" | "textarea";
};

type SettingGroup = {
  id: string;
  label: string;
  description?: string;
  keys: SettingKey[];
};

type SettingsEditorProps = {
  settings: Record<string, string>;
  groups: SettingGroup[];
};

// Keys that require a JSON array hint
const JSON_HINTS: Record<string, string> = {
  about_bio: 'Enter as JSON array, e.g. ["Paragraph 1", "Paragraph 2"]',
  about_identity: 'Enter as JSON array, e.g. ["PHOTOGRAPHER", "MAKER"]',
};

export function SettingsEditor({ settings, groups }: SettingsEditorProps) {
  const [isPending, startTransition] = useTransition();

  // Flat state over all keys across all groups
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(
      groups.flatMap((g) => g.keys).map((k) => [k.key, settings[k.key] ?? ""])
    )
  );

  function handleChange(key: string, value: string) {
    setValues((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    const entries = groups.flatMap((g) =>
      g.keys.map((k) => ({ key: k.key, value: values[k.key] ?? "" }))
    );

    startTransition(async () => {
      try {
        await updateSettings(entries);
        toast.success("Settings saved");
      } catch {
        toast.error("Failed to save settings");
      }
    });
  }

  return (
    <div className="max-w-2xl space-y-6">
      <Tabs defaultValue={groups[0]?.id}>
        <TabsList className="w-full">
          {groups.map((group) => (
            <TabsTrigger key={group.id} value={group.id}>
              {group.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {groups.map((group) => (
          <TabsContent key={group.id} value={group.id}>
            <Card>
              <CardHeader className="border-b">
                <CardTitle>{group.label}</CardTitle>
                {group.description && (
                  <CardDescription>{group.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pt-4 space-y-5">
                {group.keys.map((k) => (
                  <div key={k.key} className="space-y-2">
                    <Label htmlFor={k.key}>{k.label}</Label>
                    {k.type === "textarea" ? (
                      <Textarea
                        id={k.key}
                        value={values[k.key] ?? ""}
                        onChange={(e) => handleChange(k.key, e.target.value)}
                        rows={4}
                      />
                    ) : (
                      <Input
                        id={k.key}
                        value={values[k.key] ?? ""}
                        onChange={(e) => handleChange(k.key, e.target.value)}
                      />
                    )}
                    {JSON_HINTS[k.key] && (
                      <p className="text-xs text-[var(--color-ink-muted)]">
                        {JSON_HINTS[k.key]}
                      </p>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Save sits outside the tabs so it always persists all groups */}
      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? "Saving..." : "Save All Settings"}
      </Button>
    </div>
  );
}
