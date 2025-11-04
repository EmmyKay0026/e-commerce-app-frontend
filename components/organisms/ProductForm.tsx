"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  type ProductFormData,
  productFormSchema,
  step1Schema,
  electronicsSchema,
  furnitureSchema,
  clothingSchema,
} from "@/types/productForm";
// import { StepIndicator } from "./StepIndicator";
// import { Step1 } from "./step1";
// import { Step2 } from "./step2";
// import { Step3 } from "./step3";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
// import { useToast } from "@/hooks/use-toast";
import { Step1 } from "../molecules/Step1";
import { Step2 } from "../molecules/Step2";
import { Step3 } from "../molecules/Step3";
import { StepIndicator } from "../molecules/StepIndicator";
import { toast } from "sonner";
import { createProduct } from "@/services/productService";

const TOTAL_STEPS = 3;

export function ProductForm() {
  const [currentStep, setCurrentStep] = useState(1);
  //   const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    mode: "onChange",
    defaultValues: {
      images: [],
      category: undefined as any,
      location: "",
      name: "",
      description: "",
      price: "",
      priceType: undefined,
      saleType: undefined,
      features: "",
    },
  });

  const validateStep = async (step: number): Promise<boolean> => {
    const formData = form.getValues();
    console.log("Validating step", step, "with data:", formData);

    try {
      if (step === 1) {
        // Validate required fields for step 1
        if (!formData.images || formData.images.length === 0) {
          toast.error("Please upload at least one image");
          return false;
        }

        if (!formData.category) {
          toast.error("Please select a category");
          return false;
        }

        if (!formData.location) {
          toast.error("Please enter a location");
          return false;
        }

        return true;
      }

      if (step === 2) {
        // Log the form data to check values
        console.log("Step 2 validation - Form data:", formData);

        if (!formData.name?.trim()) {
          toast.error("Please enter a product name");
          return false;
        }
        if (!formData.description?.trim()) {
          toast.error("Please enter a product description");
          return false;
        }
        if (typeof formData.price !== "string") {
          toast.error("Please enter a valid price");
          return false;
        }
        if (!formData.features?.trim()) {
          toast.error("Please enter at least one feature");
          return false;
        }

        // Log successful validation
        // console.log("Step 2 validation passed");
        return true;
      }

      return true;
    } catch (error: any) {
      console.error("Validation error:", error);
      const errorMessage =
        error.errors?.[0]?.message || "Please fill in all required fields";
      toast.error(errorMessage);
      return false;
    }
  };

  const handleNext = async () => {
    const isValid = await validateStep(currentStep);
    if (isValid && currentStep < TOTAL_STEPS) {
      setCurrentStep((prev) => {
        console.log(prev);
        return prev + 1;
      });
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
    try {
      // console.log("[v0] Form submitted:", data);

      const result = await createProduct({
        name: data.name,
        description: data.description,
        price: data.price,
        images: data.images,
        category: data.category,
        location: data.location,
        features: data.features,
        price_type: data.priceType ?? null,
        sale_type: data.saleType ?? null,
      });

      if (result.success) {
        toast.success("Product created successfully!");
        // Reset form after successful submission
        form.reset();
        setCurrentStep(1);
      } else {
        toast.error(result.error || "Failed to create product");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to create product. Please try again.");
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  const [direction, setDirection] = useState(0);

  const handleStepChange = (newStep: number) => {
    setDirection(newStep > currentStep ? 1 : -1);
    setCurrentStep(newStep);
  };

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Submit Your Product</h1>
          <p className="text-muted-foreground">
            Fill in the details to list your product
          </p>
        </div>

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
                    {currentStep === 1 && <Step1 form={form} />}
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
                  disabled={currentStep === 1}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>

                {currentStep < TOTAL_STEPS && (
                  <Button type="button" onClick={handleNext}>
                    Next
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                {currentStep === TOTAL_STEPS && (
                  <Button type="submit">
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Submit Product
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
