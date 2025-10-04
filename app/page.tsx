import CategorySection from "@/components/organisms/CategorySection";
import FeatureSection from "@/components/organisms/FeatureSection";
import HomeHeroSection from "@/components/organisms/HomeHeroSection";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center m-0 p-0">
      <HomeHeroSection/>
      <FeatureSection/>
      <CategorySection/>
    </main>
  );
}
