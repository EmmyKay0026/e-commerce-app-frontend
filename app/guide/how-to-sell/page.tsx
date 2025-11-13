// app/how to be a vendor/page.tsx
import React from "react";
import Link from "next/link";
import Hero from "@/components/organisms/SharedHeroSection";

export default function VendorPage() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title="How to Sell on IndustrialMart"
        subtitle="Ready to list your products and connect with buyers? Follow these
            simple steps to get started."
        backgroundImage="/hero-sections-img.png"
      />

      {/* Main Content */}
      <StartSellingContent />
    </main>
  );
}

/* Main content that sits under the hero */
function StartSellingContent() {
  return (
    <section className="bg-white relative z-20">
      {/* Section heading */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 text-center">
        <h2 className="lg:text-3xl text-2xl font-bold text-[#0861C1] mb-8">
          Steps to Sell
        </h2>
      </div>

      {/* === Step 1 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 1: Upload your product image
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Show customers exactly what you’re selling. Upload clear,
            <strong> high-quality images</strong> of your product and{" "}
            <strong> select the right category</strong> so buyers can easily
            find it. Tip: Use bright, uncluttered photos that highlight your
            product’s best features.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-selling-img.png"
            alt="Step 1 - Upload your product image"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 2 === */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 2: Your Business Location
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Add <strong> your business location</strong> so customers know where
            you operate from. This helps improve trust and makes delivery or
            pickup easier. Once you’ve entered your location,{" "}
            <strong> click Next</strong> to continue.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-selling-img(2).png"
            alt="Step 2 - Your Business Location"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 3 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 3: Set Your Product Price
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Add your <strong> product’s price details</strong> to help buyers
            make quick decisions. Choose your <strong> price type</strong>{" "}
            (fixed or negotiable) and select your <strong> sales type</strong>{" "}
            (wholesale or retail). Be sure your pricing reflects the value and
            quantity you’re offering.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-selling-img(3).png"
            alt="Step 3 - Set Your Product Price"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 4 === */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 4: Fill in Product Details
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Give your product <strong> a clear name and description</strong> so
            buyers understand exactly what you’re offering.{" "}
            <strong> Be specific</strong> about key features, materials, or
            uses, this helps your product stand out and builds buyer confidence.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-selling-img(4).png"
            alt="Step 4 - Fill in Product Details"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 5 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-12">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 5: Business Information
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Enter your <strong> business name and contact number</strong> so buyers can easily
            identify and reach you. Once everything looks good, click Next to
            continue.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-selling-img(5).png"
            alt="Step 5 - Business Information"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>
      {/* === Step 6=== */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 6: Submit Your Product
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            <strong> Review all your product details</strong> to make sure
            everything is accurate. Once you’re satisfied,{" "}
            <strong> click Submit Product</strong> to send it for review and get
            one step closer to selling on IndustrialMart.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-selling-img(6).png"
            alt="Step 4 - Submit Your Product"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      <div
        className="
    relative h-[50vh] flex flex-col items-center justify-center 
    w-full text-center px-4 overflow-hidden
    bg-cover bg-no-repeat bg-[position:center]
  "
        style={{
          backgroundImage: "url('/industrial-bg.png')",
        }}
      >
        {/* Overlay (Behind Content) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[rgba(8,97,193,0.9)] to-[rgba(0,0,0,0.1)]" />

        {/* === What Happens Next Section === */}
        <div className="max-w-3xl mx-auto text-center px-6 md:px-8 lg:px-12 relative z-10">
          <h3 className="text-xl md:text-4xl font-semibold text-white mb-4">
            What happens next
          </h3>
          <p className="text-base md:text-lg text-white leading-relaxed mb-6">
            After approval, your product will be visible to thousands of buyers
            across Nigeria. You'll start receiving inquiries and can manage your
            listings from your vendor dashboard.
            <br />
            Questions? Contact our vendor support team at{" "}
            <a
              href="mailto:support@industrialmart.ng"
              className="text-[#ffffff] font-medium underline"
            >
              <br />
              support@industrialmart.ng
            </a>
            .
          </p>
          <Link href={"/sell"}>
            <button className="bg-[#0861C1] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#074a96] transition">
              Start Selling
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
