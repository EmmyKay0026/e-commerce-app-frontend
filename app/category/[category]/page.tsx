"use client";
import React, { useMemo, useState, useCallback } from "react";
import { use } from "react";
import SidebarFilter from "@/components/molecules/SidebarFilter";
import ProductCard from "@/components/molecules/ProductCard";
import { products as allProducts } from "@/data/products";
import type { Product } from "@/data/products";
import Link from "next/link";

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

  // ✅ Stable callback to prevent infinite re-renders
  const handleFiltersChange = useCallback((f: typeof filters) => {
    setFilters(f);
  }, []);

  // Filter dataset to only items in this category
  const categoryProducts = useMemo(
    () => allProducts.filter((p) => p.category === category),
    [category]
  );

  // Apply filtering & sorting
  const filteredProducts = useMemo(() => {
    let result: Product[] = [...categoryProducts];

    if (filters.brands?.length) {
      result = result.filter(
        (p) => p.brand && filters.brands.includes(p.brand)
      );
    }

    if (filters.location) {
      result = result.filter((p) => p.location === filters.location);
    }

    if (filters.minPrice !== undefined) {
      result = result.filter((p) => p.price >= (filters.minPrice ?? 0));
    }
    if (filters.maxPrice !== undefined) {
      result = result.filter(
        (p) => p.price <= (filters.maxPrice ?? Number.MAX_SAFE_INTEGER)
      );
    }

    if (filters.sort === "price-asc") {
      result.sort((a, b) => a.price - b.price);
    } else if (filters.sort === "price-desc") {
      result.sort((a, b) => b.price - a.price);
    } else if (filters.sort === "newest") {
      result.sort(
        (a, b) => (b.listedDaysAgo ?? 0) - (a.listedDaysAgo ?? 0)
      );
    }

    return result;
  }, [categoryProducts, filters]);

  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 pb-12">
        {/* Top header */}
        <div className="bg-white p-4 rounded-2xl mb-6 border border-gray-100">
          <div className="flex items-center justify-between gap-4">
            <h1 className="text-2xl font-bold capitalize">
              {category.replace(/-/g, " ")}
            </h1>
            <div className="flex items-center gap-2">
              <input
                placeholder="Search inside category..."
                className="border rounded-lg px-3 py-2 w-80 hidden md:block"
              />
              <Link href={`/category/${category}`}>
                <button className="bg-secondary text-white px-4 py-2 rounded-full">
                  See more
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div>
            <SidebarFilter
              products={categoryProducts}
              activeCategory={category}
              onFiltersChangeAction={handleFiltersChange} // ✅ now stable
            />
          </div>

          {/* Products */}
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
                Showing {filteredProducts.length} results
              </div>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-gray-600 py-20 bg-white rounded-2xl p-6 border border-gray-100">
                No products found with current filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
