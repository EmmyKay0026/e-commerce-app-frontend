"use client";

import Image from "next/image";
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { LifeBuoy, Wrench, Sliders, ShieldCheck, Wallet } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FeatureSection = () => {
  return (
    <section className="w-full pb-10 bg-linear-to-r from-blue-100 via-[#f6f5f5] to-blue-100">
      <h1 className="text-3xl md:text-5xl text-center text-gray-900 pt-10 font-bold mb-3">
        Why Choose Us?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-10 py-12 px-5 md:px-5 lg:px-30 text-gray-900">
        {[
          {
            icon: <Wallet className="w-8 h-8 text-gray-900" />,
            title: "Fair Pricing",
            desc: "Get certified tools and machinery at reasonable prices without compromising on quality.",
          },
          {
            icon: <Wrench className="w-8 h-8 text-gray-900" />,
            title: "After-sales support",
            desc: "Get all the technical help you may need after purchasing a product.",
          },
          {
            icon: <Sliders className="w-8 h-8 text-gray-900" />,
            title: "Tailored services",
            desc: "Whether you're running a refinery, managing a construction site, or maintaining oil rigs, we match equipment to your specific needs.",
          },
          {
            icon: <ShieldCheck className="w-8 h-8 text-gray-900" />,
            title: "Safety and efficiency",
            desc: "Get equipment that meets compliance standards and keeps your team protected without slowing down operations.",
          },
        ].map((item, idx) => (
          <Card
            key={idx}
            style={{ boxShadow: "1px 8px 40px -10px rgba(0, 0, 0, 0.1)" }}
            className="backdrop-blur-md text-center bg-white border-none rounded-xl text-gray-900 border-none"
          >
            <div className="w-20 h-20 flex items-center justify-center rounded-full border border-gray-900 mx-auto">
              {item.icon}
            </div>

            <CardHeader>
              <CardTitle className="text-3xl text-gray-900">{item.title}</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-lg text-gray-900">{item.desc}</p>
            </CardContent>
          </Card>

        ))}
      </div>
    </section>
  );
};
export default FeatureSection;
