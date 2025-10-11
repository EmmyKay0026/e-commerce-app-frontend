"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";

type FilterState = {
  brands: string[];
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  condition?: string;
  powerSource?: string;
  sort?: string;
};

type Props = {
  products: Product[];
  activeCategory: string;
  onFiltersChangeAction: (filters: FilterState) => void;
};

export default function SidebarFilter({ products, onFiltersChangeAction }: Props) {
  // ✅ State
  const [minPrice, setMinPrice] = useState<number | "">("");
  const [maxPrice, setMaxPrice] = useState<number | "">("");
  const [location, setLocation] = useState<string>("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [condition, setCondition] = useState<string>("");
  const [powerSource, setPowerSource] = useState<string>("");
  const [sort, setSort] = useState<string>("recommended");

  // ✅ Derived brand & location lists
  const brands = useMemo(() => {
    const b = new Set<string>();
    products.forEach((p) => p.brand && b.add(p.brand));
    return Array.from(b);
  }, [products]);

  const locations = useMemo(() => {
    const s = new Set<string>();
    products.forEach((p) => p.location && s.add(p.location));
    return Array.from(s);
  }, [products]);

  // ✅ Stable callback to prevent re-renders
  const handleFiltersChange = useCallback(() => {
    onFiltersChangeAction({
      brands: selectedBrands,
      minPrice: minPrice === "" ? undefined : Number(minPrice),
      maxPrice: maxPrice === "" ? undefined : Number(maxPrice),
      location: location || undefined,
      condition: condition || undefined,
      powerSource: powerSource || undefined,
      sort,
    });
  }, [selectedBrands, minPrice, maxPrice, location, condition, powerSource, sort, onFiltersChangeAction]);

  // ✅ Trigger only when values change
  useEffect(() => {
    handleFiltersChange();
  }, [handleFiltersChange]);

  // ✅ Helpers
  function toggleBrand(b: string) {
    setSelectedBrands((prev) => (prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]));
  }

  return (
    <aside className="bg-white rounded-2xl shadow p-4 border border-gray-100 max-h-[calc(100vh-6rem)] overflow-y-auto sticky top-20">
      <h3 className="text-lg font-semibold mb-4">Filter Results</h3>

      {/* Condition */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-2">Condition</label>
        <select
          value={condition}
          onChange={(e) => setCondition(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="new">New</option>
          <option value="used">Used</option>
          <option value="refurbished">Refurbished</option>
        </select>
      </div>

      {/* Power Source */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-2">Power Source</label>
        <select
          value={powerSource}
          onChange={(e) => setPowerSource(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="">All</option>
          <option value="electric">Electric</option>
          <option value="diesel">Diesel</option>
          <option value="hydraulic">Hydraulic</option>
          <option value="manual">Manual</option>
        </select>
      </div>

      {/* Price range */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-2">Price range (₦)</label>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-1/2 border rounded px-2 py-1 text-sm"
          />
          <input
            type="number"
            placeholder="max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value === "" ? "" : Number(e.target.value))}
            className="w-1/2 border rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      {/* Location */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-2">Location</label>
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="">All Nigeria</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div className="mb-5">
        <label className="block text-sm text-gray-600 mb-2">Manufacturer / Brand</label>
        <div className="space-y-2">
          {brands.length === 0 ? (
            <div className="text-sm text-gray-500">No brands listed</div>
          ) : (
            brands.map((b) => (
              <label key={b} className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(b)}
                  onChange={() => toggleBrand(b)}
                />
                <span>{b}</span>
              </label>
            ))
          )}
        </div>
      </div>

      {/* Sort */}
      <div className="mb-4">
        <label className="block text-sm text-gray-600 mb-2">Sort by</label>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="w-full border rounded px-2 py-1 text-sm"
        >
          <option value="recommended">Recommended</option>
          <option value="price-asc">Price: Low to high</option>
          <option value="price-desc">Price: High to low</option>
          <option value="newest">Newest</option>
        </select>
      </div>
    </aside>
  );
}
