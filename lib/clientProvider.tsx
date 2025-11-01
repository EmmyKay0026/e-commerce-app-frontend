"use client";

import React from "react";
import { useFetchDataOnMount } from "@/store/useUserStore";
import { useFetchCategoriesOnMount } from "@/store/useCategoryStore";

export default function ClientProviders() {
  // Run once on mount to fetch data
  useFetchDataOnMount();
  useFetchCategoriesOnMount();

  return null; // It doesn’t render anything
}
