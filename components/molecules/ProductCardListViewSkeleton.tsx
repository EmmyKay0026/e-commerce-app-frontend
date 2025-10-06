"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function ProductCardListViewSkeleton() {
  return (
    <Card
      className="overflow-hidden py-0 transition-shadow animate-pulse"
      aria-hidden="true"
    >
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {/* Image placeholder */}
          <div className="relative w-full md:w-48 h-48 flex-shrink-0 bg-gray-200 dark:bg-gray-700 rounded-lg" />

          {/* Details placeholder */}
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-1" />
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
            </div>

            {/* Price placeholder */}
            <div>
              <div className="h-8 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-1" />
            </div>

            {/* Action button placeholder */}
            <div className="flex md:flex-col gap-2 md:w-40 flex-shrink-0 mt-auto">
              <div className="flex-1 md:flex-none h-10 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
