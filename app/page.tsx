"use client";
import CategorySection from "@/components/organisms/CategorySection";
import FeatureSection from "@/components/organisms/FeatureSection";
import HomeHeroSection from "@/components/organisms/HomeHeroSection";
import Testimonial from "@/components/organisms/Testimonial";
import CtaSection from "@/components/organisms/CtaSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import BusinessOpportunities from "../components/organisms/BusinessOpp";
import { getMyProfile } from "@/services/userService";
import { useEffect } from "react";

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
