"use client";

import Image from "next/image";
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { LifeBuoy, Wrench, Sliders, ShieldCheck, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  return (
    <section className="w-full bg-primary ">
      <h1 className="text-3xl md:text-5xl text-center text-white pt-10 font-bold mb-3">
        Why Choose Us?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 px-5 md:px-5 lg:px-30 text-white">
        {[
          {
            icon: <Wallet className="w-8 h-8 text-[#ffffff]" />,
            title: "Fair Pricing",
            desc: "Get certified tools and machinery at reasonable prices without compromising on quality.",
          },
          {
            icon: <Wrench className="w-8 h-8 text-[#ffffff]" />,
            title: "After-sales support",
            desc: "Get all the technical help you may need after purchasing a product.",
          },
          {
            icon: <Sliders className="w-8 h-8 text-[#ffffff]" />,
            title: "Tailored services",
            desc: "Whether you're running a refinery, managing a construction site, or maintaining oil rigs, we match equipment to your specific needs.",
          },
          {
            icon: <ShieldCheck className="w-8 h-8 text-[#ffffff]" />,
            title: "Safety and efficiency",
            desc: "Get equipment that meets compliance standards and keeps your team protected without slowing down operations.",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-sm text-gray-900 border-none"
          >
            <div className="w-12 h-12 flex items-center justify-center ml-5 rounded-full border border-grayCustom">
              {item.icon}
            </div>
            <CardHeader>
              <CardTitle className="text-lg text-white">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
export default FeatureSection;
