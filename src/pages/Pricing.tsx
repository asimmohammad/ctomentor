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

const faqs = [
  {
    question: "Why are you more expensive than a Fractional CTO?",
    answer: "Because we're not fractional. Fractional CTOs split time across multiple clients, bill hourly, and have no equity—they're incentivized to bill hours, not create value. We're fully embedded with full accountability and equity alignment. We own outcomes, not just show up for meetings. The premium reflects the responsibility, risk, and outcomes we take on—not the time we bill.",
  },
  {
    question: "Why do you require equity in some engagements?",
    answer: "Equity alignment ensures we're building long-term value, not just billing hours. For Operator-in-Residence and turnaround engagements, equity participation is standard because we're taking co-founder-level ownership and risk. Equity reflects the leverage we provide and the outcomes we own. It's not optional—it's essential for alignment.",
  },
  {
    question: "Can we start without equity?",
    answer: "For Board & Investor Technical Advisory engagements, cash-only is standard. For Operator-in-Residence and turnaround engagements, equity participation is expected. If you're not ready for equity alignment, we're likely not the right partner. Equity isn't negotiable—it's fundamental to how the Operator-in-Residence model works.",
  },
  {
    question: "How long do engagements usually last?",
    answer: "Operator-in-Residence engagements typically last 6–12 months minimum. Fixed-scope turnarounds are 90 days. Transition & Stabilization engagements are 1–3 months. Duration is defined upfront based on engagement scope and outcomes. We design transitions from day one—no dependency creation, no open-ended commitments.",
  },
  {
    question: "Do you help hire or transition to a full-time CTO?",
    answer: "Yes. When you're ready to hire a full-time CTO, we facilitate the transition. We help recruit, onboard, and ensure knowledge transfer. Our role shifts to execution support during the transition period, then we exit cleanly. We build systems and teams that can operate independently—transition planning is built into every engagement.",
  },
  {
    question: "Is this a consulting engagement?",
    answer: "No. This is not consulting. We're not advisors offering guidance from the sidelines. We're embedded operators with full execution authority and accountability. We make decisions, drive execution, and own outcomes. If you're looking for consulting or advisory services, we're not the right partner.",
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
              Pricing is based on responsibility, not time. When you engage us as Operator-in-Residence, you're transferring risk from your shoulders to ours. We own the CTO function—decisions, execution, and outcomes. If technology fails, that's on us. If delivery stalls, that's on us. If architecture drifts and costs spiral, that's on us. The pricing reflects the responsibility we take and the risk we absorb.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              This is fundamentally different from fractional CTO models that bill hourly or by days per week. Fractional CTOs are incentivized to bill hours, not create value. They split time across clients, have no equity, and can attribute failures to time constraints. We're fully embedded with equity alignment—we're building value, not billing hours. Equity isn't a concession; it's alignment. It ensures we're invested in outcomes that compound, not just deliverables that bill.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              The premium reflects risk transfer. You're paying for someone to own the outcomes, not just show up for meetings. When technology execution is critical and the cost of getting it wrong is high, that transfer of risk and responsibility is worth the premium.
            </p>
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
          <div className="space-y-12">
            {/* Operator-in-Residence */}
            <Card className="border-divider">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-heading">
                  Operator-in-Residence
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Monthly Cash Range</h3>
                    <p className="text-base font-body text-foreground">$30,000–$50,000/month</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Typical Equity Range</h3>
                    <p className="text-base font-body text-foreground">0.5%–2.0%</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Typical Duration</h3>
                    <p className="text-base font-body text-foreground">6–12 months minimum</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Equity Vesting</h3>
                    <p className="text-base font-body text-foreground">4-year standard, 1-year cliff</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-divider">
                  <h3 className="text-sm font-body font-semibold text-heading mb-3">Outcomes Owned</h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Technical strategy and architecture decisions with full accountability
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Delivery velocity and quality standards
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Team structure, hiring, and performance management
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Vendor and offshore governance
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Budget control and cost optimization
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Board and investor technical communication
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Equity CTO */}
            <Card className="border-divider">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-heading">
                  Equity CTO
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Monthly Cash Range</h3>
                    <p className="text-base font-body text-foreground">$25,000–$40,000/month</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Equity Range</h3>
                    <p className="text-base font-body text-foreground">1.0%–3.0%</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-divider">
                  <h3 className="text-sm font-body font-semibold text-heading mb-3">When This Model Is Used</h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Early-stage companies (pre-seed, seed) where equity alignment is primary compensation driver
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Founders seeking co-founder-level technical leadership with significant equity participation
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Companies with limited cash runway but strong equity value proposition
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Situations where long-term value creation alignment is more important than immediate cash compensation
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Technical Due Diligence & Operator Review */}
            <Card className="border-divider">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-heading">
                  Technical Due Diligence & Operator Review
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-sm font-body font-semibold text-heading mb-2">One-Time Pricing Range</h3>
                  <p className="text-base font-body text-foreground">$25,000–$60,000</p>
                </div>
                <div className="pt-4 border-t border-divider">
                  <h3 className="text-sm font-body font-semibold text-heading mb-3">Typical Buyers</h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Venture capital and private equity firms conducting technical diligence
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Corporate development teams evaluating acquisition targets
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Boards requiring independent technical assessment of execution risk
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Investors seeking execution truth before or after capital deployment
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-divider">
                  <h3 className="text-sm font-body font-semibold text-heading mb-3">Deliverables</h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Technical architecture and platform assessment (red/yellow/green)
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Team capability and leadership evaluation
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Scalability, security, and data maturity assessment
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Execution risk analysis and remediation recommendations
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Board-grade advisory memo with clear findings and operating recommendations
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Transition & Stabilization Engagement */}
            <Card className="border-divider">
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-semibold text-heading">
                  Transition & Stabilization Engagement
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Monthly Pricing Range</h3>
                    <p className="text-base font-body text-foreground">$40,000–$60,000/month</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-body font-semibold text-heading mb-2">Duration</h3>
                    <p className="text-base font-body text-foreground">1–3 months</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-divider">
                  <h3 className="text-sm font-body font-semibold text-heading mb-3">Use Cases</h3>
                  <ul className="space-y-2 text-base font-body text-foreground">
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      CTO exits requiring immediate leadership continuity
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Critical system outages or security events requiring executive leadership
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Board escalations where technical execution risk threatens business outcomes
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Rapid stabilization following vendor failure or architectural crisis
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                      Interim leadership during executive search or internal promotion preparation
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
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
              Equity participation is tied to risk and leverage, not generosity. The more critical technology execution is to business outcomes, and the more risk we take on, the higher the equity participation. This isn't negotiation—it's alignment.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">Company Stage</h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    Earlier stage companies (pre-seed, seed) typically require higher equity because the risk is higher and the leverage is greater. A technical decision at this stage can determine company trajectory. Series A and later companies may see lower equity percentages, reflecting reduced risk and more established systems.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">Burn Rate and Cash Constraints</h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    Companies with high burn rates or limited cash runway may structure higher equity participation relative to cash compensation. This aligns incentives when cash is constrained but equity value creation is the primary goal.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">Dependency on Technology</h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    The more the business depends on technology execution for revenue, growth, or competitive advantage, the higher the equity participation. If technology failure directly impacts business outcomes, the operator's leverage and risk are higher, which equity reflects.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">Existing Team Quality and Technical Debt</h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    Companies with strong existing teams and minimal technical debt may see lower equity percentages. Companies with significant technical debt, team gaps, or architectural problems require higher equity because the operator is taking on more risk and delivering more leverage.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">Equity Discussions Happen Early</h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    We define equity structure upfront, before engagement begins. This prevents misaligned incentives, avoids awkward renegotiations, and ensures both parties are committed to the same outcomes from day one. Early alignment benefits everyone—the company gets committed execution, and the operator gets clear ownership stakes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <h3 className="font-heading text-lg font-semibold text-heading mb-2">Why This Benefits Both Parties</h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    For the company, equity alignment ensures the operator is building long-term value, not just billing hours. For the operator, equity participation reflects the risk and leverage we take on, creating a fair exchange for the responsibility we own. Both parties are aligned on outcomes that compound, not just deliverables that bill.
                  </p>
                </div>
              </div>
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
              A full-time CTO hire costs $200,000–$400,000+ annually in salary, equity, and benefits. But the real cost isn't the salary—it's the opportunity cost, time-to-impact, and the compounding cost of getting it wrong.
            </p>
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                  Opportunity Cost
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  While you're recruiting a full-time CTO—typically 3–6 months—technology execution stalls, technical debt compounds, and competitive windows close. Every month of delay is a month of lost momentum, missed opportunities, and rising execution risk. Operator-in-Residence engagements start immediately, delivering impact from day one.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                  Time-to-Impact
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  A new full-time CTO needs 3–6 months to understand the business, build relationships, and establish credibility before making meaningful decisions. During that ramp period, critical technical decisions are deferred, architecture drifts, and teams operate without clear leadership. We operate with full authority from day one—no ramp period, no deferred decisions.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                  Cost of Mis-Hires
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  A bad CTO hire costs far more than their salary: 6–12 months of poor decisions, team churn, technical debt accumulation, and lost opportunities. When you realize the fit is wrong, you face expensive separation, another 3–6 month search, and the compounding cost of the mistakes made during their tenure. Operator-in-Residence engagements are structured for clear outcomes and clean exits—if the fit isn't right, the engagement ends without long-term salary commitments or expensive separations.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                  Cost of Technical Debt and Stalled Execution
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Every month of stalled execution or poor technical decisions compounds. Technical debt accumulates. Architecture drifts. Team morale erodes. Competitive position weakens. The cost isn't just the CTO's salary—it's the opportunity cost of what could have been built, the cost of fixing what was broken, and the cost of lost momentum that may never be recovered.
                </p>
              </div>
            </div>
            <div className="bg-card border border-divider rounded-lg p-8">
              <p className="text-lg font-body text-foreground leading-relaxed font-medium">
                The question isn't whether you can afford an Operator-in-Residence engagement—it's whether you can afford the cost of getting technology leadership wrong.
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
