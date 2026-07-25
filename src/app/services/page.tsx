import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Section } from "@/components/layout/Section";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "CTO Advisory Services & Pricing | The CTO Mentor",
  description:
    "Three tiers of CTO advisory: Strategic Advisory ($5K/mo), Embedded Leadership ($12K/mo), and Technical Due Diligence ($15-25K). No hourly rates. Real CTO experience.",
  alternates: { canonical: "https://thectomentor.com/services" },
};

const tiers = [
  {
    id: "advisory",
    name: "Strategic CTO Advisory",
    price: "Starting at $5,000 / month",
    positioning:
      "Senior technology counsel for leaders who need a strategic sounding board — not another consultant with a slide deck.",
    features: [
      "Two 60-90 minute strategy sessions per month (video)",
      "Asynchronous access via Slack or email for time-sensitive decisions",
      "Architecture and technology stack reviews",
      "Vendor evaluation and selection guidance",
      "Quarterly technology roadmap alignment",
      "Security posture and compliance readiness assessment",
      "Access to my vetted network of senior engineers, architects, and security specialists",
    ],
    idealFor:
      "Founders and CEOs at growth-stage companies ($2M-$30M revenue) who need experienced technology guidance without the overhead of a full-time CTO. You have a development team that's executing — you need someone who ensures they're building the right things, the right way.",
    cta: "Book an Advisory Discovery Call",
    ctaVariant: "outline" as const,
    recommended: false,
  },
  {
    id: "embedded",
    name: "Embedded Technology Leadership",
    price: "Starting at $12,000 / month",
    badge: "Most Common Engagement",
    positioning:
      "I become part of your leadership team — attending your meetings, making hiring decisions, and owning technology outcomes alongside you.",
    features: [
      "1-2 days per week embedded with your leadership team",
      "Board meeting and investor communication support",
      "Engineering hiring: job descriptions, interviews, and offer decisions",
      "Architecture ownership and hands-on technical direction",
      "CI/CD pipeline, code review standards, and incident response process implementation",
      "Team structure, engineering culture, and performance framework development",
      "Ongoing security and compliance oversight (SOC 2, FedRAMP readiness, cloud security)",
    ],
    idealFor:
      "Companies navigating a critical growth phase — scaling from 10 to 100 engineers, preparing for a funding round, managing a CTO transition, or building the technology foundation for a market expansion. You need someone who owns outcomes, not someone who sends recommendations and disappears.",
    cta: "Schedule a Leadership Consultation",
    ctaVariant: "primary" as const,
    recommended: true,
  },
  {
    id: "due-diligence",
    name: "Technical Due Diligence & Assessments",
    price: "Starting at $15,000 per engagement",
    positioning:
      "Independent, investor-grade technology assessment — built from the perspective of someone who has been on both sides of the due diligence table.",
    features: [
      "Comprehensive platform architecture audit (infrastructure, data, application layers)",
      "Security vulnerability assessment and compliance posture review",
      "Scalability and performance risk analysis",
      "Technical debt quantification with remediation roadmap",
      "Engineering team capability and organizational health evaluation",
      "Executive-ready deliverable: risk matrix, recommendations, effort estimates, and ROI projections",
      "Optional: post-acquisition technology integration roadmap and interim CTO support",
    ],
    idealFor:
      "Private equity firms, venture capital firms, and corporate acquirers evaluating technology companies for investment or acquisition. Also valuable for boards and CEOs who want an independent assessment of their own technology organization before a major strategic decision. Engagements with PE/VC portfolio companies are structured to include equity or co-investment rights where appropriate.",
    cta: "Request a Due Diligence Proposal",
    ctaVariant: "outline" as const,
    recommended: false,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Discovery Call",
    description:
      "We spend 30 minutes discussing your technology challenges, team structure, and business goals. No pitch — just an honest conversation about whether I can help.",
    icon: null,
  },
  {
    step: 2,
    title: "Tailored Proposal",
    description:
      "Based on our conversation, I'll send a proposal outlining the engagement scope, timeline, deliverables, and investment. Every proposal is custom — I don't do cookie-cutter packages.",
    icon: null,
  },
  {
    step: 3,
    title: "Onboarding & Impact",
    description:
      "Engagements typically begin within 1-2 weeks. For advisory and embedded work, we establish communication rhythms, access, and initial priorities in the first session. For due diligence, I deliver the assessment within 2-4 weeks depending on scope.",
    icon: null,
  },
];

const faqs = [
  {
    q: "How is this different from hiring a consulting firm?",
    a: "Consulting firms deliver recommendations. I deliver outcomes. I'm a practicing CTO — currently leading technology for a SOC 2 Type II certified SaaS platform with active AWS GovCloud and FedRAMP initiatives. When I advise you on architecture, security, or compliance, it's because I'm doing the same work in my own organization right now. I don't hand you a report and disappear — I stay in the trenches with you.",
  },
  {
    q: "Can I start with advisory and scale up to embedded?",
    a: "Absolutely — and many clients do exactly this. Advisory is a great way to build a working relationship and assess fit before committing to deeper engagement. There's no lock-in or long-term contract required for any tier.",
  },
  {
    q: "What's the minimum engagement length?",
    a: "Advisory and embedded engagements have a three-month initial commitment to allow enough time for meaningful impact. After that, engagements continue month-to-month with 30 days' notice. Due diligence is project-based with a defined timeline and deliverable.",
  },
  {
    q: "Do you take equity as compensation?",
    a: "For the right company and the right situation, I'm open to structuring a portion of compensation as equity alongside a cash retainer. This is handled on a case-by-case basis during our proposal conversation — it's not a standard offering.",
  },
  {
    q: "What industries do you specialize in?",
    a: "My deepest expertise is in B2B SaaS, loyalty and rewards platforms, travel technology, and government/defense technology. That said, the fundamentals of scaling engineering teams, building secure infrastructure, and navigating compliance apply broadly. If you're unsure whether your industry is a fit, let's talk — I'll be straightforward about whether I can add value.",
  },
  {
    q: "Do you work with companies outside the US?",
    a: "My primary focus is US-based companies, particularly those serving government and enterprise markets where compliance requirements demand US-based leadership. I'm open to discussing international engagements on a case-by-case basis.",
  },
  {
    q: "What happens if we decide to hire a full-time CTO?",
    a: "That's a great outcome — it means we've built the technology foundation and team to a point where full-time leadership makes sense. I can help with the CTO search process, interview candidates, and ensure a smooth transition. Several of my embedded engagements have ended this way, and I consider it a success.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: "CTO Advisory Services",
            provider: {
              "@type": "Person",
              name: "Asim Mohammad",
            },
            url: "https://thectomentor.com/services",
            serviceType: [
              "Strategic CTO Advisory",
              "Embedded Technology Leadership",
              "Technical Due Diligence",
            ],
          }),
        }}
      />

      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-3xl">
          <h1 className="font-display text-h1 text-ink">
            Engagement Models
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            Strategic technology leadership tailored to your stage, your challenge, and your timeline. Every engagement
            starts with a conversation — not a contract.
          </p>
        </div>
      </Section>

      {/* Three-tier cards */}
      <Section spacing="standard" tone="paper">
        <Grid>
          {tiers.map((tier) => (
            <GridItem key={tier.id} span={12} md={4}>
              <Card
                id={tier.id}
                className={`flex flex-col h-full transition-colors duration-standard hover:border-ink ${
                  tier.recommended ? "border-accent ring-1 ring-accent/20" : "border-border"
                }`}
              >
                <CardContent className="p-8 flex flex-col h-full">
                  {tier.badge && (
                    <span className="eyebrow text-accent mb-4 inline-block">
                      {tier.badge}
                    </span>
                  )}
                  <h2 className="font-text text-h3 text-ink">{tier.name}</h2>
                  <p className="mt-2 text-small font-text text-ink-muted">{tier.price}</p>
                  <p className="mt-4 text-body font-text text-ink">{tier.positioning}</p>
                  <ul className="mt-6 space-y-3 flex-1">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3 text-small font-text text-ink">
                        <Check size={18} className="text-accent flex-shrink-0 mt-0.5" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 text-small font-text text-ink-muted">
                    <span className="font-semibold text-ink">Ideal for:</span> {tier.idealFor}
                  </p>
                  <Link href="/apply" className="mt-6">
                    <Button variant={tier.ctaVariant} size="lg" className="w-full">
                      {tier.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Section>

      {/* Not sure section */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-display text-h2 text-ink mb-6">
            Not Sure Which Engagement Fits?
          </h2>
          <p className="text-lead font-text text-ink-muted mb-10">
            Most relationships start with a 30-minute discovery call. I'll ask about your technology challenges, your
            team, and your goals — and I'll tell you honestly which engagement model makes sense. Sometimes the answer
            is "you don't need me yet," and that's fine too.
          </p>
          <Link href="/apply">
            <Button variant="outline" size="xl">
              Book a Free Discovery Call
            </Button>
          </Link>
        </div>
      </Section>

      {/* How engagements work */}
      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2 text-ink mb-12">How Engagements Work</h2>
        <Grid>
          {howItWorks.map((item) => (
            <GridItem key={item.step} span={12} md={4}>
              <span className="eyebrow text-accent">Step {item.step}</span>
              <h3 className="mt-2 font-text text-h4 text-ink">{item.title}</h3>
              <p className="mt-3 text-body font-text text-ink-muted">{item.description}</p>
            </GridItem>
          ))}
        </Grid>
      </Section>

      {/* FAQ */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <h2 className="font-display text-h2 text-ink mb-12">
          Frequently Asked Questions
        </h2>
        <div className="max-w-3xl">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="font-text text-left font-semibold text-ink py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-body font-text text-ink-muted pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      {/* Final CTA */}
      <Section spacing="standard" tone="dark">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-ink-inverse mb-6">
            Let's Talk About Your Technology Challenges
          </h2>
          <p className="text-lead font-text text-ink-inverse/90 mb-10">
            Every engagement starts with a conversation. Book a free 30-minute discovery call and I'll give you an
            honest assessment of how I can help — or whether you need something different entirely.
          </p>
          <Link href="/apply">
            <Button
              variant="outline"
              size="xl"
              className="border-ink-inverse/30 text-ink-inverse hover:bg-ink-inverse hover:text-dark-band"
            >
              Book a Discovery Call
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

