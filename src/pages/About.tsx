import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              About
            </h1>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-8">
            <p className="text-lg font-body text-foreground leading-relaxed">
              I've spent my career building and leading technology organizations
              — from early-stage startups to complex enterprise environments. My
              work spans architecture, data, AI, and the organizational systems
              that make technical execution actually work.
            </p>

            <p className="text-lg font-body text-foreground leading-relaxed">
              I hold patents in data lineage and discovery, have led global
              engineering teams, and have worked extensively in regulated
              industries where execution discipline isn't optional.
            </p>

            <p className="text-lg font-body text-foreground leading-relaxed">
              What I've learned: most technology problems are organizational
              problems in disguise. Architecture decisions get made without
              ownership clarity. Roadmaps exist without accountability. Teams
              ship without alignment on what success looks like.
            </p>

            <p className="text-lg font-body text-foreground leading-relaxed">
              My approach is direct. I diagnose what's actually broken, align
              stakeholders around clear priorities, and build systems that hold
              under pressure. I take responsibility for outcomes — not just
              recommendations.
            </p>

            <div className="pt-8 border-t border-divider">
              <h2 className="font-heading text-xl font-semibold text-heading">
                Credentials
              </h2>
              <ul className="mt-4 space-y-2 text-base font-body text-subtle">
                <li>Patents in data lineage & discovery</li>
                <li>Global engineering team leadership</li>
                <li>Regulated industry experience (Healthcare, Finance)</li>
                <li>Board-level advisory roles</li>
                <li>AI adoption strategy & implementation</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-section-gradient border-t border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl font-semibold text-heading">
              Let's discuss your challenges.
            </h2>
            <p className="mt-4 text-lg font-body text-subtle">
              Every engagement starts with a conversation about what's actually
              happening — technically and organizationally.
            </p>
            <div className="mt-8">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Apply to Work Together
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
