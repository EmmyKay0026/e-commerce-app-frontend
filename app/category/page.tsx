// app/categories/page.tsx
import CategorySection from "@/components/organisms/CatSection";
import type { Category } from "@/types/models";
import { getAllCategories, listProductsByCategory } from "@/services/categoryService";
import { preloadCategoryMaps } from "@/services/preloadCategories";

export const revalidate = 3600;

export default async function CategoriesPage() {
  await preloadCategoryMaps();
  
  // Fetch all categories
  const categories: Category[] = await getAllCategories();

  // Fetch 1 product per category to check if it has products
  const categoriesWithProducts = [];

  for (const cat of categories) {
    const res = await listProductsByCategory(cat.id, { limit: 1 });

    const productCount =
      res.success && res.data && Array.isArray(res.data.products)
        ? res.data.products.length
        : 0;

    if (productCount > 0) {
      categoriesWithProducts.push(cat);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 pt-24">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Shop by Category
        </h1>
        <h2 className="text-xl text-gray-600">
          Industrial tools, machinery & MRO supplies across Nigeria
        </h2>
      </div>

      {categoriesWithProducts.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">
            No categories available at the moment.
          </p>
        </div>
      ) : (
        <div className="space-y-20">
          {categoriesWithProducts.map((category) => (
            <CategorySection
              key={category.id}
              title={category.name}
              categorySlug={category.slug}
              limit={12}
            />
          ))}
        </div>
      )}
    </main>
  );
}
