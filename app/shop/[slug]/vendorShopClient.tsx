"use client";

import { useEffect, useState } from "react";
import { VendorHeroSkeleton } from "@/components/molecules/VendorShopSkeleton";
import { HeroSection } from "@/components/vendor/HeroSection";
import { ProductsGrid } from "@/components/vendor/ProductGrid";
import { ContactSection } from "@/components/vendor/ContactSection";
import { getBusinessProfileBySlug } from "@/services/businessProfileService";
import { BusinessProfile, User } from "@/types/models";

interface VendorShopClientProps {
  slug: string;
}

export default function VendorShopClient({ slug }: VendorShopClientProps) {
  const [vendor, setVendor] = useState<(BusinessProfile & { user: User }) | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVendor = async () => {
      try {
        setLoading(true);
        const res = await getBusinessProfileBySlug(slug);
        if (res.success && res.data) {
          setVendor(res.data as BusinessProfile & { user: User });
        } else {
          setVendor(null); // Vendor not found
        }
      } catch (error) {
        console.error("Error fetching vendor:", error);
        setVendor(null);
      } finally {
        setLoading(false);
      }
    };

    fetchVendor();
  }, [slug]);

  if (loading) return <VendorHeroSkeleton />;

  if (!vendor) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Vendor not found.</h1>
      </div>
    );
  }

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
