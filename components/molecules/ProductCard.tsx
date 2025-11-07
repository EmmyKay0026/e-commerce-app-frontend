// components/ProductCard.tsx
"use client";
import Image from "next/image";
import React from "react";
import type { Product } from "@/data/products";
import { constructImageUrl } from "@/lib/utils";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden">
      <div className="relative w-full h-44 sm:h-48">
        <Image
          src={constructImageUrl(product.image ?? "/samples/placeholder.jpg")}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-3 sm:p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-500">
            Listed {product.listedDaysAgo ?? 0} days ago
          </span>
          {product.tags?.length ? (
            <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
              {product.tags[0]}
            </span>
          ) : null}
        </div>

        <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <div>
            <div className="text-green-700 font-bold">
              {product.priceLabel ?? `${product.price.toLocaleString()}`}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {product.location ?? "Unknown"}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
