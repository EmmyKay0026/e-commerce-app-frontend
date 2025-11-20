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

const ProductCards = ({
  product,
  currency = "₦",
}: {
  product: Product;
  currency?: string;
}) => {
  const convertedDate = convertToCustomFormat(product.created_at);

  // Extract brand from metadata if available
  const brand = product.metadata?.brand;

  // Extract location from vendor address if available
  const location = product.business?.address || "Lagos, Nigeria";

  return (
    <div className="space-y-2" style={{ marginBottom: "2rem" }}>
      <ImageCarousel allowLightbox images={product.images} />

      <Link
        href={`/products/${product.slug}`}
        className="no-underline cursor-pointer"
      >
        <span className="block text-gray italic text-[12px]">
          Posted {convertedDate?.dayWithSuffix}{" "}
          {convertedDate?.shortMonthOfYear}, {convertedDate?.year}
        </span>

        {product.price_input_mode == "enter" ? (
          <p className="font-bold text-lg lg:text-xl">
            {currency}
            {Number(product.price).toLocaleString()} -{" "}
            <span className="italic capitalize text-[14px] font-normal">
              {product.sale_type ?? "Retail"}
            </span>
          </p>
        ) : (
          <p className="font-bold text-lg lg:text-xl">
            Contact Seller for Price -{" "}
            <span className="italic capitalize text-[14px] font-normal">
              {product.sale_type ?? "Retail"}
            </span>
          </p>
        )}

        <h3 className="text-[14px] lg:text-base font-krub font-[500] line-clamp-3">
          {product.name}
        </h3>
      </Link>
    </div>
  );
};

export default ProductCards;
