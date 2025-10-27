"use client";
import React, { useEffect, useState } from "react";
import CategoryCards from "@/components/organisms/CategoryCards";
import { getAllCategories, getProductsByCategory } from "@/services/categoryService";
import type { Category, Product } from "@/types/models";

const MarketPlace = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsMap, setProductsMap] = useState<Record<string, Product[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    const fetchCategoriesAndProducts = async () => {
      try {
        setLoading(true);
        const cats = await getAllCategories();
        if (!mounted) return;

        setCategories(cats);

        // Fetch products for each category in parallel
        const productsPromises = cats.map(async (cat) => {
          const prods = await getProductsByCategory(cat.id);
          return [cat.id, prods ?? []] as [string, Product[]];
        });

        const productsEntries = await Promise.all(productsPromises);
        if (!mounted) return;

        const prodMap: Record<string, Product[]> = {};
        productsEntries.forEach(([catId, prods]) => {
          prodMap[catId] = prods;
        });

        setProductsMap(prodMap);
      } catch (err: any) {
        if (mounted) setError(err?.message ?? "Failed to load categories or products");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchCategoriesAndProducts();

    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p className="text-center py-20 text-gray-500">Loading marketplace...</p>;
  if (error) return <p className="text-center py-20 text-red-600">{error}</p>;

  return (
    <div className="max-w-[100dvw] w-full px-4 md:px-6 lg:px-10">
      {categories.map((cat) => (
        <div key={cat.id} className="mb-8">
          <CategoryCards
            key={cat.id}
            categoryTitle={cat.name}
            categoryProduct={productsMap[cat.id] ?? []}
            categoryLink={`/category/${cat.slug}`}
          />

        </div>
      ))}
    </div>
  );
};

export default MarketPlace;
