import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";

const tiers = [
  {
    name: "CTO-Lite",
    price: "$7,500",
    period: "/month",
    description: "Best for: Pre-seed / Seed startups",
    includes: [
      "Architecture & stack decisions",
      "Hiring strategy & interviews",
      "Vendor evaluation",
      "Monthly executive sync",
    ],
    excludes: ["Hands-on coding", "Daily team management"],
  },
  {
    name: "Growth CTO",
    price: "$12,500",
    period: "/month",
    description: "Best for: Scaling startups",
    recommended: true,
    includes: [
      "Engineering org design",
      "Delivery accountability",
      "AI adoption strategy",
      "Roadmap & priority governance",
      "Direct leadership of tech leads / EMs",
    ],
    excludes: [],
  },
  {
    name: "Strategic CTO",
    price: "$18,000+",
    period: "/month",
    description: "Best for: Complex, regulated, or PE-backed companies",
    includes: [
      "Board-level reporting",
      "Multi-vendor orchestration",
      "Risk & compliance oversight",
      "M&A technical diligence",
    ],
    excludes: [],
  },
];

const advisoryServices = [
  "Architecture reviews",
  "AI readiness assessments",
  "Vendor & cost audits",
  "Delivery risk analysis",
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Choose the level of ownership you need.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle">
              I don't sell hours. I take responsibility for outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading mb-12">
            Fractional CTO Engagements
          </h2>
          <div className="grid lg:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative bg-card border p-8 ${
                  tier.recommended
                    ? "border-accent"
                    : "border-divider"
                }`}
              >
                {tier.recommended && (
                  <span className="absolute -top-3 left-8 bg-accent text-accent-foreground px-3 py-1 text-xs font-body font-semibold uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <h3 className="font-heading text-xl font-semibold text-heading">
                  {tier.name}
                </h3>
                <div className="mt-4 flex items-baseline gap-1">
                  <span className="font-heading text-3xl font-semibold text-heading">
                    {tier.price}
                  </span>
                  <span className="font-body text-subtle">{tier.period}</span>
                </div>
                <p className="mt-2 text-sm font-body text-subtle">
                  {tier.description}
                </p>

                <div className="mt-8">
                  <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-heading mb-4">
                    Includes
                  </h4>
                  <ul className="space-y-3">
                    {tier.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 text-sm font-body text-foreground"
                      >
                        <Check
                          size={16}
                          className="text-accent flex-shrink-0 mt-0.5"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {tier.excludes.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-subtle mb-4">
                      Excludes
                    </h4>
                    <ul className="space-y-3">
                      {tier.excludes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-3 text-sm font-body text-subtle"
                        >
                          <X
                            size={16}
                            className="text-subtle/50 flex-shrink-0 mt-0.5"
                          />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisory Section */}
      <section className="bg-section-gradient border-t border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading">
                Advisory & Audits
              </h2>
              <p className="mt-4 text-lg font-body text-subtle">
                Fixed-scope engagements including:
              </p>
              <ul className="mt-6 space-y-3">
                {advisoryServices.map((service) => (
                  <li
                    key={service}
                    className="flex items-center gap-3 text-base font-body text-foreground"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                    {service}
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-base font-body text-heading font-medium">
                Outcome: Clear recommendations, not theoretical decks.
              </p>
            </div>
            <div className="lg:pl-12">
              <div className="bg-card border border-divider p-8">
                <p className="font-body text-subtle text-sm uppercase tracking-wider">
                  Ready to start?
                </p>
                <h3 className="mt-2 font-heading text-xl font-semibold text-heading">
                  Let's discuss your challenges.
                </h3>
                <div className="mt-6">
                  <Link to="/apply">
                    <Button variant="primary" size="lg" className="w-full">
                      Apply to Work Together
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
