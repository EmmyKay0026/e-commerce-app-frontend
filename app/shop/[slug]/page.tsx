// app/shop/[slug]/page.tsximport { Metadata } from "next";
import { Metadata } from "next";
import { getBusinessProfileBySlug } from "@/services/businessProfileService";
import VendorShopClient from "./VendorShopClient";
import { notFound } from "next/navigation";
import Script from "next/script";

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const res = await getBusinessProfileBySlug(slug);

  if (!res.success || !res.data) {
    return {
      title: "Vendor Not Found | Industrial Mart Nigeria",
      robots: { index: false, follow: false },
    };
  }

  const vendor = res.data;
  const title = `${vendor.business_name} | Industrial Mart Nigeria`;
  const description =
    vendor.description?.slice(0, 155) ||
    `${vendor.business_name} – Verified industrial supplier in Nigeria. Tools, machinery, equipment.`;

  return {
    title,
    description,
    keywords: [
      vendor.business_name,
      "industrial tools Nigeria",
      "equipment supplier",
      vendor.slug,
    ].filter((k): k is string => Boolean(k)),

    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,
      siteName: "Industrial Mart Nigeria Nig Ltd",
      images: vendor.cover_image
        ? [
            {
              url: vendor.cover_image,
              width: 1200,
              height: 630,
              alt: `${vendor.business_name} cover`,
            },
          ]
        : [],
      locale: "en_NG",
      type: "website",
    },

    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: vendor.cover_image ? [vendor.cover_image] : [],
      creator: "@industrialmart",
    },

    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, "max-image-preview": "large" },
    },

    alternates: {
      canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,
    },
  };
}

export default async function VendorShopPage({ params }: Props) {
  const { slug } = params;
  const res = await getBusinessProfileBySlug(slug);

  if (!res.success || !res.data) notFound();

  const vendor = res.data;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: vendor.business_name,
    image: vendor.cover_image,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/shop/${slug}`,
    telephone: vendor.business_phone || vendor.user?.phone_number,
    email: vendor.business_email || vendor.user?.email,
    address: vendor.address
      ? {
          "@type": "PostalAddress",
          streetAddress: vendor.address,
          addressLocality: "Lagos",
          addressRegion: "Lagos State",
          addressCountry: "NG",
        }
      : undefined,
    description: vendor.description,
  };

  return (
    <>
      <Script
        id="vendor-jsonld"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <VendorShopClient initialVendor={vendor} />
    </>
  );
}