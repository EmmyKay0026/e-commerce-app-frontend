"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { X, SlidersHorizontal, ChevronDown, ChevronUp } from "lucide-react";

interface CategoryOption {
  id: string;        // ← ADD THIS: we need the real ID!
  name: string;
  slug: string;
  count?: number;
}

interface ProductFilterSidebarProps {
  categories?: CategoryOption[];
  states?: string[];
  lgas?: string[];
  itemConditions?: string[];
}

export default function ProductFilterSidebar({
  categories = [],
  states = [],
  lgas = [],
  itemConditions = [],
}: ProductFilterSidebarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [categorySearch, setCategorySearch] = useState("");
  const [stateSearch, setStateSearch] = useState("");
  const [lgaSearch, setLgaSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    price: true,
    category: true,
    state: false,
    lga: false,
    priceType: false,
    saleType: false,
  });

  // Parse current filters from URL
  const getCurrentFilters = () => {
    const filters: Record<string, string[]> = {};
    searchParams.forEach((value, key) => {
      if (!["q", "sort", "page", "perPage"].includes(key)) {
        filters[key] = value.split(",").filter(Boolean);
      }
    });
    return filters;
  };

  const currentFilters = getCurrentFilters();

  // CRITICAL: Get selected category IDs from slugs in URL
  const selectedCategorySlugs = currentFilters.category || [];
  const selectedCategoryIds = selectedCategorySlugs
    .map(slug => categories.find(cat => cat.slug === slug)?.id)
    .filter(Boolean) as string[];

  // Initialize price range
  useEffect(() => {
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    if (minPrice || maxPrice) {
      setPriceRange({ min: minPrice || "", max: maxPrice || "" });
    }
  }, [searchParams]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => ({ ...prev, [sectionId]: !prev[sectionId] }));
  };

  const handleFilterChange = (sectionId: string, value: string, type: "checkbox" | "radio") => {
    const current = currentFilters[sectionId] || [];
    let updated: string[];

    if (type === "checkbox") {
      updated = current.includes(value)
        ? current.filter(v => v !== value)
        : [...current, value];
    } else {
      updated = current[0] === value ? [] : [value];
    }

    applyFilters({ ...currentFilters, [sectionId]: updated });
  };

  const handlePriceRangeApply = () => {
    const updatedFilters = { ...currentFilters };
    if (priceRange.min) updatedFilters.minPrice = [priceRange.min];
    else delete updatedFilters.minPrice;
    if (priceRange.max) updatedFilters.maxPrice = [priceRange.max];
    else delete updatedFilters.maxPrice;
    applyFilters(updatedFilters);
  };

  const applyFilters = (filters: Record<string, string[]>) => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    const sort = searchParams.get("sort");
    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);

    Object.entries(filters).forEach(([key, values]) => {
      if (values.length > 0 && values[0] !== "") {
        params.set(key, values.join(","));
      }
    });

    params.set("page", "1");
    router.push(`?${params.toString()}`, { scroll: false });
    setIsOpen(false);
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    const sort = searchParams.get("sort");
    if (q) params.set("q", q);
    if (sort) params.set("sort", sort);
    params.set("page", "1");
    setPriceRange({ min: "", max: "" });
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const activeFilterCount = Object.values(currentFilters).flat().filter(Boolean).length;

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(categorySearch.toLowerCase())
  );

  const filteredStates = states.filter(s =>
    s.toLowerCase().includes(stateSearch.toLowerCase())
  );

  const filteredLgas = lgas.filter(l =>
    l.toLowerCase().includes(lgaSearch.toLowerCase())
  );

  const FilterSection = ({ id, label, children }: { id: string; label: string; children: React.ReactNode }) => {
    const isExpanded = expandedSections[id];
    return (
      <div className="border-b pb-4">
        <button
          onClick={() => toggleSection(id)}
          className="w-full flex items-center justify-between py-2 hover:bg-gray-50 rounded px-2"
        >
          <h3 className="font-medium text-sm">{label}</h3>
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
        {isExpanded && <div className="mt-3 px-2">{children}</div>}
      </div>
    );
  };

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between pb-4 border-b">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-5 h-5" />
          <h2 className="text-lg font-semibold">Filters</h2>
          {activeFilterCount > 0 && (
            <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-700 rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button onClick={clearFilters} className="text-sm text-blue-600 hover:text-blue-800">
            Clear all
          </button>
        )}
      </div>

      {/* Price Range */}
      <FilterSection id="price" label="Price Range">
        <div className="space-y-3">
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min (₦)"
              value={priceRange.min}
              onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm"
            />
            <input
              type="number"
              placeholder="Max (₦)"
              value={priceRange.max}
              onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })}
              className="w-full px-3 py-2 border rounded text-sm"
            />
          </div>
          <button
            onClick={handlePriceRangeApply}
            className="w-full px-4 py-2 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Apply Price
          </button>
        </div>
      </FilterSection>

      {/* Category Filter – NOW FIXED */}
      {categories.length > 0 && (
        <FilterSection id="category" label="Category">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search categories..."
              value={categorySearch}
              onChange={(e) => setCategorySearch(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm mb-2"
            />
            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredCategories.map((cat) => {
                const isChecked = selectedCategoryIds.includes(cat.id);

                return (
                  <label
                    key={cat.id}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {
                        const newIds = isChecked
                          ? selectedCategoryIds.filter(id => id !== cat.id)
                          : [...selectedCategoryIds, cat.id];

                        const newSlugs = categories
                          .filter(c => newIds.includes(c.id))
                          .map(c => c.slug);

                        const params = new URLSearchParams(searchParams.toString());
                        if (newSlugs.length > 0) {
                          params.set("category", newSlugs.join(","));
                        } else {
                          params.delete("category");
                        }
                        params.set("page", "1");
                        router.push(`?${params.toString()}`, { scroll: false });
                      }}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm">{cat.name}</span>
                    {cat.count !== undefined && (
                      <span className="text-xs text-gray-500 ml-auto">({cat.count})</span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>
        </FilterSection>
      )}

      {/* Location State Filter */}
      <span className="text-gray text-[13px]">Only locations with availabile products are displayed here.</span>
      {states.length > 0 && (
        <FilterSection id="location_state" label="State">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search states..."
              value={stateSearch}
              onChange={(e) => setStateSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredStates.length > 0 ? (
                filteredStates.map((state) => (
                  <label
                    key={state}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={currentFilters.location_state?.includes(state) || false}
                      onChange={() => handleFilterChange("location_state", state, "checkbox")}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 capitalize focus:ring-blue-500"
                    />
                    <span className="text-sm capitalize">{state}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic py-2">No states found</p>
              )}
            </div>
          </div>
        </FilterSection>
      )}

      {/* Location LGA Filter */}
      {lgas.length > 0 && (
        <FilterSection id="location_lga" label="LGA">
          <div className="space-y-2">
            <input
              type="text"
              placeholder="Search LGAs..."
              value={lgaSearch}
              onChange={(e) => setLgaSearch(e.target.value)}
              className="w-full px-3 py-2 border rounded text-sm mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="max-h-64 overflow-y-auto space-y-1">
              {filteredLgas.length > 0 ? (
                filteredLgas.map((lga) => (
                  <label
                    key={lga}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={currentFilters.location_lga?.includes(lga) || false}
                      onChange={() => handleFilterChange("location_lga", lga, "checkbox")}
                      className="w-4 h-4 rounded border-gray-300 text-blue-600 capitalize focus:ring-blue-500"
                    />
                    <span className="text-sm capitalize">{lga}</span>
                  </label>
                ))
              ) : (
                <p className="text-xs text-gray-500 italic py-2">No LGAs found</p>
              )}
            </div>
          </div>
        </FilterSection>
      )}

      {/* Price Type Filter */}
      <FilterSection id="price_type" label="Price Type">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="price_type"
              checked={currentFilters.price_type?.[0] === "fixed"}
              onChange={() => handleFilterChange("price_type", "fixed", "radio")}
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Fixed Price</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="radio"
              name="price_type"
              checked={currentFilters.price_type?.[0] === "negotiable"}
              onChange={() => handleFilterChange("price_type", "negotiable", "radio")}
              className="w-4 h-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Negotiable</span>
          </label>
        </div>
      </FilterSection>

      {/* Sale Type Filter */}
      <FilterSection id="sale_type" label="Sale Type">
        <div className="space-y-2">
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="checkbox"
              checked={currentFilters.sale_type?.includes("retail") || false}
              onChange={() => handleFilterChange("sale_type", "retail", "checkbox")}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Retail</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
            <input
              type="checkbox"
              checked={currentFilters.sale_type?.includes("wholesale") || false}
              onChange={() => handleFilterChange("sale_type", "wholesale", "checkbox")}
              className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm">Wholesale</span>
          </label>
        </div>
      </FilterSection>

      {/* Item Condition Filter */}
      {itemConditions.length > 0 && (
        <FilterSection id="item_condition" label="Item Condition">
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={currentFilters.item_condition?.includes("new") || false}
                onChange={() => handleFilterChange("item_condition", "new", "checkbox")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">New</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={currentFilters.item_condition?.includes("refurbished") || false}
                onChange={() => handleFilterChange("item_condition", "refurbished", "checkbox")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Refurbished</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
              <input
                type="checkbox"
                checked={currentFilters.item_condition?.includes("used") || false}
                onChange={() => handleFilterChange("item_condition", "used", "checkbox")}
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm">Used</span>
            </label>
          </div>
        </FilterSection>
      )}
    </div>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed bottom-6 right-6 z-50 p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        aria-label="Toggle filters"
      >
        <SlidersHorizontal className="w-6 h-6" />
        {activeFilterCount > 0 && (
          <span className="absolute -top-1 -right-1 px-2 py-0.5 text-xs bg-red-500 text-white rounded-full min-w-[20px] text-center">
            {activeFilterCount}
          </span>
        )}
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-80 bg-white border-r overflow-y-auto
          transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          p-6
        `}
      >
        {/* Mobile Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded transition-colors"
          aria-label="Close filters"
        >
          <X className="w-5 h-5" />
        </button>

        <FilterContent />
      </aside>
    </>
  );
}