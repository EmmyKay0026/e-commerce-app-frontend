import type { Category, Product, ServiceResult } from "@/types/models";
import api from "@/config/api";

/* ------------------------------------------------------------------
   1. GET ALL CATEGORIES
------------------------------------------------------------------- */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get<ServiceResult<Category[]>>("/categories");
    const data = res.data;

    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;

    return [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

/* ------------------------------------------------------------------
   2. GET SINGLE CATEGORY BY ID OR SLUG
------------------------------------------------------------------- */
export const getCategoryByIdOrSlug = async (
  idOrSlug: string
): Promise<Category | null> => {
  try {
    const res = await api.get<ServiceResult<Category>>(
      `/categories/${idOrSlug}`
    );

    if (res.data?.success && res.data.data) {
      return res.data.data;
    }

    return null;
  } catch (error) {
    console.error(`Failed to fetch category (${idOrSlug}):`, error);
    return null;
  }
};

/* ------------------------------------------------------------------
   3. GET PRODUCTS BY CATEGORY ID
------------------------------------------------------------------- */
export const getProductsByCategory = async (
  categoryId: string
): Promise<ServiceResult<Product[]>> => {
  try {
    const res = await api.get(`/categories/${categoryId}/products`);

    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as Product[],
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    const status = err?.response?.status;
    return { success: false, status, data: null, error: msg };
  }
};

/* ------------------------------------------------------------------
   4. GET CATEGORY BY ID ONLY (NEW – uses api instance)
------------------------------------------------------------------- */
export const getCategoryById = async (
  id: string
): Promise<ServiceResult<Category>> => {
  try {
    const res = await api.get<ServiceResult<Category>>(`/categories/${id}`);

    if (res.data?.success && res.data.data) {
      return {
        success: true,
        status: res.status,
        data: res.data.data,
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: res.data?.error || "Category not found",
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    const status = err?.response?.status;
    return { success: false, status, data: null, error: msg };
  }
};

/* ------------------------------------------------------------------
   5. GET ALL PARENT CATEGORIES
------------------------------------------------------------------- */
export const getAllParentCategories = async (): Promise<
  ServiceResult<Category[]>
> => {
  try {
    const res = await api.get(`/categories/parent-cats`);

    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as Category[],
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    const status = err?.response?.status;
    return { success: false, status, data: null, error: msg };
  }
};

/* ------------------------------------------------------------------
   6. GET CHILD CATEGORIES
------------------------------------------------------------------- */
export const getChildCategories = async (
  parentId: string
): Promise<ServiceResult<Category[]>> => {
  try {
    const res = await api.get(`/categories/${parentId}/with-child-cats`, {
      params: { parent_id: parentId },
    });

    if (res.status === 200) {
      return {
        success: true,
        status: res.status,
        data: res.data.data as Category[],
      };
    }

    return {
      success: false,
      status: res.status,
      data: null,
      error: `Unexpected status ${res.status}`,
    };
  } catch (err: any) {
    const msg =
      err?.response?.data?.error ||
      err?.response?.data?.message ||
      err?.message ||
      "Network error";
    const status = err?.response?.status;
    return { success: false, status, data: null, error: msg };
  }
};

/* ------------------------------------------------------------------
   7. UTILITY: BREADCRUMB, SEARCH, TREE (unchanged)
------------------------------------------------------------------- */
export const getParentCategories = (
  categoryId: string,
  allCategories: Category[]
): Category[] => {
  const category = allCategories.find((cat) => cat.id === categoryId);
  if (!category || !category.parent_category_id) return [];

  return allCategories.filter((cat) =>
    category.parent_category_id!.includes(cat.id)
  );
};

export const getCategoryBreadcrumb = (
  categoryId: string,
  allCategories: Category[]
): Category[] => {
  const breadcrumb: Category[] = [];
  const visited = new Set<string>();

  const traverse = (id: string): boolean => {
    if (visited.has(id)) return false;
    visited.add(id);

    const category = allCategories.find((cat) => cat.id === id);
    if (!category) return false;

    if (category.id === categoryId) {
      breadcrumb.unshift(category);
      return true;
    }

    if (category.child_categories) {
      for (const childId of category.child_categories) {
        if (traverse(childId)) {
          breadcrumb.unshift(category);
          return true;
        }
      }
    }

    return false;
  };

  const roots = allCategories.filter(
    (cat) => !cat.parent_category_id || cat.parent_category_id.length === 0
  );

  for (const root of roots) {
    if (traverse(root.id)) break;
  }

  return breadcrumb;
};

export const searchCategories = (
  searchTerm: string,
  allCategories: Category[]
): Category[] => {
  const term = searchTerm.toLowerCase().trim();
  if (!term) return allCategories;

  return allCategories.filter(
    (cat) =>
      cat.name.toLowerCase().includes(term) ||
      cat.description?.toLowerCase().includes(term) ||
      cat.slug.toLowerCase().includes(term)
  );
};

export const getRootCategories = (allCategories: Category[]): Category[] => {
  return allCategories.filter(
    (cat) => !cat.parent_category_id || cat.parent_category_id.length === 0
  );
};

export const isRootCategory = (category: Category): boolean => {
  return (
    !category.parent_category_id || category.parent_category_id.length === 0
  );
};

export const hasChildren = (category: Category): boolean => {
  return !!category.child_categories && category.child_categories.length > 0;
};