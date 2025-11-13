"use client";

import React, { useCallback, useEffect, useState } from "react";
import type { Product } from "@/types/models";

export type FilterState = {
  minPrice?: number;
  maxPrice?: number;
  location_state?: string;
  location_lga?: string;
  price_type?: "fixed" | "negotiable";
  sort?: string;
};

type Props = {
  products: Product[];
  activeCategory?: string;
  onFiltersChangeAction: (filters: FilterState) => void;
  initialFilters?: FilterState;
};

export default function SidebarFilter({
  products,
  activeCategory,
  onFiltersChangeAction,
  initialFilters = {},
}: Props) {
  const [minPrice, setMinPrice] = useState<number | "">(initialFilters.minPrice ?? "");
  const [maxPrice, setMaxPrice] = useState<number | "">(initialFilters.maxPrice ?? "");
  const [locationState, setLocationState] = useState<string>(initialFilters.location_state ?? "");
  const [locationLga, setLocationLga] = useState<string>(initialFilters.location_lga ?? "");
  const [priceType, setPriceType] = useState<string>(initialFilters.price_type ?? "");
  const [sort, setSort] = useState<string>(initialFilters.sort ?? "recommended");

  // Extract unique states from products (with safety checks)
  const availableStates = React.useMemo(() => {
    const states = new Set<string>();
    products.forEach((p) => {
      if (p.location_state && typeof p.location_state === 'string' && p.location_state.trim()) {
        states.add(p.location_state.trim());
      }
    });
    return Array.from(states).sort();
  }, [products]);

  // Extract unique LGAs based on selected state (with safety checks)
  const availableLgas = React.useMemo(() => {
    const lgas = new Set<string>();
    products.forEach((p) => {
      // Skip if no LGA
      if (!p.location_lga || typeof p.location_lga !== 'string' || !p.location_lga.trim()) {
        return;
      }

      if (locationState) {
        // Filter LGAs by selected state
        if (p.location_state === locationState) {
          lgas.add(p.location_lga.trim());
        }
      } else {
        // Show all LGAs if no state selected
        lgas.add(p.location_lga.trim());
      }
    });
    return Array.from(lgas).sort();
  }, [products, locationState]);

  // Reset LGA when state changes
  useEffect(() => {
    setLocationLga("");
  }, [locationState]);

  // Handle filters change
  const handleFiltersChange = useCallback(() => {
    onFiltersChangeAction({
      minPrice: minPrice === "" ? undefined : Number(minPrice),
      maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      location_state: locationState || undefined,
      location_lga: locationLga || undefined,
      price_type: priceType ? (priceType as "fixed" | "negotiable") : undefined,
      sort,
    });
  }, [
    minPrice,
    maxPrice,
    locationState,
    locationLga,
    priceType,
    sort,
    onFiltersChangeAction,
  ]);

  // Run every time filters change
  useEffect(() => {
    handleFiltersChange();
  }, [handleFiltersChange]);

  // Clear all filters
  const clearFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setLocationState("");
    setLocationLga("");
    setPriceType("");
    setSort("recommended");
  };

  // Check if any filters are active
  const hasActiveFilters = 
    minPrice !== "" || 
    maxPrice !== "" || 
    locationState || 
    locationLga || 
    priceType;

  return (
    <aside className="bg-white rounded-2xl shadow p-4 border border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Filter Results</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-xs text-blue-600 hover:text-blue-800 font-medium"
          >
            Clear all
          </button>
        )}
      </div>

      {/* Price Type */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Type
        </label>
        <select
          value={priceType}
          onChange={(e) => setPriceType(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Types</option>
          <option value="fixed">Fixed Price</option>
          <option value="negotiable">Negotiable</option>
        </select>
      </div>

      {/* Price range */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range (₦)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) =>
              setMinPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) =>
              setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-1/2 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="0"
          />
        </div>
      </div>

      {/* State */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          State
        </label>
        <select
          value={locationState}
          onChange={(e) => setLocationState(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All States</option>
          {availableStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
        {availableStates.length === 0 && (
          <p className="text-xs text-gray-500 mt-1">
            No location data available
          </p>
        )}
      </div>

      {/* LGA */}
      <div className="mb-5">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Local Government Area
        </label>
        <select
          value={locationLga}
          onChange={(e) => setLocationLga(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
          disabled={availableLgas.length === 0}
        >
          <option value="">All LGAs</option>
          {availableLgas.map((lga) => (
            <option key={lga} value={lga}>
              {lga}
            </option>
          ))}
        </select>
        {locationState && availableLgas.length === 0 && (
          <p className="text-xs text-gray-500 mt-1">
            No LGAs available for this state
          </p>
        )}
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Sort By
        </label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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