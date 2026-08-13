import type { MetadataRoute } from "next";
import { getPublishableInsights } from "@/lib/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thectomentor.com";

  const routes: { path: string; priority: number; changeFrequency: "weekly" | "monthly" }[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/assessment", priority: 0.95, changeFrequency: "monthly" },
    { path: "/engineering-assessment", priority: 0.9, changeFrequency: "monthly" },
    { path: "/book", priority: 0.9, changeFrequency: "monthly" },
    { path: "/engage", priority: 0.4, changeFrequency: "monthly" },
    { path: "/engagements", priority: 0.9, changeFrequency: "monthly" },
    { path: "/how-i-work", priority: 0.8, changeFrequency: "monthly" },
    { path: "/vigil", priority: 0.75, changeFrequency: "monthly" },
    { path: "/investors", priority: 0.8, changeFrequency: "monthly" },
    { path: "/government", priority: 0.7, changeFrequency: "monthly" },
    { path: "/about", priority: 0.7, changeFrequency: "monthly" },
    { path: "/experience", priority: 0.6, changeFrequency: "monthly" },
    { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
    { path: "/insights", priority: 0.8, changeFrequency: "weekly" },
    { path: "/privacy", priority: 0.3, changeFrequency: "monthly" },
    { path: "/terms", priority: 0.3, changeFrequency: "monthly" },
  ];

  const insightRoutes = getPublishableInsights().map(([slug]) => ({
    url: `${baseUrl}/insights/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    ...routes.map(({ path, priority, changeFrequency }) => ({
      url: `${baseUrl}${path}`,
      lastModified: new Date(),
      changeFrequency,
      priority,
    })),
    ...insightRoutes,
  ];
}
