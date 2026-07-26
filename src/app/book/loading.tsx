export default function BookLoading() {
  return (
    <div className="mx-auto max-w-measure px-gutter py-16" aria-busy="true" aria-live="polite">
      <div className="h-3 w-24 bg-border" />
      <div className="mt-4 h-10 w-3/4 max-w-md bg-border" />
      <div className="mt-6 h-20 w-full bg-border" />
      <p className="mt-8 font-text text-body text-ink-muted">Loading conversation booking…</p>
    </div>
  );
}
