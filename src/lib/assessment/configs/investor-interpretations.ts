import type { InterpretationMatrix } from "../types";

/**
 * Investor-facing interpretation matrix.
 * Band by dimension percentage: low ≤33, medium ≤66, high >66.
 * questionActions override the recommended action when that question is the
 * lowest score within the dimension.
 */
export const investorInterpretations: InterpretationMatrix = {
  velocity: {
    low: {
      interpretation:
        "Release cadence cannot support the growth case in the model. Delivery risk will show up as missed revenue, not as a ticket backlog.",
      action:
        "Instrument time-from-merge-to-production for 30 days and publish the number to the deal team before the next IC.",
      questionActions: {
        a1: "Move from release events to a weekly train within one quarter — treat deploy frequency as a diligence metric, not an engineering preference.",
        a2: "Cut the merge-to-production path to under three days. Long promotion queues are where diligence finds silent capacity risk.",
        a3: "Replace directional quarterly commitments with dated scope that has an explicit cut line — and a weekly slip signal.",
      },
    },
    medium: {
      interpretation:
        "The team ships, but predictability still depends on heroes and late scope cuts. That works until the model assumes a higher burn rate of features.",
      action:
        "Make the next two quarterly commitments public to the board with a written cut-line policy — then measure whether dates hold.",
      questionActions: {
        a1: "Increase deploy frequency until weekly is the floor. Monthly release trains rarely survive a post-close growth plan.",
        a2: "Automate the last mile from merge to production. Manual promotion steps are where lead time hides.",
        a3: "Require early slip flags — not end-of-quarter surprises — as a standing operating rhythm with the CEO.",
      },
    },
    high: {
      interpretation:
        "Delivery velocity looks institutional rather than heroic. This is the posture that survives diligence without rewriting the operating plan.",
      action:
        "Lock the current cadence as a diligence artifact: publish deploy frequency and lead time in the next board pack.",
      questionActions: {
        a1: "Keep daily deploy discipline; the diligence risk is regression after a key hire leaves, not speed itself.",
        a2: "Document the automated path so a new CTO can operate it without the original authors.",
        a3: "Preserve the early-warning culture — it is rarer than the tooling and more valuable in a portfolio review.",
      },
    },
  },
  quality: {
    low: {
      interpretation:
        "Quality gates are informal. Change failure will arrive as customer-visible incidents, which is the pattern that resets enterprise deals.",
      action:
        "Stand up a minimum CI gate on the money path this month — merge blocked without tests on the services that touch revenue.",
      questionActions: {
        b1: "Make automated tests a merge requirement on the revenue path before the next enterprise security review.",
        b2: "Write an AI-code policy this week: label, test, and human-review. Untracked AI volume is how silent defects enter the mainline.",
        b3: "Start measuring change-failure rate. If you cannot state it, diligence will assume the worst quartile.",
      },
    },
    medium: {
      interpretation:
        "Core paths have coverage, but the system still depends on people catching what automation misses. That gap widens with headcount growth.",
      action:
        "Raise the merge bar on the top three services by customer revenue and track change-failure rate weekly.",
      questionActions: {
        b1: "Extend CI gates beyond core paths — partial automation is where post-close incident volume usually lives.",
        b2: "Add labeling and sampling for AI-authored changes. Same bar as human code, with visibility for the CTO.",
        b3: "Drive change-failure under 15% with mandatory rollback drills — customer-reported defects are a diligence red flag.",
      },
    },
    high: {
      interpretation:
        "Quality posture is measurable and enforced. This is the difference between a diligence finding and a diligence non-event.",
      action:
        "Publish change-failure rate and rollback time as standing metrics in the next operating review.",
      questionActions: {
        b1: "Keep CI as the gate; expand coverage targets as the surface area grows with the thesis.",
        b2: "Treat the AI verification policy as a diligence artifact — most peers still cannot produce one.",
        b3: "Protect the sub-5% failure band; growth plans that ignore it rewrite themselves after the first enterprise outage.",
      },
    },
  },
  security: {
    low: {
      interpretation:
        "Attestation and access control are not ready for a first enterprise review. That is a revenue-timing risk, not a checkbox.",
      action:
        "Commission a readiness gap list against SOC 2 Type II — owners and dates — before the next customer security questionnaire.",
      questionActions: {
        c1: "Schedule the audit path with a fixed date. Ad-hoc questionnaire answers do not survive a serious enterprise review.",
        c2: "Put dependency scanning in CI with a criticals SLA. Patch latency is what buyers underwrite, not intent.",
        c3: "Kill shared production credentials and enforce same-day offboarding — this is table stakes before diligence.",
      },
    },
    medium: {
      interpretation:
        "Controls exist, but evidence and cadence are uneven. Diligence will ask for the last access review and the last critical patch SLA.",
      action:
        "Close the Type II timeline and run one formal access review this quarter with written evidence.",
      questionActions: {
        c1: "Finish Type II or publish the audit date to the board. Ambiguous attestation status slows every enterprise deal.",
        c2: "Publish a criticals patch SLA and report compliance monthly — prioritization without a clock is not a control.",
        c3: "Move from occasional reviews to a quarterly access review with SSO everywhere production matters.",
      },
    },
    high: {
      interpretation:
        "Security posture looks like it will survive enterprise review without rewriting the revenue plan.",
      action:
        "Package the latest attestation letter and access-review evidence as a diligence appendix.",
      questionActions: {
        c1: "Keep attestation current; material exceptions are what reset buyer confidence, not the certificate itself.",
        c2: "Maintain the criticals SLA through growth hiring — process dilution is the usual regression.",
        c3: "Preserve least-privilege discipline as contractors and portfolio support scale.",
      },
    },
  },
  team: {
    low: {
      interpretation:
        "Key-person risk is material. A single departure can stall delivery of the thesis you just underwrote.",
      action:
        "Identify the top three single-owner systems this week and assign a documented backup with a pairing plan.",
      questionActions: {
        d1: "Eliminate the one-person architecture: runbooks and a named backup for every critical system before close.",
        d2: "Stabilize senior attrition before adding roadmap scope — open leadership seats are a thesis risk.",
        d3: "Write decision rights down. Informal routing through one or two people does not survive diligence or growth.",
      },
    },
    medium: {
      interpretation:
        "The team can recover from a loss, but recovery time still shows up in the operating plan. Diligence will price that delay.",
      action:
        "Complete bus-factor coverage on the remaining single-owner systems within 60 days.",
      questionActions: {
        d1: "Close the last single-owner systems with pairing and runbooks — weeks of recovery is still model risk.",
        d2: "Backfill open senior seats before committing to the next growth case in the model.",
        d3: "Raise decision documentation from partial to findable — contested decisions reappear in every diligence cycle.",
      },
    },
    high: {
      interpretation:
        "Key-person exposure looks managed. Delivery does not depend on a single head of knowledge.",
      action:
        "Keep the leadership bench plan current and include it in the next board technology update.",
      questionActions: {
        d1: "Maintain dual coverage as the org scales — bus-factor regressions usually arrive with new systems, not old ones.",
        d2: "Protect the no-unplanned-senior-departure band; it is a diligence differentiator.",
        d3: "Keep decision records findable — this is cheap insurance for the next CTO transition.",
      },
    },
  },
};
