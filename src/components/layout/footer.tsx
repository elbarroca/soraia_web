"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Container } from "./container";
import { EditorialDivider } from "@/components/shared/editorial-divider";
import { useNewsletter } from "@/hooks/use-newsletter";
import { SuccessModal } from "@/components/shared/success-modal";

function IconInstagram({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function IconFacebook({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function IconTikTok({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function IconYouTube({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { href: "https://www.instagram.com/soraianoliveira/", label: "Instagram", Icon: IconInstagram },
  { href: "https://www.facebook.com/soraianoliveira", label: "Facebook", Icon: IconFacebook },
  { href: "https://www.tiktok.com/@soraianoliveira", label: "TikTok", Icon: IconTikTok },
  { href: "https://www.youtube.com/@soraianoliveira", label: "YouTube", Icon: IconYouTube },
] as const;

const FOOTER_LINKS = [
  { href: "/artworks", label: "Artworks" },
  { href: "/about", label: "About" },
  { href: "/soraia-space", label: "Soraia Space" },
  { href: "/contact", label: "Contact" },
];

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

      <footer className="bg-[var(--color-surface)]">
        <Container>
          <EditorialDivider />
        </Container>

        {/* Parting quote — signature moment */}
        <Container className="pt-14 md:pt-20 pb-6 md:pb-8">
          <p className="text-center font-serif italic text-[var(--color-ink-muted)] text-[17px] md:text-[20px] leading-relaxed tracking-[0.01em] max-w-2xl mx-auto">
            O corpo como território de identidade, intimidade e transformação.
          </p>
        </Container>

        <Container className="py-12 md:py-16">
          {/* Top row: Signature + Nav + Social + Newsletter */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
            {/* Brand */}
            <div className="md:col-span-3 space-y-6">
              <Link href="/" className="block" aria-label="Soraia Oliveira — home">
                <Image
                  src="/images/branding/signature-bold.png"
                  alt="Soraia Oliveira"
                  width={180}
                  height={36}
                  className="h-8 md:h-10 w-auto object-contain"
                />
              </Link>
              <p className="text-[13px] text-[var(--color-ink-muted)] leading-relaxed max-w-[240px]">
                Fragments of a visual autobiography.
              </p>
            </div>

            {/* Navigation */}
            <div className="md:col-span-2 md:col-start-5">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-5">
                Explore
              </p>
              <nav className="flex flex-col gap-3">
                {FOOTER_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-[13px] text-[var(--color-ink-light)] hover:text-[var(--color-ink)] transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            </div>

            {/* Social */}
            <div className="md:col-span-2">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-5">
                Connect
              </p>
              <div className="flex items-center gap-4">
                {SOCIAL_LINKS.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
                    aria-label={label}
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
              <a
                href="mailto:info@soraia-oliveira.com"
                className="block mt-4 text-[13px] text-[var(--color-ink-muted)] hover:text-[var(--color-ink)] transition-colors duration-300"
              >
                info@soraia-oliveira.com
              </a>
            </div>

            {/* Newsletter — simplified */}
            <div className="md:col-span-3 md:col-start-10">
              <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-5">
                Studio Updates
              </p>
              <p className="text-[12px] text-[var(--color-ink-muted)] leading-relaxed mb-4">
                New work, exhibitions, and events — nothing more.
              </p>
              <form onSubmit={subscribe} className="flex items-stretch gap-0">
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => updateEmail(e.target.value)}
                  required
                  className="flex-1 min-w-0 bg-transparent border-b border-[var(--color-border-strong)] px-0 py-2.5 text-[12px] focus:border-[var(--color-ink)] focus:outline-none transition-colors duration-300 placeholder:text-[var(--color-ink-muted)]/50 text-[var(--color-ink)]"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="border-b border-[var(--color-border-strong)] px-3 py-2.5 transition-all duration-300 hover:border-[var(--color-ink)] group disabled:opacity-50 text-[var(--color-ink-muted)] hover:text-[var(--color-ink)]"
                  aria-label="Subscribe to newsletter"
                >
                  <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                </button>
              </form>
              {status === "error" && (
                <p className="text-[11px] text-[var(--color-sold)] mt-2 tracking-[0.02em]">Something went wrong. Try again.</p>
              )}
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-20 pt-5 border-t border-[var(--color-border)]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] tracking-[0.08em] uppercase text-[var(--color-ink-muted)]/70">
            <p>&copy; {new Date().getFullYear()} Soraia Oliveira. All rights reserved.</p>
            <p className="tracking-[0.18em]">Guimarães, Portugal</p>
          </div>
        </Container>
      </footer>
    </>
  );
}
