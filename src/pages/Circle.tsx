import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

const benefits = [
  "Monthly small-group sessions with peer CTOs",
  "Direct access for async questions and decisions",
  "Curated resources and frameworks",
  "Accountability and strategic perspective",
];

export default function Circle() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
              CTO Mentor Circle
            </span>
            <h1 className="mt-4 font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              For CTOs who want to lead with authority and execution discipline.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle">
              A peer-level operating group for CTOs ready to lead with
              authority, clarity, and execution discipline.
            </p>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading">
                What's Included
              </h2>
              <ul className="mt-8 space-y-4">
                {benefits.map((benefit) => (
                  <li
                    key={benefit}
                    className="flex items-start gap-4 text-base font-body text-foreground"
                  >
                    <Check
                      size={20}
                      className="text-accent flex-shrink-0 mt-0.5"
                    />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="bg-card border border-divider p-8 lg:p-10">
                <span className="font-body text-xs font-semibold uppercase tracking-wider text-accent">
                  Investment
                </span>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="font-heading text-4xl font-semibold text-heading">
                    $2,500
                  </span>
                  <span className="font-body text-subtle">/month</span>
                </div>
                <p className="mt-4 text-base font-body text-subtle">
                  Limited spots available. Application required.
                </p>
                <div className="mt-8">
                  <Link to="/apply">
                    <Button variant="primary" size="xl" className="w-full">
                      Apply to Join
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who It's For */}
      <section className="bg-section-gradient border-t border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading">
              Who It's For
            </h2>
            <p className="mt-6 text-lg font-body text-subtle leading-relaxed">
              This is for technology leaders who are past the early chaos but
              want to operate at a higher altitude. You want strategic clarity and the perspective of
              peers who understand the weight of the role.
            </p>
            <p className="mt-4 text-lg font-body text-subtle leading-relaxed">
              If you're a first-time CTO navigating a board, a technical founder
              stepping into leadership, or an experienced leader in a new
              context — the Circle provides the structure and community to
              accelerate your growth.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
