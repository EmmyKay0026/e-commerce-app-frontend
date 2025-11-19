"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/types/productForm";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useUserStore } from "@/store/useUserStore";
import Link from "next/link";

interface Step2Props {
  form: UseFormReturn<ProductFormData>;
}

export function Step2({ form }: Step2Props) {
  const categories = form.watch("categories");
  const user = useUserStore((s) => s.user);

  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        Please select a category in Step 1
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold">Product Details</h3>
        <p className="text-sm text-muted-foreground">
          Provide information about your product
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Product Name *</Label>
        <Input
          id="name"
          placeholder="Enter product name"
          {...form.register("name")}
        />
        {form.formState.errors.name && (
          <p className="text-sm text-destructive">
            {form.formState.errors.name.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description *</Label>
        <Textarea
          id="description"
          placeholder="Describe your product..."
          className="min-h-[100px]"
          {...form.register("description")}
        />
        {form.formState.errors.description && (
          <p className="text-sm text-destructive">
            {form.formState.errors.description.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="features">Features </Label>
        <Textarea
          id="features"
          placeholder="Enter features separated by | (e.g., Fast Charging | Water Resistant | 5G Compatible)"
          className="min-h-[100px]"
          {...form.register("features")}
        />
        <p className="text-sm text-muted-foreground">
          Separate each feature with a | symbol
        </p>
        {form.formState.errors.features && (
          <p className="text-sm text-destructive">
            {form.formState.errors.features.message}
          </p>
        )}
      </div>
      {/* No in stock */}
      <div className="space-y-2">
        <Label htmlFor="amount_in_stock">Number in stock *</Label>
        <Input
          id="amount_in_stock"
          type="number"
          placeholder="Enter the number of items in stock "
          {...form.register("amount_in_stock")}
        />
        {form.formState.errors.amount_in_stock && (
          <p className="text-sm text-destructive">
            {form.formState.errors.amount_in_stock.message}
          </p>
        )}
      </div>

      {/* Product condition */}
      <div className="space-y-2 mt-6">
        <Label>Item condition</Label>
        <div className="flex gap-4 mt-1">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="new"
              {...form.register("item_condition")}
              className="w-4 h-4 text-primary border-muted"
            />
            <span>New</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="used"
              {...form.register("item_condition")}
              className="w-4 h-4 text-primary border-muted"
            />
            <span>Used</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="refurbished"
              {...form.register("item_condition")}
              className="w-4 h-4 text-primary border-muted"
            />
            <span>Refurbished</span>
          </label>
        </div>
        {form.formState.errors.item_condition && (
          <p className="text-sm text-destructive">
            {form.formState.errors?.item_condition?.message}
          </p>
        )}
      </div>

      {/* Pricing Section */}
      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Price option</h3>

          <div className="flex gap-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="enter"
                {...form.register("price_input_mode")}
                className="w-4 h-4 text-primary border-muted"
              />
              <span>Enter price</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="quote"
                {...form.register("price_input_mode")}
                className="w-4 h-4 text-primary border-muted"
              />
              <span>Request a quote</span>
            </label>
          </div>
        </div>

        {form.watch("price_input_mode") === "enter" && (
          <>
            <div className="space-y-2">
              <Label htmlFor="price">Price *</Label>
              <Input
                id="price"
                type="number"
                placeholder="Enter price"
                {...form.register("price")}
              />
              {form.formState.errors.price && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.price.message}
                </p>
              )}
            </div>
            {/* Price Type Radio Buttons */}
            <div className="space-y-2">
              <Label>Price Type *</Label>
              <div className="flex gap-4 mt-1">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="fixed"
                    {...form.register("priceType")}
                    className="w-4 h-4 text-primary border-muted"
                  />
                  <span>Fixed price</span>
                </label>
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    value="negotiable"
                    {...form.register("priceType")}
                    className="w-4 h-4 text-primary border-muted"
                  />
                  <span>Negotiable price</span>
                </label>
              </div>
              {form.formState.errors.priceType && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.priceType.message}
                </p>
              )}
            </div>
          </>
        )}

        {/* Price Negotiability Radio Buttons */}
        <div className="space-y-2">
          <Label>Sale type</Label>
          <div className="flex gap-4 mt-1">
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="wholesale"
                {...form.register("saleType")}
                className="w-4 h-4 text-primary border-muted"
              />
              <span>Wholesale</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="radio"
                value="retail"
                {...form.register("saleType")}
                className="w-4 h-4 text-primary border-muted"
              />
              <span>Retail</span>
            </label>
          </div>
          {form.formState.errors.saleType && (
            <p className="text-sm text-destructive">
              {form.formState.errors.saleType.message}
            </p>
          )}
        </div>
      </div>

      <section className=" ">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Contact information</h3>
          <p className="text-sm text-muted-foreground">
            This information will be displayed on your product page. You can
            update it later in your business profile{" "}
            <Link className="underline text-primary" href={"/settings"}>
              {" "}
              settings
            </Link>
            .
          </p>
        </div>
        <div className="flex items-center gap-9 flex-wrap">
          <div className="space-y-2">
            <Label>Business name</Label>
            <Input
              id="business-name"
              type="text"
              placeholder="Enter business contact info"
              className="opacity-80"
              disabled
              value={user?.business_profile?.business_name || ""}
            // {...form.register("price")}
            />
          </div>

          <div className="space-y-2">
            <Label>Contact number</Label>
            <Input
              id="business-name"
              type="text"
              placeholder="Enter business contact info"
              className="opacity-80"
              disabled
              value={user?.phone_number || ""}
            // {...form.register("price")}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
