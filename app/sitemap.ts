export const dynamic = "force-dynamic";
export const revalidate = 0;

import { MetadataRoute } from "next";
import { getAllCategories } from "@/services/categoryService";
import { getAllProductsForSitemap } from "@/services/productService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://industrialmart.ng";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${baseUrl}/market-place`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  const categories = await getAllCategories();
  const categoryEntries: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/category/${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const products = await getAllProductsForSitemap();
  const productEntries: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.id}`,
    lastModified: new Date(p.updated_at || p.created_at),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...categoryEntries,
    ...productEntries,
  ];
}
