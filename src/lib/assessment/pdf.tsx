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
    bottom: 32,
    left: 48,
    right: 48,
    fontSize: 9,
    color: colors.faint,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 8,
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

        <Text style={styles.sectionTitle}>Interpretation</Text>
        {result.narratives.map((narrative) => (
          <View key={narrative.id} style={styles.card} wrap={false}>
            <Text style={styles.h4}>
              {narrative.name} — {narrative.percentage}
            </Text>
            <Text style={styles.body}>{narrative.interpretation}</Text>
            <Text>Recommended action. {narrative.action}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Highest-risk areas</Text>
        {result.risks.map((risk, index) => (
          <View key={risk.questionId} style={styles.card} wrap={false}>
            <Text style={styles.eyebrow}>
              {index + 1} · {risk.dimensionName} · {risk.score}/3
            </Text>
            <Text style={styles.h4}>{risk.prompt}</Text>
            <Text style={styles.body}>{risk.action}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Confidential · Generated for {result.firstName} at {result.company} · thectomentor.com
        </Text>
      </Page>
    </Document>
  );
}

export async function renderAssessmentPdf(result: PublicAssessmentResult): Promise<Buffer> {
  const buffer = await renderToBuffer(<AssessmentPdfDocument result={result} />);
  return Buffer.from(buffer);
}
