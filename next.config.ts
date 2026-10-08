import type { NextConfig } from "next";

const securityHeaders = [
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Unmatched URLs outside a locale get a bilingual 404 (app/global-not-found.tsx).
    globalNotFound: true,
    // The whole stylesheet is small: inlining it removes a render-blocking request.
    inlineCss: true,
  },
  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      // AI assistants read these as plain text; an hour of caching keeps open offers current.
      { source: "/:file(llms.txt|llms-full.txt)", headers: [{ key: "Cache-Control", value: "public, max-age=3600" }] },
    ];
  },
};

export default nextConfig;
