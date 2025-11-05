"use client";

import React, { useEffect, useState } from "react";
import { createBusinessProfile } from "@/services/businessProfileService";
import { useUserStore } from "@/store/useUserStore";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import CreateBusinessAccountForm from "@/components/molecules/CreateBusinessAccountForm";

export default function CreateBusinessAccountPage() {
  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const user = useUserStore((state) => state.user);
  const router = useRouter();

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
      window.location.href = "/user/settings";
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

    // sanitize slug first
    const finalSlug = sanitizeSlug(slug);

    const payload: any = {
      business_name: businessName,
      slug: finalSlug,
      description: description,
      cover_image: coverPreview || "",
      status: "active",
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
      return;
    }

    setIsSubmitting(true);
    try {
      // NOTE: This is a simple approach that sends the cover image as a data URL
      // in the `cover_image` field. In production you should upload to storage
      // (S3, Cloudinary, etc.) and send the resulting URL to the backend.

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
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-semibold mb-4">Create Business Account</h1>

        <CreateBusinessAccountForm />
        {/* <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Business name
            </label>
            <input
              value={businessName}
              onChange={(e) => {
                setBusinessName(e.target.value);
                setFieldErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.business_name;
                  return copy;
                });
              }}
              className="w-full border rounded px-3 py-2"
              placeholder="My Awesome Store"
              required
            />
            {fieldErrors.business_name && (
              <p className="text-sm text-red-500 mt-1">
                {fieldErrors.business_name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              value={slug}
              onChange={(e) => {
                setSlug(e.target.value);
                setFieldErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.slug;
                  return copy;
                });
              }}
              onBlur={(e) => setSlug(sanitizeSlug(e.target.value))}
              className="w-full border rounded px-3 py-2"
              placeholder="my-awesome-store"
              required
            />
            {fieldErrors.slug && (
              <p className="text-sm text-red-500 mt-1">{fieldErrors.slug}</p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              URL-friendly identifier used in your shop link
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setFieldErrors((prev) => {
                  const copy = { ...prev };
                  delete copy.description;
                  return copy;
                });
              }}
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Tell customers about your business"
            />
            {fieldErrors.description && (
              <p className="text-sm text-red-500 mt-1">
                {fieldErrors.description}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Cover image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleFileChange(e.target.files)}
              className="block"
            />
            {coverPreview && (
              <img
                src={coverPreview}
                alt="cover preview"
                className="mt-2 h-40 object-cover w-full rounded"
              />
            )}
            {fieldErrors.cover_image && (
              <p className="text-sm text-red-500 mt-1">
                {fieldErrors.cover_image}
              </p>
            )}
            <p className="text-xs text-muted-foreground mt-1">
              Optional: upload a cover image for your store (will be sent as
              data URL). Replace with proper upload in production.
            </p>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create Business Account"}
            </button>
          </div>
          {error && <p className="text-sm text-red-500 mt-2">{error}</p>}
          {success && <p className="text-sm text-green-600 mt-2">{success}</p>}
        </form> */}
      </div>
    </div>
  );
}
