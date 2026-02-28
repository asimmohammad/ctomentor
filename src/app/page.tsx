import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NewsletterSignup } from "@/components/NewsletterSignup";

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

const latestPosts = [
  {
    slug: "ai-coding-tools-lying",
    title: "Your AI Coding Tools Are Lying to You",
    date: "February 2026",
  },
  {
    slug: "soc-2-compliance",
    title: "SOC 2 Compliance: What Every Technology Leader Needs to Know",
    date: "February 2026",
  },
  {
    slug: "cto-skill-no",
    title: 'The CTO Skill Nobody Trains For: Saying "No"',
    date: "February 2026",
  },
];

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

      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-4xl">
            <p className="text-sm font-body text-accent font-medium tracking-wider uppercase mb-4">
              Strategic Technology Leadership for Growth-Stage Companies, PE/VC Portfolios & Government Technology
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-semibold text-heading leading-tight">
              I help growth-stage companies and PE/VC firms build technology that scales — without the cost of a
              full-time CTO.
            </h1>
            <p className="mt-6 text-lg md:text-xl font-body text-subtle leading-relaxed max-w-2xl">
              I bring hands-on CTO leadership: architecture, security, team scaling, and technical due diligence. For
              engagements that need more capacity, I bring in trusted senior technology leaders from my vetted network.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>

      {/* Founder / Lead credibility */}
      <section className="border-b border-divider bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-12 lg:py-16">
          <div className="max-w-4xl">
            <h2 className="font-heading text-xl font-semibold text-heading mb-4">Led by Asim Mohammad</h2>
            <p className="text-base font-body text-subtle leading-relaxed mb-4">
              CTO at a loyalty-as-a-service platform. Currently serving as CTO for a SOC 2 Type II certified SaaS
              platform; leading AWS GovCloud migration and FedRAMP readiness initiatives. Experience with IL5
              authorization and ICAM integration for DoD markets. Hands-on with technology due diligence for M&A
              transactions. AWS architecture, security posture, and scalability expertise.
            </p>
            <Link
              href="/about"
              className="text-sm font-body font-medium text-accent hover:text-accent/80 transition-colors"
            >
              Learn more about me →
            </Link>
          </div>
        </div>
      </section>

      {/* Social proof bar */}
      <section className="bg-section-gradient border-b border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-8">
          <p className="text-center text-sm font-body text-subtle">
            Advised 15+ companies across SaaS, fintech, and government technology · SOC 2 Type II · FedRAMP & GovCloud
            experience
          </p>
        </div>
      </section>

      {/* Three service pillars */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading max-w-2xl mb-4">
            Three ways to work with me
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-2xl">
            Advisory, embedded leadership, or technical due diligence — depending on what your company needs.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {servicePillars.map((pillar) => (
              <Link
                key={pillar.title}
                href={pillar.href}
                className="group block bg-card p-8 border border-divider hover:border-accent/30 transition-colors h-full flex flex-col"
              >
                <span className="text-sm font-body font-semibold text-accent">{pillar.price}</span>
                <h3 className="mt-4 font-heading text-xl font-semibold text-heading">{pillar.title}</h3>
                <p className="mt-4 text-base font-body text-subtle leading-relaxed flex-1">{pillar.description}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-sm font-body font-medium text-heading group-hover:text-accent transition-colors">
                  Learn more
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link href="/apply">
              <Button variant="outline" size="lg">
                Not sure which is right? Book a call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">Specializations</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {specializations.map((spec) => (
              <div key={spec.title} className="bg-card border border-divider p-8 flex flex-col">
                <h3 className="font-heading text-xl font-semibold text-heading">{spec.title}</h3>
                <p className="mt-4 text-base font-body text-subtle leading-relaxed flex-1">{spec.description}</p>
                <Link href={spec.href} className="mt-6">
                  <Button variant="outline" size="lg">
                    {spec.cta}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case studies / results */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-4">Results that compound</h2>
          <p className="text-lg font-body text-primary-foreground/90 mb-12 max-w-2xl">
            Anonymized outcomes from real engagements.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {caseStudyCards.map((card) => (
              <div key={card.title} className="border border-primary-foreground/20 rounded-lg p-6">
                <h3 className="font-heading text-lg font-semibold text-white mb-3">{card.title}</h3>
                <p className="text-sm font-body text-primary-foreground/90 leading-relaxed">{card.outcome}</p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/case-studies">
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

      {/* Insights preview */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-4">Latest from the blog</h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-2xl">
            Technology leadership, engineering teams, and CTO strategy.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/insights/${post.slug}`}
                className="group block border border-divider rounded-lg p-6 hover:border-accent/30 transition-colors"
              >
                <span className="text-sm font-body text-subtle">{post.date}</span>
                <h3 className="mt-2 font-heading text-lg font-semibold text-heading group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>
                <span className="mt-3 inline-block text-sm font-body font-medium text-heading group-hover:text-accent transition-colors">
                  Read more →
                </span>
              </Link>
            ))}
          </div>
          <div className="mt-10">
            <Link href="/insights">
              <Button variant="outline" size="lg">
                View all insights
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading mb-4">
              Weekly insights in your inbox
            </h2>
            <NewsletterSignup variant="inline" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading">Ready to talk?</h2>
            <p className="mt-4 text-lg font-body text-subtle leading-relaxed">
              Book a free 30-minute discovery call. We'll assess fit and define the clearest path forward.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
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
        </div>
      </section>
    </>
  );
}

