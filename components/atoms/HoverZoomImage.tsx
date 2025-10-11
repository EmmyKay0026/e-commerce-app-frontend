// components/HoverZoomImage.tsx
"use client";

import Image from "next/image";
import React, { useRef, useState } from "react";

interface HoverZoomImageProps {
  src: string;
  alt?: string;
  zoomScale?: number;
  lensSize?: number;
}

const HoverZoomImage: React.FC<HoverZoomImageProps> = ({
  src,
  alt = "Zoomed image",
  zoomScale = 2,
  lensSize = 150,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [lensPosition, setLensPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setLensPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      className="relative w-80 h-80 overflow-hidden rounded-xl border border-gray-200"
    >
      <Image src={src} alt={alt} fill className="object-cover" sizes="320px" />

      {isHovering && (
        <div
          className="absolute pointer-events-none rounded-full border-2 border-white shadow-lg"
          style={{
            width: `${lensSize}px`,
            height: `${lensSize}px`,
            top: `${lensPosition.y - lensSize / 2}px`,
            left: `${lensPosition.x - lensSize / 2}px`,
            backgroundImage: `url(${src})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: `${zoomScale * 100}% ${zoomScale * 100}%`,
            backgroundPosition: `${-lensPosition.x * (zoomScale - 1)}px ${
              -lensPosition.y * (zoomScale - 1)
            }px`,
            transition: "background-position 0.05s ease-out",
          }}
        />
      )}
    </div>
  );
};

export default HoverZoomImage;
