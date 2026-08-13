import type { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { UtmCapture } from "@/components/UtmCapture";
import { AnalyticsPixels } from "@/components/AnalyticsPixels";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thectomentor.com"),
  authors: [{ name: "Asim Mohammad", url: "https://thectomentor.com" }],
  creator: "Asim Mohammad",
  title: {
    default: "The CTO Mentor | Asim Mohammad — Fractional CTO & Technology Leadership",
    template: "%s | The CTO Mentor",
  },
  // Site-wide fallback for pages that do not set their own. siteName, title.default,
  // and the "%s | The CTO Mentor" template deliberately keep the brand name — see
  // PROJECT_BRIEF.md §2.1: the rename was evaluated and rejected. Only the positioning
  // descriptions moved off the seat.
  description:
    "Independent technology advisory for executives, boards, and investors. Objective inputs from a 25-year technology executive on decisions you cannot verify alone.",
  openGraph: {
    title: "The CTO Mentor | Asim Mohammad — Fractional CTO & Technology Leadership",
    description:
      "Technology advisory for consequential decisions. Vested in your success, not encumbered by it.",
    url: "https://thectomentor.com",
    siteName: "The CTO Mentor",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
      </head>
      <body className="bg-paper text-ink font-text">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0QB3QYL0LZ"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0QB3QYL0LZ');
          `}
        </Script>
        <UtmCapture />
        <AnalyticsPixels />
        <Nav />
        <main className="flex min-h-screen flex-1 flex-col pt-header-offset">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
