import { Layout } from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Article content mapping
const articles: Record<string, {
  title: string;
  date: string;
  category: string;
  content: React.ReactNode;
}> = {
  "many-faces-cto": {
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    date: "January 25, 2026",
    category: "Leadership",
    content: (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg font-body text-foreground leading-relaxed mb-6">
          "CTO" is one of the most overloaded titles in modern companies.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          Two people can hold the same title and be solving entirely different problems. One may be writing production code daily. Another may not touch a codebase at all, yet still be indispensable to the company's success.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          When founders misunderstand this distinction, they don't just hire the wrong CTO—they design the wrong expectations, incentives, and operating model for their business.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Below are the most common types of Chief Technology Officers, what each one is optimized for, and why many startups eventually outgrow the traditional CTO model altogether.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          1. The Founding CTO (The Builder)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Founding CTO is the architect and early builder of the product. This role thrives in ambiguity, speed, and invention. They are deeply hands-on, often writing large portions of the initial codebase, making rapid technical decisions, and turning ideas into working software as quickly as possible. Their strength lies in execution under uncertainty—choosing tools, building MVPs, and shipping before the market window closes.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          However, Founding CTOs are often optimized for creation, not scale. As the company grows, the same instincts that enabled early success—speed, shortcuts, improvisation—can become liabilities unless the role evolves.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          2. The Scaling CTO (The Systems Thinker)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Scaling CTO enters when the product works and the business begins to grow. Their primary focus is building systems that can support more users, more engineers, and more complexity without breaking. They institutionalize engineering practices, introduce structure, and reduce fragility in the platform.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          This CTO cares deeply about reliability, maintainability, and long-term leverage. They often spend less time coding and more time designing organizations, processes, and architectures. Scaling CTOs are essential for companies moving from "startup chaos" to operational discipline—but they are often ineffective in zero-to-one environments where speed matters more than stability.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          3. The Enterprise / Transformation CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          This CTO typically operates in mature or regulated environments. Their mandate is not to invent new products, but to modernize legacy systems, manage risk, and align technology with large organizational goals. They work closely with compliance, security, and finance teams, and are fluent in vendor management, governance, and long planning cycles.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Transformation CTOs excel at navigating complexity at scale—but they can struggle in startups that require constant experimentation and rapid iteration. Their value is highest when stability, predictability, and risk mitigation matter more than speed.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          4. The Product CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Product CTO sits at the intersection of technology, user experience, and business outcomes. They are obsessed with what gets built and why, not just how. This role is common in product-led companies where engineering is the primary driver of customer value.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Product CTOs work closely with design and product leadership, translating customer needs into technical strategy. Their risk is over-optimization for features at the expense of foundational health. When unchecked, product velocity can outpace system integrity.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          5. The Infrastructure / Platform CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          This CTO focuses almost entirely on the underlying platform: cloud infrastructure, reliability, performance, and cost efficiency. They are experts in scale, resilience, and operational excellence. In some organizations, this role exists alongside a Product CTO.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Platform CTOs are invaluable once infrastructure becomes a competitive advantage—or a serious liability. However, in early startups, this role can feel abstract or premature unless infrastructure is core to the product itself.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          6. The Fractional CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Fractional CTO provides senior technology leadership on a part-time basis. This model is popular with early-stage companies that need experience but cannot justify or afford a full-time executive. Fractional CTOs often focus on stabilization, roadmap clarity, hiring decisions, and short-term execution.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          While effective in many scenarios, the limitation is structural: fractionals typically advise more than they operate. They influence decisions, but rarely own outcomes end-to-end. For some companies, this is sufficient. For others, it creates a leadership gap between strategy and execution.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          7. The Operator-in-Residence (The Evolution)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Operator-in-Residence is not just a CTO—it is an operating executive embedded directly into the business with ownership, accountability, and authority. This role blends the strategic depth of a senior CTO with the hands-on execution of an operator.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Unlike a fractional advisor, an Operator-in-Residence drives outcomes: stabilizing teams, fixing delivery breakdowns, aligning engineering with revenue, and making hard trade-offs in real time. Unlike a traditional CTO hire, this role is often temporary, equity-aligned, and focused on transformation rather than permanence.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          For many startups, especially those navigating inflection points, the Operator-in-Residence is the fastest way to move from chaos to clarity without making a premature long-term hire.
        </p>

        <div className="mt-12 pt-8 border-t border-divider">
          <h3 className="font-heading text-xl font-semibold text-heading mb-4">
            The question is not "Do we need a CTO?"
          </h3>
          <p className="text-lg font-body text-foreground leading-relaxed mb-4 font-medium">
            The real question is:
          </p>
          <p className="text-lg font-body text-foreground leading-relaxed mb-6 font-medium">
            What kind of technology leadership does our company need right now?
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            The most common mistake startups make with technology leadership is not a lack of talent, but a mismatch of intent. A title is chosen, expectations are assumed, and the business quietly evolves in a different direction. The result is frustration on all sides—founders wondering why progress has slowed, CTOs feeling misaligned or overwhelmed, and teams caught in between.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed">
            The companies that scale successfully treat CTO roles as contextual, not static. They recognize that different phases demand different forms of leadership, and they choose accordingly. Getting this right is rarely about finding a "better" CTO—it's about choosing the right one for the moment the business is actually in.
          </p>
        </div>
      </div>
    ),
  },
  "fix-after-launch": {
    title: "Why \"We'll Fix It After Launch\" Is How Startups Die",
    date: "January 11, 2026",
    category: "Leadership",
    content: (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg font-body text-foreground leading-relaxed mb-6">
          Nearly every startup, at some point, makes a quiet promise to itself.
        </p>
        <p className="text-lg font-body text-foreground leading-relaxed mb-6">
          The promise usually sounds reasonable, even responsible:
        </p>
        <p className="text-xl font-body text-foreground leading-relaxed mb-8 font-medium">
          We'll fix it after launch.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          It's spoken in moments of urgency—when timelines are tight, resources are limited, and momentum feels fragile. The product isn't perfect, but it's "good enough." The architecture is a bit messy, but it works. The team knows there are corners being cut, but everyone believes there will be time to clean things up once the pressure eases.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          What makes this promise dangerous isn't that it's dishonest. It's that it's based on a future that almost never exists.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          The Myth of "After"
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Startups often imagine launch as a finish line—a moment when chaos subsides and clarity returns. In reality, launch is not an ending. It is a transformation.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Before launch, the primary pressure is internal: building something that works. After launch, pressure multiplies and becomes external. Customers now depend on the product. Sales commitments introduce urgency. Support requests arrive immediately. Investors start watching metrics instead of demos. Every decision suddenly carries consequences beyond the team.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The idea that there will be spare time to revisit foundational decisions after launch misunderstands what launch actually does. It doesn't relieve pressure—it formalizes it. It converts potential problems into contractual obligations.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          "After launch" is not a quieter phase. It is a more constrained one.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          What "We'll Fix It Later" Really Signals
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          When leaders say they'll fix something later, they are rarely making a purely technical choice. More often, they are making a psychological one.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          It is a way of postponing discomfort. Of avoiding trade-offs that feel politically difficult or emotionally costly in the moment. It allows teams to move forward without confronting hard questions about scope, ownership, and long-term consequences.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          In small doses, this can be rational. Speed matters. Markets move. Not every decision needs to be perfect.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The problem emerges when "later" becomes a strategy rather than an exception.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          At that point, shortcuts stop being tools and start becoming structural features of the company. Decisions made under pressure harden into systems that define how the organization operates. What was once temporary becomes invisible—and therefore untouchable.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          Why Early Speed So Often Becomes Later Paralysis
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The most insidious impact of a rushed launch is not that systems break. It's that people change their behavior around them.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          As complexity accumulates, engineers grow cautious. They slow down not because they lack skill, but because every change feels risky. Product teams stop trusting timelines because past estimates were based on optimism rather than reality. Leadership becomes frustrated, sensing that the company is busy but not advancing.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The organization enters a subtle but dangerous phase: high activity, low progress.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          At this stage, teams often respond by pushing harder. More urgency. More hires. More pressure to deliver. Yet none of this addresses the underlying issue—the system itself has become fragile.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          What looked like speed early on was actually deferred complexity. And now the bill is due.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          The CTO's Silent Trade-Off
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          CTOs often see this coming before anyone else. They understand the implications of certain shortcuts. They know which decisions will be expensive to reverse and which will quietly limit the company's future.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          But many CTOs operate with constrained authority, especially in early-stage companies. They are caught between founder urgency, investor expectations, and the desire to be seen as enablers rather than blockers.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          So compromises are made. Not because the risks are misunderstood, but because they feel unavoidable.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Once the product is live, however, those compromises become entrenched. The cost of revisiting them grows exponentially, while the organization's tolerance for disruption shrinks. The moment when change was easiest has passed.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          What Mature Organizations Understand
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          More experienced teams do not reject speed. They simply treat it differently.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          They recognize that every shortcut is a form of leverage—and that leverage must be priced. They make trade-offs explicit rather than implicit. They assign ownership not just for building features, but for maintaining and evolving the systems beneath them.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Most importantly, they resist the comforting fiction of "later." Instead, they ask harder questions in the moment: What will this decision make harder in six months? What options does it remove? Who will bear the cost when it comes due?
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          This doesn't eliminate risk. It makes it visible.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          The Question That Actually Matters
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Founders often ask whether they can afford to slow down.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4 font-medium">
          The more important question is whether they can afford to lock in decisions they don't yet understand.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Because startups rarely fail at launch. They fail after—when early optimism gives way to operational drag, when trust erodes between teams, and when the product can no longer support the ambition that created it.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          By then, the company isn't short on ideas or effort. It's short on room to maneuver.
        </p>

        <div className="mt-12 pt-8 border-t border-divider">
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            "We'll fix it after launch" is not a plan. It's a hope.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            And hope, while powerful, is not a substitute for deliberate decision-making.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Launch is the moment when choices become permanent, when systems solidify, and when the future becomes more constrained, not less. Treating it as a temporary phase misunderstands its role entirely.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4 font-medium">
            Speed achieved by ignoring consequences is not speed—it is borrowed time.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed">
            And most startups that make this bargain discover, too late, that the interest rate is unforgiving.
          </p>
        </div>
      </div>
    ),
  },
  "decision-rights": {
    title: "Why Decision Rights Matter More Than Technology Choices",
    date: "December 2024",
    category: "Leadership",
    content: (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg font-body text-foreground leading-relaxed mb-6">
          The most common cause of engineering dysfunction isn't technical debt — it's unclear ownership.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          When engineering organizations struggle, the instinctive diagnosis is almost always technical.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The codebase is messy.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The architecture is outdated.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The tooling choices were wrong.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          There's too much technical debt.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          These explanations feel concrete and actionable. You can refactor code. You can rewrite systems. You can migrate stacks.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          But in my experience, these are rarely the root cause.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          The most common cause of engineering dysfunction is not what technology was chosen — it's who has the right to decide.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          Technology Problems Are Usually Management Problems in Disguise
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Engineering systems reflect the organizations that build them.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          When ownership is clear, even imperfect technology can move forward. Teams know who decides, how trade-offs are made, and what success looks like.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          When ownership is unclear, even "best-in-class" technology degrades into chaos.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          You see the symptoms quickly:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-base font-body text-foreground">
          <li>Decisions get revisited repeatedly</li>
          <li>Roadmaps change without explanation</li>
          <li>Engineers hedge instead of committing</li>
          <li>Meetings replace progress</li>
          <li>Everyone is involved, but no one is accountable</li>
        </ul>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          From the outside, this looks like a technical slowdown.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          From the inside, it feels like paralysis.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          The Hidden Cost of Ambiguous Decision Rights
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Unclear decision rights create a subtle but destructive dynamic.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Engineers begin optimizing for safety instead of outcomes. Product managers push for features without understanding system constraints. CTOs spend more time mediating than leading. Founders step into technical debates they shouldn't have to referee.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Every decision becomes a negotiation.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Every change requires consensus.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Every disagreement slows delivery.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Velocity doesn't disappear overnight — it erodes quietly, sprint by sprint.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          And because no one can point to a single "bad decision," the organization assumes the problem must be technical.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          It isn't.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          What Decision Rights Actually Are (And Aren't)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Decision rights are not about hierarchy or control.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          They are about clarity.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          They answer questions like:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-base font-body text-foreground">
          <li>Who decides when speed outweighs stability?</li>
          <li>Who owns architectural trade-offs?</li>
          <li>Who can say "no" when everything feels urgent?</li>
          <li>Who is accountable when a decision creates downstream consequences?</li>
        </ul>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          In healthy organizations, these answers are explicit — even if they aren't written down.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          In dysfunctional ones, they are implied, assumed, or constantly renegotiated.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          That's when systems start to break.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          How Engineering Teams Behave When Ownership Is Unclear
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          When decision rights are fuzzy, engineers adapt — but not in ways leadership expects.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          They:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-base font-body text-foreground">
          <li>Avoid making irreversible changes</li>
          <li>Defer decisions upward unnecessarily</li>
          <li>Over-document to protect themselves</li>
          <li>Slow down releases to reduce risk</li>
          <li>Build workaround upon workaround</li>
        </ul>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          From a distance, it looks like overengineering or lack of urgency.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          In reality, it's rational behavior in an unsafe system.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          People move fastest when they know who owns the call — and what happens after the call is made.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          Diagnosing the Real Problem
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          If you're a founder or CEO, ask yourself these questions:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-base font-body text-foreground">
          <li>When engineering and product disagree, who breaks the tie?</li>
          <li>Can engineers explain why certain trade-offs were made?</li>
          <li>Do decisions survive leadership meetings — or get reopened?</li>
          <li>Is accountability clear when outcomes miss expectations?</li>
        </ul>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          If the answers are vague, inconsistent, or political, you don't have a technology problem.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          You have a decision-rights problem.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          Why Rewrites and New Tools Rarely Fix This
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          This is why companies repeatedly invest in:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-base font-body text-foreground">
          <li>New architectures</li>
          <li>New frameworks</li>
          <li>New processes</li>
          <li>New hires</li>
        </ul>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          …and see little improvement.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Without clear ownership, new technology simply inherits old dysfunction.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The stack changes.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          The behavior doesn't.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8 font-medium">
          Until decision rights are clarified, every technical improvement is temporary.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          What High-Functioning Teams Do Differently
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Strong engineering organizations don't avoid disagreement.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          They resolve it decisively.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          They:
        </p>
        <ul className="list-disc list-inside space-y-2 mb-6 text-base font-body text-foreground">
          <li>Make ownership explicit</li>
          <li>Define who decides under which conditions</li>
          <li>Protect decision-makers from constant reversal</li>
          <li>Hold people accountable for outcomes, not activity</li>
        </ul>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          This creates trust.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          Engineers move faster because they know the rules. Product teams plan better because decisions stick. Leadership spends less time in the weeds and more time steering the company.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Technology becomes an enabler again — not a scapegoat.
        </p>

        <div className="mt-12 pt-8 border-t border-divider">
          <h3 className="font-heading text-xl font-semibold text-heading mb-4">
            The Real Leverage Point
          </h3>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            If you want to fix engineering dysfunction, don't start with the codebase.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Start with clarity.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Clarify who owns decisions.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Clarify what authority comes with each role.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Clarify how disagreements get resolved.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Only then does it make sense to talk about architecture, tooling, or refactoring.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4 font-medium">
            Because the truth is simple:
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            Great technology choices can't save unclear ownership.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed font-medium">
            But clear decision rights can save almost any technology stack.
          </p>
        </div>
      </div>
    ),
  },
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <Layout>
        <section className="bg-background">
          <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl font-semibold text-heading mb-4">
                Article Not Found
              </h1>
              <p className="text-base font-body text-foreground mb-6">
                The article you're looking for doesn't exist.
              </p>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-body font-medium text-heading hover:text-accent transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Articles
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-subtle hover:text-heading transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Articles
            </Link>
            <div className="flex items-center gap-4 text-sm font-body text-subtle mb-6">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-divider" />
              <span>{article.category}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {article.content}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to find the right technology leadership for your company?
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              If technology execution is critical and the stakes are high, let's discuss whether an Operator-in-Residence engagement is the right model for your situation.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Apply for an Operator-in-Residence Engagement
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
