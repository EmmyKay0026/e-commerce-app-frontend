"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export type FilterState = {
  minPrice?: number;
  maxPrice?: number;
  location_state?: string;
  location_lga?: string;
  price_type?: string;
  sort?: string;
};

type Props = {
  activeCategory: string;
  initialFilters?: FilterState;

  // These now come from the server
  availableStates: string[];
  availableLgasMap: Record<string, string[]>;
  availablePriceTypes?: string[];
  priceRange?: { min?: number; max?: number };
};

export default function SidebarFilter({
  activeCategory,
  initialFilters = {},
  availableStates = [],
  availableLgasMap = {},
  availablePriceTypes = ["fixed", "negotiable"],
  priceRange,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local UI state (synced with URL)
  const [minPrice, setMinPrice] = useState<number | "">(initialFilters.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState<number | "">(initialFilters.maxPrice ?? "");
  const [locationState, setLocationState] = useState<string>(initialFilters.location_state ?? "");
  const [locationLga, setLocationLga] = useState<string>(initialFilters.location_lga ?? "");
  const [priceType, setPriceType] = useState<string>(initialFilters.price_type ?? "");
  const [sort, setSort] = useState<string>(initialFilters.sort ?? "recommended");

  // Derived: LGAs for currently selected state
  const availableLgas = locationState ? availableLgasMap[locationState] || [] : [];

  // Reset LGA when state changes
  useEffect(() => {
    setLocationLga("");
  }, [locationState]);

  // Build URL with current filters
  const updateUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    // Price
    if (minPrice === "" || minPrice === undefined) {
      params.delete("minPrice");
    } else {
      params.set("minPrice", String(minPrice));
    }
    if (maxPrice === "" || maxPrice === undefined) {
      params.delete("maxPrice");
    } else {
      params.set("maxPrice", String(maxPrice));
    }

    // Location
    if (locationState) {
      params.set("location_state", locationState);
    } else {
      params.delete("location_state");
      params.delete("location_lga");
    }

    if (locationLga) {
      params.set("location_lga", locationLga);
    } else if (locationState) {
      params.delete("location_lga");
    }

    // Price type
    if (priceType) {
      params.set("price_type", priceType);
    } else {
      params.delete("price_type");
    }


    // Sort
    if (sort && sort !== "recommended") {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }

    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }, [
    minPrice,
    maxPrice,
    locationState,
    locationLga,
    priceType,
    sort,
    pathname,
    router,
    searchParams,
  ]);

  // Trigger URL update on any filter change
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  // Clear all filters
  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setLocationState("");
    setLocationLga("");
    setPriceType("");
    setSort("recommended");
  };

  const hasActiveFilters =
    minPrice !== "" ||
    maxPrice !== "" ||
    locationState ||
    locationLga ||
    priceType ||
    (sort && sort !== "recommended");

  return (
    <aside className="bg-white rounded-2xl shadow p-6 border border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-20">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Filter Results</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Type */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Type
        </label>
        <select
          value={priceType}
          onChange={(e) => setPriceType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          {availablePriceTypes.map((type) => (
            <option key={type} value={type}>
              {type === "fixed" ? "Fixed Price" : "Negotiable"}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (₦)
        </label>
        <div className="flex gap-3">
          <input
            type="number"
            placeholder={`Min${priceRange?.min !== undefined ? ` (${priceRange.min})` : ""}`}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
          <input
            type="number"
            placeholder={`Max${priceRange?.max !== undefined ? ` (${priceRange.max})` : ""}`}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
      </div>

      {/* State */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
        <select
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All States</option>
          {availableStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {availableStates.length === 0 && (
          <p className="text-xs text-gray-500 mt-2">No states available</p>
        )}
      </div>

      {/* LGA */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Local Government Area
        </label>
        <select
          value={locationLga}
          onChange={(e) => setLocationLga(e.target.value)}
          disabled={!locationState || availableLgas.length === 0}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed"
        >
          <option value="">
            {locationState ? "All LGAs" : "Select State First"}
          </option>
          {availableLgas.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
        {locationState && availableLgas.length === 0 && (
          <p className="text-xs text-gray-500 mt-2">No LGAs in this state</p>
        )}
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
        </select>
      </div>
    </aside>
  );
}