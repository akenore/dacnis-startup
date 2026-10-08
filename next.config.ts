import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

/*
 * Content Security Policy: only this site and Google Tag Manager / Google Analytics 4 (the
 * only tags in the GTM container) may load scripts, send data or frame content. Origins follow
 * Google's guide (developers.google.com/tag-platform/security/guides/csp), including GTM
 * Preview Mode (tagmanager.google.com, gstatic, Google Fonts) so tags can be tested before publishing.
 * 'unsafe-inline' is needed by Next.js hydration scripts and the GTM snippet on static pages.
 * If a new tag is added in GTM (Meta Pixel, Hotjar, LinkedIn...), add its domains here or it
 * will be blocked: check the browser console after publishing the GTM container.
 */
const google = "https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.g.doubleclick.net https://*.google.com https://*.google.tn";
const gtmPreview = {
  script: "https://tagmanager.google.com",
  style: "https://*.googletagmanager.com https://tagmanager.google.com https://fonts.googleapis.com",
  img: "https://ssl.gstatic.com https://www.gstatic.com",
  font: "https://fonts.gstatic.com data:",
};
const csp = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""} https://*.googletagmanager.com ${gtmPreview.script}`,
  `style-src 'self' 'unsafe-inline' ${gtmPreview.style}`,
  `img-src 'self' data: blob: ${google} ${gtmPreview.img}`,
  `font-src 'self' ${gtmPreview.font}`,
  `connect-src 'self' ${google} https://pagead2.googlesyndication.com${isDev ? " ws:" : ""}`,
  "frame-src https://www.googletagmanager.com",
  "worker-src 'self' blob:",
  "manifest-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  ...(isDev ? [] : ["upgrade-insecure-requests"]),
].join("; ");

// HSTS is not set here: Plesk sends it (Domains > SSL/TLS Certificates > HSTS).
// Sending it from both places produced two different headers.
const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), browsing-topics=()" },
  // Asks the server's mod_pagespeed (enabled by Plesk) not to rewrite our responses: it renames
  // Next.js chunks and edits the HTML, which breaks hydration. Disable it in Plesk as well.
  { key: "PageSpeed", value: "off" },
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
      // GTM Preview Mode (Tag Assistant) opens the site with ?gtm_debug= and talks to it through
      // window.opener, which COOP same-origin cuts. Relax COOP for those preview visits only;
      // as the later rule, it overrides the value above.
      {
        source: "/:path*",
        has: [{ type: "query", key: "gtm_debug" }],
        headers: [{ key: "Cross-Origin-Opener-Policy", value: "unsafe-none" }],
      },
      // AI assistants read these as plain text; an hour of caching keeps open offers current.
      { source: "/:file(llms.txt|llms-full.txt)", headers: [{ key: "Cache-Control", value: "public, max-age=3600" }] },
    ];
  },
};

export default nextConfig;
