import React from "react";

export default function CategoryPageSkeleton() {
    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-10 py-10 pb-20">
                {/* Header Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 mb-8">
                    <div className="flex items-center justify-between gap-4">
                        <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
                        <div className="flex items-center gap-3">
                            <div className="hidden md:block w-80 h-10 bg-gray-200 rounded animate-pulse" />
                            <div className="md:hidden w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
                        </div>
                    </div>
                    <div className="mt-4 md:hidden h-10 bg-gray-200 rounded animate-pulse" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Sidebar Skeleton */}
                    <div className="hidden md:block">
                        <div className="bg-white rounded-2xl shadow p-6 border border-gray-100 h-[500px] animate-pulse">
                            <div className="h-6 bg-gray-200 rounded w-32 mb-6" />
                            <div className="space-y-6">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i}>
                                        <div className="h-4 bg-gray-200 rounded w-24 mb-2" />
                                        <div className="h-10 bg-gray-200 rounded w-full" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Product Grid Skeleton */}
                    <div className="md:col-span-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div
                                    key={i}
                                    className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm animate-pulse"
                                >
                                    <div className="aspect-[4/3] bg-gray-200" />
                                    <div className="p-4 space-y-3">
                                        <div className="h-4 bg-gray-200 rounded w-3/4" />
                                        <div className="h-6 bg-gray-200 rounded w-1/2" />
                                        <div className="flex justify-between pt-2">
                                            <div className="h-4 bg-gray-200 rounded w-20" />
                                            <div className="h-4 bg-gray-200 rounded w-16" />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
