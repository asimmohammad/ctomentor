import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check, ChevronDown } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Service data structure
interface Service {
  id: string;
  name: string;
  oneLine: string;
  bestFor: string;
  outcomes: string[];
  deliverables: string[];
  engagementRhythm: string;
  pricing: string;
}

const services: Service[] = [
  {
    id: "turnaround",
    name: "CTO Turnaround (90-Day Reset)",
    oneLine: "A rapid, board-visible intervention to stabilize, reset, and realign a broken technology organization.",
    bestFor: "Chaos, stalled delivery, architecture sprawl, vendor/offshore failure, rising burn.",
    outcomes: [
      "Restored technical leadership and decision velocity",
      "Architecture and platform clarity",
      "Org design + accountability reset",
      "Vendor/offshore triage and governance",
      "Board-ready execution narrative",
    ],
    deliverables: [
      "Current-state assessment (people, process, platform)",
      "90-day stabilization plan + 12-month roadmap",
      "Architecture decision memo",
      "Operating cadence (weekly exec rhythm + metrics)",
    ],
    engagementRhythm: "Weekly exec sync, bi-weekly deep dives, monthly board memo",
    pricing: "$75k–$150k (fixed fee)",
  },
  {
    id: "operating-cto",
    name: "Operating CTO (CTO Office as a Service)",
    oneLine: "Ongoing CTO leadership delivered as a managed service—so execution stays tight without hiring a full-time CTO.",
    bestFor: "Scaling teams needing senior technical leadership, architecture authority, and operational discipline.",
    outcomes: [
      "CTO-level decision-making and leadership",
      "Platform and architecture ownership",
      "Hiring and org scaling plan",
      "Vendor + budget control",
      "Board and investor alignment",
    ],
    deliverables: [
      "Weekly operating rhythm and decision log",
      "Architecture reviews and roadmap management",
      "Hiring scorecards + team performance system",
      "Budget + vendor governance",
    ],
    engagementRhythm: "Weekly exec sync, bi-weekly architecture reviews, monthly board memo",
    pricing: "$30k–$45k/month (6–12 month minimum)",
  },
  {
    id: "scale-ai",
    name: "Scale Readiness & AI Enablement (8–10 Weeks)",
    oneLine: "A focused program to prepare your platform, team, and operating model for growth and AI adoption.",
    bestFor: "Post-PMF companies about to break under scale, preparing for platform shifts, AI adoption, or M&A.",
    outcomes: [
      "Scalable architecture blueprint",
      "AI and data readiness plan",
      "Cost and complexity reduction",
      "Org maturity and capability gaps addressed",
      "Clear execution roadmap",
    ],
    deliverables: [
      "Scale readiness assessment",
      "Target architecture + migration strategy",
      "AI use-case prioritization + build/buy plan",
      "Execution roadmap with milestones",
    ],
    engagementRhythm: "Weekly workshops, stakeholder interviews, executive readout",
    pricing: "$40k–$80k (fixed scope)",
  },
  {
    id: "board-advisory",
    name: "Board & Investor Technical Advisory",
    oneLine: "Independent technical authority for boards, investors, and executives who need clarity—not optimism.",
    bestFor: "Board oversight, diligence, CTO/VP Eng evaluation, risk assessment, M&A readiness.",
    outcomes: [
      "Clear risk visibility and execution truth",
      "Leadership and capability assessment",
      "Scalability + security + data maturity evaluation",
      "Post-deal remediation clarity",
    ],
    deliverables: [
      "Board-grade advisory memos",
      "Due diligence findings (red/yellow/green)",
      "Remediation plan and operating recommendations",
    ],
    engagementRhythm: "Monthly advisory cadence + ad hoc calls as needed",
    pricing: "$25k–$60k per engagement OR $10k–$20k/month",
  },
  {
    id: "crisis-interim",
    name: "Crisis & Interim CTO (Selective)",
    oneLine: "High-intensity, short-term leadership during critical moments—CTO exits, outages, security events, or board escalations.",
    bestFor: "Emergency stabilization and leadership continuity.",
    outcomes: [
      "Rapid stabilization and incident leadership",
      "Executive and board communication control",
      "Short-term execution plan and handoff",
    ],
    deliverables: [
      "Immediate triage + stabilization plan",
      "Interim leadership for team/vendor alignment",
      "Handoff plan to internal leader or hired CTO",
    ],
    engagementRhythm: "Daily/near-daily cadence during crisis, weekly thereafter",
    pricing: "$40k–$60k/month (interim) OR $15k–$30k/week (crisis)",
  },
];

const whoWeHelp = [
  "Founder-led teams moving fast but breaking systems",
  "Post-fundraise execution chaos",
  "CTO/VP Eng gap or leadership misalignment",
  "Scaling pressure, platform strain, and rising burn",
];

const engagementModels = [
  {
    name: "Fixed-scope (Turnaround / Scale Program)",
    description: "Defined outcomes, clear deliverables, fixed fee structure.",
  },
  {
    name: "Monthly retainer (Operating CTO / Board Advisory)",
    description: "Ongoing leadership and advisory with predictable monthly investment.",
  },
  {
    name: "Rapid response (Crisis / Interim)",
    description: "High-intensity, short-term engagements for critical situations.",
  },
];

const faqs = [
  {
    question: "Do you write code?",
    answer: "No. I provide CTO-level leadership, architecture decisions, and organizational structure. I work with your team and vendors to execute, but I don't write production code. This keeps me focused on strategy, execution discipline, and outcomes—not tickets.",
  },
  {
    question: "Do you replace a full-time CTO?",
    answer: "Yes, in many cases. Operating CTO engagements provide full CTO-level leadership and decision-making authority with embedded execution accountability. We operate as an Operator-in-Residence—temporary co-founder, not contractor—bringing the same ownership and outcomes as a full-time CTO. For larger organizations, we often work alongside or in place of an existing CTO during transitions or when additional leadership capacity is needed.",
  },
  {
    question: "What size companies do you work with?",
    answer: "I work with founder-led, tech-enabled companies typically between $5M–$100M in revenue or equivalent funding stage. The sweet spot is post-seed through Series B, but I also work with PE-backed companies and later-stage startups where the CTO function needs reset or scaling support.",
  },
  {
    question: "Can you work with our existing team and vendors?",
    answer: "Absolutely. In fact, that's the norm. I assess your current team structure, vendor relationships, and capabilities, then build on what works and fix what doesn't. I don't replace teams—I provide the leadership, structure, and accountability that makes them effective.",
  },
  {
    question: "How do we start?",
    answer: "Book a Strategy Call. In one conversation, we'll identify your root constraints, your fastest path to stability, and what a clean execution plan looks like. If there's a fit, we'll define the engagement scope, timeline, and investment. No long sales cycles—just clarity and a path forward.",
  },
  {
    question: "Do you take equity?",
    answer: "No. I work on a fee-for-service basis. This keeps incentives aligned: I'm paid for outcomes, not promises. Equity arrangements can create misaligned incentives and complicate board relationships. Cash compensation ensures I'm focused on your success, not exit timing.",
  },
  {
    question: "What's the difference between Turnaround and Operating CTO?",
    answer: "Turnaround is a fixed-scope, 90-day intensive reset for broken organizations. It's a rapid intervention with clear deliverables and a defined end. Operating CTO is ongoing monthly leadership—CTO Office as a Service—for companies that need sustained technical leadership without a full-time hire. Turnaround fixes what's broken; Operating CTO prevents it from breaking again.",
  },
];

// Scroll to section helper
const scrollToSection = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export default function Services() {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Technology leadership that turns chaos into clarity.
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              TCM is a turnaround-and-scale firm for founder-led, tech-enabled companies where the CTO function is broken, immature, or misaligned with the business.
            </p>
            
            {/* Credibility bullets */}
            <div className="mt-8 flex flex-wrap gap-4 text-sm font-body text-subtle">
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Turnarounds & rescues
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Operating CTO leadership
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Board & investor alignment
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button variant="primary" size="xl">
                  Book a Strategy Call
                </Button>
              </Link>
              <Button
                variant="outline"
                size="xl"
                onClick={() => scrollToSection("engagement-models")}
              >
                See Our Engagement Models
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Anchor Navigation */}
      <section className="bg-background border-b border-divider sticky top-16 lg:top-20 z-40">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-4 lg:gap-6 py-4 text-sm font-body">
            <button
              onClick={() => scrollToSection("turnaround")}
              className="text-subtle hover:text-heading transition-colors"
            >
              Turnaround
            </button>
            <span className="text-divider">|</span>
            <button
              onClick={() => scrollToSection("operating-cto")}
              className="text-subtle hover:text-heading transition-colors"
            >
              Operating CTO
            </button>
            <span className="text-divider">|</span>
            <button
              onClick={() => scrollToSection("scale-ai")}
              className="text-subtle hover:text-heading transition-colors"
            >
              Scale & AI
            </button>
            <span className="text-divider">|</span>
            <button
              onClick={() => scrollToSection("board-advisory")}
              className="text-subtle hover:text-heading transition-colors"
            >
              Board Advisory
            </button>
            <span className="text-divider">|</span>
            <button
              onClick={() => scrollToSection("crisis-interim")}
              className="text-subtle hover:text-heading transition-colors"
            >
              Crisis/Interim
            </button>
          </div>
        </div>
      </section>

      {/* Who We Help */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading mb-8">
            Who We Help
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whoWeHelp.map((item, index) => (
              <div
                key={index}
                className="bg-card border border-divider p-6 rounded-lg"
              >
                <p className="text-sm font-body text-foreground leading-relaxed">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services - Grid */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">
            Our Services
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card
                key={service.id}
                className="border-divider hover:border-accent/30 transition-colors"
              >
                <CardHeader>
                  <CardTitle className="font-heading text-xl font-semibold text-heading">
                    {service.name}
                  </CardTitle>
                  <CardDescription className="text-base font-body text-subtle mt-2">
                    {service.oneLine}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm font-body font-medium text-heading mb-4">
                    Best for: {service.bestFor}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="text-xs font-body font-semibold uppercase tracking-wider text-heading mb-3">
                      Outcomes
                    </h4>
                    <ul className="space-y-2">
                      {service.outcomes.map((outcome, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-3 text-sm font-body text-foreground"
                        >
                          <Check
                            size={16}
                            className="text-accent flex-shrink-0 mt-0.5"
                          />
                          {outcome}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-6 pb-6 border-b border-divider">
                    <p className="text-sm font-body text-subtle">
                      <span className="font-medium text-heading">Typical investment: </span>
                      {service.pricing}
                    </p>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => scrollToSection(service.id)}
                    className="w-full"
                  >
                    Explore this service
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-4">
            Which TCM Engagement Is Right for You?
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-3xl">
            Each engagement is designed for a specific stage and level of urgency. Use this guide to quickly identify the right starting point.
          </p>

          {/* Responsive table wrapper - horizontal scroll on mobile */}
          <div className="overflow-x-auto -mx-6 lg:mx-0">
            <div className="inline-block min-w-full align-middle px-6 lg:px-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-divider">
                    <TableHead className="font-heading font-semibold text-heading">Service</TableHead>
                    <TableHead className="font-heading font-semibold text-heading">Best When</TableHead>
                    <TableHead className="font-heading font-semibold text-heading">Primary Goal</TableHead>
                    <TableHead className="font-heading font-semibold text-heading">Typical Duration</TableHead>
                    <TableHead className="font-heading font-semibold text-heading">Engagement Style</TableHead>
                    <TableHead className="font-heading font-semibold text-heading">Typical Investment</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">
                      CTO Turnaround (90-Day Reset)
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Things are broken and confidence is low
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Stabilize, reset, and restore control
                    </TableCell>
                    <TableCell className="font-body text-foreground">90 days</TableCell>
                    <TableCell className="font-body text-foreground">Fixed-scope intervention</TableCell>
                    <TableCell className="font-body text-foreground font-medium">$75k–$150k</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">
                      Operating CTO (CTO Office as a Service)
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      You need ongoing senior technical leadership
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Run the CTO function without hiring full-time
                    </TableCell>
                    <TableCell className="font-body text-foreground">6–12 months</TableCell>
                    <TableCell className="font-body text-foreground">Monthly retainer</TableCell>
                    <TableCell className="font-body text-foreground font-medium">$30k–$45k / month</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">
                      Scale Readiness & AI Enablement
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Growth or AI adoption will break the platform
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Prepare systems, teams, and architecture for scale
                    </TableCell>
                    <TableCell className="font-body text-foreground">8–10 weeks</TableCell>
                    <TableCell className="font-body text-foreground">Fixed-scope program</TableCell>
                    <TableCell className="font-body text-foreground font-medium">$40k–$80k</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">
                      Board & Investor Technical Advisory
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Boards or investors need execution truth
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Independent technical oversight and diligence
                    </TableCell>
                    <TableCell className="font-body text-foreground">Ongoing or per engagement</TableCell>
                    <TableCell className="font-body text-foreground">Advisory</TableCell>
                    <TableCell className="font-body text-foreground font-medium">$10k–$20k / month or $25k–$60k</TableCell>
                  </TableRow>
                  <TableRow className="border-divider hover:bg-card/50">
                    <TableCell className="font-heading font-semibold text-heading">
                      Crisis & Interim CTO (Selective)
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Leadership gaps or technical emergencies
                    </TableCell>
                    <TableCell className="font-body text-foreground">
                      Immediate stabilization and continuity
                    </TableCell>
                    <TableCell className="font-body text-foreground">Short-term</TableCell>
                    <TableCell className="font-body text-foreground">High-intensity response</TableCell>
                    <TableCell className="font-body text-foreground font-medium">$15k–$30k / week or $40k–$60k / month</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Helper callout */}
          <div className="mt-12 bg-card border border-divider rounded-lg p-8 max-w-3xl">
            <p className="text-base font-body text-foreground leading-relaxed mb-6">
              Not sure where you fit? In one conversation, we'll identify the root constraint and recommend the fastest, cleanest engagement—no upsell, no fluff.
            </p>
            <Link to="/apply">
              <Button variant="primary" size="lg">
                Book a Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Service Details - Accordions */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">
            Service Details
          </h2>
          <Accordion type="single" collapsible className="space-y-4">
            {services.map((service) => (
              <AccordionItem
                key={service.id}
                value={service.id}
                id={service.id}
                className="bg-card border border-divider rounded-lg px-6"
              >
                <AccordionTrigger className="font-heading text-xl font-semibold text-heading hover:no-underline">
                  {service.name}
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <div className="space-y-6">
                    {/* When to use this */}
                    <div>
                      <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-heading mb-3">
                        When to use this
                      </h4>
                      <p className="text-base font-body text-foreground">
                        {service.bestFor}
                      </p>
                    </div>

                    {/* What we do */}
                    <div>
                      <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-heading mb-3">
                        What we do
                      </h4>
                      <p className="text-base font-body text-foreground">
                        {service.oneLine}
                      </p>
                    </div>

                    {/* Key deliverables */}
                    <div>
                      <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-heading mb-3">
                        Key deliverables
                      </h4>
                      <ul className="space-y-2">
                        {service.deliverables.map((deliverable, idx) => (
                          <li
                            key={idx}
                            className="flex items-start gap-3 text-base font-body text-foreground"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                            {deliverable}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Engagement rhythm */}
                    <div>
                      <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-heading mb-3">
                        Engagement rhythm
                      </h4>
                      <p className="text-base font-body text-foreground">
                        {service.engagementRhythm}
                      </p>
                    </div>

                    {/* Pricing */}
                    <div>
                      <h4 className="text-sm font-body font-semibold uppercase tracking-wider text-heading mb-3">
                        Pricing
                      </h4>
                      <p className="text-base font-body text-foreground font-medium">
                        {service.pricing}
                      </p>
                    </div>

                    {/* CTA */}
                    <div className="pt-4">
                      <Link to="/apply">
                        <Button variant="primary" size="lg">
                          Book a Call About This
                        </Button>
                      </Link>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Engagement Models */}
      <section
        id="engagement-models"
        className="bg-section-gradient border-y border-divider"
      >
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-4">
            Engagement Models
          </h2>
          <p className="text-lg font-body text-subtle mb-12 max-w-2xl">
            We don't do hourly consulting or staff augmentation. Every engagement is structured for clear outcomes and accountability.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {engagementModels.map((model, index) => (
              <div
                key={index}
                className="bg-card border border-divider p-8 rounded-lg"
              >
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  {model.name}
                </h3>
                <p className="text-base font-body text-subtle leading-relaxed">
                  {model.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-12">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4 max-w-3xl">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className="bg-card border border-divider rounded-lg px-6"
              >
                <AccordionTrigger className="font-heading text-lg font-semibold text-heading hover:no-underline text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pt-4 pb-6">
                  <p className="text-base font-body text-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              If your tech org is slowing the business down, we should talk.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              In one call, we'll identify the root constraints, your fastest path to stability, and what a clean execution plan looks like.
            </p>
            <Link to="/apply">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Book a Strategy Call
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
