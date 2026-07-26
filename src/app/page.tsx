import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABand } from "@/components/CTABand";
import { Eyebrow } from "@/components/Eyebrow";
import { MetricCard } from "@/components/MetricCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProofBar } from "@/components/ProofBar";
import { Container } from "@/components/layout/Container";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { PROOF_METRICS } from "@/config/proof-bar";
import { estimateReadTimeMinutes, getRecentArticles } from "@/lib/articles";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";

const SITE_URL = "https://thectomentor.com";

export const metadata: Metadata = {
  title: "Asim Mohammad — Technology Advisory for PE & Growth Software",
  description:
    "Independent technical risk assessment and portfolio technology leadership for PE/VC deal partners. Diagnostic Sprint from $25,000.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Asim Mohammad — Technology Advisory for PE & Growth Software",
    description:
      "Surface technical risk before the deal is priced. Diligence, diagnostics, and embedded technology leadership from $25,000.",
    url: SITE_URL,
    siteName: "thectomentor.com",
    type: "website",
    locale: "en_US",
    images: [{ url: "/portraits/hero-placeholder.svg", width: 800, height: 1000, alt: "Asim Mohammad" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Asim Mohammad — Technology Advisory for PE & Growth Software",
    description:
      "Surface technical risk before the deal is priced. Diligence, diagnostics, and embedded technology leadership from $25,000.",
    images: ["/portraits/hero-placeholder.svg"],
  },
  robots: { index: true, follow: true },
};

const PROBLEMS = [
  {
    title: "Debt that surfaces after close",
    body: "The architecture that looked fine in the data room cannot fund the growth case once you own the P&L.",
  },
  {
    title: "An org that breaks the model",
    body: "Headcount and velocity assumptions in the CIM assume an engineering system that does not exist at the scale you underwrote.",
  },
  {
    title: "Security that fails first enterprise review",
    body: "SOC 2, FedRAMP, or a single customer security questionnaire exposes gaps that reset the revenue plan by a year.",
  },
] as const;

const ENGAGEMENTS = [
  {
    name: "Diagnostic Sprint",
    price: "$25,000",
    meta: "3 weeks · fixed scope",
    description: "A time-boxed read on technology risk before you commit more capital or change the plan.",
    deliverables: [
      "Findings report for the deal team or board",
      "Scored risk register with severity and owners",
      "90-day remediation plan with sequencing",
      "Live readout with Q&A",
    ],
    who: "Who this is for: funds and CEOs who need a clear picture in three weeks, not a retainer.",
    emphasized: false,
  },
  {
    name: "Embedded Technology Leadership",
    price: "$25,000/mo",
    meta: "3-month minimum · 1–2 days/week",
    description: "Operating seat alongside management while the engineering plan is rebuilt and executed.",
    deliverables: [
      "Weekly operating cadence with the leadership team",
      "Hiring and org design decisions documented",
      "Architecture and delivery roadmap owned end-to-end",
      "Board-ready technology updates each cycle",
    ],
    who: "Who this is for: portfolio companies where technology is on the critical path to the thesis.",
    emphasized: true,
  },
  {
    name: "Technical Due Diligence",
    price: "$35,000–$50,000",
    meta: "Per transaction",
    description: "Pre-acquisition assessment of architecture, security, scalability, and the team.",
    deliverables: [
      "IC-ready written diligence report",
      "Architecture and scalability assessment",
      "Security and compliance posture review",
      "Team and delivery-capacity evaluation",
    ],
    who: "Who this is for: deal partners who need an independent tech view before price is locked.",
    emphasized: false,
  },
] as const;

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Asim Mohammad",
      url: SITE_URL,
      jobTitle: "Technology Advisor · Fractional CTO",
      alumniOf: {
        "@type": "CollegeOrUniversity",
        name: "Duke University",
      },
      knowsAbout: [
        "Technical due diligence",
        "Fractional CTO",
        "SOC 2",
        "FedRAMP",
        "AWS GovCloud",
        "Private equity technology",
      ],
      sameAs: ["https://www.linkedin.com/in/asimmohammad"],
      email: "mailto:asim@thectomentor.com",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Asim Mohammad Technology Advisory",
      url: SITE_URL,
      description:
        "Independent technical risk assessment, technical due diligence, and embedded technology leadership for PE/VC funds and growth-stage software companies. Engagements from $25,000.",
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: "United States",
      serviceType: [
        "Technical due diligence",
        "Fractional CTO",
        "Technology diagnostic",
        "Portfolio technology partner",
      ],
      priceRange: "$$$",
    },
  ],
};

export default function HomePage() {
  const recent = getRecentArticles(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 2. HERO */}
      <section
        aria-label="Introduction"
        className="relative flex min-h-[calc(100svh-var(--header-height))] flex-col justify-center bg-paper"
      >
        <Container className="flex flex-1 flex-col py-[var(--space-7)] lg:py-0">
          <Grid className="flex-1 items-stretch lg:min-h-[calc(100svh-var(--header-height))]">
            <GridItem span={12} lg={7} className="flex flex-col justify-center py-[var(--space-6)] lg:pr-[var(--space-6)]">
              <h1 className="font-display text-hero font-extrabold text-ink">
                Surface technical risk before the deal is priced.
              </h1>
              <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
                I score the technology risk in your deal before price is locked, then stay on when engineering has to
                deliver the thesis.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild variant="primary" size="lg">
                  <Link href={PRIMARY_CTA.href} className="inline-flex items-center gap-2">
                    {PRIMARY_CTA.label}
                    <span aria-hidden="true">→</span>
                  </Link>
                </Button>
                <Button asChild variant="secondary" size="lg">
                  <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
                </Button>
              </div>
              <p className="mt-8 border-t border-border pt-4 font-text text-caption text-ink-faint">
                25 years · Diligence supporting a $600M exit · SOC 2 Type II · AWS GovCloud / FedRAMP
              </p>
            </GridItem>

            <GridItem span={12} lg={5} className="relative min-h-[28rem] lg:min-h-0">
              <div className="absolute inset-0 overflow-hidden bg-paper lg:inset-y-0 lg:-mr-[calc((100vw-min(100vw,var(--content-max)))/2+var(--gutter))]">
                <div className="hero-duotone relative h-full w-full">
                  <Image
                    src="/portraits/hero-placeholder.svg"
                    alt="Editorial portrait of Asim Mohammad — placeholder pending final photograph"
                    fill
                    priority
                    unoptimized
                    className="object-cover object-center"
                    sizes="(min-width: 1024px) 42vw, 100vw"
                  />
                </div>
              </div>
            </GridItem>
          </Grid>
        </Container>
      </section>

      {/* 3. PROOF BAR */}
      <ProofBar logos={[]} metrics={PROOF_METRICS} />

      {/* 4. THE PROBLEM */}
      <Section spacing="standard" tone="paper" id="problem">
        <Eyebrow>The problem</Eyebrow>
        <h2 className="mt-3 max-w-measure font-display text-h2 text-ink">
          The technology risk that does not show up in the CIM.
        </h2>
        <Grid className="mt-10">
          {PROBLEMS.map((item) => (
            <GridItem key={item.title} span={12} md={4}>
              <h3 className="font-text text-h4 text-ink">{item.title}</h3>
              <p className="mt-3 font-text text-body text-ink-muted">{item.body}</p>
            </GridItem>
          ))}
        </Grid>
      </Section>

      {/* 5. ENGAGEMENT MODELS */}
      <Section spacing="standard" tone="alt" id="engagements">
        <Eyebrow>Engagement models</Eyebrow>
        <h2 className="mt-3 max-w-measure font-display text-h2 text-ink">How the work is scoped.</h2>
        <Grid className="mt-10">
          {ENGAGEMENTS.map((item) => (
            <GridItem key={item.name} span={12} lg={4}>
              <Card
                variant={item.emphasized ? "emphasized" : "default"}
                className="flex h-full flex-col"
              >
                {item.emphasized ? (
                  <Eyebrow className="mb-3 text-accent">Most common engagement</Eyebrow>
                ) : (
                  <span className="mb-3 block h-[1.125rem]" aria-hidden="true" />
                )}
                <p className="metric font-display text-h2 text-ink">{item.price}</p>
                <p className="mt-1 font-text text-caption text-ink-faint">{item.meta}</p>
                <h3 className="mt-4 font-text text-h4 text-ink">{item.name}</h3>
                <p className="mt-2 font-text text-body text-ink-muted">{item.description}</p>
                <ul className="mt-5 flex-1 list-none space-y-2 border-t border-border pt-5">
                  {item.deliverables.map((d) => (
                    <li key={d} className="font-text text-small text-ink">
                      <span className="text-accent" aria-hidden="true">
                        —{" "}
                      </span>
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 font-text text-caption text-ink-muted">{item.who}</p>
                <Link
                  href="/engagements"
                  className="mt-6 inline-block font-text text-small font-medium text-accent underline-offset-4 hover:underline"
                >
                  Full engagement details
                </Link>
              </Card>
            </GridItem>
          ))}
        </Grid>
      </Section>

      {/* 6. CASE STUDIES */}
      <Section spacing="standard" tone="paper" id="case-studies">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="mt-3 font-display text-h2 text-ink">Outcomes with numbers.</h2>
          </div>
          <Link
            href="/case-studies"
            className="font-text text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            All case studies
          </Link>
        </div>
        <Grid className="mt-10">
          <GridItem span={12} md={4}>
            <Link href="/case-studies" className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <MetricCard
                label="Cloud economics"
                metric="38%"
                narrative="Reduction in cloud spend while increasing delivery velocity on a Series A SaaS platform."
                className="h-full"
              />
            </Link>
          </GridItem>
          <GridItem span={12} md={4}>
            <Link href="/case-studies" className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <MetricCard
                label="Transaction"
                metric="$600M"
                narrative="Technical readiness supporting a successful exit — architecture, team, and diligence."
                className="h-full"
              />
            </Link>
          </GridItem>
          <GridItem span={12} md={4}>
            <Link href="/case-studies" className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
              <MetricCard
                label="Compliance"
                metric="6 mo"
                narrative="SOC 2 Type II completed with architecture and process remediation still shipping product."
                className="h-full"
              />
            </Link>
          </GridItem>
        </Grid>
      </Section>

      {/* 7. THE ASSESSMENT — primary conversion, more weight than pricing */}
      <Section spacing="generous" tone="dark" id="assessment" className="relative">
        <div className="max-w-measure">
          <Eyebrow className="text-ink-inverse/60">The assessment</Eyebrow>
          <h2 className="mt-3 font-display text-h1 text-ink-inverse">
            Twelve questions. Four minutes. A scored view of your technology risk.
          </h2>
          <p className="mt-6 font-text text-lead text-ink-inverse/85">
            The Technical Risk Assessment is the first step. You get a scored report benchmarked against companies at
            your stage — architecture, delivery, security, and team — before any conversation is booked.
          </p>
          <ul className="mt-8 space-y-3 font-text text-body text-ink-inverse/80">
            <li>Twelve structured questions across the dimensions that move deal and portfolio outcomes.</li>
            <li>Four minutes to complete. No sales call required to start.</li>
            <li>A scored report you can share with partners, compared to peers at your stage.</li>
          </ul>
          <div className="mt-10">
            <Button asChild variant="primary" size="lg">
              <Link href={PRIMARY_CTA.href} className="inline-flex items-center gap-2">
                {PRIMARY_CTA.label}
                <span aria-hidden="true">→</span>
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 8. INSIGHTS */}
      <Section spacing="standard" tone="paper" id="insights">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-3 font-display text-h2 text-ink">Recent writing.</h2>
          </div>
          <Link
            href="/insights"
            className="font-text text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            All insights
          </Link>
        </div>
        <div className="mt-10 divide-y divide-border border-y border-border">
          {recent.map(([slug, article]) => (
            <article key={slug} className="py-8">
              <Eyebrow>{article.category}</Eyebrow>
              <h3 className="mt-3 max-w-measure font-display text-h3 text-ink">
                <Link href={`/insights/${slug}`} className="hover:text-accent">
                  {article.title}
                </Link>
              </h3>
              <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{article.description}</p>
              <p className="mt-4 font-text text-caption text-ink-faint">
                {article.date} · {estimateReadTimeMinutes(article)} min read
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* 9. NEWSLETTER */}
      <Section spacing="standard" tone="alt" id="newsletter">
        <Eyebrow>Newsletter</Eyebrow>
        <h2 className="mt-3 max-w-measure font-display text-h2 text-ink">
          Operating notes for people who underwrite technology risk.
        </h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Infrequent. Specific. Written for deal partners, operating partners, and CEOs — not a generic founder list.
        </p>
        <NewsletterForm />
      </Section>

      {/* 10. CTA BAND */}
      <CTABand
        heading="Start with the risk, not the retainer."
        body="Complete the Technical Risk Assessment, or request a confidential conversation if you already know the shape of the work."
        scarcity="Two engagement slots for Q4 2026."
      />
    </>
  );
}
