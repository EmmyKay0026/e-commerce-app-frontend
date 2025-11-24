"use client";
import CategoryCardsWithIcon from "@/components/molecules/CategoryCards";
import { ProductCardGrid } from "@/components/molecules/ProductCardGridView";
import { ProductCardGridViewSkeleton } from "@/components/molecules/ProductCardGridViewSkeleton";
import { ProductCardList } from "@/components/molecules/ProductCardListView";
import { ProductCardListViewSkeleton } from "@/components/molecules/ProductCardListViewSkeleton";
import ProductCards from "@/components/molecules/ProductCards";
import ProductList from "@/components/molecules/ProductList";
import GridListProductList from "@/components/organisms/GridListProductList";
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
import { fetchProductsByIds, getPublicProfile } from "@/services/userService";
import { useUserStore } from "@/store/useUserStore";
import { Product } from "@/types/models";
import {
  Bookmark,
  Grid,
  IndentIncrease,
  // Link,
  List,
  LucideGrid3X3,
  Search,
  Settings,
  Store,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { is } from "zod/v4/locales";

const SaveForLaterPage = () => {
  const [isActive, setIsActive] = useState<"grid" | "list">("list");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [businessProducts, setBusinessProducts] = useState<Product[] | null>(
    null
  );
  const { id } = useParams();

  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const user = useUserStore((state) => state.user);

  // useEffect(() => {
  //   if (!id) return;
  //   if (isOwner === false) {
  //     window.location.href = `/user/${id}/profile`;
  //   }
  //   updateIsOwner(id.toString());
  // }, []);
  useEffect(() => {
    const getBusniessProducts = async () => {
      // if (!id) return;
      setIsPageLoading(true);
      if (!user) return;
      if (!user?.saved_items) {
        setBusinessProducts([]);
        return;
      }

      const res = await fetchProductsByIds(user?.saved_items);
      if (res.success && res.data) {
        // console.log("Saved items", res.data);

        setBusinessProducts(res.data);
      }
      // console.log(res);
      setIsPageLoading(false);
    };

    getBusniessProducts();
  }, [user]);


  return (
    <div className="py-4 w-full">
      <section className="">
        <article className="flex items-center gap-2 pt-2 px-6">
          <Bookmark className="mt-1" />
          <h1 className="text-2xl font-bold">Saved items</h1>
        </article>
        {/* <article className="flex flex-wrap gap-3 px-6 py-4">
          <CategoryCardsWithIcon category={demoCategories[0]} />
          <CategoryCardsWithIcon category={demoCategories[1]} />
          <CategoryCardsWithIcon category={demoCategories[2]} />
        </article> */}

        <div className="px-6 py-4 flex flex-col gap-4">{/* Filters */}</div>
      </section>

      <section className="">
        {businessProducts?.length === 0 && (
          <Empty className="border border-dashed">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <Store />
              </EmptyMedia>
              <EmptyTitle>No saved items</EmptyTitle>
              <EmptyDescription>
                Visit the marketplace to start saving items for later!
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <Link href="/marketplace">
                <Button variant="default" size="lg">
                  Visit Marketplace
                </Button>
              </Link>
            </EmptyContent>
          </Empty>
        )}
        {isActive === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
            {businessProducts &&
              businessProducts?.length > 0 &&
              businessProducts?.map((product) =>
                isPageLoading ? (
                  <ProductCardGridViewSkeleton />
                ) : (
                  <ProductCards key={product.id} product={product} />
                )
              )}
          </div>
        ) : (
          <div className="flex flex-col gap-4 p-6">
            {businessProducts &&
              businessProducts?.length > 0 &&
              businessProducts?.map((product) =>
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

export default SaveForLaterPage;

// <section className="">
//   {isActive === "grid" ? (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-7 p-6">
//       {fullWishlist.map((item) => (
//         //   <div
//         //     key={item.id}
//         //     className="border rounded-lg p-4 flex flex-col"
//         //   ></div>

//         <ProductCardGrid
//           id={item.id}
//           key={item.id}
//           name={item.product?.name!}
//           description={item.product?.description!}
//           price={item.product?.price!}
//           image={item.product?.images[0]!}
//           estimatedDelivery={""}
//           minOrder={0}
//           soldCount={0}
//           supplier={{
//             name: "",
//             yearsActive: 0,
//             country: "",
//             countryCode: "",
//           }}
//         />
//       ))}
//     </div>
//   ) : (
//     <div className="flex flex-col gap-4 p-6">
//       {fullWishlist.map((item) => (
//         //   <div
//         //     key={item.id}
//         //     className="border rounded-lg p-4 flex flex-col"
//         //   ></div>
//         <ProductCardList
//           id={item.id}
//           key={item.id}
//           name={item.product?.name!}
//           description={item.product?.description!}
//           price={item.product?.price!}
//           image={item.product?.images[0]!}
//           estimatedDelivery={""}
//           minOrder={0}
//           soldCount={0}
//           supplier={{
//             name: "",
//             yearsActive: 0,
//             country: "",
//             //   countryCode: "",
//           }}
//         />
//       ))}
//     </div>
//   )}
// </section>

//  <article className="flex items-center justify-between">
//   <div className="flex items-center gap-2">
//     {" "}
//     <LucideGrid3X3
//       className={`text-lg cursor-pointer ${
//         isActive === "grid" ? "text-primary" : ""
//       }`}
//       onClick={() => setIsActive("grid")}
//     />{" "}
//     <List
//       className={`text-lg cursor-pointer ${
//         isActive === "list" ? "text-primary" : ""
//       }`}
//       onClick={() => setIsActive("list")}
//     />
//   </div>

//   {/* Sort Popover */}
//   <article className="flex items-center gap-4">
//     {/* Search Bar with Icon and Animation */}
//     <div className="relative flex items-center">
//       <input
//         type="text"
//         placeholder="Search items..."
//         className={`border rounded px-3 py-2 transition-all duration-300 ml-2 ${
//           showSearch ? "w-64 opacity-100" : "w-0 opacity-0 p-0"
//         }`}
//         style={{ minWidth: showSearch ? "10rem" : "0" }}
//         value={searchValue}
//         onChange={(e) => setSearchValue(e.target.value)}
//       />
//       <button
//         type="button"
//         className="p-2"
//         onClick={() => setShowSearch((prev) => !prev)}
//       >
//         {showSearch ? (
//           <X className="h-5 w-5 text-gray-500 cursor-pointer" />
//         ) : (
//           <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-black" />
//         )}
//       </button>
//     </div>

//     <Popover>
//       <PopoverTrigger className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer">
//         Sort <ArrowUpDown className="text-md" />
//       </PopoverTrigger>
//       <PopoverContent className="p-4">
//         <div className="flex flex-col gap-2">
//           {["Latest", "Price: Low to High", "Price: High to Low"].map(
//             (label) => (
//               <PopoverClose asChild key={label}>
//                 <button
//                   onClick={() => toast(`${label} was clicked`)}
//                   className="text-left w-full cursor-pointer"
//                 >
//                   {label}
//                 </button>
//               </PopoverClose>
//             )
//           )}
//         </div>
//       </PopoverContent>
//     </Popover>
//   </article>
//   {/* <div className=""></div> */}
// </article>
