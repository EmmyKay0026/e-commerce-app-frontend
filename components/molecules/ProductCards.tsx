"use client";

import React from "react";
import Image from "next/image";
import ImageCarousel from "../atoms/ImageCarousel";
import { convertToCustomFormat } from "@/lib/utils";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { TransformedProduct } from "@/services/productService";
import { Product } from "@/types/models";

// interface ProductCardsProps {
//   product: roduct;
// }

const ProductCards = ({ product }: { product: Product }) => {
  const convertedDate = convertToCustomFormat(product.created_at);

  // Extract brand from metadata if available
  const brand = product.metadata?.brand;

  // Extract location from vendor address if available
  const location = product.business?.address || "Lagos, Nigeria";

  return (
    <div className="space-y-2" style={{ marginBottom: "2rem" }}>
      <ImageCarousel allowLightbox images={product.images} />

      <Link
        href={`/products/${product.id}`}
        className="no-underline cursor-pointer"
      >
        <span className="block text-secondary italic text-[12px]">
          Posted {convertedDate?.dayWithSuffix} {convertedDate?.monthOfYear},{" "}
          {convertedDate?.year}
        </span>

        <p className="font-bold text-xl">{product.price}</p>

        <h3 className="text-base font-krub font-[500]">{product.name}</h3>

        {/* {product.brand && (
          <p className="text-sm text-gray-600 font-medium">
            Brand: {product.brand}
          </p> 
        )}*/}
        {/* {brand && (
          <p className="text-sm text-gray-600 font-medium">Brand: {brand}</p>
        )} */}

        {/* <div className="flex gap-1 items-center">
          <MapPin className="w-3 h-3 text-muted-foreground" />
          <span className="text-[13px] text-muted-foreground">
            {product.location ?? "Lagos, Nigeria"}
          </span>
        </div> */}
        {/* <span className="text-[13px] text-muted-foreground">{location}</span> */}
        {/* </div> */}
      </Link>
    </div>
  );
};

export default ProductCards;
