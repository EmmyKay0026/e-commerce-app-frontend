"use client";

import { ImageGallery } from "@/components/molecules/ImageGallery";
import { ProductInfo } from "@/components/molecules/ProductInfo";
import { ProductDetailSkeleton } from "@/components/molecules/ProductPageSkeleton";
import CategoryCards from "@/components/organisms/CategoryCards";
// import { getProductById, getRelatedProducts } from "@/services/productService";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { demoProducts } from "@/constants/product";
import { getProductById, getRelatedProducts } from "@/services/productService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;

    async function fetchProduct() {
      try {
        setLoading(true);

        const product = await getProductById(id as string);
        setProductDetails(product);

        // console.log(product);

        if (product.category?.slug) {
          const related = await getRelatedProducts(product.category.slug);
          setRelatedProducts(related.filter((p: any) => p.id !== product.id));
        }
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <ProductDetailSkeleton />;
  if (!productDetails)
    return <div className="text-center py-20">Product not found</div>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* Header Section */}
      <div className="bg-primary/10 border-b">
        <div className="container mx-auto px-4 py-15 w-[90%] lg:w-[75%] text-center">
          <h1 className="text-4xl font-bold text-balance mb-5 leading-[3.2rem]">
            {productDetails.name}
          </h1>
          <div className="flex items-center justify-center text-center">
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
                              index === 0
                                ? `/category/${parentCat.slug}`
                                : `/category/${productDetails.parentCategories
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
        <div className="flex flex-col items-start gap-8 lg:gap-12 lg:flex-row">
          {/* Left Column - Image Gallery */}
          <div className="w-full lg:w-[53%]">
            <ImageGallery
              images={productDetails?.images || []}
              productName={productDetails.name}
            />
          </div>

          {/* Right Column - Product Info */}
          <div className="w-full lg:w-[47%]">
            <ProductInfo
              name={productDetails.name}
              price={productDetails.price}
              description={productDetails.description}
              category={productDetails?.category?.name}
              metadata={productDetails.metadata}
              vendor={productDetails.business}
              dateOfPosting={productDetails.created_at}
            />
          </div>
        </div>
      </div>

      <div className="border-t my-8" />

      {/* Related Products Section */}
      <div className="container mx-auto px-8 py-8">
        {relatedProducts.length > 0 ? (
          <CategoryCards
            clasName="container mx-auto"
            categoryTitle="Related Products"
            categoryProduct={relatedProducts}
            categoryLink={`/category/${productDetails.category.slug}`}
          />
        ) : (
          <p className="text-center text-muted-foreground">
            No related products found.
          </p>
        )}
      </div>
    </div>
  );
}
