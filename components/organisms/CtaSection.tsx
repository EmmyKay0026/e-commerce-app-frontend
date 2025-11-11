"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section
      className="relative h-[60vh] flex flex-col items-center w-full justify-center text-center px-4"
      style={{
        backgroundImage: "url('/industrial-mart-img.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Ready to Equip Your Industry?
        </h1>
        <p className="text-gray-200 mb-6">
          Join 10,000+ professionals who source their equipment from
          IndustrialMart
        </p>

        {/* Search Bar was changed to Call to action button*/}
        <div>
          {/* <Input
            type="text"
            placeholder="Search products..."
            className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none shadow-none focus:border-none"
          /> */}
          <Button className="bg-[#c68311] hover:bg-[#a86f0e] text-[18px] text-white rounded-full px-10  py-5">
            Start selling
          </Button>
        </div>
      </div>
    </section>
  );
}
