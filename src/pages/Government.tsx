import { Layout } from "@/components/layout/Layout";
import { PageMeta } from "@/components/PageMeta";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const capabilities = [
  "FedRAMP readiness assessment and authorization strategy",
  "AWS GovCloud migration planning and execution oversight",
  "IL5 authorization and ICAM integration",
  "SOC 2 Type II compliance architecture",
  "Security posture assessment for government RFP responses",
];

export default function Government() {
  return (
    <Layout>
      <PageMeta
        title="Government & Defense Technology Leadership | FedRAMP, IL5, GovCloud | The CTO Mentor"
        description="Fractional CTO services for GovTech companies pursuing FedRAMP authorization, IL5 compliance, and AWS GovCloud migration."
      />

      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-4xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Navigate the Complexity of Government Technology with Confidence
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              Fractional CTO services for GovTech companies and defense contractors pursuing FedRAMP, IL5, and DoD compliance.
            </p>
            <div className="mt-10">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Discuss Your Government Technology Needs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-8">
            Capabilities
          </h2>
          <ul className="space-y-4 max-w-3xl">
            {capabilities.map((item) => (
              <li key={item} className="flex items-start gap-4 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why This Matters */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Why This Matters
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed">
              Government and DoD contracts require technology compliance that most fractional CTOs cannot credibly advise on. My active, hands-on experience with these exact requirements — SOC 2 Type II, AWS GovCloud migration, FedRAMP readiness, IL5 authorization, and ICAM integration — means you get practical guidance, not theoretical frameworks. I'm in the trenches with these initiatives today.
            </p>
          </div>
        </div>
      </section>

      {/* Engagement Model */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Engagement Model
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-10">
              Advisory ($5,000/month) or Embedded Leadership ($12,000–$15,000/month) depending on scope and timeline. We'll define the right model in a discovery call based on your authorization path and internal capacity.
            </p>
            <Link to="/apply">
              <Button variant="primary" size="xl">
                Discuss Your Government Technology Needs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
