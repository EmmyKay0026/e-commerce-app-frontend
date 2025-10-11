import { Button } from "@/components/ui/button";
import { ProductCardCompact } from "../templates/ProductCardCompact";
import { useState } from "react";
import {
  ArrowUpDown,
  List,
  LucideGrid3X3,
  Search,
  Store,
  X,
} from "lucide-react";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { toast } from "sonner";
import { demoProducts } from "@/constants/product";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { ProductCardGridViewSkeleton } from "../molecules/ProductCardGridViewSkeleton";
import { ProductCardGrid } from "../molecules/ProductCardGridView";
import { ProductCardListViewSkeleton } from "../molecules/ProductCardListViewSkeleton";
import { ProductCardList } from "../molecules/ProductCardListView";
import { User } from "@/types/models";
import ProductCards from "../molecules/ProductCards";
import ProductList from "../molecules/ProductList";
// import { ProductCardCompact } from "@/components/product-card-compact";

export function ProductsGrid({ vendor }: { vendor: User }) {
  const [isActive, setIsActive] = useState<"grid" | "list">("list");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  return (
    <section id="products" className="px-2 lg:px-8 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore our complete catalog of premium electronics and gadgets
          </p>
        </div>

        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCardCompact
              title={""}
              estimatedDelivery={""}
              soldCount={0}
              key={product.id}
              {...product}
              id={product.id.toString()}
              price={product.price.replace("₦", "") as unknown as number}
            />
          ))}
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

        <section className="">
          {demoProducts.length === 0 && (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Store />
                </EmptyMedia>
                <EmptyTitle>
                  {`
                      ${
                        vendor?.vendorProfile?.businessName || vendor?.fullName
                      }'s store is empty`}
                </EmptyTitle>
                <EmptyDescription>
                  Add products to your store to start selling.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <Button variant="outline" size="sm">
                  Continue shopping
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
            <div className="flex flex-col gap-4 p-6">
              {demoProducts.length > 0 &&
                demoProducts.map((product) =>
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

        <div className="mt-12 text-center">
          <Button size="lg" variant="outline">
            Load More Products
          </Button>
        </div>
      </div>
    </section>
  );
}
