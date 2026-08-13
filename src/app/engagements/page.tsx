import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABand } from "@/components/CTABand";
import { Eyebrow } from "@/components/Eyebrow";
import { EngagementTiers } from "./EngagementTiers";
import { ProofBand } from "@/components/proof/ProofBand";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";
import {
  FRACTIONAL_MINIMUM_RATIONALE,
  PRICING_BY_ID,
  PRICING_TIERS,
  PRICE_FLOOR_DISPLAY,
  SITE_PRICE_RANGE,
  serviceSchemaForTier,
  type PricingTierId,
} from "@/lib/pricing";

const SITE = "https://thectomentor.com";

export const metadata: Metadata = {
  title: "Engagements — Diagnostic, Advisory & Technology Leadership",
  // Composed from lib/pricing.ts, never literal — brief-check.sh greps this file for
  // ladder display strings and fails the build on any of them, comments included.
  description: `Published pricing: a ${PRICING_BY_ID["diagnostic-sprint"].priceDisplay} Diagnostic, Advisory from ${PRICE_FLOOR_DISPLAY}, Technology Leadership (fractional CTO) from ${PRICING_BY_ID["fractional-cto"].priceDisplay}, and technical due diligence per transaction.`,
  alternates: { canonical: `${SITE}/engagements` },
  openGraph: {
    title: "Engagements — Diagnostic, Advisory & Technology Leadership",
    description:
      "Every engagement answers a decision and is designed to end. Diagnostic, advisory, technology leadership, and technical due diligence — with prices published.",
    url: `${SITE}/engagements`,
    type: "website",
  },
};

/**
 * Keyed by tier id rather than positional arrays: the table columns follow
 * PRICING_TIERS order, and a reordered or added tier must not silently shift
 * every value one column to the left.
 */
const comparisonByTier: Record<
  PricingTierId,
  { minimum: string; artifact: string; buyer: string; firstStep: string }
> = {
  "fractional-cto": {
    minimum: "3 months",
    artifact: "Roadmap ownership + board reporting",
    buyer: "CEO / founder",
    firstStep: "Assessment → conversation",
  },
  advisory: {
    minimum: "3 months",
    artifact: "Standing access + decision reviews",
    buyer: "CEO / founder",
    firstStep: "Assessment → conversation",
  },
  "diagnostic-sprint": {
    minimum: "One sprint",
    artifact: "Findings + risk register",
    buyer: "Deal team / CEO",
    firstStep: "Assessment → sprint",
  },
  "due-diligence": {
    minimum: "One deal",
    artifact: "IC-ready report",
    buyer: "Deal partner",
    firstStep: "Conversation",
  },
  embedded: {
    minimum: "6 months",
    artifact: "Operating cadence + roadmap",
    buyer: "CEO / founder",
    firstStep: "Assessment → embed",
  },
  interim: {
    minimum: "6 months",
    artifact: "Function held + clean handoff",
    buyer: "CEO / board",
    firstStep: "Conversation",
  },
  "portfolio-partner": {
    minimum: "Quarterly review",
    artifact: "Diligence capacity + portfolio triage",
    buyer: "Fund / operating partner",
    firstStep: "Conversation",
  },
};

const comparisonRows: { label: string; values: string[] }[] = [
  {
    label: "Price",
    values: PRICING_TIERS.map((tier) =>
      tier.secondary ? `${tier.priceDisplay} / ${tier.secondary.priceDisplay}` : tier.priceDisplay,
    ),
  },
  {
    label: "Structure",
    values: PRICING_TIERS.map((tier) =>
      tier.secondary ? `${tier.meta} · ${tier.secondary.meta}` : tier.meta,
    ),
  },
  {
    label: "Effort",
    values: PRICING_TIERS.map((tier) => tier.effort),
  },
  {
    label: "Minimum",
    values: PRICING_TIERS.map((tier) => comparisonByTier[tier.id].minimum),
  },
  {
    label: "Primary artifact",
    values: PRICING_TIERS.map((tier) => comparisonByTier[tier.id].artifact),
  },
  {
    label: "Buyer",
    values: PRICING_TIERS.map((tier) => comparisonByTier[tier.id].buyer),
  },
  {
    label: "Best first step",
    values: PRICING_TIERS.map((tier) => comparisonByTier[tier.id].firstStep),
  },
];

/** Brief §4: the three-month floor is published, not defended in the call. */
const FIRST_THIRTY_DAYS = [
  {
    days: "Days 1–10",
    body: "Listen. Every engineer one-on-one, the codebase, the incident history, the last four sprints. No recommendations yet.",
  },
  {
    days: "Days 11–20",
    body: "Diagnose. Where delivery actually stalls, which risks are real, and which of them can wait a quarter.",
  },
  {
    days: "Days 21–30",
    body: "Decide. A written plan with sequencing, owners, and dates — reviewed with you and then with the team that has to run it.",
  },
] as const;

const howItWorks = [
  {
    step: "01",
    title: "Start with the risk",
    description:
      "You start with the Technical Risk Assessment — twelve questions, four minutes, no email until the last one. If you already know the shape of the work, request a conversation instead.",
  },
  {
    step: "02",
    title: "Scope the engagement",
    description:
      "We pick the tier that matches the problem — sprint, embed, diligence, or fund retainer — and write the artifacts and dates before any invoice.",
  },
  {
    step: "03",
    title: "Deliver and decide",
    description:
      "You get the written outputs, not a slide theater. From there you remediate, embed, or close the deal. If quality is the finding, Vigil is an option with the conflict disclosed.",
  },
];

const faqs = [
  {
    id: "faq-publish-prices",
    title: "Why do you publish prices?",
    content:
      "I publish prices to skip calls that will not close. Firms that negotiate the entry price are not ones I can help.",
  },
  {
    id: "faq-below-floor",
    title: `Is there anything below ${PRICE_FLOOR_DISPLAY}?`,
    content: `No. ${PRICE_FLOOR_DISPLAY} for three months is the Advisory tier, and it is already the lightest useful commitment. Anything below that is a conversation, not an engagement — and I would rather have the conversation for free than invoice you for it.`,
  },
  {
    id: "faq-fractional-minimum",
    title: "Why is three months the minimum on Technology Leadership?",
    content: FRACTIONAL_MINIMUM_RATIONALE,
  },
  {
    id: "faq-part-time-worse",
    title: "Isn't part-time leadership worse than none?",
    content:
      "Part-time leadership is worse than excellent full-time leadership. It is enormously better than the actual alternative — decisions distributed across people who do not have the context to make them. Right now, architecture is being decided by whoever is closest to the deadline, and vendors by whoever attended the demo. That is not zero leadership. It is leadership by accident, at full price.",
  },
  {
    id: "faq-vote-of-no-confidence",
    title: "Will my engineers see this as a vote of no confidence?",
    content:
      "Handled badly, yes — and the good ones leave. Handled well, it is the opposite. Most engineering teams I meet are not underperforming. They are under-directed. I do not replace your engineers. I make their work count.",
  },
  {
    id: "faq-consulting",
    title: "How is this different from hiring a consulting firm?",
    content:
      "Firms deliver recommendations. I deliver artifacts and stay accountable to them. I am a practicing CTO — SOC 2 Type II, AWS GovCloud, FedRAMP work in production — not a partner who left the keyboard ten years ago. When the sprint ends, you have a report, a risk register, and a plan you can execute.",
  },
  {
    id: "faq-scale",
    title: "Can I start with a Diagnostic and move to embedded?",
    content:
      "Yes. Most embedded engagements begin after a Diagnostic or an assessment. The Diagnostic clarifies the problem; the embed owns the remediation. There is no obligation to continue after it.",
  },
  {
    id: "faq-minimum",
    title: "What is the minimum engagement length?",
    content:
      "The Diagnostic is three weeks, fixed. Embedded Technology Leadership has a three-month minimum, then month-to-month with 30 days' notice. Diligence is scoped per transaction. Portfolio Partner retainers are reviewed quarterly.",
  },
  {
    id: "faq-equity-old",
    title: "Do you take equity as compensation?",
    content:
      "Cash is the default. For a small set of companies, a portion of compensation can include equity alongside a cash retainer. That is negotiated in the proposal — it is never a substitute for the cash engagement, and it is never the only path in.",
  },
  {
    id: "faq-industries",
    title: "What industries do you specialize in?",
    content:
      "Deepest experience: B2B SaaS, loyalty and rewards, travel technology, and government/defense. The diligence questions — delivery, quality, security, key-person risk — transfer. If I am not a fit, I will say so on the call.",
  },
  {
    id: "faq-geo",
    title: "Do you work with companies outside the US?",
    content:
      "Primary focus is US-based companies, especially those selling to enterprise and government. International work is case-by-case.",
  },
  {
    id: "faq-fulltime",
    title: "What happens if we decide to hire a full-time CTO?",
    content:
      "That is a successful exit from an embed. I can help write the role, interview candidates, and hand off cleanly. Several engagements have ended that way.",
  },
  {
    id: "faq-light-touch",
    title: "Do you offer light-touch monthly advisory?",
    content:
      "No. A light advisory retainer prices the work like coaching. The work that moves a deal or a portfolio company — diligence-grade findings, remediation plans, embedded ownership — starts with a Diagnostic or an embedded engagement. If your need is lighter than that, you do not need me.",
  },
  {
    id: "faq-equity-new",
    title: "Do you take equity instead of cash?",
    content:
      "No. Equity can sit beside cash in rare cases. It does not replace the cash engagement. Diligence for PE/VC is cash-scoped per transaction.",
  },
  {
    id: "faq-marketplace",
    title: "How is this different from a fractional CTO marketplace?",
    content:
      "Marketplaces optimize for matching and hourly fill. I run a named practice with a published offer ladder, a scored assessment, and a bench for overflow. You hire a specific operator with a conflict policy — not a roster slot.",
  },
  {
    id: "faq-bench",
    title: "What if we need more capacity than one person?",
    content:
      "That is the bench. Specialized engineers, architects, and security operators deploy under the engagement when the plan requires more hands than one person. You still get one accountable lead.",
  },
  {
    id: "faq-implement",
    title: "Can you help us implement, or only advise?",
    content:
      "Both, by design. Sprints and diligence produce written plans. Embedded engagements own execution. Where the finding is release quality and test failure, implementation can route to Vigil — with the conflict disclosed below.",
  },
];

const tierDescriptions: Record<PricingTierId, string> = {
  "fractional-cto":
    "Owned technology leadership, also known as a fractional CTO: strategy, team structure, roadmap ownership, and board representation. Three-month minimum or six months.",
  advisory:
    "A standing outside read at 4–8 hours per month: architecture reviews, vendor and hiring decisions, board prep. Three months.",
  interim:
    "Interim technology leadership across a transition: hold the function, define the role, recruit for it, hand off cleanly. Six months.",
  "diagnostic-sprint":
    "One decision examined properly over three weeks, fixed scope: findings report, scored risk register, 90-day remediation plan, board readout.",
  embedded: "1–2 days per week embedded technology leadership. Six months.",
  "due-diligence": "Pre-acquisition technical due diligence with IC-ready written report.",
  "portfolio-partner":
    "Multi-company fund retainer with standing diligence capacity and portfolio support via the bench.",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Technology advisory engagements",
  url: `${SITE}/engagements`,
  priceRange: SITE_PRICE_RANGE,
  itemListElement: PRICING_TIERS.map((tier, index) => ({
    ...serviceSchemaForTier(tier, SITE, tierDescriptions[tier.id]),
    position: index + 1,
  })),
};

export default function EngagementsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Section spacing="compact" tone="paper">
        <Eyebrow>Engagements</Eyebrow>
        <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">
          Priced in problems, not headcount.
        </h1>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
          Every engagement answers a decision, and every engagement is designed to end. Artifacts,
          not activities — and each tier says who it is for and who it is not.
        </p>
        <div className="mt-8 flex flex-col gap-4 sm:flex-row">
          <Button asChild variant="primary" size="lg">
            <Link href={PRIMARY_CTA.href} className="inline-flex items-center gap-2">
              {PRIMARY_CTA.label}
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
          <Button asChild variant="secondary" size="lg">
            <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
          </Button>
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="tiers">
        <EngagementTiers />

        <div className="mt-12 max-w-measure border-t border-border pt-10">
          <h2 className="font-display text-h3 text-ink">What the first 30 days look like</h2>
          <p className="mt-4 font-text text-body text-ink-muted">
            The objection that actually blocks this decision is not price. It is what part-time
            leadership looks like day to day.
          </p>
          <dl className="mt-6 space-y-4">
            {FIRST_THIRTY_DAYS.map((phase) => (
              <div key={phase.days} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
                <dt className="metric font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-faint sm:w-28 sm:shrink-0 sm:pt-1">
                  {phase.days}
                </dt>
                <dd className="font-text text-body text-ink-muted">{phase.body}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 font-text text-body text-ink">
            No 60-slide assessment. A plan your team starts executing in month two.
          </p>
        </div>

        <div className="mt-12 max-w-measure border-t border-border pt-10">
          <h2 className="font-display text-h3 text-ink">What moves the price</h2>
          <p className="mt-4 font-text text-body text-ink-muted">
            Diligence sits in a published range because scope is not fixed until the data room opens. A larger
            portfolio, regulated buyers, or compressed close timelines push toward the top of the range.
          </p>
          <p className="mt-3 font-text text-body text-ink-muted">
            More systems in scope — multiple products, legacy cores, or vendor sprawl — do the same. Narrower
            questions and clean access keep the work at the floor of the band.
          </p>
        </div>
      </Section>

      <ProofBand />

      <Section spacing="standard" tone="paper" id="compare">
        <Eyebrow>Compare</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink">Side-by-side</h2>
        <p className="mt-3 max-w-measure font-text text-body text-ink-muted">
          Scroll horizontally on small screens — the table stays intact for scanners.
        </p>

        <div className="relative mt-8">
          <p
            className="mb-2 font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-faint md:hidden"
            aria-hidden="true"
          >
            Swipe to compare →
          </p>
          <div className="overflow-x-auto border border-border">
            <table className="w-full min-w-[44rem] border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-surface-alt">
                <tr>
                  <th
                    scope="col"
                    className="sticky left-0 z-20 border-b border-border bg-surface-alt px-4 py-3 font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted"
                  >
                    Criterion
                  </th>
                  {/* Header and body both map PRICING_TIERS — the rows below are built
                      from it, so a second source here could silently misalign columns. */}
                  {PRICING_TIERS.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="border-b border-l border-border px-4 py-3 font-text text-small font-semibold text-ink"
                    >
                      {tier.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row) => (
                  <tr key={row.label} className="align-top">
                    <th
                      scope="row"
                      className="sticky left-0 border-b border-border bg-paper px-4 py-3 font-text text-small font-medium text-ink"
                    >
                      {row.label}
                    </th>
                    {row.values.map((value, index) => (
                      <td
                        key={`${row.label}-${index}`}
                        className="border-b border-l border-border px-4 py-3 font-text text-small text-ink-muted"
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="how">
        <Eyebrow>Process</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink">How engagements work</h2>
        <Grid className="mt-10">
          {howItWorks.map((item) => (
            <GridItem key={item.step} span={12} md={4}>
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-accent">{item.step}</p>
              <h3 className="mt-3 font-text text-h4 text-ink">{item.title}</h3>
              <p className="mt-3 font-text text-body text-ink-muted">{item.description}</p>
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section spacing="standard" tone="paper" id="faq">
        <Eyebrow>FAQ</Eyebrow>
        <h2 className="mt-3 font-display text-h2 text-ink">Questions that usually come before a kickoff</h2>
        <div className="mt-10 max-w-measure">
          <Accordion items={faqs} singleOpen />
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="vigil">
        <Eyebrow>Adjacent product</Eyebrow>
        <h2 className="mt-3 max-w-measure font-display text-h2 text-ink">When the finding is quality</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          When a diagnostic identifies testing and release-quality failure as the binding constraint, the client can be
          routed to Vigil — a spec-driven autonomous QA platform built by Helix Platform, Inc. (helixbots.ai), which I
          co-founded and run as CEO.
        </p>
        <p className="mt-4 max-w-measure font-text text-body text-ink-muted">
          Conflict of interest, stated plainly: I have an ownership interest in Helix. Advisory recommendations that
          mention Vigil are disclosed as such. You can decline the referral and still get the full advisory work
          product. The assessment and the sprint do not require Vigil.
        </p>
        <p className="mt-8">
          <Link
            href="/vigil"
            className="font-text text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            Read the Vigil disclosure →
          </Link>
        </p>
      </Section>

      <CTABand
        heading="Start with the risk, not the retainer."
        body="Complete the Technical Risk Assessment, or request a confidential conversation if you already know the shape of the work."
      />
    </>
  );
}
