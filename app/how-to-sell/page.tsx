// app/how to be a vendor/page.tsx
import React from "react";

export default function VendorPage() {
  return (
    <main>
      <HeroSection />
      <StartSellingContent />
    </main>
  );
}

/* Hero section */
function HeroSection() {
  return (
    <section
      aria-label="About IndustrialMart hero"
      className="relative h-[40vh] flex flex-col items-center w-full justify-center text-center px-4"
      style={{
        backgroundImage: "url('/industrial-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,97,193,0.75)] to-[rgba(0, 0, 0, 0.1)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 h-full flex items-center justify-center text-center">
        <div className="text-white">
          <h1 className="text-2xl md:text-5xl lg:text-6xl font-extrabold">
            How to Sell on IndustrialMart
          </h1>
          <p className="mt-2 text-1xl md:text-1.5xl lg:text-2xl text-white/90 max-w-xl mx-auto">
            Ready to list your products and connect with buyers? Follow these
            simple steps to get started.
          </p>
        </div>
      </div>
    </section>
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
            Add a clear, <strong>high-quality photo</strong> of the product you're selling. Make
            sure the image shows the product clearly so buyers know exactly what
            they're getting.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-to-sell.png"
            alt="Step 1 - Vendor Identity"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 2 === */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 2: Select your product category
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Choose the <strong>category</strong> that best matches your product (e.g., Safety
            Equipment, Machinery, Tools, Lubricants). This helps buyers find
            your product when they search.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-to-sell(2).png"
            alt="Step 2 - Business Slug"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 3 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 3: Add your location
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Enter the <strong>location</strong> where the product is available. This helps buyers
            know where the item is coming from and estimate delivery times.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-to-sell(3).png"
            alt="Step 3 - Product Upload"
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
            Complete all the information based on the category you selected.
            Enter a <strong>clear product name</strong> and write a detailed description that
            highlights key features and specifications. Set a fair price in
            Naira, choose your <strong>sales type</strong> (wholesale or retail), and let buyers
            know if your price is negotiable or fixed. Double-check everything
            before moving to the next step.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-to-sell(4).png"
            alt="Step 4 - Business Verification"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 5 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-12">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 5: Add Your Contact Information
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Provide your <strong>phone number</strong> and <strong>WhatsApp number</strong> so buyers can reach
            you directly for inquiries and orders.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-to-sell(5).png"
            alt="Step 5 - Start Selling"
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
            Once you've filled in all the details, <strong>click submit</strong>. Our team will
            review your product listing to ensure it meets our quality standards. 
            This usually take 1-2 business days and we'll notify you
            via email once your product is approved and live on the marketplace.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/start-to-sell(6).png"
            alt="Step 4 - Business Verification"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === What Happens Next Section === */}
      <div className="max-w-3xl mx-auto text-center px-6 md:px-8 lg:px-12 pb-20">
        <h3 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
          What happens next
        </h3>
        <p className="text-base md:text-lg text-black/90 leading-relaxed mb-6">
          After approval, your product will be visible to thousands of buyers
          across Nigeria. You'll start receiving inquiries and can manage your
          listings from your vendor dashboard.
          <br />
          Questions? Contact our vendor support team at{" "}
          <a
            href="mailto:vendorsupport@industrialmart.com"
            className="text-[#0861C1] font-medium underline"
          >
            examplesupport@industrialmart.com
          </a>
          .
        </p>
        <button className="bg-[#0861C1] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#074a96] transition">
          Start Selling
        </button>
      </div>
    </section>
  );
}
