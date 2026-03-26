import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/features/contact-form";
import { FadeIn } from "@/components/shared/fade-in";
import { Mail, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Soraia Oliveira. Inquiries, commissions, and collaborations welcome.",
};

export default function ContactPage() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
        {/* Left: info + image */}
        <div className="lg:col-span-5 space-y-10">
          <FadeIn>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
                <p className="label text-[var(--color-ink-muted)]">Get in Touch</p>
              </div>
              <h1 className="heading-1 mb-4">Let&apos;s Connect</h1>
              <p className="text-[var(--color-ink-light)] leading-relaxed max-w-md">
                Whether you&apos;re interested in a piece, have a question, or want to explore a collaboration — I&apos;d love to hear from you.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-5">
              <a
                href="mailto:info@soraia-oliveira.com"
                className="flex items-start gap-3 group"
              >
                <Mail size={16} className="text-[var(--color-ink-muted)] mt-1 flex-shrink-0" />
                <div>
                  <p className="label text-[var(--color-ink-muted)] mb-1">Email</p>
                  <p className="text-sm group-hover:underline underline-offset-4">
                    info@soraia-oliveira.com
                  </p>
                </div>
              </a>

              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-[var(--color-ink-muted)] mt-1 flex-shrink-0" />
                <div>
                  <p className="label text-[var(--color-ink-muted)] mb-1">Studio</p>
                  <p className="text-sm">Guimaraes, Portugal</p>
                </div>
              </div>

              <a
                href="https://www.instagram.com/soraianoliveira/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-ink-muted)] mt-1 flex-shrink-0"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                <div>
                  <p className="label text-[var(--color-ink-muted)] mb-1">Instagram</p>
                  <p className="text-sm group-hover:underline underline-offset-4">
                    @soraianoliveira
                  </p>
                </div>
              </a>
            </div>
          </FadeIn>

          {/* Contact image */}
          <FadeIn delay={0.15} className="hidden lg:block">
            <div className="relative aspect-[4/3] overflow-hidden mt-4">
              <Image
                src="/images/contact/contact.jpg"
                alt="Soraia Oliveira"
                fill
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </FadeIn>
        </div>

        {/* Right: form */}
        <div className="lg:col-span-6 lg:col-start-7">
          <FadeIn delay={0.15}>
            <Suspense fallback={null}>
              <ContactForm />
            </Suspense>
          </FadeIn>
        </div>
      </div>
    </Section>
  );
}
