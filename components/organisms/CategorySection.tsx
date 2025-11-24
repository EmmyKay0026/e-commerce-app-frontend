"use client";
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import ProductCards from "../molecules/ProductCards";

import type { Category, Product } from "@/types/models";
import { useCategoryStore } from "@/store/useCategoryStore";
import { listProductsByCategory } from "@/services/categoryService";

const CategorySection: React.FC = () => {
  /** Zustand Store */
  const { categories, loading, error, fetchCategories } = useCategoryStore();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState<string | null>(null);

  const [showMobile, setShowMobile] = useState(false);

  /** Fetch all categories once */
  useEffect(() => {
    (async () => {
      await fetchCategories();

      // Auto-select first category
      if (useCategoryStore.getState().categories.length > 0) {
        setSelectedCategoryId(useCategoryStore.getState().categories[0].id);
      }
    })();
  }, [fetchCategories]);

  /** Fetch products when category changes */
  useEffect(() => {
    if (!selectedCategoryId) return;

    (async () => {
      setLoadingProducts(true);
      setProductError(null);

      const res = await listProductsByCategory(selectedCategoryId, { limit: 12 });

      if (res.success && res.data?.products) {
        setProducts(res.data.products);
      } else {
        setProducts([]);
        setProductError("Failed to load products");
      }

      setLoadingProducts(false);
    })();
  }, [selectedCategoryId]);

  const selectedCategory =
    categories.find((c) => c.id === selectedCategoryId) || null;

  return (
    <section className="bg-gray-50 w-full max-w-[100dvw] py-16">
      {/* Header */}
      <div className="text-center mb-10 px-5 md:px-10">
        <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Our Product Categories
        </h3>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Explore our range of high-quality products.
        </p>
      </div>

      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-5 md:px-10 lg:grid-cols-4 lg:px-20">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-md scrollbar-thin">
          <h4 className="mb-4 text-lg font-semibold text-gray-800">Categories</h4>

          {loading ? (
            <div className="space-y-2">
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          ) : (
            <ul className="space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setSelectedCategoryId(cat.id)}
                    className={`flex w-full cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm text-left font-medium transition-all ${
                      selectedCategoryId === cat.id
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden w-full relative">
          <button
            onClick={() => setShowMobile((v) => !v)}
            className="flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-3 font-medium text-gray-800 shadow-sm"
          >
            <span>{selectedCategory?.name ?? "Select category"}</span>
            {showMobile ? (
              <ChevronUp className="h-5 w-5" />
            ) : (
              <ChevronDown className="h-5 w-5" />
            )}
          </button>

          {showMobile && (
            <ul className="absolute mt-3 w-full max-h-[300px] overflow-y-auto rounded-xl border border-gray-200 bg-white px-3 py-3 shadow-md z-10 space-y-1">
              {categories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => {
                      setSelectedCategoryId(cat.id);
                      setShowMobile(false);
                    }}
                    className={`w-full text-left rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                      selectedCategoryId === cat.id
                        ? "bg-blue-100 text-blue-700"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-900">
              {selectedCategory?.name ?? "Products"}
            </h4>

            {selectedCategory && (
              <Link
                href={`/category/${selectedCategory.slug}`}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                See more →
              </Link>
            )}
          </div>

          {productError && (
            <p className="mb-4 text-sm text-red-600">{productError}</p>
          )}

          {loadingProducts ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 animate-pulse rounded-xl bg-white shadow" />
              ))}
            </div>
          ) : products.length ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCards key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
