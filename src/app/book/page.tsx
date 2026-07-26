import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Eyebrow } from "@/components/Eyebrow";
import { BookScheduler, type AssessmentWarmStart } from "@/components/funnel/BookScheduler";
import { Grid, GridItem } from "@/components/layout/Grid";
import { Section } from "@/components/layout/Section";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";
import { getAssessment } from "@/lib/assessment/store";

export const metadata: Metadata = {
  title: SECONDARY_CTA.label,
  description:
    "Book a 30-minute Technical Risk Conversation. Four pre-booking fields, then choose a time on the calendar.",
  alternates: { canonical: "https://thectomentor.com/book" },
};

type PageProps = {
  searchParams?: { assessment?: string };
};

async function loadWarmStart(id: string | undefined): Promise<AssessmentWarmStart | null> {
  if (!id) return null;
  const record = await getAssessment(id);
  if (!record) return null;
  return {
    id: record.id,
    name: record.lead.name,
    email: record.lead.email,
    company: record.lead.company,
    overall: record.score.overall,
    tierLabel: `Level ${record.score.tier.level} ${record.score.tier.name}`,
  };
}

export default async function BookPage({ searchParams }: PageProps) {
  const warmStart = await loadWarmStart(searchParams?.assessment);
  const calLink =
    process.env.NEXT_PUBLIC_CAL_LINK?.trim() || "asim/technical-risk-conversation";

  return (
    <Section spacing="standard" tone="paper">
      <Eyebrow>Conversation</Eyebrow>
      <h1 className="mt-3 max-w-measure font-display text-h1 text-ink">
        Technical Risk Conversation
      </h1>
      <p className="mt-4 max-w-measure font-text text-lead text-ink-muted">
        Thirty minutes. Confidential. No pitch deck — a clear read on whether an engagement is warranted.
        Email reminders at 24 hours and 1 hour keep show rates in the 70–80% range; without them, no-shows
        collapse.
      </p>

      <Grid className="mt-10 items-start">
        <GridItem span={12} lg={5} className="space-y-8">
          <div>
            <h2 className="font-text text-h4 text-ink">What happens on the call</h2>
            <ul className="mt-4 list-none space-y-3">
              {[
                "We map the technology risk against the deal or operating plan.",
                "I tell you which engagement tier fits — or that you do not need me.",
                "You leave with a next step: assessment, sprint, or a clear no.",
              ].map((item) => (
                <li key={item} className="font-text text-body text-ink-muted">
                  <span className="text-accent" aria-hidden="true">
                    —{" "}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-text text-h4 text-ink">What you leave with</h2>
            <p className="mt-3 font-text text-body text-ink-muted">
              A written note on the call (or the next morning): the binding risk, the recommended tier if any, and
              whether a Diagnostic Sprint is the right first move.
            </p>
          </div>

          <div>
            <h2 className="font-text text-h4 text-ink">Who it is for</h2>
            <p className="mt-3 font-text text-body text-ink-muted">
              PE/VC deal and operating partners, and CEOs or boards at Series A–C software companies where technology
              risk is material. Not for shopping hourly rates or marketplace fractional fills.
            </p>
          </div>

          <div className="flex gap-4 border-t border-border pt-6">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-border bg-surface-alt">
              <Image
                src="/portraits/hero-placeholder.svg"
                alt="Asim Mohammad"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
            <div>
              <p className="font-text text-h4 text-ink">Asim Mohammad</p>
              <p className="mt-2 font-text text-small text-ink-muted">
                Active SaaS CTO. 25 years. Diligence supporting a $600M exit. SOC 2 Type II, AWS GovCloud, FedRAMP.
                Duke MBA.
              </p>
            </div>
          </div>

          {!warmStart ? (
            <p className="font-text text-small text-ink-muted">
              Have not taken the assessment yet?{" "}
              <Link href={PRIMARY_CTA.href} className="text-accent underline-offset-4 hover:underline">
                {PRIMARY_CTA.label}
              </Link>{" "}
              first — attendees who arrive with a score are better prepared.
            </p>
          ) : null}
        </GridItem>

        <GridItem span={12} lg={7}>
          <div className="border border-border bg-surface p-5 sm:p-6">
            <BookScheduler calLink={calLink} warmStart={warmStart} />
          </div>
        </GridItem>
      </Grid>
    </Section>
  );
}
