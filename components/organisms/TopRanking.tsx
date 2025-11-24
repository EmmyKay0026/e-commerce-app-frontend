"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import useEmblaCarousel, { UseEmblaCarouselType } from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { getTopRankingProducts } from "@/services/productService";
import { Product } from "@/types/models";
import { constructImageUrl } from "@/lib/utils";
import { Button } from "../ui/button";

const TopRanking = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // main embla for big images
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
  });
  type EmblaApi = UseEmblaCarouselType;

  // thumbnail embla
  const [thumbRef, thumbApi] = useEmblaCarousel({
    containScroll: "keepSnaps",
    axis: "x",
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  // Fetch products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const result = await getTopRankingProducts(3);

      if (result.success && result.data) {
        setProducts(result.data);
        setError(null);
      } else {
        // Extract string message from error (can be string or object)
        const errorMessage = typeof result.error === 'string'
          ? result.error
          : result.error?.message || result.error?.detail || "Failed to load products";
        setError(errorMessage);
      }

      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // sync selected index and thumbnail scroll
  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const idx = emblaApi.selectedScrollSnap();
    setSelectedIndex(idx);
    if (thumbApi) thumbApi.scrollTo(idx);
    // announce to screen readers
    if (liveRegionRef.current) {
      liveRegionRef.current.textContent = `Slide ${idx + 1} of ${products.length
        }`;
    }
  }, [emblaApi, thumbApi, products.length]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);
    onSelect();
    // cleanup when unmounting
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi, onSelect]);

  // keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") emblaApi?.scrollPrev();
      if (e.key === "ArrowRight") emblaApi?.scrollNext();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      emblaApi?.scrollTo(index);
    },
    [emblaApi]
  );

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error || products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-center h-64 text-muted-foreground">
          {error || "No products available"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4">
      {/* live region for screen readers */}
      <div aria-live="polite" className="sr-only" ref={liveRegionRef} />

      {/* large carousel + arrows */}
      <div className="relative">
        <div
          className="overflow-hidden rounded-lg"
          aria-roledescription="carousel"
          aria-label="Top ranking products"
        >
          <div className="embla" ref={emblaRef as any}>
            <div className="embla__container flex gap-4 select-none">
              {products.map((product, index) => (
                <div
                  key={product.id}
                  className="embla__slide min-w-full"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${products.length}`}
                >
                  <Link
                    href={`/products/${product.slug}`}
                    className="block"
                    aria-label={`Open ${product.name}`}
                  >
                    <div className="relative h-56 sm:h-64 md:h-72 lg:h-64 rounded-lg overflow-hidden">
                      <Image
                        src={constructImageUrl(product.images[0]) || "/placeholder.png"}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                        // eager the first slide for better LCP, lazy otherwise
                        loading={index === 0 ? "eager" : "lazy"}
                      />
                    </div>
                    <div className="flex items-start justify-between mt-3 px-1">
                      <div className="">
                        <h4 className="font-semibold line-clamp-1">{product.name}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">
                          {product.business?.business_name || "Unknown Vendor"}
                        </p>
                      </div>
                      <Link href={`/products/${product.slug}`} className="">
                        <Button variant="default">View Product</Button>
                      </Link>
                      {/* <span className="font-bold whitespace-nowrap">{product.price_input_mode === "enter" ? ("₦" + Number(product.price).toLocaleString()) : "Contact Vendor"}</span> */}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Arrow buttons */}
        <button
          aria-label="Previous slide"
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          aria-label="Next slide"
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow hover:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* thumbnails carousel */}
      <div className="mt-4">
        <div
          className="embla-thumb overflow-hidden"
          ref={thumbRef as any}
          aria-hidden="false"
          role="list"
          aria-label="Slide thumbnails"
        >
          <div className="embla__container flex gap-3 items-center">
            {products.map((product, idx) => (
              <button
                key={product.id}
                onClick={() => scrollTo(idx)}
                className={`flex-shrink-0 rounded-md overflow-hidden border transition-shadow focus:outline-none focus:ring-2 ${selectedIndex === idx
                  ? "ring-2 ring-blue-500 shadow-md"
                  : "border-transparent"
                  }`}
                style={{ width: 72, height: 72 }}
                aria-label={`Show slide ${idx + 1}`}
              >
                <Image
                  src={constructImageUrl(product.images[0]) || "/placeholder.png"}
                  alt={`thumbnail ${idx + 1}`}
                  width={72}
                  height={72}
                  className="object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        </div>

        {/* dots fallback */}
        <div
          className="flex items-center justify-center gap-2 mt-3"
          role="tablist"
          aria-label="Slide dots"
        >
          {products.map((_, i) => (
            <button
              key={i}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`w-2 h-2 rounded-full ${selectedIndex === i ? "bg-gray-800" : "bg-gray-300"
                }`}
              aria-label={`Navigate to slide ${i + 1}`}
              aria-pressed={selectedIndex === i}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default TopRanking;
