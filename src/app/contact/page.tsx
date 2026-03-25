import type { Metadata } from "next";
import { Suspense } from "react";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
        {/* Left: info */}
        <div className="space-y-10">
          <FadeIn>
            <div>
              <p className="label text-[var(--color-ink-muted)] mb-4">Get in Touch</p>
              <h1 className="heading-1 mb-4">Let&apos;s Connect</h1>
              <p className="text-[var(--color-ink-light)] leading-relaxed max-w-md">
                Whether you&apos;re interested in a piece, have a question, or want to discuss a collaboration — I&apos;d love to hear from you.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[var(--color-ink-muted)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="label text-[var(--color-ink-muted)] mb-1">Email</p>
                  <a
                    href="mailto:info@soraia-oliveira.com"
                    className="text-sm hover:underline underline-offset-4"
                  >
                    info@soraia-oliveira.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[var(--color-ink-muted)] mt-0.5 flex-shrink-0" />
                <div>
                  <p className="label text-[var(--color-ink-muted)] mb-1">Studio</p>
                  <p className="text-sm">Guimarães, Portugal</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>

        {/* Right: form */}
        <FadeIn delay={0.15}>
          <Suspense fallback={null}>
            <ContactForm />
          </Suspense>
        </FadeIn>
      </div>
    </Section>
  );
}
