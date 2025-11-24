"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getNewArrivals } from "@/services/productService";
import { Product } from "@/types/models";
import { constructImageUrl } from "@/lib/utils";

export default function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const result = await getNewArrivals(4);

      if (result.success && result.data) {
        setProducts(result.data);
        setError(null);
      } else {
        // Extract string message from error (can be string or object)
        const errorMessage =
          typeof result.error === "string"
            ? result.error
            : result.error?.message || result.error?.detail || "Failed to load products";
        setError(errorMessage);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-center h-64 text-muted-foreground">
          {error || "No new arrivals available"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-2 gap-3">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            className="block rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={`Open ${product.name}`}
          >
            <div className="relative h-28 sm:h-32 w-full">
              <Image
                src={constructImageUrl(product.images[0]) || "/placeholder.png"}
                alt={product.name}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          </Link>
        ))}
      </div>

      <Link
        href="/category/new-arrivals"
        className="block bg-white rounded-xl shadow-sm p-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold">New products added recently</p>
            <p className="text-sm text-gray-500">
              Fresh arrivals — Products from Verified Suppliers
            </p>
          </div>
          {products[0] && (
            <div className="w-20 h-20 rounded-md overflow-hidden relative hidden sm:block">
              <Image
                src={constructImageUrl(products[0].images[0]) || "/placeholder.png"}
                alt="new"
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </Link>
    </div>
  );
}
