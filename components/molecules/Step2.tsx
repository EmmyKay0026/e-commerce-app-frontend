"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/types/productForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step2Props {
  form: UseFormReturn<ProductFormData>;
}

export function Step2({ form }: Step2Props) {
  const category = form.watch("category");

  if (!category) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Please select a category in Step 1
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">{category} Details</h3>
        <p className="text-sm text-muted-foreground">
          Provide specific information about your {category.toLowerCase()}
        </p>
      </div>

      {category === "Electronics" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="brand">Brand *</Label>
            <Input
              id="brand"
              placeholder="e.g., Apple, Samsung, Sony"
              {...form.register("brand")}
            />
            {form.formState.errors.brand && (
              <p className="text-sm text-destructive">
                {form.formState.errors.brand.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Model *</Label>
            <Input
              id="model"
              placeholder="e.g., iPhone 15 Pro, Galaxy S24"
              {...form.register("model")}
            />
            {form.formState.errors.model && (
              <p className="text-sm text-destructive">
                {form.formState.errors.model.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="condition">Condition *</Label>
            <Select
              value={form.watch("condition")}
              onValueChange={(value) =>
                form.setValue("condition", value as any, {
                  shouldValidate: true,
                })
              }
            >
              <SelectTrigger id="condition">
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="used">Used</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.condition && (
              <p className="text-sm text-destructive">
                {form.formState.errors.condition.message}
              </p>
            )}
          </div>
        </>
      )}

      {category === "Furniture" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="material">Material *</Label>
            <Input
              id="material"
              placeholder="e.g., Oak wood, Metal, Leather"
              {...form.register("material")}
            />
            {form.formState.errors.material && (
              <p className="text-sm text-destructive">
                {form.formState.errors.material.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dimensions">Dimensions *</Label>
            <Input
              id="dimensions"
              placeholder="e.g., 120x80x75 cm (L x W x H)"
              {...form.register("dimensions")}
            />
            {form.formState.errors.dimensions && (
              <p className="text-sm text-destructive">
                {form.formState.errors.dimensions.message}
              </p>
            )}
          </div>
        </>
      )}

      {category === "Clothing" && (
        <>
          <div className="space-y-2">
            <Label htmlFor="size">Size *</Label>
            <Input
              id="size"
              placeholder="e.g., S, M, L, XL, 32, 34"
              {...form.register("size")}
            />
            {form.formState.errors.size && (
              <p className="text-sm text-destructive">
                {form.formState.errors.size.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="color">Color *</Label>
            <Input
              id="color"
              placeholder="e.g., Black, Blue, Red"
              {...form.register("color")}
            />
            {form.formState.errors.color && (
              <p className="text-sm text-destructive">
                {form.formState.errors.color.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={form.watch("gender")}
              onValueChange={(value) =>
                form.setValue("gender", value as any, { shouldValidate: true })
              }
            >
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="unisex">Unisex</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.gender && (
              <p className="text-sm text-destructive">
                {form.formState.errors.gender.message}
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
}
