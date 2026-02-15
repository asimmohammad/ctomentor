import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const deliverables = [
  "Pre-acquisition technical due diligence (architecture, security, scalability, team assessment)",
  "Post-acquisition technology leadership for portfolio companies",
  "CTO search support and interim technology leadership during transitions",
  "Technology value creation roadmaps for portfolio companies",
];

export default function Investors() {
  return (
    <Layout>
      <PageMeta
        title="Technology Due Diligence for PE & VC Firms | The CTO Mentor"
        description="Independent pre-acquisition technical assessments and portfolio company CTO support. Protect your investment with expert technology due diligence."
      />

      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Protect Your Investment. Maximize Portfolio Value.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              Independent technical due diligence and strategic CTO support for PE/VC firms evaluating and managing technology companies.
            </p>
            <div className="mt-10">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Schedule a Confidential Discussion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              The Problem
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Most PE/VC firms lack deep technical expertise to evaluate acquisition targets. They rely on the target company's own team to assess technology risk — a clear conflict of interest. That leaves you exposed to hidden technical debt, security gaps, scalability limits, and team capability issues that only surface after the deal closes.
            </p>
          </div>
        </div>
      </section>

      {/* What I Deliver */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-8">
            What I Deliver
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {deliverables.map((item) => (
              <li key={item} className="flex items-start gap-4 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Me */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Why Me
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              I'm currently serving as CTO for a platform undergoing active M&A due diligence — I understand both sides of the table. My environment is SOC 2 Type II certified. I have hands-on experience with AWS GovCloud and FedRAMP. That means I can assess technology risk, team capability, and integration complexity with the same lens your target's next CTO would use.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed">
              I don't just review slides. I review architecture, code quality, security posture, and organizational health. You get an executive-ready report with a risk matrix, recommendations, and effort estimates — so you can make informed investment decisions.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Engagement Model
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Fixed-fee due diligence engagements ($15,000–$25,000 depending on scope) with optional ongoing advisory retainer for portfolio support. Scope and deliverables are defined upfront. No hourly surprises.
            </p>
            <div className="mt-10">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Schedule a Confidential Discussion
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
