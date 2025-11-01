"use client";
import React, { useMemo, useState, useCallback, useEffect, use } from "react";
import SidebarFilter from "@/components/molecules/SidebarFilter";
import ProductCards from "@/components/molecules/ProductCards";
import { Filter, X } from "lucide-react";
import type { Product, Category } from "@/types/models";
import {
  getAllCategories,
  getProductsByCategory,
} from "@/services/categoryService";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState<{
    brands: string[];
    minPrice?: number;
    maxPrice?: number;
    location?: string;
    sort?: string;
  }>({ brands: [] });

  const [showFilter, setShowFilter] = useState(false);

  const handleFiltersChange = useCallback((f: typeof filters) => {
    setFilters(f);
  }, []);

  useEffect(() => {
    let mounted = true;
    setLoadingCats(true);
    (async () => {
      try {
        const cats = await getAllCategories();
        if (mounted) setCategories(cats);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Failed to fetch categories");
      } finally {
        if (mounted) setLoadingCats(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  // Set active category based on slug
  useEffect(() => {
    const cat = categories.find((c) => c.slug === category);
    setActiveCategory(cat ?? null);
  }, [categories, category]);

  // Fetch products for the active category
  useEffect(() => {
    if (!activeCategory?.id) {
      setProducts([]);
      return;
    }

    let mounted = true;
    setLoadingProducts(true);
    setError(null);

    (async () => {
      try {
        const list = await getProductsByCategory(activeCategory.id);
        if (mounted) setProducts(list.data ?? []);
      } catch (err: any) {
        if (mounted) {
          setError(err?.message ?? "Failed to fetch products");
          setProducts([]);
        }
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [activeCategory]);

  // Apply filters and sorting
  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => parseFloat(p.price) >= filters.minPrice!);
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter((p) => parseFloat(p.price) <= filters.maxPrice!);
    }
    if (filters.sort === "price-asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters.sort === "price-desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [products, filters]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 pb-12">
        {/* Header */}
        <div className="bg-white p-4 rounded-2xl mb-6 border border-gray-100 relative">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold capitalize">
              {activeCategory?.name ?? category.replace(/-/g, " ")}
            </h1>

            <div className="flex items-center gap-2">
              <input
                placeholder="Search inside category..."
                className="border rounded-lg px-3 py-2 w-80 hidden md:block"
              />

              <button
                onClick={() => setShowFilter((prev) => !prev)}
                className="md:hidden text-gray-600 border rounded-full p-2 hover:bg-gray-100 transition"
                aria-label="Toggle filter menu"
              >
                {showFilter ? <X size={20} /> : <Filter size={20} />}
              </button>
            </div>
          </div>

          {showFilter && activeCategory && (
            <div className="absolute left-0 right-0 mt-3 bg-white rounded-xl shadow-lg border border-gray-200 z-20 p-4 md:hidden">
              <SidebarFilter
                products={products}
                activeCategory={category}
                onFiltersChangeAction={handleFiltersChange}
              />
            </div>
          )}
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar (Desktop) */}
          <div className="hidden md:block">
            <SidebarFilter
              products={products}
              activeCategory={category}
              onFiltersChangeAction={handleFiltersChange}
            />
          </div>

          {/* Product Grid */}
          <div className="md:col-span-3">
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-3 items-center text-sm text-gray-600">
                <span className="px-3 py-1 bg-gray-100 rounded-full">
                  View: Grid
                </span>
                <span className="text-sm">Sort:</span>
                <select
                  className="border rounded px-2 py-1 text-sm"
                  value={filters.sort ?? "recommended"}
                  onChange={(e) =>
                    setFilters((s) => ({ ...s, sort: e.target.value }))
                  }
                >
                  <option value="recommended">Recommended</option>
                  <option value="price-asc">Price low-high</option>
                  <option value="price-desc">Price high-low</option>
                </select>
              </div>
              <div className="text-sm text-gray-500">
                results ({filteredProducts.length})
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
              <div className="text-gray-600 py-20 bg-white rounded-2xl p-6 border border-gray-100">
                No products found with current filters.
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
  );
}
