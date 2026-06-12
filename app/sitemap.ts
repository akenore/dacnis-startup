import { MetadataRoute } from "next";
import { servicesData } from "@/lib/services-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.dacnis.com";

  // Core pages mapping
  const coreRoutes = ["", "/about", "/services", "/hire-us"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Legal pages mapping
  const legalRoutes = ["/privacy-policy", "/terms-of-service"].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  // Dynamic service sub-routes mapping
  const serviceRoutes = servicesData.map((service) => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...coreRoutes, ...legalRoutes, ...serviceRoutes];
}
