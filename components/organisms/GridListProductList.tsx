"use client";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { ArrowUpDown, List, LucideGrid3X3, Search, X } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { ProductCardGridViewSkeleton } from "../molecules/ProductCardGridViewSkeleton";
import { ProductCardGrid } from "../molecules/ProductCardGridView";
import { ProductCardListViewSkeleton } from "../molecules/ProductCardListViewSkeleton";
import { ProductCardList } from "../molecules/ProductCardListView";
// import { demoProducts } from "@/constants/product";
import { Product } from "@/types/models";
import { cn } from "@/lib/utils";

const GridListProductList = ({
  products,
  className,
}: {
  products: Product[];
  className?: string;
}) => {
  const [isActive, setIsActive] = useState<"grid" | "list">("list");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  return (
    <section className={cn("p-6", className)}>
      {/* <h5 className="font-bold text-2xl mb-4">Shop from {displayName}</h5> */}
      <article className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {" "}
          <LucideGrid3X3
            className={`text-lg cursor-pointer ${
              isActive === "grid" ? "text-primary" : ""
            }`}
            onClick={() => setIsActive("grid")}
          />{" "}
          <List
            className={`text-lg cursor-pointer ${
              isActive === "list" ? "text-primary" : ""
            }`}
            onClick={() => setIsActive("list")}
          />
        </div>

        {/* Sort Popover */}
        <article className="flex items-center gap-4">
          {/* Search Bar with Icon and Animation */}
          <div className="relative flex items-center">
            <input
              type="text"
              placeholder="Search items..."
              className={`border rounded px-3 py-2 transition-all duration-300 ml-2 ${
                showSearch ? "w-64 opacity-100" : "w-0 opacity-0 p-0"
              }`}
              style={{ minWidth: showSearch ? "10rem" : "0" }}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button
              type="button"
              className="p-2"
              onClick={() => setShowSearch((prev) => !prev)}
            >
              {showSearch ? (
                <X className="h-5 w-5 text-gray-500 cursor-pointer" />
              ) : (
                <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-black" />
              )}
            </button>
          </div>

          <Popover>
            <PopoverTrigger className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
              Sort <ArrowUpDown className="text-md" />
            </PopoverTrigger>
            <PopoverContent className="p-4">
              <div className="flex flex-col gap-2">
                {["Latest", "Price: Low to High", "Price: High to Low"].map(
                  (label) => (
                    <PopoverClose asChild key={label}>
                      <button
                        onClick={() => toast(`${label} was clicked`)}
                        className="text-left w-full cursor-pointer"
                      >
                        {label}
                      </button>
                    </PopoverClose>
                  )
                )}
              </div>
            </PopoverContent>
          </Popover>
        </article>
        {/* <div className=""></div> */}
      </article>

      {isActive === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 pt-6">
          {products.length > 0 &&
            products.map((product) =>
              isPageLoading ? (
                <ProductCardGridViewSkeleton />
              ) : (
                <ProductCardGrid
                  id={product.id}
                  key={product.id}
                  name={product?.name!}
                  description={product?.description!}
                  price={product?.price!}
                  image={product?.images[0]!}
                  estimatedDelivery={""}
                  minOrder={0}
                  soldCount={0}
                  supplier={{
                    name: "",
                    yearsActive: 0,
                    country: "",
                    countryCode: "",
                  }}
                />
              )
            )}
        </div>
      ) : (
        <div className="flex flex-col gap-4 pt-6">
          {products.length > 0 &&
            products.map((product) =>
              isPageLoading ? (
                <ProductCardListViewSkeleton />
              ) : (
                <ProductCardList
                  id={product.id}
                  key={product.id}
                  name={product?.name!}
                  description={product?.description!}
                  price={product?.price!}
                  image={product?.images[0]!}
                  estimatedDelivery={""}
                  minOrder={0}
                  soldCount={0}
                  supplier={{
                    name: "",
                    yearsActive: 0,
                    country: "",
                    //   countryCode: "",
                  }}
                />
              )
            )}
        </div>
      )}
    </section>
  );
};

export default GridListProductList;
