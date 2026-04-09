"use client";

import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";

export function StudioVideo() {
  return (
    <Section noContainer className="py-0">
      <FadeIn>
        <div className="h-[340px] md:h-[440px] lg:h-[520px] overflow-hidden">
          <video
            src="/soraia-studio.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="block w-full h-full object-cover object-center"
          />
        </div>
      </FadeIn>
    </Section>
  );
}
