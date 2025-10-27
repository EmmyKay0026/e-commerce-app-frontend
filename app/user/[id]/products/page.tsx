"use client";
import CategoryCardsWithIcon from "@/components/molecules/CategoryCards";
import CategoryCards from "@/components/molecules/CategoryCards";
import { ProductCardGrid } from "@/components/molecules/ProductCardGridView";
import { ProductCardGridViewSkeleton } from "@/components/molecules/ProductCardGridViewSkeleton";
import { ProductCardList } from "@/components/molecules/ProductCardListView";
import { ProductCardListViewSkeleton } from "@/components/molecules/ProductCardListViewSkeleton";
import ProductCards from "@/components/molecules/ProductCards";
import ProductList from "@/components/molecules/ProductList";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
// import { ProductCard } from "@/components/molecules/ProductCardListView";
// import { Popover } from "@/components/ui/popover";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  demoCategories,
  demoProducts,
  demoWishlist,
} from "@/constants/product";
import { useUserStore } from "@/store/useUserStore";
import { PopoverClose } from "@radix-ui/react-popover";
import {
  ArrowUpDown,
  Grid,
  IndentIncrease,
  List,
  LucideGrid3X3,
  Search,
  Settings,
  Store,
  X,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const UserProductList = () => {
  const { id } = useParams();
  const router = useRouter();
  const isOwner = useUserStore((state) => state.isOwner);
  const user = useUserStore((state) => state.user);

  const [isActive, setIsActive] = useState<"grid" | "list">("list");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!id) {
      router.push("/404");
      return;
    }

    if (!isOwner) {
      router.push(`/user/${id}/profile`);
      return;
    }
  }, []);

  // const [fullWishlist, setFullWishlist] =
  //   useState<WishlistItem[]>(demoWishlist);

  // useEffect(() => {
  //   // Populate wishlist items with their corresponding product objects
  //   const populatedWishlist = demoWishlist.map((item) => {
  //     const product = demoProducts.find((p) => p.id === item.productId);
  //     return product ? { ...item, product } : item;
  //   });

  //   setFullWishlist(populatedWishlist as any); // 'as any' if WishlistItem doesn't have 'product' field
  // }, [demoWishlist, demoProducts]);

  return (
    <div className="py-[16px] w-full">
      <section className="">
        <article className="flex flex-wrap justify-center lg:justify-start gap-3 px-6">
          <CategoryCardsWithIcon category={demoCategories[0]} />
          <CategoryCardsWithIcon category={demoCategories[1]} />
          <CategoryCardsWithIcon category={demoCategories[2]} />
        </article>
        {/* <article className="flex items-center gap-2 pt-2 justify-between px-6">
          <h1 className="text-2xl font-bold">Products on sale</h1>
          <Settings className="mt-1 cursor-pointer" />
        </article> */}
        <div className="px-6 py-4 flex flex-col gap-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            {/* Location Filter */}
            {/* <select className="border rounded px-3 py-2">
            <option value="">All Locations</option>
            <option value="lagos">Lagos</option>
            <option value="abuja">Abuja</option>
          </select> */}

            {/* Price Filter */}
            {/* <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Price"
              className="border rounded px-2 py-1 w-24"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              className="border rounded px-2 py-1 w-24"
            />
          </div> */}

            {/* Category Filter */}
            {/* <select className="border rounded px-3 py-2">
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="fashion">Fashion</option>
            <option value="home">Home</option>
          </select> */}
          </div>

          {/* Sort */}

          {/* <div className="flex items-center gap-2">
          <label htmlFor="sort" className="font-medium">
            Sort by:
          </label>
          <select id="sort" className="border rounded px-3 py-2">
            <option value="latest">Latest</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div> */}
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
        </div>
      </section>
      <section className="">
        {demoProducts.length === 0 && (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Store />
              </EmptyMedia>
              <EmptyTitle>
                {isOwner
                  ? "Your store is empty"
                  : `${
                      user?.business_profile?.business_name || user?.first_name
                    }'s store is empty`}
              </EmptyTitle>
              <EmptyDescription>
                Add products to your store to start selling.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Button variant="outline" size="sm">
                {isOwner ? "Start selling" : `Continue shopping`}{" "}
              </Button>
            </EmptyContent>
          </Empty>
        )}
        {isActive === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {demoProducts.length > 0 &&
              demoProducts.map((product) =>
                isPageLoading ? (
                  <ProductCardGridViewSkeleton />
                ) : (
                  <ProductCards key={product.id} product={product} />
                )
              )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-6">
            {demoProducts.length > 0 &&
              demoProducts.map((product) =>
                isPageLoading ? (
                  <ProductCardListViewSkeleton />
                ) : (
                  <ProductList key={product.id} product={product} />
                )
              )}
          </div>
        )}
      </section>
    </div>
  );
};

export default UserProductList;
