// import { VendorHeader } from "@/components/vendor-shop/vendor-header";
// import { HeroSection } from "@/components/vendor-shop/hero-section";
// import { CategoriesSection } from "@/components/vendor-shop/categories-section";
// import { FeaturedProducts } from "@/components/vendor-shop/featured-products";
// import { ProductsGrid } from "@/components/vendor-shop/products-grid";
// import { ContactSection } from "@/components/vendor-shop/contact-section";
// import { VendorFooter } from "@/components/vendor-shop/footer";
"use client";
import { VendorHeroSkeleton } from "@/components/molecules/VendorShopSkeleton";
import { CategoriesSection } from "@/components/vendor/CategoriesSection";
import { ContactSection } from "@/components/vendor/ContactSection";
import { FeaturedProducts } from "@/components/vendor/FeaturedProducts";
import { VendorFooter } from "@/components/vendor/Footer";
import { HeroSection } from "@/components/vendor/HeroSection";
import { ProductsGrid } from "@/components/vendor/ProductGrid";
import { VendorHeader } from "@/components/vendor/VendorHeader";
import { userDB } from "@/constants/userData";
import {
  BusinessProfile,
  getBusinessProfileBySlug,
} from "@/services/businessProfileService";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "zod";

export default function VendorShopPage() {
  const { slug } = useParams();
  const user = useUserStore((state) => state.user);
  const [vendor, setVendor] = useState<BusinessProfile & { user: User }>(null);
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(true);
  const router = useRouter();
  useEffect(() => {
    if (!slug) {
      router.push("/404");
      return;
    }

    const fetchVendor = async () => {
      const res = await getBusinessProfileBySlug(slug?.toString());
      console.log(res);

      if (res.success && res.data) {
        setVendor(res.data as BusinessProfile & { user: User });
        setPageIsLoading(false);
      }
      // if (res.status === 404) {
      //   router.push("/404");
      //   return;
      // }
    };
    fetchVendor();
  }, []);

  if (pageIsLoading) {
    return <VendorHeroSkeleton />;
  }
  return (
    <div className="min-h-screen bg-background">
      {/* <VendorHeader /> */}
      <main className="">
        <HeroSection vendor={vendor} />
        <FeaturedProducts />
        {/* <CategoriesSection /> */}
        <ProductsGrid vendor={vendor} />
        <ContactSection vendor={vendor} />
      </main>
      {/* <VendorFooter /> */}
    </div>
  );
}
