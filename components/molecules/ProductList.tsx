import React from "react";
import ImageCarousel from "../atoms/ImageCarousel";
import { demoProducts } from "@/constants/product";
import { Product } from "@/types/models";
import { Bookmark, BookMarked, MapPin } from "lucide-react";
import { convertToCustomFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";

const ProductList = ({ product }: { product: Product }) => {
  const convertedDate = convertToCustomFormat(product.createdAt);

  return (
    <article className="relative flex flex-col justify-between bg-white shadow rounded py-[15px] px-6 gap-6 mx-3  lg:flex-row">
      <ImageCarousel
        // className={"w-[60%]"}
        allowLightbox
        images={product.images}
      />

      <div className="w-full lg:w-[70%] space-y-3">
        <div className="flex items-center justify-between">
          <p className="font-bold text-xl">₦{product.price}</p>
          <span className="block text-secondary italic text-[12px] ">
            Posted {convertedDate.dayWithSuffix} {convertedDate.monthOfYear},{" "}
            {convertedDate.year}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-krub font-[500] ">{product.name}</h3>
          <p className="text-[15px] text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        </div>
        <div className="flex gap-5 items-center">
          <div className="flex gap-1 items-center ">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-[13px] text-muted-foreground">
              Lagos, Nigeria
            </span>
          </div>
          <span className="text-[13px] text-muted-foreground">UK used</span>
        </div>
      </div>
      <div className="w-full lg:w-[15%] flex  lg:flex-col items-end justify-between">
        <Bookmark className="w-8 h-8 lg:w-4 lg:h-4 text-muted-foreground absolute top-3 right-3 lg:static" />
        <Link className="" href={`/product/${product.id}`}>
          <Button
            variant={"link"}
            className="w-full mt-3 text-primary font-bold"
          >
            View Details &#8594;
          </Button>
        </Link>
      </div>
    </article>
  );
};

export default ProductList;
