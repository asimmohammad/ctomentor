import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const whoThisIsFor = [
  "Founder-led companies where technology execution is critical to business outcomes",
  "Post-fundraise companies facing execution pressure and scaling challenges",
  "Organizations with CTO/VP Eng gaps or leadership misalignment",
  "Companies preparing for scale, platform shifts, or M&A where technical readiness matters",
  "Boards and investors who need execution truth, not optimism",
  "Companies where the cost of getting technology wrong is high",
];

const whoThisIsNotFor = [
  "Companies seeking hourly consulting or part-time advisory",
  "Organizations looking for staff augmentation or dev shop capacity",
  "Early-stage startups pre-product-market fit without clear technical needs",
  "Companies with budgets under $25k/month for ongoing engagements",
  "Organizations that want slide-driven strategy without execution accountability",
  "Founders who aren't ready to give real decision-making authority",
  "Companies seeking a fractional CTO who splits time across multiple clients",
];

const whatWeOwn = [
  {
    category: "Technical Strategy & Architecture",
    items: [
      "Platform and architecture decisions with full accountability",
      "Technology roadmap and technical debt management",
      "Build vs. buy decisions and vendor selection",
      "AI and data strategy alignment with business goals",
    ],
  },
  {
    category: "Execution & Delivery",
    items: [
      "Delivery velocity and quality standards",
      "Team structure, hiring, and performance management",
      "Vendor and offshore governance",
      "Budget control and cost optimization",
    ],
  },
  {
    category: "Leadership & Communication",
    items: [
      "Board and investor technical communication",
      "Executive team alignment on technical tradeoffs",
      "Crisis management and incident leadership",
      "Stakeholder management across engineering, product, and business",
    ],
  },
  {
    category: "Organizational Design",
    items: [
      "Engineering org structure and accountability systems",
      "Operating cadence and decision-making processes",
      "Team culture and performance standards",
      "Transition planning and leadership development",
    ],
  },
];

const engagementModel = [
  {
    phase: "Initial Assessment & Alignment",
    description: "90-day intensive reset for broken organizations, or structured onboarding for ongoing engagements. We diagnose reality, establish operating cadence, and define clear ownership boundaries.",
  },
  {
    phase: "Embedded Execution",
    description: "We operate as an operating executive—embedded in decision-making, owning outcomes, and driving execution. We're in the trenches where decisions are made, with direct access to teams and real-time context.",
  },
  {
    phase: "Ongoing Leadership",
    description: "For sustained engagements, we maintain CTO-level leadership with predictable cadence. Weekly exec syncs, bi-weekly deep dives, monthly board memos. Structure without bureaucracy.",
  },
  {
    phase: "Transition & Handoff",
    description: "We build systems and teams that can operate independently. When it's time to transition—whether to a full-time CTO or internal leader—we ensure continuity and knowledge transfer.",
  },
];

const compensationPhilosophy = [
  {
    principle: "Cash + Equity Alignment",
    description: "We structure compensation as cash (monthly retainer or fixed fee) plus meaningful equity participation. This aligns our incentives with long-term value creation and outcomes that compound.",
  },
  {
    principle: "Equity Justifies Premium",
    description: "Equity participation reflects the operating executive-level ownership we take. We're partners with skin in the game. This justifies premium pricing and ensures we're invested in outcomes that compound.",
  },
  {
    principle: "Cash Ensures Execution Focus",
    description: "Cash compensation ensures we're paid for execution, not promises. It keeps us focused on your success, not exit timing. The combination of cash + equity creates the right incentive structure for both parties.",
  },
  {
    principle: "Transparent Structure",
    description: "Compensation structure is defined upfront: cash component (retainer or fixed fee), equity component (typically 0.5%–2% depending on stage and scope), and clear milestones or triggers for equity vesting.",
  },
];

const exitScenarios = [
  {
    scenario: "Transition to Full-Time CTO",
    description: "When you're ready to hire a full-time CTO, we facilitate the transition. We help recruit, onboard, and ensure knowledge transfer. Our role shifts to execution support during the transition period, then we exit cleanly.",
  },
  {
    scenario: "Internal Leader Promotion",
    description: "If an internal leader is ready to step up, we help develop them into the role. We provide execution support, structure, and leadership development during the transition, then step back as they take full ownership.",
  },
  {
    scenario: "Engagement Completion",
    description: "For fixed-scope engagements (turnarounds, scale programs), we complete deliverables, document systems, and hand off to your team. We remain available for defined execution support if needed.",
  },
  {
    scenario: "Strategic Pivot or Exit",
    description: "If the company pivots or exits, we ensure technical assets are properly documented and transitioned. Equity participation aligns us through the exit, and we support the process as needed.",
  },
];

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Operator-in-Residence / Equity CTO
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              Embedded execution leadership with full accountability. We operate as an operating executive—owning the CTO function, driving outcomes, and taking responsibility for results that matter.
            </p>
            <p className="mt-4 text-lg font-body text-foreground leading-relaxed">
              CEO-level partnership with execution authority and equity alignment. We embed directly into the business with full ownership of technology outcomes.
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Apply for an Operator-in-Residence Engagement
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="xl">
                  Learn More About TCM
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Opening Statement */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              What Is an Operator-in-Residence?
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              An Operator-in-Residence is an operating executive who embeds in your organization with full execution authority and accountability. We operate with dedicated focus on your business, owning the CTO function with the same responsibility as a full-time executive.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We make decisions. We drive execution. We own outcomes. We take equity because we're building long-term value and creating outcomes that compound.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed font-medium">
              This model works for founder-led companies where technology execution is critical, the stakes are high, and the cost of getting it wrong is unacceptable.
            </p>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-8">
            Who This Is For
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {whoThisIsFor.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-card border border-divider p-6 rounded-lg"
              >
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                <p className="text-base font-body text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who This Is Not For */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-8">
            Who This Is Not For
          </h2>
          <p className="text-lg font-body text-subtle mb-8 max-w-3xl">
            We're explicit about fit because misalignment wastes everyone's time. If you're looking for any of the following, we're not the right partner:
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
            {whoThisIsNotFor.map((item, index) => (
              <div
                key={index}
                className="flex items-start gap-4 bg-card border border-divider p-6 rounded-lg"
              >
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                <p className="text-base font-body text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What We Actually Own */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
            What We Actually Own
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            Accountability means ownership. When we engage as Operator-in-Residence, we take full responsibility for these domains:
          </p>
          <div className="space-y-8">
            {whatWeOwn.map((category, index) => (
              <Card key={index} className="border-divider">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-semibold text-heading mb-6">
                    {category.category}
                  </h3>
                  <ul className="space-y-3">
                    {category.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex items-start gap-3 text-base font-body text-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
            Engagement Model
          </h2>
            <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            We structure engagements around outcomes and accountability. Every engagement follows a clear operating cadence with defined decision rights and communication rhythms.
          </p>
          <div className="space-y-6 max-w-4xl">
            {engagementModel.map((phase, index) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <span className="text-xs font-body font-semibold text-accent tracking-wider">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <div className="flex-1">
                  <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                    {phase.phase}
                  </h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compensation Philosophy */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
            Compensation Philosophy
          </h2>
            <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            We structure compensation as cash + equity because alignment matters. Cash ensures execution focus. Equity ensures long-term value creation. Together, they create the right incentive structure for operating executive partnership.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {compensationPhilosophy.map((principle, index) => (
              <Card key={index} className="border-divider">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                    {principle.principle}
                  </h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Engagements Are Priced */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              How Engagements Are Priced
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Pricing reflects ownership and outcomes. We structure engagements as cash + equity because the responsibility we take, the risk we own, and the outcomes we deliver justify the premium.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              For detailed pricing ranges, engagement models, and how equity is determined, see our <Link to="/pricing" className="text-accent hover:text-accent/80 font-medium underline">pricing page</Link>.
            </p>
            <Link to="/pricing">
              <Button variant="outline" size="lg">
                View Pricing Details
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Exit & Transition Scenarios */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
            Exit & Transition Scenarios
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            Every engagement has an end. We design transitions from day one—building systems and teams that can operate independently. When it's time to transition, we ensure continuity and clean handoff.
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            {exitScenarios.map((scenario, index) => (
              <Card key={index} className="border-divider">
                <CardContent className="p-8">
                  <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                    {scenario.scenario}
                  </h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    {scenario.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              If technology execution is critical to your business, we should talk.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              In one conversation, we'll assess fit, define the engagement scope, and determine if Operator-in-Residence is the right model for your situation. We move quickly to clarity and a path forward.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Apply for an Operator-in-Residence Engagement
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
