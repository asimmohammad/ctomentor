import type { InterpretationMatrix } from "../types";

/** CEO/CTO-facing interpretation matrix — same structure, operator framing. */
export const engineeringInterpretations: InterpretationMatrix = {
  velocity: {
    low: {
      interpretation:
        "Your delivery system cannot absorb the roadmap you are selling to the board. Speed problems become revenue problems within two quarters.",
      action:
        "Measure lead time from merge to production for 30 days and put the number on the next leadership agenda.",
      questionActions: {
        a1: "Move to at least a weekly production train. Quarterly releases will not fund a growth plan.",
        a2: "Collapse the promotion path. If merge-to-prod is measured in weeks, your roadmap dates are fiction.",
        a3: "Install an explicit cut line and early slip signal — stop rewriting the quarter in week ten.",
      },
    },
    medium: {
      interpretation:
        "You can ship, but you still buy predictability with late scope cuts. That tax compounds as the team grows.",
      action:
        "Publish the next two quarterly commitments with a written cut-line policy and review slip weekly.",
      questionActions: {
        a1: "Raise deploy frequency until weekly is boring. Monthly trains break under concurrent initiatives.",
        a2: "Automate promotion. Manual QA gates are where your calendar quietly dies.",
        a3: "Require early risk flags from engineering leads — not end-of-quarter surprises in the exec meeting.",
      },
    },
    high: {
      interpretation:
        "Delivery looks like a system, not a heroics culture. Protect it as you hire.",
      action:
        "Report deploy frequency and lead time in the next board pack so the operating rhythm is visible.",
      questionActions: {
        a1: "Keep daily cadence; the risk is process dilution after a hiring surge.",
        a2: "Document the path so a new lead can run it without the original owners.",
        a3: "Preserve early-warning discipline — it is rarer than the CI tooling.",
      },
    },
  },
  quality: {
    low: {
      interpretation:
        "Defects will reach customers before your monitoring does. That is how you lose the next enterprise deal.",
      action:
        "Block merges on the revenue path without automated tests — this month, not next planning cycle.",
      questionActions: {
        b1: "Make CI the gate on money-path services before you expand the roadmap.",
        b2: "Ship an AI-code policy: label, test, human-review. Untracked AI volume is silent debt.",
        b3: "Start measuring change-failure rate. Unknown is worse than a bad number.",
      },
    },
    medium: {
      interpretation:
        "Core coverage exists, but growth will outrun manual review. Quality debt compounds with headcount.",
      action:
        "Raise the merge bar on your top three revenue services and track failure rate weekly.",
      questionActions: {
        b1: "Extend automation past the core paths — that is where incident volume hides.",
        b2: "Add labeling and review sampling for AI-authored changes.",
        b3: "Drive change-failure under 15% with practiced rollbacks.",
      },
    },
    high: {
      interpretation:
        "Quality is enforced, not hoped for. Keep the metrics public inside the company.",
      action:
        "Put change-failure rate and rollback time on the standing engineering review.",
      questionActions: {
        b1: "Hold the CI gate as surface area grows with new initiatives.",
        b2: "Treat the AI verification policy as a hiring and onboarding artifact.",
        b3: "Defend the sub-5% band when roadmap pressure rises.",
      },
    },
  },
  security: {
    low: {
      interpretation:
        "You are not ready for a serious customer security review. That is a go-to-market delay with a date attached.",
      action:
        "Produce a SOC 2 gap list with owners and dates before the next enterprise questionnaire.",
      questionActions: {
        c1: "Set an audit date. Ad-hoc questionnaire answers do not scale.",
        c2: "Put dependency scanning in CI with a criticals SLA.",
        c3: "Remove shared prod credentials and enforce same-day offboarding.",
      },
    },
    medium: {
      interpretation:
        "Controls are real but evidence is uneven. Buyers will ask for the last review and the last critical patch.",
      action:
        "Close the Type II timeline and complete one formal access review this quarter.",
      questionActions: {
        c1: "Finish Type II or publish the audit date internally.",
        c2: "Publish and report a criticals patch SLA monthly.",
        c3: "Move to quarterly access reviews with SSO on every production system.",
      },
    },
    high: {
      interpretation:
        "Security posture should clear enterprise review without rewriting the sales plan.",
      action:
        "Package attestation and access-review evidence for the next security questionnaire.",
      questionActions: {
        c1: "Keep attestation current through the next growth hire wave.",
        c2: "Hold the criticals SLA as contractor and vendor count rises.",
        c3: "Preserve least privilege as the org chart changes.",
      },
    },
  },
  team: {
    low: {
      interpretation:
        "Too much of the system lives in too few heads. A single departure can stop the roadmap.",
      action:
        "Name backups and write runbooks for the top three single-owner systems this week.",
      questionActions: {
        d1: "Kill the one-person architecture before you sell more roadmap to the board.",
        d2: "Stabilize senior attrition before adding initiatives.",
        d3: "Write decision rights down — informal routing does not survive scale.",
      },
    },
    medium: {
      interpretation:
        "You can recover from a loss, but recovery time still burns calendar. Price that honestly in the plan.",
      action:
        "Close remaining single-owner systems within 60 days.",
      questionActions: {
        d1: "Finish bus-factor coverage with pairing and runbooks.",
        d2: "Backfill open senior seats before the next roadmap commit.",
        d3: "Make significant decisions findable, not tribal.",
      },
    },
    high: {
      interpretation:
        "Key-person risk looks managed. Keep the bench plan current as you hire.",
      action:
        "Include the leadership bench plan in the next board technology update.",
      questionActions: {
        d1: "Maintain dual coverage as new systems come online.",
        d2: "Protect senior retention — it is your cheapest risk control.",
        d3: "Keep decision records current through the next org change.",
      },
    },
  },
};
