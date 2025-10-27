import axios from "axios";
import { Product } from "@/types/models";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export interface TransformedProduct {
  id: string;
  name: string;
  price: number;
  currency: string;
  category: {
    name: string;
    slug: string;
  };
  description: string;
  images: string[];
  metadata: Record<string, any>;
  vendor: {
    name: string;
    country: string;
    yearsActive: number;
    rating: number;
    id?: string;
    address?: string | null;
    businessPhoneNumber?: string | null;
    businessWhatsAppNumber?: string | null;
  };
  createdAt: string;
  parentCategories: any[];
}

export async function getProductById(id: string): Promise<TransformedProduct> {
  try {

    const { data } = await api.get<{ success: boolean; product: Product }>(
      `/products/${id}`
    );

    const product = data.product;
    if (!product) throw new Error("Product not found");

    const cleanedCategoryId = product.category_id?.replace(/"/g, "");

    let categoryName = "Uncategorized";
    let categorySlug = "uncategorized";
    let parentCategories: any[] = [];

    if (cleanedCategoryId) {
      try {
        const categoryRes = await api.get(`/category/${cleanedCategoryId}`);
        const category = categoryRes.data.data;

        categoryName = category?.name || "Uncategorized";
        categorySlug =
          category?.slug ||
          categoryName.toLowerCase().replace(/\s+/g, "-");
        parentCategories = category?.parentCategory || [];
      } catch {
        console.warn("Category not found for product:", cleanedCategoryId);
      }
    }

    const transformedProduct: TransformedProduct = {
      id: product.id,
      name: product.name,
      price: Number(product.price),
      currency: "₦",
      category: {
        name: categoryName,
        slug: categorySlug,
      },
      description: product.description,
      images: product.images || [],
      metadata: product.metadata || {},
      vendor: {
        name: product.business?.businessName || "Unknown Vendor",
        country: "NG",
        yearsActive: 2,
        rating: 4.6,
        id: product.business?.id,
        address: product.business?.address,
        businessPhoneNumber: product.business?.businessPhoneNumber,
        businessWhatsAppNumber: product.business?.businessWhatsAppNumber,
      },
      createdAt: product.created_at,
      parentCategories,
    };

    return transformedProduct;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch product");
  }
}
export const getRelatedProducts = async (categoryId: string) => {
  try {
    const response = await api.get(`/products?category_id=${categoryId}`);
    return response.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
};