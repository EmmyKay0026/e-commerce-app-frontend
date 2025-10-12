"use client";
import { ImageGallery } from "@/components/molecules/ImageGallery";
import { ProductInfo } from "@/components/molecules/ProductInfo";
import { ProductDetailSkeleton } from "@/components/molecules/ProductPageSkeleton";
import CategoryCards from "@/components/organisms/CategoryCards";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { demoCategories, demoProducts } from "@/constants/product";
import { userDB } from "@/constants/userData";
import { Product } from "@/types/models";
import { Heart } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { ImageGallery } from "@/components/product-detail/image-gallery";
// import { ProductInfo } from "@/components/product-detail/product-info";

// Mock data - replace with actual data fetching
const mockProduct = {
  id: "1",
  name: "Premium Wireless Bluetooth Headphones with Active Noise Cancellation",
  price: 6275.2,
  currency: "₦",
  category: "Electronics",
  description:
    "Experience superior sound quality with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and comfortable over-ear design. Perfect for music lovers, travelers, and professionals who demand the best audio experience.",
  images: [
    "/wireless-headphones.png",
    "/smartwatch-lifestyle.png",
    "/bluetooth-speaker.jpg",
    "/laptop-stand.png",
  ],
  minOrder: 5,
  soldCount: 127,
  inStock: 250,
  supplier: {
    name: "Guangzhou Chenyishun Import And Export Trading Co., Ltd.",
    country: "CN",
    yearsActive: 3,
    rating: 4.7,
  },
};

export default function ProductDetailPage() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<any>(null);

  console.log(id);
  useEffect(() => {
    const product = demoProducts.find((prod) => prod.id == id);
    if (!product) return;

    const category = demoCategories.find(
      (cat) => cat.id === product.categoryId
    );
    if (!category) return;
    let categoryNamesSlugs;
    const categoryNameArray = category?.parentCategory;
    if (!categoryNameArray) {
      categoryNamesSlugs = null;
    } else {
      categoryNamesSlugs = categoryNameArray?.map((catId: string) => {
        const cat = demoCategories.find((categ) => categ.id === catId);
        return cat
          ? { name: cat.name, slug: cat.slug }
          : { name: "Unknown Category", slug: "" };
      });
    }

    const vendor = userDB.find((user) => user.id === product.vendorId);
    if (!vendor) return;

    // console.log(categoryNames);

    setProductDetails({
      ...product,
      vendor: vendor,
      category: category,
      parentCategories: categoryNamesSlugs,
    });
  }, [id]);
  // Todo handle loading and not found state separately
  if (!productDetails) {
    return <ProductDetailSkeleton />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header Section */}
      <div className="bg-primary/10 border-b ">
        <div className="container mx-auto px-4 py-15 w-[90%] lg:w-[75%] text-center">
          <h1 className="text-4xl font-bold text-balance mb-5 leading-[3.2rem]">
            {productDetails.name}
          </h1>
          <div className="flex items-center justify-center text-center ">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/market-place">
                    Market place
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {productDetails.parentCategories &&
                  productDetails.parentCategories.length > 0 &&
                  productDetails.parentCategories.map(
                    (
                      parentCat: { name: string; slug: string },
                      index: number
                    ) => (
                      <React.Fragment key={index}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink
                            href={
                              index == 0
                                ? `/${parentCat.slug}`
                                : `/${productDetails.parentCategories
                                    .slice(0, index + 1)
                                    .map((cat: any) => cat.slug)
                                    .join("/")}`
                            }
                          >
                            {parentCat.name}
                          </BreadcrumbLink>
                        </BreadcrumbItem>
                      </React.Fragment>
                    )
                  )}
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink
                    href={
                      productDetails.parentCategories
                        ? `/${productDetails.parentCategories
                            .map((cat: any) => cat.slug)
                            .join("/")}/${productDetails.category.slug}`
                        : `/${productDetails.category.slug}`
                    }
                  >
                    {productDetails.category.name}
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{productDetails.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col items-start  gap-8 lg:gap-12 lg:flex-row">
          {/* Left Column - Image Gallery */}
          <div className="w-full lg:w-[53%]">
            <ImageGallery
              images={productDetails ? productDetails.images : []}
              productName={productDetails.name}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-[47%] ">
            {productDetails && (
              <ProductInfo
                name={productDetails.name}
                price={productDetails.price}
                description={productDetails.description}
                category={productDetails?.category?.name}
                // minOrder={demoProducts[0].minOrder}
                // soldCount={demoProducts[0].soldCount}
                // inStock={demoProducts[0].inStock}
                metadata={productDetails.metadata}
                vendor={productDetails.vendor}
                dateOfPosting={productDetails.createdAt}
              />
            )}
          </div>
        </div>
      </div>
      <div className="border-t my-8" />
      <CategoryCards
        clasName="container mx-auto px-8 py-8"
        categoryTitle="Related Products"
        categoryProduct={demoProducts}
        categoryLink="/category/safety-security"
      />
    </div>
  );
}
