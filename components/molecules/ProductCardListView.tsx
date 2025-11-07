"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bookmark, Heart, MessageCircle, Save, Scale } from "lucide-react";
import { constructImageUrl } from "@/lib/utils";

export interface ProductCardListProps {
  id: string;
  name: string;
  description: string;
  price: string;
  currency?: string;
  image: string;
  minOrder?: number;
  soldCount?: number;
  estimatedDelivery?: string;
  supplier?: {
    name: string;
    country: string;
    yearsActive: number;
  };
  onAddToCart?: () => void;
  onChatNow?: () => void;
  onAddToCompare?: () => void;
  onToggleFavorite?: () => void;
  isFavorite?: boolean;
}

export function ProductCardList({
  id,
  name,
  description,
  price,
  currency = "₦",
  image,
  minOrder,
  soldCount,
  estimatedDelivery,
  supplier,
  onAddToCart,
  onChatNow,
  onAddToCompare,
  onToggleFavorite,
  isFavorite = false,
}: ProductCardListProps) {
  return (
    <Card className="overflow-hidden py-0 hover:shadow-lg transition-shadow">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row gap-4 p-4">
          {/* Product Image */}
          <div className="relative w-full md:w-48 h-48 flex-shrink-0 bg-muted rounded-lg overflow-hidden group">
            <Image
              src={constructImageUrl(image || "/placeholder.svg")}
              alt={image || "description of the image"}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={onToggleFavorite}
              className="absolute top-2 left-2 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors"
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <Bookmark
                className={`w-4 h-4 cursor-pointer ${
                  isFavorite
                    ? "fill-secondary text-secondary"
                    : "text-muted-foreground"
                }`}
              />
            </button>
          </div>

          {/* Product Details */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Title and Delivery */}
            <div>
              <h3 className="font-semibold text-base leading-snug line-clamp-2 mb-2">
                {name}
              </h3>

              <p className="line-clamp-3">
                {description ?? "No description available for this product."}
              </p>
            </div>

            {/* Price and Order Info */}
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{price}</p>
              {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                {minOrder && <span>Min. order: {minOrder} pieces</span>}
                {soldCount !== undefined && (
                  <>
                    <span className="text-muted-foreground/50">•</span>
                    <span className="text-foreground font-medium">
                      {soldCount} sold
                    </span>
                  </>
                )}
              </div> */}
            </div>

            {/* Supplier Info */}
            {/* {supplier && (
              <div className="text-sm">
                <p className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer line-clamp-1">
                  {supplier.name}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="secondary" className="text-xs">
                    {supplier.yearsActive} yr
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    {supplier.country}
                  </span>
                </div>
              </div>
            )} */}
            {/* <div className="flex md:flex-col gap-2 md:w-40 flex-shrink-0">
              <Button
                onClick={onAddToCart}
                className="flex-1 md:flex-none"
                size="lg"
              >
                View Details
              </Button>
            </div> */}
          </div>

          {/* Action Buttons */}
          {/* <div className="flex md:flex-col gap-2 md:w-40 flex-shrink-0">
            <Button
              onClick={onAddToCart}
              className="flex-1 md:flex-none"
              size="lg"
            >
              View Details
            </Button>
          </div> */}
        </div>
      </CardContent>
    </Card>
  );
}
