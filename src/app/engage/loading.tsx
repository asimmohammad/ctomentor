export default function EngageLoading() {
  return (
    <div className="mx-auto max-w-measure px-gutter py-16" aria-busy="true" aria-live="polite">
      <div className="h-3 w-28 bg-border" />
      <div className="mt-4 h-10 w-2/3 max-w-sm bg-border" />
      <div className="mt-8 h-2 w-full bg-border" />
      <div className="mt-10 space-y-4">
        <div className="h-12 w-full bg-border" />
        <div className="h-12 w-full bg-border" />
        <div className="h-12 w-full bg-border" />
      </div>
      <p className="mt-8 font-text text-body text-ink-muted">Loading application…</p>
    </div>
  );
}
