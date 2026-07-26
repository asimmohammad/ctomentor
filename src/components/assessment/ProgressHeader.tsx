import { SECONDS_PER_QUESTION } from "@/lib/assessment/questions";

export interface ProgressHeaderProps {
  index: number;
  answeredCount: number;
  totalQuestions: number;
}

function formatRemaining(remainingQuestions: number): string {
  const seconds = remainingQuestions * SECONDS_PER_QUESTION;
  if (seconds <= 60) return "Under a minute left";
  return `About ${Math.ceil(seconds / 60)} minutes left`;
}

export function ProgressHeader({ index, answeredCount, totalQuestions }: ProgressHeaderProps) {
  const current = index + 1;
  const percent = Math.round((answeredCount / totalQuestions) * 100);

  return (
    <div>
      <div
        className="h-[2px] w-full bg-border"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={totalQuestions}
        aria-valuenow={answeredCount}
        aria-label="Assessment progress"
      >
        <div
          className="h-full bg-accent transition-[width] duration-standard ease-standard"
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="mt-3 flex items-baseline justify-between font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-muted">
        <span>
          Question {current} of {totalQuestions}
        </span>
        <span>{formatRemaining(totalQuestions - answeredCount)}</span>
      </div>
    </div>
  );
}
