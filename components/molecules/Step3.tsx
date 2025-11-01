"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ProductFormData } from "@/types/productForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

interface Step3Props {
  form: UseFormReturn<ProductFormData>;
  onEdit: (step: number) => void;
}

export function Step3({ form, onEdit }: Step3Props) {
  const formData = form.watch();
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  useEffect(() => {
    if (formData.images) {
      const previews = formData.images.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);

      return () => {
        previews.forEach((preview) => URL.revokeObjectURL(preview));
      };
    }
  }, [formData.images]);

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Review Your Product</h3>
        <p className="text-muted-foreground">
          Please review all information before submitting
        </p>
      </div>

      {/* Basic Information Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Basic Information</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(1)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-2">
              Product Images
            </h4>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              {imagePreviews.map((preview, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-lg overflow-hidden border border-border"
                >
                  <Image
                    src={preview || "/placeholder.svg"}
                    alt={`Product ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Category
              </h4>
              <Badge variant="secondary" className="mt-1">
                {formData.category?.name}
              </Badge>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Location
              </h4>
              <p className="mt-1">{formData.location}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Product Details Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Product Details</CardTitle>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onEdit(2)}
          >
            <Pencil className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name and Price */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Product Name
              </h4>
              <p className="mt-1 font-medium text-lg">{formData.name}</p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-muted-foreground">
                Price
              </h4>
              <p className="mt-1 font-medium text-lg">₦{formData.price}</p>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Description
            </h4>
            <p className="mt-1 whitespace-pre-wrap">{formData.description}</p>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-sm font-medium text-muted-foreground">
              Features
            </h4>
            <div className="mt-2 flex flex-wrap gap-2">
              {formData.features?.split("|").map((feature, index) => (
                <Badge key={index} variant="secondary">
                  {feature.trim()}
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
