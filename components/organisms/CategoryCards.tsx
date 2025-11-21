import { Product } from "@/types/models";
import React from "react";
import ProductCards from "../molecules/ProductCards";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { transformProduct } from "@/services/productService";

const CategoryCards = ({
  categoryTitle,
  categoryProduct,
  clasName,
  categoryLink,
}: {
  categoryTitle: string;
  categoryProduct: Product[];
  clasName?: string;
  categoryLink: string;
}) => {
  return (
    <section className={cn("my-8 px-3 md:px-5 w-full lg:px-18", clasName)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold ">{categoryTitle}</h2>
        <Link href={categoryLink ? categoryLink : "/categories"}>
          <Button
            variant="link"
            className="text-sm border border-primary px-[15px] hover:no-underline"
          >
            See All
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {Array.isArray(categoryProduct) && categoryProduct.length > 0 ? (
          categoryProduct.slice(0, 5).map((product) => (
            <ProductCards key={product.id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground py-8">
            No products available in this category
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryCards;
