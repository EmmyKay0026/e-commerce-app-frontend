// "use client";
import { Metadata } from "next";
import React from "react"
import { notFound } from "next/navigation";
import Script from "next/script";
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
// import React, { useEffect, useState } from "react";
import { Product, CategoryInfo } from "@/types/models";

type Props = { params: Promise<{ slug: string }> };

async function fetchProductData(slug: string) {
  // 1. Fetch product
  const res = await getProductBySlug(slug as string);
  if (!res.success || !res.data) {
    throw new Error("Product not found");
  }
  const productDetails = res?.data;

  // 2. Fetch category in parallel (if exists)
  let category: CategoryInfo | null = null;
  if (productDetails.category_id) {
    const catRes = await getCategoryWithParentCategories(productDetails.category_id);
    if (catRes.success && catRes.data) {
      category = catRes.data;
    }
  }

  // 3. Fetch related products
  let relatedProducts: Product[] = [];
  if (productDetails.category_id) {
    const related = await getProductsByCategory(productDetails.category_id);
    if (related.status === 200 && related.data) {
      const filtered = related.data.filter((p) => p.slug !== slug);
      // relatedProducts(filtered ?? []);
    }
  }

  return { productDetails, category, relatedProducts };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let product, category;
  try {
    const data = await fetchProductData(slug);
    product = data.productDetails;
    category = data.category;
  } catch {
    return {
      title: "Product Not Found | Industrial Mart Nigeria",
      description: "The product you are looking for is no longer available.",
      robots: { index: false, follow: false },
    };
  }

  const vendor = product.business;
  const title = category
    ? `${product.name} - ${category.name} - ${vendor.business_name} | Industrial Mart NG`
    : `${product.name} - ${vendor.business_name} | Industrial Mart NG`;

  const description =
    product.description?.slice(0, 155).trim() + "..." ||
    `Buy ${product.name}${category ? ` in ${category.name}` : ""} from ${vendor.business_name} in Nigeria.`;

  return {
    title,
    description,
    metadataBase: new URL("https://industrialmart.ng"),
    alternates: { canonical: `https://industrialmart.ng/products/${slug}` },
    openGraph: {
      title,
      description,
      images: product.images.map((img: any) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: product.name,
      })),
      url: `https://industrialmart.ng/products/${slug}`,
      siteName: "Industrial Mart Nigeria",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
      creator: "@industrialmart",
    },
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  let productDetails: Product, category: CategoryInfo | null, relatedProducts: Product[];
  try {
    const data = await fetchProductData(slug);
    productDetails = data.productDetails;
    category = data.category;
    relatedProducts = data.relatedProducts;
  } catch {
    notFound();
  }
  // const { productId: slug } = useParams();
  // const [productDetails, setProductDetails] = useState<Product | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [relatedCategoryId, setRelatedCategoryId] = useState<
  //   string | undefined
  // >(undefined);
  // const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);

  // useEffect(() => {
  //   if (!slug) return;

  //   async function fetchProduct() {
  //     try {
  //       setLoading(true);

  //       // 🔹 Fetch single product by ID
  //       const res = await getProductBySlug(slug as string);

  //       if (res.success === true) {
  //         setProductDetails(res?.data);

  //         setRelatedCategoryId(res.data?.category_id);
  //       }

  //       // console.log(product);

  //       // if (product.category?.slug) {
  //       //   const related = await getRelatedProducts(product.category.slug);
  //       //   setRelatedProducts(related.filter((p: any) => p.id !== product.id));
  //     } catch (error) {
  //       console.error("Failed to load product:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }

  //   fetchProduct();
  // }, [slug]);

  // useEffect(() => {
  //   // 🔹 Fetch related products by categoryId
  //   if (!relatedCategoryId) return;
  //   // console.log(relatedCategoryId);

  //   const handleRelatedProducFetch = async () => {
  //     const related = await getProductsByCategory(relatedCategoryId);
  //     if (related.status === 200) {
  //       const filtered = related.data?.filter((p) => p.slug !== slug);
  //       setRelatedProducts(filtered ?? []);
  //     }
  //   };
  //   handleRelatedProducFetch();
  // }, [relatedCategoryId]);

  // useEffect(() => {
  //   const getParentOfCategoryWithId = async () => {
  //     console.log("here");

  //     const categoryId = productDetails?.category_id;
  //     if (!categoryId) return;

  //     const parents = await getCategoryWithParentCategories(categoryId);
  //     console.log("parent_categories", parents.data);

  //     if (parents && productDetails) {
  //       setProductDetails({
  //         ...productDetails,
  //         parentCategories: parents?.data?.parent_categories,
  //         category: {
  //           name: parents?.data?.name!,
  //           slug: parents?.data?.slug!,
  //         },
  //         // category: parents.category,
  //       });
  //     }
  //   };

  //   getParentOfCategoryWithId();
  // }, [productDetails?.category_id]);

  // if (loading) return <ProductDetailSkeleton />;
  // if (!productDetails)
  //   return <div className="text-center py-20">Product not found</div>;

  const allCategories: CategoryInfo[] = [
    ...(productDetails?.parentCategories ?? []),
    ...(productDetails.category ? [productDetails.category] : []),
  ].filter((c): c is CategoryInfo => c !== null && c !== undefined);

  // const product = data.productDetails;

  // Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: productDetails.name,
    image: productDetails.images,
    description: productDetails.description,
    sku: productDetails.slug,
    mpn: productDetails.slug,
    brand: { "@type": "Brand", name: productDetails.business.business_name },
    offers: {
      "@type": "Offer",
      url: `https://industrialmart.ng/products/${productDetails.id}`,
      priceCurrency: "NGN",
      price: productDetails.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        productDetails.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: productDetails.business.business_name,
      },
    },
  };

  return (
    <>
      <Script
        id={`product-schema-${productDetails.slug}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        {/* ---------- HEADER ---------- */}
        <div className="bg-primary/10 border-b">
          <div className="container mx-auto px-4 py-15 w-[90%] lg:w-[75%] text-center">
            <h1 className="text-4xl font-bold text-balance mb-5 leading-[3.2rem]">
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
                      console.log("productDetails", productDetails);
                      console.log("allCategories", allCategories);
                      if (!cat) return null;
                      const href = `/category/${allCategories
                        .slice(0, index + 1)
                        .map((c) => c.slug)
                        .join("/")}`;
                      return (
                        <React.Fragment key={cat.slug}>
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
    </>
  );
}
