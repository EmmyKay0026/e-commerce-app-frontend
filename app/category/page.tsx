"use client";

import React, { useEffect, useState } from "react";
import CategorySection from "@/components/organisms/CatSection";
import { getAllCategories } from "@/services/categoryService";
import type { Category } from "@/types/models";

export default function CategoryPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const data = await getAllCategories();
        setCategories(Array.isArray(data) ? data : []);
      } catch (err: any) {
        setError(err?.message ?? "Failed to fetch categories");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 pt-24 text-gray-500">
        Loading categories...
      </main>
    );
  }

  if (error) {
    return (
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-10 pt-24 text-red-600">
        {error}
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto items-center justify-center px-6 lg:px-12 py-10 pt-24">
      {categories.length > 0 ? (
        categories.map((category) => (
          <CategorySection
            key={category.id}
            title={category.name}
            categorySlug={category.slug}
            categoryId={category.id}
          />
        ))
      ) : (
        <div className="text-gray-500">No categories found.</div>
      )}
    </main>
  );
}
