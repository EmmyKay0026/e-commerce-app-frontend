"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";

export function UserProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background" aria-hidden="true">
      {/* Cover */}

      <div className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Profile Header */}
        <Card className="rounded-xl shadow-sm animate-pulse">
          <CardContent className="p-6">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <div className="h-24 w-24 rounded-full bg-gray-200 dark:bg-gray-700" />

              <div className="flex-1 space-y-3">
                <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-1/2 rounded bg-gray-200 dark:bg-gray-700" />

                {/* Contact Info */}
                <div className="space-y-2 pt-2">
                  <div className="h-4 w-40 rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="space-y-2 text-sm">
                    <div className="h-4 w-48 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-36 rounded bg-gray-200 dark:bg-gray-700" />
                    <div className="h-4 w-32 rounded bg-gray-200 dark:bg-gray-700" />
                  </div>
                </div>
              </div>

              <div className="h-10 w-28 rounded bg-gray-200 dark:bg-gray-700" />
            </div>
          </CardContent>
        </Card>

        {/* Contact / Store Info Cards */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="rounded-xl shadow-sm animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm animate-pulse">
            <CardContent className="p-6">
              <div className="h-6 w-1/3 rounded bg-gray-200 dark:bg-gray-700 mb-4" />
              <div className="space-y-3">
                <div className="h-4 w-full rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-2/3 rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Section */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Products</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Card
                key={i}
                className="cursor-pointer rounded-xl shadow-sm transition-shadow hover:shadow-md animate-pulse"
              >
                <CardContent className="p-4">
                  <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-3/4 rounded bg-gray-200 dark:bg-gray-700 mb-2" />
                  <div className="h-4 w-1/4 rounded bg-gray-200 dark:bg-gray-700" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
