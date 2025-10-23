"use client";
import React, { useMemo, useState, useCallback } from "react";
import { use } from "react";
import SidebarFilter from "@/components/molecules/SidebarFilter";
import ProductCards from "@/components/molecules/ProductCards";
import { demoProducts, demoCategories } from "@/constants/product";
import type { Product } from "@/types/models";
import { Filter, X } from "lucide-react";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = use(params);

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

  const activeCategory = useMemo(
    () => demoCategories.find((c) => c.slug === category),
    [category]
  );

  const normalizedProducts: Product[] = useMemo(() => {
    return demoProducts.map((p) => ({
      id: p.id,
      vendorId: p.vendorId ?? "mock-vendor-id",
      name: p.name ?? p.title ?? "Untitled Product",
      description: p.description ?? "",
      price: typeof p.price === "string" ? p.price : String(p.price ?? "0"),
      images: p.images ?? ["/placeholder.png"],
      categoryId: p.categoryId ?? activeCategory?.id ?? "",
      status: "active",
      createdAt: p.createdAt ?? new Date().toISOString(),
      updatedAt: p.updatedAt ?? new Date().toISOString(),
      metadata: p.metadata ?? {},
    }));
  }, [demoProducts, activeCategory]);

  const categoryProducts = useMemo(
    () => normalizedProducts.filter((p) => p.categoryId === activeCategory?.id),
    [normalizedProducts, activeCategory]
  );

  const filteredProducts = useMemo(() => {
    let result: Product[] = [...categoryProducts];

    if (filters.minPrice !== undefined) {
      result = result.filter(
        (p) => parseFloat(p.price) >= (filters.minPrice ?? 0)
      );
    }

    if (filters.maxPrice !== undefined) {
      result = result.filter(
        (p) =>
          parseFloat(p.price) <= (filters.maxPrice ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (filters.sort === "price-asc") {
      result.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (filters.sort === "price-desc") {
      result.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    return result;
  }, [categoryProducts, filters]);

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

          {showFilter && (
            <div className="absolute left-0 right-0 mt-3 bg-white rounded-xl shadow-lg border border-gray-200 z-20 p-4 md:hidden">
              <SidebarFilter
                products={categoryProducts}
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
              products={categoryProducts}
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

            {filteredProducts.length === 0 ? (
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
