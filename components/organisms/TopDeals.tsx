"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { getTopDeals } from "@/services/productService";
import { Product } from "@/types/models";
import { constructImageUrl } from "@/lib/utils";

export default function TopDeals() {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const result = await getTopDeals(2, "price_asc");

      if (result.success && result.data) {
        setProducts(result.data);
        setError(null);
      } else {
        const errorMessage = typeof result.error === 'string'
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
          {error || "No deals available"}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {products[0] && (
        <Link
          href={`/products/${products[0].slug}`}
          className="block bg-white rounded-xl shadow-sm p-3 lg:flex items-center gap-3 hover:shadow-md transition-shadow focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <div className="w-20 h-14 rounded-md overflow-hidden relative">
            <Image
              src={constructImageUrl(products[0].images[0]) || "/placeholder.png"}
              alt={products[0].name}
              fill
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <p className="font-medium line-clamp-1">{products[0].name}</p>
            <span className="font-bold whitespace-nowrap">{products[0].price_input_mode === "enter" ? ("₦" + Number(products[0].price).toLocaleString()) : "Contact vendor for price"}</span>
            {/* <p className="text-sm text-gray-500">₦{products[0].price}</p> */}
          </div>
        </Link>
      )}

      {products[1] && (
        <div className="bg-white rounded-xl shadow-sm p-3">
          <p className="font-medium mb-2">Best value deals</p>
          <Link
            href={`/products/${products[1].slug}`}
            className="block rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="relative w-full h-40 rounded-md overflow-hidden">
              <Image
                src={constructImageUrl(products[1].images[0]) || "/placeholder.png"}
                alt={products[1].name}
                fill
                className="object-cover"
                loading="lazy"
              />
            </div>
            <div className="mt-2">
              <p className="font-medium line-clamp-1">{products[1].name}</p>
              <span className="font-bold whitespace-nowrap">{products[1].price_input_mode === "enter" ? ("₦" + Number(products[1].price).toLocaleString()) : "Contact vendor for price"}</span>
              {/* <p className="text-sm text-gray-500">₦{products[1].price}</p> */}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
}
