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
import ProductCards from "../molecules/ProductCards";
import ProductList from "../molecules/ProductList";

const GridListProductList = ({
  products,
  className,
  onSort,
}: {
  products: Product[];
  className?: string;
  onSort?: (sort: "latest" | "price_asc" | "price_desc") => void;
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
            className={`text-lg cursor-pointer ${isActive === "grid" ? "text-primary" : ""
              }`}
            onClick={() => setIsActive("grid")}
          />{" "}
          <List
            className={`text-lg cursor-pointer ${isActive === "list" ? "text-primary" : ""
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
              className={`border rounded px-3 py-2 transition-all duration-300 ml-2 ${showSearch ? "w-64 opacity-100" : "w-0 opacity-0 p-0"
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
            <PopoverContent className="p-4 bg-white border rounded-md shadow-md z-50">
              <div className="flex flex-col gap-2">
                <PopoverClose asChild>
                  <button
                    onClick={() => onSort?.("latest")}
                    className="text-left w-full cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
                    Latest
                  </button>
                </PopoverClose>
                <PopoverClose asChild>
                  <button
                    onClick={() => onSort?.("price_asc")}
                    className="text-left w-full cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
                    Price: Low to High
                  </button>
                </PopoverClose>
                <PopoverClose asChild>
                  <button
                    onClick={() => onSort?.("price_desc")}
                    className="text-left w-full cursor-pointer hover:bg-gray-100 p-2 rounded"
                  >
                    Price: High to Low
                  </button>
                </PopoverClose>
              </div>
            </PopoverContent>
          </Popover>
        </article>
        {/* <div className=""></div> */}
      </article>

      {isActive === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-6">
          {products.length > 0 &&
            products.map((product) =>
              isPageLoading ? (
                <ProductCardGridViewSkeleton />
              ) : (
                <ProductCards key={product.id} product={product} />
                // <ProductCardGrid
                //   id={product.id}
                //   key={product.id}
                //   name={product?.name!}
                //   description={product?.description!}
                //   price={product?.price!}
                //   image={product?.images[0]!}
                //   estimatedDelivery={""}
                //   minOrder={0}
                //   soldCount={0}
                //   supplier={{
                //     name: "",
                //     yearsActive: 0,
                //     country: "",
                //     countryCode: "",
                //   }}
                // />
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
                <ProductList key={product.id} product={product} />

                // <ProductCardList
                //   id={product.id}
                //   key={product.id}
                //   name={product?.name!}
                //   description={product?.description!}
                //   price={product?.price!}
                //   image={product?.images[0]!}
                //   estimatedDelivery={""}
                //   minOrder={0}
                //   soldCount={0}
                //   supplier={{
                //     name: "",
                //     yearsActive: 0,
                //     country: "",
                //     //   countryCode: "",
                //   }}
                // />
              )
            )}
        </div>
      )}
    </section>
  );
};

export default GridListProductList;
