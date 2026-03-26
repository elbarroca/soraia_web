import { FadeIn } from "@/components/shared/fade-in";

type SocialProofBarProps = {
  venues: string[];
};

export function SocialProofBar({ venues }: SocialProofBarProps) {
  if (venues.length === 0) return null;

  return (
    <FadeIn>
      <div className="border-y border-[var(--color-border)] py-4 md:py-5">
        <p className="text-center text-[9px] md:text-[10px] font-medium tracking-[0.22em] uppercase">
          <span className="text-[var(--color-ink-muted)]/50">Exhibited at</span>
          {" "}
          {venues.map((venue, i) => (
            <span key={venue}>
              {i > 0 && <span className="mx-2.5 md:mx-4 text-[var(--color-border-strong)]" aria-hidden="true">&middot;</span>}
              <span className="text-[var(--color-ink-muted)]">{venue}</span>
            </span>
          ))}
        </p>
      </div>
    </FadeIn>
  );
}
