import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Technology leadership for moments that actually matter.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              The CTO Mentor (TCM) is a turnaround-and-scale firm for founder-led, tech-enabled companies where the CTO function is broken, underpowered, or misaligned with the business.
            </p>
            
            {/* Supporting bullets */}
            <ul className="mt-8 space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                We fix failing technology organizations
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                We run the CTO function when leadership is missing or stretched
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                We prepare companies to scale, modernize, or withstand scrutiny
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                We align engineering reality with business and board expectations
              </li>
            </ul>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Book a Strategy Call
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  See Our Services
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why We Exist */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Why We Exist
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Most technology failures don't happen because of bad engineers or the wrong tools.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              They happen because:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                No one owns real technical decisions
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Leadership avoids hard tradeoffs
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Architecture drifts faster than the business
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Boards and executives receive optimism instead of truth
              </li>
            </ul>
            <p className="text-lg font-body text-foreground leading-relaxed mb-4">
              The CTO Mentor was built to operate in that gap.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              TCM exists to bring clarity, authority, and execution discipline to technology organizations under pressure—when the cost of getting it wrong is high and the tolerance for experimentation is gone.
            </p>
          </div>
        </div>
      </section>

      {/* How TCM Is Different */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">
            How TCM Is Different
          </h2>
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
            {/* What We Are Not */}
            <div>
              <h3 className="font-heading text-xl font-semibold text-heading mb-6">
                What We Are Not
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="text-subtle">—</span>
                  A staff augmentation firm
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="text-subtle">—</span>
                  A dev shop selling capacity
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="text-subtle">—</span>
                  A slide-driven consultancy
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="text-subtle">—</span>
                  An hourly advisory service
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
                  A CTO Office, not a single individual
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  A firm built for turnarounds and scale
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Operator-in-Residence: temporary co-founder, not contractor
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Embedded in decision-making with full accountability
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
              We don't advise from the sidelines. We operate where decisions are made.
            </p>
          </div>
        </div>
      </section>

      {/* How We Work */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Our Operating Model
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              TCM engages as an embedded leadership function—Operator-in-Residence with full execution accountability. We operate as temporary co-founders, not external observers or part-time advisors.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Every engagement is built around:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Clear ownership of the CTO mandate
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                A defined operating cadence
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Explicit decision rights
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Board-ready communication
              </li>
            </ul>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              We bring structure without bureaucracy, urgency without chaos, and progress without theatrics.
            </p>
          </div>

          {/* 4 Steps Visual */}
          <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <span className="text-xs font-body font-semibold text-accent tracking-wider">01</span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-heading">
                Diagnose reality
              </h3>
            </div>
            <div>
              <span className="text-xs font-body font-semibold text-accent tracking-wider">02</span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-heading">
                Stabilize leadership and systems
              </h3>
            </div>
            <div>
              <span className="text-xs font-body font-semibold text-accent tracking-wider">03</span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-heading">
                Establish operating discipline
              </h3>
            </div>
            <div>
              <span className="text-xs font-body font-semibold text-accent tracking-wider">04</span>
              <h3 className="mt-2 font-heading text-xl font-semibold text-heading">
                Prepare for scale or transition
              </h3>
            </div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Credentials That Matter
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              TCM's credibility comes from repeated exposure to real operating complexity—not abstract theory.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              As a firm, we have:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Led and supported CTO and acting-CTO roles in high-growth and high-stress environments
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Stabilized organizations following vendor failure, architectural sprawl, or leadership gaps
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Designed, governed, and modernized multi-tenant platforms, data systems, and AI-enabled infrastructure
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Worked directly with CEOs, boards, and investors during moments of execution risk and transition
              </li>
            </ul>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Our experience spans technology, operations, data, and governance—because in practice, these domains fail together.
            </p>
            <div className="bg-card border border-divider rounded-lg p-8">
              <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                We are trusted when:
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Delivery has stalled
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Confidence has eroded
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Scale is exposing weak foundations
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  Leadership needs clarity, not noise
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Who We Work With
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              TCM works with organizations where technology is core to the business—not a support function.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Typical clients include:
            </p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Founder-led companies post-fundraise
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Growth-stage businesses outgrowing their original architecture
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Boards navigating CTO transitions or execution risk
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                Investors seeking clarity before or after capital deployment
              </li>
            </ul>
            <p className="text-lg font-body text-foreground leading-relaxed font-medium">
              If execution matters more than optics, TCM is usually a fit.
            </p>
          </div>
        </div>
      </section>

      {/* What Clients Can Expect */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              What You Can Expect When Working With TCM
            </h2>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Direct, senior-level engagement
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Clear recommendations, not hedged advice
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Respect for existing teams paired with accountability
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Honest communication with executives and boards
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                A bias toward stability, clarity, and momentum
              </li>
            </ul>
            <p className="mt-8 text-lg font-body text-foreground leading-relaxed font-medium">
              No theatrics. No jargon. No dependency creation.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              When technology becomes a constraint, leadership matters.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              If your organization is experiencing stalled delivery, leadership gaps, or scaling pressure, one conversation can bring clarity.
            </p>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              We'll assess the situation quickly and recommend the cleanest path forward—even if that means we're not the right fit.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book a Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
