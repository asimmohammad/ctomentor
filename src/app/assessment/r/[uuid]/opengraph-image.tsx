import { ImageResponse } from "next/og";
import { getPublicAssessment } from "@/lib/assessment/store";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Props = { params: { uuid: string } };

export default async function AssessmentOgImage({ params }: Props) {
  const result = await getPublicAssessment(params.uuid);

  const overall = result?.score.overall ?? "—";
  const tier = result
    ? `Level ${result.score.tier.level} ${result.score.tier.name}`
    : "Technical Risk Assessment";
  const subtitle = result
    ? `${result.firstName} · ${result.company}`
    : "Scored technology risk report";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF8F4",
          color: "#16130F",
          padding: "64px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, letterSpacing: "0.12em", textTransform: "uppercase", color: "#6B655C" }}>
          {result?.framingName ?? "Technical Risk Assessment"}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 160, lineHeight: 0.9, fontVariantNumeric: "tabular-nums" }}>{overall}</div>
          <div style={{ marginTop: 16, fontSize: 42 }}>{tier}</div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#6B655C" }}>{subtitle}</div>
        </div>
        <div style={{ display: "flex", fontSize: 22, color: "#2A2825" }}>thectomentor.com</div>
      </div>
    ),
    { ...size },
  );
}
