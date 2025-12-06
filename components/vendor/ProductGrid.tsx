import { Button } from "@/components/ui/button";
import { ProductCardCompact } from "../templates/ProductCardCompact";
import { useEffect, useState } from "react";
import {
  ArrowUpDown,
  List,
  LucideGrid3X3,
  Search,
  Store,
  X,
  Loader2,
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
import { BusinessProfile, Product, User } from "@/types/models";
import ProductCards from "../molecules/ProductCards";
import ProductList from "../molecules/ProductList";
import { getBusinessProducts } from "@/services/productService";
import Link from "next/link";
import { useUserStore, useFetchDataOnMount } from "@/store/useUserStore";

export function ProductsGrid({
  vendor,
}: {
  vendor: BusinessProfile & { user: User };
}) {
  useFetchDataOnMount();

  const { user: currentUser, isOwner, isLoading } = useUserStore();
  const [isActive, setIsActive] = useState<"grid" | "list">("list");
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchValue, setSearchValue] = useState<string>("");
  const [isPageLoading, setIsPageLoading] = useState<boolean>(false);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [sortBy, setSortBy] = useState<"latest" | "price_asc" | "price_desc">("latest");

  // Pagination state
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalProducts, setTotalProducts] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const isMyShop = isOwner === true;

  // Fetch products function
  const fetchProducts = async (page: number, append: boolean = false) => {
    if (!vendor || !vendor.id) return;

    if (append) {
      setIsLoadingMore(true);
    } else {
      setIsPageLoading(true);
    }

    try {
      const res = await getBusinessProducts(vendor.id, {
        page,
        perPage: 30,
        sort: sortBy,
        search: searchValue.trim() || undefined,
      });

      if (res.success && res.data) {
        const responseData = res.data;
        if (append) {
          setAllProducts((prev) => [...prev, ...responseData.data]);
        } else {
          setAllProducts(responseData.data);
        }
        setTotalProducts(responseData.total);
        setHasMore(responseData.hasMore);
        setCurrentPage(page);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to load products");
    } finally {
      if (append) {
        setIsLoadingMore(false);
      } else {
        setIsPageLoading(false);
      }
    }
  };

  // Initial load
  useEffect(() => {
    fetchProducts(1, false);
  }, [vendor.id]);

  // Handle search change with debounce effect
  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentPage(1);
      fetchProducts(1, false);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  // Handle sort change
  useEffect(() => {
    setCurrentPage(1);
    fetchProducts(1, false);
  }, [sortBy]);

  useEffect(() => {
    if (vendor?.user?.id) {
      useUserStore.getState().updateIsOwner(vendor.user.id);
    }
  }, [vendor?.user?.id]);

  // Load more handler
  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      fetchProducts(currentPage + 1, true);
    }
  };

  return (
    <section id="products" className="px-2 lg:px-8 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            All Products
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Here are all the products available in our store
          </p>
        </div>

        <article className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <LucideGrid3X3
                className={`text-lg cursor-pointer ${isActive === "grid" ? "text-primary" : ""
                  }`}
                onClick={() => setIsActive("grid")}
              />
              <List
                className={`text-lg cursor-pointer ${isActive === "list" ? "text-primary" : ""
                  }`}
                onClick={() => setIsActive("list")}
              />
            </div>

            {/* Product count */}
            <div className="text-sm text-muted-foreground">
              {isPageLoading ? (
                "Loading..."
              ) : (
                <>
                  Showing {allProducts.length}
                  {totalProducts > 0 && allProducts.length !== totalProducts && (
                    <span> of {totalProducts}</span>
                  )} product{allProducts.length !== 1 ? "s" : ""}
                </>
              )}
            </div>
          </div>

          {/* Sort and Search Controls */}
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
                onClick={() => {
                  if (showSearch && searchValue) {
                    setSearchValue("");
                  }
                  setShowSearch((prev) => !prev);
                }}
              >
                {showSearch ? (
                  <X className="h-5 w-5 text-gray-500 cursor-pointer" />
                ) : (
                  <Search className="h-5 w-5 text-gray-500 cursor-pointer hover:text-black" />
                )}
              </button>
            </div>

            <Popover>
              <PopoverTrigger className="flex items-center gap-2 border rounded px-3 py-2 cursor-pointer hover:bg-gray-50">
                Sort <ArrowUpDown className="text-md" />
              </PopoverTrigger>
              <PopoverContent className="p-4 bg-white border rounded-lg shadow-lg z-50">
                <div className="flex flex-col gap-2">
                  <PopoverClose asChild>
                    <button
                      onClick={() => setSortBy("latest")}
                      className={`text-left w-full cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${sortBy === "latest" ? "bg-gray-100 font-semibold" : ""
                        }`}
                    >
                      Latest
                    </button>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <button
                      onClick={() => setSortBy("price_asc")}
                      className={`text-left w-full cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${sortBy === "price_asc" ? "bg-gray-100 font-semibold" : ""
                        }`}
                    >
                      Price: Low to High
                    </button>
                  </PopoverClose>
                  <PopoverClose asChild>
                    <button
                      onClick={() => setSortBy("price_desc")}
                      className={`text-left w-full cursor-pointer px-3 py-2 rounded hover:bg-gray-100 ${sortBy === "price_desc" ? "bg-gray-100 font-semibold" : ""
                        }`}
                    >
                      Price: High to Low
                    </button>
                  </PopoverClose>
                </div>
              </PopoverContent>
            </Popover>
          </article>
        </article>

        <section className="">
          {allProducts.length === 0 && !isPageLoading && (
            <Empty className="border border-dashed">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <Store />
                </EmptyMedia>
                <EmptyTitle>
                  {searchValue
                    ? `No products found for "${searchValue}"`
                    : `${vendor?.business_name || vendor?.user.first_name}'s store is empty`}
                </EmptyTitle>
                <EmptyDescription>
                  {searchValue
                    ? "Try adjusting your search terms"
                    : isMyShop
                      ? "Add products to your store to start selling."
                      : "Check out other great items on the marketplace."}
                </EmptyDescription>
              </EmptyHeader>

              <EmptyContent>
                {searchValue ? (
                  <Button
                    onClick={() => setSearchValue("")}
                    variant="outline"
                    size="sm"
                  >
                    Clear search
                  </Button>
                ) : isMyShop ? (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/sell">Add products</Link>
                  </Button>
                ) : (
                  <Button asChild variant="outline" size="sm">
                    <Link href="/products">Continue shopping</Link>
                  </Button>
                )}
              </EmptyContent>
            </Empty>
          )}
          {isActive === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-6">
              {isPageLoading && allProducts.length === 0 ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardGridViewSkeleton key={i} />
                ))
              ) : (
                allProducts.map((product) => (
                  <ProductCards key={product.id} product={product} />
                ))
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-4 p-6">
              {isPageLoading && allProducts.length === 0 ? (
                Array.from({ length: 8 }).map((_, i) => (
                  <ProductCardListViewSkeleton key={i} />
                ))
              ) : (
                allProducts.map((product) => (
                  <ProductList key={product.id} product={product} />
                ))
              )}
            </div>
          )}
        </section>

        {hasMore && (
          <div className="mt-12 text-center">
            <Button
              size="lg"
              variant="outline"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
            >
              {isLoadingMore ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Loading...
                </>
              ) : (
                "Load More Products"
              )}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
