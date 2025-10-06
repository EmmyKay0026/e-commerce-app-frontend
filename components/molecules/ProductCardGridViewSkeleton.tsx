"use client";
import * as React from "react";
import { Card } from "@/components/ui/card";

export function ProductCardGridViewSkeleton() {
  return (
    <Card
      className="overflow-hidden pt-0 pb-5 max-w-lg animate-pulse"
      aria-hidden="true"
    >
      {/* Image placeholder */}
      <div className="relative aspect-square bg-gray-200 dark:bg-gray-700" />

      {/* Details placeholder */}
      <div className="p-4 pt-0 space-y-3">
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />

        {/* Price placeholder */}
        <div className="text-2xl font-bold">
          <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>

        {/* Action buttons placeholders */}
        <div className="flex gap-2 pt-2">
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="flex-1 h-10 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </Card>
  );
}
