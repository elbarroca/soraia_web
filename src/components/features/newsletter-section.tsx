"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";
import { useNewsletter } from "@/hooks/use-newsletter";

export function NewsletterSection() {
  const { email, status, subscribe, updateEmail, reset } = useNewsletter();

  return (
    <Section>
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
              <form onSubmit={subscribe} className="flex items-stretch max-w-sm mx-auto mt-8">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent border border-[var(--color-border-strong)] px-4 py-3 text-[15px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 placeholder:text-[var(--color-ink-muted)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="bg-[var(--color-ink)] text-[var(--color-surface)] px-5 py-3 transition-all duration-300 hover:bg-[var(--color-ink-light)] disabled:opacity-50"
                  aria-label="Subscribe"
                >
                  {status === "loading" ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <ArrowRight size={18} />
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
