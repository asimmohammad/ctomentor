import React from "react";
import { Document, Page, Text, View, StyleSheet, renderToBuffer } from "@react-pdf/renderer";
import type { PublicAssessmentResult } from "./store";

const colors = {
  paper: "#FAF8F4",
  ink: "#16130F",
  muted: "#6B655C",
  faint: "#A39C90",
  border: "#DDD8CE",
  accent: "#2A2825",
  surfaceAlt: "#F2EFE9",
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: colors.paper,
    color: colors.ink,
    paddingTop: 48,
    paddingBottom: 48,
    paddingHorizontal: 48,
    fontFamily: "Times-Roman",
    fontSize: 11,
    lineHeight: 1.5,
  },
  brandRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 26,
  },
  brandLockup: {
    flexDirection: "row",
    alignItems: "center",
  },
  // The site mark is a solid black tile reading "#TCM". Drawn with primitives
  // rather than an embedded asset so the PDF has no runtime file dependency.
  brandMark: {
    backgroundColor: colors.ink,
    paddingVertical: 6,
    paddingHorizontal: 8,
    marginRight: 9,
  },
  brandMarkText: {
    color: colors.paper,
    fontFamily: "Helvetica-Bold",
    fontSize: 13,
    letterSpacing: 1.2,
    lineHeight: 1,
  },
  brandWordmark: {
    fontFamily: "Times-Bold",
    fontSize: 13,
    letterSpacing: 0.3,
  },
  brandContact: {
    textAlign: "right",
    fontSize: 8.5,
    color: colors.muted,
    lineHeight: 1.45,
  },
  brandContactName: {
    fontFamily: "Times-Bold",
    fontSize: 9.5,
    color: colors.ink,
  },
  eyebrow: {
    fontSize: 9,
    letterSpacing: 1.5,
    textTransform: "uppercase",
    color: colors.muted,
    marginBottom: 8,
  },
  heroScore: {
    fontSize: 64,
    fontFamily: "Times-Bold",
    marginTop: 12,
    // Explicit line height: the inherited page value produces a line box
    // shorter than a 64pt glyph, so the tier line rendered on top of the score.
    lineHeight: 1.15,
    marginBottom: 4,
  },
  tier: {
    fontSize: 22,
    fontFamily: "Times-Bold",
    lineHeight: 1.3,
    marginTop: 6,
  },
  muted: {
    color: colors.muted,
    marginTop: 8,
    maxWidth: 420,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: "Times-Bold",
    marginTop: 28,
    marginBottom: 12,
  },
  barRow: {
    marginBottom: 14,
  },
  barLabel: {
    fontSize: 10,
    marginBottom: 4,
  },
  track: {
    height: 10,
    backgroundColor: colors.surfaceAlt,
    position: "relative",
  },
  fill: {
    height: 10,
    backgroundColor: colors.ink,
  },
  bench: {
    position: "absolute",
    top: -2,
    width: 2,
    height: 14,
    backgroundColor: colors.accent,
  },
  meta: {
    fontSize: 9,
    color: colors.faint,
    marginTop: 4,
  },
  card: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    marginBottom: 10,
  },
  h4: {
    fontSize: 13,
    fontFamily: "Times-Bold",
    marginBottom: 6,
  },
  body: {
    color: colors.muted,
    marginBottom: 6,
  },
  footer: {
    position: "absolute",
    bottom: 28,
    left: 48,
    right: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8.5,
    color: colors.faint,
  },
});

function Bar({
  label,
  value,
  benchmark,
}: {
  label: string;
  value: number;
  benchmark: number;
}) {
  return (
    <View style={styles.barRow}>
      <Text style={styles.barLabel}>
        {label} — {value} (median {benchmark})
      </Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${Math.min(100, Math.max(0, value))}%` }]} />
        <View style={[styles.bench, { left: `${Math.min(100, Math.max(0, benchmark))}%` }]} />
      </View>
      <Text style={styles.meta}>Solid bar = your score · Accent tick = stage median</Text>
    </View>
  );
}

export function AssessmentPdfDocument({ result }: { result: PublicAssessmentResult }) {
  return (
    <Document
      title={`${result.framingName} — ${result.score.overall}`}
      author="Asim Mohammad"
      subject="Technical risk assessment results"
    >
      <Page size="A4" style={styles.page}>
        <View style={styles.brandRow}>
          <View style={styles.brandLockup}>
            <View style={styles.brandMark}>
              <Text style={styles.brandMarkText}>#TCM</Text>
            </View>
            <Text style={styles.brandWordmark}>The CTO Mentor</Text>
          </View>
          <View style={styles.brandContact}>
            <Text style={styles.brandContactName}>Asim Mohammad</Text>
            <Text>asim@thectomentor.com</Text>
            <Text>thectomentor.com</Text>
          </View>
        </View>

        <Text style={styles.eyebrow}>{result.framingName}</Text>
        <Text>
          {result.firstName} · {result.company}
        </Text>
        <Text style={styles.heroScore}>{result.score.overall}</Text>
        <Text style={styles.tier}>
          Level {result.score.tier.level} {result.score.tier.name}
        </Text>
        <Text style={styles.muted}>
          Overall score is the mean of four dimension scores, each normalized to 0–100.
        </Text>

        <Text style={styles.sectionTitle}>Dimensions vs stage median</Text>
        {result.score.dimensions.map((dimension) => (
          <Bar
            key={dimension.id}
            label={dimension.name}
            value={dimension.percentage}
            benchmark={result.benchmarks[dimension.id] ?? 50}
          />
        ))}

        {/* Heading grouped with its first card in a non-wrapping View: a bare
            heading was being stranded at the foot of a page with its content
            overleaf. `minPresenceAhead` on the Text did not prevent it. */}
        {result.narratives.map((narrative, index) => {
          const card = (
            <View key={narrative.id} style={styles.card} wrap={false}>
              <Text style={styles.h4}>
                {narrative.name} — {narrative.percentage}
              </Text>
              <Text style={styles.body}>{narrative.interpretation}</Text>
              <Text>Recommended action. {narrative.action}</Text>
            </View>
          );
          if (index > 0) return card;
          return (
            <View key={`interpretation-${narrative.id}`} wrap={false}>
              <Text style={styles.sectionTitle}>Interpretation</Text>
              {card}
            </View>
          );
        })}

        {result.risks.map((risk, index) => {
          const card = (
            <View key={risk.questionId} style={styles.card} wrap={false}>
              <Text style={styles.eyebrow}>
                {index + 1} · {risk.dimensionName} · {risk.score}/3
              </Text>
              <Text style={styles.h4}>{risk.prompt}</Text>
              <Text style={styles.body}>{risk.action}</Text>
            </View>
          );
          if (index > 0) return card;
          return (
            <View key={`risks-${risk.questionId}`} wrap={false}>
              <Text style={styles.sectionTitle}>Highest-risk areas</Text>
              {card}
            </View>
          );
        })}

        {/* `fixed` so the attribution repeats on every page, not just page one. */}
        <View style={styles.footer} fixed>
          <Text style={styles.footerText}>
            Confidential · Prepared for {result.firstName} at {result.company}
          </Text>
          <Text style={styles.footerText}>
            Asim Mohammad · asim@thectomentor.com · thectomentor.com
          </Text>
        </View>
      </Page>
    </Document>
  );
}

export async function renderAssessmentPdf(result: PublicAssessmentResult): Promise<Buffer> {
  const buffer = await renderToBuffer(<AssessmentPdfDocument result={result} />);
  return Buffer.from(buffer);
}
