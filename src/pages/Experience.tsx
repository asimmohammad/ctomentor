import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";

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
              TCM's credibility comes from repeated exposure to real operating complexity—not abstract theory. This is the experience behind Operator-in-Residence and Equity CTO engagements.
            </p>
            <p className="mt-4 text-lg font-body text-foreground leading-relaxed">
              When you engage TCM, you're hiring a firm with battle-tested operators who have seen these patterns before.
            </p>
          </div>
        </div>
      </section>

      {/* Where We've Been Brought In */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Where We've Been Brought In
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              These are the scenarios where we've been engaged. Not companies or roles—situations where technology execution was existential and an Operator-in-Residence model was required.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Pre-revenue platforms struggling to reach product-market fit
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="text-base font-body text-foreground">
                    <strong>Situation:</strong> Product exists but isn't finding market traction. Engineering velocity is slow, architecture decisions compound, and runway is burning.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why technology was existential:</strong> Product-market fit requires rapid iteration. Slow delivery velocity kills experiments before they can validate. Architecture that doesn't scale blocks growth when traction arrives.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why Operator-in-Residence was required:</strong> Founders need execution authority, not advice. Fractional consulting doesn't own outcomes. Full-time CTO hire is premature and expensive. Embedded operator owns delivery and makes decisions that hold.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Post-seed and Series A companies with scaling pain
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="text-base font-body text-foreground">
                    <strong>Situation:</strong> Company has traction and revenue, but systems are breaking under load. Engineering team is firefighting. Growth is constrained by technical limitations.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why technology was existential:</strong> Scaling pain kills growth momentum. Customer experience degrades. Engineering team burns out. Investors lose confidence when execution stalls.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why Operator-in-Residence was required:</strong> Scaling requires immediate decisions and execution authority. Advisory doesn't fix broken systems. Full-time CTO search takes months. Embedded operator stabilizes, scales, and transitions to permanent leadership.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Founder-led engineering teams that outgrew their architecture
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="text-base font-body text-foreground">
                    <strong>Situation:</strong> Founder built the initial product, but architecture doesn't scale. Team is growing, but technical decisions are ad-hoc. Technical debt compounds faster than it's addressed.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why technology was existential:</strong> Architecture that worked at 10 customers breaks at 100. Founder time is split between product and infrastructure. Team velocity slows as systems become harder to change.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why Operator-in-Residence was required:</strong> Architecture decisions require immediate authority and execution. Founders need to focus on product and customers, not infrastructure. Embedded operator owns architecture while founder transitions to strategic leadership.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Companies with high burn and low delivery velocity
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="text-base font-body text-foreground">
                    <strong>Situation:</strong> Engineering spend is high, but delivery is slow. Team is large but output is low. Runway is burning without corresponding progress.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why technology was existential:</strong> High burn with low velocity kills companies. Investors lose confidence. Runway compresses. Team morale collapses when effort doesn't translate to outcomes.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why Operator-in-Residence was required:</strong> Velocity problems require immediate diagnosis and intervention. Advisory doesn't fix broken processes. Full-time hire takes too long. Embedded operator owns delivery velocity and makes hard decisions about team and process.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Boards losing confidence in technical execution
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="text-base font-body text-foreground">
                    <strong>Situation:</strong> Board is questioning technical leadership. Execution is inconsistent. Technical risk is compounding. Investors need clarity on technology strategy and execution.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why technology was existential:</strong> Board confidence is required for fundraising and strategic decisions. Technical execution risk blocks growth. Investors need execution truth, not optimism.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why Operator-in-Residence was required:</strong> Boards need technical leadership they can trust. Advisory doesn't restore confidence. Full-time hire is risky when execution is already in question. Embedded operator provides immediate credibility and execution truth.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Transitions after CTO departure or failed hires
                </h3>
                <ul className="space-y-2 ml-4">
                  <li className="text-base font-body text-foreground">
                    <strong>Situation:</strong> CTO left or was terminated. Engineering team is adrift. Technical decisions are stalled. Product development is blocked.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why technology was existential:</strong> Technical leadership vacuum kills momentum. Engineering team loses direction. Product development stalls. Customers and investors notice when execution stops.
                  </li>
                  <li className="text-base font-body text-foreground">
                    <strong>Why Operator-in-Residence was required:</strong> Transitions require immediate leadership and stabilization. Full-time CTO search takes months. Team needs direction now. Embedded operator provides immediate leadership, stabilizes execution, and transitions to permanent hire.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scope of Experience */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Scope of Experience
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Our operating experience spans company stages, business models, technical domains, organizational complexity, and risk environments. This breadth enables pattern recognition across similar situations, even when the specifics differ.
            </p>
            <div className="space-y-8">
              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                  Company Stages
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed mb-3">
                  We have operated across the full company lifecycle: pre-seed platforms building product-market fit, post-seed and Series A companies scaling under growth pressure, growth-stage companies managing complexity at scale, and mature organizations executing strategic transformations.
                </p>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Each stage requires different operating approaches. Early-stage needs architecture that scales. Growth-stage needs systems that hold under load. Mature organizations need transformation without disruption. We've operated in all of these contexts.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                  Business Models
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed mb-3">
                  Our experience includes multi-tenant SaaS platforms serving thousands of customers, B2B2C marketplaces connecting multiple stakeholder groups, fintech-adjacent platforms requiring regulatory compliance, and data platforms monetizing information assets.
                </p>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Different business models require different technical architectures and operating models. SaaS needs multi-tenancy and scale. Marketplaces need real-time matching and transaction processing. Fintech-adjacent requires compliance and risk controls. Data platforms need ingestion, processing, and delivery at scale. We've built and operated all of these.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                  Technical Domains
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed mb-3">
                  We have owned responsibility for cloud platform architecture and operations, data pipeline design and execution, AI and machine learning systems in production, payments and transaction processing, identity and access management, and platform APIs consumed internally and externally.
                </p>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Technical depth matters when making architecture decisions. We've owned these domains end-to-end: design, build, operate, scale. This experience enables us to make informed decisions about tradeoffs, risks, and outcomes.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                  Organizational Complexity
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed mb-3">
                  We have led engineering organizations spanning multiple countries and time zones, managed vendor ecosystems with dozens of technology partners, executed M&A transitions where technical integration was critical, and coordinated cross-functional teams across product, engineering, data, and operations.
                </p>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Organizational complexity compounds technical complexity. Global teams require different operating cadences. Vendor ecosystems require integration and relationship management. M&A transitions require technical due diligence and integration planning. We've managed all of these.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                  Risk Environments
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed mb-3">
                  We have operated in heavily regulated industries including banking, insurance, and professional services, built and operated revenue-critical systems where downtime directly impacts business outcomes, managed data governance and compliance programs, and executed technical transformations where failure risk was high.
                </p>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Risk environments require different operating discipline. Regulated industries need compliance and auditability. Revenue-critical systems need reliability and redundancy. High-risk transformations need careful planning and execution. We've operated in all of these contexts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Early-Stage Venture Build and Scale */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Early-Stage Venture Build and Scale
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has led technical execution for early-stage companies from founding through growth stages. Across multiple engagements, we have built product and technology functions from the ground up, established operating discipline before scale becomes a constraint, and prepared companies for rapid growth.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when early-stage companies need technical leadership but aren't ready for a full-time CTO hire. These engagements require building systems that can scale, establishing technical culture and processes, and making architecture decisions that hold under growth pressure.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Built product and technology functions from zero to scale-ready operations
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Established technical architecture and operating models before technical debt compounds
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Prepared companies for 10x growth without requiring platform rewrites
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Operated in technical co-founder or acting CTO capacity during critical growth phases
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Multi-Tenant SaaS and Platform Architecture */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Multi-Tenant SaaS and Platform Architecture
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has designed, built, and scaled multi-tenant SaaS platforms serving thousands of customers. Across multiple engagements, we have architected platforms that support high-volume transaction processing, real-time data processing, and scalable microservices architectures.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when companies need to modernize monolithic systems, scale platforms under load, or build new platform capabilities. These engagements require understanding tradeoffs between rebuild and refactor, buy versus build, and consolidation versus diversification.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Architected multi-tenant platforms processing millions of transactions daily
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Designed and deployed microservices architectures with real-time processing capabilities
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Built platform capabilities consumed internally and externally through APIs
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Modernized legacy systems to support new business models and scale requirements
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Data, Analytics, and AI Systems */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Data, Analytics, and AI Systems
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has built data systems handling petabytes of information, machine learning platforms supporting real-time recommendations, and analytics infrastructure enabling data-driven decision-making. Across multiple engagements, we have designed data architectures that support high-volume ingestion, near real-time processing, and scalable delivery mechanisms.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when companies need to build data capabilities from scratch, modernize legacy data infrastructure, or enable AI and machine learning at scale. These engagements require understanding data governance, privacy controls, and how to build systems that support both operational and analytical workloads.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Built big data execution architectures supporting high-volume ingestion and real-time machine learning
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Designed data lineage and governance systems for regulatory compliance and risk management
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Implemented machine learning platforms leveraging open-source technologies for personalization and recommendations
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Reduced data infrastructure costs by millions through optimized architecture and vendor management
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Filed multiple patents related to data collection, processing, and analytics frameworks
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Regulated and Compliance-Heavy Environments */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Regulated and Compliance-Heavy Environments
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has operated in heavily regulated environments including banking, insurance, and professional services. Across multiple engagements, we have built systems that meet regulatory requirements, reduce compliance risk, and enable business outcomes within strict governance frameworks.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when companies need to reduce regulatory risk, implement data governance programs, or build systems that meet compliance requirements. These engagements require understanding regulatory frameworks, designing systems for auditability, and balancing compliance with business velocity.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Built data governance and regulatory risk systems that freed hundreds of millions in capital reserve
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Designed and implemented data lineage and discovery tools for regulatory compliance
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Executed EU and US data privacy controls including GDPR compliance
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Managed technology functions in regulated industries with strict audit and compliance requirements
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Global and Distributed Engineering Organizations */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Global and Distributed Engineering Organizations
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has led engineering organizations spanning multiple countries, time zones, and cultures. Across multiple engagements, we have managed distributed teams, coordinated development across international locations, and established operating cadences that work across boundaries.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when companies need to scale engineering teams globally, coordinate work across distributed locations, or establish operating discipline in organizations that span multiple regions. These engagements require understanding how to build culture, processes, and systems that work across time zones and cultural differences.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Led unified stakeholder groups across multiple international locations including DBAs, architects, developers, and infrastructure engineers
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Managed engineering teams of 150+ resources with budgets exceeding $20M
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Established agile methodologies that compressed development lifecycle times by 50%
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Coordinated company-wide proof of concepts and rollouts involving 25+ senior leaders
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Turnarounds, Recoveries, and Stalled-Product Interventions */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Turnarounds, Recoveries, and Stalled-Product Interventions
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has stabilized organizations where delivery had stalled, products were failing, and execution risk was compounding. Across multiple engagements, we have executed rapid interventions to restore delivery velocity, fix broken systems, and reestablish operating discipline.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when companies need immediate stabilization, when vendor relationships have failed, or when technical debt has blocked product development. These engagements require rapid diagnosis, immediate decision-making authority, and execution velocity to restore confidence and momentum.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Stabilized organizations where vendor relationships failed and offshore teams lost alignment
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Executed rapid interventions to restore delivery velocity and reestablish operating discipline
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Fixed broken systems and processes that were blocking product development and business outcomes
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Reduced vendor expenses by 70% through negotiation and vendor consolidation
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Board-Level and Investor-Facing Technical Leadership */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Board-Level and Investor-Facing Technical Leadership
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Our team has worked directly with boards, investors, and executives during moments of execution risk and transition. Across multiple engagements, we have provided technical leadership that boards and investors trust, delivered execution truth instead of optimism, and aligned technical decisions with business and investor priorities.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              We have repeatedly been brought in when boards need technical clarity, when investors need execution truth, or when executives need technical leadership they can trust. These engagements require understanding how boards and investors think about technology risk, communicating technical reality in business terms, and building confidence through execution.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Served as board members and advisors providing technical oversight and strategic guidance
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Prepared and delivered executive-level presentations to internal and external audiences including boards and investors
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Served as investors and advisors to multiple startups, providing technical due diligence and strategic guidance
              </li>
              <li className="flex items-start gap-3 text-base font-body text-foreground">
                <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                Aligned technical execution with business priorities and investor expectations during critical growth phases
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* What This Means for Engagements */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              What This Means for Engagements
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              This experience translates directly into Operator-in-Residence and Equity CTO engagements. When we engage, we're not learning on your dime. We're applying patterns we've seen before, decisions we've made before, and outcomes we've delivered before.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-6">
              Pattern recognition accelerates execution. We know what questions to ask, what risks to assess, and what decisions need to happen first. We've seen similar situations before, so we can move faster and with more confidence.
            </p>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              This is why Operator-in-Residence engagements work. We're not advisors learning your business—we're operators who have operated in similar situations before, bringing that experience to bear immediately.
            </p>
            <div className="bg-card border border-divider rounded-lg p-8">
              <h3 className="font-heading text-xl font-semibold text-heading mb-4">
                Experience That Matters
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Repeated exposure to real operating complexity, not abstract theory
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Pattern recognition across similar situations and outcomes
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Execution velocity from having seen these patterns before
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Credibility with boards, investors, and executives
                </li>
                <li className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  Battle-tested operators, not consultants learning on the job
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What This Experience Enables */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              What This Experience Enables
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              This operating history directly enables Operator-in-Residence effectiveness. When we engage, we deliver immediate impact without the onboarding drag that slows typical CTO hires or the learning curve that constrains advisory relationships.
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Faster Diagnosis
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We've seen similar situations before. We know what questions to ask, what signals to look for, and what risks to assess first. This enables rapid diagnosis of technical problems, organizational issues, and execution blockers without weeks of discovery.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Fewer False Starts
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  Pattern recognition prevents repeating mistakes we've seen before. We know which approaches work and which don't in similar contexts. This reduces false starts, wasted effort, and the cost of learning through failure.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Better Executive Judgment Under Pressure
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We've made critical decisions under pressure before. We've balanced speed, risk, and quality when stakes were high. This experience enables better judgment when execution is critical and the cost of getting it wrong is unacceptable.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Clearer Tradeoffs Between Speed, Risk, and Quality
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We've navigated the tension between moving fast and building right. We've seen what happens when you optimize for speed at the expense of quality, and when you optimize for quality at the expense of speed. This enables clearer tradeoff decisions that align with business priorities.
                </p>
              </div>

              <div>
                <h3 className="font-heading text-xl font-semibold text-heading mb-3">
                  Credibility with Boards, Investors, and Senior Engineers
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We've worked directly with boards and investors. We've led senior engineering teams. We've delivered execution truth instead of optimism. This credibility enables trust and confidence when technical leadership is questioned or when execution risk is high.
                </p>
              </div>
            </div>
            <p className="text-lg font-body text-foreground leading-relaxed mt-10 pt-8 border-t border-divider">
              This is why Operator-in-Residence engagements deliver immediate impact. We're not a typical CTO hire who needs months to learn your business, and we're not an advisory relationship that provides guidance without execution authority. We're operators who have operated in similar situations before, bringing that experience to bear from day one.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              When technology execution is critical, experience matters.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              This experience is what you're hiring when you engage TCM as Operator-in-Residence. Not abstract theory. Not learning on the job. Battle-tested operators who have seen these patterns before.
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
