"use client";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { slugify } from "@/lib/utils";
import { demoCategories, demoProducts } from "@/constants/product";
import ProductCards from "../molecules/ProductCards";
import useApi from "@/hooks/useApi";

const CategorySection: React.FC = () => {
  const api = useApi();

  const [categories, setCategories] = useState<any[] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // load categories on mount
  useEffect(() => {
    let mounted = true;
    setLoadingCats(true);
    setError(null);

    (async () => {
      try {
        // try API endpoint first
        try {
          const payload = await api.get<any>("/categories");
          // payload may be { success: true, data: [...] } or an array
          const data = payload?.data ?? payload ?? [];
          if (mounted) setCategories(Array.isArray(data) ? data : []);
        } catch (e) {
          // fallback to Supabase table via api.db if available
          if (api.db && (api.db as any).select) {
            try {
              const dbCats = await api.db.select("categories", "*");
              if (mounted) setCategories(Array.isArray(dbCats) ? dbCats : []);
            } catch {
              if (mounted) setCategories(demoCategories);
            }
          } else {
            if (mounted) setCategories(demoCategories);
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError("Failed to load categories");
          setCategories(demoCategories);
        }
      } finally {
        if (mounted) setLoadingCats(false);
      }
    })();

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // default to first category when categories load
  useEffect(() => {
    if (!categories || categories.length === 0) {
      // fallback to demo
      if (!categories) {
        setCategories(demoCategories);
      }
      setSelectedCategory(demoCategories[0]?.name ?? null);
      return;
    }
    setSelectedCategory((prev) => prev ?? categories[0].name);
  }, [categories]);

  const currentCategory = useMemo(
    () => categories?.find((c) => c.name === selectedCategory) ?? null,
    [categories, selectedCategory]
  );

  // load products when selectedCategory changes
  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();
    setLoadingProducts(true);
    setError(null);

    (async () => {
      try {
        if (!currentCategory) {
          setProducts([]);
          return;
        }

        // prefer API products endpoint
        try {
          // try querying by category id or slug if API supports it
          const params: Record<string, any> = { limit: 12 };
          if (currentCategory.id) params.category = currentCategory.id;
          else params.category = currentCategory.slug ?? currentCategory.name;

          const payload = await api.get<any>("/products", params);
          // payload may be { products: [...] } or { data: [...] } or array
          const list =
            payload?.products ?? payload?.data ?? payload ?? [];
          if (mounted && Array.isArray(list)) setProducts(list);
          else if (mounted) setProducts([]);
        } catch (e) {
          // fallback to Supabase table "products" via api.db
          if (api.db && (api.db as any).select) {
            try {
              const rows = await api.db.select(
                "products",
                "*",
                currentCategory.id ? { category_id: currentCategory.id } : { category: currentCategory.name }
              );
              if (mounted) setProducts(Array.isArray(rows) ? rows : []);
            } catch {
              if (mounted) {
                // last resort: demo products
                const filtered = demoProducts.filter(
                  (p) => p.categoryId === currentCategory?.id
                );
                setProducts(filtered);
              }
            }
          } else {
            const filtered = demoProducts.filter(
              (p) => p.categoryId === currentCategory?.id
            );
            if (mounted) setProducts(filtered);
          }
        }
      } catch (err: any) {
        if (mounted) {
          setError("Failed to load products");
          setProducts([]);
        }
      } finally {
        if (mounted) setLoadingProducts(false);
      }
    })();

    return () => {
      mounted = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCategory, api]);

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
        {/* Sidebar (desktop) */}
        <aside
          className="
            hidden lg:block
            bg-white shadow-md rounded-2xl
            sticky top-20
            p-4 border border-gray-100
            max-h-[calc(100vh-5rem)]
            overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          "
        >
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            Categories
          </h4>

          {loadingCats ? (
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-2/3 animate-pulse" />
              <div className="h-3 bg-gray-200 rounded w-1/2 animate-pulse" />
            </div>
          ) : (
            <ul className="space-y-2">
              {(categories ?? demoCategories).map((cat: any) => (
                <li
                  key={cat.id ?? cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === cat.name
                      ? "bg-blue-100 text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </aside>

        {/* Mobile Dropdown */}
        <div className="block lg:hidden w-full">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 font-medium text-gray-800 shadow-sm"
          >
            <span>{selectedCategory ?? "Select category"}</span>
            {showCategories ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showCategories && (
            <ul className="mt-3 bg-white border border-gray-200 rounded-xl absolute py-3 z-10 px-5 shadow-md max-h-[300px] overflow-y-auto">
              {(categories ?? demoCategories).map((cat: any) => (
                <li
                  key={cat.id ?? cat.name}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setShowCategories(false);
                  }}
                  className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all ${
                    selectedCategory === cat.name
                      ? "bg-blue-100 rounded-full text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-900">
              {selectedCategory ?? "Products"}
            </h4>
            {currentCategory && (
              <Link
                href={`/category/${slugify(currentCategory.name ?? currentCategory.slug ?? selectedCategory ?? "")}`}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                See more →
              </Link>
            )}
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4">{error}</p>
          )}

          {loadingProducts ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-48 bg-white rounded shadow animate-pulse" />
              ))}
            </div>
          ) : products && products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: any) => (
                <ProductCards key={product.id ?? product.product_id ?? product.name} product={product} />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
