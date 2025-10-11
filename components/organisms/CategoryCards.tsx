import { Product } from "@/types/models";
import React from "react";
import ProductCards from "../molecules/ProductCards";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

const CategoryCards = ({
  categoryTitle,
  categoryProduct,
  clasName,
}: {
  categoryTitle: string;
  categoryProduct: Product[];
  clasName?: string;
}) => {
  return (
    <section className={cn("my-8 px-3 md:px-5 lg:px-6", clasName)}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold ">{categoryTitle}</h2>
        <Button
          variant="link"
          className="text-sm border border-primary px-[15px] hover:no-underline"
        >
          See All
        </Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4">
        {categoryProduct.slice(0, 5).map((product) => (
          <ProductCards key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default CategoryCards;
