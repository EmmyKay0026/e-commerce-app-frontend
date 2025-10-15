"use client";

import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCard";
import type { Product as ModelProduct } from "@/types/models";
import type { Product as DataProduct } from "@/data/products";

interface SimpleProduct {
  id: string;
  image: string;
  name: string;
  price?: string;
  minOrder?: string;
}

export interface CategorySectionProps {
  title: string;
  categorySlug?: string;
  products: SimpleProduct[];
}

export default function CategorySection({
  title,
  categorySlug = "",
  products,
}: CategorySectionProps) {
  // Normalize simple products into the Product type expected by ProductCard
  const normalizedProducts: DataProduct[] = products.map((p) => ({
    id: p.id,
    title: p.name, // ✅ required field in data/products Product type
    name: p.name,
    price: Number(p.price?.replace(/[₦,]/g, "")) || 0,
    category: categorySlug || "general",
    images: [p.image],
    description: p.minOrder ? `Minimum order: ${p.minOrder}` : "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return (
    <section className="mb-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {categorySlug && (
          <Link
            href={`/category/${categorySlug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            See more
          </Link>
        )}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {normalizedProducts.slice(0, 5).map((product) => (
          <div key={product.id} className="p-2">
            <ProductCards product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
