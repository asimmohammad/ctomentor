import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Application Received | The CTO Mentor",
  description: "Thank you for your application. We will be in touch shortly.",
  alternates: { canonical: "https://thectomentor.com/apply/confirmation" },
};

export default function ApplyConfirmationPage() {
  return (
    <section className="bg-warm-gradient min-h-[60vh] flex items-center">
      <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-8">
            <CheckCircle2 className="w-10 h-10" aria-hidden />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-semibold text-heading leading-tight">
            Thank you for your application
          </h1>
          <p className="mt-6 text-lg md:text-xl font-body text-subtle leading-relaxed">
            We&apos;ve received your information and appreciate you taking the time to complete the form.
          </p>
          <p className="mt-4 text-lg font-body text-foreground leading-relaxed">
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
      </div>
    </section>
  );
}
