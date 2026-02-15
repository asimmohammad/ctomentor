import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

const expertiseTags = [
  "AWS Architecture",
  "SOC 2 / FedRAMP",
  "GovCloud / IL5",
  "Technical Due Diligence",
  "Engineering Team Scaling",
  "Security Architecture",
];

export default function About() {
  return (
    <Layout>
      <PageMeta
        title="About | The CTO Mentor"
        description="Meet the CTO behind The CTO Mentor — currently leading technology for a SOC 2 certified SaaS platform with active FedRAMP and DoD market experience."
      />

      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-xl bg-card border border-divider flex items-center justify-center text-subtle font-body text-sm">
                Professional headshot placeholder
              </div>
            </div>
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
                Asim Mohammad
              </h1>
              <p className="mt-2 text-lg font-body text-subtle">
                CTO · The CTO Mentor
              </p>
              <p className="mt-6 text-base font-body text-foreground leading-relaxed">
                I'm currently CTO for a loyalty-as-a-service platform — a SOC 2 Type II certified SaaS product. I lead our AWS GovCloud migration and FedRAMP readiness initiatives, and I have hands-on experience with IL5 authorization and ICAM integration for DoD markets. I'm also involved in technology due diligence for M&A transactions, so I understand what investors and acquirers need when they evaluate technology companies.
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {expertiseTags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="font-body">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/apply">
                  <Button variant="primary" size="lg">
                    Book a Call
                  </Button>
                </Link>
                <a
                  href="https://www.linkedin.com/in/asimmohammad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex"
                >
                  <Button variant="outline" size="lg">
                    LinkedIn
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bio narrative */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-heading text-2xl font-semibold text-heading">
              My view on technology leadership
            </h2>
            <p className="text-base font-body text-foreground leading-relaxed">
              Technology should be a competitive advantage, not a cost center. Too many companies treat it as the latter — and end up with brittle systems, unclear ownership, and boards that don't get straight answers. I believe in hands-on, outcome-focused leadership: clear architecture decisions, accountable teams, and technical strategy that ties directly to business results.
            </p>
            <p className="text-base font-body text-foreground leading-relaxed">
              My advisory approach is practical, not theoretical. I've been in the seat during SOC 2 audits, GovCloud migrations, and M&A due diligence. I don't just advise — I've built and run the systems that pass these bar. That's why I can help founders, PE/VC firms, and GovTech companies make decisions that hold up under scrutiny.
            </p>
            <p className="text-base font-body text-foreground leading-relaxed">
              I'm also involved in my community as a board member for nonprofit organizations. Giving back to the next generation of technical leaders matters to me.
            </p>
          </div>
        </div>
      </section>

      {/* The Bench */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-semibold text-heading mb-6">
              The Bench
            </h2>
            <p className="text-base font-body text-foreground leading-relaxed">
              For engagements that require additional expertise or capacity, I bring in trusted senior technology leaders from my vetted network. These are experienced CTOs and operators who share the same standards for execution and accountability. I don't list them by name here — when we scope an engagement that needs the bench, we'll discuss fit and introduce the right people. The model is simple: you get the right level of leadership without the overhead of a full-time hire, and I ensure quality and consistency.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              Let's talk
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              Whether you need advisory, embedded leadership, or technical due diligence — the first step is a conversation.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book a Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
