import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <div className="text-center">
        <h1 className="mb-4 font-display text-h1 text-ink">404</h1>
        <p className="mb-4 text-lead font-text text-ink-muted">Oops! Page not found</p>
        <Link href="/" className="text-small font-text font-medium text-accent hover:text-accent-hover">
          Return to Home
        </Link>
      </div>
    </div>
  );
}

