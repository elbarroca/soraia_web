"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { updateSettings } from "@/app/admin/(dashboard)/settings/actions";
import { toast } from "sonner";

type SettingKey = {
  key: string;
  label: string;
  type: "text" | "textarea";
};

type SettingsEditorProps = {
  settings: Record<string, string>;
  keys: SettingKey[];
};

export function SettingsEditor({ settings, keys }: SettingsEditorProps) {
  const [isPending, startTransition] = useTransition();
  const [values, setValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(keys.map((k) => [k.key, settings[k.key] ?? ""]))
  );

  function handleSave() {
    const entries = keys.map((k) => ({
      key: k.key,
      value: values[k.key] ?? "",
    }));

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
      {keys.map((k) => (
        <div key={k.key} className="space-y-2">
          <Label>{k.label}</Label>
          <p className="text-xs text-[var(--color-ink-muted)]">{k.key}</p>
          {k.type === "textarea" ? (
            <Textarea
              value={values[k.key] ?? ""}
              onChange={(e) =>
                setValues({ ...values, [k.key]: e.target.value })
              }
              rows={4}
            />
          ) : (
            <Input
              value={values[k.key] ?? ""}
              onChange={(e) =>
                setValues({ ...values, [k.key]: e.target.value })
              }
            />
          )}
        </div>
      ))}

      <Button onClick={handleSave} disabled={isPending}>
        {isPending ? "Saving..." : "Save All Settings"}
      </Button>
    </div>
  );
}
