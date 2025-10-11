"use client";

import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { Zoom } from "yet-another-react-lightbox/plugins";
import HoverZoomImage from "@/components/atoms/HoverZoomImage";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div>
      <div className="flex flex-wrap gap-4">
        {images.map((src, i) => (
          <div
            key={i}
            onClick={() => setOpenIndex(i)}
            className="cursor-zoom-in"
          >
            {/* Inline hover-zoom preview */}
            <HoverZoomImage
              src={src}
              zoomScale={2.2}
              lensSize={160}
              alt={`Product ${i}`}
            />
          </div>
        ))}
      </div>

      {/* Fullscreen lightbox */}
      <Lightbox
        open={openIndex !== null}
        close={() => setOpenIndex(null)}
        slides={images.map((src) => ({ src }))}
        index={openIndex ?? 0}
        plugins={[Zoom]}
        zoom={{
          maxZoomPixelRatio: 3,
          zoomInMultiplier: 2,
        }}
      />
    </div>
  );
}
