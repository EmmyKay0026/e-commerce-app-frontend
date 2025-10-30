// /store/useCategoryStore.ts
"use client";

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import axios from "axios";
import type { Category } from "@/types/models";
import { useEffect } from "react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

interface CategoryState {
  categories: Category[];
  loading: boolean;
  error: string | null;
  fetchCategories: () => Promise<void>;
}

export const useCategoryStore = create<CategoryState>()(
  devtools((set) => ({
    categories: [],
    loading: false,
    error: null,

    fetchCategories: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axios.get(`${BASE_URL}/categories`);
        const data = res.data;

        const categories =
          Array.isArray(data)
            ? data
            : Array.isArray(data?.data)
            ? data.data
            : [];

        set({ categories, loading: false });
      } catch (error: any) {
        console.error("Failed to fetch categories:", error);
        set({
          error: error.message || "Failed to fetch categories",
          loading: false,
        });
      }
    },
  }))
);

export const useFetchCategoriesOnMount = () => {
  const fetchCategories = useCategoryStore((state) => state.fetchCategories);
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
};
