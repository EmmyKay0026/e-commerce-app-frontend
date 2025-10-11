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
import { User } from "@/types/models";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function VendorShopPage() {
  const { id } = useParams();
  const [vendor, setVendor] = useState<User | null>(null);

  useEffect(() => {
    const vendorDetails = userDB.find((vd) => vd.vendorProfile?.vendorId == id);
    if (vendorDetails) {
      setVendor(vendorDetails);
    }
  }, []);
  if (!vendor) {
    return <VendorHeroSkeleton />;
  }
  return (
    <div className="min-h-screen bg-background">
      {/* <VendorHeader /> */}
      <main className="">
        <HeroSection vendor={vendor} />
        <FeaturedProducts />
        <CategoriesSection />
        <ProductsGrid vendor={vendor} />
        <ContactSection vendor={vendor} />
      </main>
      {/* <VendorFooter /> */}
    </div>
  );
}
