import axios from "axios";
import { Product, Category, BusinessProfile } from "@/types/models";

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

/**
 * Fetch a single product by ID and transform it into a frontend-friendly format
 */
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
        const { data: categoryData } = await api.get<{
          success: boolean;
          data: Category;
        }>(`/category/${cleanedCategoryId}`);

        const category = categoryData.data;
        if (category) {
          categoryName = category.name;
          categorySlug = category.slug;
          parentCategories = category.parent_category_id || [];
        }
      } catch {
        console.warn("Category not found for product:", cleanedCategoryId);
      }
    }

    // Extract vendor data safely
    const vendor: Partial<BusinessProfile> | null =
      (product as any).business_profile || null;

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
        name: vendor?.business_name || "Unknown Vendor",
        country: "NG",
        yearsActive: 2,
        rating: 4.6,
        id: vendor?.id,
        address: vendor?.address || null,
        businessPhoneNumber: vendor?.business_phone || null,
        businessWhatsAppNumber: vendor?.business_whatsapp_number || null,
      },
      createdAt: product.createdAt,
      parentCategories,
    };

    return transformedProduct;
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch product");
  }
}

/**
 * Fetch related products based on category ID
 */
export const getRelatedProducts = async (categoryId: string) => {
  try {
    const { data } = await api.get<{ success: boolean; data: Product[] }>(
      `/products?category_id=${categoryId}`
    );
    return data?.data || [];
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
};
