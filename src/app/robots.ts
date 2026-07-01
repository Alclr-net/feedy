import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/privacy-policy", "/terms", "/contact", "/signup", "/signIn", "/u/"],
        disallow: ["/dashboard", "/api/", "/auth/"],
      },
    ],
    sitemap: "https://feedy.converzion.in/sitemap.xml",
    host: "https://feedy.converzion.in",
  };
}
