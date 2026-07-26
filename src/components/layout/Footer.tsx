"use client";

import Link from "next/link";
import { Section } from "@/components/layout/Section";
import { SubstackSubscribe } from "@/components/SubstackSubscribe";

const navigation = {
  services: [
    { name: "Engagement Models", href: "/engagements" },
    { name: "PE/VC Due Diligence", href: "/investors" },
    { name: "Government & Defense", href: "/government" },
  ],
  company: [
    { name: "About", href: "/about" },
    { name: "Our Experience", href: "/experience" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Insights", href: "/insights" },
  ],
  connect: [
    { name: "Take the Technical Risk Assessment", href: "/assessment" },
    { name: "Request a confidential conversation", href: "/book" },
    { name: "LinkedIn", href: "https://www.linkedin.com/in/asimmohammad", target: "_blank" },
  ],
};

export function Footer() {
  return (
    <Section as="footer" spacing="standard" tone="dark">
      {/* Newsletter bar */}
      <div className="mb-16 pb-12 border-b border-ink-inverse/10">
        <div className="max-w-2xl">
          <h3 className="text-h4 font-text font-semibold text-ink-inverse mb-2">
            Subscribe on Substack
          </h3>
          <SubstackSubscribe variant="footer" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
        {/* Brand */}
        <div className="lg:col-span-1">
          <Link href="/" className="inline-flex items-center gap-3 mb-4">
            <img src="/logo.svg" alt="The CTO Mentor" className="h-16 w-auto" />
          </Link>
          <p className="text-small text-ink-inverse/70 font-text leading-relaxed max-w-xs">
            Strategic Technology Leadership for Growth-Stage Companies, PE/VC Portfolios & Government Technology
          </p>
        </div>

        {/* Services */}
        <div>
          <h3 className="eyebrow mb-4 text-ink-inverse/50">
            Services
          </h3>
          <ul className="space-y-3">
            {navigation.services.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-small font-text text-ink-inverse/80 hover:text-ink-inverse transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h3 className="eyebrow mb-4 text-ink-inverse/50">
            Company
          </h3>
          <ul className="space-y-3">
            {navigation.company.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="text-small font-text text-ink-inverse/80 hover:text-ink-inverse transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Connect */}
        <div>
          <h3 className="eyebrow mb-4 text-ink-inverse/50">
            Connect
          </h3>
          <ul className="space-y-3">
            {navigation.connect.map((item) => (
              <li key={item.name}>
                {"target" in item && item.target ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-small font-text text-ink-inverse/80 hover:text-ink-inverse transition-colors"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    href={item.href}
                    className="text-small font-text text-ink-inverse/80 hover:text-ink-inverse transition-colors"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-16 pt-8 border-t border-ink-inverse/10">
        <p className="text-caption font-text text-ink-inverse/50">
          © {new Date().getFullYear()} The CTO Mentor. All rights reserved.
        </p>
      </div>
    </Section>
  );
}
