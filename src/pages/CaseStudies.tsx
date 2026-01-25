import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const caseStudies = [
  {
    id: 1,
    title: "Scaling SaaS Platform",
    subtitle: "Series A",
    problem: [
      "Fragmented architecture",
      "Missed delivery deadlines",
      "Founder acting as de-facto CTO",
    ],
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
    problem: [
      "Multiple external vendors",
      "No end-to-end accountability",
      "Poor data integrity across systems",
    ],
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
    problem: [
      "High regulatory risk",
      "Unstructured clinical and signal data",
      "AI ambitions without foundation",
    ],
    approach: [
      "Built secure data ingestion and normalization pipeline",
      "Introduced governance for AI usage",
      "Aligned product, engineering, and compliance teams",
    ],
    results: [
      "AI-ready data foundation established",
      "Reduced operational risk exposure",
    ],
  },
];

export default function CaseStudies() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Case Studies
            </h1>
            <p className="mt-6 text-xl font-body text-subtle">
              Real outcomes from real engagements. Names and identifying details
              anonymized.
            </p>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="space-y-20">
            {caseStudies.map((study, index) => (
              <article
                key={study.id}
                className={`grid lg:grid-cols-12 gap-8 lg:gap-12 ${
                  index !== caseStudies.length - 1
                    ? "pb-20 border-b border-divider"
                    : ""
                }`}
              >
                <div className="lg:col-span-4">
                  <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                    Case Study {String(study.id).padStart(2, "0")}
                  </span>
                  <h2 className="mt-2 font-heading text-2xl md:text-3xl font-semibold text-heading">
                    {study.title}
                  </h2>
                  <p className="mt-2 text-base font-body text-subtle">
                    {study.subtitle}
                  </p>
                </div>

                <div className="lg:col-span-8 grid md:grid-cols-3 gap-8">
                  <div>
                    <h3 className="text-xs font-body font-semibold uppercase tracking-wider text-heading mb-4">
                      Problem
                    </h3>
                    <ul className="space-y-2">
                      {study.problem.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-body text-subtle leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-body font-semibold uppercase tracking-wider text-heading mb-4">
                      Approach Taken
                    </h3>
                    <ul className="space-y-2">
                      {study.approach.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-body text-subtle leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="text-xs font-body font-semibold uppercase tracking-wider text-heading mb-4">
                      Results
                    </h3>
                    <ul className="space-y-2">
                      {study.results.map((item) => (
                        <li
                          key={item}
                          className="text-sm font-body text-foreground font-medium leading-relaxed"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold">
              Ready to achieve similar results?
            </h2>
            <p className="mt-4 text-lg font-body text-primary-foreground/80">
              Let's discuss your specific challenges and how I can help.
            </p>
            <div className="mt-8">
              <Link to="/apply">
                <Button
                  variant="outline"
                  size="xl"
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                >
                  Apply to Work Together
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
