import { create } from "zustand";
import type { Category } from "@/types/models";
import { getAllCategories } from "@/services/categoryService";

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
  setCategories: (categories: Category[]) => void; // <-- added
}

export const useCategoryStore = create<CategoryState>((set, get) => ({
  categories: [],
  loading: false,
  error: null,

  // NEW: Allows hydration from server
  setCategories: (categories) => set({ categories }),

  // OLD: Your original client-side fetch logic (kept)
  fetchCategories: async () => {
    if (get().categories.length === 0 && !get().loading) {
      set({ loading: true, error: null });

      try {
        const categories = await getAllCategories();
        set({ categories, loading: false });
      } catch (error) {
        set({ loading: false, error: "Failed to fetch categories" });
      }
    }
  },
}));
