import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/layout/Section";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Received | The CTO Mentor",
  description: "Thank you for your application. We will be in touch shortly.",
  alternates: { canonical: "https://thectomentor.com/apply/confirmation" },
};

export default function ApplyConfirmationPage() {
  return (
    <Section spacing="generous" tone="alt" className="min-h-[60vh] flex items-center">
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 text-accent mb-8">
          <CheckCircle2 className="w-10 h-10" aria-hidden />
        </div>
        <h1 className="font-display text-h1 text-ink">
          Thank you for your application
        </h1>
        <p className="mt-6 text-lead font-text text-ink-muted">
          We&apos;ve received your information and appreciate you taking the time to complete the form.
        </p>
        <p className="mt-4 text-lead font-text text-ink">
          Someone from our team will reach out to you shortly—typically within 2 business days—to discuss next steps.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button variant="primary" size="xl">
              Back to home
            </Button>
          </Link>
          <Link href="/services">
            <Button variant="outline" size="xl">
              View services
            </Button>
          </Link>
        </div>
      </div>
    </Section>
  );
}
