"use client";

import * as React from "react";

/** Thin reading-progress indicator fixed under the site header. */
export function ReadingProgress() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    function onScroll() {
      const el = document.documentElement;
      const scrollable = el.scrollHeight - el.clientHeight;
      if (scrollable <= 0) {
        setProgress(0);
        return;
      }
      setProgress(Math.min(100, Math.round((el.scrollTop / scrollable) * 100)));
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className="pointer-events-none fixed left-0 right-0 z-40 h-[3px] bg-border"
      style={{ top: "var(--header-height, 4rem)" }}
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={progress}
      aria-label="Reading progress"
    >
      <div
        className="h-full bg-accent transition-[width] duration-fast ease-standard"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
