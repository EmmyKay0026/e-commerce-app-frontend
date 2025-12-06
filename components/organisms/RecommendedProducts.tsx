"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { listProducts } from "@/services/productService";
import { Product } from "@/types/models";
import ProductCards from "@/components/molecules/ProductCards";
import { Button } from "@/components/ui/button";
import { ProductCardGridViewSkeleton } from "@/components/molecules/ProductCardGridViewSkeleton";

export default function RecommendedProducts() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            // Fetch recommended products (default sort is recommended)
            const result = await listProducts({
                sort: "recommended",
                perPage: 8,
            });

            if (result.success && result.data) {
                setProducts(result.data.products);
                setError(null);
            } else {
                const errorMessage =
                    typeof result.error === "string"
                        ? result.error
                        : "Failed to load products";
                setError(errorMessage);
            }

            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    if (isLoading) {
        return (
            <section className="w-full max-w-[1440px] mx-auto bg-gray-50 py-10 px-4 md:px-8 lg:px-20">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold">Recommended for You</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {Array.from({ length: 5 }).map((_, i) => (
                        <ProductCardGridViewSkeleton key={i} />
                    ))}
                </div>
            </section>
        );
    }

    if (error) {
        return null; // Hide section on error
    }

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="w-full max-w-[1440px] mx-auto bg-gray-50 py-10 px-4 md:px-8 lg:px-20">
            <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">Recommended for You</h2>
                <Link href="/products">
                    <Button variant="outline">View all products</Button>
                </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {products.map((product) => (
                    <ProductCards key={product.id} product={product} />
                ))}
            </div>

            <div className="mt-8 flex justify-center">
                <Link href="/products">
                    <Button size="lg" className="px-8">
                        View All Products
                    </Button>
                </Link>
            </div>
        </section>
    );
}
