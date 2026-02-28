"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().optional(),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name is too long"),
  companyWebsite: z.string().optional(),
  role: z.string().min(2, "Role must be at least 2 characters").max(100, "Role is too long"),
  stage: z.enum(["pre-seed", "seed", "series-a", "later"], {
    required_error: "Please select a company stage",
  }),
  teamSize: z.string().optional(),
  stack: z.string().optional(),
  challenge: z
    .string()
    .min(10, "Please provide at least 10 characters describing your challenge")
    .max(2000, "Challenge description is too long"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  equityAlignment: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

const whoShouldApply = [
  "Founder-led companies where technology execution is blocking business outcomes",
  "Post-fundraise companies facing execution pressure and scaling challenges",
  "Organizations with CTO/VP Eng gaps or leadership misalignment creating execution risk",
  "Companies preparing for scale, platform shifts, or M&A where technical readiness is critical",
  "Boards and investors who need execution truth, not optimism",
];

const minimumReadiness = [
  "Technology is core to your business model, not a support function",
  "You have meaningful revenue or funding that supports premium engagement",
  "You're ready to give real decision-making authority and execution ownership",
  "The cost of getting technology wrong is high—this isn't a nice-to-have",
  "You're open to discussing compensation structure (cash, and in some cases equity) that aligns with outcomes",
];

const engagementStructure = [
  {
    element: "Compensation",
    description:
      "Cash (monthly retainer or fixed fee) + meaningful equity participation. Equity typically ranges from 0.5%–2% depending on stage, scope, and engagement duration. This alignment ensures we're building value, not billing hours.",
  },
  {
    element: "Authority",
    description:
      "Full execution authority for technology decisions, architecture, team structure, and vendor governance. We operate with CEO-level partnership and explicit decision rights.",
  },
  {
    element: "Accountability",
    description:
      "We own outcomes. Full accountability, complete ownership, dedicated focus. If we engage, we're fully embedded and accountable for results.",
  },
  {
    element: "Duration",
    description:
      "Engagements typically range from 6–12 months for ongoing embedded leadership, or 90 days for fixed-scope turnarounds. I design transitions from day one.",
  },
];

export default function ApplyClient() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      companyWebsite: "",
      role: "",
      stage: undefined,
      teamSize: "",
      stack: "",
      challenge: "",
      budget: "",
      timeline: "",
      equityAlignment: "",
    },
    mode: "onBlur",
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/send-application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const body = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(body?.error ?? `Request failed (${res.status})`);
      }

      toast({
        title: "Application received",
        description: "Thank you. We review every application and will respond within 2 business days.",
      });

      form.reset();
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to submit application. Please try again.";
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Book a Discovery Call
            </h1>
            <p className="mt-6 text-xl font-body text-subtle leading-relaxed">
              This is a mutual selection process. We're selective about engagements, and you should be selective about
              partners. If technology execution is critical and the stakes are high, let's talk.
            </p>
            <p className="mt-4 text-lg font-body text-foreground leading-relaxed font-medium">
              We review every application personally and respond within 2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Who Should Apply */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">Who Should Apply</h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              My engagements are for companies where technology execution is critical and the cost of getting it wrong is
              unacceptable. If you're looking for cheap help, part-time advisory, or fractional consulting, we're not the
              right partner.
            </p>
            <ul className="space-y-4">
              {whoShouldApply.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-base font-body text-foreground">
                  <Check size={20} className="text-accent flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Minimum Readiness Criteria */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              Minimum Readiness Criteria
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Before applying, ensure you meet these criteria. We're direct about fit because misalignment wastes
              everyone's time.
            </p>
            <ul className="space-y-4">
              {minimumReadiness.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-base font-body text-foreground">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 bg-card border border-divider rounded-lg p-6">
              <p className="text-base font-body text-foreground leading-relaxed">
                <strong className="font-semibold">We operate as:</strong> embedded leadership with full accountability
                and equity alignment. We provide executive-level technology leadership, not hourly consulting, part-time
                advisory, staff augmentation, or fractional CTO services.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Engagements Are Structured */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              How Engagements Are Structured
            </h2>
            <p className="text-lg font-body text-foreground leading-relaxed mb-8">
              Every engagement is structured around outcomes and alignment, not hours or time allocation. Here's what to
              expect:
            </p>
            <div className="space-y-6">
              {engagementStructure.map((item, index) => (
                <Card key={index} className="border-divider">
                  <CardContent className="p-6">
                    <h3 className="font-heading text-lg font-semibold text-heading mb-3">{item.element}</h3>
                    <p className="text-base font-body text-foreground leading-relaxed">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* What Happens After You Apply */}
      <section className="bg-section-gradient border-y border-divider">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-heading mb-6">
              What Happens After You Apply
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                  Initial Review (2 Business Days)
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We review every application personally. If there's a potential fit, we'll schedule a 30-minute
                  discovery call to understand your situation, assess alignment, and determine if an engagement makes
                  sense.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">
                  Discovery & Alignment (1–2 Weeks)
                </h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  If we proceed, we'll conduct a deeper assessment: current-state analysis, stakeholder interviews,
                  technical review. We'll define engagement scope, compensation structure (cash + equity), decision
                  rights, and operating cadence. This is mutual selection—we're assessing fit on both sides.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">Engagement Start</h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  If we align, we'll execute a simple engagement agreement and begin immediately. We don't do long sales
                  cycles or complex contracting. We focus on clarity, alignment, and execution.
                </p>
              </div>
              <div>
                <h3 className="font-heading text-lg font-semibold text-heading mb-3">If We're Not a Fit</h3>
                <p className="text-base font-body text-foreground leading-relaxed">
                  We'll tell you directly. If we're not the right partner—whether due to stage, budget, scope, or
                  misalignment—we'll recommend alternatives or suggest when to reconnect. Direct communication, clear
                  timelines, honest assessment.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <div className="mb-8">
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-heading mb-4">Application Form</h2>
              <p className="text-base font-body text-subtle">
                Be direct and specific. The more clarity you provide, the better we can assess fit.
              </p>
            </div>

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-heading mb-4">Contact Information</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Name <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="John Doe"
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Email <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="john@company.com"
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Contact Phone Number
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder="+1 (555) 123-4567"
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Company Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-heading mb-4">Company Information</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Company <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Acme Inc."
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="companyWebsite"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Company Website
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="url"
                                placeholder="https://www.company.com"
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6 mt-6">
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Your Role <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CEO, Founder, CTO, etc."
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="stage"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Company Stage <span className="text-destructive">*</span>
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-card border-divider">
                                  <SelectValue placeholder="Select stage" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="pre-seed">Pre-seed</SelectItem>
                                <SelectItem value="seed">Seed</SelectItem>
                                <SelectItem value="series-a">Series A</SelectItem>
                                <SelectItem value="later">Later Stage</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="teamSize"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Team Size
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g., 12 total, 5 engineers"
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Technical Information */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-heading mb-4">
                      Technical Information
                    </h3>
                    <FormField
                      control={form.control}
                      name="stack"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-body font-medium text-heading">
                            Current Tech Stack
                          </FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., React, Node.js, AWS, PostgreSQL"
                              className="bg-card border-divider focus:border-accent"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-muted-foreground">
                            Optional - Help us understand your current technology landscape
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Challenge */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-heading mb-4">
                      Tell Us About Your Challenge(s)
                    </h3>
                    <FormField
                      control={form.control}
                      name="challenge"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-body font-medium text-heading">
                            Biggest Challenge <span className="text-destructive">*</span>
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              rows={6}
                              placeholder="What's the primary technology or organizational challenge you're facing? Be specific about the stakes and why this matters now."
                              className="bg-card border-divider focus:border-accent resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-muted-foreground">
                            Minimum 10 characters. The more detail, the better we can assess fit.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Budget & Timeline */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-heading font-semibold text-heading mb-4">
                      Engagement Parameters
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="budget"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Budget Range
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-card border-divider">
                                  <SelectValue placeholder="Select range" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="25k-50k">$25,000–$50,000/mo</SelectItem>
                                <SelectItem value="50k-plus">$50,000+/mo</SelectItem>
                                <SelectItem value="fixed-scope">Fixed-scope engagement</SelectItem>
                                <SelectItem value="exploring">Exploring options</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional - Engagements are structured as cash + equity
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Timeline
                            </FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="bg-card border-divider">
                                  <SelectValue placeholder="Select timeline" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="immediate">Immediate</SelectItem>
                                <SelectItem value="1-3-months">1–3 months</SelectItem>
                                <SelectItem value="exploring">Exploring</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="mt-6">
                      <FormField
                        control={form.control}
                        name="equityAlignment"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Equity Alignment
                            </FormLabel>
                            <FormControl>
                              <Textarea
                                rows={3}
                                placeholder="Are you open to equity participation as part of compensation? Any thoughts on structure or alignment? (Optional, but helpful for alignment discussions)"
                                className="bg-card border-divider focus:border-accent resize-none"
                                {...field}
                              />
                            </FormControl>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional - Equity participation may be discussed for embedded leadership engagements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="pt-6 border-t border-divider">
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  <p className="mt-4 text-sm text-muted-foreground">
                    <span className="text-destructive">*</span> Required fields
                  </p>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-white mb-6">
              We're selective. You should be too.
            </h2>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-6">
              I take on a limited number of strategic engagements each year. We're selective because execution at this
              level requires full commitment—from both sides.
            </p>
            <p className="text-lg font-body text-primary-foreground/90 leading-relaxed mb-10">
              If technology execution is critical to your business and the stakes are high, apply. If you're looking for
              cheap help or part-time advisory, we're not the right partner.
            </p>
            <Link href="/services">
              <Button
                variant="outline"
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Learn More About How We Operate
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

