import { Layout } from "@/components/layout/Layout";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

// Article content mapping
const articles: Record<string, {
  title: string;
  date: string;
  category: string;
  content: React.ReactNode;
}> = {
  "many-faces-cto": {
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    date: "January 25, 2026",
    category: "Leadership",
    content: (
      <div className="prose prose-lg max-w-none">
        <p className="text-lg font-body text-foreground leading-relaxed mb-6">
          "CTO" is one of the most overloaded titles in modern companies.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-6">
          Two people can hold the same title and be solving entirely different problems. One may be writing production code daily. Another may not touch a codebase at all, yet still be indispensable to the company's success.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          When founders misunderstand this distinction, they don't just hire the wrong CTO—they design the wrong expectations, incentives, and operating model for their business.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Below are the most common types of Chief Technology Officers, what each one is optimized for, and why many startups eventually outgrow the traditional CTO model altogether.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          1. The Founding CTO (The Builder)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Founding CTO is the architect and early builder of the product. This role thrives in ambiguity, speed, and invention. They are deeply hands-on, often writing large portions of the initial codebase, making rapid technical decisions, and turning ideas into working software as quickly as possible. Their strength lies in execution under uncertainty—choosing tools, building MVPs, and shipping before the market window closes.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          However, Founding CTOs are often optimized for creation, not scale. As the company grows, the same instincts that enabled early success—speed, shortcuts, improvisation—can become liabilities unless the role evolves.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          2. The Scaling CTO (The Systems Thinker)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Scaling CTO enters when the product works and the business begins to grow. Their primary focus is building systems that can support more users, more engineers, and more complexity without breaking. They institutionalize engineering practices, introduce structure, and reduce fragility in the platform.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          This CTO cares deeply about reliability, maintainability, and long-term leverage. They often spend less time coding and more time designing organizations, processes, and architectures. Scaling CTOs are essential for companies moving from "startup chaos" to operational discipline—but they are often ineffective in zero-to-one environments where speed matters more than stability.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          3. The Enterprise / Transformation CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          This CTO typically operates in mature or regulated environments. Their mandate is not to invent new products, but to modernize legacy systems, manage risk, and align technology with large organizational goals. They work closely with compliance, security, and finance teams, and are fluent in vendor management, governance, and long planning cycles.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Transformation CTOs excel at navigating complexity at scale—but they can struggle in startups that require constant experimentation and rapid iteration. Their value is highest when stability, predictability, and risk mitigation matter more than speed.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          4. The Product CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Product CTO sits at the intersection of technology, user experience, and business outcomes. They are obsessed with what gets built and why, not just how. This role is common in product-led companies where engineering is the primary driver of customer value.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Product CTOs work closely with design and product leadership, translating customer needs into technical strategy. Their risk is over-optimization for features at the expense of foundational health. When unchecked, product velocity can outpace system integrity.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          5. The Infrastructure / Platform CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          This CTO focuses almost entirely on the underlying platform: cloud infrastructure, reliability, performance, and cost efficiency. They are experts in scale, resilience, and operational excellence. In some organizations, this role exists alongside a Product CTO.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Platform CTOs are invaluable once infrastructure becomes a competitive advantage—or a serious liability. However, in early startups, this role can feel abstract or premature unless infrastructure is core to the product itself.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          6. The Fractional CTO
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Fractional CTO provides senior technology leadership on a part-time basis. This model is popular with early-stage companies that need experience but cannot justify or afford a full-time executive. Fractional CTOs often focus on stabilization, roadmap clarity, hiring decisions, and short-term execution.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          While effective in many scenarios, the limitation is structural: fractionals typically advise more than they operate. They influence decisions, but rarely own outcomes end-to-end. For some companies, this is sufficient. For others, it creates a leadership gap between strategy and execution.
        </p>

        <h2 className="font-heading text-2xl font-semibold text-heading mt-12 mb-6">
          7. The Operator-in-Residence (The Evolution)
        </h2>
        <p className="text-base font-body text-foreground leading-relaxed mb-4">
          The Operator-in-Residence is not just a CTO—it is an operating executive embedded directly into the business with ownership, accountability, and authority. This role blends the strategic depth of a senior CTO with the hands-on execution of an operator.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          Unlike a fractional advisor, an Operator-in-Residence drives outcomes: stabilizing teams, fixing delivery breakdowns, aligning engineering with revenue, and making hard trade-offs in real time. Unlike a traditional CTO hire, this role is often temporary, equity-aligned, and focused on transformation rather than permanence.
        </p>
        <p className="text-base font-body text-foreground leading-relaxed mb-8">
          For many startups, especially those navigating inflection points, the Operator-in-Residence is the fastest way to move from chaos to clarity without making a premature long-term hire.
        </p>

        <div className="mt-12 pt-8 border-t border-divider">
          <h3 className="font-heading text-xl font-semibold text-heading mb-4">
            The question is not "Do we need a CTO?"
          </h3>
          <p className="text-lg font-body text-foreground leading-relaxed mb-4 font-medium">
            The real question is:
          </p>
          <p className="text-lg font-body text-foreground leading-relaxed mb-6 font-medium">
            What kind of technology leadership does our company need right now?
          </p>
          <p className="text-base font-body text-foreground leading-relaxed mb-4">
            The most common mistake startups make with technology leadership is not a lack of talent, but a mismatch of intent. A title is chosen, expectations are assumed, and the business quietly evolves in a different direction. The result is frustration on all sides—founders wondering why progress has slowed, CTOs feeling misaligned or overwhelmed, and teams caught in between.
          </p>
          <p className="text-base font-body text-foreground leading-relaxed">
            The companies that scale successfully treat CTO roles as contextual, not static. They recognize that different phases demand different forms of leadership, and they choose accordingly. Getting this right is rarely about finding a "better" CTO—it's about choosing the right one for the moment the business is actually in.
          </p>
        </div>
      </div>
    ),
  },
};

export default function Article() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? articles[slug] : null;

  if (!article) {
    return (
      <Layout>
        <section className="bg-background">
          <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
            <div className="max-w-3xl">
              <h1 className="font-heading text-3xl font-semibold text-heading mb-4">
                Article Not Found
              </h1>
              <p className="text-base font-body text-foreground mb-6">
                The article you're looking for doesn't exist.
              </p>
              <Link
                to="/insights"
                className="inline-flex items-center gap-2 text-sm font-body font-medium text-heading hover:text-accent transition-colors"
              >
                <ArrowLeft size={16} />
                Back to Articles
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <Link
              to="/insights"
              className="inline-flex items-center gap-2 text-sm font-body font-medium text-subtle hover:text-heading transition-colors mb-6"
            >
              <ArrowLeft size={16} />
              Back to Articles
            </Link>
            <div className="flex items-center gap-4 text-sm font-body text-subtle mb-6">
              <span>{article.date}</span>
              <span className="w-1 h-1 rounded-full bg-divider" />
              <span>{article.category}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              {article.title}
            </h1>
          </div>
        </div>
      </section>

      {/* Article Content */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            {article.content}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              Ready to find the right technology leadership for your company?
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              If technology execution is critical and the stakes are high, let's discuss whether an Operator-in-Residence engagement is the right model for your situation.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Apply for an Operator-in-Residence Engagement
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
