"use client"

import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FeatureSection = () => {
  return (   
    <section className="w-full bg-primary ">
      <h1 className="text-3xl md:text-5xl text-center text-white pt-10 font-bold mb-3">
        Why Choose Us?
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 px-5 md:px-10 lg:px-20 text-white">
        {[
          {
            title: "Millions of business offerings",
            desc: "Explore products and suppliers from millions of offerings worldwide.",
          },
          {
            title: "Assured quality and transactions",
            desc: "Ensure production quality from verified suppliers, with your orders protected from payment to delivery.",
          },
          {
            title: "One-stop trading solution",
            desc: "Order seamlessly from product/supplier search to order management, payment, and fulfillment.",
          },
          {
            title: "Tailored trading experience",
            desc: "Get curated benefits, discounts, and extra support to grow your business.",
          },
        ].map((item, idx) => (
          <Card key={idx} className="backdrop-blur-md bg-white/10 border border-white/20 rounded-xl shadow-sm text-gray-900 border-none">
            <div className="w-12 h-12 flex items-center justify-center ml-5 rounded-full border border-grayCustom">
              <span className="text-2xl text-white">📦</span>
            </div>
            <CardHeader>
              <CardTitle className="text-lg text-white">{item.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-white">{item.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
        
  )
}
export default FeatureSection;