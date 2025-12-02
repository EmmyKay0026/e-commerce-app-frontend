"use client";

import { useState, useEffect } from "react";
import { useForm, type Resolver } from "react-hook-form";
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
import { createProduct } from "@/services/productService";
import { SuccessModal } from "../molecules/SuccessModal";
import { useUserStore } from "@/store/useUserStore";
import { uploadImagesToCloudflare } from "@/lib/cloudflareImageUpload";

const TOTAL_STEPS = 3;

export function ProductForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [newProductUrl, setNewProductUrl] = useState("");
  const user = useUserStore((s) => s.user);
  const profileUrl = user ? `/user/${user.profile_link}/profile` : "/";

  const form = useForm<ProductFormData>({
    resolver: zodResolver(
      productFormSchema
    ) as unknown as Resolver<ProductFormData>,
    mode: "onChange",
    defaultValues: {
      images: [],
      categories: [],
      location_lga: "",
      location_state: "",
      name: "",
      description: "",
      price: "",
      price_input_mode: "enter",
      item_condition: undefined,
      amount_in_stock: "0",
      priceType: undefined,
      saleType: undefined,
      features: "",
    },
  });

  // Cleanup for Object URLs
  useEffect(() => {
    return () => {
      imagePreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [imagePreviews]);

  const validateStep = async (step: number): Promise<boolean> => {
    let fieldsToValidate: (keyof ProductFormData)[] = [];

    if (step === 1) {
      fieldsToValidate = [
        "images",
        "categories",
        "location_state",
        "location_lga",
      ];
    } else if (step === 2) {
      fieldsToValidate = [
        "name",
        "description",
        "features",
        "amount_in_stock",
        "item_condition",
      ];

      // Only validate price-related fields when entering a price
      if (form.getValues("price_input_mode") === "enter") {
        fieldsToValidate.push("price", "priceType", "saleType");
      }
    }

    const result = await form.trigger(fieldsToValidate);

    if (!result) {
      toast.error("Please fill in all required fields correctly.");

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
    setIsSubmitting(true);
    console.log(data);
    try {
      toast.info("Uploading images...");
      const imageKeys = await uploadImagesToCloudflare(data.images);
      toast.success("Images uploaded successfully!");

      const result = await createProduct({
        name: data.name,
        description: data.description,
        price: data.price ?? "",
        images: imageKeys,

        category_ids: data.categories.map((c) => c.id),
        location_lga: data.location_lga,
        location_state: data.location_state,
        item_condition: data.item_condition,
        amount_in_stock: data.amount_in_stock,
        features: data.features,
        price_input_mode: data.price_input_mode,
        price_type: data.priceType ?? null,
        sale_type: data.saleType ?? null,
      });

      if (result.success && result.data) {
        toast.success("Product created successfully!");
        const productSlug = result.data.slug;
        setNewProductUrl(`/products/${productSlug}`);
        setIsSuccessModalOpen(true);
        form.reset();
        setCurrentStep(1);
        setImagePreviews([]);
      } else {
        const errorMessage = typeof result.error === 'string'
          ? result.error
          : result.error?.message || result.error?.detail || "Failed to create product";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to create product. Please try again.");
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

  const [direction, setDirection] = useState(0);

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit Your Product</h1>
          <p className="text-muted-foreground">
            Fill in the details to list your product
          </p>
        </div> */}

        <StepIndicator currentStep={currentStep} totalSteps={TOTAL_STEPS} />

        <Card className="mt-8">
          <CardContent className="p-6 md:p-8">
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="min-h-[400px]">
                <AnimatePresence mode="wait" custom={direction}>
                  <motion.div
                    key={currentStep}
                    custom={direction}
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
                  <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <CheckCircle className="w-4 h-4 mr-2" />
                    )}
                    {isSubmitting ? "Submitting..." : "Submit Product"}
                  </Button>
                )}
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        productUrl={newProductUrl}
        profileUrl={profileUrl}
      />
    </div>
  );
}
