"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Minus,
  Plus,
  ShoppingCart,
  MessageCircle,
  Share2,
  Phone,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { User } from "@/types/models";
import { convertToCustomFormat } from "@/lib/utils";
import Link from "next/link";

interface ProductInfoProps {
  name: string;
  price: number;
  currency?: string;
  description?: string;
  category?: string;
  minOrder?: number;
  soldCount?: number;
  inStock?: number;
  dateOfPosting: string;
  metadata?: Record<string, any>;
  vendor?: User;
}

export function ProductInfo({
  name,
  price,
  currency = "₦",
  description,
  category,
  minOrder = 1,
  soldCount,
  inStock,
  metadata,
  dateOfPosting,
  vendor,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(minOrder);
  const convertedDate = convertToCustomFormat(dateOfPosting);

  const handleChatNow = () => {
    toast.info("Opening chat with supplier...");
  };

  const handleShare = () => {
    toast.success("Product link copied to clipboard!");
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Product Title */}
      <div>
        <span className="text-muted-foreground italic text-sm block mb-1">
          Posted {convertedDate.dayWithSuffix}-{convertedDate.monthOfYear}-
          {convertedDate.year}
        </span>
        <h1 className="text-3xl font-bold text-balance mb-2">{name}</h1>
        {category && (
          <Badge variant="secondary" className="text-sm">
            {category}
          </Badge>
        )}
      </div>

      {/* Description */}
      {description && (
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{description}</p>
        </div>
      )}

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          <span className="text-4xl font-bold text-foreground">
            {currency}
            {price.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <Separator />
      {/* Product Description */}
      {metadata && (
        <>
          {" "}
          <article className="">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {Object.entries(metadata).map(([key, value]) => (
                <div key={key} className="flex flex-col justify-between">
                  <span className="text-muted-foreground capitalize">
                    {key}
                  </span>
                  <span className="font-medium text-foreground">
                    {typeof value === "object"
                      ? Object.entries(value)
                          .map(([k, v]) => `${k}: ${v}`)
                          .join(", ")
                      : String(value)}
                  </span>
                </div>
              ))}
            </div>
          </article>
          <Separator />
        </>
      )}
      {/* Supplier Info */}
      {vendor && (
        <>
          <div className="space-y-2">
            <h3 className="font-semibold">Vendor Information</h3>
            <div className="flex flex-col  lg:items-center gap-2 lg:flex-row">
              <Image
                src={vendor.vendorProfile?.coverImage || "/placeholder.svg"}
                alt={vendor.fullName || "Vendor"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="">
                <Link
                  href={`/shop/${vendor.vendorProfile?.vendorId}`}
                  className="hover:underline font-semibold text-foreground"
                >
                  {vendor.vendorProfile?.businessName}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {vendor.vendorProfile?.description ||
                    "No description available."}
                </p>
              </div>

              {/* <Badge variant="secondary">{vendor.yearsActive} yr</Badge> */}
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <Button
                size="lg"
                variant="default"
                className=""
                onClick={handleChatNow}
              >
                <Phone className="w-5 h-5 mr-2" />
                Show contact
              </Button>
              <Button size="lg" variant="outline" onClick={handleShare}>
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
