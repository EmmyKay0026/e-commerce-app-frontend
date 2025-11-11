import { Metadata } from "next";
import { getBusinessProfileBySlug } from "@/services/businessProfileService";

/**
 * Generates metadata for a vendor page.
 * Handles failures gracefully without throwing or causing 404.
 */
export async function generateVendorMetadata(slug: string): Promise<Metadata> {
  try {
    const res = await getBusinessProfileBySlug(slug);

    if (!res.success || !res.data) {
      // Return fallback metadata instead of triggering 404
      return {
        title: `Vendor Shop | Industrial Mart Nigeria`,
        description: "Verified industrial supplier in Nigeria. Tools, machinery, equipment.",
        robots: { index: true, follow: true },
      };
    }

    const vendor = res.data;

    return {
      title: `${vendor.business_name} | Industrial Mart Nigeria`,
      description:
        vendor.description?.slice(0, 155) ||
        `${vendor.business_name} – Verified industrial supplier in Nigeria. Tools, machinery, equipment.`,
      openGraph: {
        title: vendor.business_name,
        description: vendor.description,
        url: `${process.env.SITE_URL}/shop/${slug}`,
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
        title: vendor.business_name,
        description: vendor.description,
        images: vendor.cover_image ? [vendor.cover_image] : [],
        creator: "@industrialmart",
      },
      robots: { index: true, follow: true },
      alternates: { canonical: `${process.env.SITE_URL}/shop/${slug}` },
    };
  } catch (error) {
    console.error("Error generating vendor metadata:", error);
    // Fallback metadata
    return {
      title: `Vendor Shop | Industrial Mart Nigeria`,
      description: "Verified industrial supplier in Nigeria. Tools, machinery, equipment.",
      robots: { index: true, follow: true },
    };
  }
}

/**
 * Generates JSON-LD schema for a vendor page.
 * Returns null if fetching fails; does not throw.
 */
export async function generateVendorSchema(slug: string) {
  try {
    const res = await getBusinessProfileBySlug(slug);

    if (!res.success || !res.data) return null;

    const vendor = res.data;

    return {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: vendor.business_name,
      image: vendor.cover_image,
      url: `${process.env.SITE_URL}/shop/${slug}`,
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
  } catch (error) {
    console.error("Error generating vendor schema:", error);
    return null;
  }
}
