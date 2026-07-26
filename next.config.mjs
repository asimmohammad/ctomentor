/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Next 14: use experimental.serverComponentsExternalPackages
  // (serverExternalPackages is Next 15+ and triggers Invalid next.config)
  experimental: {
    serverComponentsExternalPackages: ["@react-pdf/renderer"],
  },
  async redirects() {
    return [
      { source: "/services", destination: "/engagements", permanent: true },
      { source: "/services/:path*", destination: "/engagements", permanent: true },
      { source: "/pricing", destination: "/engagements", permanent: true },
      { source: "/apply", destination: "/engage", permanent: true },
      { source: "/apply/:path*", destination: "/engage", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=0, must-revalidate",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
