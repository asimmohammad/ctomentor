"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  variant?: "inline" | "footer";
  className?: string;
}

export function NewsletterSignup({ variant = "inline", className = "" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    try {
      // Placeholder: replace with your email provider webhook or API
      // e.g. Mailchimp, ConvertKit, Buttondown, or Supabase table
      await new Promise((r) => setTimeout(r, 500));
      toast({
        title: "Subscribed",
        description: "Thanks for subscribing. You'll receive weekly insights on technology leadership.",
      });
      setEmail("");
    } catch {
      toast({
        title: "Something went wrong",
        description: "Please try again or email directly.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const isFooter = variant === "footer";

  return (
    <form onSubmit={handleSubmit} className={className}>
      <p className={`font-body text-foreground mb-3 ${isFooter ? "text-sm text-primary-foreground/90" : "text-base text-subtle"}`}>
        Get weekly insights on technology leadership, scaling engineering teams, and CTO strategy. No fluff — just lessons from the trenches.
      </p>
      <div className={`flex flex-col sm:flex-row gap-2 ${isFooter ? "max-w-md" : ""}`}>
        <Input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          disabled={loading}
          className={isFooter ? "bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50" : ""}
        />
        <Button type="submit" variant={isFooter ? "secondary" : "primary"} size={isFooter ? "default" : "lg"} disabled={loading}>
          {loading ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
    </form>
  );
}
