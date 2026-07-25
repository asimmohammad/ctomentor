import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";

export const metadata: Metadata = {
  title: "Case Studies | The CTO Mentor",
  description:
    "Real outcomes from anonymized engagements demonstrating technology turnarounds, scaling SaaS platforms, and regulated environment transformations.",
  alternates: { canonical: "https://thectomentor.com/case-studies" },
};

const caseStudies = [
  {
    id: 1,
    title: "Scaling SaaS Platform",
    subtitle: "Series A",
    problem: ["Fragmented architecture", "Missed delivery deadlines", "Founder acting as de-facto CTO"],
    approach: [
      "Re-architected core services",
      "Introduced clear ownership across teams",
      "Rebuilt delivery process with measurable milestones",
      "Removed two underperforming vendors",
    ],
    results: [
      "40% improvement in release predictability",
      "Reduced cloud spend by ~30%",
      "Founder exited day-to-day technical management",
    ],
  },
  {
    id: 2,
    title: "Travel & Commerce Platform",
    subtitle: "Multi-vendor Integration",
    problem: ["Multiple external vendors", "No end-to-end accountability", "Poor data integrity across systems"],
    approach: [
      "Designed unified platform architecture",
      "Established vendor governance model",
      "Implemented pricing and inventory controls",
      "Introduced AI-assisted monitoring workflows",
    ],
    results: [
      "Single source of truth across booking and fulfillment",
      "Improved margin control",
      "Clear operational ownership restored",
    ],
  },
  {
    id: 3,
    title: "Healthcare / Data-Intensive Organization",
    subtitle: "Regulated Environment",
    problem: ["High regulatory risk", "Unstructured clinical and signal data", "AI ambitions without foundation"],
    approach: [
      "Built secure data ingestion and normalization pipeline",
      "Introduced governance for AI usage",
      "Aligned product, engineering, and compliance teams",
    ],
    results: ["AI-ready data foundation established", "Reduced operational risk exposure"],
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-3xl">
          <h1 className="font-display text-h1 text-ink">
            Case Studies
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            Real outcomes from real engagements. Names and identifying details anonymized.
          </p>
        </div>
      </Section>

      {/* Case Studies */}
      <Section spacing="standard" tone="paper">
        <div className="space-y-20">
          {caseStudies.map((study, index) => (
            <article
              key={study.id}
              className={`grid lg:grid-cols-12 gap-8 lg:gap-12 ${
                index !== caseStudies.length - 1 ? "pb-20 border-b border-border" : ""
              }`}
            >
              <div className="lg:col-span-4">
                <span className="eyebrow text-accent">
                  Case Study {String(study.id).padStart(2, "0")}
                </span>
                <h2 className="mt-2 font-display text-h3 text-ink">
                  {study.title}
                </h2>
                <p className="mt-2 text-body font-text text-ink-muted">{study.subtitle}</p>
              </div>

              <div className="lg:col-span-8 grid md:grid-cols-3 gap-8">
                <div>
                  <h3 className="eyebrow text-ink mb-4">
                    Problem
                  </h3>
                  <ul className="space-y-2">
                    {study.problem.map((item) => (
                      <li key={item} className="text-small font-text text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="eyebrow text-ink mb-4">
                    Approach Taken
                  </h3>
                  <ul className="space-y-2">
                    {study.approach.map((item) => (
                      <li key={item} className="text-small font-text text-ink-muted">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="eyebrow text-ink mb-4">
                    Results
                  </h3>
                  <ul className="space-y-2">
                    {study.results.map((item) => (
                      <li key={item} className="text-small font-text text-ink font-medium">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="standard" tone="dark">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-ink-inverse">
            Ready to achieve similar results?
          </h2>
          <p className="mt-4 text-lead font-text text-ink-inverse/80">
            Let's discuss your specific challenges and how I can help.
          </p>
          <div className="mt-8">
            <Link href="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-ink-inverse/30 text-ink-inverse hover:bg-ink-inverse hover:text-dark-band"
              >
                Apply to Work Together
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

