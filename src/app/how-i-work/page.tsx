import type { Metadata } from "next";
import { CTABand } from "@/components/CTABand";
import { Eyebrow } from "@/components/Eyebrow";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";

const SITE = "https://thectomentor.com";

export const metadata: Metadata = {
  title: "How I Work",
  description:
    "The four questions I ask before an engagement: what problem, who with, how fast, and what budget sits against it. Published up front rather than asked on a call.",
  alternates: { canonical: `${SITE}/how-i-work` },
  openGraph: {
    title: "How I Work",
    description:
      "The four questions I ask before an engagement, published up front. If they have clean answers, the engagement is usually short and worth it.",
    url: `${SITE}/how-i-work`,
    type: "website",
  },
};

/**
 * Published intake questions. Self-selects on problem and budget before a call —
 * moved off the homepage to its own route so the nav item is backed by a page
 * rather than an anchor into a section that could move.
 */
const HOW_I_WORK = [
  {
    question: "What problem are you going after?",
    body: "Not the initiative. The problem. If we cannot state it in a sentence, we are not ready to spend against it.",
  },
  {
    question: "Who can you solve this with?",
    body: "Every plan is constrained by the people you actually have. I assess the team you have, not the team the plan assumes.",
  },
  {
    question: "How fast can you move?",
    body: "Your real cadence, including procurement, legal, and the two people whose approval everything waits on.",
  },
  {
    question: "What is the budget against this problem?",
    body: "Not your total spend. The money allocated to this. A problem without a budget is a conversation, and I am happy to have it, but we should both know which one we are having.",
  },
] as const;

export default function HowIWorkPage() {
  return (
    <>
      <Section spacing="compact" tone="paper">
        <Eyebrow>How I work</Eyebrow>
        <h1 className="mt-3 max-w-measure font-display text-h1 font-semibold text-ink">
          These are the questions I will ask you. You may as well see them now.
        </h1>
      </Section>

      <Section spacing="standard" tone="paper">
        <Grid>
          {HOW_I_WORK.map((item) => (
            <GridItem key={item.question} span={12} md={6}>
              <div className="flex h-full flex-col border-t border-ink pt-6">
                <h2 className="max-w-[30ch] font-display text-h3 text-ink">{item.question}</h2>
                <p className="mt-3 max-w-measure font-text text-body text-ink-muted">{item.body}</p>
              </div>
            </GridItem>
          ))}
        </Grid>
        <p className="mt-12 max-w-measure font-text text-lead text-ink">
          If those four have clean answers, an engagement is usually short and worth it. If they do
          not, my first job is to get them.
        </p>
      </Section>

      <CTABand
        heading="Do you have a problem, and is there a budget against it?"
        body="If yes, that is a short conversation and probably a useful one. If you are not sure yet, that is also a conversation — it just starts further back."
      />
    </>
  );
}
