import type { Metadata } from "next";
import { Suspense } from "react";
import Image from "next/image";
import { Section } from "@/components/layout/section";
import { ContactForm } from "@/components/features/contact-form";
import { NewsletterSection } from "@/components/features/newsletter-section";
import { FadeIn } from "@/components/shared/fade-in";
import { Mail } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Soraia Oliveira. Inquiries, commissions, and collaborations welcome.",
};

export default function ContactPage() {
  return (
    <>
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8">
          {/* Left: info + image */}
          <div className="lg:col-span-5 space-y-10">
            <FadeIn>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
                  <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Get in Touch</p>
                </div>
                <h1 className="heading-1 mb-4">I&apos;d Love to Hear From You</h1>
                <p className="text-[var(--color-ink-light)] leading-relaxed max-w-md">
                  Whether you&apos;re drawn to a particular piece, curious about commissioning something new, or looking to collaborate.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="flex flex-wrap items-start gap-x-10 gap-y-5">
                <a
                  href="mailto:info@soraia-oliveira.com"
                  className="flex items-start gap-3 group"
                >
                  <Mail size={16} className="text-[var(--color-ink-muted)] mt-1 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-1">Email</p>
                    <p className="text-sm group-hover:underline underline-offset-4">
                      info@soraia-oliveira.com
                    </p>
                  </div>
                </a>

                <div className="flex items-start gap-3">
                  <div>
                    <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)] mb-1">Studio</p>
                    <p className="text-sm">Guimarães, Portugal</p>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Contact image */}
            <FadeIn delay={0.15} className="hidden lg:block">
              <div className="relative aspect-[3/4] max-w-[320px] overflow-hidden mt-4">
                <Image
                  src="/images/contact/contact.jpg"
                  alt="Soraia Oliveira"
                  fill
                  className="object-cover object-top"
                  sizes="25vw"
                />
              </div>
            </FadeIn>
          </div>

          {/* Right: form — subject selector pills are now inside the form itself */}
          <div className="lg:col-span-6 lg:col-start-7">
            <FadeIn delay={0.1}>
              <Suspense fallback={null}>
                <ContactForm />
              </Suspense>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* Newsletter — for visitors not yet ready to make a direct inquiry */}
      <NewsletterSection />
    </>
  );
}
