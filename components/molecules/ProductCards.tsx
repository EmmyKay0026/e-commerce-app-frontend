"use client";

import React from "react";
import Image from "next/image";
import ImageCarousel from "../atoms/ImageCarousel";
import { convertToCustomFormat } from "@/lib/utils";
import { MapPin, Pencil } from "lucide-react";
import Link from "next/link";
import { TransformedProduct } from "@/services/productService";
import { Product } from "@/types/models";

// interface ProductCardsProps {
//   product: roduct;
// }

const ProductCards = ({
  product,
  currency = "₦",
  isOwner = false,
}: {
  product: Product;
  currency?: string;
  isOwner?: boolean;
}) => {
  const convertedDate = convertToCustomFormat(product.created_at);

  // Extract brand from metadata if available
  const brand = product.metadata?.brand;

  // Extract location
  const location =
    product.state_name && product.lga_name
      ? `${product.lga_name}, ${product.state_name}`
      : product.state_name || product.business?.address || "Lagos, Nigeria";

  return (
    <div className="space-y-2 relative" style={{ marginBottom: "2rem" }}>
      {isOwner && (
        <Link
          href={`/products/${product.slug}/edit`}
          className="absolute top-2 right-2 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          title="Edit Product"
        >
          <Pencil size={16} className="text-gray-700" />
        </Link>
      )}
      <Link
        href={`/products/${product.slug}`}
        className="no-underline cursor-pointer"
      >
        <ImageCarousel images={product.images} />


        <span className="block text-gray italic text-[12px]">
          Posted {convertedDate?.dayWithSuffix}{" "}
          {convertedDate?.shortMonthOfYear}, {convertedDate?.year}
        </span>
        <h3 className="text-lg lg:text-xl font-krub font-[500] line-clamp-3">
          {product.name}
        </h3>
        {product.price_input_mode == "enter" ? (
          <p className="font-bold text-base">
            {currency}
            {Number(product.price).toLocaleString()} -{" "}
            <span className="italic capitalize text-[14px] font-normal">
              {product.sale_type ?? "Retail"}
            </span>
          </p>
        ) : (
          <p className="font-bold text-base">
            Contact Seller for Price -{" "}
            <span className="italic capitalize text-[14px] font-normal">
              {product.sale_type ?? "Retail"}
            </span>
          </p>
        )}



        <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
          <MapPin size={12} />
          <span className="truncate capitalize">{location}</span>
        </div>
      </Link>
    </div>
  );
};

export default ProductCards;
