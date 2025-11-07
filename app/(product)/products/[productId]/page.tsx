"use client";

import { ImageGallery } from "@/components/molecules/ImageGallery";
import { ProductInfo } from "@/components/molecules/ProductInfo";
import { ProductDetailSkeleton } from "@/components/molecules/ProductPageSkeleton";
import CategoryCards from "@/components/organisms/CategoryCards";
// import { getProductById } from "@/services/productService";
import { getProductsByCategory } from "@/services/categoryService";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  getProductBySlug,
  getRelatedProducts,
} from "@/services/productService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Product, CategoryInfo } from "@/types/models";

export default function ProductDetailPage() {
  const { productId: slug } = useParams();
  const [productDetails, setProductDetails] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [relatedCategoryId, setRelatedCategoryId] = useState<
    string | undefined
  >(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  useEffect(() => {
    if (!slug) return;

    async function fetchProduct() {
      try {
        setLoading(true);

        // 🔹 Fetch single product by ID
        const res = await getProductBySlug(slug as string);

        if (res.success === true) {
          setProductDetails(res?.data);

          setRelatedCategoryId(res.data?.category_id);
        }

        // console.log(product);

        // if (product.category?.slug) {
        //   const related = await getRelatedProducts(product.category.slug);
        //   setRelatedProducts(related.filter((p: any) => p.id !== product.id));
      } catch (error) {
        console.error("Failed to load product:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [slug]);

  useEffect(() => {
    // 🔹 Fetch related products by categoryId
    if (!relatedCategoryId) return;
    console.log(relatedCategoryId);

    const handleRelatedProducFetch = async () => {
      const related = await getProductsByCategory(relatedCategoryId);
      if (related.status === 200) {
        const filtered = related.data?.filter((p) => p.slug !== slug);
        setRelatedProducts(filtered ?? []);
      }
    };
    handleRelatedProducFetch();
  }, [relatedCategoryId]);

  if (loading) return <ProductDetailSkeleton />;
  if (!productDetails)
    return <div className="text-center py-20">Product not found</div>;

  const allCategories: CategoryInfo[] = [
    ...(productDetails.parentCategories || []),
    ...(productDetails.category ? [productDetails.category] : []),
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
      {/* ---------- HEADER ---------- */}
      <div className="bg-primary/10 border-b">
        <div className="container mx-auto px-4 py-15 w-[90%] lg:w-[75%] text-center">
          <h1 className="text-4xl font-bold text-balance mb-5 leading-[3.2rem]">
            {productDetails.name}
          </h1>

          {/* ---------- Breadcrumb ---------- */}
          <div className="flex items-center justify-center text-center">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/marketplace">
                    Market place
                  </BreadcrumbLink>
                </BreadcrumbItem>

                {allCategories.map((cat, index) => {
                  const href = `/category/${allCategories
                    .slice(0, index + 1)
                    .map((c) => c.slug)
                    .join("/")}`;
                  return (
                    <React.Fragment key={cat.slug}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href={href}>{cat.name}</BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  );
                })}

                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>{productDetails.name}</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>
      </div>

      {/* ---------- MAIN CONTENT ---------- */}
      <div className="container mx-auto px-8 py-8">
        <div className="flex flex-col items-start gap-8 lg:gap-12 lg:flex-row">
          {/* Left - Gallery */}
          <div className="w-full lg:w-[53%]">
            <ImageGallery
              images={productDetails?.images || []}
              productName={productDetails.name}
            />
          </div>

          {/* Right - Info */}
          <div className="w-full lg:w-[47%]">
            <ProductInfo
              product={productDetails}
              name={productDetails.name}
              price={productDetails.price ?? ""}
              description={productDetails.description}
              category={productDetails?.category?.name}
              metadata={productDetails.metadata}
              vendor={productDetails.business}
              dateOfPosting={productDetails.created_at}
              product_id={productDetails.id}
            />
          </div>
        </div>
      </div>

      <div className="border-t my-8" />

      {/* ---------- RELATED PRODUCTS ---------- */}
      <div className="container mx-auto px-8 py-8">
        {relatedProducts.length > 0 ? (
          <CategoryCards
            clasName="container mx-auto"
            categoryTitle="Related Products"
            categoryProduct={relatedProducts}
            categoryLink={`/category/${productDetails.category?.slug}`}
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
