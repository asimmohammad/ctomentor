"use client";

import * as React from "react";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Card } from "@/components/Card";
import { MetricCard } from "@/components/MetricCard";
import { Input } from "@/components/Input";
import { Textarea } from "@/components/Textarea";
import { Select } from "@/components/Select";
import { Accordion } from "@/components/Accordion";
import { CTABand } from "@/components/CTABand";
import { ProofBar } from "@/components/ProofBar";
import { contrastRatio, passesAA } from "@/lib/contrast";
import { dark, light } from "@/lib/token-values";
import { StyleguideRevealDemo } from "./StyleguideRevealDemo";

type Swatch = {
  name: string;
  token: string;
  hex: string;
  on: string;
  onHex: string;
  large?: boolean;
};

const LIGHT_SWATCHES: Swatch[] = [
  { name: "Ink on paper", token: "--ink / --paper", hex: light.ink, on: "--paper", onHex: light.paper },
  { name: "Ink-muted on paper", token: "--ink-muted / --paper", hex: light.inkMuted, on: "--paper", onHex: light.paper },
  { name: "Ink-faint on paper", token: "--ink-faint / --paper", hex: light.inkFaint, on: "--paper", onHex: light.paper },
  { name: "Accent on paper", token: "--accent / --paper", hex: light.accent, on: "--paper", onHex: light.paper },
  { name: "Ink on surface", token: "--ink / --surface", hex: light.ink, on: "--surface", onHex: light.surface },
  { name: "Ink on surface-alt", token: "--ink / --surface-alt", hex: light.ink, on: "--surface-alt", onHex: light.surfaceAlt },
  { name: "Inverse on dark-band", token: "--ink-inverse / --dark-band", hex: light.inkInverse, on: "--dark-band", onHex: light.darkBand },
  {
    name: "Inverse muted on dark-band",
    token: "--ink-muted-inverse / --dark-band",
    hex: light.inkMutedInverse,
    on: "--dark-band",
    onHex: light.darkBand,
  },
  {
    name: "Inverse faint on dark-band",
    token: "--ink-faint-inverse / --dark-band",
    hex: light.inkFaintInverse,
    on: "--dark-band",
    onHex: light.darkBand,
  },
  { name: "Accent on dark-band", token: "--accent / --dark-band", hex: light.accent, on: "--dark-band", onHex: light.darkBand },
  { name: "Success on paper", token: "--success / --paper", hex: light.success, on: "--paper", onHex: light.paper },
  { name: "Warning on paper", token: "--warning / --paper", hex: light.warning, on: "--paper", onHex: light.paper },
  { name: "Error on paper", token: "--error / --paper", hex: light.error, on: "--paper", onHex: light.paper },
  { name: "Hero ink (large)", token: "--ink / --paper", hex: light.ink, on: "--paper", onHex: light.paper, large: true },
];

const DARK_SWATCHES: Swatch[] = [
  { name: "Ink on paper (dark)", token: "--ink / --paper", hex: dark.ink, on: "--paper", onHex: dark.paper },
  { name: "Ink-muted on paper (dark)", token: "--ink-muted / --paper", hex: dark.inkMuted, on: "--paper", onHex: dark.paper },
  { name: "Accent on paper (dark)", token: "--accent / --paper", hex: dark.accent, on: "--paper", onHex: dark.paper },
  { name: "Ink on surface (dark)", token: "--ink / --surface", hex: dark.ink, on: "--surface", onHex: dark.surface },
];

const TYPE_ROWS = [
  { token: "--fs-hero", className: "font-display text-hero", sample: "Hero display" },
  { token: "--fs-h1", className: "font-display text-h1", sample: "Heading one" },
  { token: "--fs-h2", className: "font-display text-h2", sample: "Heading two" },
  { token: "--fs-h3", className: "font-text text-h3 font-semibold", sample: "Heading three" },
  { token: "--fs-h4", className: "font-text text-h4 font-semibold", sample: "Heading four" },
  { token: "--fs-lead", className: "font-text text-lead", sample: "Lead paragraph for supporting copy under a headline." },
  { token: "--fs-body", className: "font-text text-body", sample: "Body text set in Switzer for long-form reading and UI." },
  { token: "--fs-small", className: "font-text text-small", sample: "Small text for denser UI and secondary notes." },
  { token: "--fs-caption", className: "font-text text-caption", sample: "Caption / metadata line" },
  { token: "--fs-eyebrow", className: "font-mono text-eyebrow uppercase", sample: "Eyebrow label" },
];

const SPACING = [
  ["--space-1", "4"],
  ["--space-2", "8"],
  ["--space-3", "12"],
  ["--space-4", "16"],
  ["--space-5", "24"],
  ["--space-6", "32"],
  ["--space-7", "48"],
  ["--space-8", "64"],
  ["--space-9", "96"],
  ["--space-10", "128"],
  ["--space-11", "160"],
] as const;

function ContrastRow({ swatch }: { swatch: Swatch }) {
  const ratio = contrastRatio(swatch.hex, swatch.onHex);
  const ok = passesAA(ratio, swatch.large);
  return (
    <div
      className="flex flex-col gap-3 border border-border p-5 md:flex-row md:items-center md:justify-between"
      style={{ backgroundColor: swatch.onHex, color: swatch.hex }}
    >
      <div>
        <p className={swatch.large ? "font-display text-h2" : "font-text text-body"}>{swatch.name}</p>
        <p className="font-mono text-caption opacity-80">{swatch.token}</p>
      </div>
      <div className="font-mono text-small">
        <span className="metric">{ratio.toFixed(2)}:1</span>
        {ok ? (
          <span className="ml-3 text-success">AA pass</span>
        ) : (
          <span className="ml-3 bg-error px-2 py-1 font-semibold text-ink-inverse">AA FAIL</span>
        )}
      </div>
    </div>
  );
}

const FAQ_ITEMS = [
  {
    id: "faq-1",
    title: "What is the Diagnostic Sprint?",
    content:
      "A fixed-scope Diagnostic Sprint over three weeks: findings report, scored risk register, 90-day remediation plan, and a board or deal-team readout.",
  },
  {
    id: "faq-2",
    title: "Who is this for?",
    content:
      "PE/VC deal and operating partners, and CEOs or boards at Series A–C software companies where technology risk is material to the investment thesis.",
  },
  {
    id: "faq-3",
    title: "How do engagements start?",
    content:
      "Cold traffic takes the Technical Risk Assessment. Qualified conversations book a confidential call. Application forms are bottom-of-funnel only.",
  },
];

export default function StyleguideClient() {
  const [loading, setLoading] = React.useState(false);

  return (
    <div className="bg-paper text-ink">
      <Section spacing="compact" tone="dark">
        <Eyebrow className="text-ink-inverse/70">Internal · noindex</Eyebrow>
        <h1 className="mt-3 font-display text-h1 text-ink-inverse">Design system styleguide</h1>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-inverse/80">
          Tokens, type, spacing, and every shared component variant and state from PROJECT_BRIEF §5.
        </p>
      </Section>

      <Section spacing="standard" tone="paper">
        <Eyebrow>Color</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Palette — light</h2>
        <div className="mt-8 space-y-3">
          {LIGHT_SWATCHES.map((s) => (
            <ContrastRow key={s.name} swatch={s} />
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <Eyebrow>Color</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Palette — dark theme values</h2>
        <div className="mt-8 space-y-3" data-theme="dark">
          {DARK_SWATCHES.map((s) => (
            <ContrastRow key={s.name} swatch={s} />
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="paper">
        <Eyebrow>Typography</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Type scale</h2>
        <div className="mt-8 space-y-8">
          {TYPE_ROWS.map((row) => (
            <div key={row.token} className="border-b border-border pb-6">
              <p className="font-mono text-caption text-ink-faint">{row.token}</p>
              <p className={`mt-2 text-ink ${row.className}`}>{row.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <Eyebrow>Spacing</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Spacing scale</h2>
        <div className="mt-8 space-y-4">
          {SPACING.map(([token, px]) => (
            <div key={token} className="flex items-center gap-4">
              <span className="w-40 shrink-0 font-mono text-caption text-ink-muted">
                {token} · {px}
              </span>
              <div className="h-4 bg-accent" style={{ width: `var(${token})` }} />
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="paper" id="button">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Button</h2>
        <div className="mt-8 space-y-8">
          <div>
            <p className="mb-3 font-text text-caption text-ink-muted">Variants</p>
            <div className="flex flex-wrap gap-4">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
            </div>
          </div>
          <div>
            <p className="mb-3 font-text text-caption text-ink-muted">Sizes</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
          </div>
          <div>
            <p className="mb-3 font-text text-caption text-ink-muted">Arrow · loading · disabled · asChild</p>
            <div className="flex flex-wrap items-center gap-4">
              <Button arrow>With arrow</Button>
              <Button
                loading={loading}
                onClick={() => {
                  setLoading(true);
                  window.setTimeout(() => setLoading(false), 1500);
                }}
              >
                {loading ? "Submitting" : "Trigger loading"}
              </Button>
              <Button disabled>Disabled</Button>
              <Button asChild variant="secondary">
                <Link href="/assessment" className="inline-flex items-center gap-2">
                  asChild Link
                  <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* On-dark variants live on a dark band — a light-page sample cannot catch a
          cream-fill-plus-cream-label regression. */}
      <Section spacing="standard" tone="dark" id="button-on-dark">
        <Eyebrow className="text-ink-inverse/70">Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Button — on dark</h2>
        <p className="mt-3 max-w-measure font-text text-body text-ink-muted">
          Every label below must be readable. Charcoal accent disappears here, so primary CTAs
          switch to the light-filled onDark variant.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Button variant="onDark">onDark</Button>
          <Button variant="secondaryOnDark">secondaryOnDark</Button>
          <Button variant="outlineOnDark">outlineOnDark</Button>
          <Button variant="ghostOnDark">ghostOnDark</Button>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-4">
          <Button variant="onDark" size="sm">
            Small
          </Button>
          <Button variant="onDark" size="md">
            Medium
          </Button>
          <Button variant="onDark" size="lg" arrow>
            Large
          </Button>
          <Button variant="onDark" disabled>
            Disabled
          </Button>
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="eyebrow">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Eyebrow</h2>
        <div className="mt-8 space-y-3">
          <Eyebrow>Section label</Eyebrow>
          <Eyebrow>Technical due diligence</Eyebrow>
        </div>
      </Section>

      <Section spacing="standard" tone="paper" id="card">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Card</h2>
        <Grid className="mt-8">
          <GridItem span={12} md={4}>
            <Card variant="default">
              <h3 className="font-text text-h4">Default</h3>
              <p className="mt-3 font-text text-body text-ink-muted">1px border. Hover raises border to ink.</p>
            </Card>
          </GridItem>
          <GridItem span={12} md={4}>
            <Card variant="emphasized">
              <h3 className="font-text text-h4">Emphasized</h3>
              <p className="mt-3 font-text text-body text-ink-muted">For the middle pricing tier.</p>
            </Card>
          </GridItem>
          <GridItem span={12} md={4}>
            <Card variant="dark">
              <h3 className="font-text text-h4 text-ink-inverse">Dark</h3>
              <p className="mt-3 font-text text-body text-ink-inverse/80">Dark-band surface for inverse contexts.</p>
            </Card>
          </GridItem>
        </Grid>
      </Section>

      <Section spacing="standard" tone="alt" id="metric-card">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">MetricCard</h2>
        <Grid className="mt-8">
          <GridItem span={12} md={4}>
            <MetricCard
              label="Cloud economics"
              metric="38%"
              narrative="Reduction in cloud spend while increasing delivery velocity on a Series A SaaS platform."
            />
          </GridItem>
          <GridItem span={12} md={4}>
            <MetricCard
              label="Compliance"
              metric="6 mo"
              narrative="SOC 2 Type II certification completed with architecture and process remediation."
              variant="emphasized"
            />
          </GridItem>
          <GridItem span={12} md={4}>
            <MetricCard
              label="Transaction"
              metric="$600M"
              narrative="Technical readiness supporting a successful exit — architecture, team, and diligence."
              variant="dark"
            />
          </GridItem>
        </Grid>
      </Section>

      <Section spacing="standard" tone="paper" id="forms">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Input · Textarea · Select</h2>
        <div className="mt-8 grid max-w-measure gap-8">
          <Input label="Full name" helperText="As it should appear on the engagement letter." placeholder="Jane Doe" />
          <Input label="Work email" error="Enter a valid work email address." defaultValue="not-an-email" />
          <Textarea
            label="Challenge"
            helperText="Be specific about stakes and timing."
            placeholder="Describe the primary technology risk."
          />
          <Textarea label="Notes" error="This field is required for diligence scoping." />
          <Select
            label="Company stage"
            helperText="Select the closest stage."
            placeholder="Select stage"
            defaultValue=""
            options={[
              { value: "seed", label: "Seed" },
              { value: "series-a", label: "Series A" },
              { value: "later", label: "Series B+" },
            ]}
          />
          <Select
            label="Engagement model"
            error="Select an engagement model."
            defaultValue=""
            placeholder="Select engagement"
            options={[
              { value: "sprint", label: "Diagnostic Sprint" },
              { value: "embedded", label: "Embedded Technology Leadership" },
              { value: "dd", label: "Technical Due Diligence" },
            ]}
          />
        </div>
      </Section>

      <Section spacing="standard" tone="alt" id="accordion">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Accordion</h2>
        <div className="mt-8 max-w-measure space-y-10">
          <div>
            <p className="mb-3 font-text text-caption text-ink-muted">singleOpen (default)</p>
            <Accordion items={FAQ_ITEMS} singleOpen />
          </div>
          <div>
            <p className="mb-3 font-text text-caption text-ink-muted">multi-open</p>
            <Accordion items={FAQ_ITEMS} singleOpen={false} defaultOpenIds={["faq-1"]} />
          </div>
        </div>
      </Section>

      <Section spacing="standard" tone="paper" id="proof-bar">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 font-display text-h2">ProofBar</h2>
        <p className="mt-3 max-w-measure font-text text-body text-ink-muted">
          No logos configured — fallback metrics render. Add entries in{" "}
          <code className="font-mono text-caption">src/config/proof-bar.ts</code> and drop files under{" "}
          <code className="font-mono text-caption">/public/logos</code>.
        </p>
      </Section>
      <ProofBar />

      <Section spacing="standard" tone="paper" id="cta-band">
        <Eyebrow>Components</Eyebrow>
        <h2 className="mt-3 mb-8 font-display text-h2">CTABand</h2>
      </Section>
      <CTABand
        heading="Start with the risk, not the retainer."
        body="Complete the Technical Risk Assessment, or request a confidential conversation if you already know the shape of the work."
        scarcity="Two Diagnostic Sprint slots remaining this quarter."
      />

      <Section spacing="standard" tone="alt" id="motion">
        <Eyebrow>Motion</Eyebrow>
        <h2 className="mt-3 font-display text-h2">useReveal</h2>
        <div className="mt-8">
          <StyleguideRevealDemo />
        </div>
      </Section>

      <Section spacing="compact" tone="paper">
        <Eyebrow>Chrome</Eyebrow>
        <h2 className="mt-3 font-display text-h2">Nav · Footer</h2>
        <p className="mt-4 max-w-measure font-text text-body text-ink-muted">
          Sticky Nav (transparent → solid on scroll) and four-column Footer are live in the root layout. Scroll this
          page and resize to 390px to verify the mobile drawer.
        </p>
      </Section>

      <Container className="pb-16">
        <p className="border-t border-border pt-8 text-caption text-ink-faint">
          /styleguide · robots noindex · review against PROJECT_BRIEF.md §5
        </p>
      </Container>
    </div>
  );
}
