"use client";
import React from "react";

export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen animate-pulse" aria-hidden="true">
      {/* Header / Breadcrumbs */}
      <div className="bg-primary/10 border-b">
        <div className="container mx-auto px-4 py-12 w-[90%] lg:w-[75%] text-center">
          <div className="mx-auto h-10 w-3/4 md:w-2/3 bg-gray-200 dark:bg-gray-700 rounded mb-6" />
          <div className="flex items-center justify-center gap-2">
            <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
          {/* Left - Image Gallery Skeleton */}
          <div className="w-full lg:w-[53%] space-y-4">
            <div className="relative w-full aspect-[4/3] bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden" />
            <div className="flex gap-3 overflow-x-auto">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-20 w-28 flex-shrink-0 rounded-md bg-gray-200 dark:bg-gray-700"
                />
              ))}
            </div>
          </div>

          {/* Right - Product Info Skeleton */}
          <div className="w-full lg:w-[47%] space-y-6">
            <div className="h-8 w-5/6 md:w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="h-10 w-32 bg-gray-200 dark:bg-gray-700 rounded" />
            <div className="space-y-2">
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-4/5 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>

            {/* Metadata / vendor card skeleton */}
            <div className="bg-card rounded-xl p-4 shadow border border-transparent">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-md bg-gray-200 dark:bg-gray-700 flex-shrink-0" />
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
                  <div className="h-3 w-1/3 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              </div>
            </div>

            {/* Action buttons skeleton */}
            <div className="flex gap-3">
              <div className="h-12 flex-1 rounded bg-gray-200 dark:bg-gray-700" />
              <div className="h-12 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
