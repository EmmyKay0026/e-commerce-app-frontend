"use client";
import * as React from "react";
import Image from "next/image";
import { Heart, Camera, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

interface ProductCardGridProps {
  id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  currency?: string;
  estimatedDelivery: string;
  minOrder: number;
  soldCount: number;
  supplier: {
    name: string;
    yearsActive: number;
    country: string;
    countryCode: string;
  };
  onAddToCart?: (id: string) => void;
  onChatNow?: (id: string) => void;
  onToggleFavorite?: (id: string, isFavorite: boolean) => void;
}

export function ProductCardGrid({
  id,
  image,
  name,
  description,
  price,
  currency = "₦",
  estimatedDelivery,
  minOrder,
  soldCount,
  supplier,
  onAddToCart,
  onChatNow,
  onToggleFavorite,
}: ProductCardGridProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleToggleFavorite = () => {
    const newFavoriteState = !isFavorite;
    setIsFavorite(newFavoriteState);
    onToggleFavorite?.(id, newFavoriteState);
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg pt-0 pb-5 transition-shadow duration-300 max-w-lg">
      {/* Product Image */}
      <div className="relative aspect-square bg-muted group">
        <Image
          src={image || "/placeholder.svg"}
          alt={image || "description of the image"}
          fill
          className="object-cover"
        />

        {/* Gallery Icon */}
        <button
          className="absolute bottom-3 left-3 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          aria-label="View gallery"
        >
          <Camera className="w-5 h-5 text-gray-700" />
        </button>

        {/* Favorite Button */}
        <button
          onClick={handleToggleFavorite}
          className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-md hover:bg-white transition-all"
          aria-label={
            isFavorite ? "Remove from saved items" : "Add to saved items"
          }
        >
          <Bookmark
            className={`w-5 h-5 transition-colors ${
              isFavorite ? "fill-secondary text-secondary" : "text-gray-600"
            }`}
          />
        </button>
      </div>

      {/* Product Details */}
      <div className="p-4 pt-0 space-y-3 ">
        {/* name */}
        <h3 className="font-medium text-lg leading-snug line-clamp-2 text-foreground">
          {name}
        </h3>
        <p className="line-clamp-4 text-sm">{description}</p>

        {/* Delivery Info */}
        {/* <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <svg
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Est. delivery by {estimatedDelivery}</span>
        </div> */}

        {/* Price */}
        <div className="text-2xl font-bold text-foreground">
          {currency}
          {price.toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}
        </div>

        {/* Order Info */}
        {/* <div className="text-xs text-muted-foreground">
          Min. order:{" "}
          <span className="font-medium text-foreground">{minOrder} pieces</span>{" "}
          <span className="text-muted-foreground">{soldCount} sold</span>
        </div> */}

        {/* Supplier Info */}
        {/* <div className="space-y-2">
          <p className="text-xs text-muted-foreground truncate">
            {supplier.name}
          </p>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs font-normal">
              <Heart className="w-3 h-3 mr-1" />
              {supplier.yearsActive} yr
            </Badge>
            <Badge variant="secondary" className="text-xs font-normal">
              <span className="mr-1">
                {supplier.countryCode === "CN" ? "🇨🇳" : "🌍"}
              </span>
              {supplier.country}
            </Badge>
          </div>
        </div> */}

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <Button
            variant="default"
            className="flex-1 font-medium "
            onClick={() => onAddToCart?.(id)}
          >
            View product
          </Button>
          {/* <Button
            variant="outline"
            className="flex-1 font-medium bg-transparent"
            onClick={() => onChatNow?.(id)}
          >
            Chat now
          </Button> */}
        </div>
      </div>
    </Card>
  );
}
// components/ui/card.tsx
