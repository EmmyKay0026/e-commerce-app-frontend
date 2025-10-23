import ProductCards from "@/components/molecules/ProductCards";
import ProductList from "@/components/molecules/ProductList";
import CategoryCards from "@/components/organisms/CategoryCards";
import { demoProducts } from "@/constants/product";
import React from "react";

const MarketPlace = () => {
  return (
    <div className="max-w-[100dvw] w-full">
      <CategoryCards
        categoryTitle="Safety & Security"
        categoryProduct={demoProducts}
        categoryLink="/category/safety-security"
      />
      <div className="h-4" />
      <CategoryCards
        categoryTitle="Lighting and Electricals"
        categoryProduct={demoProducts}
        categoryLink="/category/lighting-electricals"
      />
      <div className="h-4" />
      <CategoryCards
        categoryTitle="Measurement tools and equipment's"
        categoryProduct={demoProducts}
        categoryLink="/category/measurement-tools-equipment"
      />
      <div className="h-4" />

      {/* <ProductList product={demoProducts[3]} /> */}
    </div>
  );
};

export default MarketPlace;
