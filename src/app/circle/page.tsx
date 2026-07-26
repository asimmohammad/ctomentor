import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "TCM Mentors Circle | The CTO Mentor",
  description:
    "A peer-level operating group for CTOs ready to lead with authority, clarity, and execution discipline.",
  alternates: { canonical: "https://thectomentor.com/circle" },
};

const benefits = [
  "Monthly small-group sessions with peer CTOs",
  "Direct access for async questions and decisions",
  "Curated resources and frameworks",
  "Accountability and strategic perspective",
];

export default function CirclePage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-3xl">
          <span className="eyebrow text-accent">
            TCM Mentors Circle
          </span>
          <h1 className="mt-4 font-display text-h1 text-ink">
            For CTOs who want to lead with authority and execution discipline.
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            A peer-level operating group for CTOs ready to lead with authority, clarity, and execution discipline.
          </p>
        </div>
      </Section>

      {/* Details */}
      <Section spacing="standard" tone="paper">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <h2 className="font-display text-h2 text-ink">What's Included</h2>
            <ul className="mt-8 space-y-4">
              {benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-4 text-body font-text text-ink">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  {benefit}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="bg-card border border-border p-8 lg:p-10">
              <span className="eyebrow text-accent">
                Membership
              </span>
              <div className="mt-4">
                <span className="font-display text-h2 text-ink metric">By application</span>
              </div>
              <p className="mt-4 text-body font-text text-ink-muted">
                Limited spots available. Application required.
              </p>
              <div className="mt-8">
                <Link href="/book">
                  <Button variant="primary" size="xl" className="w-full">
                    Request a confidential conversation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Who It's For */}
      <Section spacing="standard" tone="alt" className="border-t border-border">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink">Who It's For</h2>
          <p className="mt-6 text-lead font-text text-ink-muted">
            This is for technology leaders who are past the early chaos but want to operate at a higher altitude. You
            want strategic clarity and the perspective of peers who understand the weight of the role.
          </p>
          <p className="mt-4 text-lead font-text text-ink-muted">
            If you're a first-time CTO navigating a board, a technical founder stepping into leadership, or an
            experienced leader in a new context — TCM Mentors Circle provides the structure and community to accelerate
            your growth.
          </p>
        </div>
      </Section>
    </>
  );
}

