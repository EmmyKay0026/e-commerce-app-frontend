import React, { useEffect, useState } from "react";
import ImageCarousel from "../atoms/ImageCarousel";
import { demoProducts } from "@/constants/product";
import { Product } from "@/types/models";
import { Bookmark, BookMarked, MapPin, Pencil } from "lucide-react";
import { convertToCustomFormat } from "@/lib/utils";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateSavedItems } from "@/services/userService";
import { useUserStore } from "@/store/useUserStore";

const ProductList = ({
  product,
  isOwner = false,
}: {
  product: Product;
  isOwner?: boolean;
}) => {
  const convertedDate = convertToCustomFormat(product.created_at);
  // console.log(convertedDate);
  const user = useUserStore((state) => state.user);
  const [isSaved, setIsSaved] = useState<boolean>(false);

  const handleSaveItem = async () => {
    await updateSavedItems(product.id);
    // console.log(res);
  };

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

  return (
    <article className="relative flex flex-col justify-between bg-white shadow rounded py-[15px] px-6 gap-6 mx-3  lg:flex-row">
      {isOwner && (
        <Link
          href={`/products/${product.slug}/edit`}
          className="absolute top-3 left-3 z-10 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
          title="Edit Product"
        >
          <Pencil size={16} className="text-gray-700" />
        </Link>
      )}
      <ImageCarousel
        className={"w-[40%]"}
        allowLightbox
        images={product.images}
      />

      <div className="w-full lg:w-[70%] space-y-3">
        <div className="flex items-center justify-between">
         {product.price_input_mode == "enter" ? <p className="font-bold text-xl">₦{Number(product.price).toLocaleString()} {Number(product.price).toLocaleString()} -{" "}
            <span className="italic capitalize text-[14px] font-normal">
              {product.sale_type ?? "Retail"}
            </span></p> : (
          <p className="font-bold text-lg lg:text-xl">
            Contact Seller for Price -{" "}
            <span className="italic capitalize text-[14px] font-normal">
              {product.sale_type ?? "Retail"}
            </span>
          </p>
        )}
          <span className="block italic text-[12px] text-gray   ">
            Posted {convertedDate?.dayWithSuffix} {convertedDate?.shortMonthOfYear},{" "}
            {convertedDate?.year}
          </span>
        </div>
        <div>
          <h3 className="text-lg font-krub font-medium ">{product.name}</h3>
          <p className="text-[15px] text-muted-foreground line-clamp-3">
            {product.description}
          </p>
        </div>
        {/* <div className="flex gap-5 items-center">
          <div className="flex gap-1 items-center ">
            <MapPin className="w-4 h-4 text-muted-foreground" />
            <span className="text-[13px] text-muted-foreground">
              Lagos, Nigeria
            </span>
          </div>
          <span className="text-[13px] text-muted-foreground">UK used</span>
        </div> */}
      </div>
      <div className="w-full lg:w-[15%] flex  lg:flex-col items-end justify-between">
        <Bookmark
          onClick={() => handleSaveItem()}
          className="w-8 h-8 lg:w-4 lg:h-4 text-muted-foreground absolute top-3 right-3 lg:static"
        />
        <div className="flex items-center gap-3">
          <Link className="" href={`/products/${product.slug}`}>
            <Button
              variant={"link"}
              className="w-full mt-3 text-primary font-bold"
            >
              View Details &#8594;
            </Button>
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductList;
