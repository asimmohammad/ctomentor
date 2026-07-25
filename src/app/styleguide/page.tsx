import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Button } from "@/components/ui/button";
import { contrastRatio, passesAA } from "@/lib/contrast";
import { dark, light } from "@/lib/token-values";
import { StyleguideRevealDemo } from "./StyleguideRevealDemo";

export const metadata: Metadata = {
  title: "Design System Styleguide",
  robots: { index: false, follow: false },
};

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

export default function StyleguidePage() {
  return (
    <div className="bg-paper text-ink">
      <Section spacing="compact" tone="dark">
        <p className="eyebrow text-ink-inverse/70">Internal · noindex</p>
        <h1 className="mt-3 font-display text-h1 text-ink-inverse">Design system styleguide</h1>
        <p className="mt-4 max-w-measure font-text text-lead text-ink-inverse/80">
          Token-driven palette, type, spacing, and component states from PROJECT_BRIEF §5. Pairs that fail WCAG AA are
          flagged in red.
        </p>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Palette — light</h2>
        <div className="mt-8 space-y-3">
          {LIGHT_SWATCHES.map((s) => (
            <ContrastRow key={s.name} swatch={s} />
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <h2 className="font-display text-h2">Palette — dark theme values</h2>
        <p className="mt-3 max-w-measure text-ink-muted text-body">
          Computed against dark-mode hexes from the brief (previewed here without toggling the document theme).
        </p>
        <div className="mt-8 space-y-3" data-theme="dark">
          {DARK_SWATCHES.map((s) => (
            <ContrastRow key={s.name} swatch={s} />
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Type scale</h2>
        <div className="mt-8 space-y-8">
          {TYPE_ROWS.map((row) => (
            <div key={row.token} className="border-b border-border pb-6">
              <p className="eyebrow text-ink-faint">{row.token}</p>
              <p className={`mt-2 text-ink ${row.className}`}>{row.sample}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <h2 className="font-display text-h2">Spacing scale</h2>
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

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Layout primitives</h2>
        <p className="mt-3 text-body text-ink-muted">Container · 12-column Grid · Section tones</p>
        <div className="mt-8 space-y-6">
          <Grid>
            {Array.from({ length: 12 }).map((_, i) => (
              <GridItem key={i} span={1}>
                <div className="border border-border bg-surface-alt py-4 text-center font-mono text-caption text-ink-muted">
                  {i + 1}
                </div>
              </GridItem>
            ))}
          </Grid>
          <Grid>
            <GridItem span={12} md={6} lg={4}>
              <div className="border border-border bg-surface p-5 text-body">span 4 @lg</div>
            </GridItem>
            <GridItem span={12} md={6} lg={4}>
              <div className="border border-border bg-surface p-5 text-body">span 4 @lg</div>
            </GridItem>
            <GridItem span={12} md={12} lg={4}>
              <div className="border border-border bg-surface p-5 text-body">span 4 @lg</div>
            </GridItem>
          </Grid>
        </div>
      </Section>

      <Section spacing="compact" tone="alt">
        <h2 className="font-display text-h2">Section · compact / alt</h2>
      </Section>
      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Section · standard / paper</h2>
      </Section>
      <Section spacing="generous" tone="dark">
        <h2 className="font-display text-h2 text-ink-inverse">Section · generous / dark</h2>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Buttons</h2>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="primary">Primary</Button>
          <Button variant="outline">Secondary outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
          <Button variant="primary" size="sm">
            Small
          </Button>
          <Button variant="primary" size="lg">
            Large
          </Button>
          <Button variant="primary" size="xl">
            Extra large
          </Button>
        </div>
        <p className="mt-6 text-small text-ink-muted">
          Focus each control with the keyboard — focus-visible ring uses accent at 2px with 2px offset.
        </p>
      </Section>

      <Section spacing="standard" tone="alt">
        <h2 className="font-display text-h2">Cards</h2>
        <Grid className="mt-8">
          <GridItem span={12} md={6}>
            <div className="border border-border bg-surface p-6 transition-colors duration-standard hover:border-ink">
              <h3 className="font-text text-h3">Default card</h3>
              <p className="mt-3 text-body text-ink-muted">1px border, no shadow. Hover raises border to ink.</p>
            </div>
          </GridItem>
          <GridItem span={12} md={6}>
            <div className="border border-ink bg-surface p-6">
              <h3 className="font-text text-h3">Hover / active border</h3>
              <p className="mt-3 text-body text-ink-muted">Shown with ink border applied.</p>
            </div>
          </GridItem>
        </Grid>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Inputs</h2>
        <div className="mt-8 max-w-measure space-y-4">
          <label className="block">
            <span className="eyebrow text-ink-faint">Label</span>
            <input
              className="mt-2 w-full rounded-input border border-border bg-surface px-4 py-3 text-body text-ink placeholder:text-ink-faint"
              placeholder="Placeholder uses ink-faint"
            />
          </label>
          <label className="block">
            <span className="eyebrow text-ink-faint">Focused</span>
            <input
              className="mt-2 w-full rounded-input border border-accent bg-surface px-4 py-3 text-body text-ink outline outline-2 outline-offset-2 outline-accent"
              defaultValue="Focus-visible ring demo"
              readOnly
            />
          </label>
        </div>
      </Section>

      <Section spacing="standard" tone="alt">
        <h2 className="font-display text-h2">Motion · useReveal</h2>
        <p className="mt-3 max-w-measure text-body text-ink-muted">
          Fade 0→1 with 16px upward translate over 400ms. Scroll to trigger. Disabled under prefers-reduced-motion.
        </p>
        <div className="mt-8">
          <StyleguideRevealDemo />
        </div>
      </Section>

      <Section spacing="standard" tone="paper">
        <h2 className="font-display text-h2">Utilities</h2>
        <p className="measure mt-4 text-body">
          .measure caps long-form copy at 68ch. This paragraph should not exceed that measure even inside a full-width
          container.
        </p>
        <p className="metric mt-4 font-text text-h2">
          1,234,567.89
        </p>
        <p className="mt-2 text-caption text-ink-muted">.metric applies tabular-nums lining-nums</p>
      </Section>

      <Container className="pb-16">
        <p className="border-t border-border pt-8 text-caption text-ink-faint">
          /styleguide · robots noindex · review against PROJECT_BRIEF.md §5
        </p>
      </Container>
    </div>
  );
}
