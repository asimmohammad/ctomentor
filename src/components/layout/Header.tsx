"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const servicesMenu = {
  name: "Services",
  href: "/services",
  items: [
    { name: "Engagement Models", href: "/services" },
    { name: "PE/VC Due Diligence", href: "/investors" },
    { name: "Government & Defense", href: "/government" },
  ],
};

const aboutMenu = {
  name: "About",
  href: "/about",
  items: [{ name: "Our Experience", href: "/experience" }],
};

const isServicesActive = (path: string | null) =>
  path === "/services" || path === "/investors" || path === "/government";
const isInsightsActive = (path: string | null) => path === "/case-studies" || path === "/insights";
const isAboutActive = (path: string | null) => path === "/about" || path === "/experience";

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
    ),
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const path = usePathname();
  const menuId = useId();
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const previousPath = useRef(path);

  const closeMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Close on route change
  useEffect(() => {
    if (previousPath.current !== path) {
      previousPath.current = path;
      setMobileMenuOpen(false);
    }
  }, [path]);

  // Lock background scroll while open
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [mobileMenuOpen]);

  // Escape + focus trap
  useEffect(() => {
    if (!mobileMenuOpen) return;

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
  }, [mobileMenuOpen, closeMenu]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-paper border-b border-border">
      <nav className="mx-auto w-full max-w-content px-gutter" aria-label="Primary">
        <div className="flex items-center justify-between h-[var(--header-height)]">
          <Link href="/" className="flex items-center gap-3 min-w-0">
            <img src="/logo.svg" alt="The CTO Mentor" className="h-10 w-auto shrink-0 lg:h-16" />
            <div className="hidden sm:block min-w-0">
              <span className="font-display text-h4 font-semibold text-ink tracking-tight block">
                The CTO Mentor
              </span>
              <span className="hidden lg:block text-caption font-text text-ink-muted">
                Strategic Technology Leadership for Growth-Stage Companies, PE/VC & GovTech
              </span>
            </div>
            <span className="font-display text-h4 font-semibold text-ink tracking-tight sm:hidden truncate">
              The CTO Mentor
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`text-small font-text font-medium transition-colors flex items-center gap-1 outline-none ${
                  isServicesActive(path) ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {servicesMenu.name}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[200px]">
                {servicesMenu.items.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <DropdownMenuItem className="cursor-pointer">{item.name}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Link
              href="/insights"
              className={`text-small font-text font-medium transition-colors ${
                isInsightsActive(path) ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              Insights
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger
                className={`text-small font-text font-medium transition-colors flex items-center gap-1 outline-none ${
                  isAboutActive(path) ? "text-ink" : "text-ink-muted hover:text-ink"
                }`}
              >
                {aboutMenu.name}
                <ChevronDown className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[160px]">
                <Link href={aboutMenu.href}>
                  <DropdownMenuItem className="cursor-pointer">About</DropdownMenuItem>
                </Link>
                {aboutMenu.items.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <DropdownMenuItem className="cursor-pointer">{item.name}</DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <Link href="/apply">
              <Button variant="primary" size="default">
                Book a Call
              </Button>
            </Link>
          </div>

          <button
            ref={toggleRef}
            type="button"
            className="lg:hidden p-2 text-ink"
            aria-expanded={mobileMenuOpen}
            aria-controls={menuId}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer: fixed full-viewport panel — not nested in padded container */}
      {mobileMenuOpen && (
        <div
          id={menuId}
          ref={drawerRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
          tabIndex={-1}
          className="lg:hidden fixed inset-0 top-[var(--header-height)] z-50 flex flex-col bg-paper outline-none"
        >
          <div className="flex-1 overflow-y-auto px-gutter py-6">
            <div className="flex flex-col gap-4">
              <div className="py-2">
                <Link
                  href={servicesMenu.href}
                  className={`block text-body font-text font-medium py-2 ${
                    isServicesActive(path) ? "text-ink" : "text-ink-muted"
                  }`}
                  onClick={closeMenu}
                >
                  Services
                </Link>
                <div className="mt-2 flex flex-col gap-2 pl-4">
                  {servicesMenu.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block text-small font-text font-medium py-1 ${
                        path === item.href ? "text-ink" : "text-ink-muted"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="py-2">
                <Link
                  href="/insights"
                  className={`block text-body font-text font-medium py-2 ${
                    isInsightsActive(path) ? "text-ink" : "text-ink-muted"
                  }`}
                  onClick={closeMenu}
                >
                  Insights
                </Link>
                <div className="mt-2 flex flex-col gap-2 pl-4">
                  <Link
                    href="/case-studies"
                    className={`block text-small font-text font-medium py-1 ${
                      path === "/case-studies" ? "text-ink" : "text-ink-muted"
                    }`}
                    onClick={closeMenu}
                  >
                    Case Studies
                  </Link>
                  <Link
                    href="/insights"
                    className={`block text-small font-text font-medium py-1 ${
                      path === "/insights" ? "text-ink" : "text-ink-muted"
                    }`}
                    onClick={closeMenu}
                  >
                    Articles
                  </Link>
                </div>
              </div>
              <div className="py-2">
                <Link
                  href={aboutMenu.href}
                  className={`block text-body font-text font-medium py-2 ${
                    isAboutActive(path) ? "text-ink" : "text-ink-muted"
                  }`}
                  onClick={closeMenu}
                >
                  About
                </Link>
                <div className="mt-2 flex flex-col gap-2 pl-4">
                  {aboutMenu.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`block text-small font-text font-medium py-1 ${
                        path === item.href ? "text-ink" : "text-ink-muted"
                      }`}
                      onClick={closeMenu}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="pt-4 border-t border-border">
                <Link href="/apply" onClick={closeMenu}>
                  <Button variant="primary" size="lg" className="w-full">
                    Book a Call
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
