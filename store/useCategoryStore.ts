import { create } from "zustand";
// import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/models";
import { getAllCategories } from "@/services/categoryService";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,
  fetchCategories: async () => {
    if (get().categories.length === 0 && !get().loading) {
      set({ loading: true, error: null });
      try {
        const categories = await getAllCategories();
        // if (categories.data) {
        set({ categories: categories, loading: false });
        // }
      } catch (error) {
        set({ loading: false, error: "Failed to fetch categories" });
      }
    }
  },
}));
