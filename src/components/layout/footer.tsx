"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { useNewsletter } from "@/hooks/use-newsletter";

export function Footer() {
  const { email, status, subscribe, updateEmail } = useNewsletter();

  return (
    <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-dim)]">
      <Container className="py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand + newsletter */}
          <div className="md:col-span-5 space-y-8">
            <Link href="/" className="block">
              <span className="text-xl font-bold tracking-[0.15em] uppercase">
                Soraia Oliveira
              </span>
            </Link>
            <p className="text-[var(--color-ink-light)] text-sm max-w-xs leading-relaxed">
              Visual artist based in Guimarães, Portugal. Exploring self-portraiture, photography, drawing, and wearable sculpture.
            </p>

            {/* Newsletter */}
            <div>
              <p className="label mb-3 text-[var(--color-ink-muted)]">Newsletter</p>
              <form onSubmit={subscribe} className="flex items-stretch">
                <input
                  type="email"
                  placeholder="Your email"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  required
                  className="flex-1 bg-transparent border-b border-[var(--color-border-strong)] px-0 py-2 text-sm focus:border-[var(--color-ink)] focus:outline-none transition-colors placeholder:text-[var(--color-ink-muted)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="border-b border-[var(--color-border-strong)] px-3 py-2 transition-all hover:border-[var(--color-ink)] group"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </button>
              </form>
              {status === "success" && (
                <p className="text-xs text-[var(--color-ink-light)] mt-2">Thank you for subscribing.</p>
              )}
              {status === "error" && (
                <p className="text-xs text-[var(--color-sold)] mt-2">Something went wrong. Please try again.</p>
              )}
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-3 md:col-start-7">
            <p className="label mb-4 text-[var(--color-ink-muted)]">Explore</p>
            <nav className="flex flex-col gap-3">
              {[
                { href: "/artworks", label: "Artworks" },
                { href: "/about", label: "About" },
                { href: "/soraia-space", label: "Soraia Space" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="md:col-span-3">
            <p className="label mb-4 text-[var(--color-ink-muted)]">Connect</p>
            <nav className="flex flex-col gap-3">
              <a
                href="https://instagram.com/soraiaoliveira.art"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors inline-flex items-center gap-2"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                Instagram
              </a>
              <a
                href="mailto:info@soraia-oliveira.com"
                className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors"
              >
                info@soraia-oliveira.com
              </a>
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-[var(--color-border)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--color-ink-muted)]">
          <p>&copy; {new Date().getFullYear()} Soraia Oliveira. All rights reserved.</p>
          <p>Guimarães, Portugal</p>
        </div>
      </Container>
    </footer>
  );
}
