import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function Experience() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Our Experience
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              TCM's credibility comes from repeated exposure to real operating complexity—not abstract theory. This is the experience behind Operator-in-Residence and Equity CTO engagements.
            </p>
            <p className="mt-4 text-lg font-body text-foreground leading-relaxed">
              When you engage TCM, you're hiring a firm with battle-tested operators who have seen these patterns before.
            </p>
          </div>
        </div>
      </section>

      {/* Operating Experience */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Operating Experience
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              TCM has led and supported CTO and acting-CTO roles in high-growth and high-stress environments. This includes organizations scaling from $5M to $100M+ in revenue, managing teams from 10 to 200+ engineers, and operating under board and investor scrutiny during moments of execution risk.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              The firm has stabilized organizations following vendor failure, architectural sprawl, and leadership gaps. This pattern repeats: companies that grew fast without technical discipline, organizations that outsourced critical decisions, and teams that lost execution velocity under scaling pressure.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Experience across these scenarios creates pattern recognition. When we see similar patterns, we know what works, what doesn't, and how to move quickly without repeating mistakes.
            </p>
          </div>
        </div>
      </section>

      {/* Platform & Architecture Experience */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Platform & Architecture Experience
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              TCM has designed, governed, and modernized multi-tenant platforms, data systems, and AI-enabled infrastructure. This includes platforms processing millions of transactions daily, data systems handling petabytes of information, and AI infrastructure supporting regulated environments.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              The firm has managed architecture decisions at scale: when to rebuild versus refactor, when to buy versus build, when to consolidate versus diversify. These decisions compound over time—getting them wrong creates technical debt that compounds. Getting them right enables growth without breaking.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Experience across multiple platforms and architectures provides perspective. We've seen what works at different scales, what breaks under load, and how to make decisions that hold over time.
            </p>
          </div>
        </div>
      </section>

      {/* Board & Investor Experience */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Board & Investor Experience
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              TCM has worked directly with CEOs, boards, and investors during moments of execution risk and transition. This includes post-fundraise execution pressure, CTO transitions, M&A technical diligence, and board escalations where technology execution threatened business outcomes.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              The firm understands how boards and investors think about technology risk. They need execution truth, not optimism. They need clarity on what's broken, what's fixable, and what it costs to fix. They need confidence that technical decisions align with business priorities.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Experience communicating technical reality to non-technical stakeholders creates credibility. We speak the language of boards and investors—outcomes, risk, and execution—not just technology.
            </p>
          </div>
        </div>
      </section>

      {/* Turnaround & Stabilization Experience */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Turnaround & Stabilization Experience
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              TCM has stabilized organizations where delivery had stalled, confidence had eroded, and execution risk was compounding. This includes companies where vendor relationships failed, offshore teams lost alignment, architecture sprawl created unmaintainable systems, and technical debt blocked growth.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              The firm has executed rapid interventions: 90-day turnarounds where the first 30 days diagnose reality, the next 30 days stabilize systems and teams, and the final 30 days establish operating discipline. These interventions require immediate authority, clear decision-making, and execution velocity.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Experience with turnarounds creates urgency and precision. We know what needs to happen first, what can wait, and how to move fast without breaking things further.
            </p>
          </div>
        </div>
      </section>

      {/* Scale & Growth Experience */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Scale & Growth Experience
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              TCM has prepared companies for scale, platform shifts, and M&A where technical readiness was critical. This includes companies preparing for 10x growth, organizations modernizing legacy systems, and businesses preparing for acquisition where technical due diligence would determine deal terms.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              The firm has managed scale transitions: when systems break under load, when teams outgrow processes, when architecture needs to support new business models. These transitions require forward-looking decisions—building for scale before it's needed, not after it's broken.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Experience with scale creates perspective on what breaks and when. We know how to prepare platforms, teams, and operating models for growth without over-engineering or under-preparing.
            </p>
          </div>
        </div>
      </section>

      {/* What This Means for Engagements */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              What This Means for Engagements
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              This experience translates directly into Operator-in-Residence and Equity CTO engagements. When we engage, we're not learning on your dime. We're applying patterns we've seen before, decisions we've made before, and outcomes we've delivered before.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Pattern recognition accelerates execution. We know what questions to ask, what risks to assess, and what decisions need to happen first. We've seen similar situations before, so we can move faster and with more confidence.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              This is why Operator-in-Residence engagements work. We're not advisors learning your business—we're operators who have operated in similar situations before, bringing that experience to bear immediately.
            </p>
            <div className="bg-card border border-divider rounded-lg p-8">
              <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                Experience That Matters
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Repeated exposure to real operating complexity, not abstract theory
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Pattern recognition across similar situations and outcomes
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Execution velocity from having seen these patterns before
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Credibility with boards, investors, and executives
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Battle-tested operators, not consultants learning on the job
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              When technology execution is critical, experience matters.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              This experience is what you're hiring when you engage TCM as Operator-in-Residence. Not abstract theory. Not learning on the job. Battle-tested operators who have seen these patterns before.
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
