"use client";

import { useState, useEffect } from "react";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { type ProductFormData, productFormSchema } from "@/types/productForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { Step1 } from "../molecules/Step1";
import { Step2 } from "../molecules/Step2";
import { Step3 } from "../molecules/Step3";
import { StepIndicator } from "../molecules/StepIndicator";
import { toast } from "sonner";
import { Product } from "@/types/models";
import { updateProduct } from "@/services/productService";
import { z } from "zod";
import { uploadImagesToCloudflare } from "@/lib/cloudflareImageUpload";
import { useRouter } from "next/navigation";

const TOTAL_STEPS = 3;

interface EditProductFormProps {
  product: Product;
}

export function EditProductForm({ product }: EditProductFormProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImageKeys, setExistingImageKeys] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Create a custom schema for editing that makes images optional without min validation
  const editProductSchema = productFormSchema.omit({ images: true }).extend({
    images: z.array(z.instanceof(File)).optional().default([]),
  });

  const form = useForm<ProductFormData>({
    resolver: zodResolver(editProductSchema) as unknown as Resolver<ProductFormData>,
    mode: "onChange",
    defaultValues: { images: [] /* other defaults */ },
  });

  useEffect(() => {
    if (product) {
      setImagePreviews(product.images);
      setExistingImageKeys(product.images);

      form.reset({
        name: product.name,
        description: product.description,
        price: product.price,
        images: [], // New images only
        categories:
          product.categories?.map((c) => ({
            id: c.category.id,
            name: c.category.name,
          })) || [],
        location_lga: product.location_lga || "",
        location_state: product.location_state || "",
        features: Array.isArray(product.features)
          ? product.features.join("|")
          : (product.features || ""),
        priceType: product.price_type,
        saleType: product.sale_type,
        price_input_mode: product.price_input_mode,
        item_condition: product.item_condition,
        amount_in_stock: product.amount_in_stock?.toString() || "",
      });
    }
  }, [product, form]);

  // Cleanup for Object URLs from new files
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => {
        if (url.startsWith("blob:")) {
          URL.revokeObjectURL(url);
        }
      });
    };
  }, [imagePreviews]);

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof ProductFormData)[] = [];
    if (step === 1) {
      // For editing, we don't require new images since the product already has images
      fieldsToValidate = [
        "categories",
        "location_state",
        "location_lga",
      ];
    } else if (step === 2) {
      // Only validate required fields for step 2
      fieldsToValidate = [
        "name",
        "price_input_mode",
      ];

      // Add price validation only if price_input_mode is "enter"
      const priceInputMode = form.getValues("price_input_mode");
      if (priceInputMode === "enter") {
        fieldsToValidate.push("price");
      }
    }

    const result = await form.trigger(fieldsToValidate);

    if (!result) {
      const errors = form.formState.errors;
      // console.log("Validation errors:", errors);
      toast.error("Please fill in all required fields correctly.");
      return false;
    }

    // For editing, we check total images (existing + new) instead of just new images
    if (step === 1 && imagePreviews.length < 1) {
      toast.error("Please provide at least 1 images.");
      return false;
    }

    return true;
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleEdit = (step: number) => {
    setCurrentStep(step);
  };

  const onSubmit = async (data: ProductFormData) => {
    // console.log("onSubmit called with data:", data);
    setIsSubmitting(true);
    try {
      let uploadedKeys: string[] = [];
      if (data.images && data.images.length > 0) {
        toast.info("Uploading new images...");
        uploadedKeys = await uploadImagesToCloudflare(data.images);
        toast.success("New images uploaded!");
      }

      const finalImageKeys = [...existingImageKeys, ...uploadedKeys];
      //
      const result = await updateProduct(product.id, {
        name: data.name,
        description: data.description || "",
        price: data.price ?? "",
        images: finalImageKeys,
        category_ids: data.categories.map((c) => c.id),
        location_lga: data.location_lga,
        location_state: data.location_state,
        features: data.features || "",
        price_input_mode: data.price_input_mode,
        price_type: data.priceType ?? null,
        sale_type: data.saleType ?? null,
        item_condition: data.item_condition,
        amount_in_stock: data.amount_in_stock,
      });

      if (result.success) {
        toast.success("Product updated successfully!");
        // Redirect to the product page after successful update
        setTimeout(() => {
          router.push(`/products/${product.slug}`);
        }, 1000);
      } else {
        const errorMessage = typeof result.error === 'string'
          ? result.error
          : result.error?.message || result.error?.detail || "Failed to update product";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Edit Your Product</h1>
          <p className="text-muted-foreground">
            Update the details of your product
          </p>
        </div>

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card className="mt-8">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: "spring", stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {currentStep === 1 && (
                      <Step1
                        form={form}
                        imagePreviews={imagePreviews}
                        setImagePreviews={setImagePreviews}
                        product={product}
                      />
                    )}
                    {currentStep === 2 && <Step2 form={form} />}
                    {currentStep === 3 && (
                      <Step3 form={form} onEdit={handleEdit} />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="flex justify-between mt-8 pt-6 border-t">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1 || isSubmitting}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep < TOTAL_STEPS && (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting}
                  >
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {currentStep === TOTAL_STEPS && (
                  <Button

                    type="submit"
                    disabled={isSubmitting}

                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Updating..." : "Update Product"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
