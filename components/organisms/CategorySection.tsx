"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CategoryName } from "@/types/models";
import { slugify } from "@/lib/utils";

interface Product {
  name: string;
  price: string;
  img: string;
}

const categories: CategoryName[] = [
  "Environment",
  "Consumer Electronics",
  "Home & Garden",
  "Commercial Equipment",
  "Beauty",
  "Jewelry",
  "Industrial Machinery",
  "Business Services",
  "Apparel & Accessories",
  "Sports",
  "Vehicle Parts",
  "Packaging",
  "Tools & Hardware",
  "Toys",
];

const sampleProducts: Partial<Record<CategoryName, Product[]>> = {
  Environment: [
    {
      name: "Solar Panel Kit",
      price: "$300",
      img: "https://industrialmartnigeria.com/wp-content/uploads/2024/09/hoist10500kg-1-600x600.webp",
    },
    {
      name: "Air Purifier",
      price: "$150",
      img: "https://industrialmartnigeria.com/wp-content/uploads/2024/09/bosch-twist-drill-bits-co14b-64_1000-600x600.webp",
    },
  ],
  "Consumer Electronics": [
    {
      name: "Industrial Drone",
      price: "$1,200",
      img: "https://industrialmartnigeria.com/wp-content/uploads/2024/09/ofite-machined-metal-mud-balance-500x500-1.jpg",
    },
    {
      name: "Smart Controller",
      price: "$250",
      img: "https://industrialmartnigeria.com/wp-content/uploads/2024/09/1-fotor-202409040615.png",
    },
  ],
  "Industrial Machinery": [
    {
      name: "Hydraulic Press",
      price: "$2,500",
      img: "https://industrialmartnigeria.com/wp-content/uploads/2024/09/main-qimg-aa51dc1a730d035fc7e3fb3e5311bab0-lq-fotor-202409040919.png",
    },
    {
      name: "Lathe Machine",
      price: "$1,800",
      img: "https://industrialmartnigeria.com/wp-content/uploads/2024/09/aodd-pump-1-2-bsp-15mm--300x300.jpg",
    },
  ],
};

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] = useState<CategoryName>(
    "Industrial Machinery"
  );
  const [showCategories, setShowCategories] = useState(false);

  const products = sampleProducts[selectedCategory] ?? [];

  return (
    <section className="bg-gray-50 w-full py-16">
      {/* Header */}
      <div className="text-center mb-10 px-5 md:px-10">
        <h3 className="font-bold text-gray-900 text-3xl md:text-4xl">
          Our Product Categories
        </h3>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our wide range of high-quality industrial equipment and tools,
          designed to meet the needs of various sectors.
        </p>
      </div>

      <div className="w-full mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8 px-5 md:px-10 lg:px-20">
        {/* Sidebar (desktop) */}
        <aside
          className="
            hidden lg:block
            bg-white shadow-md rounded-2xl
            sticky top-20
            p-4 border border-gray-100
            max-h-[calc(100vh-5rem)]
            overflow-y-auto
            scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent
          "
        >
          <h4 className="font-semibold text-lg mb-4 text-gray-800">
            Categories
          </h4>
          <ul className="space-y-2">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Dropdown for Categories */}
        <div className="block lg:hidden w-full">
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="w-full flex items-center justify-between bg-white border border-gray-200 rounded-xl p-3 font-medium text-gray-800 shadow-sm"
          >
            <span>{selectedCategory}</span>
            {showCategories ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>

          {showCategories && (
            <ul className="mt-3 bg-white border border-gray-200 rounded-xl absolute py-3 z-10 px-5 shadow-md max-h-[300px] overflow-y-auto">
              {categories.map((cat) => (
                <li
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowCategories(false);
                  }}
                  className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all ${
                    selectedCategory === cat
                      ? "bg-blue-100 rounded-full text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          {/* Category title with "See more" link */}
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-900">
              {selectedCategory}
            </h4>
            <Link
              href={`/category/${slugify(selectedCategory)}`}
              className="text-sm text-blue-600 hover:underline font-medium"
            >
              See more →
            </Link>
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {products.map((product, index) => (
                <Link
                  href={"/product/prod-5"}
                  key={index}
                  className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-36 sm:h-40">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h5 className="font-semibold text-gray-900 text-sm">
                      {product.name}
                    </h5>
                    <p className="text-blue-600 text-sm font-medium mt-1 sm:mt-2">
                      {product.price}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
