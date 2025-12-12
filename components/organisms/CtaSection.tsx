"use client";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function CtaSection() {
  return (
    <section
      className="relative h-[60vh] flex flex-col items-center w-full justify-center text-center px-4"
      style={{
        backgroundImage: "url('/industrial-bg.webp')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-blue-900/50 backdrop-blur-sm" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl text-white">
        <h1 className="text-3xl md:text-5xl font-bold mb-3">
          Reliable Equipment Starts Here
        </h1>
        <p className="text-gray-200 mb-6">
          Whether you’re buying or selling, this is your hub for quality industrial tools.
        </p>

        {/* Search Bar was changed to Call to action button*/}
        <div>
          {/* <Input
            type="text"
            placeholder="Search products..."
            className="bg-transparent border-none text-white placeholder:text-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 focus:ring-0 focus:outline-none shadow-none focus:border-none"
          /> */}
          <div className="flex justify-center gap-4">
            <Link href={"/marketplace"}className="font-semibold px-6 py-3 shadow-md transition bg-[#c68311] hover:bg-[#a86f0e] text-white rounded-full">
              Visit Market Place
            </Link>
            <Link href={"/sell"}className="ml-2 md:ml-4 text-sm font-semibold px-6 py-3 shadow-md transition bg-transparent border-2 border-white-900 hover:bg-white text-white hover:text-gray-900 rounded-full">
              Start Selling
            </Link>
          </div>
          
          
        </div>
      </div>
    </section>
  );
}
