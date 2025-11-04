"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createBusinessProfile } from "@/services/businessProfileService";
import Link from "next/link";

export default function CreateBusinessAccountForm() {
  const router = useRouter();
  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [createdBusinessSlug, setCreatedBusinessSlug] = useState("");

  const handleFileChange = (f?: FileList | null) => {
    const file = f && f.length > 0 ? f[0] : null;
    setCoverFile(file);
    if (!file) {
      setCoverPreview(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => setCoverPreview(String(reader.result));
    reader.readAsDataURL(file);
  };

  const sanitizeSlug = (s: string) =>
    s
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\-\s]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!businessName.trim()) {
      setError("Business name is required.");
      return;
    }
    if (!slug.trim()) {
      setError("Slug is required.");
      return;
    }

    const finalSlug = sanitizeSlug(slug);
    setIsSubmitting(true);
    try {
      const payload: any = {
        business_name: businessName,
        slug: finalSlug,
        description: description,
        cover_image: coverPreview || "",
        status: "active",
      };

      const resp = await createBusinessProfile(payload);

      if (resp.success) {
        setCreatedBusinessSlug(finalSlug);
        setShowSuccessModal(true);
        setBusinessName("");
        setSlug("");
        setDescription("");
        setCoverFile(null);
        setCoverPreview(null);

        router.refresh();
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
        <p className="">
          Before adding a product, you must create a business account.
        </p>
        <p className="">
          Need a guide creating your business, read the{" "}
          <Link
            href={"/guide/creating-a-business-account"}
            className="text-primary  italic underline "
          >
            business guide.
          </Link>
        </p>

        <form onSubmit={handleSubmit} className="space-y-4 mt-7">
          <div>
            <label className="block text-sm font-medium mb-1">
              Business name
            </label>
            <input
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full border rounded px-3 py-2"
              placeholder="My Awesome Store"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Slug</label>
            <input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              onBlur={(e) => setSlug(sanitizeSlug(e.target.value))}
              className="w-full border rounded px-3 py-2"
              placeholder="my-awesome-store"
              required
            />
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
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-3 py-2 h-24"
              placeholder="Tell customers about your business"
            />
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
            <p className="text-xs text-muted-foreground mt-1">
              Optional: upload a cover image for your store (will be sent as
              data URL). Replace with proper upload in production.
            </p>
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-primary text-white px-4 py-2 rounded disabled:opacity-60"
            >
              {isSubmitting ? "Creating..." : "Create Business Account"}
            </button>
          </div>
        </form>
      </div>

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Business Account Created!
              </h3>
              <p className="text-gray-600 mb-4">
                Your business profile has been created successfully. You can now
                start managing your store.
              </p>
              <div className="flex gap-3 justify-center">
                <Link
                  href={`/sell`}
                  onClick={() => router.refresh()}
                  className="bg-primary text-white px-4 py-2 rounded"
                >
                  Add new product
                </Link>
                <Link
                  href={`/shop/${createdBusinessSlug}`}
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded"
                >
                  View business page
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
