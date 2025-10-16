"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { List } from "lucide-react";
import CategoriesModal from "../molecules/CategoriesModal";

const products = [
  {
    id: "1",
    name: "Nike Air Max",
    price: "$120",
    image: "/shoes1.jpg",
    href: "/products/1",
  },
  {
    id: "2",
    name: "Adidas Ultraboost",
    price: "$150",
    image: "/shoes2.jpg",
    href: "/products/2",
  },
  {
    id: "3",
    name: "Puma Running Shoes",
    price: "$90",
    image: "/shoes3.jpg",
    href: "/products/3",
  },
];

const HomeHeroSection = () => {
  const [showCategories, setShowCategories] = useState(false);

  return (
    <section className="relative w-full h-auto py-20 lg:py-0 lg:h-[100dvh] flex items-center px-5 md:px-10 lg:px-20 text-center">
      {/* Background */}
      <Image
        src="/oilandgas.jpeg"
        alt="Industrial Background"
        fill
        className="object-cover brightness-35"
      />

      {/* Content */}
      <div className="relative z-10 lg:text-left w-full lg:max-w-4xl text-white">
        <h2 className="font-bold text-3xl md:text-4xl lg:text-5xl">
          Your No.1 Marketplace For Quality Industrial Equipments
        </h2>
        <p className="mt-3 text-lg text-gray-100">
          A platform for easy buying and selling of industrial equipment across
          the oil & gas industrial sectors
        </p>

        {/* Search bar */}
        <div
          id="hero-search"
          className="mt-6 flex items-center gap-2 bg-white max-w-3xl text-lg rounded-3xl overflow-hidden"
        >
          <Input
            placeholder="Search products..."
            className="flex-1 border-none rounded-2xl focus:ring-0 focus:outline-none shadow-none focus:border-none text-black px-6"
          />
          <Button className="bg-secondary rounded-3xl hover:bg-primary m-1 text-white px-6 py-5">
            Search
          </Button>
        </div>

        {/* Categories button - left on mobile, centered on desktop */}
        <div className="mt-5 text-left">
          <Button
            onClick={() => setShowCategories(true)}
            className="cursor-pointer gap-1 hover:bg-white bg-transparent rounded-full hover:text-black text-white"
          >
            <List />
            Categories
          </Button>
          <Button
            onClick={() => setShowCategories(true)}
            className="cursor-pointer gap-1 hover:bg-white bg-transparent rounded-full hover:text-black text-white"
          >
            <List />
            Categories
          </Button>
          <Button
            onClick={() => setShowCategories(true)}
            className="cursor-pointer gap-1 hover:bg-white bg-transparent rounded-full hover:text-black text-white"
          >
            <List />
            Categories
          </Button>
          <Button
            onClick={() => setShowCategories(true)}
            className="cursor-pointer gap-1 hover:bg-white bg-transparent rounded-full hover:text-black text-white"
          >
            <List />
            Categories
          </Button>
        </div>
      </div>

      <CategoriesModal
        isOpen={showCategories}
        onClose={() => setShowCategories(false)}
      />
    </section>
  );
};

export default HomeHeroSection;