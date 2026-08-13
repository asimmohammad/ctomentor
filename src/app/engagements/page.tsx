import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABand } from "@/components/CTABand";
import { Eyebrow } from "@/components/Eyebrow";
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

type Tier = {
  id: PricingTierId;
  badge?: string;
  emphasized?: boolean;
  description: string;
  artifacts: string[];
  forWhom: string;
  notFor: string;
  timeline: string;
  weekOne: string;
};

const tiers: Tier[] = [
  {
    id: "diagnostic-sprint",
    badge: "Start here",
    emphasized: true,
    description:
      "One decision, examined properly. You bring the question; I bring objective inputs and a written recommendation you can hand to a board.",
    artifacts: [
      "Written findings report for the deal team or board",
      "Scored risk register with severity and owners",
      "90-day remediation plan with sequencing",
      "Live board or deal-team readout with Q&A",
    ],
    forWhom:
      "Funds and CEOs facing a decision — a close, a raise, an AI budget, a reset of the technology plan — that rests on a technical claim nobody in the room can independently check.",
    notFor:
      "Teams that want ongoing Slack access, weekly standups, or someone to stay and execute. This is a diagnostic, not a retainer.",
    timeline: "Three weeks, fixed scope. Starts within days of kickoff, not months.",
    weekOne:
      "Access and document pull, stakeholder interviews, and a first pass of architecture, delivery, and security posture.",
  },
  {
    id: "advisory",
    description:
      "A standing outside read. Decisions arrive continuously and you want judgment from someone with context who is not inside the politics.",
    artifacts: [
      "Architecture reviews on request",
      "Vendor and build-versus-buy decisions",
      "Hiring calibration and interview design",
      "Board and investor prep on technology",
    ],
    forWhom:
      "CEOs who have engineers and possibly a technical lead, and want an outside read on whether the architecture and the org are actually right.",
    notFor:
      "Companies that need someone to own the roadmap. That is Technology Leadership, and at these hours this tier cannot do it.",
    timeline: "Three months. Renewable, and often a step toward Technology Leadership.",
    weekOne:
      "A current-state read on architecture and team, then a standing cadence you control.",
  },
  {
    id: "fractional-cto",
    description:
      "Someone owns the technology agenda and is accountable for it. Strategy, team structure, roadmap, and the board conversation — decided rather than defaulted.",
    artifacts: [
      "Strategy and architecture owned end-to-end",
      "Team structure, hiring decisions, and org design",
      "Roadmap ownership with dates your team can execute",
      "Board representation on technology",
    ],
    forWhom:
      "Companies with real revenue and a full roadmap where every architecture, vendor, and hiring decision is landing on someone who was never hired to make it.",
    notFor:
      "Teams that already have a strong CTO who needs occasional advice, or anyone who needs a read in under three weeks — that is the Diagnostic.",
    timeline:
      "Three-month minimum, or six months at a 17% lower rate. Six months is the engagement that compounds.",
    weekOne:
      "Every engineer, the codebase, and the incident history. Listening first — the plan lands at day 30, and your team starts executing it in month two.",
  },
  {
    id: "embedded",
    description:
      "The same ownership at a weekly cadence, for companies where technology is on the critical path to the plan.",
    artifacts: [
      "Weekly operating cadence with the leadership team",
      "Hiring and org-design decisions documented",
      "Architecture and delivery roadmap owned end-to-end",
      "Board-ready technology updates each cycle",
    ],
    forWhom:
      "Portfolio companies and growth-stage SaaS where technology is on the critical path to the thesis — and someone has to own the outcomes.",
    notFor: "Teams that need direction more than they need capacity.",
    timeline: "Six months. Priced as a fixed total, not a monthly rate.",
    weekOne:
      "Calendar embed, access, current-state map of delivery and team, and a written 30-day priority list agreed with the CEO.",
  },
  {
    id: "interim",
    description:
      "You lost a technical leader, or you are preparing to hire one. I hold the function while the role gets defined and filled.",
    artifacts: [
      "The function held — decisions keep getting made",
      "The role defined and scoped honestly",
      "Recruiting and technical interviewing for the hire",
      "A clean written handoff to your new leader",
    ],
    forWhom:
      "Companies between technical leaders that cannot afford a decision vacuum while the search runs.",
    notFor: "Indefinite coverage. This tier is designed to end.",
    timeline: "Six months, which is what a real search plus a real handoff takes.",
    weekOne:
      "Triage what is in flight, stabilize the decisions that cannot wait, and draft the role you are actually hiring for.",
  },
  {
    id: "due-diligence",
    description:
      "Pre-acquisition assessment of architecture, security, scalability, and the team — written for the IC, not for theater.",
    artifacts: [
      "IC-ready written diligence report",
      "Architecture and scalability assessment",
      "Security and compliance posture review",
      "Team and delivery-capacity evaluation",
    ],
    forWhom:
      "PE and VC deal partners who need an independent tech view before price is locked, or boards that want the same lens before a strategic move.",
    notFor:
      "Sellers shopping for a vanity report, or buyers who already decided and want a rubber stamp. I will document material risk if it is there.",
    timeline: "Typically 2–4 weeks depending on data-room readiness and access.",
    weekOne:
      "Data-room intake, management calls, and a scoped workplan with the diligence questions that matter to the model.",
  },
  {
    id: "portfolio-partner",
    description:
      "Standing diligence capacity plus portfolio support through the bench — for funds that underwrite technology risk repeatedly.",
    artifacts: [
      "Reserved diligence capacity for live deals",
      "Portfolio company triage and sprint scoping",
      "Bench deployment for specialized work",
      "Quarterly technology risk summary across the book",
    ],
    forWhom:
      "Funds with active deal flow and multiple software holdings that need consistent technical judgment without rebuilding a diligence team each time.",
    notFor:
      "A single portfolio company looking for a fractional CTO. That is Embedded Technology Leadership, not a fund retainer.",
    timeline: "Retainer, typically reviewed quarterly. Capacity reserved for the fund's calendar.",
    weekOne:
      "Fund briefing on open deals and portfolio heat map, then a written coverage plan for the next 90 days.",
  },
];

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
        <Grid>
          {tiers.map((tier) => {
            const pricing = PRICING_BY_ID[tier.id];
            return (
              <GridItem key={tier.id} span={12} lg={6}>
                <Card
                  id={tier.id}
                  variant={tier.emphasized ? "emphasized" : "default"}
                  className="flex h-full flex-col scroll-mt-28"
                >
                  {tier.badge ? (
                    <Eyebrow className="mb-3 text-accent">{tier.badge}</Eyebrow>
                  ) : (
                    <span className="mb-3 block h-[1.125rem]" aria-hidden="true" />
                  )}
                  <h2 className="metric font-display text-h2 text-ink">{pricing.name}</h2>
                  {pricing.subLabel ? (
                    <p className="mt-1 font-text text-caption italic text-ink-muted">
                      {pricing.subLabel}
                    </p>
                  ) : null}
                  <p className="metric mt-3 font-display text-h3 text-ink">{pricing.priceDisplay}</p>
                  <p className="mt-1 font-text text-caption text-ink-muted">{pricing.meta}</p>
                  {pricing.secondary ? (
                    <>
                      <p className="metric mt-3 font-display text-h3 text-ink">
                        {pricing.secondary.priceDisplay}
                      </p>
                      <p className="mt-1 font-text text-caption text-ink-muted">
                        {pricing.secondary.meta}
                        {pricing.secondary.note ? ` — ${pricing.secondary.note}` : ""}
                      </p>
                    </>
                  ) : null}
                  <p className="mt-3 font-text text-caption text-ink-faint">{pricing.effort}</p>
                  <p className="mt-4 font-text text-body text-ink-muted">{tier.description}</p>

                  <p className="mt-6 font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-faint">
                    What you get
                  </p>
                  <ul className="mt-3 list-none space-y-2">
                    {tier.artifacts.map((item) => (
                      <li key={item} className="font-text text-small text-ink">
                        <span className="text-accent" aria-hidden="true">
                          —{" "}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 space-y-4 border-t border-border pt-5">
                    <p className="font-text text-small text-ink">
                      <span className="font-semibold">Who this is for. </span>
                      <span className="text-ink-muted">{tier.forWhom}</span>
                    </p>
                    <p className="font-text text-small text-ink">
                      <span className="font-semibold">Who this is not for. </span>
                      <span className="text-ink-muted">{tier.notFor}</span>
                    </p>
                    <p className="font-text text-small text-ink">
                      <span className="font-semibold">Timeline. </span>
                      <span className="text-ink-muted">{tier.timeline}</span>
                    </p>
                    <p className="font-text text-small text-ink">
                      <span className="font-semibold">Week one. </span>
                      <span className="text-ink-muted">{tier.weekOne}</span>
                    </p>
                  </div>
                </Card>
              </GridItem>
            );
          })}
        </Grid>

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
                  {tiers.map((tier) => (
                    <th
                      key={tier.id}
                      scope="col"
                      className="border-b border-l border-border px-4 py-3 font-text text-small font-semibold text-ink"
                    >
                      {PRICING_BY_ID[tier.id].name}
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
