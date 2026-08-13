"use client";

import * as React from "react";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { Eyebrow } from "@/components/Eyebrow";
import { Modal } from "@/components/Modal";
import { Grid, GridItem } from "@/components/layout/Grid";
import { SECONDARY_CTA } from "@/lib/cta";
import { PRICING_BY_ID, type PricingTierId } from "@/lib/pricing";

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

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <p className="font-text text-small text-ink">
      <span className="font-semibold">{label} </span>
      <span className="text-ink-muted">{value}</span>
    </p>
  );
}

/**
 * Summary cards with the full tier detail behind a modal.
 *
 * The card id is kept on the summary so the homepage decision doors and every
 * schema Offer url — /engagements#diagnostic-sprint and friends — still land on
 * the right card. Detail lives in the dialog, not at a second anchor.
 */
export function EngagementTiers() {
  const [openTier, setOpenTier] = React.useState<PricingTierId | null>(null);
  const active = tiers.find((tier) => tier.id === openTier) ?? null;
  const activePricing = active ? PRICING_BY_ID[active.id] : null;

  return (
    <>
      <Grid>
        {tiers.map((tier) => {
          const pricing = PRICING_BY_ID[tier.id];
          return (
            <GridItem key={tier.id} span={12} md={6} lg={4}>
              <Card
                id={tier.id}
                variant={tier.emphasized ? "emphasized" : "default"}
                static
                className="flex h-full flex-col scroll-mt-28"
              >
                {tier.badge ? (
                  <Eyebrow className="mb-3 text-accent">{tier.badge}</Eyebrow>
                ) : (
                  <span className="mb-3 block h-[1.125rem]" aria-hidden="true" />
                )}
                <h3 className="text-balance font-display text-h4 font-semibold text-ink">
                  {pricing.name}
                </h3>
                {pricing.subLabel ? (
                  <p className="mt-1 font-text text-caption italic text-ink-muted">
                    {pricing.subLabel}
                  </p>
                ) : null}
                <p className="metric mt-3 font-display text-h3 text-ink">{pricing.priceDisplay}</p>
                <p className="mt-1 font-text text-caption text-ink-muted">{pricing.meta}</p>
                {pricing.secondary ? (
                  <p className="mt-2 font-text text-caption text-ink-muted">
                    or {pricing.secondary.priceDisplay} {pricing.secondary.meta}
                  </p>
                ) : null}
                <p className="mt-2 font-text text-caption text-ink-faint">{pricing.effort}</p>
                <p className="mt-4 flex-1 font-text text-body text-ink-muted">{tier.description}</p>
                <div className="mt-6">
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={() => setOpenTier(tier.id)}
                    aria-haspopup="dialog"
                  >
                    More info
                  </Button>
                </div>
              </Card>
            </GridItem>
          );
        })}
      </Grid>

      <Modal
        open={active !== null}
        onOpenChange={(next) => {
          if (!next) setOpenTier(null);
        }}
        title={activePricing?.name ?? ""}
        titleSlot={
          activePricing ? (
            <div>
              <p className="font-display text-h3 font-semibold text-ink">{activePricing.name}</p>
              {activePricing.subLabel ? (
                <p className="mt-1 font-text text-caption italic text-ink-muted">
                  {activePricing.subLabel}
                </p>
              ) : null}
              <p className="metric mt-3 font-display text-h4 text-ink">
                {activePricing.priceDisplay}
                <span className="ml-2 font-text text-caption text-ink-muted">
                  {activePricing.meta}
                </span>
              </p>
              {activePricing.secondary ? (
                <p className="mt-1 font-text text-caption text-ink-muted">
                  or {activePricing.secondary.priceDisplay} {activePricing.secondary.meta}
                  {activePricing.secondary.note ? ` — ${activePricing.secondary.note}` : ""}
                </p>
              ) : null}
            </div>
          ) : null
        }
        footer={
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-text text-caption text-ink-muted">
              No obligation. If this is not the right tier, I will say so.
            </p>
            <Button asChild variant="primary" size="md">
              <Link href={SECONDARY_CTA.href} onClick={() => setOpenTier(null)}>
                Continue
              </Link>
            </Button>
          </div>
        }
      >
        {active ? (
          <div className="space-y-6">
            <p className="font-text text-body text-ink-muted">{active.description}</p>

            <div>
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-faint">
                What you get
              </p>
              <ul className="mt-3 list-none space-y-2">
                {active.artifacts.map((item) => (
                  <li key={item} className="font-text text-small text-ink">
                    <span className="text-accent" aria-hidden="true">
                      —{" "}
                    </span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4 border-t border-border pt-5">
              <DetailRow label="Who this is for." value={active.forWhom} />
              <DetailRow label="Who this is not for." value={active.notFor} />
              <DetailRow label="Timeline." value={active.timeline} />
              <DetailRow label="Week one." value={active.weekOne} />
            </div>
          </div>
        ) : null}
      </Modal>
    </>
  );
}
