"use client";

import { useEffect, useRef, useState } from "react";

type UseRevealOptions = {
  /** Intersection ratio required to fire (0–1). */
  threshold?: number;
  /** Root margin for earlier/later triggers. */
  rootMargin?: string;
};

/**
 * Entrance reveal: opacity 0→1 with 16px upward translate over 400ms.
 * Fires once. Fully disabled under prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(options: UseRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = "0px 0px -5% 0px" } = options;
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return {
    ref,
    className: visible ? "reveal is-visible" : "reveal",
    "data-revealed": visible ? "true" : "false",
  } as const;
}
