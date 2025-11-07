"use client";

import React from "react";
import Link from "next/link";
import { formatPhoneNumber } from "@/lib/utils";

interface CreateBusinessAccountFormProps {
  businessName: string;
  setBusinessName: (value: string) => void;
  slug: string;
  setSlug: (value: string) => void;
  sanitizeSlug: (value: string) => string;
  description: string;
  setDescription: (value: string) => void;
  coverPreview: string | null;
  handleFileChange: (files: FileList | null) => void;
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  whatsappNumber: string;
  setWhatsappNumber: (value: string) => void;
  businessEmail: string;
  setBusinessEmail: (value: string) => void;
  businessAddress: string;
  setBusinessAddress: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  error: string | null;
  fieldErrors: Record<string, string>;
}

export default function CreateBusinessAccountForm({
  businessName,
  setBusinessName,
  slug,
  setSlug,
  sanitizeSlug,
  description,
  setDescription,
  coverPreview,
  handleFileChange,
  phoneNumber,
  setPhoneNumber,
  whatsappNumber,
  setWhatsappNumber,
  businessEmail,
  setBusinessEmail,
  businessAddress,
  setBusinessAddress,
  handleSubmit,
  isSubmitting,
  error,
  fieldErrors,
}: CreateBusinessAccountFormProps) {
  return (
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
          onChange={(e) => setSlug(e.target.value)}
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
          onChange={(e) => setDescription(e.target.value)}
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
        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
          <div className="text-center">
            {coverPreview ? (
              <div className="relative w-48 h-48 mx-auto mb-4">
                <img
                  src={coverPreview}
                  alt="cover preview"
                  className="h-full w-full object-cover rounded-md"
                />
                <button
                  type="button"
                  onClick={() => handleFileChange(null)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            ) : (
              <svg
                className="mx-auto h-12 w-12 text-gray-300"
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 6a2.25 2.25 0 012.25-2.25h16.5A2.25 2.25 0 0122.5 6v12a2.25 2.25 0 01-2.25 2.25H3.75A2.25 2.25 0 011.5 18V6zM3 16.06V18c0 .414.336.75.75.75h16.5a.75.75 0 00.75-.75v-1.94l-2.432-2.432a1.125 1.125 0 00-1.588 0L9.75 17.25l-5.154-5.154a1.125 1.125 0 00-1.588 0L3 16.06zm10.5-7.81a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}

            <div className="mt-4 flex text-sm leading-6 text-gray-600">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e.target.files)}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
        {fieldErrors.cover_image && (
          <p className="text-sm text-red-500 mt-1">
            {fieldErrors.cover_image}
          </p>
        )}
      </div>

      <div className="border-t pt-4">
        <h2 className="text-lg font-semibold">Business Contact</h2>
        <p className="text-sm text-muted-foreground mb-4">
          This information will be displayed on your shop page. If you don't provide new details, your existing contact information will be used.
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">
            Business Email
          </label>
          <input
            type="email"
            value={businessEmail}
            onChange={(e) => setBusinessEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            placeholder="contact@example.com"
          />
          {fieldErrors.business_email && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.business_email}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
            className="w-full border rounded px-3 py-2"
            placeholder="+234..."
          />
          {fieldErrors.phone_number && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.phone_number}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            WhatsApp Number
          </label>
          <input
            value={whatsappNumber}
            onChange={(e) => setWhatsappNumber(formatPhoneNumber(e.target.value))}
            className="w-full border rounded px-3 py-2"
            placeholder="+234..."
          />
          {fieldErrors.whatsapp_number && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.whatsapp_number}
            </p>
          )}
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium mb-1">
            Business Address
          </label>
          <textarea
            value={businessAddress}
            onChange={(e) => setBusinessAddress(e.target.value)}
            className="w-full border rounded px-3 py-2 h-24"
            placeholder="123 Business St, Suite 100, City, Country"
          />
          {fieldErrors.business_address && (
            <p className="text-sm text-red-500 mt-1">
              {fieldErrors.business_address}
            </p>
          )}
        </div>
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
  );
}
