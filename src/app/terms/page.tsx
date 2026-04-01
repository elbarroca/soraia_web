import type { Metadata } from "next";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms of Service for soraia-oliveira.com.",
};

export default function TermsPage() {
  return (
    <Section className="pt-8 md:pt-12">
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Legal</p>
        </div>

        <h1 className="heading-1 mb-12">Terms of Service</h1>

        <div className="prose-legal">
          <p>
            Welcome to <a href="https://www.soraia-oliveira.com">www.soraia-oliveira.com</a>.
          </p>
          <p>
            These Terms of Service govern your access to and use of this website, including any content, services, or products made available through it.
          </p>
          <p>
            By accessing or using the Website, you agree to be bound by these Terms. If you do not agree, please do not use the Website.
          </p>

          <h2>1. Use of the Website</h2>
          <p>
            This Website functions as a portfolio, informational platform, and commercial space related to artistic works, projects, and services by Soraia Oliveira.
          </p>
          <p>
            You agree to use the Website lawfully and respectfully, without interfering with its operation or misusing its content.
          </p>

          <h2>2. Intellectual Property</h2>
          <p>
            All content on this Website, including artworks, photographs, videos, texts, designs, logos, and visual identity, is the exclusive property of <strong>Soraia Oliveira</strong>, unless otherwise stated.
          </p>
          <p>All content is protected by copyright and intellectual property laws.</p>
          <p>
            <strong>No content may be reproduced, distributed, modified, published, licensed, or used in any form without prior written consent</strong>, including use on websites, social media, publications, commercial materials, or AI-related systems.
          </p>
          <p>Unauthorized use may result in legal action.</p>

          <h2>3. User Communications</h2>
          <p>
            If you submit messages, inquiries, or other communications through the Website, you confirm that the information provided is accurate and lawful.
          </p>
          <p>
            Such communications are used solely for responding to your request or for administrative and service-related purposes. We do not claim ownership over private communications.
          </p>

          <h2>4. Sales, Services, and Availability</h2>
          <p>
            Any artworks, products, or services presented on the Website are subject to availability. Descriptions, prices, and conditions may change without notice.
          </p>
          <p>
            Specific terms related to purchases, commissions, licensing, or collaborations may be communicated separately and will take precedence where applicable.
          </p>

          <h2>5. Disclaimer</h2>
          <p>
            The Website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis. While care is taken to ensure accuracy, we do not guarantee that the Website will be uninterrupted or error-free.
          </p>
          <p>Artistic works are subjective by nature, and interpretations may vary.</p>

          <h2>6. Limitation of Liability</h2>
          <p>
            To the fullest extent permitted by law, Soraia Oliveira shall not be liable for any indirect or consequential damages arising from the use of, or inability to use, the Website or its content.
          </p>

          <h2>7. Governing Law</h2>
          <p>
            These Terms are governed by the laws of Portugal. Any disputes shall be subject to the exclusive jurisdiction of the Portuguese courts.
          </p>

          <h2>8. Contact</h2>
          <p>For questions regarding these Terms, please contact:</p>
          <p>
            Email: <a href="mailto:contact@soraia-oliveira.com">contact@soraia-oliveira.com</a>
            <br />
            Website: <a href="https://www.soraia-oliveira.com">https://www.soraia-oliveira.com</a>
          </p>
        </div>
      </div>
    </Section>
  );
}
