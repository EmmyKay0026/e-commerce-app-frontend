// app/how to be a vendor/page.tsx
import React from "react";
import Link from "next/link";
import Hero from "@/components/organisms/SharedHeroSection";

export default function VendorPage() {
  return (
    <main>
      {/* Reusable Hero Component */}
      <Hero
        title=" How to become a Vendor"
        subtitle="Ready to reach thousands of industrial buyers across Nigeria? Here's
            what you need to get started."
        backgroundImage="/hero-sections-img.png"
      />

      {/* Main Content */}
      <BeVendorContent />
    </main>
  );
}

/* Main content that sits under the hero */
function BeVendorContent() {
  return (
    <section className="bg-white relative z-20">
      {/* Section heading */}
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-8 md:py-16 text-center">
        <h2 className="lg:text-3xl text-2xl font-bold text-[#0861C1] mb-8">
          Steps to Apply
        </h2>
      </div>

      {/* === Step 1 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 1: Vendor Identity
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Enter your <strong>Full Name</strong>. This will be our primary
            point of contact for the account. Provide your official{" "}
            <strong>Business Name</strong> (e.g., John Ventures). This is how
            your business will be displayed on the marketplace.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/be-a-vendor-img.png"
            alt="Step 1 - Vendor Identity"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 2 === */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 2: Your Unique URL
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Your <strong>Business slug</strong> is your unique web address on
            IndustrialMart. It appears as “industrialmart.com/vendor/your-slug”.
            Choose something short and memorable{" "}
            <strong>based on your business name</strong>. Use only lowercase
            letters, numbers, and hyphens.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/be-a-vendor-img(2).png"
            alt="Step 2 - Business Slug"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 3 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 3: Account Access
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Provide a <strong>working business email</strong> where we can reach
            you. You'll receive notifications about orders, inquiries, and
            account updates here, so make sure you have access to this email.
            We'll also use it to verify your account.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/be-a-vendor-img(3).png"
            alt="Step 3 - Product Upload"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 4 === */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 4: Stay Connected
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Enter a valid <strong>Phone Number</strong>. And also enter your{" "}
            <strong>WhatsApp Number</strong> so buyers can contact you directly
            for immediate inquiries and quick order follow-ups.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/be-a-vendor-img(4).png"
            alt="Step 4 - Business Verification"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 5 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-12">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 5: Complete your profile and send us your application.
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Add a <strong>high-quality image</strong> that represents your
            business. This could be a logo, storefront, warehouse, or images of
            your products. <strong>Click Submit</strong> to finalize and send
            your application. Our team will review your application within 2–3
            business days and notify you immediately via email once your vendor
            status is approved.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/be-a-vendor-img(5).png"
            alt="Step 5 - Start Selling"
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
            After approval, you can log in to your vendor dashboard and start
            adding products, setting prices, and connecting with buyers.
            <br />
            Questions? Contact our vendor support team at{" "}
            <a
              href="mailto:vendorsupport@industrialmart.com"
              className="text-[#ffffff] font-medium underline"
            >
              examplesupport@industrialmart.com
            </a>
            .
          </p>
          <Link href={"/create-business-account"}>
            <button className="bg-[#0861C1] text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-[#074a96] transition">
              Become a Vendor
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
