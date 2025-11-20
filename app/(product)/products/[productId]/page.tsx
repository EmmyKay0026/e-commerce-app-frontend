// app/(shop)/products/[productId]/page.tsx
import { Metadata } from "next";
import ProductClient from "./productClient";
import { getProductBySlug } from "@/services/productService";
import { getCategoryWithParentCategories } from "@/services/categoryService";

interface Props {
  params: { productId: string };
}


interface CategoryInfo {
  name: string;
  slug: string;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.productId;

  try {
    const res = await getProductBySlug(slug);

    if (!res.success || !res.data) {
      return {
        title: "Product Not Found | Marketplace",
        description: "The product you are looking for is no longer available.",
        robots: { index: false, follow: false },
      };
    }

    const product = res.data;
    const vendor = product.business;
    const categoryId = product.category_id;

    // Fetch category info for richer context
    let category: CategoryInfo | null = null;
    if (categoryId) {
      const catRes = await getCategoryWithParentCategories(categoryId);
      if (catRes?.data) {
        category = {
          name: catRes.data.name!,
          slug: catRes.data.slug!,
        };
      }
    }

    const siteName = vendor?.business_name ?? "Marketplace";
    const siteUrl = process.env.SITE_URL ?? "https://industrialmart.ng";
    const canonical = `${siteUrl}/product/${slug}`;
    const imageUrl =
      typeof product.images?.[0] === "string"
        ? product.images[0]
        : (product.images as any)?.[0]?.url ?? `${siteUrl}/og-fallback.png`;

    const title = category
      ? `${product.name} - ${category.name} - ${siteName}`
      : `${product.name} - ${siteName}`;

    const description =
      (product.description?.slice(0, 155).trim() ?? "") ||
      `Buy ${product.name}${category ? ` in ${category.name}` : ""} from ${siteName}.`;

    const keywords = [
      product.name,
      category?.name,
      vendor?.business_name,
      "buy online",
      "best price",
      "marketplace",
    ]
      .filter(Boolean)
      .join(", ");

    // Product Schema
    const productSchema = {
      "@context": "https://schema.org/",
      "@type": "Product",
      name: product.name,
      image: [imageUrl],
      description: product.description ?? description,
      brand: {
        "@type": "Brand",
        name: vendor?.business_name ?? siteName,
      },
      offers: {
        "@type": "Offer",
        url: canonical,
        priceCurrency: "NGN",
        price: product.price?.toString() ?? "",
      },
    };

    // Breadcrumb Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        ...(category
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: category.name,
                item: `${siteUrl}/category/${category.slug}`,
              },
            ]
          : []),
        {
          "@type": "ListItem",
          position: category ? 3 : 2,
          name: product.name,
          item: canonical,
        },
      ],
    };

    return {
      title,
      description,
      keywords,
      metadataBase: new URL(siteUrl),
      alternates: { canonical },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName,
        locale: "en_NG",
        type: "website",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${product.name} - ${siteName}`,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [imageUrl],
        creator: "@marketplace_ng",
        site: "@marketplace_ng",
      },
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-image-preview": "large",
          "max-snippet": -1,
          "max-video-preview": -1,
        },
      },
      other: {
        // Inject both schemas as an array
        "ld+json": JSON.stringify([productSchema, breadcrumbSchema]),
      },
    };
  } catch (error) {
    console.error("Metadata generation error:", error);
    return {
      title: "Error Loading Product | Marketplace",
      description: "An unexpected error occurred while trying to load this product.",
      robots: { index: false, follow: false },
    };
  }
}


export default async function Page({ params }: { params: { productId: string } }) {
  // const initialData = await getProductBySlug(params.productId);

  return (
    <ProductClient
      // initialProduct={initialData.success ? initialData.data : null}
      slug={params.productId}
    />
  );
}