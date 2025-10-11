"use client";
import { demoProducts } from "@/constants/product";
import React from "react";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/styles.min.css";

const ZoomImageComponent = () => {
  return (
    <InnerImageZoom
      src={demoProducts[0].images[0]}
      zoomSrc={demoProducts[0].images[0]}
      zoomType="hover"
      zoomPreload={true}
    />
  );
};

export default ZoomImageComponent;
