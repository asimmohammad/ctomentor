import type { AnswerMap } from "./scoring-types";

export type LeadRole =
  | "investor-operating-partner"
  | "ceo-founder"
  | "cto-vp-engineering"
  | "board-member"
  | "other";

export type Lead = {
  email: string;
  name: string;
  company: string;
  role: LeadRole | "";
};

export type Phase = "intro" | "question" | "gate";

export type SubmitStatus = "idle" | "loading" | "error";

export type AssessmentState = {
  phase: Phase;
  /** Zero-based index into `questions`. */
  index: number;
  answers: AnswerMap;
  /** Option chosen on the current screen, held during the advance transition. */
  pendingOptionId: string | null;
  lead: Lead;
  submitStatus: SubmitStatus;
  submitError: string | null;
  resumeAvailable: boolean;
  resumePhase: Phase | null;
  startedAt: number | null;
  /** Set after successful submit — client redirects to results. */
  resultId: string | null;
};

export type AssessmentAction =
  | { type: "start" }
  | { type: "select"; questionId: string; optionId: string }
  | { type: "advance" }
  | { type: "back" }
  | { type: "goto"; index: number }
  | { type: "offerResume"; state: PersistedState }
  | { type: "resume" }
  | { type: "restart" }
  | { type: "updateLead"; field: keyof Lead; value: string }
  | { type: "submitStart" }
  | { type: "submitError"; message: string }
  | { type: "submitSuccess"; resultId: string };

export type PersistedState = {
  answers: AnswerMap;
  index: number;
  phase: Phase;
  startedAt: number | null;
};

export const emptyLead: Lead = { email: "", name: "", company: "", role: "" };

export const initialState: AssessmentState = {
  phase: "intro",
  index: 0,
  answers: {},
  pendingOptionId: null,
  lead: emptyLead,
  submitStatus: "idle",
  submitError: null,
  resumeAvailable: false,
  resumePhase: null,
  startedAt: null,
  resultId: null,
};

export function createAssessmentReducer(totalQuestions: number) {
  function clampIndex(index: number): number {
    return Math.min(Math.max(index, 0), totalQuestions - 1);
  }

  return function assessmentReducer(
    state: AssessmentState,
    action: AssessmentAction,
  ): AssessmentState {
    switch (action.type) {
      case "start":
        return {
          ...state,
          phase: "question",
          index: 0,
          resumeAvailable: false,
          startedAt: state.startedAt ?? Date.now(),
          resultId: null,
        };

      case "select":
        return {
          ...state,
          answers: { ...state.answers, [action.questionId]: action.optionId },
          pendingOptionId: action.optionId,
        };

      case "advance": {
        const isLast = state.index >= totalQuestions - 1;
        return {
          ...state,
          pendingOptionId: null,
          phase: isLast ? "gate" : "question",
          index: isLast ? state.index : state.index + 1,
        };
      }

      case "back": {
        if (state.phase === "gate") {
          return {
            ...state,
            phase: "question",
            index: totalQuestions - 1,
            pendingOptionId: null,
          };
        }
        if (state.index === 0) {
          return { ...state, phase: "intro", pendingOptionId: null };
        }
        return { ...state, index: state.index - 1, pendingOptionId: null };
      }

      case "goto":
        return {
          ...state,
          phase: "question",
          index: clampIndex(action.index),
          pendingOptionId: null,
        };

      case "offerResume":
        return {
          ...state,
          answers: action.state.answers,
          index: clampIndex(action.state.index),
          startedAt: action.state.startedAt,
          resumeAvailable: true,
          resumePhase: action.state.phase,
          phase: "intro",
        };

      case "resume":
        return {
          ...state,
          phase: state.resumePhase ?? "question",
          resumeAvailable: false,
          resumePhase: null,
          pendingOptionId: null,
        };

      case "restart":
        return { ...initialState, phase: "question", startedAt: Date.now() };

      case "updateLead":
        return {
          ...state,
          lead: { ...state.lead, [action.field]: action.value },
          submitError: null,
          submitStatus: state.submitStatus === "error" ? "idle" : state.submitStatus,
        };

      case "submitStart":
        return { ...state, submitStatus: "loading", submitError: null };

      case "submitError":
        return { ...state, submitStatus: "error", submitError: action.message };

      case "submitSuccess":
        return {
          ...state,
          submitStatus: "idle",
          submitError: null,
          resultId: action.resultId,
        };

      default:
        return state;
    }
  };
}

export function loadPersistedState(storageKey: string): PersistedState | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    if (!parsed || typeof parsed !== "object" || !parsed.answers) return null;
    if (Object.keys(parsed.answers).length === 0) return null;
    return {
      answers: parsed.answers,
      index: typeof parsed.index === "number" ? parsed.index : 0,
      phase: parsed.phase === "gate" ? "gate" : "question",
      startedAt: typeof parsed.startedAt === "number" ? parsed.startedAt : null,
    };
  } catch {
    return null;
  }
}

export function persistState(storageKey: string, state: AssessmentState): void {
  if (typeof window === "undefined") return;
  try {
    const payload: PersistedState = {
      answers: state.answers,
      index: state.index,
      phase: state.phase === "gate" ? "gate" : "question",
      startedAt: state.startedAt,
    };
    window.localStorage.setItem(storageKey, JSON.stringify(payload));
  } catch {
    /* storage unavailable */
  }
}

export function clearPersistedState(storageKey: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(storageKey);
  } catch {
    /* no-op */
  }
}

/** @deprecated Use createAssessmentReducer */
export const assessmentReducer = createAssessmentReducer(12);
