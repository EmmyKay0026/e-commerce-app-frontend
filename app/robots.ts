// app/robots.ts
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/auth/",
          "/signIn",
          "/register",
          "/user/settings",
          "/user/create-business-account",
          "/admin",
          "/api/",
        ],
      },
    ],
    sitemap: "https://industrialmart.ng/sitemap.xml",
  };
}