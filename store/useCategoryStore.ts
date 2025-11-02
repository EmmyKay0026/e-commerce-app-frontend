import { create } from "zustand";
import { categoryService } from "@/services/categoryService";
import { Category } from "@/types/models";

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
        const categories = await categoryService.getAllCategories();
        set({ categories, loading: false });
      } catch (error) {
        set({ loading: false, error: "Failed to fetch categories" });
      }
    }
  },
}));
