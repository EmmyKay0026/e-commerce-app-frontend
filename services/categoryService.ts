import axios from "axios";
import type { Category, Product } from "@/types/models";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export const getAllCategories = async (): Promise<Category[]> => {
  const response = await axios.get(`${BASE_URL}/categories`);
  const data = response.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.categories)) return data.categories;
  if (Array.isArray(data?.data)) return data.data;

  return [];
};

export const getCategoryByIdOrSlug = async (
  idOrSlug: string
): Promise<Category> => {
  const res = await axios.get(`${BASE_URL}/categories/${idOrSlug}`);
  if (!res.data?.success || !res.data.data) {
    throw new Error("Category not found");
  }
  return res.data.data;
};

export const getChildCategories = async (
  parentId: string
): Promise<Category[]> => {
  const res = await axios.get(`${BASE_URL}/categories`, {
    params: { parent_id: parentId },
  });
  if (!res.data?.success || !Array.isArray(res.data.data)) {
    throw new Error("Invalid response while fetching child categories");
  }
  return res.data.data;
};

export const getProductsByCategory = async (categoryId: string): Promise<Product[]> => {
  const res = await axios.get(`${BASE_URL}/products`, {
    params: { category: categoryId },
  });

  const data = res.data;

  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.data)) return data.data;
  if (Array.isArray(data?.products)) return data.products;

  return [];
};