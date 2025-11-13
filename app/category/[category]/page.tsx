"use client";
import React, {
  useMemo,
  useState,
  useCallback,
  useEffect,
  use,
} from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import SidebarFilter, { type FilterState } from "@/components/molecules/SidebarFilter";
import ProductCards from "@/components/molecules/ProductCards";
import { Filter, X } from "lucide-react";
import type { Product, Category } from "@/types/models";
import { listProducts } from "@/services/productService";
import { useCategoryStore } from "@/store/useCategoryStore";
import Script from "next/script";
import { generateCategorySchema } from "./metadata";

// Helper function to parse price (handles strings, undefined, commas, etc.)
const parsePrice = (price: string | undefined): number | null => {
  if (!price) return null;
  // Remove currency symbols, commas, and whitespace
  const cleaned = price.replace(/[₦,\s]/g, "");
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? null : parsed;
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { categories, fetchCategories, loading: loadingCats } = useCategoryStore();
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [schema, setSchema] = useState<any>(null);
  const [showFilter, setShowFilter] = useState(false);

  // Search state
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Initialize filters from URL params
  const [filters, setFilters] = useState<FilterState>(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");

    return {
      minPrice: minPrice ? Number(minPrice) : undefined,
      maxPrice: maxPrice ? Number(maxPrice) : undefined,
      location_state: searchParams.get("state") || undefined,
      location_lga: searchParams.get("lga") || undefined,
      price_type: (searchParams.get("priceType") as "fixed" | "negotiable") || undefined,
      sort: searchParams.get("sort") || "recommended",
    };
  });

  // Sync search term with URL on mount
  useEffect(() => {
    const q = searchParams.get("q");
    if (q) setSearchTerm(q);
  }, [searchParams]);

  // Update URL when filters change
  const updateURL = useCallback(
    (newFilters: FilterState) => {
      const params = new URLSearchParams();
      if (newFilters.minPrice !== undefined) {
        params.set("minPrice", String(newFilters.minPrice));
      }
      if (newFilters.maxPrice !== undefined) {
        params.set("maxPrice", String(newFilters.maxPrice));
      }
      if (newFilters.location_state) {
        params.set("state", newFilters.location_state);
      }
      if (newFilters.location_lga) {
        params.set("lga", newFilters.location_lga);
      }
      if (newFilters.price_type) {
        params.set("priceType", newFilters.price_type);
      }
      if (newFilters.sort && newFilters.sort !== "recommended") {
        params.set("sort", newFilters.sort);
      }

      // Preserve existing `q` if present
      const currentQ = searchParams.get("q");
      if (currentQ) params.set("q", currentQ);

      const queryString = params.toString();
      const newURL = queryString ? `${pathname}?${queryString}` : pathname;

      router.replace(newURL, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const handleFiltersChange = useCallback(
    (f: FilterState) => {
      setFilters(f);
      updateURL(f);
    },
    [updateURL]
  );

  // Update search in URL (debounced)
  const updateSearchURL = useCallback(
    (term: string) => {
      const params = new URLSearchParams(searchParams);
      if (term.trim()) {
        params.set("q", term.trim());
      } else {
        params.delete("q");
      }
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  useEffect(() => {
    const timeout = setTimeout(() => updateSearchURL(searchTerm), 300);
    return () => clearTimeout(timeout);
  }, [searchTerm, updateSearchURL]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Set active category based on slug
  useEffect(() => {
    const cat = categories.find((c) => c.slug === category);
    setActiveCategory(cat ?? null);
    if (cat) {
      generateCategorySchema({ category: category }).then(setSchema);
    }
  }, [categories, category]);

  // Fetch ALL products for the active category (without filters)
  useEffect(() => {
    if (!activeCategory?.id) {
      setAllProducts([]);
      return;
    }
    let mounted = true;
    setLoadingProducts(true);
    setError(null);
    (async () => {
      try {
        const list = await listProducts({
          filters: {
            category_id: activeCategory.id,
          },
        });
        if (mounted) setAllProducts(list.data?.products ?? []);
      } catch (err: any) {
        if (mounted) {
          setError(err?.message ?? "Failed to fetch products");
          setAllProducts([]);
        }
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, [activeCategory]);

  // Apply filters + search on the client side
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Search by title or description
    if (searchTerm.trim()) {
      const lower = searchTerm.trim().toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(lower) ||
          (p.description?.toLowerCase().includes(lower) ?? false)
      );
    }

    // Filter by price range
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      result = result.filter((product) => {
        const price = parsePrice(product.price);
        if (price === null) return false;

        if (filters.minPrice !== undefined && price < filters.minPrice) return false;
        if (filters.maxPrice !== undefined && price > filters.maxPrice) return false;
        return true;
      });
    }

    // Filter by price type
    if (filters.price_type) {
      result = result.filter((p) => p.price_type === filters.price_type);
    }

    // Filter by state
    if (filters.location_state) {
      result = result.filter((p) => p.location_state === filters.location_state);
    }

    // Filter by LGA
    if (filters.location_lga) {
      result = result.filter((p) => p.location_lga === filters.location_lga);
    }

    // Sort
    if (filters.sort) {
      result.sort((a, b) => {
        switch (filters.sort) {
          case "price-asc": {
            const priceA = parsePrice(a.price) ?? Infinity;
            const priceB = parsePrice(b.price) ?? Infinity;
            return priceA - priceB;
          }
          case "price-desc": {
            const priceA = parsePrice(a.price) ?? -Infinity;
            const priceB = parsePrice(b.price) ?? -Infinity;
            return priceB - priceA;
          }
          case "newest":
            return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
          case "oldest":
            return new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
          default:
            return 0;
        }
      });
    }

    return result;
  }, [allProducts, filters, searchTerm]);

  return (
    <>
      {/* Schema */}
      {schema && (
        <Script
          id={`schema-${category}`}
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}

      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 pb-12">
          {/* Header */}
          <div className="bg-white p-4 rounded-2xl mb-6 border border-gray-100 relative">
            <div className="flex items-center justify-between gap-4">
              <h1 className="text-2xl font-bold capitalize">
                {activeCategory?.name ?? category.replace(/-/g, " ")}
              </h1>

              <div className="flex items-center gap-2">
                {/* Live Search Input (Desktop) */}
                <div className="relative hidden md:block">
                  <input
                    type="text"
                    placeholder="Search inside category..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border rounded-lg px-3 py-2 w-80 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      aria-label="Clear search"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>

                {/* Mobile Filter Toggle */}
                <button
                  onClick={() => setShowFilter((prev) => !prev)}
                  className="md:hidden text-gray-600 border rounded-full p-2 hover:bg-gray-100 transition"
                  aria-label="Toggle filter menu"
                >
                  {showFilter ? <X size={20} /> : <Filter size={20} />}
                </button>
              </div>
            </div>

            {/* Mobile Search (Optional) */}
            <div className="mt-3 md:hidden">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search inside category..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    aria-label="Clear search"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>
            </div>

            {/* Mobile Filter Panel */}
            {showFilter && activeCategory && (
              <div className="absolute left-0 right-0 mt-3 bg-white rounded-xl shadow-lg border border-gray-200 z-20 p-4 md:hidden">
                <SidebarFilter
                  products={allProducts}
                  activeCategory={category}
                  onFiltersChangeAction={handleFiltersChange}
                  initialFilters={filters}
                />
              </div>
            )}
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar (Desktop) */}
            <div className="hidden md:block">
              <SidebarFilter
                products={allProducts}
                activeCategory={category}
                onFiltersChangeAction={handleFiltersChange}
                initialFilters={filters}
              />
            </div>

            {/* Product Grid */}
            <div className="md:col-span-3">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm text-gray-500">
                  {filteredProducts.length} result{filteredProducts.length !== 1 ? "s" : ""}
                  {allProducts.length !== filteredProducts.length &&
                    ` (filtered from ${allProducts.length})`}
                </div>
              </div>

              {loadingProducts ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-48 bg-white rounded shadow animate-pulse"
                    />
                  ))}
                </div>
              ) : error ? (
                <p className="text-red-600 text-sm mb-4">{error}</p>
              ) : filteredProducts.length === 0 ? (
                <div className="text-gray-600 py-20 bg-white rounded-2xl p-6 border border-gray-100 text-center">
                  <p className="text-lg font-medium mb-2">No products found</p>
                  <p className="text-sm">Try adjusting your filters or search term</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map((p) => (
                    <ProductCards key={p.id} product={p} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}