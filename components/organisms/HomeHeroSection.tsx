"use client";

import React, { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { List } from "lucide-react";
import CategoriesModal from "../molecules/CategoriesModal";
import { listProducts } from "@/services/productService";
import type { Product } from "@/types/models";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { constructImageUrl } from "@/lib/utils";
import { useCategoryStore } from "@/store/useCategoryStore";

const HomeHeroSection = () => {
  const [showCategories, setShowCategories] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // ✅ Zustand store usage
  const { categories, loading, fetchCategories } = useCategoryStore();

  // Fetch categories on mount (only once)
  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, []);

  // Close search results when clicking outside
  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (searchRef.current && searchRef.current.contains(target)) ||
        (dropdownRef.current && dropdownRef.current.contains(target))
      )
        return;

      setSearchResults(null);
    };

    if (searchResults && searchResults.length > 0) {
      document.addEventListener("mousedown", onDocClick);
    }

    return () => document.removeEventListener("mousedown", onDocClick);
  }, [searchResults]);

  const handleDebouncedSearch = (q: string) => {
    if (debounceRef.current) window.clearTimeout(debounceRef.current);

    if (!q.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    debounceRef.current = window.setTimeout(async () => {
      if (abortControllerRef.current) {
        try {
          abortControllerRef.current.abort();
        } catch {}
        abortControllerRef.current = null;
      }

      const controller = new AbortController();
      abortControllerRef.current = controller;
      setIsSearching(true);

      try {
        const res = await listProducts({
          q,
          perPage: 6,
          signal: controller.signal,
        });

        if (res.success && res.data) {
          setSearchResults(res.data.products || []);
        } else {
          setSearchResults([]);
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && err.name !== "CanceledError") {
          console.error("Search failed:", err);
        }
        setSearchResults([]);
      } finally {
        setIsSearching(false);
        if (abortControllerRef.current === controller)
          abortControllerRef.current = null;
      }
    }, 350);
  };

  return (
    <section
      className="relative w-full h-auto py-20 lg:py-0 lg:h-[100dvh] flex items-center px-5 md:px-10 lg:px-20 text-center bg-fixed bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url('/industrial-mart-img (1).webp')`,
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 lg:text-left w-full lg:max-w-4xl text-white">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
          Your No.1 Marketplace For Quality Industrial Equipments
        </h2>
        <p className="mt-3 text-lg text-gray-100">
          A platform for easy buying and selling of industrial equipment across
          the oil & gas industrial sectors
        </p>

        {/* Search bar */}
        <div id="hero-search" className="mt-6 relative max-w-3xl ">
          <div
            ref={searchRef}
            className="flex items-center gap-2 bg-white text-lg rounded-3xl overflow-hidden"
          >
            <Input
              value={searchQuery}
              onChange={(e) => {
                const q = e.target.value;
                setSearchQuery(q);
                handleDebouncedSearch(q);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  router.push(`/products?q=${encodeURIComponent(searchQuery)}`);
                  setSearchResults(null);
                }
              }}
              placeholder="Search products..."
              className="flex-1 border-none rounded-2xl focus:ring-0 focus:outline-none shadow-none focus:border-none text-black px-6"
            />
            <Button
              onClick={() =>
                router.push(`/products?q=${encodeURIComponent(searchQuery)}`)
              }
              className="bg-primary rounded-3xl hover:bg-[#0852a2] m-1 text-white px-6 py-5"
            >
              Search
            </Button>
          </div>

          {/* Dropdown */}
          {searchResults !== null && (
            <div
              ref={dropdownRef}
              className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-40 max-h-72 overflow-auto"
            >
              {isSearching ? (
                <div className="p-3 text-sm text-muted-foreground">
                  Searching...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-3 text-sm text-muted-foreground">
                  No results
                </div>
              ) : (
                <>
                  <ul className="divide-y">
                    {searchResults.slice(0, 6).map((p) => (
                      <li key={p.id} className="px-3 py-2 hover:bg-gray-50">
                        <Link
                          href={`/products/${p.slug}`}
                          className="flex items-center gap-3"
                        >
                          <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                            {p.images && p.images[0] ? (
                              <Image
                                src={constructImageUrl(p.images[0])}
                                alt={p.name}
                                width={40}
                                height={40}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-xs text-muted-foreground">
                                No image
                              </div>
                            )}
                          </div>
                          <div className="flex-1 text-sm text-black">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-muted-foreground">
                              {p.price}
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>

                  <div className="p-2 border-t text-center">
                    <Link
                      href={`/products?q=${encodeURIComponent(searchQuery)}`}
                      className="text-sm font-medium text-primary"
                    >
                      See all results
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Categories buttons */}
        <div className="mt-5 text-left flex items-center flex-wrap gap-6">
          <Button
            onClick={() => setShowCategories(true)}
            className="cursor-pointer gap-1 hover:bg-white bg-transparent rounded-full hover:text-black text-white"
          >
            <List />
            All categories
          </Button>

          {loading ? (
            <span className="text-sm text-white/80">Loading...</span>
          ) : categories.length > 0 ? (
            categories.slice(0, 3).map((cat, i) => (
              <Link
                key={i}
                href={`/category/${cat.slug}`}
                className="flex items-center justify-center cursor-pointer gap-1 hover:text-white bg-transparent rounded-full text-white/90"
              >
                {cat.icon || cat.image ? (
                  <Image
                    src={constructImageUrl(cat.icon ?? cat.image ?? "")}
                    alt={cat.name}
                    width={20}
                    height={20}
                    className="object-cover invert"
                  />
                ) : null}
                {cat.name}
              </Link>
            ))
          ) : (
            <span className="text-sm text-white/80">
              No categories available
            </span>
          )}
        </div>
      </div>

      <CategoriesModal
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
      />
    </section>
  );
};

export default HomeHeroSection;
