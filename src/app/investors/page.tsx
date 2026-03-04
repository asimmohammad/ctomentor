import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const metadata: Metadata = {
  title: "Technology Due Diligence for PE & VC Firms | The CTO Mentor",
  description:
    "Independent pre-acquisition technical assessments and portfolio company CTO support. Protect your investment with expert technology due diligence.",
  alternates: { canonical: "https://thectomentor.com/investors" },
};

const deliverables = [
  "Pre-acquisition technical due diligence (architecture, security, scalability, team assessment)",
  "Post-acquisition technology leadership for portfolio companies",
  "CTO search support and interim technology leadership during transitions",
  "Technology value creation roadmaps for portfolio companies",
];

export default function InvestorsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Protect Your Investment. Maximize Portfolio Value.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              Independent technical due diligence and strategic CTO support for PE/VC firms evaluating and managing
              technology companies.
            </p>
            <div className="mt-10">
              <Link href="/apply">
                <Button variant="primary" size="xl">
                  Schedule a Confidential Discussion
                </Button>
              </Link>
            </div>
            <p className="mt-4 text-sm font-body text-subtle">
              Recent work: technology readiness for a $600M+ strategic exit.
            </p>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">The Problem</h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Most PE/VC firms lack deep technical expertise to evaluate acquisition targets. They rely on the target
              company's own team to assess technology risk — a clear conflict of interest. That leaves you exposed to
              hidden technical debt, security gaps, scalability limits, and team capability issues that only surface
              after the deal closes.
            </p>
          </div>
        </div>
      </section>

      {/* What I Deliver */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-8">What I Deliver</h2>
          <ul className="space-y-4 max-w-3xl">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-4 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* GP-Focused Case Study */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Case Study: Technology Readiness for a $600M Exit
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              A PE-backed platform was preparing for a strategic sale north of $600M. The investment thesis depended on
              consolidating fragmented vendor technology into a single, scalable platform — but there were unanswered
              questions around architecture, security posture, and the team&apos;s ability to support the next stage of growth.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              I partnered with management and the sponsor to turn technology from a diligence risk into a deal enabler:
              aligning the roadmap to the value-creation plan, tightening operational discipline, and building the
              narrative and artifacts buyers would expect to see in a competitive process.
            </p>
            <ul className="space-y-3 text-base font-body text-foreground">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Defined and executed a technology and adoption growth plan that supported aggressive GMV and margin
                  targets without compromising reliability or security.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Restructured ownership across a fractured vendor ecosystem into a single accountable platform team with
                  clear SLAs, incident response, and change control.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Prepared buyer-ready materials: architecture maps, risk register, remediation roadmap, and
                  data-driven KPIs that spoke directly to investment committee concerns.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Supported management through multiple rounds of technical Q&amp;A and reverse diligence, with no
                  material technology issues flagged as deal blockers.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Why Me */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">Why Me</h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              I'm currently serving as CTO for a platform undergoing active M&A due diligence — I understand both sides
              of the table. My environment is SOC 2 Type II certified. I have hands-on experience with AWS GovCloud and
              FedRAMP. That means I can assess technology risk, team capability, and integration complexity with the same
              lens your target's next CTO would use.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              I don't just review slides. I review architecture, code quality, security posture, and organizational
              health. You get an executive-ready report with a risk matrix, recommendations, and effort estimates — so you
              can make informed investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Company Advisory */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Portfolio Company Advisory
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Due diligence is a point-in-time assessment. The real value is created — or destroyed — in the years
              that follow. I work with GPs as a long-term, equity-aligned partner to help portfolio companies turn
              technology into a source of durable value, not a hidden liability.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              For a select set of portfolio companies, I provide ongoing CTO-level advisory and embedded support:
              working directly with founders, CTOs, and technology leaders to execute on the value-creation plan,
              de-risk major initiatives, and build teams and architecture that can withstand the next round of
              diligence.
            </p>
            <ul className="space-y-3 text-base font-body text-foreground">
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>Monthly strategy sessions with CEOs/CTOs plus asynchronous access for time-sensitive decisions.</span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Architecture, security, and team roadmaps tied directly to the fund&apos;s value-creation thesis for each
                  asset.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Support for critical board and IC conversations where technology risk, spend, or execution is a central
                  question.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Check size={18} className="text-accent flex-shrink-0 mt-1" />
                <span>
                  Engagements with PE/VC portfolio companies are structured to include equity or co-investment rights
                  where appropriate, aligning incentives around long-term outcomes.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Featured Reading */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading mb-4">
              What I Look For Before Saying Yes to a Portfolio Company
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-4">
              For GPs, the most important question isn&apos;t just whether a portfolio company has a technology problem —
              it&apos;s whether it has a technology <span className="italic">leadership</span> problem. In this piece, I walk
              through how I evaluate potential portfolio engagements, why I structure my work around equity rather than
              billable hours, and what actually makes a technical advisory relationship valuable at the fund level.
            </p>
            <a
              href="https://asimmohammad.substack.com/p/what-i-look-for-before-saying-yes"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground px-6 py-3 text-sm font-medium hover:bg-primary/90 transition-colors"
            >
              Read the full article on Substack
            </a>
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">Engagement Model</h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Fixed-fee due diligence engagements ($15,000–$25,000 depending on scope) with optional ongoing advisory
              retainer for portfolio support. Scope and deliverables are defined upfront. No hourly surprises.
            </p>
            <div className="mt-10">
              <Link href="/apply">
                <Button variant="primary" size="xl">
                  Schedule a Confidential Discussion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

