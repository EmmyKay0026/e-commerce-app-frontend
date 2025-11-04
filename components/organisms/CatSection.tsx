"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCards";
import type { Product as DataProduct } from "@/types/models";
import { getProductsByCategory } from "@/services/categoryService";
import { transformProduct } from "@/services/productService";

interface SimpleProduct {
  id: string;
  image: string;
  name: string;
  price?: string | number;
  minOrder?: string;
}

export interface CategorySectionProps {
  title: string;
  categorySlug?: string;
  categoryId?: string;
  products?: SimpleProduct[];
  limit?: number;
}

export default function CategorySection({
  title,
  categorySlug = "",
  categoryId,
  products = [],
  limit = 5,
}: CategorySectionProps) {
  const [fetched, setFetched] = useState<DataProduct[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Helper to normalize raw product data
  const toDataProduct = (
    raw: any,
    fallbackCategory = categorySlug
  ): DataProduct => {
    const id = String(
      raw?.id ?? raw?.product_id ?? Math.random().toString(36).slice(2)
    );
    const name =
      raw?.name ?? raw?.title ?? raw?.productName ?? "Untitled product";
    const priceVal = raw?.price ?? raw?.amount ?? raw?.cost ?? 0;
    const price =
      typeof priceVal === "number" ? String(priceVal) : String(priceVal ?? "0");
    const images: string[] = Array.isArray(raw?.images)
      ? raw.images
      : raw?.image
      ? [raw.image]
      : raw?.image_url
      ? [raw.image_url]
      : [];

    const description =
      raw?.description ?? raw?.details ?? raw?.metadata?.description ?? "";
    const vendorId =
      raw?.vendorId ??
      raw?.vendor_id ??
      raw?.seller_id ??
      raw?.vendor?.id ??
      "";
    const category = raw?.category ?? raw?.categorySlug ?? fallbackCategory;
    const createdAt =
      raw?.created_at ?? raw?.createdAt ?? new Date().toISOString();
    const updatedAt = raw?.updated_at ?? raw?.updatedAt ?? createdAt;
    const status = (raw?.status as any) ?? "active";
    const metadata = raw?.metadata ?? {};

    return {
      id,
      vendorId,
      name,
      description,
      price,
      images,
      categoryId: raw?.categoryId ?? raw?.category_id,
      tags: raw?.tags ?? [],
      status,
      createdAt,
      updatedAt,
      metadata,
      title: raw?.title ?? name,
      category,
      brand: raw?.brand ?? undefined,
      location: raw?.location ?? undefined,
    } as unknown as DataProduct;
  };

  useEffect(() => {
    let mounted = true;

    if (!categoryId) return;

    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const list = await getProductsByCategory(categoryId);
        if (mounted && list.data) setFetched(list?.data?.slice(0, limit));
      } catch (err: any) {
        if (mounted) {
          setError(err?.message ?? "Failed to load products");
          setFetched([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    };

    fetchProducts();
    return () => {
      mounted = false;
    };
  }, [categoryId, limit]);

  const items = useMemo(
    () => (fetched ?? products.map((p) => toDataProduct(p))).slice(0, limit),
    [fetched, products, limit]
  );

  return (
    <section className="mb-10">
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

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {Array.from({ length: limit }).map((_, i) => (
            <div key={i} className="p-2 animate-pulse">
              <div className="h-32 bg-gray-200 rounded" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600 text-sm">{error}</div>
      ) : items && items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {items.map((p) => (
            <div key={p.id} className="p-2">
              <ProductCards key={p.id} product={p} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-gray-500">No products found.</div>
      )}
    </section>
  );
}
