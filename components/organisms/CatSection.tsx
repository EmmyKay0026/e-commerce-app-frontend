// components/organisms/CatSection.tsx
import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCards";
import type { Product } from "@/types/models";

import {
  getCategoryIdFromSlug,
  getCategoryFromSlug,
} from "@/services/preloadCategories";

import { listProductsByCategory } from "@/services/categoryService";

interface CategorySectionProps {
  title: string;
  categorySlug: string;     // ← Required now
  categoryId?: string;      // ← Optional fallback
  limit?: number;
}

export default async function CategorySection({
  title,
  categorySlug,
  categoryId: fallbackId,
  limit = 10,
}: CategorySectionProps) {
  // 1. Get category ID from slug (using preloaded map)
  let categoryId = fallbackId;

  if (!categoryId) {
    const idFromMap = getCategoryIdFromSlug(categorySlug);
    if (!idFromMap) {
      return (
        <section className="mb-16">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">{title}</h2>
          </div>
          <p className="text-gray-500">Category not found.</p>
        </section>
      );
    }
    categoryId = idFromMap;
  }

  // 2. Fetch products server-side
  const result = await listProductsByCategory(categoryId, { limit });

  const products: Product[] = result.success && result.data?.products
    ? result.data.products
    : [];

  // 3. Show loading skeleton if needed (optional: create loading.tsx in parent)
  if (!result.success) {
    return (
      <section className="mb-16">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">{title}</h2>
          <Link
            href={`/category/${categorySlug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            See more →
          </Link>
        </div>
        <p className="text-red-600">Failed to load products.</p>
      </section>
    );
  }

  return (
    <section className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <Link
          href={`/category/${categorySlug}`}
          className="text-sm text-blue-600 hover:underline font-medium"
        >
          See more →
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-gray-500 py-8 text-center">No products available.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCards key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
}