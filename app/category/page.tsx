// app/categories/page.tsx
import CategorySection from "@/components/organisms/CatSection";
import type { Category } from "@/types/models";
import { getAllCategories } from "@/services/categoryService";
import { preloadCategoryMaps } from "@/services/preloadCategories";

// Optional: cache for 1 hour
export const revalidate = 3600;

export default async function CategoriesPage() {
  // Preload slug → ID map (for links in CategorySection)
  await preloadCategoryMaps();

  // Fetch categories directly — your function already returns Category[]
  const categories: Category[] = await getAllCategories();

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 pt-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h1>
        < h2 className="text-xl text-gray-600">
          Industrial tools, machinery & MRO supplies across Nigeria
        </h2>
      </div>

      {categories.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No categories available at the moment.</p>
        </div>
      ) : (
        <div className="space-y-20">
          {categories.map((category) => (
            <CategorySection
              key={category.id}
              title={category.name}
              categorySlug={category.slug}
              // categoryId={category.id}
              limit={12}
            />
          ))}
        </div>
      )}
    </main>
  );
}