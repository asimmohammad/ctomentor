import { Layout } from "@/components/layout/Layout";
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
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

// Form validation schema
const applicationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().email("Please enter a valid email address"),
  company: z.string().min(2, "Company name must be at least 2 characters").max(100, "Company name is too long"),
  role: z.string().min(2, "Role must be at least 2 characters").max(100, "Role is too long"),
  stage: z.enum(["pre-seed", "seed", "series-a", "later"], {
    required_error: "Please select a company stage",
  }),
  teamSize: z.string().optional(),
  stack: z.string().optional(),
  challenge: z.string().min(10, "Please provide at least 10 characters describing your challenge").max(2000, "Challenge description is too long"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
});

type ApplicationFormValues = z.infer<typeof applicationSchema>;

export default function Apply() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ApplicationFormValues>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      name: "",
      email: "",
      company: "",
      role: "",
      stage: undefined,
      teamSize: "",
      stack: "",
      challenge: "",
      budget: "",
      timeline: "",
    },
    mode: "onBlur", // Validate on blur for better UX
  });

  const onSubmit = async (data: ApplicationFormValues) => {
    console.log("[APPLY FORM] Form submission started at", new Date().toISOString());
    console.log("[APPLY FORM] Validated form data:", {
      ...data,
      challenge: data.challenge.substring(0, 50) + "...", // Truncate for logging
    });

    setIsSubmitting(true);

    // Check Supabase client
    if (!supabase) {
      console.error("[APPLY FORM] Supabase client not initialized");
      toast({
        title: "Error",
        description: "Application service unavailable. Please refresh and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      console.log("[APPLY FORM] Invoking Supabase function 'send-application'...");
      console.log("[APPLY FORM] Supabase URL:", import.meta.env.VITE_SUPABASE_URL ? "Configured" : "Missing");

      const startTime = Date.now();
      const { data: responseData, error } = await supabase.functions.invoke("send-application", {
        body: data,
      });
      const duration = Date.now() - startTime;

      console.log(`[APPLY FORM] Function invocation completed in ${duration}ms`);
      console.log("[APPLY FORM] Supabase function response:", {
        data: responseData,
        error,
        hasData: !!responseData,
        hasError: !!error,
      });

      if (error) {
        console.error("[APPLY FORM] Supabase function error:", {
          message: error.message,
          status: error.status,
          context: error.context,
          error,
        });
        throw error;
      }

      if (responseData?.error) {
        console.error("[APPLY FORM] Function returned error in response:", responseData.error);
        throw new Error(responseData.error);
      }

      console.log("[APPLY FORM] Application submitted successfully:", responseData);
      console.log("[APPLY FORM] Form submission completed successfully at", new Date().toISOString());

      toast({
        title: "Application received",
        description: "Thank you. I'll be in touch within 2 business days.",
      });

      console.log("[APPLY FORM] Resetting form...");
      form.reset();
      console.log("[APPLY FORM] Form reset complete");
    } catch (error: any) {
      console.error("[APPLY FORM] Error submitting application:", {
        message: error?.message,
        name: error?.name,
        stack: error?.stack,
        error,
        timestamp: new Date().toISOString(),
      });

      const errorMessage = error?.message || error?.error?.message || "Failed to submit application. Please try again.";
      console.error("[APPLY FORM] Displaying error toast:", errorMessage);

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      console.log("[APPLY FORM] Setting isSubmitting to false");
      setIsSubmitting(false);
    }
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-warm-gradient">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-semibold text-heading leading-tight">
              Apply to Work Together
            </h1>
            <p className="mt-6 text-xl font-body text-subtle">
              Tell me about your situation. I review every application
              personally and respond within 2 business days.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="bg-background">
        <div className="container mx-auto px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-2xl">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Contact Information Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-heading mb-4">
                      Contact Information
                    </h2>
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
                    </div>
                  </div>
                </div>

                {/* Company Information Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-heading mb-4">
                      Company Information
                    </h2>
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
                        name="role"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-sm font-body font-medium text-heading">
                              Your Role <span className="text-destructive">*</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="CTO, Founder, etc."
                                className="bg-card border-divider focus:border-accent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid sm:grid-cols-2 gap-6 mt-6">
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

                {/* Technical Information Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-heading mb-4">
                      Technical Information
                    </h2>
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
                            Optional - Help me understand your current technology landscape
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Challenge Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-heading mb-4">
                      Tell Me About Your Challenge
                    </h2>
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
                              placeholder="What's the primary technology or organizational challenge you're facing? Be as detailed as you'd like."
                              className="bg-card border-divider focus:border-accent resize-none"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription className="text-xs text-muted-foreground">
                            Minimum 10 characters. The more detail, the better I can help.
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Budget & Timeline Section */}
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-heading font-semibold text-heading mb-4">
                      Budget & Timeline
                    </h2>
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
                                <SelectItem value="under-7.5k">Under $7,500/mo</SelectItem>
                                <SelectItem value="7.5k-12.5k">$7,500 – $12,500/mo</SelectItem>
                                <SelectItem value="12.5k-18k">$12,500 – $18,000/mo</SelectItem>
                                <SelectItem value="18k-plus">$18,000+/mo</SelectItem>
                                <SelectItem value="circle">CTO Mentor Circle ($2,500/mo)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription className="text-xs text-muted-foreground">
                              Optional
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
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6 border-t border-divider">
                  <Button
                    type="submit"
                    variant="primary"
                    size="xl"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto min-w-[200px]"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="mr-2">Submitting...</span>
                        <span className="animate-spin">⏳</span>
                      </>
                    ) : (
                      "Submit Application"
                    )}
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
    </Layout>
  );
}
