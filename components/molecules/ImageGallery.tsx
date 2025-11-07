"use client";

import { useState } from "react";
import Image from "next/image";
import { Bookmark, Heart, ZoomIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { toast } from "sonner";
import { constructImageUrl } from "@/lib/utils";

interface ImageGalleryProps {
  images: string[];
  productName: string;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

export function ImageGallery({
  images,
  productName,
  onToggleFavorite,
  isFavorite = false,
}: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [index, setIndex] = useState<number | null>(null);
  return (
    <div className="space-y-4 flex  flex-col lg:flex-row-reverse gap-4">
      {/* Main Image */}

      <div
        onClick={() => setIndex(selectedImage)}
        className="relative w-full h-full aspect-square bg-muted rounded-lg overflow-hidden group"
      >
        <Image
          src={constructImageUrl(images[selectedImage] || "/placeholder.svg")}
          alt={`${productName} - Image ${selectedImage + 1}`}
          fill
          className="object-cover cursor-pointer"
          priority
        />

        {/* Overlay Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
            onClick={onToggleFavorite}
          >
            <Bookmark
              onClick={() =>
                toast.success(
                  isFavorite ? "Removed from wishlist" : "Added to wishlist"
                )
              }
              className={`w-5 h-5 ${
                isFavorite ? "fill-secondary text-secondary" : ""
              }`}
            />
          </Button>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full bg-background/80 backdrop-blur-sm hover:bg-background"
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <div className="relative aspect-square w-full">
                <Image
                  src={constructImageUrl(
                    images[selectedImage] || "/placeholder.svg"
                  )}
                  alt={`${productName} - Zoomed`}
                  fill
                  className="object-contain"
                />
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Lightbox
        open={index !== null}
        close={() => setIndex(null)}
        slides={images.map((src) => ({ src: constructImageUrl(src) }))}
        index={index ?? 0}
      />
      {/* Thumbnail Grid */}
      <article className="overflow-x-clip">
        <div className="flex flex-wrap flex-row lg:flex-col gap-2 w-full lg:flex-nowrap lg:w-[25%] h-full lg:max-h-[500px] ">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`relative block w-25 h-25 min-w-25 min-h-25 aspect-square bg-muted cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                selectedImage === index
                  ? "border-primary ring-2 ring-primary/20"
                  : "border-transparent hover:border-muted-foreground/20"
              }`}
            >
              <Image
                src={constructImageUrl(image || "/placeholder.svg")}
                alt={`Thumbnail ${index + 1}`}
                fill
                className="object-cover w-full h-full"
              />
              {/* <div className="absolute top-2 left-2 bg-primary/80 text-primary-foreground text-xs font-semibold px-2 py-1 rounded">
              #{index + 1}
            </div> */}
            </button>
          ))}
        </div>
      </article>
    </div>
  );
}
