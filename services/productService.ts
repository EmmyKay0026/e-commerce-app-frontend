import { uploadImagesToCloudflare } from "@/lib/cloudflareImageUpload";
import api from "@/config/api";

import {
  Product,
  ServiceResult,
  Category,
  BusinessProfile,
} from "@/types/models";
// Example usage:
// const { success, data, error } = await getVendorProducts("vendor-uuid");
// if (success) {
//   const products = data.products;
//   // handle products...
// } else {
//   // handle error...
// }
// import axios from "axios";
// // import { Product, Category, BusinessProfile } from "@/types/models";

// const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: { "Content-Type": "application/json" },
// });

export interface TransformedProduct {
  id: string;
  name: string;
  price: string;
  category: {
    id: string;
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

/**
 * Fetch a single product by ID and transform it into a frontend-friendly format
 */
// :Promise<ServiceResult<Product>>
export async function getProductBySlug(slug: string) {
  try {
    const res = await api.get<{ success: boolean; product: Product }>(
      // const { data } = await api.get<{ success: boolean; product: any }>(
      `/products/slug/${slug}`
    );

    if (res.status === 200) {
      console.log(res.data.product);

      return {
        success: true,
        status: res.status,
        data: res.data.product as Product,
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
    };

    // const product = data.product;
    // if (!product) throw new Error("Product not found");
    // console.log("Product:", product);

    // if (res.status === 200) {
    //       return { success: true, status: res.status, data: res.data.data as User };
    //     }

    //     return {
    //       success: false,
    //       status: res.status,
    //       data: null,
    //       error:
    //         (res.data && (res.data.error || res.data.message)) ||
    //         `Unexpected status ${res.status}`,
    //     };

    // const cleanedCategoryId = product.category_id?.replace(/"/g, "");

    // let categoryId = cleanedCategoryId || "";
    // let categoryName = "Uncategorized";
    // let categorySlug = "uncategorized";
    // let parentCategories: any[] = [];

    // if (cleanedCategoryId) {
    //   try {
    //     const categoryRes = await api.get(`/categories/${cleanedCategoryId}`);
    //     // const category = categoryRes.data.data;

    //     // categoryName = category?.name || "Uncategorized";
    //     // categorySlug =
    //     //   category?.slug || categoryName.toLowerCase().replace(/\s+/g, "-");
    //     // parentCategories = category?.parentCategory || [];
    //     // const { data: categoryData } = await api.get<{
    //     //   success: boolean;
    //     //   data: Category;
    //     // }>(`/category/${cleanedCategoryId}`);

    //     // const category = categoryData.data;
    //     const category = categoryRes.data;
    //     if (category) {
    //       categoryId = category.id;
    //       categoryName = category.name;
    //       categorySlug = category.slug;
    //       parentCategories = category.parent_category_id || [];
    //     }
    //   } catch {
    //     console.warn("Category not found for product:", cleanedCategoryId);
    //   }
    // }

    // const transformedProduct: any = {
    // // Extract vendor data safely
    // const vendor: Partial<BusinessProfile> | null =
    //   (product as any).business_profile || null;

    // const transformedProduct: TransformedProduct = {
    //   id: product.id,
    //   name: product.name,
    //   price: product.price,

    //   category: {
    //     id: categoryId,
    //     name: categoryName,
    //     slug: categorySlug,
    //   },
    //   description: product.description,
    //   images: product.images || [],
    //   metadata: product.metadata || {},
    //   business: {
    //     name: product.business?.business_name || "Unknown Vendor",
    //     slug: product.business?.slug || "unknown-vendor",
    //   vendor: {
    //     name: vendor?.business_name || "Unknown Vendor",
    //     country: "NG",
    //     yearsActive: 2,
    //     rating: 4.6,
    //     id: product.business?.id,
    //     cover_image: product.business?.cover_image,
    //     address: product.business?.address,
    //     businessPhoneNumber: product.business?.business_phone,
    //     businessWhatsAppNumber: product.business?.business_whatsApp_number,
    //     id: vendor?.id,
    //     address: vendor?.address || null,
    //     businessPhoneNumber: vendor?.business_phone || null,
    //     businessWhatsAppNumber: vendor?.business_whatsapp_number || null,
    //   },
    //   createdAt: product.createdAt,
    //   parentCategories,
    // };
  } catch (error: any) {
    console.error("Error fetching product:", error);
    throw new Error(error.response?.data?.error || "Failed to fetch product");
  }
}

/**
 * Fetch related products based on category ID and transform them
 */
// : Promise<Product[]>
export const getRelatedProducts = async (categoryId: string) => {
  try {
    const { data } = await api.get<{ success: boolean; data: Product[] }>(
      `/products?category_id=${categoryId}`
    );

    const products = data?.data || [];

    // Fetch the category details once for all products
    let categoryData: { id: string; name: string; slug: string } = {
      id: categoryId,
      name: "Uncategorized",
      slug: "uncategorized",
    };

    try {
      const { data: catData } = await api.get<{
        success: boolean;
        data: Category;
      }>(`/category/${categoryId}`);

      if (catData.data) {
        categoryData = {
          id: catData.data.id,
          name: catData.data.name,
          slug: catData.data.slug,
        };
      }
    } catch {
      console.warn("Category not found for ID:", categoryId);
    }

    // Transform all products
    // const transformedProducts: TransformedProduct[] = products.map(
    //   (product) => {
    //     const business = (product as any).business;

    //     return {
    //       id: product.id,
    //       name: product.name,
    //       price: Number(product.price),
    //       currency: "₦",
    //       category: categoryData,
    //       description: product.description,
    //       images: product.images || [],
    //       metadata: product.metadata || {},
    //       vendor: {
    //         name: business?.business_name || "Unknown Vendor",
    //         country: "NG",
    //         yearsActive: 2,
    //         rating: 4.6,
    //         id: business?.id,
    //         address: null,
    //         businessPhoneNumber: null,
    //         businessWhatsAppNumber: null,
    //       },
    //       createdAt: product.createdAt || (product as any).created_at,
    //       parentCategories: [],
    //     };
    //   }
    // );

    // return transformedProducts;
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

/**
 * Update an existing product for the authenticated vendor
 */
export async function updateProduct(
  productId: string,
  data: {
    name: string;
    description: string;
    price: string;
    images: string[];
    category: string;
    location_lga: string;
    location_state?: string;
    price_input_mode?: "enter" | "quote" | undefined;
    features: string;
    price_type: "fixed" | "negotiable" | null;
    sale_type: "wholesale" | "retail" | null;
  }
): Promise<ServiceResult<Product>> {
  try {
    // TODO: Handle image uploads if new images are added.
    // This example assumes image URLs are handled or unchanged.
    const imageUrls: string[] = [];
    for (const image of data.images) {
      if (typeof image === "string") {
        imageUrls.push(image);
      } else {
        // TODO: Implement image upload to your storage service
        // const uploadedUrl = await uploadImage(image);
        // imageUrls.push(uploadedUrl);
      }
    }

    const featuresList = data.features
      .split("|")
      .map((feature) => feature.trim())
      .filter(Boolean);

    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      images: imageUrls,
      category_id: data.category,
      location_lga: data.location_lga,
      location_state: data.location_state,
      features: featuresList,
      price_input_mode: data.price_input_mode,
      price_type: data.price_type,
      sale_type: data.sale_type,
    };

    const response = await api.patch(`/products/${productId}`, productData);

    if (response.status === 200) {
      return {
        success: true,
        status: response.status,
        data: response.data,
      };
    }

    return {
      success: false,
      status: response.status,
      error: response.data?.message || "Failed to update product",
      data: null,
    };
  } catch (err: any) {
    console.error("Error updating product:", err);
    return {
      success: false,
      status: err.response?.status || 500,
      error: err.response?.data?.message || "Failed to update product",
      data: null,
    };
  }
}

export function transformProduct(product: any): TransformedProduct {
  // Category fallback (to avoid missing fields)
  const category = product.category || {
    id: product.category_id || "",
    name: "Uncategorized",
    slug: "uncategorized",
  };

  // Vendor fallback (ensures all required fields are present)
  const vendor = product.vendor || {
    name: "Unknown Vendor",
    country: "NG",
    yearsActive: 0,
    rating: 0,
    id: undefined,
    address: null,
    businessPhoneNumber: null,
    businessWhatsAppNumber: null,
  };

  return {
    id: product.id,
    name: product.name,
    price: product.price,
    category,
    description: product.description || "",
    images: product.images || [],
    metadata: product.metadata || {},
    business: product.business || vendor,
    createdAt:
      product.createdAt || product.created_at || new Date().toISOString(),
    parentCategories: product.parentCategories || [],
  };
}

/**
 * Create a new product for the authenticated vendor
 */
export async function createProduct(data: {
  name: string;
  description: string;
  price: string;
  images: string[]; // Changed from File[] to string[]
  category: {
    id: string;
    name: string;
  };
  location_lga: string;
  location_state: string;
  features: string;
  price_input_mode: "enter" | "quote";
  price_type: "fixed" | "negotiable" | null;
  sale_type: "wholesale" | "retail" | null;
}): Promise<ServiceResult<Product>> {
  try {
    // The images are now pre-uploaded; the 'images' prop contains the keys.
    const imageKeys = data.images;

    // Prepare the features as an array
    const featuresList = data.features
      .split("|")
      .map((feature) => feature.trim())
      .filter(Boolean);

    // Format data for the API
    const productData = {
      name: data.name,
      description: data.description,
      price: data.price,
      images: imageKeys,
      category_id: data.category.id,
      location_lga: data.location_lga,
      location_state: data.location_state,
      features: featuresList,
      price_input_mode: data.price_input_mode,
      price_type: data.price_type,
      sale_type: data.sale_type,
    };

    const response = await api.post("/products", productData);

    if (response.status === 201 || response.status === 200) {
      return {
        success: true,
        status: response.status,
        data: response.data.product, // Correctly extract the product object
      };
    }

    return {
      success: false,
      status: response.status,
      error: response.data?.message || "Failed to create product",
      data: null,
    };
  } catch (err: any) {
    console.error("Error creating product:", err);
    return {
      success: false,
      status: err.response?.status || 500,
      error: err.response?.data?.message || "Failed to create product",
      data: null,
    };
  }
}
//   try {
//     const res = await api.post("/products", data);

//     if (res.status === 201) {
//       return {
//         success: true,
//         status: res.status,
//         data: res.data.product,
//       };
//     }

//     return {
//       success: false,
//       status: res.status,
//       data: null,
//       error: res.data?.message || `Failed to create product`,
//     };
//   } catch (err: any) {
//     const status = err?.response?.status || 500;
//     const msg =
//       err?.response?.data?.message ||
//       err?.response?.data?.error ||
//       err?.message ||
//       "Failed to create product";

//     return { success: false, status, data: null, error: msg };
//   }
// }

/**
 * Get list of all categories for the product form
 */
export async function getAllCategories(): Promise<ServiceResult<Category[]>> {
  try {
    const res = await api.get("/categories");

    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.categories,
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.message || `Failed to fetch categories`,
    };
  } catch (err: any) {
    return {
      success: false,
      status: err?.response?.status || 500,
      data: null,
      error: err?.message || "Failed to fetch categories",
    };
  }
}
