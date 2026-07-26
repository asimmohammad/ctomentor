import type { InsightPiece } from "./types";

/**
 * Editorial catalog. Bodies are published copy — never engineering placeholders.
 */
export const insights: Record<string, InsightPiece> = {
  "ai-coding-tools-lying": {
    title: "Your AI Coding Tools Are Lying to You (And Your Engineers Don't Know It Yet)",
    date: "February 21, 2026",
    dateIso: "2026-02-21",
    category: "AI & Strategy",
    kind: "article",
    featured: true,
    /** Example cross-post: canonical points to Substack original when set. */
    substackUrl: "https://asimmohammad.substack.com/p/your-ai-coding-tools-are-lying-to",
    description:
      "Pull request sizes are up 33%. Change failure rates are climbing nearly 30%. The culprit isn't laziness — it's confidence without context.",
    body: [
      "Across the portfolios I diligence, the same pattern shows up in the metrics before anyone names it. Pull request size is up. Cycle time looks \"faster.\" Escaped defects and rollback rates climb in the same quarter. Leadership celebrates velocity. Production pays the invoice.",
      "The tools are not malicious. They are confident. They emit plausible code against incomplete context — missing invariants, stale domain rules, tests that assert the wrong thing. Engineers who treat that output as finished work ship risk they cannot see.",
      "Context engineering is the CTO-level discipline here. Who owns the system of record for requirements? Which specs are machine-readable? What is the definition of done when an agent wrote half the diff? If those answers are fuzzy, AI coding tools amplify whatever chaos already existed.",
      "I ask three questions in diagnostics. First: can a new engineer reconstruct why a change was allowed without pinging three people? Second: do your automated checks catch the failure modes that actually hurt customers — or only the ones that are easy to unit test? Third: when an AI suggestion conflicts with an architectural decision, who wins, and how is that recorded?",
      "Most teams fail the second question. They have coverage theater: high line counts, weak behavioral assertions, and no path from product risk to test priority. AI makes that worse because it fills the gaps with fluent nonsense.",
      "The fix is not a ban on assistants. It is making verification the scarce resource. Specs before generation. Contracts that fail loudly. QA capacity that scales with merge rate — human or autonomous — instead of hoping review culture keeps up.",
      "If your change failure rate rose while AI adoption rose, do not treat that as a people problem first. Treat it as a verification problem. The code got cheaper. Correctness did not.",
      "That is the 2026 CTO job: decide how much unverified code the business is willing to ship, then build the system that enforces the answer.",
    ],
  },
  "soc-2-compliance": {
    title:
      "SOC 2 Compliance: What Every Technology Leader Needs to Know (And How to Get There Without Losing Your Mind)",
    date: "February 15, 2026",
    dateIso: "2026-02-15",
    category: "Security & Compliance",
    kind: "article",
    description:
      "If you're selling to enterprise, you've heard the question: 'Are you SOC 2 compliant?' Here's what I learned from the SOC 2 journey at Laasy — and the tools that made it manageable.",
    body: [
      "Enterprise buyers do not ask about your roadmap first. They ask whether you can prove control. SOC 2 is the shorthand. The question behind it is simpler: can you show that customer data is handled by a system, not by heroics?",
      "At Laasy we treated SOC 2 as an operating upgrade, not a binder project. The audit is a lagging indicator. The leading work is access control, change management, logging, and incident response that people actually use under pressure.",
      "Start with scope honesty. Type I vs Type II, which trust services matter, which systems are in. Over-scoping burns months. Under-scoping fails the buyer conversation. Map the revenue path: which products touch customer data, and what must be true for a procurement team to say yes.",
      "Evidence collection fails when it is seasonal. Build continuous evidence into the pipeline — tickets that require tickets, deploy logs that cannot be edited quietly, access reviews on a calendar that leadership sees. If evidence only appears when the auditor arrives, you do not have a control system.",
      "Tooling helps. Identity providers, SIEM, ticketing, and infrastructure-as-code reduce the human surface area. They do not replace ownership. Someone has to be accountable for exceptions, and exceptions must expire.",
      "The cultural failure mode is \"compliance theater\": policies that no engineer has read, annual training that changes nothing, and a security owner who is also the only person who can ship. Auditors notice. Customers notice later, in incidents.",
      "Budget time for remediation, not just the audit window. Finding lists are normal. What matters is how fast you close critical gaps and whether the same class of finding repeats next year.",
      "If you are pre-revenue and chasing SOC 2 because a blog said so, wait. If you are blocked on enterprise deals and your controls are tribal knowledge, start now — with a diagnostic of what is already true, not a fantasy policy set.",
    ],
  },
  "cto-skill-no": {
    title: 'The CTO Skill Nobody Trains For: Saying "No"',
    date: "February 9, 2026",
    dateIso: "2026-02-09",
    category: "Leadership",
    kind: "article",
    description:
      "Every technical leader knows the feeling: constant requests, endless priorities, and the quiet pressure to say yes to everything. But the most important technical decision is often deciding what not to build.",
    body: [
      "Engineering organizations drown in yes. Sales wants a custom path. Product wants three bets at once. Founders want the demo that closes the round. The CTO who cannot say no becomes a scheduling API for other people's anxiety.",
      "Saying no is not theater. It is capital allocation. Every yes spends attention, introduces coupling, and creates a maintenance tax that compounds after the launch tweet.",
      "Good nos are specific. \"Not this quarter.\" \"Not without killing X.\" \"Not until the reliability work finishes.\" Vague delay is just cowardice with a calendar. Clear tradeoffs earn trust even when people disagree.",
      "I look for decision rights in diligence. Who can kill a project? Who can reopen a killed project? If the answer is \"the loudest person in Slack,\" you do not have a technology strategy — you have a conflict resolution problem wearing a backlog.",
      "Train the skill in writing. Architecture decision records, kill criteria, and published priorities beat hallway negotiation. When the record is public inside the company, political re-litigation gets expensive.",
      "The personal cost is real. Nos create short-term friction with peers who wanted a favor. Yeses create long-term systems that cannot be operated. Choose which relationship you are optimizing: this week's meeting, or next year's on-call.",
      "Boards and CEOs should ask for the kill list, not only the roadmap. A roadmap without kills is a wish list. A CTO without kills is a project manager with equity.",
    ],
  },
  "fix-after-launch": {
    title: 'Why "We\'ll Fix It After Launch" Is How Startups Die',
    date: "January 11, 2026",
    dateIso: "2026-01-11",
    category: "Leadership",
    kind: "article",
    description:
      "Nearly every startup makes a quiet promise: 'We'll fix it after launch.' What makes this promise dangerous isn't that it's dishonest—it's that it's based on a future that almost never exists.",
    body: [
      "\"We'll fix it after launch\" sounds responsible. It is usually a bet against reality. After launch comes support load, sales pressure, hiring chaos, and the next launch. The debt does not wait politely.",
      "I see the phrase in diligence decks the way doctors see smoking history. It predicts where the outages will concentrate: auth edges, data migrations, observability gaps, and the one service nobody owns.",
      "Some debt is rational. Shipping with known limits and a dated remediation plan can be correct. Shipping with unnamed debt and no owner is how companies discover their architecture in an incident channel.",
      "Force the list. What is deferred, who owns it, what metric trips the fix, and what is the kill date if it slips? If those four answers do not exist, you do not have a plan — you have a story for investors.",
      "Post-launch windows compress. The team that \"will clean it up\" is also the team closing tickets from the launch. Capacity does not magically appear because the marketing site went live.",
      "CEOs should treat deferred fixes as balance-sheet items. They consume future runway whether or not finance models them. CTOs should refuse to accept debt without a repayment schedule.",
      "The companies that survive launch are not the ones that shipped perfect systems. They are the ones that refused to lie to themselves about what remained unfinished.",
    ],
  },
  "many-faces-cto": {
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    date: "January 25, 2026",
    dateIso: "2026-01-25",
    category: "Technology Strategy",
    kind: "article",
    description:
      "CTO is one of the most overloaded titles in modern companies. Two people can hold the same title and solve entirely different problems.",
    body: [
      "\"CTO\" can mean founder-builder, scaling operator, external-facing product technologist, or governance lead for regulated markets. Hiring as if the title is one job is how boards get expensive mismatches.",
      "Map the company's binding constraint first. Pre-product-market fit needs someone who can ship and kill features. Post-Series A often needs someone who can build managers, systems, and reliability. Enterprise sales needs someone who can survive security review without melting the roadmap.",
      "I ask boards: what fails if this hire is average? If the answer is \"we miss a demo,\" hire a builder. If the answer is \"we lose a SOC 2 deal\" or \"we cannot integrate an acquisition,\" hire differently.",
      "Resume theater is common. Big-tech logos do not equal startup operating skill. Startup logos do not equal enterprise control maturity. Probe for artifacts: org design, incident history, diligence packs, vendor negotiations they owned.",
      "Equity and title inflation hide role confusion. Two \"CTOs\" and no clear decision rights is worse than one strong VP Engineering with a fractional advisor for board-facing work.",
      "When the wrong face is in the seat, symptoms look technical: thrash, reorgs, architecture rewrites. The root is often a hiring brief that never named the problem.",
      "Write the job as a problem statement with success metrics at 90 days. If you cannot, you are not ready to hire a CTO — you are ready to clarify strategy.",
    ],
  },
  "decision-rights": {
    title: "Why Decision Rights Matter More Than Technology Choices",
    date: "December 15, 2024",
    dateIso: "2024-12-15",
    category: "Engineering Leadership",
    kind: "article",
    description:
      "The most common cause of engineering dysfunction isn't technical debt — it's unclear ownership. Here's how to diagnose and fix it.",
    body: [
      "Teams argue about Kubernetes, ORMs, and cloud vendors because those debates feel concrete. The quieter failure is nobody knowing who can decide. Technology choice becomes a proxy war for missing authority.",
      "Decision rights answer four questions: who proposes, who must be consulted, who decides, who is informed. Skip any one and you get meeting loops, silent vetoes, and rework after \"alignment.\"",
      "In diligence I ask for the last three architectural decisions and the paper trail. If the trail is Slack archaeology, the next acquisition integration will be tribal — and tribal systems do not survive leadership change.",
      "Fixing rights is uncomfortable. It makes power visible. That is the point. Ambiguity protects egos and punishes delivery.",
      "Start with the highest-blast-radius decisions: data model, auth, production access, vendor lock-in, and what enters the critical path. Publish owners. Revisit quarterly. Do not invent a 40-page RACI for snack choices.",
      "Engineers will still debate tools. They should. Debate without a decider is not engineering culture — it is stall.",
      "If your org chart has dotted lines everywhere and solid lines nowhere, your technology strategy is already late.",
    ],
  },
  "ai-adoption": {
    title: "AI Adoption in Startups: Strategy Before Tools",
    date: "November 12, 2024",
    dateIso: "2024-11-12",
    category: "AI & Strategy",
    kind: "article",
    description:
      "Before choosing models or platforms, establish clear governance and success criteria. Most AI initiatives fail due to organizational readiness, not technical limitations.",
    body: [
      "Model shopping is the easy part. The hard part is deciding what \"good\" means in a business process, who owns failure modes, and how you will measure lift without fooling yourself with vanity demos.",
      "Start with a narrow workflow where latency, cost, and error tolerance are known. Define human fallback. Instrument before you scale prompts across the company Slack.",
      "Data readiness kills more pilots than model quality. If your CRM is a landfill and your product events are inconsistent, the model will confidently automate the mess.",
      "Governance is not bureaucracy for its own sake. It is how you keep customer data out of the wrong context window and how you explain a bad automated decision to a board.",
      "Vendor lock-in arrives as convenience. Abstraction layers and evaluation harnesses are cheaper early than after every team embeds a different SDK.",
      "Success criteria should be economic: hours saved, conversion lift, defect reduction — not \"employees used ChatGPT.\" If you cannot name the metric, you are funding theater.",
      "Strategy before tools means you can change models without changing the operating system of the company. That is the only AI adoption that compounds.",
    ],
  },
  "founder-cto-transition": {
    title: "The Founder-to-CTO Transition Nobody Talks About",
    date: "October 8, 2024",
    dateIso: "2024-10-08",
    category: "Leadership",
    kind: "article",
    description:
      "Technical founders often struggle to delegate effectively. The path forward requires deliberate role design, not just hiring.",
    body: [
      "Technical founders often stay the best debugger in the building long after that is the wrong use of their time. The identity shift — from builder to multiplier — is the transition nobody schedules.",
      "Hiring a \"strong #2\" without rewriting the founder's calendar fails. The founder still takes every architecture meeting, still merges the scary PRs, still becomes the single point of failure for production judgment.",
      "Role design comes first. What does the founder uniquely own for the next two quarters? What must they stop touching? Write both lists. Share them with the board and the new lead.",
      "Delegation without standards creates chaos. Publish the bars for design review, on-call, and hiring. Then let people fail inside those bars without recentralizing at the first scare.",
      "The emotional work is real. Letting go of code feels like losing craft. The craft moves to system design, talent density, and decision quality — less visible, higher leverage.",
      "Investors should watch for founders who cannot describe what they stopped doing. Growth without transition is how Series B companies still run on Series A operating models.",
      "If you are the founder-CTO, your next promotion is not a title. It is a smaller personal commit count and a stronger organization.",
    ],
  },

  // —— Briefings (gated) ——
  "due-diligence-checklist": {
    title: "Technical Due Diligence Checklist for PE & Growth Equity",
    date: "March 1, 2026",
    dateIso: "2026-03-01",
    category: "Due Diligence",
    kind: "briefing",
    featured: false,
    description:
      "A field checklist for deal partners: what to inspect in architecture, delivery, security, and team — before price is locked.",
    teaser: [
      "Most diligence packs over-index on slides and under-index on operating evidence. This briefing is the inspection list I use when technology risk can move valuation — organized so an operating partner can run a first pass in days, not weeks.",
      "You will get the questions, the artifacts to request, and the failure patterns that show up repeatedly in growth software. Unlock the full checklist with a work email — the same gate we use on the Technical Risk Assessment.",
    ],
    body: [
      "Scope the diligence to the thesis. If the deal thesis is \"expand enterprise,\" weight security, tenancy, and supportability. If the thesis is \"compress COGS,\" weight architecture cost drivers and delivery throughput. A generic checklist without thesis weighting wastes the room.",
      "Architecture: system context diagram less than six months old; data stores and ownership; critical path for revenue; known single points of failure; dependency on key vendors; undocumented \"glue\" owned by one engineer.",
      "Delivery: change failure rate, lead time, deploy frequency, MTTR — with definitions. PR size trends. Hotfix percentage. Whether \"done\" includes observability. How often launches ship behind feature flags vs. hope.",
      "Security & compliance: access model, secrets handling, audit logging, vulnerability management, last penetration test findings and closure rates, SOC 2 / ISO status and exceptions register. Ask for the exceptions — the report cover is marketing.",
      "Team: org chart vs. reality; on-call load; key-person risk; hiring bar; contractor ratio; decision rights for architecture. Interview the people who get paged, not only the people who present.",
      "Data & AI: training data provenance, evaluation harnesses, human fallback, customer data boundaries. If AI features are in the thesis, treat evaluation quality as a diligence item equal to uptime.",
      "Commercial technical risk: professional services dependency, implementation timelines, customer-specific forks, and how much of ARR requires heroic engineering. Forks destroy gross margin quietly.",
      "Red flags that usually matter: no incident history (or only oral history); \"we'll fix after close\"; security owned by an engineer who also owns half the roadmap; metrics that cannot be reproduced from raw systems.",
      "Output of a serious diligence is not a vibe. It is a risk register with severity, likelihood, cost-to-remediate bands, and what must be true before close vs. what can be a 100-day plan.",
      "Use this list to brief your technical advisor. If they cannot map each item to evidence or a clear gap, they are summarizing — not diligencing.",
    ],
  },
  "fedramp-readiness-guide": {
    title: "FedRAMP Readiness Guide for Growth Software",
    date: "March 8, 2026",
    dateIso: "2026-03-08",
    category: "Government Technology",
    kind: "briefing",
    description:
      "What \"FedRAMP ready\" actually means for a commercial SaaS team — boundaries, evidence, and the sequence that avoids burning a year.",
    teaser: [
      "FedRAMP is not a sticker you buy. It is a boundary decision, an evidence system, and a multi-quarter operating change. This guide is written for CEOs and CTOs who sell into federal or defense-adjacent buyers and need a sober readiness path.",
      "The full guide covers authorization paths, environment isolation, continuous monitoring expectations, and the staffing model that survives an assessment. Unlock with a work email.",
    ],
    body: [
      "Decide the commercial case first. Which deals require which impact level? Who is the authorizing path (agency sponsor, 3PAO plan, cloud provider partnership)? Without a named buyer motion, FedRAMP becomes an infinite internal project.",
      "Boundary honesty: what is in the authorization boundary, what is out, and how customer data flows. Diagram it. If you cannot, you are not ready for a 3PAO conversation.",
      "Environment strategy: GovCloud / dedicated partitions, identity separation, and whether commercial and federal share blast radius. Shared-everything architectures fail late and expensively.",
      "Control inheritance vs. customer responsibility: know what your cloud provider covers and what remains yours. Misreading the inheritance matrix is a classic schedule killer.",
      "Evidence is continuous. Policies alone fail. You need tickets, configs, logs, and access reviews that match the system description. Treat continuous monitoring as a product with an owner.",
      "Staffing: security engineering, compliance operations, and engineering managers who will accept slower change in the federal boundary. A single \"GovTech lead\" without authority cannot carry this.",
      "Sequence matters: stabilize identity and logging before hunting exotic controls. Fix privileged access and change management early — assessors start there for a reason.",
      "Budget and timeline: plan in quarters, not sprint demos. Include remediation buffer after the first assessment findings. Boards that expect a six-week FedRAMP will get a six-week fiction.",
      "Adjacent paths (StateRAMP, IL5, agency ATOs) have different shapes. Do not conflate them in the sales deck. Diligence partners will notice.",
      "Readiness means you can show the boundary, the evidence system, and the people who run it — before you pay for the formal assessment theater.",
    ],
  },
  "escaped-defects-briefing": {
    title: "Escaped Defects in the AI Era: A Quality Briefing for CTOs",
    date: "March 15, 2026",
    dateIso: "2026-03-15",
    category: "QA & Quality",
    kind: "briefing",
    description:
      "Why escaped defects rise when AI coding tools land — and the verification posture that keeps release risk bounded.",
    teaser: [
      "When merge volume rises faster than verification capacity, escaped defects are not a mystery — they are arithmetic. This briefing is for CTOs who need a board-ready framing of the problem and a sober set of interventions.",
      "Full content covers leading indicators, ownership models, and when autonomous QA is a fit versus more humans with the same broken process. Unlock with a work email.",
    ],
    body: [
      "Define escaped defect clearly: customer-visible failure that passed your release gate. If your gate is \"someone clicked around,\" your metrics will flatter you until a whale customer files a ticket.",
      "Leading indicators: PR size, revert rate, flaky test quarantine growth, on-call pages per deploy, and the ratio of AI-generated lines to reviewed lines. Track them weekly during AI tool rollout.",
      "Root causes cluster: weak specs, tests that assert mocks not behavior, review theater, and no link from product risk to test priority. AI fills gaps with plausible code; gaps remain gaps.",
      "Interventions that work: executable acceptance criteria, contract tests on boundaries, risk-based regression selection, and a verification budget that scales with merge rate.",
      "Interventions that fail: hiring one more QA person into a process that cannot describe expected behavior; buying a tool without changing definition of done; banning AI without fixing verification.",
      "Ownership: product owns behavior intent; engineering owns prevention; QA owns detection strategy. When all three collapse into \"engineering will handle it,\" quality becomes optional.",
      "Board framing: show escaped defects and change failure rate beside AI adoption metrics. Velocity without that pairing is a vanity slide.",
      "When to consider autonomous QA: high merge volume, stable-enough interfaces, and a willingness to invest in specs. Autonomous agents amplify whatever specification quality you already have.",
      "When not to: chaotic domain with no written intent, greenfield product still finding itself, or a culture that will ignore failing gates. Automation will not invent accountability.",
      "The goal is not zero defects. It is a known, funded verification posture that matches how fast you ship — including how fast AI lets you ship.",
    ],
  },
};

export const INSIGHT_RECENCY_ORDER = [
  "escaped-defects-briefing",
  "fedramp-readiness-guide",
  "due-diligence-checklist",
  "ai-coding-tools-lying",
  "soc-2-compliance",
  "cto-skill-no",
  "many-faces-cto",
  "fix-after-launch",
  "decision-rights",
  "ai-adoption",
  "founder-cto-transition",
] as const;
