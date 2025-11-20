// app/products/[slug]/metadata.ts
import { Metadata } from "next";
import { getProductBySlug } from "@/services/productService";
import { getCategoryWithParentCategories } from "@/services/categoryService";
import { Product, CategoryInfo } from "@/types/models";

type Props = { params: { slug: string } };

/* -------------------------------------------------
   Helper – fetch product + category
   ------------------------------------------------- */
async function fetchProductData(slug: string) {
  const res = await getProductBySlug(slug);
  if (!res.success || !res.data) throw new Error("Product not found");
  const product = res.data;

  let category: CategoryInfo | null = null;
  if (product.category_id) {
    const catRes = await getCategoryWithParentCategories(product.category_id);
    if (catRes.success && catRes.data) category = catRes.data;
  }
  return { product, category };
}

/* -------------------------------------------------
   JSON-LD Product schema (re-usable)
   ------------------------------------------------- */
export function generateProductSchema(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: product.images,
    description: product.description,
    sku: product.slug,
    mpn: product.slug,
    brand: { "@type": "Brand", name: product.business.business_name },
    offers: {
      "@type": "Offer",
      url: `https://industrialmart.ng/products/${product.slug}`,
      priceCurrency: "NGN",
      price: product.price,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
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
}

/* -------------------------------------------------
   Next.js generateMetadata (SSR)
   ------------------------------------------------- */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;

  let product: Product, category: CategoryInfo | null;
  try {
    const data = await fetchProductData(slug);
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

  // Construct metadata strings
  const title = category
    ? `${product.name} - ${category.name} - ${vendor.business_name} | Industrial Mart NG`
    : `${product.name} - ${vendor.business_name} | Industrial Mart NG`;

  const description =
    (product.description?.slice(0, 155).trim() + "...") ||
    `Buy ${product.name}${category ? ` in ${category.name}` : ""} from ${vendor.business_name} in Nigeria.`;

  const canonical = `https://industrialmart.ng/products/${slug}`;

  // Generate JSON-LD schema
  const productSchema = generateProductSchema(product);

  return {
    title,
    description,
    metadataBase: new URL("https://industrialmart.ng"),
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Industrial Mart Nigeria",
      type: "website",
      locale: "en_NG",
      images: (product.images || []).map((img) => ({
        url: img,
        width: 1200,
        height: 630,
        alt: `${product.name} - ${vendor.business_name}`,
      })),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [product.images[0]],
      creator: "@industrialmart",
      site: "@industrialmart",
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
      "ld+json": JSON.stringify([productSchema]),
    },
  };
}
