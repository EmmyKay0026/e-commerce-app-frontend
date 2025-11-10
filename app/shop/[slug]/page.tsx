// app/shop/[slug]/page.tsx
import { generateVendorMetadata, generateVendorSchema } from "./metadata";
import VendorShopClient from "./vendorShopClient";
import Script from "next/script";

export const dynamic = "force-dynamic"; // <<< important!

type Props = { params: { slug: string } };

export async function generateMetadata({ params }: Props) {
  return generateVendorMetadata(params.slug);
}

export default function VendorShopPage({ params }: Props) {
  const { slug } = params;

  const schema = generateVendorSchema(slug); // optional, can await if needed

  return (
    <>
      {schema && (
        <Script
          id="vendor-jsonld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      <VendorShopClient slug={slug} />
    </>
  );
}
