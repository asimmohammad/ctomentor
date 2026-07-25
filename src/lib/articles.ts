export type Article = {
  title: string;
  date: string;
  category: string;
  description: string;
  /** Long-form body paragraphs. Empty / missing → route returns notFound(). */
  body: string[];
};

/**
 * Article catalog. Bodies must be real published copy — never engineering notes.
 * Legacy Vite/SPA sources are not present in this repo, so bodies are empty until
 * content is migrated from an external archive.
 */
export const articles: Record<string, Article> = {
  "ai-coding-tools-lying": {
    title: "Your AI Coding Tools Are Lying to You (And Your Engineers Don't Know It Yet)",
    date: "February 21, 2026",
    category: "Engineering Leadership",
    description:
      "Pull request sizes are up 33%. Change failure rates are climbing nearly 30%. The culprit isn't laziness — it's confidence without context. Why context engineering is the CTO-level discipline that separates rigor from recklessness.",
    body: [],
  },
  "soc-2-compliance": {
    title:
      "SOC 2 Compliance: What Every Technology Leader Needs to Know (And How to Get There Without Losing Your Mind)",
    date: "February 15, 2026",
    category: "Security & Compliance",
    description:
      "If you're selling to enterprise, you've heard the question: 'Are you SOC 2 compliant?' Here's what I learned from the SOC 2 journey at Laasy — and the tools that made it manageable.",
    body: [],
  },
  "cto-skill-no": {
    title: 'The CTO Skill Nobody Trains For: Saying "No"',
    date: "February 9, 2026",
    category: "Leadership",
    description:
      "Every technical leader knows the feeling: constant requests, endless priorities, and the quiet pressure to say yes to everything. But the most important technical decision is often deciding what not to build.",
    body: [],
  },
  "fix-after-launch": {
    title: 'Why "We\'ll Fix It After Launch" Is How Startups Die',
    date: "January 11, 2026",
    category: "Leadership",
    description:
      "Nearly every startup makes a quiet promise: 'We'll fix it after launch.' What makes this promise dangerous isn't that it's dishonest—it's that it's based on a future that almost never exists.",
    body: [],
  },
  "many-faces-cto": {
    title: "The Many Faces of the CTO — And Why Most Startups Hire the Wrong One",
    date: "January 25, 2026",
    category: "Technology Strategy",
    description:
      "CTO is one of the most overloaded titles in modern companies. Two people can hold the same title and solve entirely different problems.",
    body: [],
  },
  "decision-rights": {
    title: "Why Decision Rights Matter More Than Technology Choices",
    date: "December 2024",
    category: "Engineering Leadership",
    description:
      "The most common cause of engineering dysfunction isn't technical debt — it's unclear ownership. Here's how to diagnose and fix it.",
    body: [],
  },
  "ai-adoption": {
    title: "AI Adoption in Startups: Strategy Before Tools",
    date: "November 2024",
    category: "AI & Strategy",
    description:
      "Before choosing models or platforms, establish clear governance and success criteria. Most AI initiatives fail due to organizational readiness, not technical limitations.",
    body: [],
  },
  "founder-cto-transition": {
    title: "The Founder-to-CTO Transition Nobody Talks About",
    date: "October 2024",
    category: "Leadership",
    description:
      "Technical founders often struggle to delegate effectively. The path forward requires deliberate role design, not just hiring.",
    body: [],
  },
};

export function getPublishableArticles(): [string, Article][] {
  return Object.entries(articles).filter(([, article]) => article.body.length > 0);
}
