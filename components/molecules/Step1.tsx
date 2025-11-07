import type React from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/types/productForm";
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
import { useState, useEffect } from "react";
import Image from "next/image";
import { Category, Product } from "@/types/models";
import { State, LGA } from "@/types/location";
import { toast } from "sonner";
import { getAllCategories } from "@/services/categoryService";
import { listStates, listLgas } from "@/services/locationService";

interface Step1Props {
  form: UseFormReturn<ProductFormData>;
  imagePreviews: string[];
  setImagePreviews: React.Dispatch<React.SetStateAction<string[]>>;
  product?: Product;
}

export function Step1({
  form,
  imagePreviews,
  setImagePreviews,
  product,
}: Step1Props) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [states, setStates] = useState<State[]>([]);
  const [lgas, setLgas] = useState<LGA[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [isLoadingStates, setIsLoadingStates] = useState(true);
  const [isLoadingLgas, setIsLoadingLgas] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const categoriesResult = await getAllCategories();
        if (Array.isArray(categoriesResult)) {
          setCategories(categoriesResult);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Could not load categories. Please try again.");
      } finally {
        setIsLoadingCategories(false);
      }

      const statesResult = await listStates();
      if (statesResult.success) {
        setStates(statesResult.data || []);
      }
      setIsLoadingStates(false);
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (product && states.length > 0) {
      const stateId = product?.location_state;
      if (stateId) {
        setSelectedState(stateId);
      }
    }
  }, [product, states]);

  useEffect(() => {
    if (selectedState && lgas.length > 0 && product?.location_lga) {
      form.setValue("location_lga", product.location_lga);
    }
    if (selectedState) {
      form.setValue("location_state", selectedState);
    }
  }, [lgas, product, selectedState, form]);

  useEffect(() => {
    if (!selectedState) {
      setLgas([]);
      return;
    }
    const fetchLgas = async () => {
      setIsLoadingLgas(true);
      const result = await listLgas(selectedState);
      if (result.success) {
        setLgas(result.data || []);
      }
      setIsLoadingLgas(false);
    };
    fetchLgas();
  }, [selectedState]);

 const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const currentFiles = form.getValues("images") || [];
    const totalImages = currentFiles.length + files.length;

    if (totalImages > 15) {
      toast.error("Maximum 15 images allowed");
      return;
    }

    form.setValue("images", [...currentFiles, ...files], { shouldValidate: true });

    const newPreviews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(prev => [...prev, ...newPreviews]);
  };

  const handleRemoveImage = (indexToRemove: number) => {
    const currentFiles = form.getValues("images") || [];
    const newFiles = currentFiles.filter((_, i) => i !== indexToRemove);
    form.setValue("images", newFiles, { shouldValidate: true });

    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(imagePreviews[indexToRemove]); 
    const newPreviews = imagePreviews.filter((_, i) => i !== indexToRemove);
    setImagePreviews(newPreviews);
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
            onChange={handleImageChange}
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
          {imagePreviews.map((previewUrl, index) => (
            <div key={index} className="relative group">
              <div className="aspect-square rounded-lg overflow-hidden border border-border">
                <Image
                  src={previewUrl}
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
                onClick={() => handleRemoveImage(index)}
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
          value={form.watch("category")?.id || ""}
          onValueChange={(value) => {
            const selectedCategory = categories.find((cat) => cat.id === value);
            if (selectedCategory) {
              form.setValue(
                "category",
                {
                  id: selectedCategory.id,
                  name: selectedCategory.name,
                },
                { shouldValidate: true }
              );
            }
          }}
        >
          <SelectTrigger id="category" disabled={isLoadingCategories}>
            <SelectValue
              placeholder={
                isLoadingCategories
                  ? "Loading categories..."
                  : "Select a category"
              }
            />
          </SelectTrigger>
          <SelectContent>
            {categories.length === 0 && !isLoadingCategories ? (
              <div className="p-2 text-sm text-muted-foreground text-center">
                No categories found
              </div>
            ) : (
              categories.map((category) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.name}
                </SelectItem>
              ))
            )}
          </SelectContent>
        </Select>
        {form.formState.errors.category && (
          <p className="text-sm text-destructive">
            {form.formState.errors.category.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Location *</Label>
        <div className="grid grid-cols-2 gap-4">
          <Select
            onValueChange={(value) => {
              setSelectedState(value);
              form.setValue("location_state", value);
            }}
            value={selectedState || ""}
            defaultValue={selectedState || ""}
            disabled={isLoadingStates}
          >
            <SelectTrigger className="capitalize">
              <SelectValue
                className="capitalize"
                placeholder={
                  isLoadingStates ? "Loading states..." : "Select state"
                }
              />
            </SelectTrigger>
            <SelectContent className="capitalize">
              {states.filter(
                (state) => state && typeof state.state_id === "string"
              ).length > 0 ? (
                states
                  .filter(
                    (state) => state && typeof state.state_id === "string"
                  )
                  .map((state, index) => (
                    <SelectItem
                      className="capitalize"
                      key={state.state_id}
                      value={state.state_id}
                    >
                      {state.name}
                    </SelectItem>
                  ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No states found
                </div>
              )}
            </SelectContent>
          </Select>
          <Select
            onValueChange={(value) => {
              const selectedLga = lgas.find((lga) => lga.lga_id === value);
              if (selectedLga) {
                form.setValue("location_lga", selectedLga.lga_id);
              }
            }}
            value={form.watch("location_lga") || ""}
            disabled={!selectedState || isLoadingLgas}
          >
            <SelectTrigger className="capitalize">
              <SelectValue
                placeholder={isLoadingLgas ? "Loading LGAs..." : "Select LGA"}
              />
            </SelectTrigger>
            <SelectContent>
              {lgas.filter((lga) => lga && typeof lga.lga_id === "string")
                .length > 0 ? (
                lgas
                  .filter((lga) => lga && typeof lga.lga_id === "string")
                  .map((lga, index) => (
                    <SelectItem
                      className="capitalize"
                      key={lga.lga_id}
                      value={lga.lga_id}
                    >
                      {lga.name}
                    </SelectItem>
                  ))
              ) : (
                <div className="p-2 text-sm text-muted-foreground text-center">
                  No LGAs found
                </div>
              )}
            </SelectContent>
          </Select>
        </div>
        {form.formState.errors.location_lga && (
          <p className="text-sm text-destructive">
            {form.formState.errors.location_lga.message}
          </p>
        )}
      </div>
    </div>
  );
}
