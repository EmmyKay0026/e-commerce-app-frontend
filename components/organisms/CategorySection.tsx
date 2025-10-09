"use client";
import React, { useState } from "react";
import Image from "next/image";

interface Product {
  name: string;
  price: string;
  img: string;
}

type CategoryName =
  | "Environment"
  | "Consumer Electronics"
  | "Home & Garden"
  | "Commercial Equipment"
  | "Beauty"
  | "Jewelry"
  | "Industrial Machinery"
  | "Business Services"
  | "Apparel & Accessories"
  | "Sports"
  | "Vehicle Parts"
  | "Packaging"
  | "Tools & Hardware"
  | "Toys";

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
    { name: "Solar Panel Kit", price: "$300", img: "/products/solar.jpg" },
    { name: "Air Purifier", price: "$150", img: "/products/airpurifier.jpg" },
  ],
  "Consumer Electronics": [
    { name: "Industrial Drone", price: "$1,200", img: "/products/drone.jpg" },
    { name: "Smart Controller", price: "$250", img: "/products/controller.jpg" },
  ],
  "Industrial Machinery": [
    { name: "Hydraulic Press", price: "$2,500", img: "/products/press.jpg" },
    { name: "Lathe Machine", price: "$1,800", img: "/products/lathe.jpg" },
  ],
};

const CategorySection = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryName>("Industrial Machinery");

  const products = sampleProducts[selectedCategory] ?? [];

  return (
    <section className="bg-gray-50 w-full py-16">
      {/* Section Header */}
      <div className="text-center mb-12 px-5 md:px-10">
        <h3 className="font-bold text-gray-900 text-3xl md:text-4xl">
          Our Product Categories
        </h3>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our wide range of high-quality industrial equipment and tools,
          designed to meet the needs of various sectors.
        </p>
      </div>

      {/* Main Layout */}
      <div className="w-full mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-5 md:pr-10 lg:pr-20">
        {/* Sidebar */}
        <aside className="bg-white shadow-md rounded-2xl p-4 md:sticky md:top-20 h-fit border border-gray-100">
          <h4 className="font-semibold text-lg mb-4 text-gray-800">Categories</h4>
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

        {/* Products Grid */}
        <div className="md:col-span-3">
          <h4 className="text-xl font-bold text-gray-900 mb-6">
            {selectedCategory}
          </h4>
          {products.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product: Product, index: number) => (
                <div
                  key={index}
                  className="bg-white shadow-sm border border-gray-100 rounded-2xl overflow-hidden hover:shadow-lg transition-all"
                >
                  <div className="relative w-full h-40">
                    <Image
                      src={product.img}
                      alt={product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h5 className="font-semibold text-gray-900 text-sm">
                      {product.name}
                    </h5>
                    <p className="text-blue-600 text-sm font-medium mt-2">
                      {product.price}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">
              No products found for this category.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
