import ProductCards from "@/components/molecules/ProductCards";
import ProductList from "@/components/molecules/ProductList";
import CategoryCards from "@/components/organisms/CategoryCards";
import { demoProducts } from "@/constants/product";
import React from "react";

const MarketPlace = () => {
  return (
    <>
      <CategoryCards
        categoryTitle="Lighting and Electricals"
        categoryProduct={demoProducts}
      />
      <div className="h-4" />
      <CategoryCards
        categoryTitle="Measurement tools and equipment's"
        categoryProduct={demoProducts}
      />
      <div className="h-4" />
      <CategoryCards
        categoryTitle="Safety & Security"
        categoryProduct={demoProducts}
      />
      <div className="h-4" />
      {/* <ProductList product={demoProducts[3]} /> */}
    </>
  );
};

export default MarketPlace;
