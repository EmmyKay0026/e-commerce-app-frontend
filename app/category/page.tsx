"use client";

import React from "react";
import CategorySection from "@/components/organisms/CatSection";
import { demoCategories, demoProducts } from "@/constants/product";

export default function CategoryPage() {
  return (
    <main className="max-w-7xl mx-auto items-center justify-center px-6 lg:px-12 py-10 pt-24">
      {demoCategories.map((category) => {
        // Filter products that belong to this category
        const categoryProducts = demoProducts.filter(
          (p) => p.categoryId === category.id
        );

        return (
          <CategorySection
            key={category.id}
            title={category.name}
            categorySlug={category.slug}
            products={categoryProducts.map((p) => ({
              id: p.id,
              image: p.images?.[0] || "/placeholder.jpg",
              name: p.name,
              price: `₦${parseFloat(p.price).toLocaleString()}`,
              minOrder: "1 piece",
            }))}
          />
        );
      })}
    </main>
  );
}
