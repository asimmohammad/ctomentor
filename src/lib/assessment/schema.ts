import { z } from "zod";

export const leadRoleSchema = z.enum([
  "investor-operating-partner",
  "ceo-founder",
  "cto-vp-engineering",
  "board-member",
  "other",
]);

export const assessmentSubmitSchema = z.object({
  variant: z.enum(["investor", "engineering"]).default("investor"),
  lead: z.object({
    email: z.string().trim().email("Enter a valid email address."),
    name: z.string().trim().min(1, "Enter your name.").max(120),
    company: z.string().trim().min(1, "Enter your company or fund.").max(160),
    role: leadRoleSchema,
  }),
  answers: z.record(z.string().min(1), z.string().min(1)),
  idempotencyKey: z.string().trim().max(128).optional(),
});

export type AssessmentSubmitInput = z.infer<typeof assessmentSubmitSchema>;
