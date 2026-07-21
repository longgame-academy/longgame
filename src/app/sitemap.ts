import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://longgameacademy.com";
  const routes = [
    "",
    "/parent-academy",
    "/organizations",
    "/free-guide",
    "/our-story",
    "/contact",
    "/faq",
    "/privacy",
    "/terms",
    "/cookies",
    "/disclaimer",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}


