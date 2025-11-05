import { z } from "zod";

// Category types
export type ProductCategory = "Electronics" | "Furniture" | "Clothing";

// Base schema for Step 1
export const step1Schema = z.object({
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  category: z.enum(["Electronics", "Furniture", "Clothing"], {
    error: "Please select a category",
  }),
  location: z.string().min(2, "Location must be at least 2 characters"),
});

// Category-specific schemas for Step 2
export const electronicsSchema = z.object({
  brand: z.string().min(2, "Brand is required"),
  model: z.string().min(2, "Model is required"),
  condition: z.enum(["new", "used"], {
    error: "Please select a condition",
  }),
});

export const furnitureSchema = z.object({
  material: z.string().min(2, "Material is required"),
  dimensions: z.string().min(2, "Dimensions are required (e.g., 120x80x75 cm)"),
});

export const clothingSchema = z.object({
  size: z.string().min(1, "Size is required"),
  color: z.string().min(2, "Color is required"),
  gender: z.enum(["male", "female", "unisex"], {
    error: "Please select a gender",
  }),
});

// Combined schema
export const productFormSchema = z.object({
  // Step 1
  images: z.array(z.instanceof(File)).min(1, "At least one image is required"),
  category: z.object({
    id: z.string().min(1, "Please select a category"),
    name: z.string(),
  }),
  location: z.string().min(2, "Location must be at least 2 characters"),

  // Step 2 - Product Details
  name: z.string().min(2, "Product name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.string().min(1, "Price is required"),
  priceType: z
    .enum(["fixed", "negotiable"])
    .describe("Please select a price type")
    .optional(),
  saleType: z
    .enum(["wholesale", "retail"])
    .describe("Please indicate if the price is negotiable")
    .optional(),
  features: z.string().min(1, "At least one feature is required"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// Image preview type
export interface ImagePreview {
  file: File;
  preview: string;
}
