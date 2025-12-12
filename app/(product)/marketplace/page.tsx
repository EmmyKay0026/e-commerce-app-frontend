// app/marketplace/page.tsx
import CategoryCards from "@/components/organisms/CategoryCards";
import type { Category, Product } from "@/types/models";
import {
  getAllCategories,
  listProductsByCategory,
} from "@/services/categoryService";
import { listProducts } from "@/services/productService";
import { preloadCategoryMaps } from "@/services/preloadCategories";
import MarketplaceSearchBar from "@/components/atoms/marketSearch"
import Link from "next/link";

export const revalidate = 3600;

interface Props {
  searchParams?: { q?: string };
}

export default async function MarketPlacePage({ searchParams }: Props) {
  const q = searchParams?.q?.trim() || "";

  await preloadCategoryMaps();

  let categories: Category[] = [];
  let productsMap: Record<string, Product[]> = {};
  let searchResults: Product[] | null = null;

  try {
    // 🔍 SERVER-SIDE SEARCH
    if (q.length > 0) {
      const res = await listProducts({ q, perPage: 12 });
      searchResults = res.success ? res.data?.products ?? [] : [];
    }

    // 📦 Fetch all categories
    categories = await getAllCategories();

    // 📦 Fetch products per category (limit to 5 per category)
    const productEntries = await Promise.all(
      categories.map(async (cat) => {
        const res = await listProductsByCategory(cat.id, { limit: 5 });

        const safeProducts =
          res.success && res.data && Array.isArray(res.data.products)
            ? res.data.products
            : [];

        return [cat.id, safeProducts] as [string, Product[]];
      })
    );

    // Build map
    productEntries.forEach(([id, prods]) => {
      productsMap[id] = prods;
    });
  } catch (err) {
    console.error("Marketplace fetch error:", err);
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-20">
        <p className="text-center text-red-600 text-lg">
          Failed to load marketplace.
        </p>
      </main>
    );
  }

  return (
    <main className="max-w-dvw w-full px-4 md:px-6 lg:px-10">
      {/* Header */}
      <div className="mt-6 flex flex-col justify-between md:flex-row relative  px-3 md:px-5 w-full lg:px-18">
        <h1 className="text-4xl font-bold">
          Marketplace
        </h1>
        {/* Client-side Search Bar */}
        <MarketplaceSearchBar initialQuery={q} />
      </div>
      {/* 🔍 Server-side Search Results */}
      {q && (
        <section className="mb-16">
          <h3 className="text-2xl font-semibold mb-6">
            Search results for: <span className="text-primary">“{q}”</span>
          </h3>

          {searchResults && searchResults.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {searchResults.map((p) => (
                <Link
                  key={p.id}
                  href={`/products/${p.slug}`}
                  className="border rounded-lg p-4 hover:shadow"
                >
                  <div className="h-40 bg-gray-100 rounded mb-3 overflow-hidden">
                    {p.images && p.images[0] ? (
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="font-medium text-gray-900">{p.name}</div>
                  <div className="text-primary text-sm">
                    {p.price || p.price_type || "Price on request"}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}

          <div className="mt-4">
            <Link href="/marketplace" className="text-primary underline">
              Clear search
            </Link>
          </div>
        </section>
      )}

      {/* CATEGORY SECTIONS */}
      {!q && (
        <div className="space-y-20">
          {categories
            .filter(cat => (productsMap[cat.id]?.length ?? 0) > 0)
            .map((cat) => (
              <div key={cat.id}>
                <CategoryCards
                  categoryTitle={cat.name}
                  categoryProduct={productsMap[cat.id]}
                  categoryLink={`/category/${cat.slug}`}
                />
              </div>
            ))
          }
        </div>
      )}
    </main>
  );
}
