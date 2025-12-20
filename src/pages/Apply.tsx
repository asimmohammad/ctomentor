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
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export default function Apply() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [stage, setStage] = useState<string>("");
  const [budget, setBudget] = useState<string>("");
  const [timeline, setTimeline] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate required fields
    if (!stage) {
      toast({
        title: "Validation Error",
        description: "Please select a company stage.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const applicationData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      company: formData.get("company") as string,
      role: formData.get("role") as string,
      stage: stage,
      teamSize: formData.get("team-size") as string,
      stack: formData.get("stack") as string,
      challenge: formData.get("challenge") as string,
      budget: budget || "",
      timeline: timeline || "",
    };

    try {
      const { data, error } = await supabase.functions.invoke("send-application", {
        body: applicationData,
      });

      if (error) {
        console.error("Supabase function error:", error);
        throw error;
      }

      console.log("Application submitted successfully:", data);

      toast({
        title: "Application received",
        description: "Thank you. I'll be in touch within 2 business days.",
      });
      (e.target as HTMLFormElement).reset();
      setStage("");
      setBudget("");
      setTimeline("");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      const errorMessage = error?.message || "Failed to submit application. Please try again.";
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
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
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-body font-medium text-heading">
                    Name
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    required
                    className="bg-card border-divider focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-body font-medium text-heading">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="bg-card border-divider focus:border-accent"
                  />
                </div>
              </div>

              {/* Company Info */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company" className="text-sm font-body font-medium text-heading">
                    Company
                  </Label>
                  <Input
                    id="company"
                    name="company"
                    required
                    className="bg-card border-divider focus:border-accent"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-sm font-body font-medium text-heading">
                    Your Role
                  </Label>
                  <Input
                    id="role"
                    name="role"
                    required
                    className="bg-card border-divider focus:border-accent"
                  />
                </div>
              </div>

              {/* Stage & Size */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-body font-medium text-heading">
                    Company Stage
                  </Label>
                  <Select value={stage} onValueChange={setStage} required>
                    <SelectTrigger className="bg-card border-divider">
                      <SelectValue placeholder="Select stage" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pre-seed">Pre-seed</SelectItem>
                      <SelectItem value="seed">Seed</SelectItem>
                      <SelectItem value="series-a">Series A</SelectItem>
                      <SelectItem value="later">Later Stage</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="team-size" className="text-sm font-body font-medium text-heading">
                    Team Size
                  </Label>
                  <Input
                    id="team-size"
                    name="team-size"
                    placeholder="e.g., 12 total, 5 engineers"
                    className="bg-card border-divider focus:border-accent"
                  />
                </div>
              </div>

              {/* Tech Stack */}
              <div className="space-y-2">
                <Label htmlFor="stack" className="text-sm font-body font-medium text-heading">
                  Current Tech Stack
                </Label>
                <Input
                  id="stack"
                  name="stack"
                  placeholder="e.g., React, Node.js, AWS, PostgreSQL"
                  className="bg-card border-divider focus:border-accent"
                />
              </div>

              {/* Challenge */}
              <div className="space-y-2">
                <Label htmlFor="challenge" className="text-sm font-body font-medium text-heading">
                  Biggest Challenge
                </Label>
                <Textarea
                  id="challenge"
                  name="challenge"
                  rows={5}
                  required
                  placeholder="What's the primary technology or organizational challenge you're facing?"
                  className="bg-card border-divider focus:border-accent resize-none"
                />
              </div>

              {/* Budget & Timeline */}
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-body font-medium text-heading">
                    Budget Range
                  </Label>
                  <Select value={budget} onValueChange={setBudget}>
                    <SelectTrigger className="bg-card border-divider">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="under-7.5k">Under $7,500/mo</SelectItem>
                      <SelectItem value="7.5k-12.5k">$7,500 – $12,500/mo</SelectItem>
                      <SelectItem value="12.5k-18k">$12,500 – $18,000/mo</SelectItem>
                      <SelectItem value="18k-plus">$18,000+/mo</SelectItem>
                      <SelectItem value="circle">CTO Mentor Circle ($2,500/mo)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm font-body font-medium text-heading">
                    Timeline
                  </Label>
                  <Select value={timeline} onValueChange={setTimeline}>
                    <SelectTrigger className="bg-card border-divider">
                      <SelectValue placeholder="Select timeline" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate</SelectItem>
                      <SelectItem value="1-3-months">1–3 months</SelectItem>
                      <SelectItem value="exploring">Exploring</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="pt-4">
                <Button
                  type="submit"
                  variant="primary"
                  size="xl"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto"
                >
                  {isSubmitting ? "Submitting..." : "Submit Application"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
}
