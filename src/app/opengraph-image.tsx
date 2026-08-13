import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "You own the decision. I make sure it’s an informed one. — Asim Mohammad";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#FAF8F4",
          color: "#16130F",
          padding: "52px",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            width: "100%",
            display: "flex",
            border: "1px solid #DDD8CE",
          }}
        >
          <div
            style={{
              width: "72%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              padding: "52px",
            }}
          >
            <div
              style={{
                display: "flex",
                // 76px was sized for the old 32-character headline. This one is 54 and
                // wrapped to four lines, driving the rule into the last line's baseline.
                fontSize: 60,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                fontWeight: 700,
              }}
            >
              You own the decision. I make sure it’s an informed one.
            </div>
            <div
              style={{
                width: "100%",
                height: "3px",
                marginTop: "40px",
                background: "#2A2825",
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: "26px",
                fontFamily: "Arial, sans-serif",
                fontSize: 23,
              }}
            >
              Technology advisory for consequential decisions. Vested in your success, not
              encumbered by it.
            </div>
          </div>

          <div
            style={{
              width: "28%",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center",
              padding: "52px 28px",
              borderLeft: "1px solid #DDD8CE",
              fontFamily: "Arial, sans-serif",
              fontSize: 20,
              fontWeight: 600,
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "#2A2825",
            }}
          >
            Asim Mohammad
          </div>
        </div>
      </div>
    ),
    size,
  );
}
