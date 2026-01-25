import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, X } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              An operating firm for high-risk, high-leverage moments.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              The CTO Mentor is brought in when technology execution is critical, the stakes are high, and the cost of getting it wrong is unacceptable. We operate as embedded leadership—not advisors, not consultants, not fractional contractors.
            </p>
            <p className="mt-4 text-lg font-body text-foreground leading-relaxed">
              We take ownership. We drive execution. We own outcomes. We take equity because we're building value, not billing hours.
            </p>
            
            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Apply for an Operator-in-Residence Engagement
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  See How We Operate
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why The CTO Mentor Exists */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Why The CTO Mentor Exists
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Most technology failures aren't technical. They're organizational. They happen because no one owns real decisions, leadership avoids hard tradeoffs, architecture drifts faster than the business, and boards receive optimism instead of truth.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              The CTO Mentor exists to operate in that gap. We're brought in at moments when:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Technology execution is blocking business outcomes
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Leadership gaps or misalignment are creating execution risk
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Scale, platform shifts, or M&A require technical readiness
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Boards and investors need execution truth, not optimism
              </li>
            </ul>
            <p className="text-lg font-body text-foreground leading-relaxed font-medium">
              We operate when the cost of getting it wrong is high and the tolerance for experimentation is gone.
            </p>
          </div>
        </div>
      </section>

      {/* How We Operate */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              How We Operate
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              We engage as Operator-in-Residence—embedded leadership with full execution authority and accountability. This is not remote advisory or part-time consulting. We operate where decisions are made.
            </p>
            
            <div className="space-y-6 mb-8">
              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Ownership & Authority
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We take full ownership of the CTO mandate: technical strategy, architecture decisions, execution velocity, team structure, vendor governance, and board communication. We have explicit decision rights and operate with CEO-level partnership.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Operating Cadence
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Every engagement has a defined operating rhythm: weekly exec syncs, bi-weekly deep dives, monthly board memos. We bring structure without bureaucracy, urgency without chaos, and progress without theatrics.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Patterns & Outcomes
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We've stabilized organizations following vendor failure, architectural sprawl, and leadership gaps. We've designed and modernized multi-tenant platforms, data systems, and AI-enabled infrastructure. We've worked directly with CEOs, boards, and investors during moments of execution risk and transition.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Transition Planning
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We design transitions from day one—building systems and teams that can operate independently. When it's time to transition to a full-time CTO or internal leader, we ensure continuity and clean handoff. No dependency creation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How We Are Different */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">
            How We Are Different
          </h2>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* What We Are Not */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-heading mb-6">
                What We Are Not
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                  A fractional CTO splitting time across multiple clients
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                  A staff augmentation firm or dev shop selling capacity
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                  A slide-driven consultancy offering advice from the sidelines
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                  An hourly advisory service billing for time, not outcomes
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                  A personal consulting brand—we're an operating firm
                </li>
              </ul>
            </div>

            {/* What We Are */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-heading mb-6">
                What We Are
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  An operating firm built for high-risk, high-leverage moments
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Operator-in-Residence with full execution authority and accountability
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Embedded in decision-making, not observing from the sidelines
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Equity-aligned temporary co-founder, not contractor
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Comfortable operating with boards, investors, and executives
                </li>
              </ul>
            </div>
          </div>

          {/* Anchor statement */}
          <div className="mt-12 pt-12 border-t border-divider">
            <p className="text-xl font-heading font-semibold text-heading text-center max-w-2xl mx-auto">
              We don't advise from the sidelines. We operate where decisions are made, and we own the outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Our View on Incentives & Equity */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Our View on Incentives & Equity
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We structure compensation as cash + equity because alignment matters. Cash ensures execution focus. Equity ensures long-term value creation. Together, they create the right incentive structure for co-founder-level partnership.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Here's our view:
            </p>
            
            <div className="space-y-6 mb-8">
              <Card className="border-divider">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                    Equity Justifies Premium
                  </h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    Equity participation reflects the co-founder-level ownership we take. We're not contractors—we're temporary partners with skin in the game. This justifies premium pricing and ensures we're invested in outcomes that compound, not just deliverables that bill.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-divider">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                    Cash Ensures Execution Focus
                  </h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    Cash compensation ensures we're paid for execution, not promises. It keeps us focused on your success, not exit timing. The combination of cash + equity creates the right incentive structure for both parties: we're rewarded for both immediate execution and long-term value creation.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-divider">
                <CardContent className="p-6">
                  <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                    Transparent Structure
                  </h3>
                  <p className="text-base font-body text-foreground leading-relaxed">
                    Compensation structure is defined upfront: cash component (retainer or fixed fee), equity component (typically 0.5%–2% depending on stage and scope), and clear milestones or triggers for equity vesting. No surprises, no renegotiation, no misaligned incentives.
                  </p>
                </CardContent>
              </Card>
            </div>

            <p className="text-lg font-body text-foreground leading-relaxed font-medium">
              We take equity because we're building value, not billing hours. That alignment is what makes the Operator-in-Residence model work.
            </p>
          </div>
        </div>
      </section>

      {/* When We Say No */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              When We Say No
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We're explicit about fit because misalignment wastes everyone's time. We say no to:
            </p>
            
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Companies seeking hourly consulting or part-time advisory—we're not fractional contractors
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Organizations looking for staff augmentation or dev shop capacity—we're not selling hours
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Early-stage startups pre-product-market fit without clear technical needs—we operate at higher stakes
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Companies with budgets under $25k/month for ongoing engagements—our model requires meaningful investment
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Organizations that want slide-driven strategy without execution accountability—we own outcomes
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Founders who aren't ready to give real decision-making authority—we need CEO-level partnership
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <X size={20} className="text-subtle flex-shrink-0 mt-0.5" />
                Companies where technology isn't core to business outcomes—we're not a support function
              </li>
            </ul>

            <p className="text-lg font-body text-foreground leading-relaxed font-medium">
              If you're looking for fractional consulting, hourly billing, or part-time advice, we're not the right partner. If technology execution is critical and the stakes are high, we should talk.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              When technology execution is critical, we should talk.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              In one conversation, we'll assess fit, define the engagement scope, and determine if Operator-in-Residence is the right model for your situation. No long sales cycles—just clarity and a path forward.
            </p>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              We'll recommend the cleanest path forward—even if that means we're not the right fit.
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
