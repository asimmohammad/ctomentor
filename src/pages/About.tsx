import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";

// To use your LinkedIn headshot: download your profile photo from LinkedIn, save as src/assets/asim-headshot.jpg,
// then uncomment the import below and replace the placeholder div with: <img src={asimHeadshot} alt="Asim Mohammad" className="w-48 h-48 rounded-xl object-cover border border-divider" />
// import asimHeadshot from "@/assets/asim-headshot.jpg";

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

export default function About() {
  return (
    <Layout>
      <PageMeta
        title="About | The CTO Mentor"
        description="Asim Mohammad — Product & Technology Leader at LaaSy, 25+ years in technology and transformation. CTO Mentor, venture investor, board advisor."
      />

      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl flex flex-col md:flex-row md:items-start gap-10">
            <div className="flex-shrink-0">
              <div className="w-48 h-48 rounded-xl bg-card border border-divider flex items-center justify-center text-subtle font-body text-sm text-center p-4">
                Your photo
              </div>
            </div>
            <div className="flex-1">
              <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
                Asim Mohammad
              </h1>
              <p className="mt-2 text-lg font-body text-subtle">
                Executive · Technology and Transformation · Innovation · Venture Investor · Board Advisor
              </p>
              <p className="mt-2 text-sm font-body text-subtle">
                Product & Technology Leader at LaaSy · Chicago, IL
              </p>
              <p className="mt-6 text-base font-body text-foreground leading-relaxed">
                I lead product and technology at <strong>LaaSy</strong>, a loyalty-as-a-service platform. We run a SOC 2 Type II certified SaaS product and are actively pursuing AWS GovCloud migration and FedRAMP readiness. I have hands-on experience with IL5 authorization and ICAM integration for DoD markets, and I support technology due diligence for M&A — so I understand what investors and acquirers need when they evaluate technology companies.
              </p>
              <p className="mt-4 text-base font-body text-foreground leading-relaxed">
                I've spent <strong>25+ years</strong> in technology and transformation across banking, retail, data platforms, and SaaS — from Bank of America and Grant Thornton to StreamSets and LaaSy. I'm also an investor and advisor to startups, and a board member at <strong>Muslim Aid USA</strong>.
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
        </div>
      </section>

      {/* Background */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-heading text-2xl font-semibold text-heading">
              Background
            </h2>
            <p className="text-base font-body text-foreground leading-relaxed">
              I've led data strategy, product, and technology at scale: Head of Data Strategy at Grant Thornton, VP of Customer Success at StreamSets, CIO at CommunityForce, and SVP of Data & Analytics and Information Architecture at Bank of America. I've built and run teams, filed patents in data lineage and analytics, and driven large-scale transformation in regulated and high-growth environments.
            </p>
            <p className="text-base font-body text-foreground leading-relaxed">
              I hold an <strong>MBA from Duke University (Fuqua)</strong> with dual concentrations in Finance and Health Sector Management. I've designed patented technology for data governance, lineage, and real-time analytics — and I care about technology as a competitive advantage, not a cost center.
            </p>
            <p className="text-base font-body text-foreground leading-relaxed">
              As an investor and advisor to startups since 2017, and as a board member for Muslim Aid USA, I stay close to both the operator and the advisor side. The CTO Mentor is where I help founders and leadership teams get technology strategy, scaling, and compliance right — with practical, outcome-focused guidance.
            </p>
          </div>
        </div>
      </section>

      {/* My view on technology leadership */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-6">
            <h2 className="font-heading text-2xl font-semibold text-heading">
              My view on technology leadership
            </h2>
            <p className="text-base font-body text-foreground leading-relaxed">
              Technology should be a competitive advantage, not a cost center. I believe in hands-on, outcome-focused leadership: clear architecture decisions, accountable teams, and technical strategy that ties directly to business results. My advisory approach is practical — I've been in the seat during SOC 2 audits, GovCloud migrations, and M&A due diligence, so I help founders, PE/VC firms, and GovTech companies make decisions that hold up under scrutiny.
            </p>
          </div>
        </div>
      </section>

      {/* The Bench */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl font-semibold text-heading mb-6">
              The Bench
            </h2>
            <p className="text-base font-body text-foreground leading-relaxed">
              For engagements that require additional expertise or capacity, I bring in trusted senior technology leaders from my vetted network. These are experienced CTOs and operators who share the same standards for execution and accountability. When we scope an engagement that needs the bench, we discuss fit and introduce the right people — so you get the right level of leadership without the overhead of a full-time hire.
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
