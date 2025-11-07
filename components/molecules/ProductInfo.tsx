"use client";

import { useEffect, useState } from "react";
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
  Bookmark,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import { BusinessProfile, Product, User } from "@/types/models";
import { cn, constructImageUrl, convertToCustomFormat } from "@/lib/utils";
import Link from "next/link";
import ShowContactButton from "../atoms/ShowContactButton";
import { updateSavedItems } from "@/services/userService";
import { useUserStore } from "@/store/useUserStore";

interface ProductInfoProps {
  product: Product;
  name: string;
  price: string;
  currency?: string;
  description?: string;
  category?: string;
  minOrder?: number;
  soldCount?: number;
  inStock?: number;
  dateOfPosting: string;
  metadata?: Record<string, any>;
  vendor?: BusinessProfile;
  product_id: string;
}

export function ProductInfo({
  product,
  name,
  price,
  currency = "₦",
  description,
  category,
  minOrder = 1,
  product_id,
  inStock,
  metadata,
  dateOfPosting,
  vendor,
}: ProductInfoProps) {
  const [quantity, setQuantity] = useState(minOrder);
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const user = useUserStore((state) => state.user);
  const convertedDate = convertToCustomFormat(product.created_at);
  // console.log(convertedDate);

  useEffect(() => {
    if (!user?.saved_items) return;
    // console.log(user?.saved_items);

    const checkSaved = user?.saved_items?.some(
      (savedId) => savedId == product.id
    );
    // console.log(checkSaved);

    setIsSaved(checkSaved ? true : false);

    // Cleanup function
    return () => {
      setIsSaved(false);
    };
  }, [user, product.id]);

  const handleSaveItem = async () => {
    const res = await updateSavedItems(product.id);
    // console.log(res);
  };

  const handleShare = () => {
    toast.success("Product link copied to clipboard!");
  };

  return (
    <div className="space-y-6 mt-2">
      {/* Product Title */}
      <div>
        <span className="text-muted-foreground italic text-sm block mb-1">
          Posted {convertedDate?.dayWithSuffix}-{convertedDate?.monthOfYear}-
          {convertedDate?.year}
        </span>
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-balance mb-2">
            {product.name}
          </h1>

          <span
            onClick={handleSaveItem}
            className="p-2 rounded-full hover:bg-primary cursor-pointer group transition-all duration-300"
          >
            <Bookmark
              className={cn(
                "transition-all duration-300",
                isSaved
                  ? "fill-black group-hover:fill-white group-hover:text-white "
                  : "  group-hover:text-white "
              )}
            />
          </span>
        </div>
        {category && (
          <Badge variant="secondary" className="text-sm">
            {category}
          </Badge>
        )}
      </div>

      {/* Description */}
      {product.description && (
        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">
            {product.description}
          </p>
        </div>
      )}

      {/* Price Section */}
      <div className="space-y-2">
        <div className="flex items-baseline gap-2">
          {product.price_input_mode == "enter" ? (
            <span className="text-4xl font-bold text-foreground">
              {currency}
              {Number(product.price).toLocaleString()}
            </span>
          ) : (
            <span className="text-4xl font-bold text-foreground">
              Contact Seller for Price
            </span>
          )}
          {/* <span className="text-2xl text-muted-foreground">/unit</span> */}
        </div>
      </div>

      <Separator />
      {/* Product Description */}
      {/* {metadata && (
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
      )} */}
      {/* Supplier Info */}
      {vendor && (
        <>
          <div className="space-y-2">
            <h3 className="font-semibold">Vendor Information</h3>
            <div className="flex flex-col  lg:items-center gap-2 lg:flex-row">
              <Image
                src={constructImageUrl(
                  vendor?.cover_image || "/placeholder.svg"
                )}
                alt={vendor.business_name || "Vendor"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="">
                <Link
                  href={`/shop/${vendor.slug}`}
                  className="hover:underline font-semibold text-foreground"
                >
                  {vendor?.business_name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {vendor?.description || "No description available."}
                </p>
              </div>

              {/* <Badge variant="secondary">{vendor.yearsActive} yr</Badge> */}
            </div>
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mt-5">
              <ShowContactButton
                userPhoneNumber={vendor.business_phone ?? "No contact"}
              />
              {/* <Button
                size="lg"
                variant="default"
                className=""
                onClick={handleChatNow}
              >
                <Phone className="w-5 h-5 mr-2" />
                Show contact
              </Button> */}
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
