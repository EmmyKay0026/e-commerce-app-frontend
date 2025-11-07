import CategorySection from "@/components/organisms/CategorySection";
import FeatureSection from "@/components/organisms/FeatureSection";
import HomeHeroSection from "@/components/organisms/HomeHeroSection";
import Testimonial from "@/components/organisms/Testimonial";
import CtaSection from "@/components/organisms/CtaSection";
// import { Button } from "@/components/ui/button";
import Image from "next/image";
// import BusinessOpportunities from "../components/organisms/BusinessOpp";
// import { getMyProfile } from "@/services/userService";
// import { useEffect } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Industrial Mart Nigeria | Industrial Tools & Equipment Marketplace",
  description: "Buy & sell verified industrial machinery, tools, and MRO supplies in Nigeria. Oil & gas, manufacturing, construction.",
  openGraph: {
    title: "Industrial Mart Nigeria",
    description: "Nigeria’s #1 B2B marketplace for industrial equipment",
    images: ["/og-home.jpg"],
    url: "https://industrialmart.ng",
    type: "website",
  },
  alternates: { canonical: "https://industrialmart.ng" },
};

export default function Home() {
  // useEffect(() => {
  //   const getMe = async () => {
  //     console.log(await getMyProfile());
  //   };
  //   getMe();
  // }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center m-0 p-0">
      <HomeHeroSection />
      {/* <BusinessOpportunities /> */}
      <CategorySection />
      <FeatureSection />
      <CtaSection />
      {/* <Testimonial/> */}
    </main>
  );
}
