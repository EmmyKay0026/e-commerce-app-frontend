import { Metadata } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import React from "react";

import { getProductById } from "@/services/productService";
import { getCategoryById, getProductsByCategory } from "@/services/categoryService";
import { Product, BusinessProfile, Category } from "@/types/models";

import { ImageGallery } from "@/components/molecules/ImageGallery";
import { ProductInfo } from "@/components/molecules/ProductInfo";
import CategoryCards from "@/components/organisms/CategoryCards";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

/* ------------------------------------------------------------------
   1. SHARED DATA FETCH (USED BY METADATA + COMPONENT)
------------------------------------------------------------------- */
type Props = { params: Promise<{ id: string }> };

async function fetchProductData(id: string) {
  // 1. Fetch product
  const productRes = await getProductById(id);
  if (!productRes.success || !productRes.data) {
    throw new Error("Product not found");
  }
  const product = productRes.data;

  // 2. Fetch category in parallel (if exists)
  let category: Category | null = null;
  if (product.category_id) {
    const catRes = await getCategoryById(product.category_id);
    if (catRes.success && catRes.data) {
      category = catRes.data;
    }
  }

  // 3. Fetch related products
  let relatedProducts: Product[] = [];
  if (product.category_id) {
    const relRes = await getProductsByCategory(product.category_id);
    if (relRes.status === 200 && relRes.data) {
      relatedProducts = relRes.data.filter((p) => p.id !== id);
    }
  }

  return { product, category, relatedProducts };
}

/* ------------------------------------------------------------------
   2. METADATA – REUSES SHARED DATA
------------------------------------------------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  let product, category;
  try {
    const data = await fetchProductData(id);
    product = data.product;
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
    alternates: { canonical: `https://industrialmart.ng/products/${id}` },
    openGraph: {
      title,
      description,
      images: product.images.map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: product.name,
      })),
      url: `https://industrialmart.ng/products/${id}`,
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

/* ------------------------------------------------------------------
   3. COMPONENT – REUSES SAME DATA
------------------------------------------------------------------- */
export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  let product: Product, category: Category | null, relatedProducts: Product[];
  try {
    const data = await fetchProductData(id);
    product = data.product;
    category = data.category;
    relatedProducts = data.relatedProducts;
  } catch {
    notFound();
  }

  // Map business → BusinessProfile
  const vendorProfile: BusinessProfile = {
    id: product.business.id,
    business_name: product.business.business_name,
    business_email: "",
    business_phone: product.business.business_phone || "",
    business_whatsapp_number: product.business.business_whatsApp_number || "",
    cover_image: product.business.cover_image,
    address: product.business.address || undefined,
    slug: product.business.slug,
    description: undefined,
    status: undefined,
  };

  // Breadcrumb
  const breadcrumbItems = [
    { name: "Home", href: "/" },
    { name: "Marketplace", href: "/market-place" },
    ...(category ? [{ name: category.name, href: `/category/${category.slug}` }] : []),
    { name: product.name, href: "" },
  ];

  // Product JSON-LD
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: product.business.business_name },
    offers: {
      "@type": "Offer",
      url: `https://industrialmart.ng/products/${product.id}`,
      priceCurrency: "NGN",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        product.status === "active"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: product.business.business_name,
      },
    },
  };

  return (
    <>
      <Script
        id={`product-schema-${product.id}`}
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productSchema),
        }}
      />

      <div className="min-h-screen bg-gradient-to-b from-primary/5 to-background">
        {/* HEADER */}
        <div className="bg-primary/10 border-b">
          <div className="container mx-auto px-4 py-8 w-[90%] lg:w-[75%] text-center">
            <h1 className="text-4xl font-bold text-balance mb-5 leading-[3.2rem]">
              {product.name}
            </h1>

            <Breadcrumb>
              <BreadcrumbList className="justify-center">
                {breadcrumbItems.map((item, idx) => (
                  <React.Fragment key={idx}>
                    {idx > 0 && <BreadcrumbSeparator />}
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink href={item.href}>{item.name}</BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.name}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="container mx-auto px-8 py-8">
          <div className="flex flex-col items-start gap-8 lg:gap-12 lg:flex-row">
            <div className="w-full lg:w-[53%]">
              <ImageGallery images={product.images} productName={product.name} />
            </div>

            <div className="w-full lg:w-[47%]">
              <ProductInfo
                name={product.name}
                price={product.price}
                description={product.description}
                category={category?.name}
                metadata={product.metadata}
                vendor={vendorProfile}
                dateOfPosting={product.created_at}
                product_id={product.id}
              />
            </div>
          </div>
        </div>

        <div className="border-t my-8" />

        {/* RELATED PRODUCTS */}
        <div className="container mx-auto px-8 py-8">
          {relatedProducts.length > 0 ? (
            <CategoryCards
              clasName="container mx-auto"
              categoryTitle="Related Products"
              categoryProduct={relatedProducts}
              categoryLink={category ? `/category/${category.slug}` : `/category/${product.category_id}`}
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