import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { Grid, GridItem } from "@/components/layout/Grid";
import { getPublishableArticles } from "@/lib/articles";

export const metadata: Metadata = {
  title: "The CTO Mentor | Asim Mohammad — Fractional CTO & Technology Leadership",
  description:
    "Strategic CTO advisory, embedded technology leadership, and technical due diligence from an active CTO leading a $75M platform. 25+ years scaling enterprise technology.",
  keywords: [
    "fractional CTO",
    "CTO advisory",
    "technical due diligence",
    "technology leadership",
    "SOC 2",
    "FedRAMP",
    "government technology",
  ],
  authors: [{ name: "Asim Mohammad" }],
  openGraph: {
    title: "The CTO Mentor | Asim Mohammad",
    description:
      "Strategic CTO advisory and technology leadership from an active CTO with 25+ years of experience.",
    url: "https://thectomentor.com",
    siteName: "The CTO Mentor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "The CTO Mentor | Asim Mohammad",
    description:
      "Strategic CTO advisory and technology leadership from an active CTO with 25+ years of experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://thectomentor.com",
  },
};

const servicePillars = [
  {
    title: "CTO Advisory",
    description:
      "Monthly strategic sessions and async access. Best for founders who need a senior technology sounding board.",
    price: "From $5,000/mo",
    href: "/services#advisory",
  },
  {
    title: "Embedded CTO Leadership",
    description:
      "1–2 days per week embedded with your team. Board support, hiring, architecture, and execution.",
    price: "From $12,000/mo",
    href: "/services#embedded",
  },
  {
    title: "Technical Due Diligence",
    description:
      "Pre-acquisition assessments for PE/VC. Architecture, security, scalability, and team evaluation.",
    price: "From $15,000 per engagement",
    href: "/services#due-diligence",
  },
];

const specializations = [
  {
    title: "PE/VC Technology Due Diligence",
    description:
      "Independent technical assessments and portfolio company CTO support for private equity and venture capital firms.",
    href: "/investors",
    cta: "Technology Due Diligence for Investors",
  },
  {
    title: "Government & Defense Technology",
    description:
      "FedRAMP readiness, AWS GovCloud, IL5, and DoD compliance. Fractional CTO for GovTech and defense contractors.",
    href: "/government",
    cta: "Government & Defense Technology Leadership",
  },
];

const caseStudyCards = [
  {
    title: "Series A SaaS Platform",
    outcome:
      "Guided through SOC 2 Type II certification in 6 months; reduced cloud spend 38% while increasing delivery velocity.",
  },
  {
    title: "Multi-Vendor Commerce Platform",
    outcome:
      "Rebuilt fractured vendor ecosystem into a single accountable platform; improved margin control and operational ownership.",
  },
  {
    title: "Technology Adoption & Scale",
    outcome:
      "Led technology and adoption growth supporting a $600M acquisition; architecture and team readiness for due diligence.",
  },
];

const latestPosts = getPublishableArticles()
  .slice(0, 3)
  .map(([slug, article]) => ({
    slug,
    title: article.title,
    date: article.date,
  }));

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: "The CTO Mentor",
            description: "Strategic CTO advisory and technology leadership",
            url: "https://thectomentor.com",
            founder: {
              "@type": "Person",
              name: "Asim Mohammad",
              jobTitle: "Chief Technology Officer",
              description:
                "Active CTO with 25+ years of experience in enterprise technology, compliance frameworks, and technical due diligence.",
            },
            serviceType: [
              "CTO Advisory",
              "Fractional CTO",
              "Technical Due Diligence",
              "Government Technology Consulting",
            ],
            areaServed: "United States",
          }),
        }}
      />

      <Section spacing="generous" tone="alt">
        <div className="max-w-measure">
          <h1 className="font-display text-hero text-ink" data-site="next-app">
            I help PE/VC firms unlock technology-driven value creation across their portfolios — as a strategic partner,
            not a consultant.
          </h1>
          <p className="mt-6 font-text text-lead text-ink-muted">
            I bring hands-on CTO leadership: architecture, security, team scaling, and technical due diligence. For
            engagements that need more capacity, I bring in trusted senior technology leaders from my vetted network.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/apply">
              <Button variant="primary" size="xl">
                Book a Free 30-Minute Discovery Call
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="xl">
                See Service Tiers
              </Button>
            </Link>
          </div>
        </div>
      </Section>

      <Section spacing="compact" tone="paper">
        <div className="max-w-measure">
          <h2 className="font-text text-h4 text-ink">Led by Asim Mohammad</h2>
          <p className="mt-4 font-text text-body text-ink-muted">
            CTO at a loyalty-as-a-service platform. Currently serving as CTO for a SOC 2 Type II certified SaaS platform;
            leading AWS GovCloud migration and FedRAMP readiness initiatives. Experience with IL5 authorization and ICAM
            integration for DoD markets. Hands-on with technology due diligence for M&A transactions. AWS architecture,
            security posture, and scalability expertise.
          </p>
          <Link href="/about" className="mt-4 inline-block font-text text-small font-medium text-accent hover:text-accent-hover">
            Learn more about me →
          </Link>
        </div>
      </Section>

      <Section spacing="compact" tone="alt">
        <p className="text-center font-text text-small text-ink-muted">
          Advised 15+ companies across SaaS, fintech, and government technology · SOC 2 Type II · FedRAMP & GovCloud
          experience
        </p>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="max-w-measure font-display text-h2 text-ink">Three ways to work with me</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Advisory, embedded leadership, or technical due diligence — depending on what your company needs.
        </p>
        <Grid className="mt-12">
          {servicePillars.map((pillar) => (
            <GridItem key={pillar.title} span={12} md={4}>
              <Link
                href={pillar.href}
                className="group flex h-full flex-col border border-border bg-surface p-8 transition-colors duration-standard hover:border-ink"
              >
                <span className="font-text text-small font-semibold text-accent">{pillar.price}</span>
                <h3 className="mt-4 font-text text-h3 text-ink">{pillar.title}</h3>
                <p className="mt-4 flex-1 font-text text-body text-ink-muted">{pillar.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-text text-small font-medium text-ink group-hover:text-accent">
                  Learn more
                </span>
              </Link>
            </GridItem>
          ))}
        </Grid>
        <div className="mt-12 text-center">
          <Link href="/apply">
            <Button variant="outline" size="lg">
              Not sure which is right? Book a call
            </Button>
          </Link>
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <h2 className="font-display text-h2 text-ink">Specializations</h2>
        <Grid className="mt-12">
          {specializations.map((spec) => (
            <GridItem key={spec.title} span={12} md={6}>
              <div className="flex h-full flex-col border border-border bg-surface p-8">
                <h3 className="font-text text-h3 text-ink">{spec.title}</h3>
                <p className="mt-4 flex-1 font-text text-body text-ink-muted">{spec.description}</p>
                <Link href={spec.href} className="mt-6">
                  <Button variant="outline" size="lg">
                    {spec.cta}
                  </Button>
                </Link>
              </div>
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section spacing="standard" tone="dark">
        <h2 className="font-display text-h2 text-ink-inverse">Results that compound</h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-inverse/90">
          Anonymized outcomes from real engagements.
        </p>
        <Grid className="mt-12">
          {caseStudyCards.map((card) => (
            <GridItem key={card.title} span={12} md={4}>
              <div className="border border-ink-inverse/20 p-6">
                <h3 className="font-text text-h4 text-ink-inverse">{card.title}</h3>
                <p className="mt-3 font-text text-small text-ink-inverse/90">{card.outcome}</p>
              </div>
            </GridItem>
          ))}
        </Grid>
        <div className="mt-10">
          <Link href="/case-studies">
            <Button variant="outline" size="lg" className="border-ink-inverse/30 text-ink-inverse hover:bg-ink-inverse hover:text-dark-band">
              View Case Studies
            </Button>
          </Link>
        </div>
      </Section>

      {latestPosts.length > 0 && (
        <Section spacing="standard" tone="paper">
          <h2 className="font-display text-h2 text-ink">Latest from the blog</h2>
          <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
            Technology leadership, engineering teams, and CTO strategy.
          </p>
          <Grid className="mt-12">
            {latestPosts.map((post) => (
              <GridItem key={post.slug} span={12} md={4}>
                <Link
                  href={`/insights/${post.slug}`}
                  className="group block border border-border p-6 transition-colors duration-standard hover:border-ink"
                >
                  <span className="font-text text-small text-ink-muted">{post.date}</span>
                  <h3 className="mt-2 font-text text-h4 text-ink group-hover:text-accent">{post.title}</h3>
                  <span className="mt-3 inline-block font-text text-small font-medium text-ink group-hover:text-accent">
                    Read more →
                  </span>
                </Link>
              </GridItem>
            ))}
          </Grid>
          <div className="mt-10">
            <Link href="/insights">
              <Button variant="outline" size="lg">
                View all insights
              </Button>
            </Link>
          </div>
        </Section>
      )}

      <Section spacing="standard" tone="paper">
        <div className="max-w-measure">
          <h2 className="font-display text-h2 text-ink">Ready to talk?</h2>
          <p className="mt-4 font-text text-lead text-ink-muted">
            Book a free 30-minute discovery call. We'll assess fit and define the clearest path forward.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/apply">
              <Button variant="primary" size="xl">
                Book a Free 30-Minute Discovery Call
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="xl">
                See Service Tiers
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
