"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";
import { SuccessModal } from "@/components/shared/success-modal";
import { useNewsletter } from "@/hooks/use-newsletter";

export function NewsletterSection() {
  const { email, status, subscribe, updateEmail, reset } = useNewsletter();

  return (
    <>
      <SuccessModal
        open={status === "success"}
        onClose={reset}
        title="You're on the list."
        message="Thank you for subscribing. You'll hear from me when there's something worth sharing."
      />

      <Section className="bg-[var(--color-surface-warm)]">
        <FadeIn>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
              Stay Close
            </p>
            <h2 className="heading-editorial text-[var(--color-ink)]">
              First to See New Work
            </h2>
            <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7] max-w-md mx-auto">
              Subscribers see new pieces before anyone else — plus studio notes, exhibition invitations, and the occasional reflection.
            </p>
            <form onSubmit={subscribe} className="flex items-stretch max-w-sm mx-auto mt-8">
              <input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => updateEmail(e.target.value)}
                required
                className="flex-1 bg-transparent border-b border-[var(--color-border-strong)] px-0 py-3 text-[15px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 placeholder:text-[var(--color-ink-muted)] text-center"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="border-b border-[var(--color-border-strong)] px-4 py-3 transition-all duration-300 hover:border-[var(--color-ink)] group disabled:opacity-50"
                aria-label="Subscribe"
              >
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
            {status === "error" && (
              <p className="text-sm text-[var(--color-sold)]">Something went wrong. Please try again.</p>
            )}
          </div>
        </FadeIn>
      </Section>
    </>
  );
}
