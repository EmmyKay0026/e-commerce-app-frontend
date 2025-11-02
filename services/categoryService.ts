import api from "@/config/api";
import { Category } from "@/types/models";

export const categoryService = {
  getAllCategories: async (): Promise<Category[]> => {
    const response = await api.get("/categories");
    return response.data;
  },
};