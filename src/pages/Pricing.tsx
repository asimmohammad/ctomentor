import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const engagementModels = [
  {
    name: "Operator-in-Residence (Ongoing)",
    description: "Embedded CTO leadership with full execution authority and accountability. Monthly retainer + equity.",
    cashRange: "$30,000–$50,000/month",
    equityRange: "0.5%–2.0%",
    duration: "6–12 month minimum",
    bestFor: "Companies needing sustained CTO-level leadership without a full-time hire",
  },
  {
    name: "CTO Turnaround (Fixed-Scope)",
    description: "90-day intensive reset for broken technology organizations. Fixed fee + equity.",
    cashRange: "$75,000–$150,000",
    equityRange: "0.25%–1.0%",
    duration: "90 days",
    bestFor: "Organizations in crisis requiring rapid stabilization and realignment",
  },
  {
    name: "Scale Readiness & AI Enablement",
    description: "Focused program to prepare platform, team, and operating model for growth. Fixed fee + equity.",
    cashRange: "$40,000–$80,000",
    equityRange: "0.25%–0.75%",
    duration: "8–10 weeks",
    bestFor: "Post-PMF companies preparing for scale, platform shifts, or M&A",
  },
  {
    name: "Board & Investor Technical Advisory",
    description: "Independent technical authority for boards and investors. Monthly retainer or per-engagement fee.",
    cashRange: "$10,000–$20,000/month or $25,000–$60,000 per engagement",
    equityRange: "Typically none (cash-only)",
    duration: "Ongoing or per engagement",
    bestFor: "Boards and investors needing execution truth and technical diligence",
  },
  {
    name: "Crisis & Interim CTO",
    description: "High-intensity, short-term leadership during critical moments. Monthly or weekly rate.",
    cashRange: "$40,000–$60,000/month or $15,000–$30,000/week",
    equityRange: "0.25%–1.0% (if extended)",
    duration: "Short-term, typically 1–3 months",
    bestFor: "Emergency stabilization, CTO exits, outages, or board escalations",
  },
];

const equityFactors = [
  {
    factor: "Company Stage",
    description: "Earlier stage companies typically require higher equity to align risk and reward. Pre-seed and seed companies may see 1.0%–2.0%, while Series A and later typically see 0.5%–1.0%.",
  },
  {
    factor: "Engagement Scope",
    description: "Full Operator-in-Residence engagements with complete CTO mandate command higher equity than fixed-scope programs. Ongoing monthly engagements typically see 0.5%–2.0%, while fixed-scope turnarounds see 0.25%–1.0%.",
  },
  {
    factor: "Engagement Duration",
    description: "Longer engagements (12+ months) may see higher equity participation, reflecting deeper commitment and value creation over time.",
  },
  {
    factor: "Risk Profile",
    description: "Higher-risk situations—turnarounds, crisis interventions, or companies with significant technical debt—may command higher equity to align incentives with the challenge level.",
  },
];

const faqs = [
  {
    question: "Why is pricing structured as cash + equity?",
    answer: "Cash ensures execution focus—we're paid for outcomes, not promises. Equity ensures long-term value creation—we're building value, not billing hours. Together, they create the right incentive structure for co-founder-level partnership. This alignment is what makes the Operator-in-Residence model work.",
  },
  {
    question: "Can we do cash-only engagements?",
    answer: "For Board & Investor Technical Advisory engagements, cash-only is standard. For Operator-in-Residence and turnaround engagements, equity participation is expected. Equity alignment reflects the co-founder-level ownership we take and ensures we're invested in outcomes that compound, not just deliverables that bill.",
  },
  {
    question: "How is equity structured?",
    answer: "Equity is typically structured as stock options or restricted stock, with standard vesting schedules (typically 4 years with 1-year cliff). Vesting may be tied to engagement milestones or time-based. Structure is defined upfront and documented in the engagement agreement.",
  },
  {
    question: "What if we can't afford these rates?",
    answer: "If these rates are outside your budget, we're likely not the right partner. Operator-in-Residence engagements require meaningful investment because they require full commitment and accountability. If you're looking for lower-cost options, consider fractional CTO services or part-time advisory—though those won't deliver the same outcomes or accountability.",
  },
  {
    question: "Do you negotiate pricing?",
    answer: "We structure pricing based on engagement scope, risk profile, and alignment needs—not arbitrary negotiation. If there's a fit, we'll define compensation structure (cash + equity) that aligns incentives for both parties. We don't discount to win business; we align to create value.",
  },
  {
    question: "Why is this more expensive than a fractional CTO?",
    answer: "Because we're not fractional. We're fully embedded with full accountability and equity alignment. Fractional CTOs split time across clients, bill hourly, and have no equity—they're incentivized to bill hours, not create value. We're temporary co-founders with skin in the game. The premium reflects the responsibility, risk, and outcomes we own.",
  },
  {
    question: "What happens to equity if the engagement ends early?",
    answer: "Equity vesting follows standard schedules defined in the engagement agreement. If an engagement ends early, unvested equity typically remains unvested. Vested equity remains with the operator. This structure ensures alignment throughout the engagement and prevents misaligned incentives around exit timing.",
  },
];

export default function Pricing() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Pricing That Reflects Responsibility, Risk, and Outcomes
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              Operator-in-Residence engagements are structured as cash + equity because alignment matters. We're not billing hours or selling capacity—we're taking ownership of outcomes that matter.
            </p>
            <p className="mt-4 text-lg font-body text-foreground leading-relaxed font-medium">
              If you're looking for cheap help or hourly consulting, we're not the right partner. If technology execution is critical and the stakes are high, let's talk.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Philosophy */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Pricing Philosophy
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our pricing reflects three things: responsibility, risk, and outcomes. We take full ownership of the CTO function—decisions, execution, and results. We take on the risk of failure. We're accountable for outcomes that compound.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              This isn't hourly consulting or capacity-based selling. This is co-founder-level partnership with equity alignment. The premium reflects the responsibility we take, the risk we own, and the outcomes we deliver.
            </p>
            <div className="bg-card border border-divider rounded-lg p-8 mt-8">
              <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                What Pricing Reflects
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Full execution authority and decision-making responsibility
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Risk ownership for technology outcomes—no excuses, no handoffs
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Equity alignment ensuring long-term value creation, not hourly billing
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  CEO-level partnership and embedded leadership, not remote advisory
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Engagement Models */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
            Engagement Models
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            Every engagement is structured around outcomes and accountability, not hours or time allocation. Pricing ranges reflect engagement scope, risk profile, and alignment needs.
          </p>
          <div className="space-y-6">
            {engagementModels.map((model, index) => (
              <Card key={index} className="border-divider">
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-semibold text-heading">
                    {model.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-base font-body text-foreground leading-relaxed">
                    {model.description}
                  </p>
                  <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-divider">
                    <div>
                      <p className="text-sm font-body font-semibold text-heading mb-2">Cash Component</p>
                      <p className="text-base font-body text-foreground">{model.cashRange}</p>
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-heading mb-2">Equity Component</p>
                      <p className="text-base font-body text-foreground">{model.equityRange}</p>
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-heading mb-2">Duration</p>
                      <p className="text-base font-body text-foreground">{model.duration}</p>
                    </div>
                    <div>
                      <p className="text-sm font-body font-semibold text-heading mb-2">Best For</p>
                      <p className="text-base font-body text-foreground">{model.bestFor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How Equity Is Determined */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              How Equity Is Determined
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Equity participation is standard for Operator-in-Residence and turnaround engagements. It's not optional—it's essential for alignment. Here's how we determine equity structure:
            </p>
            <div className="space-y-6">
              {equityFactors.map((factor, index) => (
                <Card key={index} className="border-divider">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                      {factor.factor}
                    </h3>
                    <p className="text-base font-body text-foreground leading-relaxed">
                      {factor.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-8 bg-card border border-divider rounded-lg p-8">
              <p className="text-base font-body text-foreground leading-relaxed">
                <strong className="font-semibold">Equity structure is defined upfront</strong> in the engagement agreement. No surprises, no renegotiation, no misaligned incentives. We align on compensation (cash + equity) before we start, ensuring both parties are committed to long-term value creation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why This Is Cheaper Than a Bad CTO */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Why This Is Cheaper Than a Bad CTO
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              A full-time CTO costs $200,000–$400,000+ annually in salary, equity, and benefits. A bad CTO costs far more: missed timelines, technical debt, team churn, lost opportunities, and execution risk that compounds over time.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Operator-in-Residence engagements deliver CTO-level leadership and outcomes at a fraction of the cost, with equity alignment ensuring we're building value, not just collecting a salary. The premium reflects the responsibility, risk, and outcomes we own—not the time we bill.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-divider">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-heading mb-4">
                    Full-Time CTO Cost
                  </h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li>• $200k–$400k+ annual salary</li>
                    <li>• 1.0%–3.0% equity</li>
                    <li>• Benefits, overhead, recruiting costs</li>
                    <li>• Risk of misalignment or poor fit</li>
                    <li>• Long-term commitment regardless of outcomes</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-divider">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-heading mb-4">
                    Operator-in-Residence
                  </h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li>• $30k–$50k/month ($360k–$600k annually)</li>
                    <li>• 0.5%–2.0% equity (aligned with outcomes)</li>
                    <li>• No benefits, no overhead, no recruiting</li>
                    <li>• Equity alignment ensures value creation</li>
                    <li>• Flexible engagement with clear outcomes</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="mt-8 bg-card border border-divider rounded-lg p-8">
              <p className="text-base font-body text-foreground leading-relaxed font-medium">
                The difference: we're accountable for outcomes, not just present. We take equity because we're building value. We exit cleanly when it's time. And if we're not the right fit, the engagement ends—no long-term salary commitment, no expensive separation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4 max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-divider rounded-lg px-6"
              >
                <AccordionTrigger className="font-heading text-lg font-semibold text-heading hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <p className="text-base font-body text-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              If technology execution is critical, let's talk.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              Pricing reflects responsibility, risk, and outcomes. If these ranges align with your needs and the stakes justify the investment, we should have a conversation. If you're looking for cheap help or hourly consulting, we're not the right partner.
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
