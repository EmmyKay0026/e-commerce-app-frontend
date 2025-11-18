"use client";

import React, { useEffect } from "react";
import { useCategoryStore } from "@/store/useCategoryStore";
import { useFetchDataOnMount } from "@/store/useUserStore"; // optional for user

import type { Category } from "@/types/models";

interface LayoutProviderProps {
  categories: Category[];
}

export default function LayoutProvider({ categories }: LayoutProviderProps) {
  // Optional: fetch user data client-side
  useFetchDataOnMount();

  useEffect(() => {
    // Hydrate Zustand store with server-fetched categories
    useCategoryStore.getState().setCategories(categories);
  }, [categories]);

  return null;
}
