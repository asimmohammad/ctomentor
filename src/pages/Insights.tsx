import { Layout } from "@/components/layout/Layout";
import { Link } from "react-router-dom";

const posts = [
  {
    slug: "fix-after-launch",
    title: "Why \"We'll Fix It After Launch\" Is How Startups Die",
    excerpt:
      "Nearly every startup makes a quiet promise: 'We'll fix it after launch.' What makes this promise dangerous isn't that it's dishonest—it's that it's based on a future that almost never exists.",
    date: "January 2026",
    category: "Leadership",
  },
  {
    slug: "many-faces-cto",
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    excerpt:
      "CTO is one of the most overloaded titles in modern companies. Two people can hold the same title and solve entirely different problems. When founders misunderstand this distinction, they don't just hire the wrong CTO—they design the wrong expectations, incentives, and operating model.",
    date: "January 2026",
    category: "Leadership",
  },
  {
    slug: "decision-rights",
    title: "Why Decision Rights Matter More Than Technology Choices",
    excerpt:
      "The most common cause of engineering dysfunction isn't technical debt — it's unclear ownership. Here's how to diagnose and fix it.",
    date: "December 2024",
    category: "Leadership",
  },
  {
    slug: "ai-adoption",
    title: "AI Adoption in Startups: Strategy Before Tools",
    excerpt:
      "Before choosing models or platforms, establish clear governance and success criteria. Most AI initiatives fail due to organizational readiness, not technical limitations.",
    date: "November 2024",
    category: "AI & Strategy",
  },
  {
    slug: "founder-cto-transition",
    title: "The Founder-to-CTO Transition Nobody Talks About",
    excerpt:
      "Technical founders often struggle to delegate effectively. The path forward requires deliberate role design, not just hiring.",
    date: "October 2024",
    category: "Leadership",
  },
];

export default function Insights() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              CTO Insights
            </h1>
            <p className="mt-6 text-xl font-body text-subtle">
              Writing on technology, leadership, and execution.
            </p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl space-y-12">
            {posts.map((post, index) => (
              <article
                key={post.slug}
                className={`${
                  index !== posts.length - 1
                    ? "pb-12 border-b border-divider"
                    : ""
                }`}
              >
                <div className="flex items-center gap-4 text-sm font-body text-subtle">
                  <span>{post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-divider" />
                  <span>{post.category}</span>
                </div>
                <h2 className="mt-4 font-heading text-2xl md:text-3xl font-semibold text-heading leading-tight">
                  <Link
                    to={`/insights/${post.slug}`}
                    className="hover:text-accent transition-colors"
                  >
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-4 text-base font-body text-subtle leading-relaxed">
                  {post.excerpt}
                </p>
                <Link
                  to={`/insights/${post.slug}`}
                  className="mt-4 inline-block text-sm font-body font-medium text-heading hover:text-accent transition-colors"
                >
                  Read more →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
