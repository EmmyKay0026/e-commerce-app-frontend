"use client";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface ImageCarouselProps {
  images: string[];
  className?: string;
  showThumbnails?: boolean;
  autoplayInterval?: number | null; // ms, null = no autoplay
  allowKeyboardNavigation?: boolean; // enable keyboard navigation
  allowLightbox?: boolean; // enable lightbox on click
  allowIndicators?: boolean; // show indicators
}

function ImageCarousel({
  images = [],
  className = "",
  showThumbnails = false,
  autoplayInterval = null,
  allowKeyboardNavigation = true,
  allowLightbox,
  allowIndicators,
}: ImageCarouselProps) {
  const imgs = images.length ? images : ["/placeholder.svg"];
  const [index, setIndex] = useState(0);
  const [lightBoxIindex, setLightBoxIindexIndex] = useState<number | null>(
    null
  );
  const autoplayRef = useRef<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const prev = () => setIndex((i) => (i - 1 + imgs.length) % imgs.length);
  const next = () => setIndex((i) => (i + 1) % imgs.length);
  const goTo = (i: number) =>
    setIndex(Math.max(0, Math.min(i, imgs.length - 1)));

  useEffect(() => {
    if (!autoplayInterval) return;
    autoplayRef.current = window.setInterval(
      () => setIndex((i) => (i + 1) % imgs.length),
      autoplayInterval
    );
    return () => {
      if (autoplayRef.current) window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    };
  }, [autoplayInterval, imgs.length]);

  // pause autoplay on hover
  const handleMouseEnter = () => {
    if (autoplayRef.current) {
      window.clearInterval(autoplayRef.current);
      autoplayRef.current = null;
    }
  };
  const handleMouseLeave = () => {
    if (autoplayInterval && !autoplayRef.current) {
      autoplayRef.current = window.setInterval(
        () => setIndex((i) => (i + 1) % imgs.length),
        autoplayInterval
      );
    }
  };

  // touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    const start = touchStartX.current;
    if (start == null) return;
    const end = e.changedTouches[0].clientX;
    const diff = start - end;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  // keyboard
  useEffect(() => {
    if (allowKeyboardNavigation) {
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "ArrowLeft") prev();
        if (e.key === "ArrowRight") next();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imgs.length]);

  return (
    <div
      className={`relative select-none overflow-hidden  ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
    >
      {/* Image area */}
      <div className="flex w-full max-w-[200px] overflow-clip">
        {images.map((src, i) => (
          <div
            key={i}
            className="relative aspect-square min-w-full w-full rounded overflow-hidden bg-muted "
            style={{
              transform: `translateX(-${index * 100}%)`,
              transition: "transform 0.3s ease",
            }}
            onClick={
              allowLightbox ? () => setLightBoxIindexIndex(i) : undefined
            }
          >
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              fill
              className="object-cover w-full h-full transition-transform duration-300"
              priority={i === 0}
            />
          </div>
        ))}
      </div>

      <div className="absolute top-1 bg-amber-50/70 left-2 w-6 h-6 rounded-full flex items-center justify-center   inset-0  px-2">
        <p className=" text-[12px] text-muted-foreground font-medium">
          {index + 1}/{images.length}
        </p>
      </div>

      {/* Prev / Next */}
      {imgs.length > 1 && (
        <div className="absolute pointer-events-none top-1/2 w-[200px]  -translate-y-1/2 inset-0 flex items-center justify-between px-2">
          <button
            aria-label="Previous image"
            onClick={prev}
            className="  bg-white/10  pointer-events-auto flex items-center justify-center backdrop-blur-sma rounded-full hover:scale-105 transition cursor-pointer p-2 font-bold text-black/10 hover:bg-white/60 hover:text-black"
          >
            ‹
          </button>
          <button
            aria-label="Next image"
            onClick={next}
            className=" bg-white/10  pointer-events-auto flex items-center justify-center backdrop-blur-sma rounded-full hover:scale-105 transition-transform cursor-pointer p-2 font-bold text-black/10 hover:bg-white/60 hover:text-black"
          >
            ›
          </button>
        </div>
      )}

      {/* Indicators */}
      {imgs.length > 1 && allowIndicators && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
          {imgs.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-3 w-3 rounded-full transition-all ${
                i === index ? "bg-primary" : "bg-white/60"
              }`}
            />
          ))}
        </div>
      )}
      {/* Thumbnails */}
      {showThumbnails && imgs.length > 1 && (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {imgs.map((src, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`relative h-16 w-24 flex-shrink-0 rounded overflow-hidden border ${
                i === index ? "ring-2 ring-primary" : "border-transparent"
              }`}
              aria-label={`Show image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`thumb-${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
      {/* Lightbox could go here if needed */}
      {allowLightbox && (
        <Lightbox
          open={lightBoxIindex !== null}
          close={() => setLightBoxIindexIndex(null)}
          slides={images.map((src) => ({ src }))}
          index={lightBoxIindex ?? 0}
        />
      )}
    </div>
  );
}

export default ImageCarousel;
