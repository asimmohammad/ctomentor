import type { Config } from "tailwindcss";

export default {
  darkMode: ["selector", '[data-theme="dark"]'],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "var(--gutter)",
      screens: {
        "2xl": "var(--content-max)",
      },
    },
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        text: ["var(--font-text)"],
        mono: ["var(--font-mono)"],
        heading: ["var(--font-display)"],
        body: ["var(--font-text)"],
      },
      fontSize: {
        hero: ["var(--fs-hero)", { lineHeight: "var(--lh-hero)", letterSpacing: "var(--tr-hero)", fontWeight: "800" }],
        h1: ["var(--fs-h1)", { lineHeight: "var(--lh-h1)", letterSpacing: "var(--tr-h1)", fontWeight: "700" }],
        h2: ["var(--fs-h2)", { lineHeight: "var(--lh-h2)", letterSpacing: "var(--tr-h2)", fontWeight: "700" }],
        h3: ["var(--fs-h3)", { lineHeight: "var(--lh-h3)", letterSpacing: "var(--tr-h3)", fontWeight: "600" }],
        h4: ["var(--fs-h4)", { lineHeight: "var(--lh-h4)", letterSpacing: "var(--tr-h4)", fontWeight: "600" }],
        lead: ["var(--fs-lead)", { lineHeight: "var(--lh-lead)", letterSpacing: "var(--tr-lead)", fontWeight: "400" }],
        body: ["var(--fs-body)", { lineHeight: "var(--lh-body)", letterSpacing: "var(--tr-body)", fontWeight: "400" }],
        small: ["var(--fs-small)", { lineHeight: "var(--lh-small)", letterSpacing: "var(--tr-small)", fontWeight: "400" }],
        caption: [
          "var(--fs-caption)",
          { lineHeight: "var(--lh-caption)", letterSpacing: "var(--tr-caption)", fontWeight: "500" },
        ],
        eyebrow: [
          "var(--fs-eyebrow)",
          { lineHeight: "var(--lh-eyebrow)", letterSpacing: "var(--tr-eyebrow)", fontWeight: "500" },
        ],
      },
      colors: {
        paper: "var(--paper)",
        surface: "var(--surface)",
        "surface-alt": "var(--surface-alt)",
        ink: {
          DEFAULT: "var(--ink)",
          muted: "var(--ink-muted)",
          faint: "var(--ink-faint)",
          inverse: "var(--ink-inverse)",
        },
        border: "var(--border)",
        accent: {
          DEFAULT: "var(--accent)",
          hover: "var(--accent-hover)",
          foreground: "var(--accent-foreground)",
        },
        "dark-band": "var(--dark-band)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        heading: "var(--ink)",
        subtle: "var(--ink-muted)",
        divider: "var(--border)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar-background)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
      },
      spacing: {
        /* Brief scale as explicit tokens — do not clobber Tailwind 1–11 (breaks h-10, etc.) */
        "space-1": "var(--space-1)",
        "space-2": "var(--space-2)",
        "space-3": "var(--space-3)",
        "space-4": "var(--space-4)",
        "space-5": "var(--space-5)",
        "space-6": "var(--space-6)",
        "space-7": "var(--space-7)",
        "space-8": "var(--space-8)",
        "space-9": "var(--space-9)",
        "space-10": "var(--space-10)",
        "space-11": "var(--space-11)",
        gutter: "var(--gutter)",
        "header-offset": "var(--header-height)",
      },
      maxWidth: {
        content: "var(--content-max)",
        measure: "var(--measure)",
      },
      borderRadius: {
        none: "var(--radius-none)",
        input: "var(--radius-input)",
        lg: "var(--radius-none)",
        md: "var(--radius-none)",
        sm: "var(--radius-none)",
      },
      transitionDuration: {
        micro: "var(--duration-micro)",
        standard: "var(--duration-standard)",
        entrance: "var(--duration-entrance)",
      },
      transitionTimingFunction: {
        standard: "var(--ease-standard)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down var(--duration-standard) var(--ease-standard)",
        "accordion-up": "accordion-up var(--duration-standard) var(--ease-standard)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
