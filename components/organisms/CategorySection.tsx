"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp } from "lucide-react";
import { slugify } from "@/lib/utils";
import { demoCategories, demoProducts } from "@/constants/product";
import ProductCards from "../molecules/ProductCards";

const CategorySection = () => {
  // Default to the first category
  const [selectedCategory, setSelectedCategory] = useState(
    demoCategories[0].name
  );
  const [showCategories, setShowCategories] = useState(false);

  // Get the currently selected category and its products
  const currentCategory = demoCategories.find(
    (cat) => cat.name === selectedCategory
  );
  const products = demoProducts.filter(
    (p) => p.categoryId === currentCategory?.id
  );

  return (
    <section className="bg-gray-50 w-full max-w-[100dvw] py-16">
      {/* Header */}
      <div className="text-center mb-10 px-5 md:px-10">
        <h3 className="font-bold text-gray-900 text-3xl md:text-4xl">
          Our Product Categories
        </h3>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          Explore our range of high-quality products, designed to meet your
          needs across various categories.
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
            {demoCategories.map((cat) => (
              <li
                key={cat.id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`cursor-pointer px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === cat.name
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                {cat.name}
              </li>
            ))}
          </ul>
        </aside>

        {/* Mobile Dropdown */}
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
              {demoCategories.map((cat) => (
                <li
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.name);
                    setShowCategories(false);
                  }}
                  className={`cursor-pointer px-4 py-3 text-sm font-medium transition-all ${
                    selectedCategory === cat.name
                      ? "bg-blue-100 rounded-full text-blue-700"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
                >
                  {cat.name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="md:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-xl font-bold text-gray-900">
              {selectedCategory}
            </h4>
            {currentCategory && (
              <Link
                href={`/category/${slugify(currentCategory.name)}`}
                className="text-sm text-blue-600 hover:underline font-medium"
              >
                See more →
              </Link>
            )}
          </div>

          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCards key={product.id} product={product} />
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
