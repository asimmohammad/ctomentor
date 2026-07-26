import type { Metadata } from "next";
import Link from "next/link";
import { Accordion } from "@/components/Accordion";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABand } from "@/components/CTABand";
import { Eyebrow } from "@/components/Eyebrow";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";

const SITE = "https://thectomentor.com";

export const metadata: Metadata = {
  title: "Engagements — Diagnostic Sprint from $25,000",
  description:
    "Four engagement models: Diagnostic Sprint ($25,000), Embedded Technology Leadership ($25,000/mo), Technical Due Diligence ($35,000–$50,000), and Portfolio Technology Partner ($50,000/mo).",
  alternates: { canonical: `${SITE}/engagements` },
  openGraph: {
    title: "Engagements — from $25,000",
    description:
      "Diagnostic Sprint, embedded technology leadership, technical due diligence, and portfolio partner retainers. Lowest published price: $25,000.",
    url: `${SITE}/engagements`,
    type: "website",
  },
};

type Tier = {
  id: string;
  name: string;
  price: string;
  priceNote: string;
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
    name: "Diagnostic Sprint",
    price: "$25,000",
    priceNote: "Fixed · 3 weeks",
    description:
      "A time-boxed read on technology risk before you commit more capital or change the operating plan.",
    artifacts: [
      "Written findings report for the deal team or board",
      "Scored risk register with severity and owners",
      "90-day remediation plan with sequencing",
      "Live board or deal-team readout with Q&A",
    ],
    forWhom:
      "Funds and CEOs who need a clear picture in three weeks — before a close, a raise, or a reset of the technology plan.",
    notFor:
      "Teams that want ongoing Slack access, weekly standups, or a fractional seat. This is a diagnostic, not a retainer.",
    timeline: "Three weeks, fixed scope. Starts within days of kickoff, not months.",
    weekOne:
      "Access and document pull, stakeholder interviews, and a first pass of architecture, delivery, and security posture.",
  },
  {
    id: "embedded",
    name: "Embedded Technology Leadership",
    price: "$25,000/mo",
    priceNote: "3-month minimum · 1–2 days/week",
    badge: "Most common engagement",
    emphasized: true,
    description:
      "An operating seat alongside management while the engineering plan is rebuilt and executed.",
    artifacts: [
      "Weekly operating cadence with the leadership team",
      "Hiring and org-design decisions documented",
      "Architecture and delivery roadmap owned end-to-end",
      "Board-ready technology updates each cycle",
    ],
    forWhom:
      "Portfolio companies and growth-stage SaaS where technology is on the critical path to the thesis — and someone has to own the outcomes.",
    notFor:
      "Founders looking for a sounding board two hours a month, or teams that already have a strong CTO who only needs occasional advice.",
    timeline: "Three-month minimum. Continues month-to-month after that with 30 days' notice.",
    weekOne:
      "Calendar embed, access, current-state map of delivery and team, and a written 30-day priority list agreed with the CEO.",
  },
  {
    id: "due-diligence",
    name: "Technical Due Diligence",
    price: "$35,000–$50,000",
    priceNote: "Per transaction",
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
    name: "Portfolio Technology Partner",
    price: "$50,000/mo",
    priceNote: "Multi-company fund retainer",
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

const comparisonRows: { label: string; values: string[] }[] = [
  {
    label: "Price",
    values: ["$25,000 fixed", "$25,000/mo", "$35,000–$50,000", "$50,000/mo"],
  },
  {
    label: "Shape",
    values: ["3-week sprint", "1–2 days/week", "Per transaction", "Fund retainer"],
  },
  {
    label: "Minimum",
    values: ["One sprint", "3 months", "One deal", "Quarterly review"],
  },
  {
    label: "Primary artifact",
    values: [
      "Findings + risk register",
      "Operating cadence + roadmap",
      "IC-ready report",
      "Diligence capacity + portfolio triage",
    ],
  },
  {
    label: "Buyer",
    values: ["Deal team / CEO", "CEO / board", "Deal partner", "Fund / operating partner"],
  },
  {
    label: "Best first step",
    values: ["Assessment → sprint", "Assessment → embed", "Conversation", "Conversation"],
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Start with the risk",
    description:
      "Cold traffic takes the Technical Risk Assessment. Qualified conversations book a confidential call. Application forms stay bottom-of-funnel.",
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
    id: "faq-consulting",
    title: "How is this different from hiring a consulting firm?",
    content:
      "Firms deliver recommendations. I deliver artifacts and stay accountable to them. I am a practicing CTO — SOC 2 Type II, AWS GovCloud, FedRAMP work in production — not a partner who left the keyboard ten years ago. When the sprint ends, you have a report, a risk register, and a plan you can execute.",
  },
  {
    id: "faq-scale",
    title: "Can I start with a Diagnostic Sprint and move to embedded?",
    content:
      "Yes. Most embedded seats begin after a sprint or an assessment. The sprint clarifies the problem; the embed owns the remediation. There is no obligation to continue after the sprint.",
  },
  {
    id: "faq-minimum",
    title: "What is the minimum engagement length?",
    content:
      "Diagnostic Sprint is three weeks, fixed. Embedded Technology Leadership has a three-month minimum, then month-to-month with 30 days' notice. Diligence is scoped per transaction. Portfolio Partner retainers are reviewed quarterly.",
  },
  {
    id: "faq-equity-old",
    title: "Do you take equity as compensation?",
    content:
      "Cash is the default. For a small set of companies, a portion of compensation can include equity alongside a cash retainer. That is negotiated in the proposal — it is not a substitute for the $25,000 floor, and it is never the only path in.",
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
    id: "faq-5k",
    title: "Why is there no $5k option?",
    content:
      "A $5,000 monthly advisory seat prices the work like coaching. The work that moves a deal or a portfolio company — diligence-grade findings, remediation plans, embedded ownership — starts at $25,000. If your need is lighter than that, you do not need me.",
  },
  {
    id: "faq-equity-new",
    title: "Do you take equity instead of cash?",
    content:
      "No. Equity can sit beside cash in rare cases. It does not replace the cash engagement. Diligence for PE/VC is cash-priced per transaction.",
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
      "That is the bench. Specialized engineers, architects, and security operators deploy under the engagement when the plan requires more hands than one seat. You still get one accountable lead.",
  },
  {
    id: "faq-implement",
    title: "Can you help us implement, or only advise?",
    content:
      "Both, by design. Sprints and diligence produce written plans. Embedded seats own execution. Where the finding is release quality and test failure, implementation can route to Vigil — with the conflict disclosed below.",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Technology advisory engagements",
  url: `${SITE}/engagements`,
  itemListElement: [
    {
      "@type": "Service",
      position: 1,
      name: "Diagnostic Sprint",
      description:
        "Three-week fixed-scope technology diagnostic: findings report, scored risk register, 90-day remediation plan, board readout.",
      provider: { "@type": "Person", name: "Asim Mohammad", url: SITE },
      url: `${SITE}/engagements#diagnostic-sprint`,
      offers: {
        "@type": "Offer",
        price: "25000",
        priceCurrency: "USD",
        unitText: "FIXED_PRICE",
      },
    },
    {
      "@type": "Service",
      position: 2,
      name: "Embedded Technology Leadership",
      description:
        "1–2 days per week embedded technology leadership. Three-month minimum.",
      provider: { "@type": "Person", name: "Asim Mohammad", url: SITE },
      url: `${SITE}/engagements#embedded`,
      offers: {
        "@type": "Offer",
        price: "25000",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
    {
      "@type": "Service",
      position: 3,
      name: "Technical Due Diligence",
      description:
        "Pre-acquisition technical due diligence with IC-ready written report.",
      provider: { "@type": "Person", name: "Asim Mohammad", url: SITE },
      url: `${SITE}/engagements#due-diligence`,
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "35000",
        highPrice: "50000",
        priceCurrency: "USD",
        offerCount: "1",
      },
    },
    {
      "@type": "Service",
      position: 4,
      name: "Portfolio Technology Partner",
      description:
        "Multi-company fund retainer with standing diligence capacity and portfolio support via the bench.",
      provider: { "@type": "Person", name: "Asim Mohammad", url: SITE },
      url: `${SITE}/engagements#portfolio-partner`,
      offers: {
        "@type": "Offer",
        price: "50000",
        priceCurrency: "USD",
        unitText: "MONTH",
      },
    },
  ],
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
          Four ways the work is scoped. Lowest published price: $25,000.
        </h1>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
          Artifacts, not activities. Qualification is mutual — each tier says who it is for and who it is not.
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
          {tiers.map((tier) => (
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
                <p className="metric font-display text-h2 text-ink">{tier.price}</p>
                <p className="mt-1 font-text text-caption text-ink-faint">{tier.priceNote}</p>
                <h2 className="mt-4 font-text text-h4 text-ink">{tier.name}</h2>
                <p className="mt-2 font-text text-body text-ink-muted">{tier.description}</p>

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
          ))}
        </Grid>
      </Section>

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
        <p className="mt-6">
          <Link
            href="/vigil"
            className="font-text text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            Read how Vigil relates to the practice
          </Link>
        </p>
      </Section>

      <CTABand
        heading="Pick the risk first. The tier follows."
        body="Take the Technical Risk Assessment, or request a confidential conversation if you already know the shape of the work."
        scarcity="Two engagement slots for Q4 2026."
      />
    </>
  );
}
