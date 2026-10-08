import type { MetadataRoute } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name}: web, mobile, AI and cyber security agency`,
    short_name: site.name,
    description: getDictionary(defaultLocale).meta.description,
    start_url: "/",
    display: "standalone",
    background_color: "#03030d",
    theme_color: "#03030d",
    icons: [
      { src: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/images/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
