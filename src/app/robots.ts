import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/styleguide", "/unsubscribe"],
    },
    sitemap: "https://thectomentor.com/sitemap.xml",
  };
}
