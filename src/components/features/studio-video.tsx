"use client";

import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

export function StudioVideo() {
  return (
    <Section className="py-0">
      <FadeIn>
        <video
          src="/soraia-studio.mp4"
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-auto"
        />
      </FadeIn>
    </Section>
  );
}
