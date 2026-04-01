import type { Metadata } from "next";
import { Section } from "@/components/layout/section";

export const metadata: Metadata = {
  title: "Refund Policy",
  description: "Refund Policy for purchases made through soraia-oliveira.com.",
};

export default function RefundPolicyPage() {
  return (
    <Section className="pt-8 md:pt-12">
      <div className="max-w-2xl">
        <div className="flex items-center gap-4 mb-8">
          <span className="block h-px w-8 bg-[var(--color-ink-muted)]" aria-hidden="true" />
          <p className="text-[10px] font-medium tracking-[0.2em] uppercase text-[var(--color-ink-muted)]">Legal</p>
        </div>

        <h1 className="heading-1 mb-12">Refund Policy</h1>

        <div className="prose-legal">
          <p>
            This Refund Policy applies to all purchases made through <a href="https://www.soraia-oliveira.com">www.soraia-oliveira.com</a>.
          </p>
          <p>By placing an order, you agree to the terms outlined below.</p>

          <h2>1. All Sales Are Final</h2>
          <p>
            All artworks sold through this Website are original works or editions, including limited editions and unlimited editions.
          </p>
          <p>All works are carefully prepared, inspected, and securely packaged prior to shipment.</p>
          <p>Refunds, returns, or replacements are not accepted under any circumstances, including but not limited to:</p>
          <ul>
            <li>change of mind</li>
            <li>personal preference</li>
            <li>damage during transit</li>
            <li>loss or delays caused by shipping carriers</li>
          </ul>

          <h2>2. Condition &amp; Shipping</h2>
          <p>All artworks are shipped in excellent condition and with appropriate protective packaging.</p>
          <p>Once an artwork has been shipped, responsibility for the shipment transfers to the buyer.</p>

          <h2>3. Shipping Costs &amp; Duties</h2>
          <p>
            Shipping costs, customs fees, and import duties are the responsibility of the buyer and are non-refundable.
          </p>

          <h2>4. Contact</h2>
          <p>If you have any questions regarding this Refund Policy, please contact:</p>
          <p>
            Email: <a href="mailto:contact@soraia-oliveira.com">contact@soraia-oliveira.com</a>
          </p>
        </div>
      </div>
    </Section>
  );
}
