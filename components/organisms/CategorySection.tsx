"use client";

import React, { useEffect, useState, useMemo, useCallback } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { slugify } from "@/lib/utils";
import ProductCards from "../molecules/ProductCards";
// import {
//   getChildCategories,
//   getProductsByCategory,
//   getRootCategories,
//   hasChildren,
// } from "@/services/categoryService";
import { Category, Product } from "@/types/models";
import { transformProduct } from "@/services/productService";
import { useCategoryStore } from "@/store/useCategoryStore";
import {
  getChildCategories,
  getProductsByCategory,
  getRootCategories,
  hasChildren,
} from "@/services/categoryService";

const CategorySection: React.FC = () => {
  const {
    categories: allCategories,
    loading: loadingCats,
    fetchCategories,
  } = useCategoryStore();
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "5d7b7aff-f70b-4c18-b560-efa468844a09"
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showMobile, setShowMobile] = useState(false);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  /** Fetch all categories once */
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  /** Root categories for sidebar and dropdown */
  const rootCategories = useMemo(() => {
    return getRootCategories(allCategories);
  }, [allCategories]);

  /** Fetch products when a category is selected */
  useEffect(() => {
    if (!selectedCategoryId) {
      setProducts([]);
      return;
    }
    (async () => {
      try {
        setLoadingProducts(true);
        setError(null);
        const prods = await getProductsByCategory(selectedCategoryId);
        if (prods.status) {
          setProducts(prods?.data ?? []);
        }
      } catch (e: any) {
        console.error("getProductsByCategory error:", e);
        setError(e.message ?? "Failed to load products");
      } finally {
        setLoadingProducts(false);
      }
    })();
  }, [selectedCategoryId]);

  /** Selected category info */
  const selectedCategory = useMemo(() => {
    if (!selectedCategoryId) return null;
    return allCategories.find((c) => c.id === selectedCategoryId) ?? null;
  }, [selectedCategoryId, allCategories]);

  /** Get child categories */
  const getCategoryChildren = useCallback(
    async (categoryId: string): Promise<Category[]> => {
      const childrenCat = await getChildCategories(categoryId);

      return childrenCat.data!;
    },
    [allCategories]
  );

  /** Desktop item (recursive) */
  const DesktopItem = useCallback(
    (cat: Category, depth = 0) => {
      const categoryHasChildren = hasChildren(cat);
      const isHover = hoveredId === cat.id;
      const isSel = selectedCategoryId === cat.id;
      const children = categoryHasChildren ? getCategoryChildren(cat.id) : [];

      return (
        <li
          key={cat.id}
          className="relative"
          onMouseEnter={() => setHoveredId(cat.id)}
          onMouseLeave={() => setHoveredId(null)}
        >
          <div
            onClick={() => {
              setSelectedCategoryId(cat.id);
              setShowMobile(false);
            }}
            className={`flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-sm font-medium transition-all ${
              isSel
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100 text-gray-700"
            }`}
            style={{ paddingLeft: `${16 + depth * 12}px` }}
          >
            <span>{cat.name}</span>
            {categoryHasChildren &&
              (isHover ? (
                <ChevronUp className="ml-1 h-4 w-4" />
              ) : (
                <ChevronDown className="ml-1 h-4 w-4" />
              ))}
          </div>
          {/* 
          {categoryHasChildren && isHover && children.length > 0 && (
            <ul
              className="absolute left-0 top-0 ml-1 min-w-[200px] rounded-lg border border-gray-200 bg-white shadow-lg z-20"
              onMouseEnter={() => setHoveredId(cat.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {children.map((child) => DesktopItem(child, depth + 1))}
            </ul>
          )} */}
        </li>
      );
    },
    [hoveredId, selectedCategoryId, getCategoryChildren]
  );

  /** Mobile item (recursive expandable) */
  const MobileItem = useCallback(
    (cat: Category, depth = 0) => {
      const categoryHasChildren = hasChildren(cat);
      const children = categoryHasChildren ? getCategoryChildren(cat.id) : [];
      const [expanded, setExpanded] = useState(false);

      return (
        <li key={cat.id}>
          <div
            className="flex items-center justify-between"
            style={{ paddingLeft: `${depth * 16}px` }}
          >
            <div
              onClick={() => {
                setSelectedCategoryId(cat.id);
                setShowMobile(false);
              }}
              className={`flex-1 cursor-pointer rounded-lg px-4 py-3 text-sm font-medium transition-all ${
                selectedCategoryId === cat.id
                  ? "bg-blue-100 text-blue-700"
                  : "hover:bg-gray-100 text-gray-700"
              }`}
            >
              {cat.name}
            </div>

            {categoryHasChildren && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpanded(!expanded);
                }}
                className="p-2"
              >
                {expanded ? (
                  <ChevronUp className="h-4 w-4 text-gray-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                )}
              </button>
            )}
          </div>

          {/* {categoryHasChildren && expanded && children.length > 0 && (
            <ul className="mt-1 space-y-1">
              {children.map((child) => MobileItem(child, depth + 1))}
            </ul>
          )} */}
        </li>
      );
    },
    [selectedCategoryId, getCategoryChildren]
  );

  return (
    <section className="bg-gray-50 w-full max-w-[100dvw] py-16">
      {/* Header */}
      <div className="text-center mb-10 px-5 md:px-10">
        <h3 className="text-3xl font-bold text-gray-900 md:text-4xl">
          Our Product Categories
        </h3>
        <p className="mt-4 max-w-2xl mx-auto text-gray-600">
          Explore our range of high-quality products, designed to meet your
          needs across various categories.
        </p>
      </div>

      <div className="mx-auto grid w-full grid-cols-1 gap-8 px-5 md:px-10 lg:grid-cols-4 lg:px-20">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block sticky top-20 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-2xl border border-gray-100 bg-white p-4 shadow-md scrollbar-thin">
          <h4 className="mb-4 text-lg font-semibold text-gray-800">
            Categories
          </h4>

          {loadingCats ? (
            <div className="space-y-2">
              <div className="h-3 w-3/4 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-gray-200" />
              <div className="h-3 w-1/2 animate-pulse rounded bg-gray-200" />
            </div>
          ) : (
            <ul className="space-y-1">
              {rootCategories.map((cat) => DesktopItem(cat))}
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
              {rootCategories.map((cat) => MobileItem(cat))}
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
                See more
              </Link>
            )}
          </div>

          {error && <p className="mb-4 text-sm text-red-600">{error}</p>}

          {loadingProducts ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="h-48 animate-pulse rounded-xl bg-white shadow"
                />
              ))}
            </div>
          ) : products.length ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
