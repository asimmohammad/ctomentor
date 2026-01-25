import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function Experience() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Our Experience
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              TCM's credibility comes from repeated exposure to real operating complexity—not abstract theory.
            </p>
          </div>
        </div>
      </section>

      {/* Content Placeholder */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-lg font-body text-foreground leading-relaxed">
              This page is under development. Content coming soon.
            </p>
            <div className="mt-8">
              <Link to="/about">
                <Button variant="outline" size="lg">
                  Back to About
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
