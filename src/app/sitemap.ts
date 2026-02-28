import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://thectomentor.com";

  const routes = [
    "",
    "/services",
    "/investors",
    "/government",
    "/about",
    "/experience",
    "/case-studies",
    "/circle",
    "/apply",
    "/insights",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/insights" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));
}

