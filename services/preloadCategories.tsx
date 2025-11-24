// services/preloadCategories.ts  ← NEW FILE
import type { Category } from "@/types/models";

let slugToIdMap: Record<string, string> = {};
let idToCategoryMap: Record<string, Category> = {};
let isPreloaded = false;

export const preloadCategoryMaps = async (): Promise<void> => {
  if (isPreloaded) return;

  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || "https://e-commerce-app-backend-khxb.onrender.com/api";
    const res = await fetch(`${baseUrl}/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) throw new Error("Failed");

    const json = await res.json();

    if (json.success && Array.isArray(json.data)) {
      json.data.forEach((cat: Category) => {
        if (cat.slug && cat.id) {
          const key = cat.slug.toLowerCase().trim();
          slugToIdMap[key] = cat.id;
          idToCategoryMap[cat.id] = cat;
        }
      });
    }

    isPreloaded = true;
  } catch (error) {
    console.error("Preload failed:", error);
    isPreloaded = true;
  }
};

export const getCategoryIdFromSlug = (slug: string): string | null => {
  return slugToIdMap[slug.toLowerCase().trim()] || null;
};

export const getCategoryFromSlug = (slug: string): Category | null => {
  const id = getCategoryIdFromSlug(slug);
  return id ? idToCategoryMap[id] : null;
};