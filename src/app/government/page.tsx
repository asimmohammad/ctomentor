import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Government & Defense Technology Leadership | FedRAMP, IL5, GovCloud | The CTO Mentor",
  description:
    "Fractional CTO services for GovTech companies pursuing FedRAMP authorization, IL5 compliance, and AWS GovCloud migration.",
  alternates: { canonical: "https://thectomentor.com/government" },
};

const capabilities = [
  "FedRAMP readiness assessment and authorization strategy",
  "AWS GovCloud migration planning and execution oversight",
  "IL5 authorization and ICAM integration",
  "SOC 2 Type II compliance architecture",
  "Security posture assessment for government RFP responses",
];

export default function GovernmentPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-4xl">
          <h1 className="font-display text-h1 text-ink">
            Navigate the Complexity of Government Technology with Confidence
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            Fractional CTO services for GovTech companies and defense contractors pursuing FedRAMP, IL5, and DoD
            compliance.
          </p>
          <div className="mt-10">
            <Link href="/assessment">
              <Button variant="primary" size="xl">
                Take the Technical Risk Assessment
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2 text-ink mb-8">Capabilities</h2>
        <ul className="space-y-4 max-w-3xl">
          {capabilities.map((item) => (
            <li key={item} className="flex items-start gap-4 text-body font-text text-ink">
              <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* Why This Matters */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">Why This Matters</h2>
          <p className="text-lead font-text text-ink">
            Government and DoD contracts require technology compliance that most fractional CTOs cannot credibly advise
            on. My active, hands-on experience with these exact requirements — SOC 2 Type II, AWS GovCloud migration,
            FedRAMP readiness, IL5 authorization, and ICAM integration — means you get practical guidance, not
            theoretical frameworks. I'm in the trenches with these initiatives today.
          </p>
        </div>
      </Section>

      {/* Engagement Model */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">Engagement Model</h2>
          <p className="text-lead font-text text-ink mb-10">
            Diagnostic Sprint or Embedded Technology Leadership depending on scope and timeline. We define the right
            model after the Technical Risk Assessment or a confidential conversation.
          </p>
          <Link href="/book">
            <Button variant="primary" size="xl">
              Request a confidential conversation
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

