"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import { getProductBySlug } from "@/services/productService";
import { Product } from "@/types/models";
import { EditProductForm } from "@/components/organisms/EditProductForm";

export default function ProductEditPage() {
  const { productId } = useParams();
  const user = useUserStore((s) => s.user);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof productId !== "string") {
      setLoading(false);
      setError("Invalid product ID.");
      return;
    }

    const fetchProduct = async () => {
      try {
        const result = await getProductBySlug(productId as string);
        if (result.success && result.data) {
          setProduct(result.data);
        } else {
          notFound();
        }
      } catch (err) {
        notFound();
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Please log in to edit this product.</div>;
  }

  if (!product || product.product_owner_id !== user.business_profile_id) {
    return <div>You are not authorized to edit this product.</div>;
  }

  return <EditProductForm product={product} />;
}
