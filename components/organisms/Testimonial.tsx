"use client";

import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface TestimonialData {
  name: string;
  title: string;
  quote: string;
  image: string;
}

const testimonials: TestimonialData[] = [
  {
    name: "Eva Jane",
    title: "Founder of Eva Jane Beauty",
    quote:
      "As an entrepreneur who is deeply involved in the Beauty industry, I have been very devoted to creating my original products. Alibaba.com has been my trusted partner in this process.",
    image: "/eva-jane.jpg",
  },
  {
    name: "Michael Ade",
    title: "CEO of SteelPro Nigeria",
    quote:
      "IndustrialMart has made sourcing equipment so easy. Their customer support and fast delivery times have really boosted our operations.",
    image: "/michael-ade.jpg",
  },
  {
    name: "Aisha Bello",
    title: "Procurement Manager, Oil & Gas Co.",
    quote:
      "We've relied on IndustrialMart for years — their range of industrial tools is unmatched, and their service is always dependable.",
    image: "/aisha-bello.jpg",
  },
];

export default function Testimonial() {
  return (
    <section className="bg-gray-100 w-full py-16 px-4">
      <div className="max-w-5xl mx-auto">
        <Carousel className="w-full">
          <CarouselContent>
            {testimonials.map((t, index) => (
              <CarouselItem key={index}>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6 p-8 rounded-xl shadow-md bg-white">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={120}
                    height={120}
                    className="rounded-full object-cover"
                  />
                  <div className="text-center md:text-left max-w-2xl">
                    <h3 className="font-semibold text-lg">{t.name}</h3>
                    <p className="text-gray-500 mb-2">{t.title}</p>
                    <p className="text-gray-700 italic">“{t.quote}”</p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Carousel arrows */}
          <CarouselPrevious className="left-2 md:left-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2" />
          <CarouselNext className="right-2 md:right-6 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full p-2" />
        </Carousel>
      </div>
    </section>
  );
}
