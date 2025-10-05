"use client";

import type React from "react";

import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData, ImagePreview } from "@/types/productForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

interface Step1Props {
  form: UseFormReturn<ProductFormData>;
}

const categories = ["Electronics", "Furniture", "Clothing"];

export function Step1({ form }: Step1Props) {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const newPreviews: ImagePreview[] = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImagePreviews((prev) => [...prev, ...newPreviews]);

    const currentImages = form.getValues("images") || [];
    form.setValue("images", [...currentImages, ...files], {
      shouldValidate: true,
    });
  };

  const removeImage = (index: number) => {
    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    setImagePreviews(newPreviews);

    const currentImages = form.getValues("images") || [];
    const newImages = currentImages.filter((_, i) => i !== index);
    form.setValue("images", newImages, { shouldValidate: true });

    // Revoke object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[index].preview);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="images">Product Images *</Label>
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
          <input
            id="images"
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
            className="hidden"
          />
          <label
            htmlFor="images"
            className="cursor-pointer flex flex-col items-center gap-2"
          >
            <Upload className="w-10 h-10 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Click to upload or drag and drop
            </span>
            <span className="text-xs text-muted-foreground">
              PNG, JPG, GIF up to 10MB
            </span>
          </label>
        </div>
        {form.formState.errors.images && (
          <p className="text-sm text-destructive">
            {form.formState.errors.images.message}
          </p>
        )}
      </div>

      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {imagePreviews.map((preview, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-border">
                <Image
                  src={preview.preview || "/placeholder.svg"}
                  alt={`Preview ${index + 1}`}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => removeImage(index)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-2">
        <Label htmlFor="category">Category *</Label>
        <Select
          value={form.watch("category")}
          onValueChange={(value) =>
            form.setValue("category", value as any, { shouldValidate: true })
          }
        >
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {form.formState.errors.category && (
          <p className="text-sm text-destructive">
            {form.formState.errors.category.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location *</Label>
        <Input
          id="location"
          placeholder="e.g., New York, USA"
          {...form.register("location")}
        />
        {form.formState.errors.location && (
          <p className="text-sm text-destructive">
            {form.formState.errors.location.message}
          </p>
        )}
      </div>
    </div>
  );
}
