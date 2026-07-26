"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/Button";
import { Eyebrow } from "@/components/Eyebrow";
import { Container } from "@/components/layout/Container";
import { GateScreen } from "@/components/assessment/GateScreen";
import { ProgressHeader } from "@/components/assessment/ProgressHeader";
import { QuestionScreen } from "@/components/assessment/QuestionScreen";
import {
  clearPersistedState,
  createAssessmentReducer,
  initialState,
  loadPersistedState,
  persistState,
  type Lead,
} from "@/lib/assessment/machine";
import { scoreAssessment, getDimension } from "@/lib/assessment/scoring";
import type { AssessmentConfig } from "@/lib/assessment/types";
import { analytics } from "@/lib/analytics";

const ADVANCE_DELAY_MS = 250;

export function AssessmentClient({ config }: { config: AssessmentConfig }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const totalQuestions = config.questions.length;

  const reducer = React.useMemo(
    () => createAssessmentReducer(totalQuestions),
    [totalQuestions],
  );
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const [focusedIndex, setFocusedIndex] = React.useState(0);
  const [keyboardActive, setKeyboardActive] = React.useState(false);
  const hydrated = React.useRef(false);

  const question = config.questions[state.index];
  const answeredCount = Object.keys(state.answers).length;
  const score = React.useMemo(
    () => scoreAssessment(state.answers, config),
    [state.answers, config],
  );

  React.useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const saved = loadPersistedState(config.storageKey);
    const qParam = Number(searchParams.get("q"));
    const hasQParam = Number.isFinite(qParam) && qParam >= 1 && qParam <= totalQuestions;

    if (saved) {
      dispatch({ type: "offerResume", state: saved });
      return;
    }
    if (hasQParam) {
      dispatch({ type: "start" });
      dispatch({ type: "goto", index: qParam - 1 });
    }
  }, [searchParams, config.storageKey, totalQuestions]);

  React.useEffect(() => {
    if (!hydrated.current) return;
    if (Object.keys(state.answers).length === 0) return;
    persistState(config.storageKey, state);
  }, [state, config.storageKey]);

  React.useEffect(() => {
    if (state.resultId) {
      clearPersistedState(config.storageKey);
      router.push(`${config.framing.resultsPathPrefix}/${state.resultId}`);
    }
  }, [state.resultId, config.framing.resultsPathPrefix, config.storageKey, router]);

  React.useEffect(() => {
    if (!hydrated.current) return;
    if (state.phase !== "question") return;
    const currentQ = searchParams.get("q");
    if (currentQ === String(state.index + 1)) return;
    router.push(`${pathname}?q=${state.index + 1}`, { scroll: false });
  }, [state.phase, state.index, pathname, router, searchParams]);

  React.useEffect(() => {
    function onPopState() {
      const params = new URLSearchParams(window.location.search);
      const target = Number(params.get("q"));
      if (!Number.isFinite(target) || target < 1 || target > totalQuestions) return;
      dispatch({ type: "goto", index: target - 1 });
    }
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, [totalQuestions]);

  React.useEffect(() => {
    if (!question) return;
    const selected = state.answers[question.id];
    const selectedIndex = question.options.findIndex((option) => option.id === selected);
    setFocusedIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [question, state.answers]);

  const handleSelect = React.useCallback(
    (optionId: string) => {
      if (!question || state.pendingOptionId) return;
      dispatch({ type: "select", questionId: question.id, optionId });
      analytics.questionAnswered(config.id, state.index);
      window.setTimeout(() => dispatch({ type: "advance" }), ADVANCE_DELAY_MS);
    },
    [question, state.pendingOptionId, config.id, state.index],
  );

  const prevPhase = React.useRef(state.phase);
  React.useEffect(() => {
    if (prevPhase.current !== "gate" && state.phase === "gate") {
      analytics.gateViewed(config.id);
    }
    prevPhase.current = state.phase;
  }, [state.phase, config.id]);

  const handleBack = React.useCallback(() => dispatch({ type: "back" }), []);

  React.useEffect(() => {
    if (state.phase !== "question" || !question) return;

    function onKeyDown(event: KeyboardEvent) {
      if (!question) return;
      const target = event.target as HTMLElement | null;
      if (target && ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName)) return;

      if (["1", "2", "3", "4"].includes(event.key)) {
        event.preventDefault();
        setKeyboardActive(true);
        const optionIndex = Number(event.key) - 1;
        const option = question.options[optionIndex];
        if (option) {
          setFocusedIndex(optionIndex);
          handleSelect(option.id);
        }
        return;
      }

      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        event.preventDefault();
        setKeyboardActive(true);
        setFocusedIndex((current) => (current + 1) % question.options.length);
        return;
      }

      if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        event.preventDefault();
        setKeyboardActive(true);
        setFocusedIndex(
          (current) => (current - 1 + question.options.length) % question.options.length,
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        const option = question.options[focusedIndex];
        if (option) handleSelect(option.id);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [state.phase, question, focusedIndex, handleSelect]);

  async function handleGateSubmit() {
    dispatch({ type: "submitStart" });
    try {
      const response = await fetch("/api/assessment/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variant: config.id,
          lead: state.lead,
          answers: state.answers,
        }),
      });
      const data = (await response.json()) as { error?: string; id?: string };
      if (!response.ok || !data.id) {
        dispatch({ type: "submitError", message: data.error ?? "Unable to submit right now." });
        return;
      }
      analytics.gateSubmitted(config.id, score.overall);
      dispatch({ type: "submitSuccess", resultId: data.id });
    } catch {
      dispatch({
        type: "submitError",
        message: "Unable to submit right now. Check your connection.",
      });
    }
  }

  return (
    <Container className="py-[var(--section-standard)]">
      <div className="mx-auto max-w-3xl">
        {state.phase === "intro" ? (
          <div>
            <Eyebrow>{config.framing.name}</Eyebrow>
            <h1 className="mt-4 font-display text-h1 text-ink">{config.framing.headline}</h1>
            <p className="mt-6 max-w-measure font-text text-lead text-ink-muted">
              {config.framing.body}
            </p>

            {state.resumeAvailable ? (
              <div className="mt-8 border border-border bg-surface p-6">
                <p className="font-text text-body text-ink">
                  You have saved progress — {answeredCount} of {totalQuestions} answered.
                </p>
                <div className="mt-4 flex flex-wrap gap-4">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => {
                      analytics.assessmentStarted(config.id);
                      dispatch({ type: "resume" });
                    }}
                  >
                    Resume where you left off
                  </Button>
                  <Button
                    variant="ghost"
                    size="lg"
                    onClick={() => {
                      clearPersistedState(config.storageKey);
                      analytics.assessmentStarted(config.id);
                      dispatch({ type: "restart" });
                    }}
                  >
                    Start over
                  </Button>
                </div>
              </div>
            ) : (
              <div className="mt-8">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    analytics.assessmentStarted(config.id);
                    dispatch({ type: "start" });
                  }}
                >
                  Begin the assessment
                </Button>
              </div>
            )}
          </div>
        ) : null}

        {state.phase === "question" && question ? (
          <div>
            <ProgressHeader
              index={state.index}
              answeredCount={answeredCount}
              totalQuestions={totalQuestions}
            />
            <div className="mt-10">
              <QuestionScreen
                question={question}
                dimension={getDimension(config, question.dimension)}
                selectedOptionId={state.answers[question.id] ?? null}
                pendingOptionId={state.pendingOptionId}
                onSelect={handleSelect}
                focusedIndex={focusedIndex}
                onFocusedIndexChange={setFocusedIndex}
                keyboardActive={keyboardActive}
              />
            </div>
            <div className="mt-8 flex items-center justify-between gap-4">
              <Button variant="ghost" size="md" onClick={handleBack}>
                Back
              </Button>
              <p className="font-mono text-eyebrow uppercase tracking-[0.12em] text-ink-faint">
                1–4 select · arrows move · enter confirms
              </p>
            </div>
          </div>
        ) : null}

        {state.phase === "gate" ? (
          <GateScreen
            score={score}
            gateBody={config.framing.gateBody}
            lead={state.lead}
            submitStatus={state.submitStatus}
            submitError={state.submitError}
            onLeadChange={(field: keyof Lead, value: string) =>
              dispatch({ type: "updateLead", field, value })
            }
            onSubmit={handleGateSubmit}
            onBack={handleBack}
          />
        ) : null}
      </div>
    </Container>
  );
}
