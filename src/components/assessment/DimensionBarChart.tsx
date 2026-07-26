/**
 * Horizontal bar chart — chosen over radar because four labelled axes plus a
 * benchmark line remain legible at 390px; radar labels collide and require a
 * legend, which this design forbids.
 */
export type DimensionBar = {
  id: string;
  label: string;
  /** User score 0–100. */
  value: number;
  /** Benchmark 0–100. */
  benchmark: number;
};

export function DimensionBarChart({
  dimensions,
  benchmarkLabel = "Median for companies at your stage",
}: {
  dimensions: DimensionBar[];
  benchmarkLabel?: string;
}) {
  const width = 640;
  const rowHeight = 56;
  const labelWidth = 168;
  const chartLeft = labelWidth + 12;
  const chartWidth = width - chartLeft - 48;
  const height = dimensions.length * rowHeight + 36;

  return (
    <figure className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Dimension scores compared to stage median"
        className="h-auto w-full min-w-[20rem]"
      >
        <title>Dimension scores vs stage median</title>
        {dimensions.map((dimension, index) => {
          const y = index * rowHeight + 8;
          const barY = y + 18;
          const userWidth = (dimension.value / 100) * chartWidth;
          const benchX = chartLeft + (dimension.benchmark / 100) * chartWidth;

          return (
            <g key={dimension.id}>
              <text
                x={0}
                y={barY + 11}
                className="fill-ink"
                style={{ fontFamily: "var(--font-text)", fontSize: 13 }}
              >
                {dimension.label}
              </text>
              {/* Track */}
              <rect
                x={chartLeft}
                y={barY}
                width={chartWidth}
                height={16}
                fill="var(--surface-alt)"
              />
              {/* User score — solid fill */}
              <rect
                x={chartLeft}
                y={barY}
                width={Math.max(userWidth, 0)}
                height={16}
                fill="var(--ink)"
              />
              {/* Benchmark — dashed vertical tick + diamond, not color-only */}
              <line
                x1={benchX}
                x2={benchX}
                y1={barY - 4}
                y2={barY + 20}
                stroke="var(--accent)"
                strokeWidth={2}
                strokeDasharray="3 3"
              />
              <polygon
                points={`${benchX},${barY - 6} ${benchX + 5},${barY} ${benchX},${barY + 6} ${benchX - 5},${barY}`}
                fill="var(--accent)"
              />
              <text
                x={chartLeft + chartWidth + 8}
                y={barY + 12}
                className="fill-ink"
                style={{
                  fontFamily: "var(--font-text)",
                  fontSize: 13,
                  fontVariantNumeric: "tabular-nums",
                }}
              >
                {dimension.value}
              </text>
            </g>
          );
        })}
        <g transform={`translate(${chartLeft}, ${height - 18})`}>
          <rect x={0} y={0} width={14} height={10} fill="var(--ink)" />
          <text
            x={20}
            y={9}
            style={{ fontFamily: "var(--font-text)", fontSize: 11, fill: "var(--ink-muted)" }}
          >
            Your score
          </text>
          <line
            x1={110}
            x2={110}
            y1={-2}
            y2={12}
            stroke="var(--accent)"
            strokeWidth={2}
            strokeDasharray="3 3"
          />
          <polygon
            points="110,-4 115,3 110,10 105,3"
            fill="var(--accent)"
          />
          <text
            x={122}
            y={9}
            style={{ fontFamily: "var(--font-text)", fontSize: 11, fill: "var(--ink-muted)" }}
          >
            {benchmarkLabel}
          </text>
        </g>
      </svg>
    </figure>
  );
}
