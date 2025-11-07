// app/shop/[slug]/VendorShopClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { HeroSection } from "@/components/vendor/HeroSection";
import { ProductsGrid } from "@/components/vendor/ProductGrid";
import { ContactSection } from "@/components/vendor/ContactSection";
import { VendorHeroSkeleton } from "@/components/molecules/VendorShopSkeleton";
import { getBusinessProfileBySlug } from "@/services/businessProfileService";
import { BusinessProfile, User, VendorProfile } from "@/types/models";

// export type VendorProfile = BusinessProfile & { user?: User };

export default function VendorShopClient({ 
  initialVendor 
}: { 
  initialVendor?: VendorProfile 
}) {
  const { slug } = useParams();
  const router = useRouter();
  const [vendor, setVendor] = useState<VendorProfile | null>(initialVendor || null);
  const [pageIsLoading, setPageIsLoading] = useState(!initialVendor);

  useEffect(() => {
    if (initialVendor) {
      setVendor(initialVendor);
      setPageIsLoading(false);
      return;
    }

    if (!slug) {
      router.push("/404");
      return;
    }

    const fetchVendor = async () => {
      const res = await getBusinessProfileBySlug(slug as string);
      if (res.success && res.data) {
        setVendor(res.data); // ← NO CAST! Type-safe
        setPageIsLoading(false);
      } else {
        router.push("/404");
      }
    };

    fetchVendor();
  }, [slug, router, initialVendor]);

  if (pageIsLoading) return <VendorHeroSkeleton />;
  if (!vendor) return null;

  return (
    <div className="min-h-screen bg-background">
      <main>
        <HeroSection vendor={vendor} />
        <ProductsGrid vendor={vendor} />
        <ContactSection vendor={vendor} />
      </main>
    </div>
  );
}