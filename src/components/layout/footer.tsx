"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { useNewsletter } from "@/hooks/use-newsletter";
import { SuccessModal } from "@/components/shared/success-modal";

// Inline SVGs for social platforms not in lucide-react
function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTikTok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function IconYouTube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/soraianoliveira/",
    label: "Instagram",
    Icon: IconInstagram,
  },
  {
    href: "https://www.facebook.com/soraianoliveira",
    label: "Facebook",
    Icon: IconFacebook,
  },
  {
    href: "https://www.tiktok.com/@soraianoliveira",
    label: "TikTok",
    Icon: IconTikTok,
  },
  {
    href: "https://www.youtube.com/@soraianoliveira",
    label: "YouTube",
    Icon: IconYouTube,
  },
] as const;

export function Footer() {
  const { email, status, subscribe, updateEmail, reset } = useNewsletter();

  return (
    <>
      <SuccessModal
        open={status === "success"}
        onClose={reset}
        title="You're on the list."
        message="Thank you for subscribing. You'll hear from me when there's something worth sharing."
      />

      <footer className="border-t border-[var(--color-border)] bg-[var(--color-surface-dim)]">
        <Container className="py-16 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand + newsletter */}
            <div className="md:col-span-5 space-y-8">
              <Link href="/" className="block" aria-label="Soraia Oliveira — home">
                <Image
                  src="/images/branding/signature-bold.png"
                  alt="Soraia Oliveira"
                  width={220}
                  height={44}
                  className="h-8 md:h-10 w-auto object-contain"
                />
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
                    className="border-b border-[var(--color-border-strong)] px-3 py-2 transition-all hover:border-[var(--color-ink)] group disabled:opacity-50"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </button>
                </form>
                {status === "error" && (
                  <p className="text-xs text-[var(--color-sold)] mt-2">Something went wrong. Please try again.</p>
                )}
              </div>
            </div>

            {/* Explore links */}
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

            {/* Social links */}
            <div className="md:col-span-3">
              <p className="label mb-4 text-[var(--color-ink-muted)]">Connect</p>
              <nav className="flex flex-col gap-3">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors inline-flex items-center gap-2"
                  >
                    <Icon size={14} />
                    {label}
                  </a>
                ))}
                <a
                  href="mailto:info@soraia-oliveira.com"
                  className="text-sm text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors mt-1"
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
    </>
  );
}
