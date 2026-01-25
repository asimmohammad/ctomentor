import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const problems = [
  "Decision bottlenecks",
  "Architectural drift",
  "Vendor sprawl",
  "Teams shipping without accountability",
  "Founders forced to referee instead of lead",
];

const services = [
  {
    title: "Operator-in-Residence / Equity CTO",
    description:
      "Embedded execution leadership with full accountability — operating executive with equity alignment.",
    href: "/services",
  },
  {
    title: "CTO Mentor Circle",
    description:
      "A peer-level operating group for CTOs ready to lead with authority and execution discipline.",
    href: "/circle",
  },
  {
    title: "Technical Assessments & Execution Plans",
    description:
      "Fixed-scope architecture, AI, and delivery assessments with clear execution roadmaps and ownership.",
    href: "/services",
  },
];

const process = [
  {
    step: "01",
    title: "Diagnose",
    description: "Identify what's broken — technically and organizationally.",
  },
  {
    step: "02",
    title: "Align",
    description: "Clarify ownership, priorities, and decision rights.",
  },
  {
    step: "03",
    title: "Execute",
    description: "Fix architecture, delivery, and team structure.",
  },
  {
    step: "04",
    title: "Scale",
    description: "Build systems that hold under growth.",
  },
];

const results = [
  "Reduced cloud spend by 38% while increasing delivery velocity",
  "Rebuilt fractured vendor ecosystems into single accountable platforms",
  "Enabled AI-driven workflows in regulated environments",
  "Helped founders reclaim focus from day-to-day tech firefighting",
];

export default function Index() {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-heading leading-tight animate-fade-in-up">
              Operator-in-Residence: Own the CTO function. Execute with accountability.
            </h1>
            <p className="mt-6 text-lg md:text-xl font-body text-subtle leading-relaxed max-w-2xl animate-fade-in-up animation-delay-100">
              We embed as your temporary co-founder—owning decisions, driving execution, and taking accountability for outcomes that matter.
            </p>
            <p className="mt-4 text-base font-body text-subtle leading-relaxed max-w-2xl animate-fade-in-up animation-delay-100">
              For founder-led companies where technology execution is critical and the cost of getting it wrong is high.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-200">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Apply for an Operator-in-Residence Engagement
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  See How This Is Different
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Credibility Strip */}
      <section className="border-b border-divider bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-sm font-body text-subtle">
            <p>
              <span className="text-heading font-medium">Operator-in-Residence</span> ·{" "}
              <span className="text-heading font-medium">
                Data & AI Specialist
              </span>{" "}
              · <span className="text-heading font-medium">Board-Level Operator</span>
            </p>
            <p className="text-xs md:text-sm">
              Patents in data lineage & discovery · Global teams · Regulated
              industries
            </p>
          </div>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading">
              Most technology problems aren't technical.
            </h2>
            <p className="mt-6 text-lg font-body text-subtle">
              They're caused by:
            </p>
            <ul className="mt-6 space-y-3">
              {problems.map((problem) => (
                <li
                  key={problem}
                  className="flex items-start gap-3 text-base font-body text-foreground"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2.5 flex-shrink-0" />
                  {problem}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg font-body text-heading font-medium">
              The result: missed timelines, rising costs, and growing execution
              risk.
            </p>
          </div>
        </div>
      </section>

      {/* What I Do Section */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading max-w-2xl">
            We bring structure, ownership, and execution discipline.
          </h2>
          <div className="mt-12 grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="group bg-card p-8 border border-divider hover:border-accent/30 transition-colors"
              >
                <h3 className="font-heading text-xl font-semibold text-heading">
                  {service.title}
                </h3>
                <p className="mt-4 text-base font-body text-subtle leading-relaxed">
                  {service.description}
                </p>
                <Link
                  to={service.href}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-body font-medium text-heading group-hover:text-accent transition-colors"
                >
                  Learn more
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-4">
            Leadership Model Comparison
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            How The CTO Mentor's Operator-in-Residence / Equity CTO model differs from other leadership options.
          </p>

          {/* Responsive table wrapper - horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-6 lg:mx-0">
            <div className="inline-block min-w-full align-middle px-6 lg:px-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-divider">
                    <TableHead className="font-heading font-semibold text-heading min-w-[180px]">Dimension</TableHead>
                    <TableHead className="font-heading font-semibold text-heading min-w-[160px]">Full-Time CTO</TableHead>
                    <TableHead className="font-heading font-semibold text-heading min-w-[160px]">Fractional CTO</TableHead>
                    <TableHead className="font-heading font-semibold text-heading min-w-[140px]">COO</TableHead>
                    <TableHead className="font-heading font-semibold text-heading min-w-[200px]">Traditional Operator-in-Residence</TableHead>
                    <TableHead className="font-heading font-semibold text-heading min-w-[220px] bg-accent/10">The CTO Mentor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Primary Mandate</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Own entire technology function permanently</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Provide part-time technical leadership across multiple clients</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Operational excellence across all functions</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Embedded execution in one company, typically operations-focused</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Embedded execution leadership for technology function with full accountability</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Execution Authority</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Full authority within technology organization</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Limited by time allocation and split focus across clients</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Broad operational authority, but technical decisions are secondary</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Significant authority in assigned domain</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Full authority for technology decisions, architecture, and execution</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Accountability</TableCell>
                    <TableCell className="font-body text-foreground text-sm">High, but can become entrenched or misaligned over time</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Low—can attribute failures to time constraints or other client priorities</TableCell>
                    <TableCell className="font-body text-foreground text-sm">High for operations, but technology accountability is indirect</TableCell>
                    <TableCell className="font-body text-foreground text-sm">High within assigned domain, but scope may be narrow</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Full accountability for technology outcomes—complete ownership, dedicated focus</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Incentive Alignment</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Salary + equity, but may prioritize job security over bold moves</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Hourly/retainer fees, no equity—incentive to bill hours, not create value</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Salary + equity, but technology is not primary focus</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Equity participation, but may lack technical depth</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Cash + meaningful equity—aligned with long-term value creation and outcomes</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Relationship to CEO</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Direct report, permanent employee relationship</TableCell>
                    <TableCell className="font-body text-foreground text-sm">External consultant, part-time advisor relationship</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Strategic partner, operations-focused</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Embedded partner, typically operations or product-focused</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Operating executive—CEO-level partnership with execution authority</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Technical Depth</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Deep technical expertise, but may lack fresh perspective or breadth</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Variable—often surface-level due to split attention across clients</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Limited—operations-focused, not technical</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Variable—may have technical background but not primary mandate</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Deep technical expertise with fresh perspective and cross-industry insight</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Engagement Trigger</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Long-term hiring need, permanent role</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Need for senior technical input without full-time commitment</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Need for operational discipline and scaling support</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Need for embedded execution in specific domain (often operations/product)</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Technology execution is critical, stakes are high, and cost of failure is unacceptable</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Risk Ownership</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Shares risk with company as employee, but may avoid bold moves</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Minimal risk—consultant relationship with limited liability</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Operational risk ownership, but technical risk is secondary</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Risk ownership within assigned domain</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Full risk ownership for technology outcomes—skin in the game through equity</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Typical Failure Mode</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Becomes bottleneck, loses technical edge, or misaligns with business priorities</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Spread too thin, lacks deep context, no real ownership or accountability</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Overlooks technical debt, doesn't understand technical tradeoffs, treats tech as cost center</TableCell>
                    <TableCell className="font-body text-foreground text-sm">May lack technical depth or authority, scope too narrow, or misaligned with technology needs</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">N/A—engagement structure prevents common failure modes through accountability and equity alignment</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">Value Creation Profile</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Long-term compounder if aligned, but can stagnate or become bottleneck</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Incremental improvements, not transformational—limited by time and split focus</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Operational efficiency gains, but may miss technical opportunities</TableCell>
                    <TableCell className="font-body text-foreground text-sm">Focused value creation in assigned domain, but may miss broader technical needs</TableCell>
                    <TableCell className="font-body text-foreground text-sm font-medium bg-accent/5">Transformational value creation through embedded execution, equity alignment, and full accountability</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Interpretation */}
          <div className="mt-12 max-w-4xl">
            <div className="bg-card border border-divider rounded-lg p-8">
              <p className="text-base font-body text-foreground leading-relaxed mb-4">
                The CTO Mentor's Operator-in-Residence / Equity CTO model sits in a unique category: it combines the execution authority and accountability of a full-time CTO with the fresh perspective and flexibility of an embedded partner, delivering the focus and equity alignment that fractional consulting lacks and the technical depth that traditional operators often miss.
              </p>
              <p className="text-base font-body text-foreground leading-relaxed">
                We own technology outcomes directly—with the embedded execution of an operating executive and the equity alignment that ensures long-term value creation. The result is an operating executive who takes full responsibility for technology execution when the stakes are high and the cost of getting it wrong is unacceptable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading">
            A simple, disciplined approach.
          </h2>
          <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item) => (
              <div key={item.step} className="relative">
                <span className="font-body text-xs font-semibold text-accent tracking-wider">
                  {item.step}
                </span>
                <h3 className="mt-2 font-heading text-xl font-semibold text-heading">
                  {item.title}
                </h3>
                <p className="mt-3 text-base font-body text-subtle leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Proof Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white">
            Results that compound.
          </h2>
          <ul className="mt-10 space-y-4 max-w-2xl">
            {results.map((result) => (
              <li
                key={result}
                className="flex items-start gap-4 text-base font-body text-primary-foreground/90"
              >
                <CheckCircle
                  size={20}
                  className="text-accent flex-shrink-0 mt-0.5"
                />
                {result}
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <Link to="/case-studies">
              <Button
                variant="outline"
                size="lg"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                View Case Studies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading">
              If technology is becoming a liability, it's time to change that.
            </h2>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Apply for an Operator-in-Residence Engagement
                </Button>
              </Link>
              <Link to="/services">
                <Button variant="outline" size="xl">
                  See How This Is Different
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
