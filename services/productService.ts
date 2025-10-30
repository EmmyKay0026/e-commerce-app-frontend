import api from "@/config/api";

import { Product, ServiceResult } from "@/types/models";
// Example usage:
// const { success, data, error } = await getVendorProducts("vendor-uuid");
// if (success) {
//   const products = data.products;
//   // handle products...
// } else {
//   // handle error...
// }

export interface TransformedProduct {
  id: string;
  name: string;
  price: string;
  category: {
    name: string;
    slug: string;
  };
  description: string;
  images: string[];
  metadata: Record<string, any>;
  business: {
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
    const { data } = await api.get<{ success: boolean; product: any }>(
      `/products/${id}`
    );

    const product = data.product;
    if (!product) throw new Error("Product not found");
    console.log("Product:", product);

    const cleanedCategoryId = product.category_id?.replace(/"/g, "");

    let categoryName = "Uncategorized";
    let categorySlug = "uncategorized";
    let parentCategories: any[] = [];

    if (cleanedCategoryId) {
      try {
        const categoryRes = await api.get(`/categories/${cleanedCategoryId}`);
        const category = categoryRes.data.data;

        categoryName = category?.name || "Uncategorized";
        categorySlug =
          category?.slug || categoryName.toLowerCase().replace(/\s+/g, "-");
        parentCategories = category?.parentCategory || [];
      } catch {
        console.warn("Category not found for product:", cleanedCategoryId);
      }
    }

    const transformedProduct: any = {
      id: product.id,
      name: product.name,
      price: product.price,

      category: {
        name: categoryName,
        slug: categorySlug,
      },
      description: product.description,
      images: product.images || [],
      metadata: product.metadata || {},
      business: {
        name: product.business?.business_name || "Unknown Vendor",
        slug: product.business?.slug || "unknown-vendor",
        country: "NG",
        yearsActive: 2,
        rating: 4.6,
        id: product.business?.id,
        cover_image: product.business?.cover_image,
        address: product.business?.address,
        businessPhoneNumber: product.business?.business_phone,
        businessWhatsAppNumber: product.business?.business_whatsApp_number,
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

/**
 * Fetch all active products for a specific vendor
 * GET /api/businessProfile/vendor/:vendorId
 */
export async function getBusinessProducts(
  businessId: string
): Promise<ServiceResult<{ data: Product[] }>> {
  try {
    const res = await api.get(
      `/products/business/${encodeURIComponent(businessId)}`
    );

    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data,
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.message || `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to fetch vendor products";

    return {
      success: false,
      status,
      data: null,
      error: msg,
    };
  }
}

/**
 * List products with pagination, filters, search and sorting
 * GET /products
 * Accepts query params: page, perPage, q, tag, sort, plus any filter keys
 */
export async function listProducts(
  options: {
    page?: number;
    perPage?: number;
    q?: string;
    tag?: string;
    sort?: string;
    // arbitrary additional filters, e.g. { price_gte: 10 }
    filters?: Record<string, string | number | boolean | undefined>;
    /** Optional AbortSignal to cancel the request */
    signal?: AbortSignal;
  } = {}
): Promise<
  ServiceResult<{
    page: number;
    perPage: number;
    products: Product[];
    total: number | null;
  }>
> {
  try {
    const {
      page = 1,
      perPage = 12,
      q,
      tag,
      sort,
      filters = {},
      signal,
    } = options;

    // enforce backend limits
    const normalizedPerPage = Math.min(100, Math.max(1, Math.floor(perPage)));
    const normalizedPage = Math.max(1, Math.floor(page));

    const params: Record<string, any> = {
      page: normalizedPage,
      perPage: normalizedPerPage,
    };

    if (q) params.q = q;
    if (tag) params.tag = tag;
    if (sort) params.sort = sort;

    // merge in filters (caller should provide correctly-named filter keys)
    for (const [k, v] of Object.entries(filters)) {
      if (v !== undefined && v !== null) params[k] = v;
    }

    const res = await api.get("/products", {
      params,
      ...(signal ? { signal } : {}),
    });

    if (res.status === 200) {
      // expected shape: { page, perPage, products, total }
      const body = res.data || {};
      return {
        success: true,
        status: res.status,
        data: {
          page: body.page ?? normalizedPage,
          perPage: body.perPage ?? normalizedPerPage,
          products: body.products ?? body.data ?? [],
          total:
            typeof body.total === "number" ? body.total : body.count ?? null,
        },
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.message || `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const status = err?.response?.status || 500;
    const msg =
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      err?.message ||
      "Failed to list products";

    return { success: false, status, data: null, error: msg };
  }
}
