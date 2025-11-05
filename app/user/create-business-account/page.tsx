"use client";

import React, { useState } from "react";
import { createBusinessProfile } from "@/services/businessProfileService";

export default function CreateBusinessAccountPage() {
  const [businessName, setBusinessName] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // create a data URL preview for selected file
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
    setSuccess(null);

    // basic validation
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
      // NOTE: This is a simple approach that sends the cover image as a data URL
      // in the `cover_image` field. In production you should upload to storage
      // (S3, Cloudinary, etc.) and send the resulting URL to the backend.
      const payload: any = {
        business_name: businessName,
        slug: finalSlug,
        description: description,
        cover_image: coverPreview || "",
        status: "active",
      };

      const resp = await createBusinessProfile(payload);
      if (resp.success) {
        setSuccess("Business profile created successfully.");
        setBusinessName("");
        setSlug("");
        setDescription("");
        setCoverFile(null);
        setCoverPreview(null);
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
        <form onSubmit={handleSubmit} className="space-y-4">
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
          {success && <div className="text-sm text-green-600">{success}</div>}

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
    </div>
  );
}
