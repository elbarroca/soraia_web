"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";
import { useNewsletter } from "@/hooks/use-newsletter";

export function NewsletterSection() {
  const { email, status, subscribe, updateEmail, reset } = useNewsletter();

  return (
    <Section className="!py-48 md:!py-72 lg:!py-96">
      <FadeIn>
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">
            Stay Close
          </p>
          <h2 className="heading-1">
            First to See New Work
          </h2>
          <p className="text-[15px] text-[var(--color-ink-light)] leading-[1.7] max-w-md mx-auto">
            Subscribers see new pieces before anyone else — plus studio notes, exhibition invitations, and the occasional reflection.
          </p>

          {status === "success" ? (
            <div className="space-y-3 pt-4">
              <p className="text-[15px] font-medium text-[var(--color-ink)]">
                You&apos;re on the list.
              </p>
              <p className="text-[13px] text-[var(--color-ink-muted)]">
                Thank you for subscribing. You&apos;ll hear from me when there&apos;s something worth sharing.
              </p>
              <button
                onClick={reset}
                className="text-[13px] font-semibold tracking-[0.12em] uppercase text-[var(--color-ink)] hover:text-[var(--color-ink-light)] transition-colors duration-300 mt-2"
              >
                Subscribe another email
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={subscribe} className="flex items-center gap-3 max-w-sm mx-auto mt-8">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 px-6 py-3.5 border border-[var(--color-ink)] rounded-full text-[15px] focus:outline-none bg-transparent placeholder:text-[var(--color-ink-muted)] text-[var(--color-ink)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-[52px] h-[52px] flex-shrink-0 rounded-full border border-[var(--color-ink)] flex items-center justify-center text-[var(--color-ink)] hover:bg-[var(--color-ink)] hover:text-[var(--color-surface)] transition-all duration-300 disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {status === "loading" ? (
                    <Loader2 size={16} className="animate-spin" />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                </button>
              </form>
              {status === "error" && (
                <p className="text-sm text-[var(--color-sold)]">Something went wrong. Please try again.</p>
              )}
            </>
          )}
        </div>
      </FadeIn>
    </Section>
  );
}
