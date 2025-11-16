// app/(categories)/[category]/page.tsx

import { notFound } from "next/navigation";
import SidebarFilter from "@/components/molecules/SidebarFilter";
import ProductCards from "@/components/molecules/ProductCards";
import SearchInput from "@/components/atoms/SearchInput";
import MobileFilterSheet from "@/components/molecules/MobileFilterSheet";
import { Filter } from "lucide-react";
import type { Product, Category } from "@/types/models";

import {
  getCategoryIdFromSlug,
  getCategoryFromSlug,
  preloadCategoryMaps,
} from "@/services/preloadCategories";

import {
  getCategoryById,
  listProductsByCategory,
  getCategoryFilterOptions,
} from "@/services/categoryService";

type PageProps = {
  params: Promise<{ category: string }>;        // AWAIT THIS
  searchParams: Promise<Record<string, string | undefined>>; // AWAIT THIS
};

export default async function CategoryPage({ params, searchParams }: PageProps) {
  // AWAIT BOTH PARAMS AND SEARCHPARAMS
  const { category } = await params;
  const resolvedSearchParams = await searchParams;

  const slug = category.toLowerCase().trim();

  // Preload slug → ID map
  await preloadCategoryMaps();

  const categoryId = getCategoryIdFromSlug(slug);
  if (!categoryId) notFound();

  // Get category from cache or API
  let activeCategory: Category | null = getCategoryFromSlug(slug);
  if (!activeCategory) {
    const res = await getCategoryById(categoryId);
    if (!res.success || !res.data) notFound();
    activeCategory = res.data;
  }

  // Build filters
  const filters = {
    q: resolvedSearchParams.q?.trim() || undefined,
    minPrice: resolvedSearchParams.minPrice ? Number(resolvedSearchParams.minPrice) : undefined,
    maxPrice: resolvedSearchParams.maxPrice ? Number(resolvedSearchParams.maxPrice) : undefined,
    location_state: resolvedSearchParams.state || undefined,
    location_lga: resolvedSearchParams.lga || undefined,
    price_type: (resolvedSearchParams.priceType as "fixed" | "negotiable") || undefined,
    sort: resolvedSearchParams.sort || "recommended",
  };

  // Fetch data
  const [productsRes, filterOptionsRes] = await Promise.all([
    listProductsByCategory(categoryId, filters),
    getCategoryFilterOptions(categoryId, filters),
  ]);

  const products: Product[] = productsRes.success && productsRes.data?.products
    ? productsRes.data.products
    : [];

  const opts = filterOptionsRes.success ? filterOptionsRes.data || {} : {};
  const availableStates = opts.states || [];
  const availableLgasMap = opts.lgas || {};
  const availablePriceTypes = opts.price_types || ["fixed", "negotiable"];
  const priceRange = { min: opts.minPrice, max: opts.maxPrice };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 pb-20">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl md:text-3xl font-bold capitalize">
              {activeCategory.name}
            </h1>

            <div className="flex items-center gap-3">
              <div className="hidden md:block w-80">
                <SearchInput defaultValue={resolvedSearchParams.q || ""} />
              </div>

              <MobileFilterSheet
                activeCategory={slug}
                initialFilters={filters}
                availableStates={availableStates}
                availableLgasMap={availableLgasMap}
                availablePriceTypes={availablePriceTypes}
                priceRange={priceRange}
              >
                <button className="md:hidden p-2.5 border rounded-full hover:bg-gray-100 transition">
                  <Filter size={22} />
                </button>
              </MobileFilterSheet>
            </div>
          </div>

          <div className="mt-4 md:hidden">
            <SearchInput defaultValue={resolvedSearchParams.q || ""} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="hidden md:block">
            <SidebarFilter
              activeCategory={slug}
              initialFilters={filters}
              availableStates={availableStates}
              availableLgasMap={availableLgasMap}
              availablePriceTypes={availablePriceTypes}
              priceRange={priceRange}
            />
          </div>

          <div className="md:col-span-3">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg font-medium">No products found</p>
                <p className="text-gray-500 text-sm mt-2">
                  Try adjusting your filters or search term.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}