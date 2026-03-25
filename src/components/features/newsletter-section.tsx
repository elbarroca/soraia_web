"use client";

import { ArrowRight } from "lucide-react";
import { FadeIn } from "@/components/shared/fade-in";
import { Section } from "@/components/layout/section";
import { useNewsletter } from "@/hooks/use-newsletter";

export function NewsletterSection() {
  const { email, status, subscribe, updateEmail } = useNewsletter();

  return (
    <Section>
      <FadeIn>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="label text-[var(--color-ink-muted)]">Stay Connected</p>
          <h2 className="heading-2">
            Receive updates on new work, exhibitions, and studio happenings.
          </h2>
          <form onSubmit={subscribe} className="flex items-stretch max-w-md mx-auto mt-8">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => updateEmail(e.target.value)}
              required
              className="flex-1 bg-transparent border-b-2 border-[var(--color-border-strong)] px-0 py-3 text-base focus:border-[var(--color-ink)] focus:outline-none transition-colors placeholder:text-[var(--color-ink-muted)] text-center"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="border-b-2 border-[var(--color-border-strong)] px-4 py-3 transition-all hover:border-[var(--color-ink)] group disabled:opacity-50"
              aria-label="Subscribe"
            >
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          {status === "success" && (
            <p className="text-sm text-[var(--color-ink-light)]">Welcome — check your inbox for a confirmation.</p>
          )}
          {status === "error" && (
            <p className="text-sm text-[var(--color-sold)]">Something went wrong. Please try again.</p>
          )}
          <p className="text-xs text-[var(--color-ink-muted)]">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}
