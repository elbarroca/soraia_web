"use client";

import { ArrowUpRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";

type PressItem = {
  title: string;
  publication: string;
  url?: string;
};

const PRESS_ITEMS: PressItem[] = [
  {
    title: "Fotografia e instalação dão vida a nova exposição do Guimarães Project Room",
    publication: "Jornal de Guimarães",
    url: "https://jornaldeguimaraes.pt/noticias/fotografia-e-instalacao-dao-vida-a-nova-exposicao-do-guimaraes-project-room/",
  },
];

export function PressSection() {
  return (
    <div className="space-y-8">
      <FadeIn>
        <div className="flex items-center gap-4">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            Press & Media
          </p>
        </div>
      </FadeIn>

      <div className="space-y-0">
        {PRESS_ITEMS.map((item, i) => (
          <FadeIn key={item.title} delay={0.08 * i}>
            {item.url ? (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start justify-between gap-4 py-4 border-b border-[var(--color-border)] transition-colors duration-300 hover:bg-[var(--color-surface-hover)] -mx-4 px-4"
              >
                <div>
                  <p className="text-[13px] font-medium text-[var(--color-ink)] group-hover:underline decoration-1 underline-offset-4 decoration-[var(--color-border-strong)]">
                    {item.title}
                  </p>
                  <p className="text-[12px] text-[var(--color-ink-muted)] mt-0.5 tracking-[0.01em]">
                    {item.publication}
                  </p>
                </div>
                <ArrowUpRight size={13} className="flex-shrink-0 mt-0.5 text-[var(--color-ink-muted)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ) : (
              <div className="py-4 border-b border-[var(--color-border)] -mx-4 px-4">
                <p className="text-[13px] font-medium text-[var(--color-ink)]">
                  {item.title}
                </p>
                <p className="text-[12px] text-[var(--color-ink-muted)] mt-0.5 tracking-[0.01em]">
                  {item.publication}
                </p>
              </div>
            )}
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.2}>
        <p className="text-[13px] text-[var(--color-ink-muted)]">
          For press inquiries, contact{" "}
          <a
            href="mailto:info@soraia-oliveira.com"
            className="underline underline-offset-4 hover:text-[var(--color-ink)] transition-colors"
          >
            info@soraia-oliveira.com
          </a>
        </p>
      </FadeIn>
    </div>
  );
}
