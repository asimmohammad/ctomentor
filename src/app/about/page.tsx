import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/layout/Section";
import asimHeadshot from "@/assets/AsimMohammad.jpg";

export const metadata: Metadata = {
  title: "About Asim Mohammad | The CTO Mentor",
  description:
    "Asim Mohammad is an active CTO with 25+ years leading technology for scaling organizations. Patent holder. SOC 2, FedRAMP, and IL5 certified platform experience.",
  alternates: { canonical: "https://thectomentor.com/about" },
};

const expertiseTags = [
  "Technology & Transformation",
  "AWS Architecture",
  "SOC 2 / FedRAMP",
  "GovCloud / IL5",
  "Technical Due Diligence",
  "Data Strategy & Engineering",
  "Security Architecture",
  "Venture Investing",
  "Board Advisory",
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section spacing="generous" tone="alt">
        <div className="max-w-4xl flex flex-col md:flex-row md:items-start gap-10">
          <div className="flex-shrink-0">
            <img
              src={asimHeadshot.src}
              alt="Asim Mohammad"
              className="w-48 h-48 object-cover border border-border"
            />
          </div>
          <div className="flex-1">
            <h1 className="font-display text-h1 text-ink">
              Asim Mohammad
            </h1>
            <p className="mt-2 text-lead font-text text-ink-muted">
              Executive · Technology and Transformation · Innovation · Venture Investor · Board Advisor
            </p>
            <p className="mt-2 text-small font-text text-ink-muted">Product & Technology Leader · Chicago, IL</p>
            <p className="mt-6 text-body font-text text-ink">
              I am a CTO with a track record of stepping into complex, technology-led organizations to strengthen
              execution, align leadership, and accelerate outcomes. I work at critical inflection points where
              companies need focused operational leadership to move from potential to performance.
            </p>
            <p className="mt-4 text-body font-text text-ink">
              My experience spans global team leadership, multi-tenant SaaS platforms, and data- and AI-driven systems.
              I bridge strategy and execution, bringing clarity, structure, and momentum to organizations preparing for
              scale, investment, or long-term growth.
            </p>
            <p className="mt-4 text-body font-text text-ink">
              I've spent <strong>25+ years</strong> in technology and transformation across banking, retail, data
              platforms, and SaaS — from global financial institutions and major advisory firms to high-growth data and
              SaaS companies. I'm also an investor and advisor to startups, and a board member for nonprofit
              organizations.
            </p>
            <div className="mt-8 flex flex-wrap gap-2">
              {expertiseTags.map((tag) => (
                <Badge key={tag} variant="secondary" className="font-text">
                  {tag}
                </Badge>
              ))}
            </div>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link href="/assessment">
                <Button variant="primary" size="lg">
                  Take the Technical Risk Assessment
                </Button>
              </Link>
              <a
                href="https://www.linkedin.com/in/asimmohammad1/"
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
      </Section>

      {/* Background */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl space-y-6">
          <h2 className="font-display text-h2 text-ink">Background</h2>
          <p className="text-body font-text text-ink">
            I've led data strategy, product, and technology at scale: Head of Data Strategy at a global advisory firm,
            VP of Customer Success at a data-integration SaaS company, CIO at a fintech, and SVP of Data & Analytics and
            Information Architecture at a major financial institution. I've built and run teams and driven large-scale
            transformation in regulated and high-growth environments.
          </p>
          <p className="text-body font-text text-ink">
            I hold an <strong>MBA from Duke University (Fuqua)</strong> with dual concentrations in Finance and Health
            Sector Management. I've designed patented technology for data governance, lineage, and real-time analytics —
            and I care about technology as a competitive advantage, not a cost center.
          </p>
          <p className="text-body font-text text-ink">
            As an investor and advisor to startups since 2017, and as a board member for nonprofit organizations, I stay
            close to both the operator and the advisor side. The CTO Mentor is where I help founders and leadership
            teams get technology strategy, scaling, and compliance right — with practical, outcome-focused guidance.
          </p>
        </div>
      </Section>

      {/* View on technology leadership */}
      <Section spacing="standard" tone="alt" className="border-y border-border">
        <div className="max-w-3xl space-y-6">
          <h2 className="font-display text-h2 text-ink">My view on technology leadership</h2>
          <p className="text-body font-text text-ink">
            Technology should be a competitive advantage, not a cost center. I believe in hands-on, outcome-focused
            leadership: clear architecture decisions, accountable teams, and technical strategy that ties directly to
            business results. My advisory approach is practical — I've been in the seat during SOC 2 audits, GovCloud
            migrations, and M&A due diligence, so I help founders, PE/VC firms, and GovTech companies make decisions
            that hold up under scrutiny.
          </p>
        </div>
      </Section>

      {/* The Bench */}
      <Section spacing="standard" tone="paper">
        <div className="max-w-3xl">
          <h2 className="font-display text-h2 text-ink mb-6">The Bench</h2>
          <p className="text-body font-text text-ink">
            For engagements that require additional expertise or capacity, I bring in trusted senior technology leaders
            from my vetted network. These are experienced CTOs and operators who share the same standards for execution
            and accountability. When we scope an engagement that needs the bench, we discuss fit and introduce the right
            people — so you get the right level of leadership without the overhead of a full-time hire.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <Section spacing="standard" tone="dark">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-ink-inverse mb-6">Let's talk</h2>
          <p className="text-lead font-text text-ink-inverse/90 mb-10">
            Whether you need advisory, embedded leadership, or technical due diligence — the first step is a
            conversation.
          </p>
          <Link href="/assessment">
            <Button
              variant="outline"
              size="xl"
              className="border-ink-inverse/30 text-ink-inverse hover:bg-ink-inverse hover:text-dark-band"
            >
              Take the Technical Risk Assessment
            </Button>
          </Link>
        </div>
      </Section>
    </>
  );
}

