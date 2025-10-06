"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CtaSection = () => {
  return (
    <section className="bg-secondary text-white py-20 text-center w-full px-4">
      <h1 className="text-3xl md:text-5xl font-bold mb-4">
        Ready to Equip Your Industry?
      </h1>
      <p className="text-sm md:text-lg mb-8">
        Join 10,000+ professionals who source their equipment from IndustrialMart
      </p>
      <div className="flex justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full">
          Search
        </Button>
      </div>
    </section>
  );
}
export default CtaSection