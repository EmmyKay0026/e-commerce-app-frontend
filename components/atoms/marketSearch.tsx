"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { listProducts } from "@/services/productService";
import Link from "next/link";
import Image from "next/image";
import { constructImageUrl } from "@/lib/utils";
import type { Product } from "@/types/models";

interface Props {
  initialQuery?: string;
}

export default function MarketplaceSearchBar({ initialQuery = "" }: Props) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [searchResults, setSearchResults] = useState<Product[] | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const debounceRef = useRef<number | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        (searchRef.current && searchRef.current.contains(target)) ||
        (dropdownRef.current && dropdownRef.current.contains(target))
      ) {
        return;
      }
      setSearchResults(null);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const handleDebouncedSearch = (q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (!q.trim()) {
      setSearchResults(null);
      setIsSearching(false);
      return;
    }

    debounceRef.current = window.setTimeout(async () => {
      if (abortControllerRef.current) abortControllerRef.current.abort();
      const controller = new AbortController();
      abortControllerRef.current = controller;

      setIsSearching(true);
      try {
        const res = await listProducts({
          q,
          perPage: 6,
          signal: controller.signal,
        });
        if (res.success && res.data) setSearchResults(res.data.products || []);
        else setSearchResults([]);
      } catch (err: any) {
        if (err.name !== "AbortError") setSearchResults([]);
      } finally {
        setIsSearching(false);
        if (abortControllerRef.current === controller)
          abortControllerRef.current = null;
      }
    }, 350);
  };

  return (
    <div className="relative mt-8 mb-12 max-w-2xl mx-auto" ref={searchRef}>
      <div className="flex items-center gap-2 bg-white border border-blue-600 rounded-3xl overflow-hidden">
        <Input
          value={searchQuery}
          onChange={(e) => {
            const q = e.target.value;
            setSearchQuery(q);
            handleDebouncedSearch(q);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`);
              setSearchResults(null);
            }
          }}
          placeholder="Search products..."
          className="flex-1 border-none px-6 py-3 rounded-2xl focus:ring-0 focus:outline-none"
        />
        <Button
          onClick={() =>
            router.push(`/marketplace?q=${encodeURIComponent(searchQuery)}`)
          }
          className="bg-primary text-white rounded-3xl px-6 py-3 hover:bg-[#0852a2]"
        >
          Search
        </Button>
      </div>

      {/* Dropdown */}
      {searchResults !== null && (
        <div
          ref={dropdownRef}
          className="absolute left-0 right-0 mt-2 bg-white rounded-lg shadow-lg z-40 max-h-72 overflow-auto"
        >
          {isSearching ? (
            <div className="p-3 text-sm text-gray-500">Searching...</div>
          ) : searchResults.length === 0 ? (
            <div className="p-3 text-sm text-gray-500">No results</div>
          ) : (
            <ul className="divide-y">
              {searchResults.map((p) => (
                <li key={p.id} className="px-3 py-2 hover:bg-gray-50">
                  <Link href={`/products/${p.slug}`} className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                      {p.images?.[0] ? (
                        <Image
                          src={constructImageUrl(p.images[0])}
                          alt={p.name}
                          width={40}
                          height={40}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full w-full text-xs text-gray-400">
                          No image
                        </div>
                      )}
                    </div>
                    <div className="flex-1 text-sm">
                      <div className="font-medium">{p.name}</div>
                      <div className="text-xs text-gray-500">{p.price}</div>
                    </div>
                  </Link>
                </li>
              ))}
              <li className="text-center p-2 border-t">
                <Link
                  href={`/marketplace?q=${encodeURIComponent(searchQuery)}`}
                  className="text-sm font-medium text-primary"
                >
                  See all results
                </Link>
              </li>
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
