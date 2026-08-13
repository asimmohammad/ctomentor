import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/Button";
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
import { HOME_HERO_ALT, HOME_HERO_SRC } from "@/lib/media";

const SITE_URL = "https://thectomentor.com";

const OG_TITLE = "Technology advisory for consequential decisions" as const;

const OG_DESCRIPTION =
  "Technology advisory for consequential decisions. Vested in your success, not encumbered by it." as const;

export const metadata: Metadata = {
  title: "Technology Advisory for Consequential Decisions",
  description:
    "Independent technology advisory for executives, boards, and investors. Objective inputs on AI investment, diligence, pricing, and customer intelligence.",
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    url: SITE_URL,
    siteName: "thectomentor.com",
    type: "website",
    locale: "en_US",
    // Uses src/app/opengraph-image.tsx — not the hero placeholder.
  },
  twitter: {
    card: "summary_large_image",
    title: OG_TITLE,
    description: OG_DESCRIPTION,
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
 * Decision doors. Each headline is a sentence the buyer has already said out loud
 * about a decision they own — not a description of their role. The reader is meant
 * to stop at one, not read all five.
 *
 * Links point at existing destinations and carry no price: these are navigation,
 * not CTAs (brief §2.3), and the ladder is published in full further down the page.
 * Three doors share /engagements#diagnostic-sprint because all three are
 * diagnostic-shaped problems; the link labels differ so the repetition is not the
 * first thing you notice. Dedicated Insights destinations are the follow-up.
 */
const DECISION_DOORS = [
  {
    id: "ai-investment",
    statement: "“We’re about to commit real money to AI and we can’t size it.”",
    body: "You have a number in a budget and a conviction that it matters. What you do not have is a defensible answer to when, where, why, and how much. I build that answer from your business, not from a vendor’s roadmap.",
    href: "/engagements#diagnostic-sprint",
    linkLabel: "How I size AI investment",
  },
  {
    id: "under-the-hood",
    statement: "“Someone is about to look under the hood.”",
    body: "Diligence, a funding round, an enterprise security review, a board that has started asking sharper questions. You want to know what they will find before they find it.",
    href: "/investors",
    linkLabel: "Technical diligence and readiness",
  },
  {
    id: "pricing-margin",
    statement: "“Our pricing isn’t right and we suspect the reason is technical.”",
    body: "Margin is leaking somewhere between what you sell, what it costs to deliver, and what your systems can actually measure. Usually the pricing problem and the data problem are the same problem.",
    href: "/engagements#diagnostic-sprint",
    linkLabel: "Pricing and margin architecture",
  },
  {
    id: "customer-intelligence",
    statement: "“We don’t know our customer as well as we claim.”",
    body: "Every company says it is customer-obsessed. Few can answer basic questions about behavior, cohort, or intent without a two-week analyst detour. I have built the systems that close that gap.",
    href: "/engagements#diagnostic-sprint",
    linkLabel: "Customer intelligence",
  },
  {
    id: "no-owner",
    statement: "“Consequential decisions have no owner.”",
    body: "No CTO, or a CTO stretched past the point of usefulness. Decisions are being made by default, by whoever is loudest, or not at all.",
    href: "/engagements#embedded",
    linkLabel: "Embedded and interim leadership",
  },
] as const;

/**
 * The four questions. Highest-differentiation section on the page — it is the
 * only place the AI capital-allocation argument is made in full.
 */
const FOUR_QUESTIONS = [
  {
    term: "When.",
    body: "Is this a now problem or a next-year problem? Moving early on the wrong layer of the stack is more expensive than moving late on the right one.",
  },
  {
    term: "Where.",
    body: "Which process, which margin line, which customer moment. “Across the business” is not an answer; it is an absence of one.",
  },
  {
    term: "Why.",
    body: "What gets measurably better, and what would falsify the thesis. If nothing would falsify it, you are funding a belief.",
  },
  {
    term: "How much.",
    body: "The real number, including the parts nobody puts in the deck — data readiness, integration, model spend at production volume, and the people who maintain it after launch.",
  },
] as const;

/** The four business surfaces technology is read through. Widens past engineering risk. */
const LENS = [
  {
    term: "Product.",
    body: "What to build, what to buy, what to stop. Sequencing that matches how revenue actually arrives.",
  },
  {
    term: "Pricing.",
    body: "How your model, your unit economics, and your systems’ ability to measure them either agree or quietly do not.",
  },
  {
    term: "Experience.",
    body: "Where the product’s behavior and the customer’s expectation diverge, and what that divergence costs.",
  },
  {
    term: "Customer intelligence.",
    body: "What you can actually know about who buys from you, how fast you can know it, and what it takes to make that knowledge routine rather than heroic.",
  },
] as const;

/**
 * Three decisions, reframed as decision → work → outcome. Every number here is the
 * one that was already published; none was changed to fit the new template. The
 * fourth (customer intelligence) is deliberately absent until there is a real one.
 */
const CASE_STUDIES = [
  {
    label: "Cloud economics",
    metric: "38%",
    narrative:
      "A Series A SaaS company had to decide whether runaway AWS spend meant cutting headcount. The binding constraint was architecture cost drivers, not payroll. Spend fell 38% and release velocity rose.",
  },
  {
    label: "Transaction",
    metric: "$600M",
    narrative:
      "A strategic exit where the decision was how much technical detail to put in front of a buyer before the multiple was set. Diligence pack, architecture narrative, and team story held through buyer technical review.",
  },
  {
    label: "Compliance",
    metric: "6 mo",
    narrative:
      "A growth company believed SOC 2 Type II meant pausing the roadmap. It did not. Controls and evidence landed in six months while product continued to ship on schedule.",
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
      jobTitle: "Technology Advisor",
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
        "Independent technology advisory for executives, boards, and investors. Objective inputs on AI investment, technical diligence, pricing and margin, and customer intelligence.",
      provider: { "@id": `${SITE_URL}/#person` },
      areaServed: "United States",
      /**
       * Decision-advisory first. "Technical due diligence" and "Fractional CTO" are
       * retained deliberately — PE buyers search both, and the ladder still publishes
       * the seat on /engagements.
       */
      serviceType: [
        "Technology advisory",
        "Technical due diligence",
        "AI investment advisory",
        "Fractional CTO",
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
                Technology advisory for consequential decisions
              </h1>
              <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
                Most executives facing a technology decision are not short on opinions. They are
                short on objective inputs. Vendors have a position. Internal teams have a
                preference. Consultancies have a statement of work to protect.
              </p>
              {/* The promise, stated once in the hero and again at the close. Full-strength
                  text-ink against the muted paragraph above — this is the sentence that has
                  to survive a five-second scan. */}
              <p className="mt-4 max-w-measure font-text text-lead text-ink">
                I am vested in your success and I am not encumbered. That combination is the whole
                offer.
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
              <div className="overflow-hidden bg-[#272727]">
                {/* Native img: SVG asset URL; natural dimensions, no fixed aspect box.
                    Constrained to the content column (no right-edge bleed) so the
                    right gutter matches the left for an even page margin. */}
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
          Consequential decisions are landing on people who were never hired to make them.
        </h2>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
          A CEO signs off on an AI budget she cannot independently size. A board approves a platform
          rebuild on the strength of a deck. A fund partner underwrites a thesis that rests on a
          technical claim nobody in the room can verify.
        </p>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          None of these are engineering problems. They are business decisions with a technical basis
          — and the technical basis is the part no one can check.
        </p>
        <p className="mt-4 max-w-measure font-text text-lead text-ink">That is the work.</p>
      </Section>

      <Section spacing="standard" tone="paper" id="decision-doors">
        <Eyebrow>Start here</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Start with the decision, not the org chart.
        </h2>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Pick the one that sounds like your week.
        </p>
        <Grid className="mt-12">
          {DECISION_DOORS.map((item) => (
            <GridItem key={item.id} span={12} md={6} lg={4}>
              <div className="flex h-full flex-col border-t border-ink pt-6">
                <h3 className="max-w-[24ch] font-display text-h3 text-ink">{item.statement}</h3>
                <p className="mt-4 flex-1 font-text text-body text-ink-muted">{item.body}</p>
                <Link
                  href={item.href}
                  className="mt-6 inline-flex items-center gap-2 font-text text-small font-medium text-accent underline-offset-4 hover:underline"
                >
                  {item.linkLabel}
                  <ArrowRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                </Link>
              </div>
            </GridItem>
          ))}
        </Grid>
      </Section>

      <Section spacing="standard" tone="alt" id="four-questions">
        <Eyebrow>AI investment</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Most AI budgets get approved without answering four questions.
        </h2>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
          The move from a pre-generative to a post-generative world is not a technology decision. It
          is a capital allocation decision that happens to involve technology. Four questions decide
          whether the money works:
        </p>
        <Grid className="mt-12">
          {FOUR_QUESTIONS.map((item) => (
            <GridItem key={item.term} span={12} md={6} lg={3}>
              <div className="flex h-full flex-col border-t border-ink pt-6">
                <h3 className="font-display text-h3 text-ink">{item.term}</h3>
                <p className="mt-3 font-text text-body text-ink-muted">{item.body}</p>
              </div>
            </GridItem>
          ))}
        </Grid>
        <p className="mt-12 max-w-measure font-text text-lead text-ink">
          I answer these in your terms — your P&amp;L, your customers, your constraints — and I tell
          you when the answer is <em>not yet</em> or <em>not at all</em>.
        </p>
        <div className="mt-10">
          <Button asChild variant="primary" size="lg">
            <PrimaryCtaLink href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} />
          </Button>
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="lens">
        <Eyebrow>The lens</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          I read technology through the business, not the architecture diagram.
        </h2>
        <Grid className="mt-12">
          {LENS.map((item) => (
            <GridItem key={item.term} span={12} md={6} lg={3}>
              <div className="flex h-full flex-col border-t border-ink pt-6">
                <h3 className="font-display text-h3 text-ink">{item.term}</h3>
                <p className="mt-3 font-text text-body text-ink-muted">{item.body}</p>
              </div>
            </GridItem>
          ))}
        </Grid>
        <p className="mt-12 max-w-measure font-text text-lead text-ink">
          Architecture, security, velocity, and cloud spend all matter. They are inputs. They are not
          the point.
        </p>
      </Section>

      <ProofResults />

      <ProofTestimonials />

      <Section spacing="standard" tone="paper" id="case-studies">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <Eyebrow>Proof</Eyebrow>
            <h2 className="mt-4 font-display text-h2 font-semibold text-ink">
              Three decisions, and what changed.
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

      <Section spacing="standard" tone="paper" id="pattern">
        <Eyebrow>The pattern</Eyebrow>
        {/* h2 for the document outline, text-h3 for weight — this section continues the
            argument THE PROBLEM opened rather than starting a new one. */}
        <h2 className="mt-4 max-w-measure font-display text-h3 font-semibold text-ink">
          It tends to show up in three shapes.
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

      <Section spacing="standard" tone="paper" id="capacity">
        <Eyebrow>Capacity</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Two engagements at a time.
        </h2>
        <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
          That is the capacity, and it is deliberate — the value is my attention, and attention does
          not scale.
        </p>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
          Execution does. When an engagement needs specialist depth I did not bring, I pull in people
          I have worked with directly, under my read and my name. You get a bench without getting a
          pyramid.
        </p>
      </Section>

      <Section spacing="generous" tone="dark" id="promise">
        <div className="max-w-measure">
          <Eyebrow className="text-ink-inverse/60">The promise</Eyebrow>
          <h2 className="mt-4 font-display text-h1 font-semibold text-ink-inverse">
            I am vested in your success. I am not encumbered.
          </h2>
          <p className="mt-6 font-text text-lead text-ink-inverse/85">
            No product to sell you. No implementation revenue waiting on the other side of my
            recommendation. No incentive to make the engagement longer than the problem requires.
          </p>
          <p className="mt-4 font-text text-lead text-ink-inverse">
            If the assessment says you need a full-time hire, or nothing at all, I will say that.
          </p>
          <div className="mt-10">
            <Button asChild variant="onDark" size="lg">
              <PrimaryCtaLink href={PRIMARY_CTA.href} label={PRIMARY_CTA.label} />
            </Button>
          </div>
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="newsletter">
        <Eyebrow>Newsletter</Eyebrow>
        <h2 className="mt-4 max-w-measure font-display text-h2 font-semibold text-ink">
          Operating notes for people who underwrite technology risk.
        </h2>
        <NewsletterForm />
      </Section>

      {/* Close. The `scarcity` slot is the component's small muted line under the CTAs —
          capacity now has its own section, so it carries the location line instead. */}
      <CTABand
        heading="Do you have a problem, and is there a budget against it?"
        body="If yes, that is a short conversation and probably a useful one. If you are not sure yet, that is also a conversation — it just starts further back."
        scarcity="Chicago, IL · San Francisco, CA"
      />
    </>
  );
}
