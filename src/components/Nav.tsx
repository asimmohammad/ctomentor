"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

export type NavLinkItem = {
  label: string;
  href: string;
};

export interface NavProps {
  links?: NavLinkItem[];
  /** Wordmark text. Domain/newsletter brand may include “Mentor”; page copy elsewhere must not. */
  wordmark?: string;
}

const DEFAULT_LINKS: NavLinkItem[] = [
  { label: "Advisory", href: "/services" },
  { label: "Investors", href: "/investors" },
  { label: "Insights", href: "/insights" },
  { label: "About", href: "/about" },
];

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

/**
 * Sticky site nav — transparent over the hero, solid on scroll.
 * Mobile drawer reuses Prompt-1 fixes: opaque panel, scroll lock, focus trap, Escape, route close.
 */
export function Nav({ links = DEFAULT_LINKS, wordmark = "The CTO Mentor" }: NavProps) {
  const path = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const menuId = React.useId();
  const drawerRef = React.useRef<HTMLDivElement>(null);
  const toggleRef = React.useRef<HTMLButtonElement>(null);
  const previousPath = React.useRef(path);

  const closeMenu = React.useCallback(() => setMobileOpen(false), []);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    if (previousPath.current !== path) {
      previousPath.current = path;
      setMobileOpen(false);
    }
  }, [path]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    if (!mobileOpen) return;
    const drawer = drawerRef.current;
    if (drawer) {
      const focusable = getFocusable(drawer);
      (focusable[0] ?? drawer).focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeMenu();
        toggleRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !drawerRef.current) return;
      const focusable = getFocusable(drawerRef.current);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;
      if (event.shiftKey && (active === first || !drawerRef.current.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !drawerRef.current.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen, closeMenu]);

  const isActive = (href: string) => path === href || (href !== "/" && path?.startsWith(href));

  return (
    <header
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-colors duration-standard ease-standard",
        scrolled || mobileOpen
          ? "border-b border-border bg-paper text-ink"
          : "border-b border-transparent bg-transparent text-ink",
      )}
    >
      <nav className="mx-auto flex h-[var(--header-height)] w-full max-w-content items-center justify-between px-gutter" aria-label="Primary">
        <Link href="/" className="font-display text-h4 font-semibold tracking-tight text-ink">
          {wordmark}
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "font-text text-small font-medium transition-colors duration-standard",
                  isActive(link.href) ? "text-ink" : "text-ink-muted hover:text-ink",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button asChild size="md" variant="primary">
            <Link href="/assessment" className="inline-flex items-center gap-2">
              Take the Technical Risk Assessment
              <span aria-hidden="true">→</span>
            </Link>
          </Button>
        </div>

        <button
          ref={toggleRef}
          type="button"
          className="p-2 text-ink lg:hidden"
          aria-expanded={mobileOpen}
          aria-controls={menuId}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => setMobileOpen((open) => !open)}
        >
          {mobileOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
        </button>
      </nav>

      {mobileOpen ? (
        <div
          id={menuId}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          className="fixed inset-0 top-[var(--header-height)] z-50 flex flex-col bg-paper outline-none lg:hidden"
        >
          <div className="flex-1 overflow-y-auto px-gutter py-6">
            <ul className="flex flex-col gap-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "block py-3 font-text text-body font-medium",
                      isActive(link.href) ? "text-ink" : "text-ink-muted",
                    )}
                    onClick={closeMenu}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 border-t border-border pt-6">
              <Button asChild size="lg" variant="primary" className="w-full">
                <Link href="/assessment" onClick={closeMenu} className="inline-flex w-full items-center justify-center gap-2">
                  Take the Technical Risk Assessment
                  <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
