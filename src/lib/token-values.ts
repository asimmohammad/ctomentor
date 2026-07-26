/**
 * Hex mirrors of src/app/styles/tokens.css for contrast math / styleguide only.
 * Styling must use CSS variables — do not import these into UI classNames.
 */
export const light = {
  paper: "#FAF8F4",
  surface: "#FFFFFF",
  surfaceAlt: "#F2EFE9",
  ink: "#16130F",
  inkMuted: "#6B655C",
  inkFaint: "#A39C90",
  border: "#DDD8CE",
  accent: "#2A2825",
  accentHover: "#16130F",
  inkInverse: "#FAF8F4",
  inkMutedInverse: "#B3ADA2",
  inkFaintInverse: "#8A847A",
  darkBand: "#16130F",
  success: "#3F6B32",
  warning: "#8A5A17",
  error: "#3F3C38",
} as const;

export const dark = {
  paper: "#14120F",
  surface: "#1A1815",
  surfaceAlt: "#201D19",
  ink: "#E8E4DC",
  inkMuted: "#9A9388",
  inkFaint: "#6B655C",
  border: "#33302B",
  accent: "#C4BFB5",
  accentHover: "#E8E4DC",
  inkInverse: "#FAF8F4",
  inkMutedInverse: "#B3ADA2",
  inkFaintInverse: "#8A847A",
  darkBand: "#16130F",
  success: "#3F6B32",
  warning: "#8A5A17",
  error: "#C4BFB5",
} as const;
