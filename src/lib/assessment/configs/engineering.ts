import type { AssessmentConfig, Question } from "../types";
import { investorDimensions, investorBenchmarks } from "./investor";
import { engineeringInterpretations } from "./engineering-interpretations";

/**
 * Parallel question set for CEO/CTO audience (paid social / secondary ICP).
 * Same dimensions and scoring; prompts and helpers speak to operators, not deal partners.
 */
export const engineeringQuestions: Question[] = [
  {
    id: "a1",
    dimension: "velocity",
    prompt: "How often does your team ship to production?",
    helper: "Count releases that reach real users — not staging or feature flags that never flip.",
    options: [
      { id: "a1-3", label: "Multiple times daily, on demand, without a release window", score: 3 },
      { id: "a1-2", label: "Weekly, on a predictable release train", score: 2 },
      { id: "a1-1", label: "Monthly, bundled into a coordinated release", score: 1 },
      { id: "a1-0", label: "Quarterly or slower, treated as an event", score: 0 },
    ],
  },
  {
    id: "a2",
    dimension: "velocity",
    prompt: "After a pull request merges, how long until it is live for customers?",
    options: [
      { id: "a2-3", label: "Under an hour, fully automated", score: 3 },
      { id: "a2-2", label: "One to three days, with a scheduled promotion step", score: 2 },
      { id: "a2-1", label: "One to two weeks, gated by manual QA sign-off", score: 1 },
      { id: "a2-0", label: "Longer than two weeks, or it varies too much to state", score: 0 },
    ],
  },
  {
    id: "a3",
    dimension: "velocity",
    prompt: "When engineering commits to a date this quarter, what usually happens?",
    helper: "Answer for the last two quarters — not the plan you presented.",
    options: [
      { id: "a3-3", label: "Scope and date hold; slippage is flagged weeks ahead", score: 3 },
      { id: "a3-2", label: "Date holds, scope is trimmed late to make it", score: 2 },
      { id: "a3-1", label: "Dates slip by a few weeks and are re-baselined", score: 1 },
      { id: "a3-0", label: "Commitments are directional; the roadmap is rewritten mid-quarter", score: 0 },
    ],
  },
  {
    id: "b1",
    dimension: "quality",
    prompt: "What has to pass before a change reaches your customers?",
    options: [
      {
        id: "b1-3",
        label: "Automated tests plus CI gates block the merge; coverage is tracked as a target",
        score: 3,
      },
      { id: "b1-2", label: "Automated tests exist on core paths; the rest is manual review", score: 2 },
      { id: "b1-1", label: "Manual QA is the primary gate; automation is partial and aging", score: 1 },
      { id: "b1-0", label: "Peer review only; tests are written after incidents", score: 0 },
    ],
  },
  {
    id: "b2",
    dimension: "quality",
    prompt: "How do you verify AI-generated code before it merges?",
    helper: "Most engineering orgs now ship a material share of AI-authored changes.",
    options: [
      {
        id: "b2-3",
        label:
          "Explicit policy: AI-authored changes are labeled, test-covered, and human-reviewed with the same bar as any change",
        score: 3,
      },
      {
        id: "b2-2",
        label: "Reviewed by a human like any other code, with no separate labeling or tracking",
        score: 2,
      },
      { id: "b2-1", label: "Reviewed informally; volume makes deep review inconsistent", score: 1 },
      { id: "b2-0", label: "No policy; usage is unmeasured and left to individual judgment", score: 0 },
    ],
  },
  {
    id: "b3",
    dimension: "quality",
    prompt: "What share of your deployments cause a customer-visible problem?",
    options: [
      { id: "b3-3", label: "Under 5%, with rollback in minutes and a written post-incident record", score: 3 },
      { id: "b3-2", label: "Roughly 5–15%, caught quickly and rolled back cleanly", score: 2 },
      { id: "b3-1", label: "Roughly 15–30%, often surfaced by customers before monitoring", score: 1 },
      { id: "b3-0", label: "Not measured, so the honest answer is unknown", score: 0 },
    ],
  },
  {
    id: "c1",
    dimension: "security",
    prompt: "Where does your formal attestation stand today?",
    options: [
      { id: "c1-3", label: "SOC 2 Type II (or equivalent) current, with no material exceptions", score: 3 },
      { id: "c1-2", label: "Type I complete or Type II audit underway with a set date", score: 2 },
      { id: "c1-1", label: "Controls documented internally; no audit has been scheduled", score: 1 },
      { id: "c1-0", label: "Not started; security questionnaires are answered ad hoc per deal", score: 0 },
    ],
  },
  {
    id: "c2",
    dimension: "security",
    prompt: "How do you handle vulnerabilities and dependencies?",
    options: [
      { id: "c2-3", label: "Automated scanning in CI; criticals patched on a defined SLA", score: 3 },
      { id: "c2-2", label: "Scanning runs regularly; patching is prioritized against roadmap work", score: 2 },
      { id: "c2-1", label: "Periodic manual review, usually prompted by an audit or customer", score: 1 },
      { id: "c2-0", label: "Addressed when something breaks or is externally reported", score: 0 },
    ],
  },
  {
    id: "c3",
    dimension: "security",
    prompt: "How is production access controlled on your systems?",
    helper: "Include contractors and people who left in the last year.",
    options: [
      { id: "c3-3", label: "SSO with least-privilege roles, access reviews, and same-day offboarding", score: 3 },
      { id: "c3-2", label: "SSO and role-based access; reviews happen occasionally", score: 2 },
      { id: "c3-1", label: "Shared credentials exist for some systems; offboarding is manual", score: 1 },
      { id: "c3-0", label: "Broad standing access for most engineers; no formal review", score: 0 },
    ],
  },
  {
    id: "d1",
    dimension: "team",
    prompt: "If your most critical engineer left tomorrow, what breaks?",
    helper: "Bus-factor. Answer for the systems that would stop revenue if they went dark.",
    options: [
      { id: "d1-3", label: "Nothing stops; at least two people can operate every critical system", score: 3 },
      { id: "d1-2", label: "Recovery takes weeks; documentation and pairing cover most of it", score: 2 },
      { id: "d1-1", label: "One or two systems have a single owner and no written runbook", score: 1 },
      { id: "d1-0", label: "Core architecture lives in one person's head; delivery would stall", score: 0 },
    ],
  },
  {
    id: "d2",
    dimension: "team",
    prompt: "What has senior engineering attrition looked like over the past year?",
    options: [
      { id: "d2-3", label: "No unplanned senior departures; leadership bench is identified", score: 3 },
      { id: "d2-2", label: "One senior departure, backfilled without losing delivery", score: 2 },
      { id: "d2-1", label: "Multiple senior departures, with roles still open", score: 1 },
      { id: "d2-0", label: "Sustained attrition, including in leadership positions", score: 0 },
    ],
  },
  {
    id: "d3",
    dimension: "team",
    prompt: "How are technical decisions made and recorded on your team?",
    options: [
      {
        id: "d3-3",
        label: "Decision rights are explicit; significant choices are written down and findable",
        score: 3,
      },
      { id: "d3-2", label: "Ownership is clear in practice; documentation is partial", score: 2 },
      { id: "d3-1", label: "Decisions route through one or two people informally", score: 1 },
      { id: "d3-0", label: "Decisions are contested or revisited; little is recorded", score: 0 },
    ],
  },
];

export const engineeringConfig: AssessmentConfig = {
  id: "engineering",
  framing: {
    name: "The Engineering Risk Assessment",
    headline: "Twelve questions on whether your engineering system can fund the plan.",
    body: "Built for CEOs and CTOs. Same four dimensions as the investor assessment — velocity, quality, security, and key-person risk — with copy written for operators. No email until all twelve are answered.",
    gateBody:
      "Your score is computed. Enter work details to unlock the full report and a shareable link for your leadership team.",
    resultsEyebrow: "Engineering Risk Assessment · Results",
    path: "/engineering-assessment",
    resultsPathPrefix: "/engineering-assessment/r",
  },
  dimensions: investorDimensions,
  questions: engineeringQuestions,
  benchmarks: { ...investorBenchmarks },
  interpretations: engineeringInterpretations,
  storageKey: "tra:progress:v1:engineering",
};
