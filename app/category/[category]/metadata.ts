import { Metadata } from "next";
import type { Category } from "@/types/models";
import {
  getCategoryIdFromSlug,
  getCategoryFromSlug,
  preloadCategoryMaps,
} from "@/services/preloadCategories";
import { getCategoryById } from "@/services/categoryService";

type Props = { params: { category: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.category.toLowerCase().trim();

  // Preload categories
  await preloadCategoryMaps();
  const categoryId = getCategoryIdFromSlug(slug);
  if (!categoryId) return { title: "Category Not Found | Industrial Mart NG" };

  // Fetch category from cache or API
  let activeCategory: Category | null = getCategoryFromSlug(slug);
  if (!activeCategory) {
    const res = await getCategoryById(categoryId);
    if (!res.success || !res.data) return { title: "Category Not Found | Industrial Mart NG" };
    activeCategory = res.data;
  }

  const siteUrl = "https://industrialmart.ng";
  const canonical = `${siteUrl}/category/${activeCategory.slug}`;

  // Category Schema
  const categorySchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: activeCategory.name,
    description: activeCategory.description || `Browse ${activeCategory.name} products`,
    url: canonical,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: activeCategory.name,
          item: canonical,
        },
      ],
    },
  };

  return {
    title: `${activeCategory.name} - Industrial Equipment & Tools | Industrial Mart NG`,
    description:
      activeCategory.description ||
      `Browse verified suppliers for ${activeCategory.name} in Nigeria. Wholesale prices, fast delivery, quality guaranteed.`,
    metadataBase: new URL(siteUrl),
    alternates: { canonical },
    openGraph: {
      title: `${activeCategory.name} - Industrial Mart NG`,
      description: `Top ${activeCategory.name} from trusted Nigerian suppliers`,
      url: canonical,
      type: "website",
      images: [
        {
          url: activeCategory.image || "/default-category.jpg",
          width: 1200,
          height: 630,
          alt: `${activeCategory.name} category`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${activeCategory.name} - Industrial Mart NG`,
      description: `Browse ${activeCategory.name} from verified suppliers`,
      images: [activeCategory.image || "/default-category.jpg"],
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
    other: {
      "ld+json": JSON.stringify(categorySchema),
    },
  };
}


// ----------------------------
// CATEGORY SCHEMA (OPTION B)
// ----------------------------

export async function generateCategorySchema(params: { category: string }) {
  const slug = params.category.toLowerCase().trim();

  // Ensure preload data is available
  await preloadCategoryMaps();

  // Resolve slug → ID
  const categoryId = getCategoryIdFromSlug(slug);
  if (!categoryId) return null;

  // Try preload cache
  let cat = getCategoryFromSlug(slug);

  // Fallback to API
  if (!cat) {
    const res = await getCategoryById(categoryId);
    if (!res.success || !res.data) return null;
    cat = res.data;
  }

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: cat.name,
    description: cat.description || `Browse ${cat.name} products`,
    url: `https://industrialmart.ng/category/${cat.slug}`,
    breadcrumb: {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://industrialmart.ng",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: cat.name,
          item: `https://industrialmart.ng/category/${cat.slug}`,
        },
      ],
    },
  };
}
