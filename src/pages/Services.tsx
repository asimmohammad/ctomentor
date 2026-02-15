import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const tiers = [
  {
    id: "advisory",
    title: "CTO Advisory",
    price: "Starting at $5,000/month",
    bestFor: "Founders/CEOs who need a senior technology sounding board without embedded leadership",
    cta: "Book an Advisory Discovery Call",
    ctaHref: "/apply",
    features: [
      "Monthly strategic sessions (2x per month, 60–90 minutes each)",
      "Async access via Slack or email for ad-hoc technical decisions",
      "Architecture reviews and technology roadmap guidance",
      "Quarterly OKR/KPI alignment sessions",
    ],
  },
  {
    id: "embedded",
    title: "Embedded CTO Leadership",
    price: "Starting at $12,000/month",
    bestFor: "Companies in transition — scaling from 10 to 100 engineers, navigating a CTO search, or preparing for a funding round",
    cta: "Schedule an Embedded Leadership Consultation",
    ctaHref: "/apply",
    features: [
      "1–2 days per week embedded with your leadership team",
      "Board meeting attendance and investor communication support",
      "Hiring decisions, team structure, and engineering culture development",
      "Architecture ownership and hands-on technical direction",
      "Process implementation: CI/CD, code review standards, incident response",
    ],
  },
  {
    id: "due-diligence",
    title: "Technical Due Diligence & Assessments",
    price: "Starting at $15,000 per engagement",
    bestFor: "Private equity firms, venture capital firms, and acquirers evaluating technology companies",
    cta: "Request a Due Diligence Proposal",
    ctaHref: "/apply",
    features: [
      "Pre-acquisition technology assessment for PE/VC firms",
      "Comprehensive platform audit: architecture, security, scalability, technical debt",
      "Team capability and organizational health evaluation",
      "Post-acquisition technology integration roadmap",
      "Deliverable: Executive-ready report with risk matrix, recommendations, and effort estimates",
    ],
  },
];

export default function Services() {
  return (
    <Layout>
      <PageMeta
        title="CTO Advisory, Embedded Leadership & Technical Due Diligence | The CTO Mentor"
        description="Three tiers of technology leadership: CTO Advisory ($5K/mo), Embedded CTO ($12K/mo), and Technical Due Diligence ($15K+). Book a discovery call today."
      />

      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Three ways to work with me
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              From monthly advisory to embedded leadership to one-off technical due diligence — choose the tier that fits your stage and needs.
            </p>
          </div>
        </div>
      </section>

      {/* Three tiers */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid md:grid-cols-3 gap-8">
            {tiers.map((tier) => (
              <Card key={tier.id} id={tier.id} className="border-divider flex flex-col h-full">
                <CardContent className="p-8 flex flex-col h-full">
                  <span className="text-sm font-body font-semibold text-accent">{tier.price}</span>
                  <h2 className="mt-2 font-heading text-2xl font-semibold text-heading">{tier.title}</h2>
                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-sm font-body text-foreground">
                        <Check size={18} className="text-accent flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-sm font-body text-subtle">
                    <span className="font-semibold text-foreground">Best for:</span> {tier.bestFor}
                  </p>
                  <Link to={tier.ctaHref} className="mt-6">
                    <Button variant="primary" size="lg" className="w-full">
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-base font-body text-subtle mb-4">Not sure which is right?</p>
            <Link to="/apply">
              <Button variant="outline" size="xl">
                Book a call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              Let's find the right fit
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              In a 30-minute discovery call, we'll assess your situation and recommend the cleanest path — whether that's advisory, embedded leadership, or due diligence.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book a Free Discovery Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
