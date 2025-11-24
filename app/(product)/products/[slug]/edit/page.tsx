"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { EditProductForm } from "@/components/organisms/EditProductForm";
import { getProductBySlug } from "@/services/productService";
import { useUserStore } from "@/store/useUserStore";
import { Product } from "@/types/models";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
    Empty,
    EmptyContent,
    EmptyDescription,
    EmptyHeader,
    EmptyMedia,
    EmptyTitle,
} from "@/components/ui/empty";
import { Button } from "@/components/ui/button";

export default function EditProductPage() {
    const { slug } = useParams();
    const router = useRouter();
    const user = useUserStore((state) => state.user);
    const userStoreLoading = useUserStore((state) => state.isLoading);
    const [product, setProduct] = useState<Product | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduct = async () => {
            if (!slug) {
                setError("Product not found");
                setIsLoading(false);
                return;
            }

            // Wait for user store to finish loading before checking authentication
            if (userStoreLoading) {
                return;
            }

            // Get the latest user value from the store (avoid stale closure)
            const currentUser = useUserStore.getState().user;

            try {
                const result = await getProductBySlug(slug.toString());

                if (!result.success || !result.data) {
                    setError(result.error || "Failed to load product");
                    setIsLoading(false);
                    return;
                }

                const productData = result.data;

                // Check if the current user is the owner of this product
                if (!currentUser) {
                    toast.error("Please log in to edit products");
                    router.push(`/products/${slug}`);
                    return;
                }

                // Verify ownership
                if (productData.product_owner_id !== currentUser.business_profile_id) {
                    toast.error("You don't have permission to edit this product");
                    router.push(`/products/${slug}`);
                    return;
                }

                setProduct(productData);
            } catch (err: any) {
                console.error("Error fetching product:", err);
                setError(err.message || "Failed to load product");
            } finally {
                setIsLoading(false);
            }
        };

        fetchProduct();
    }, [slug, user, userStoreLoading, router]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-primary" />
                    <p className="text-muted-foreground">Loading product...</p>
                </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4">
                <Empty className="max-w-md">
                    <EmptyHeader>
                        <EmptyMedia variant="icon">❌</EmptyMedia>
                        <EmptyTitle>Product Not Found</EmptyTitle>
                        <EmptyDescription>
                            {error || "The product you're looking for doesn't exist."}
                        </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                        <Button
                            variant="outline"
                            onClick={() => router.push("/user/products")}
                        >
                            Back to Products
                        </Button>
                    </EmptyContent>
                </Empty>
            </div>
        );
    }

    return <EditProductForm product={product} />;
}
