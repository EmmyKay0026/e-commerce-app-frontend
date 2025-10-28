import axios from "axios";
import type { Category, Product } from "@/types/models";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

type ApiResponse<T> = {
  success: boolean;
  data: T;
  message?: string;
};

// Extended category type with children for tree structure
export interface CategoryTree extends Category {
  children?: CategoryTree[];
}

/**
 * Get all categories from the API
 */
export const getAllCategories = async (): Promise<Category[]> => {
  try {
    const res = await api.get<ApiResponse<Category[]>>("/categories");
    const data = res.data;

    // Handle different response formats
    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;
    
    return [];
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
};

/**
 * Get single category by ID or slug
 */
export const getCategoryByIdOrSlug = async (
  idOrSlug: string
): Promise<Category | null> => {
  try {
    const res = await api.get<ApiResponse<Category>>(`/categories/${idOrSlug}`);
    
    if (res.data?.success && res.data.data) {
      return res.data.data;
    }
    
    return null;
  } catch (error) {
    console.error(`Failed to fetch category (${idOrSlug}):`, error);
    return null;
  }
};

/**
 * Get products by category ID
 */
export const getProductsByCategory = async (
  categoryId: string
): Promise<Product[]> => {
  try {
    const res = await api.get<ApiResponse<Product[]>>("/products", {
      params: { category_id: categoryId },
    });

    const data = res.data;

    if (Array.isArray(data)) return data;
    if (data?.data && Array.isArray(data.data)) return data.data;

    return [];
  } catch (error) {
    console.error("Failed to fetch products by category:", error);
    return [];
  }
};

// ===== HIERARCHY UTILITIES =====

/**
 * Build a hierarchical tree structure from flat category list
 * Handles multi-parent categories by creating references
 */
// export const buildCategoryTree = (categories: Category[]): CategoryTree[] => {
//   const categoryMap = new Map<string, CategoryTree>();
//   const rootCategories: CategoryTree[] = [];

//   // Create a map for quick lookups
//   categories.forEach((cat) => {
//     categoryMap.set(cat.id, { ...cat, children: [] });
//   });

//   // Build the tree
//   categories.forEach((cat) => {
//     const category = categoryMap.get(cat.id)!;

//     if (!cat.parent_category_id || cat.parent_category_id.length === 0) {
//       // Root category
//       rootCategories.push(category);
//     } else {
//       // Add to all parents (handles multi-parent scenario)
//       cat.parent_category_id.forEach((parentId) => {
//         const parent = categoryMap.get(parentId);
//         if (parent) {
//           if (!parent.children) parent.children = [];
//           parent.children.push(category);
//         }
//       });
//     }
//   });

//   return rootCategories;
// };

/**
 * Get all parent categories for a given category
 */
export const getParentCategories = (
  categoryId: string,
  allCategories: Category[]
): Category[] => {
  const category = allCategories.find((cat) => cat.id === categoryId);
  
  if (!category || !category.parent_category_id) {
    return [];
  }

  return allCategories.filter((cat) =>
    category.parent_category_id!.includes(cat.id)
  );
};

/**
 * Get all child categories for a given category (direct children only)
 */
export const getChildCategories = (
  categoryId: string,
  allCategories: Category[]
): Category[] => {
  const category = allCategories.find((cat) => cat.id === categoryId);
  
  if (!category || !category.child_categories) {
    return [];
  }

  return allCategories.filter((cat) =>
    category.child_categories!.includes(cat.id)
  );
};

/**
 * Get all descendant categories recursively
 */
export const getAllDescendants = (
  categoryId: string,
  allCategories: Category[]
): Category[] => {
  const descendants: Category[] = [];
  const visited = new Set<string>();

  const traverse = (id: string) => {
    if (visited.has(id)) return;
    visited.add(id);

    const children = getChildCategories(id, allCategories);
    children.forEach((child) => {
      descendants.push(child);
      traverse(child.id);
    });
  };

  traverse(categoryId);
  return descendants;
};

/**
 * Get breadcrumb path for a category
 * Returns array of categories from root to current category
 */
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

  // Start from root categories
  const roots = allCategories.filter(
    (cat) => !cat.parent_category_id || cat.parent_category_id.length === 0
  );

  for (const root of roots) {
    if (traverse(root.id)) break;
  }

  return breadcrumb;
};

/**
 * Find categories by search term (name or description)
 */
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

/**
 * Get root categories (categories without parents)
 */
export const getRootCategories = (allCategories: Category[]): Category[] => {
  return allCategories.filter(
    (cat) => !cat.parent_category_id || cat.parent_category_id.length === 0
  );
};

/**
 * Check if a category is a root category
 */
export const isRootCategory = (category: Category): boolean => {
  return !category.parent_category_id || category.parent_category_id.length === 0;
};

/**
 * Check if a category has children
 */
export const hasChildren = (category: Category): boolean => {
  return !!category.child_categories && category.child_categories.length > 0;
};