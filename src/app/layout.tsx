import type { Metadata } from "next";
import Script from "next/script";
import { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "@/app/globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://thectomentor.com"),
  authors: [{ name: "Asim Mohammad", url: "https://thectomentor.com" }],
  creator: "Asim Mohammad",
  title: {
    default: "The CTO Mentor | Asim Mohammad — Fractional CTO & Technology Leadership",
    template: "%s | The CTO Mentor",
  },
  description:
    "Strategic CTO advisory, embedded technology leadership, and technical due diligence from an active CTO with 25+ years of experience.",
  openGraph: {
    title: "The CTO Mentor | Asim Mohammad — Fractional CTO & Technology Leadership",
    description:
      "Strategic CTO advisory, embedded technology leadership, and technical due diligence from an active CTO with 25+ years of experience.",
    url: "https://thectomentor.com",
    siteName: "The CTO Mentor",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "The CTO Mentor — Asim Mohammad | Fractional CTO & Technology Leadership",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.png"],
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
        <Header />
        <main className="flex min-h-screen flex-1 flex-col pt-header-offset">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
