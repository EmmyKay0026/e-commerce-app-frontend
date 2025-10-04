"use client"

import Image from "next/image"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const FeatureSection = () => {
  return (   
    <section className="grid grid-cols-1 md:grid-cols-4 gap-6 py-12 px-5 md:px-10 lg:px-20 bg-gray text-white">
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
        <Card key={idx} className="bg-white text-gray-900 border-none shadow-none">
          <div className="w-12 h-12 flex items-center justify-center ml-5 rounded-full border border-grayCustom">
            <span className="text-2xl text-primary">📦</span>
          </div>
          <CardHeader>
            <CardTitle className="text-lg">{item.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-700">{item.desc}</p>
          </CardContent>
        </Card>
      ))}
    </section>    
  )
}
export default FeatureSection;