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
  title: "Asim Mohammad — Fractional CTO & Technology Leadership",
  description:
    "Senior technical leadership on a fractional commitment. Fractional CTO from $30,000, advisory access, diagnostic sprints, and independent technical due diligence.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "Asim Mohammad — Fractional CTO & Technology Leadership",
    description:
      "Senior technical leadership, fractional commitment. Fractional CTO, advisory, diagnostics, and technical due diligence.",
    url: SITE_URL,
    siteName: "thectomentor.com",
    type: "website",
    locale: "en_US",
    // Uses src/app/opengraph-image.tsx — not the hero placeholder.
  },
  twitter: {
    card: "summary_large_image",
    title: "Asim Mohammad — Fractional CTO & Technology Leadership",
    description:
      "Senior technical leadership, fractional commitment. Fractional CTO, advisory, diagnostics, and technical due diligence.",
  },
  robots: { index: true, follow: true },
};

const PROBLEMS = [
  {
    title: "Every estimate is “about two weeks.”",
    body: "Not because the work is two weeks. Because nobody can see far enough to say otherwise.",
  },
  {
    title: "One engineer knows production",
    body: "That is not a system. It is a dependency with a calendar.",
  },
  {
    title: "A security questionnaire triggers a fire drill",
    body: "Enterprise deals die here, quietly, and you rarely find out why.",
  },
] as const;

/**
 * Three-way self-identification. Each headline is the buyer's own sentence, not a
 * description of them — a CEO scanning the page stops at the one they have said out loud.
 * These link to tier anchors on /engagements; they are navigation, not new CTAs (brief §2.3).
 */
const WHERE_ARE_YOU = [
  {
    quote: "“We’ve outgrown improvising, but we can’t justify a CTO.”",
    body: "Revenue is growing. The roadmap is full. Every architecture, vendor, and hiring decision lands on someone who was never hired to make it.",
    tierId: "fractional-cto" as const,
    linkLabel: "Fractional CTO",
  },
  {
    quote: "“Someone is about to look under the hood.”",
    body: "A transaction, a raise, or an enterprise security review. You need an independent technical read and a written artifact before anyone else forms their own.",
    tierId: "diagnostic-sprint" as const,
    linkLabel: "Diligence & Diagnostic Sprint",
  },
  {
    quote: "“I need an outside read on my team and my stack.”",
    body: "You have engineers. You may have a technical lead. You want senior judgment on whether the architecture and the org are actually right.",
    tierId: "advisory" as const,
    linkLabel: "Advisory",
  },
] as const;

const ENGAGEMENTS = [
  {
    id: "advisory" as const,
    description:
      "Standing access, architecture reviews, vendor and hiring decisions, board prep. For teams with capable leadership that needs a sounding board.",
    deliverables: [
      "Architecture reviews on request",
      "Vendor and build-versus-buy decisions",
      "Hiring calibration and interview design",
      "Board and investor prep on technology",
    ],
    tag: "Sounding board",
    emphasized: false,
  },
  {
    id: "fractional-cto" as const,
    description:
      "The seat, part-time. Strategy, team structure, roadmap ownership, board representation.",
    deliverables: [
      "Strategy and architecture owned end-to-end",
      "Team structure, hiring, and org design",
      "Roadmap ownership with dates your team can execute",
      "Board representation on technology",
    ],
    tag: "Most common engagement",
    emphasized: true,
  },
  {
    id: "embedded" as const,
    description:
      "The heavier version of the seat, for companies where technology is on the critical path and the cadence has to be weekly.",
    deliverables: [
      "Weekly operating cadence with the leadership team",
      "Hiring and org design decisions documented",
      "Architecture and delivery roadmap owned end-to-end",
      "Board-ready technology updates each cycle",
    ],
    tag: "Critical path",
    emphasized: false,
  },
  {
    id: "interim" as const,
    description:
      "You lost a technical leader, or you are preparing to hire one. I hold the function, define the role, recruit for it, and hand off cleanly.",
    deliverables: [
      "The function held — decisions keep getting made",
      "The role defined and scoped honestly",
      "Recruiting and technical interviewing for the hire",
      "A clean written handoff to your new leader",
    ],
    tag: "Designed to end",
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
                Senior technical leadership. Fractional commitment.
              </h1>
              <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
                Every consequential technology decision at your company — architecture, vendors,
                security, hiring, AI — is landing on someone who was never hired to make it. That is
                not a talent problem. It is an absence of technical leadership, and it is fixable
                without a full-time hire.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Button asChild variant="primary" size="lg">
                  <PrimaryCtaLink href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} />
                </Button>
                <Button asChild variant="ghost" size="lg">
                  <Link href={SECONDARY_CTA.href}>{SECONDARY_CTA.label}</Link>
                </Button>
              </div>
              {/* The diligence door. One sentence, no visual weight — keeps the fund
                  audience oriented without competing with the two canonical CTAs. */}
              <p className="mt-6 max-w-measure font-text text-small italic text-ink-muted">
                Also engaged by PE and growth funds for pre-price technical diligence.{" "}
                <Link href="/investors" className="not-italic underline hover:text-ink">
                  For funds
                </Link>
              </p>
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
        <Eyebrow>The pattern</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Consequential decisions are landing on people who were never hired to make them.
        </h2>
        <Grid className="mt-12">
          {PROBLEMS.map((item) => (
            <GridItem key={item.title} span={12} md={4}>
              <h3 className="font-text text-h4 font-medium text-ink">{item.title}</h3>
              <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{item.body}</p>
            </GridItem>
          ))}
        </Grid>
        <p className="mt-12 max-w-measure font-text text-lead text-ink">
          None of this is a talent problem. Your engineers are probably good — that is what makes it
          hard to see.
        </p>
      </Section>

      <Section spacing="standard" tone="paper" id="where-are-you">
        <Eyebrow>Start here</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Where are you?
        </h2>
        <Grid className="mt-12">
          {WHERE_ARE_YOU.map((item) => (
            <GridItem key={item.tierId} span={12} lg={4}>
              <div className="flex h-full flex-col border-t border-ink pt-6">
                <h3 className="max-w-[24ch] font-display text-h3 text-ink">{item.quote}</h3>
                <p className="mt-4 flex-1 font-text text-body text-ink-muted">{item.body}</p>
                <Link
                  href={`/engagements#${item.tierId}`}
                  className="mt-6 inline-block font-text text-small font-medium text-accent underline-offset-4 hover:underline"
                >
                  {item.linkLabel} · from {PRICING_BY_ID[item.tierId].priceDisplay}
                </Link>
              </div>
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
              <GridItem key={item.id} span={12} md={6} lg={3}>
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
                  {pricing.secondary ? (
                    <>
                      <p className="metric mt-2 font-display text-h3 text-ink">
                        {pricing.secondary.priceDisplay}
                      </p>
                      <p className="mt-1 font-text text-caption text-ink-muted">
                        {pricing.secondary.meta}
                      </p>
                    </>
                  ) : null}
                  <p className="mt-2 font-text text-caption text-ink-faint">{pricing.effort}</p>
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
                  <p className="mt-6 border-t border-border pt-5 font-text text-small text-ink">
                    <span className="font-semibold">Not for. </span>
                    <span className="text-ink-muted">{pricing.notFor}</span>
                  </p>
                  <p className="mt-4 font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
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
            Start with the risk, not the retainer.
          </h2>
          <p className="mt-6 font-text text-lead text-ink-inverse/85">
            Twelve questions, four minutes, no email until the last one. You get a scored read on
            engineering velocity, quality, security posture, and key-person risk — benchmarked
            against companies at your stage.
          </p>
          <p className="mt-4 font-text text-lead text-ink-inverse">
            If the score says you need a full-time hire, or nothing at all, I will say that. It
            happens often enough to be worth stating.
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
        heading="Two engagements. That is the capacity."
        body="Fractional work only functions if the number of clients stays small. Real technical leadership means being in the standups, the vendor calls, and the board prep — not sending a monthly summary."
        scarcity="Two engagement slots for Q4 2026."
      />
    </>
  );
}
