import Link from "next/link";
import Image from "next/image";
import { PORTRAIT_ALT, PORTRAIT_SRC } from "@/lib/media";

export function AuthorCard() {
  return (
    <aside className="mt-14 flex gap-4 border-t border-border pt-8">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-surface-alt">
        <Image
          src={PORTRAIT_SRC}
          alt={PORTRAIT_ALT}
          fill
          className="object-cover"
          unoptimized
        />
      </div>
      <div>
        <p className="font-text text-h4 text-ink">Asim Mohammad</p>
        <p className="mt-2 font-text text-small text-ink-muted">
          Active SaaS CTO. Diligence supporting a $600M exit. Advisory for PE and growth software — and CEO of Helix
          Platform (Vigil).
        </p>
        <Link
          href="/about"
          className="mt-3 inline-block font-text text-small font-medium text-accent underline-offset-4 hover:underline"
        >
          About Asim
        </Link>
      </div>
    </aside>
  );
}
