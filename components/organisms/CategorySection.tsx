"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { slugify } from "@/lib/utils";
import { demoCategories, demoProducts } from "@/constants/product";
import ProductCards from "../molecules/ProductCards";
import { getAllCategories, getProductsByCategory } from "@/services/categoryService";
import type { Category, Product } from "@/types/models";

const CategorySection: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load categories
  useEffect(() => {
    let mounted = true;
    const fetchCategories = async () => {
      try {
        setLoadingCats(true);
        const cats = await getAllCategories();
        if (mounted && Array.isArray(cats)) {
          setCategories(cats.length > 0 ? cats : demoCategories);
          setSelectedCategory(cats[0] ?? demoCategories[0]);
        }
      } catch {
        if (mounted) {
          setCategories(demoCategories);
          setSelectedCategory(demoCategories[0]);
        }
      } finally {
        if (mounted) setLoadingCats(false);
      }
    };
    fetchCategories();
    return () => {
      mounted = false;
    };
  }, []);

  // Load products for selected category
  useEffect(() => {
    if (!selectedCategory) return;
    let mounted = true;
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setError(null);
        const list = await getProductsByCategory(selectedCategory.id);
        if (mounted) setProducts(Array.isArray(list) ? list : []);
      } catch {
        if (mounted) {
          const filtered = demoProducts.filter(p => p.category_id === selectedCategory.id);
          setProducts(filtered);
          setError("Failed to load products, showing demo data");
        }
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    };
    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [selectedCategory]);

  return (
    <section className="bg-gray-50 w-full max-w-[100dvw] py-16">
      {/* Header */}
      <div className="text-center mb-10 px-5 md:px-10">
        <h3 className="font-bold text-gray-900 text-3xl md:text-4xl">
          Our Product Categories
        </h3>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our range of high-quality products, designed to meet your
          needs across various categories.
        </p>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-5 md:px-10 lg:px-20">
        {/* Sidebar */}
        <aside className="hidden lg:block bg-white shadow-md rounded-2xl sticky top-20 p-4 border border-gray-100 max-h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <h4 className="font-semibold text-lg mb-4 text-gray-800">Categories</h4>
          {loadingCats ? (
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          ) : (
            <ul className="space-y-2">
              {categories
                .filter(cat => !cat.parent_category_id?.length)
                .map(parent => {
                  const children = getChildCategories(parent);
                  return (
                    <li key={parent.id}>
                      <div
                        onClick={() => setSelectedCategory(parent)}
                        className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                          selectedCategory?.id === parent.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
                        }`}
                      >
                        {parent.name}
                      </div>

                      {/* Render child categories */}
                      {children.length > 0 && selectedCategory?.id === parent.id && (
                        <ul className="pl-6 mt-1 space-y-1">
                          {children.map(child => (
                            <li
                              key={child.id}
                              onClick={() => setSelectedCategory(child)}
                              className={`cursor-pointer px-3 py-1 rounded-lg text-sm transition-all ${
                                selectedCategory?.id === child.id ? "bg-blue-200 text-blue-800" : "hover:bg-gray-100 text-gray-600"
                              }`}
                            >
                              {child.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  );
                })}
            </ul>

          )}
        </aside>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden w-full relative">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 font-medium text-gray-800 shadow-sm"
          >
            <span>{selectedCategory?.name ?? "Select category"}</span>
            {showCategories ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
          </button>

          {showCategories && (
            <ul className="mt-3 bg-white border border-gray-200 rounded-xl absolute py-3 z-10 px-5 shadow-md max-h-[300px] overflow-y-auto">
              {categories.filter(cat => !cat.parent_category_id?.length).map(parent => {
                const children = getChildCategories(parent);
                return (
                  <li key={parent.id}>
                    <div
                      onClick={() => setSelectedCategory(parent)}
                      className={`cursor-pointer px-4 py-2 text-sm font-medium transition-all ${
                        selectedCategory?.id === parent.id ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100 text-gray-700"
                      }`}
                    >
                      {parent.name}
                    </div>

                    {children.length > 0 && selectedCategory?.id === parent.id && (
                      <ul className="pl-4 mt-1 space-y-1">
                        {children.map(child => (
                          <li
                            key={child.id}
                            onClick={() => {
                              setSelectedCategory(child);
                              setShowCategories(false);
                            }}
                            className={`cursor-pointer px-3 py-1 text-sm transition-all ${
                              selectedCategory?.id === child.id ? "bg-blue-200 text-blue-800 rounded-lg" : "hover:bg-gray-100 text-gray-600 rounded-lg"
                            }`}
                          >
                            {child.name}
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}

            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-900">
              {selectedCategory?.name ?? "Products"}
            </h4>
            {selectedCategory && (selectedCategory.slug || selectedCategory.name) && (
              <Link
                href={`/category/${
                  selectedCategory.slug ?? slugify(selectedCategory.name)
                }`}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                See more →
              </Link>
            )}

          </div>

          {error && <p className="text-red-600 text-sm mb-4">{error}</p>}

          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-white rounded shadow animate-pulse" />
              ))}
            </div>
          ) : products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => (
                <ProductCards key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">No products found for this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
