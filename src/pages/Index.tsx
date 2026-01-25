import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";

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
      "Embedded execution leadership with full accountability — temporary co-founder, not contractor.",
    href: "/services",
  },
  {
    title: "CTO Mentor Circle",
    description:
      "A peer-level advisory group for CTOs ready to operate at a higher altitude.",
    href: "/circle",
  },
  {
    title: "Advisory & Audits",
    description:
      "Fixed-scope architecture, AI, and delivery assessments with clear recommendations.",
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
              This is not fractional consulting or part-time advisory. We embed as your temporary co-founder—owning decisions, driving execution, and taking accountability for outcomes that matter.
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
              · <span className="text-heading font-medium">Board-Level Advisor</span>
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
                  Apply to Work Together
                </Button>
              </Link>
              <Link to="/circle">
                <Button variant="outline" size="xl">
                  Join CTO Mentor Circle
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
