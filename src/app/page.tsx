import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import { CTABand } from "@/components/CTABand";
import { Eyebrow } from "@/components/Eyebrow";
import { MetricCard } from "@/components/MetricCard";
import { NewsletterForm } from "@/components/NewsletterForm";
import { ProofBand } from "@/components/proof/ProofBand";
import { ProofResults } from "@/components/proof/ProofResults";
import { ProofTestimonials } from "@/components/proof/ProofTestimonials";
import { Container } from "@/components/layout/Container";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";
import { estimateReadTimeMinutes, getRecentArticles } from "@/lib/articles";
import { HOME_HERO_ALT, HOME_HERO_SRC } from "@/lib/media";
import { PRICING_BY_ID } from "@/lib/pricing";

const SITE_URL = "https://thectomentor.com";

export const metadata: Metadata = {
  title: "Asim Mohammad — Technology Advisory for PE & Growth Software",
  description:
    "Independent technical risk assessment and portfolio technology leadership for PE/VC deal partners. Diagnostic Sprint, diligence, and embedded technology leadership.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Asim Mohammad — Technology Advisory for PE & Growth Software",
    description:
      "Surface technical risk before the deal is priced. Diligence, diagnostics, and embedded technology leadership.",
    url: SITE_URL,
    siteName: "thectomentor.com",
    type: "website",
    locale: "en_US",
    // Uses src/app/opengraph-image.tsx — not the hero placeholder.
  },
  twitter: {
    card: "summary_large_image",
    title: "Asim Mohammad — Technology Advisory for PE & Growth Software",
    description:
      "Surface technical risk before the deal is priced. Diligence, diagnostics, and embedded technology leadership.",
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
    id: "diagnostic-sprint" as const,
    description: "A time-boxed read on technology risk before you commit more capital or change the plan.",
    deliverables: [
      "Findings report for the deal team or board",
      "Scored risk register with severity and owners",
      "90-day remediation plan with sequencing",
      "Live readout with Q&A",
    ],
    tag: "Deal teams · fast read",
    emphasized: false,
  },
  {
    id: "embedded" as const,
    description: "Operating seat alongside management while the engineering plan is rebuilt and executed.",
    deliverables: [
      "Weekly operating cadence with the leadership team",
      "Hiring and org design decisions documented",
      "Architecture and delivery roadmap owned end-to-end",
      "Board-ready technology updates each cycle",
    ],
    tag: "Portfolio · critical path",
    emphasized: true,
  },
  {
    id: "due-diligence" as const,
    description: "Pre-acquisition assessment of architecture, security, scalability, and the team.",
    deliverables: [
      "IC-ready written diligence report",
      "Architecture and scalability assessment",
      "Security and compliance posture review",
      "Team and delivery-capacity evaluation",
    ],
    tag: "Pre-price diligence",
    emphasized: false,
  },
] as const;

/** Homepage tiles expand situation/context; ProofBand shows client logos when configured. */
const CASE_STUDIES = [
  {
    label: "Cloud economics",
    metric: "38%",
    narrative:
      "Series A SaaS with runaway AWS spend and slowing releases. The binding constraint was architecture cost drivers, not headcount. Spend dropped while delivery velocity rose.",
  },
  {
    label: "Transaction",
    metric: "$600M",
    narrative:
      "Strategic exit where technology diligence would move the multiple. Diligence pack, architecture narrative, and team story held through buyer technical review.",
  },
  {
    label: "Compliance",
    metric: "6 mo",
    narrative:
      "Growth company that needed SOC 2 Type II without pausing the roadmap. Controls and evidence landed while product continued to ship on schedule.",
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
      sameAs: ["https://www.linkedin.com/in/asimmohammad1"],
      email: "mailto:asim@thectomentor.com",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#service`,
      name: "Asim Mohammad Technology Advisory",
      url: SITE_URL,
      description:
        "Independent technical risk assessment, technical due diligence, and embedded technology leadership for PE/VC funds and growth-stage software companies.",
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: "United States",
      serviceType: [
        "Technical due diligence",
        "Fractional CTO",
        "Technology diagnostic",
        "Portfolio technology partner",
      ],
    },
  ],
};

function PrimaryCtaLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-2.5">
      <span>{label}</span>
      <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
    </Link>
  );
}

export default function HomePage() {
  const recent = getRecentArticles(3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* HERO — copy left, Surface diagram dominant right */}
      <section
        aria-label="Introduction"
        className="relative bg-paper"
      >
        <Container className="py-[var(--space-7)] lg:py-[var(--space-8)]">
          <Grid className="items-center gap-y-10 lg:gap-y-0">
            <GridItem
              span={12}
              lg={5}
              className="flex flex-col justify-center lg:pr-[var(--space-5)]"
            >
              <h1 className="max-w-[20ch] font-display text-h1 font-semibold text-ink">
                Surface technical risk before the deal is priced.
              </h1>
              <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
                I score the technology risk in your deal before price is locked, then stay on when engineering has to
                deliver the thesis.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild variant="primary" size="lg">
                  <PrimaryCtaLink href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} />
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
                </Button>
              </div>
            </GridItem>

            <GridItem span={12} lg={7} className="relative">
              <div className="overflow-hidden bg-[#272727] lg:-mr-[calc((100vw-min(100vw,var(--content-max)))/2+var(--gutter))]">
                {/* Native img: SVG asset URL; natural dimensions, no fixed aspect box */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={HOME_HERO_SRC}
                  alt={HOME_HERO_ALT}
                  width={936}
                  height={613}
                  className="block h-auto w-full max-w-none"
                  decoding="async"
                  fetchPriority="high"
                />
              </div>
            </GridItem>
          </Grid>
        </Container>
      </section>

      {/* Client proof — logos auto-discovered from src/assets/logo/ */}
      <ProofBand priority />

      <Section spacing="standard" tone="paper" id="problem">
        <Eyebrow>The problem</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          The technology risk that does not show up in the CIM.
        </h2>
        <Grid className="mt-12">
          {PROBLEMS.map((item) => (
            <GridItem key={item.title} span={12} md={4}>
              <h3 className="font-text text-h4 font-medium text-ink">{item.title}</h3>
              <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{item.body}</p>
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section spacing="standard" tone="alt" id="engagements">
        <Eyebrow>Engagement models</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          How the work is scoped.
        </h2>
        <Grid className="mt-12">
          {ENGAGEMENTS.map((item) => {
            const pricing = PRICING_BY_ID[item.id];
            return (
              <GridItem key={item.id} span={12} lg={4}>
                <Card
                  variant={item.emphasized ? "emphasized" : "default"}
                  static
                  className="flex h-full flex-col p-8"
                >
                  {item.emphasized ? (
                    <Eyebrow className="mb-4 text-accent">Most common engagement</Eyebrow>
                  ) : (
                    <span className="mb-4 block h-[1.125rem]" aria-hidden="true" />
                  )}
                  <h3 className="metric font-display text-h2 font-semibold text-ink">{pricing.name}</h3>
                  <p className="metric mt-3 font-display text-h3 text-ink">{pricing.priceDisplay}</p>
                  <p className="mt-1 font-text text-caption text-ink-muted">{pricing.meta}</p>
                  <p className="mt-6 max-w-measure font-text text-body text-ink-muted">{item.description}</p>
                  <ul className="mt-6 flex-1 list-none space-y-3 border-t border-border pt-6">
                    {item.deliverables.map((d) => (
                      <li key={d} className="font-text text-small text-ink">
                        <span className="mr-2 text-ink-faint" aria-hidden="true">
                          –
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-6 font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
                    {item.tag}
                  </p>
                  <Link
                    href="/engagements"
                    className="mt-6 inline-block font-text text-small font-medium text-accent underline-offset-4 hover:underline"
                  >
                    Full engagement details
                  </Link>
                </Card>
              </GridItem>
            );
          })}
        </Grid>
      </Section>

      <ProofResults />

      <ProofTestimonials />

      <Section spacing="standard" tone="paper" id="case-studies">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Case studies</Eyebrow>
            <h2 className="mt-4 font-display text-h2 font-semibold text-ink">
              Outcomes with context.
            </h2>
          </div>
          <Link
            href="/case-studies"
            className="font-text text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            All case studies
          </Link>
        </div>
        <Grid className="mt-12">
          {CASE_STUDIES.map((item) => (
            <GridItem key={item.label} span={12} md={4}>
              <Link
                href="/case-studies"
                className="block h-full focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                <MetricCard
                  label={item.label}
                  metric={item.metric}
                  narrative={item.narrative}
                  className="h-full"
                />
              </Link>
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section spacing="generous" tone="dark" id="assessment">
        <div className="max-w-measure">
          <Eyebrow className="text-ink-inverse/60">The assessment</Eyebrow>
          <h2 className="mt-4 font-display text-h1 font-semibold text-ink-inverse">
            Twelve questions. Four minutes. A scored view of your technology risk.
          </h2>
          <p className="mt-6 font-text text-lead text-ink-inverse/85">
            Partners get a shared artifact: where architecture, delivery, security, and team stand relative to peers at
            your stage, before any conversation is booked.
          </p>
          <div className="mt-10">
            <Button asChild variant="onDark" size="lg">
              <PrimaryCtaLink href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} />
            </Button>
          </div>
        </div>
      </Section>

      <Section spacing="standard" tone="paper" id="insights">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Insights</Eyebrow>
            <h2 className="mt-4 font-display text-h2 font-semibold text-ink">Recent writing.</h2>
          </div>
          <Link
            href="/insights"
            className="font-text text-small font-medium text-accent underline-offset-4 hover:underline"
          >
            All insights
          </Link>
        </div>
        <div className="mt-12 divide-y divide-border border-y border-border">
          {recent.map(([slug, article]) => (
            <article key={slug} className="py-8">
              <Eyebrow>{article.category}</Eyebrow>
              <h3 className="mt-3 max-w-measure font-display text-h3 font-semibold text-ink">
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

      <Section spacing="standard" tone="alt" id="newsletter">
        <Eyebrow>Newsletter</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Operating notes for people who underwrite technology risk.
        </h2>
        <NewsletterForm />
      </Section>

      <CTABand
        heading="Start with the risk, not the retainer."
        body="Complete the Technical Risk Assessment, or request a confidential conversation if you already know the shape of the work."
        scarcity="Two engagement slots for Q4 2026."
      />
    </>
  );
}
