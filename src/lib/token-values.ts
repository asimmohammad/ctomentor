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
  accent: "#8A2B22",
  accentHover: "#6E211A",
  inkInverse: "#FAF8F4",
  darkBand: "#16130F",
  success: "#3F6B32",
  warning: "#8A5A17",
  error: "#A12C2C",
} as const;

export const dark = {
  paper: "#14120F",
  surface: "#1A1815",
  surfaceAlt: "#201D19",
  ink: "#E8E4DC",
  inkMuted: "#9A9388",
  inkFaint: "#6B655C",
  border: "#33302B",
  accent: "#C9564A",
  accentHover: "#DE6B5E",
  inkInverse: "#FAF8F4",
  darkBand: "#16130F",
  success: "#3F6B32",
  warning: "#8A5A17",
  error: "#A12C2C",
} as const;
