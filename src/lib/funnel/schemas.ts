import { z } from "zod";
import { BUDGET_SELECT_OPTIONS } from "@/lib/pricing";

export const bookPrefillSchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(120),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(1, "Enter your company or fund.").max(160),
  driving: z
    .string()
    .trim()
    .min(3, "Give a short line on what is driving this.")
    .max(280, "Keep it to one line."),
});

export type BookPrefill = z.infer<typeof bookPrefillSchema>;

const budgetValues = BUDGET_SELECT_OPTIONS.map((o) => o.value) as [
  (typeof BUDGET_SELECT_OPTIONS)[number]["value"],
  ...(typeof BUDGET_SELECT_OPTIONS)[number]["value"][],
];

export const engageSchema = z.object({
  name: z.string().trim().min(2, "Enter your name.").max(100),
  email: z.string().trim().email("Enter a valid work email."),
  company: z.string().trim().min(2, "Enter your company.").max(100),
  role: z.string().trim().min(2, "Enter your role.").max(100),
  stage: z.enum(["pre-seed", "seed", "series-a", "later"], {
    required_error: "Select a company stage.",
  }),
  challenge: z
    .string()
    .trim()
    .min(20, "Give enough detail to assess fit (20+ characters).")
    .max(2000),
  budget: z.enum(budgetValues, {
    required_error: "Select a budget.",
  }),
  timeline: z.enum(["immediate", "1-3-months", "exploring"], {
    required_error: "Select a timeline.",
  }),
  attribution: z.string().trim().min(2, "Tell us how you heard about the practice.").max(200),
  equityAlignment: z.string().trim().max(500).optional(),
  companyWebsite: z.string().trim().max(200).optional(),
  phone: z.string().trim().max(40).optional(),
});

export type EngageFormValues = z.infer<typeof engageSchema>;

/** Re-export ladder budget options — single source in lib/pricing.ts. */
export const BUDGET_OPTIONS = BUDGET_SELECT_OPTIONS;

export const TIMELINE_OPTIONS = [
  { value: "immediate", label: "Immediate" },
  { value: "1-3-months", label: "1–3 months" },
  { value: "exploring", label: "Exploring" },
] as const;

export const STAGE_OPTIONS = [
  { value: "pre-seed", label: "Pre-seed" },
  { value: "seed", label: "Seed" },
  { value: "series-a", label: "Series A" },
  { value: "later", label: "Series B+" },
] as const;
