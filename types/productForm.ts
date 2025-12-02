import { z } from "zod";

// Category types
export type ProductCategory = "Electronics" | "Furniture" | "Clothing";

// Base schema for Step 1
export const step1Schema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(1, "At least 1 image is required")
    .max(5, "You can upload up to 5 images"),
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
export const productFormSchema = z
  .object({
    // Step 1
    images: z
      .array(z.instanceof(File))
      .min(1, "At least 1 image is required")
      .max(5, "You can upload up to 5 images"),
    categories: z
      .array(
        z.object({
          id: z.string(),
          name: z.string(),
        })
      )
      .min(1, "Please select at least one category")
      .max(5, "You can select up to 5 categories"),
    location_state: z.string().min(2, "Select a state"),
    location_lga: z.string().min(2, "Select a local government area"),

    // Step 2 - Product Details
    name: z
      .string()
      .min(2, "Product name must be at least 2 characters")
      .max(50, "Product name must be at most 50 words"),
    description: z
      .string()
      .refine((val) => val.split(" ").length <= 250, "Description must be at less 250 words")
      .optional(),
    price: z.string().optional(),
    price_input_mode: z.enum(["enter", "quote"]).default("enter"),
    priceType: z
      .enum(["fixed", "negotiable"])
      .describe("Please select a price type")
      .optional(),
    saleType: z
      .enum(["wholesale", "retail"])
      .describe("Please indicate if the price is negotiable")
      .optional(),
    item_condition: z
      .enum(["new", "refurbished", "used"])
      .describe("Please indicate if the condition of the item")
      .optional(),
    amount_in_stock: z
      .string()
      .min(1, "Amount in stock must be at least 1")
      .describe("Please indicate the amount in stock")
      .optional(),
    features: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.price_input_mode === "enter" && !data.price) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["price"],
        message: "Price is required when entering a price",
      });
    }


    if (data.price_input_mode === "enter" && !data.priceType) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["priceType"],
        message: "Price type is required when entering a price",
      });
    }
  });

export type ProductFormData = z.infer<typeof productFormSchema>;

// Image preview type
export interface ImagePreview {
  file: File;
  preview: string;
}
