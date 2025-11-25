"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCards";
import type { Category, Product } from "@/types/models";
import {
  getAllCategories,
  listProductsByCategory,
} from "@/services/categoryService";
import api from "@/config/api";
import MobileDropdown from "@/components/molecules/MobileDropDown";
import { Loader2 } from "lucide-react";

// Recursive desktop item
function CategoryTreeItem({
  category,
  selectedCategoryId,
  onSelect,
  allCategories,
}: {
  category: Category;
  selectedCategoryId: string | null;
  onSelect: (categoryId: string | null) => void;
  allCategories: Category[];
}) {
  const hasChildren = category.child_categories?.length;
  const isSelected = category.id === selectedCategoryId;

  return (
    <li>
      <button
        onClick={() => onSelect(category.id)}
        className={`w-full text-left block py-2 px-3 rounded-lg text-sm font-medium transition-all ${isSelected
          ? "bg-blue-100 text-blue-700 font-bold"
          : "text-gray-700 hover:bg-gray-100"
          }`}
      >
        {category.name}
      </button>

      {hasChildren ? (
        <ul className="ml-4 mt-1 border-l border-gray-200 pl-4 space-y-1">
          {category.child_categories!.map((childId) => {
            const child = allCategories.find((c) => c.id === childId);
            return child ? (
              <CategoryTreeItem
                key={child.id}
                category={child}
                selectedCategoryId={selectedCategoryId}
                onSelect={onSelect}
                allCategories={allCategories}
              />
            ) : null;
          })}
        </ul>
      ) : null}
    </li>
  );
}

// Mobile recursive item
export function MobileItem({
  cat,
  depth,
  onSelect,
  allCategories,
}: {
  cat: Category;
  depth: number;
  onSelect: (categoryId: string | null) => void;
  allCategories: Category[];
}) {
  const hasChildren = cat.child_categories?.length;

  return (
    <li>
      <button
        onClick={() => onSelect(cat.id)}
        className="w-full text-left block py-2 px-3 rounded-lg text-sm text-gray-700 hover:bg-gray-100"
      >
        {"— ".repeat(depth)}
        {cat.name}
      </button>

      {hasChildren && (
        <ul className="ml-2 space-y-1">
          {cat.child_categories!.map((childId) => {
            const child = allCategories.find((c) => c.id === childId);
            return child ? (
              <MobileItem
                key={child.id}
                cat={child}
                depth={depth + 1}
                onSelect={onSelect}
                allCategories={allCategories}
              />
            ) : null;
          })}
        </ul>
      )}
    </li>
  );
}

// Build tree using child_categories: string[]
function buildCategoryTree(categories: Category[]): Category[] {
  const map = new Map<string, Category>();
  const roots: Category[] = [];

  categories.forEach((cat) => {
    map.set(cat.id, { ...cat });
  });

  categories.forEach((cat) => {
    const current = map.get(cat.id)!;

    if (!cat.parent_category_id || cat.parent_category_id.length === 0) {
      roots.push(current);
      return;
    }

    let attached = false;
    for (const parentId of cat.parent_category_id) {
      if (map.has(parentId)) {
        const parent = map.get(parentId)!;
        if (!parent.child_categories) parent.child_categories = [];
        if (!parent.child_categories.includes(cat.id)) {
          parent.child_categories.push(cat.id);
        }
        attached = true;
      }
    }

    if (!attached) roots.push(current);
  });

  return roots;
}

export default function CategoryExplorer() {
  const [allCategories, setAllCategories] = useState<Category[]>([]);
  const [rootCategories, setRootCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  // Load categories on mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categories = await getAllCategories();
        setAllCategories(categories);
        const roots = buildCategoryTree(categories);
        setRootCategories(roots);

        // Set initial selection to null (All categories)
        setSelectedCategoryId(null);
      } catch (error) {
        console.error("Error loading categories:", error);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  // Load products when category changes
  useEffect(() => {
    const loadProducts = async () => {
      if (loading) return; // Don't load products until categories are loaded

      setLoadingProducts(true);
      try {
        if (selectedCategoryId === null) {
          // Load all products (no category filter) using general products endpoint
          const res = await api.get("/products", {
            params: { perPage: 12 },
          });

          const products = res.data?.products || res.data?.data || [];
          setProducts(products);
        } else {
          // Load products for selected category
          const result = await listProductsByCategory(selectedCategoryId, {
            limit: 12,
          });
          setProducts(result.success ? result.data?.products || [] : []);
        }
      } catch (error) {
        console.error("Error loading products:", error);
        setProducts([]);
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [selectedCategoryId, loading]);

  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  };

  const selectedCategory = selectedCategoryId
    ? allCategories.find((c) => c.id === selectedCategoryId)
    : null;

  if (loading) {
    return (
      <section className="bg-gray-50 w-full max-w-dvw py-16">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 w-full max-w-dvw py-16">
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

          <ul className="space-y-1">
            {/* All Categories option */}
            <li>
              <button
                onClick={() => handleCategorySelect(null)}
                className={`w-full text-left block py-2 px-3 rounded-lg text-sm font-medium transition-all ${selectedCategoryId === null
                  ? "bg-blue-100 text-blue-700 font-bold"
                  : "text-gray-700 hover:bg-gray-100"
                  }`}
              >
                All Categories
              </button>
            </li>

            {/* Category tree */}
            {rootCategories.slice(0, 6).map((cat) => (
              <CategoryTreeItem
                key={cat.id}
                category={cat}
                selectedCategoryId={selectedCategoryId}
                onSelect={handleCategorySelect}
                allCategories={allCategories}
              />
            ))}
          </ul>
        </aside>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden w-full relative">
          <MobileDropdown
            root={rootCategories}
            onSelect={handleCategorySelect}
            allCategories={allCategories}
          />
        </div>

        {/* Product Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <h4 className="text-xl font-bold text-gray-900">
              {selectedCategory?.name || "All Products"}
            </h4>
            {selectedCategory ? (
              <Link
                href={`/category/${selectedCategory.slug}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
              >
                See more →
              </Link>
            ) : (<Link
              href={`/products`}
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              See more →
            </Link>)}
          </div>

          {loadingProducts ? (
            <div className="flex items-center justify-center min-h-[300px]">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          ) : products.length ? (
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCards key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No products found.</p>
          )}
        </div>
      </div>
    </section>
  );
}