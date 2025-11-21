"use client";

import { ImageGallery } from "@/components/molecules/ImageGallery";
import { ProductInfo } from "@/components/molecules/ProductInfo";
import { ProductDetailSkeleton } from "@/components/molecules/ProductPageSkeleton";
import CategoryCards from "@/components/organisms/CategoryCards";
// import { getProductById } from "@/services/productService";
import {
  getCategoryWithParentCategories,
  getProductsByCategory,
} from "@/services/categoryService";
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

interface ProductClientProps {
  // initialProduct: Product | null;
  slug: string;
}

export default function ProductClient({ slug }: ProductClientProps) {
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
    // console.log(relatedCategoryId);

    const handleRelatedProducFetch = async () => {
      const related = await getProductsByCategory(relatedCategoryId);
      if (related.status === 200) {
        const filtered = related.data?.filter((p) => p.slug !== slug);
        setRelatedProducts(filtered ?? []);
      }
    };
    handleRelatedProducFetch();
  }, [relatedCategoryId]);

  useEffect(() => {
    const getParentOfCategoryWithId = async () => {
      // console.log("here");

      const categoryId = productDetails?.category_id;
      if (!categoryId) return;

      const parents = await getCategoryWithParentCategories(categoryId);
      // console.log("parent_categories", parents.data);

      if (parents && productDetails) {
        setProductDetails({
          ...productDetails,
          parentCategories: parents?.data?.parent_categories,
          category: {
            name: parents?.data?.name!,
            slug: parents?.data?.slug!,
          },
          // category: parents.category,
        });
      }
    };

    getParentOfCategoryWithId();
  }, [productDetails?.category_id]);

  if (loading) return <ProductDetailSkeleton />;
  if (!productDetails)
    return <div className="text-center py-20">Product not found</div>;

  const allCategories: CategoryInfo[] = [
    ...(productDetails?.parentCategories ?? []),
    ...(productDetails.category ? [productDetails.category] : []),
  ].filter((c): c is CategoryInfo => c !== null && c !== undefined);

  return (
    <div className="min-h-screen bg-linear-to-b from-primary/5 to-background">
      {/* ---------- HEADER ---------- */}
      <div className="bg-primary/10 border-b">
        <div className="container mx-auto px-4 py-15 w-[90%] lg:w-[75%] text-center">
          <h1 className="text-[28px]  lg:text-4xl font-bold text-balance mb-5 lg:leading-[3.2rem]">
            {productDetails.name}
          </h1>

          {/* ---------- Breadcrumb ---------- */}
          {allCategories.length > 0 ? (
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
                    if (!cat) return null;

                    // Link each category individually instead of building nested path
                    const href = `/category/${cat.slug}`;

                    return (
                      <React.Fragment key={`${cat.slug}-${index}`}>
                        <BreadcrumbSeparator />
                        <BreadcrumbItem>
                          <BreadcrumbLink href={href}>
                            {cat.name}
                          </BreadcrumbLink>
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
          ) : (
            <div className="flex items-center justify-center gap-2">
              <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
              <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded" />
            </div>
          )}
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

            <div className="border-t my-8" />
            <div className="w-full hidden lg:block">
              <h4 className="text-[24px] font-bold">Product features</h4>
              <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4 w-full">
                {productDetails.features &&
                  productDetails.features?.length > 0 ? (
                  productDetails.features.map((feature, index) => (
                    <li key={index} className="text-muted-foreground list-disc">
                      {feature}
                    </li>
                  ))
                ) : (
                  // <p className="whitespace-pre-line">{productDetails.features}</p>
                  <p className="text-muted-foreground">
                    No features added for this product.
                  </p>
                )}
              </ul>
            </div>
          </div>

          {/* Right - Info */}
          <div className="w-full lg:w-[47%]">
            <ProductInfo
              product={productDetails}
              name={productDetails.name}
              price={productDetails.price ?? ""}
              description={productDetails.description}
              category={productDetails?.category?.name}
              features={productDetails.features}
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
