"use client";
import { constructImageUrl } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

interface LightboxGalleryProps {
  images: string[];
}

const LightboxGallery: React.FC<LightboxGalleryProps> = ({ images }) => {
  const [index, setIndex] = useState<number | null>(null);

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {images.map((img, i) => (
          <Image
            key={i}
            src={constructImageUrl(img)}
            alt={`Product ${i}`}
            width={96}
            height={96}
            className="w-24 h-24 object-cover rounded-lg cursor-pointer hover:opacity-80"
            onClick={() => setIndex(i)}
          />
        ))}
      </div>

      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        slides={images.map((src) => ({ src }))}
        index={index ?? 0}
      />
    </>
  );
};

export default LightboxGallery;
