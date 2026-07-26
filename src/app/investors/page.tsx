import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
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
      <Section spacing="generous" tone="alt">
        <div className="max-w-4xl">
          <h1 className="font-display text-h1 text-ink">
            Protect Your Investment. Maximize Portfolio Value.
          </h1>
          <p className="mt-6 text-lead font-text text-ink-muted">
            Independent technical due diligence and strategic CTO support for PE/VC firms evaluating and managing
            technology companies.
          </p>
          <div className="mt-10">
            <Link href="/assessment">
              <Button variant="primary" size="xl">
                Take the Technical Risk Assessment
              </Button>
            </Link>
          </div>
          <p className="mt-4 text-small font-text text-ink-muted">
            Recent work: technology readiness for a $600M+ strategic exit.
          </p>
        </div>
      </Section>

      {/* The Problem */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">The Problem</h2>
          <p className="text-lead font-text text-ink">
            Most PE/VC firms lack deep technical expertise to evaluate acquisition targets. They rely on the target
            company's own team to assess technology risk — a clear conflict of interest. That leaves you exposed to
            hidden technical debt, security gaps, scalability limits, and team capability issues that only surface
            after the deal closes.
          </p>
        </div>
      </Section>

      {/* What I Deliver */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <h2 className="font-display text-h2 text-ink mb-8">What I Deliver</h2>
        <ul className="space-y-4 max-w-3xl">
          {deliverables.map((item) => (
            <li key={item} className="flex items-start gap-4 text-body font-text text-ink">
              <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Section>

      {/* GP-Focused Case Study */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">
            Case Study: Technology Readiness for a $600M Exit
          </h2>
          <p className="text-lead font-text text-ink mb-6">
            A PE-backed platform was preparing for a strategic sale north of $600M. The investment thesis depended on
            consolidating fragmented vendor technology into a single, scalable platform — but there were unanswered
            questions around architecture, security posture, and the team&apos;s ability to support the next stage of growth.
          </p>
          <p className="text-lead font-text text-ink mb-6">
            I partnered with management and the sponsor to turn technology from a diligence risk into a deal enabler:
            aligning the roadmap to the value-creation plan, tightening operational discipline, and building the
            narrative and artifacts buyers would expect to see in a competitive process.
          </p>
          <ul className="space-y-3 text-body font-text text-ink">
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
      </Section>

      {/* Why Me */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">Why Me</h2>
          <p className="text-lead font-text text-ink mb-6">
            I'm currently serving as CTO for a platform undergoing active M&A due diligence — I understand both sides
            of the table. My environment is SOC 2 Type II certified. I have hands-on experience with AWS GovCloud and
            FedRAMP. That means I can assess technology risk, team capability, and integration complexity with the same
            lens your target's next CTO would use.
          </p>
          <p className="text-lead font-text text-ink">
            I don't just review slides. I review architecture, code quality, security posture, and organizational
            health. You get an executive-ready report with a risk matrix, recommendations, and effort estimates — so you
            can make informed investment decisions.
          </p>
        </div>
      </Section>

      {/* Portfolio Company Advisory */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">
            Portfolio Company Advisory
          </h2>
          <p className="text-lead font-text text-ink mb-6">
            Due diligence is a point-in-time assessment. The real value is created — or destroyed — in the years
            that follow. I work with GPs as a long-term, equity-aligned partner to help portfolio companies turn
            technology into a source of durable value, not a hidden liability.
          </p>
          <p className="text-lead font-text text-ink mb-6">
            For a select set of portfolio companies, I provide ongoing CTO-level advisory and embedded support:
            working directly with founders, CTOs, and technology leaders to execute on the value-creation plan,
            de-risk major initiatives, and build teams and architecture that can withstand the next round of
            diligence.
          </p>
          <ul className="space-y-3 text-body font-text text-ink">
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
      </Section>

      {/* Featured Reading */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-4">
            What I Look For Before Saying Yes to a Portfolio Company
          </h2>
          <p className="text-lead font-text text-ink mb-4">
            For GPs, the most important question isn&apos;t just whether a portfolio company has a technology problem —
            it&apos;s whether it has a technology <span className="italic">leadership</span> problem. In this piece, I walk
            through how I evaluate potential portfolio engagements, why I structure my work around equity rather than
            billable hours, and what actually makes a technical advisory relationship valuable at the fund level.
          </p>
          <a
            href="https://asimmohammad.substack.com/p/what-i-look-for-before-saying-yes"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-accent text-ink-inverse px-6 py-3 text-small font-medium hover:bg-accent-hover transition-colors"
          >
            Read the full article on Substack
          </a>
        </div>
      </Section>

      {/* Engagement Model */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">Engagement Model</h2>
          <p className="text-lead font-text text-ink">
            Technical Due Diligence per transaction with optional Portfolio Technology Partner retainers for ongoing
            fund coverage. Scope and artifacts are defined upfront. No hourly surprises.
          </p>
          <div className="mt-10">
            <Link href="/book">
              <Button variant="primary" size="xl">
                Request a confidential conversation
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}

