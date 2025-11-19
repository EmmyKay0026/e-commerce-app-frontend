"use client";

import React, { useEffect, useState } from "react";
import { createBusinessProfile } from "@/services/businessProfileService";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import CreateBusinessAccountForm from "@/components/molecules/CreateBusinessAccountForm";
import { uploadImageToCloudflare } from "@/lib/cloudflareImageUpload";
import { constructImageUrl, formatPhoneNumber } from "@/lib/utils";
import Hero from "@/components/organisms/SharedHeroSection";

export default function CreateBusinessAccountPage() {
  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const user = useUserStore((state) => state.user);
  const router = useRouter();

  useEffect(() => {
    if (user) {
      setPhoneNumber(user.phone_number || "");
      setBusinessEmail(user.email || "");
      // Assuming you have address fields in your user object
      // setBusinessAddress(user.address || "");
    }
  }, [user]);

  // Zod schema for validation
  const businessSchema = z.object({
    business_name: z.string().min(1, "Business name is required."),
    slug: z
      .string()
      .min(1, "Slug is required.")
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        "Slug must be URL-friendly (lowercase letters, numbers and hyphens only)."
      ),
    description: z.string().max(1000, "Description is too long.").optional(),
    cover_image: z.string().optional(),
    status: z.string().optional(),
    phone_number: z.string().optional(),
    whatsapp_number: z.string().optional(),
    business_email: z.string().email().optional(),
    business_address: z.string().optional(),
  });

  // create a data URL preview for selected file
  const handleFileChange = (f?: FileList | null) => {
    const file = f && f.length > 0 ? f[0] : null;
    setCoverFile(file);
    if (!file) {
      setCoverPreview(null);
      // clear any cover_image validation error
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy.cover_image;
        return copy;
      });
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    // If the logged-in user is already a vendor, redirect them to settings
    if (user?.role === "vendor") {
      // simple client-side redirect
      toast("You all ready have a business account");
      window.location.href = "/settings";
      return;
    }

    if (user === null) {
      import("@/store/useAuthModal").then((mod: any) => {
        const authHook = mod?.useAuthModal;
        // Zustand hooks expose getState on the hook function created by `create`.
        if (authHook && typeof authHook.getState === "function") {
          const state = authHook.getState();
          if (typeof state.setIsOpen === "function") {
            state.setIsOpen(true);
          }
        }
      });
    }
    // If there's no user (not logged in), open the auth/signup modal.
    // We dynamically import the auth modal store and call the stored setter.
    // This avoids adding top-level imports here.
  }, [user]);

  const sanitizeSlug = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // clear previous errors
    setError(null);
    setFieldErrors({});

    setIsSubmitting(true);

    try {
      let coverImageUrl = "";
      if (coverFile) {
        try {
          const imageKey = await uploadImageToCloudflare(coverFile);
          coverImageUrl = constructImageUrl(imageKey);
        } catch (uploadError: any) {
          setError(`Image upload failed: ${uploadError.message}`);
          setIsSubmitting(false);
          return;
        }
      }

      // sanitize slug first
      const finalSlug = sanitizeSlug(slug);

      const payload: any = {
        business_name: businessName,
        slug: finalSlug,
        description: description,
        cover_image: coverImageUrl,
        status: "active",
        phone_number: formatPhoneNumber(phoneNumber),
        whatsapp_number: formatPhoneNumber(whatsappNumber),
        business_email: businessEmail,
        business_address: businessAddress,
      };

      // validate with zod
      const result = businessSchema.safeParse(payload);
      if (!result.success) {
        const fieldErrs: Record<string, string> = {};
        for (const issue of result.error.issues) {
          const pathKey = (issue.path && issue.path[0]) || "_error";
          fieldErrs[String(pathKey)] = issue.message;
        }
        setFieldErrors(fieldErrs);
        setError("Please fix the highlighted fields.");
        setIsSubmitting(false);
        return;
      }

      const resp = await createBusinessProfile(payload);
      if (resp.success) {
        toast.success("Business profile created successfully.");
        setBusinessName("");
        setSlug(finalSlug); // keep sanitized slug or change to "" if you prefer clearing
        setDescription("");
        setCoverFile(null);
        setCoverPreview(null);

        router.push(`/shop/${finalSlug}`);
      } else {
        setError(resp.error || "Failed to create business profile.");
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Hero
        title="Create Your Business Account"
        subtitle="Join IndustrialMart Nigeria and showcase your industrial products to a wider audience."
        backgroundImage="/hero-sections-img.webp"
      />
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
          {/* <h1 className="text-2xl font-semibold mb-4">
            Create Business Account
          </h1> */}

          <CreateBusinessAccountForm
            businessName={businessName}
            setBusinessName={setBusinessName}
            slug={slug}
            setSlug={setSlug}
            sanitizeSlug={sanitizeSlug}
            description={description}
            setDescription={setDescription}
            coverPreview={coverPreview}
            handleFileChange={handleFileChange}
            phoneNumber={phoneNumber}
            setPhoneNumber={setPhoneNumber}
            whatsappNumber={whatsappNumber}
            setWhatsappNumber={setWhatsappNumber}
            businessEmail={businessEmail}
            setBusinessEmail={setBusinessEmail}
            businessAddress={businessAddress}
            setBusinessAddress={setBusinessAddress}
            handleSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            error={error}
            fieldErrors={fieldErrors}
          />
        </div>
      </div>
    </>
  );
}
