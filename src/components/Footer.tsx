import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { PRIMARY_CTA, SECONDARY_CTA } from "@/lib/cta";

export type FooterColumn = {
  title: string;
  links: { label: string; href: string; external?: boolean }[];
};

export interface FooterProps {
  columns?: FooterColumn[];
  email?: string;
  linkedInUrl?: string;
}

const DEFAULT_COLUMNS: FooterColumn[] = [
  {
    title: "Advisory",
    links: [
      { label: "Advisory", href: "/engagements" },
      { label: "Investors", href: "/investors" },
      { label: "Government & defense", href: "/government" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Experience", href: "/experience" },
      { label: "Case studies", href: "/case-studies" },
    ],
  },
  {
    title: "Writing",
    links: [
      { label: "Writing", href: "/insights" },
      { label: "Substack", href: "https://asimmohammad.substack.com", external: true },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: SECONDARY_CTA.label, href: SECONDARY_CTA.href },
      { label: PRIMARY_CTA.label, href: PRIMARY_CTA.href },
    ],
  },
];

export function Footer({
  columns = DEFAULT_COLUMNS,
  email = "asim@thectomentor.com",
  linkedInUrl = "https://www.linkedin.com/in/asimmohammad1",
}: FooterProps) {
  return (
    <footer className="bg-dark-band text-ink-inverse">
      <Container className="py-[var(--section-standard)]">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {columns.map((column) => (
            <div key={column.title}>
              <h2 className="font-mono text-eyebrow font-medium uppercase tracking-[0.12em] text-ink-inverse/50">
                {column.title}
              </h2>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-text text-small text-ink-inverse/80 transition-colors hover:text-ink-inverse"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="font-text text-small text-ink-inverse/80 transition-colors hover:text-ink-inverse"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-ink-inverse/10 pt-8 md:flex-row md:items-center md:justify-between">
          <div className="space-y-2">
            <a
              href={`mailto:${email}`}
              className="block font-text text-small text-ink-inverse hover:underline"
            >
              {email}
            </a>
            <a
              href={linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block font-text text-small text-ink-inverse/80 hover:text-ink-inverse"
            >
              LinkedIn
            </a>
          </div>
          <div className="flex flex-wrap gap-6 font-text text-caption text-ink-inverse/60">
            <Link href="/privacy" className="hover:text-ink-inverse">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-ink-inverse">
              Terms
            </Link>
            <span>© {new Date().getFullYear()} Asim Mohammad</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
