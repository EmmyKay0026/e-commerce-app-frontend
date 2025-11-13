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
        backgroundImage="/hero-sections-img.webp"
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
            Enter your <strong>Business Name</strong> (e.g., John Ventures)
            Next, choose a<strong> Business Slug</strong>, which serves as your
            unique web address on IndustrialMart. It appears as
            “industrialmart.ng/shop/your-slug”.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/creating-a-business-acct-img.png"
            alt="Step 1 - Vendor Identity"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 2 === */}
      <div className="relative z-20 flex flex-col md:flex-row-reverse items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 2: Business Description
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Briefly <strong> describe what your business offers</strong>.
            Highlight your key products, services, or specialties to attract the
            right customers. Clear descriptions help customers understand your
            brand and attract the right buyers.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/creating-a-business-acct-img(2).png"
            alt="Step 2 - Business Description"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 3 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-16">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 3: Upload Your Business Cover Photo
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Add a <strong> high-quality image</strong> that represents your
            business. This could be a logo, storefront, warehouse, or images of
            your products. This photo will appear on your vendor profile, so
            choose something
            <strong> professional</strong> that helps buyers recognize your
            brand.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/creating-a-business-acct-img(3).png"
            alt="Step 3 - cover photo Upload"
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
            Provide your business contact details so customers can easily reach
            you. Enter your{" "}
            <strong> email, phone number, and WhatsApp number</strong>. Note:
            Your email can’t be changed later, so ensure it’s correct.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/creating-a-business-acct-img(4).png"
            alt="Step 4 - Stay Connected"
            className="w-full max-w-sm h-auto rounded-lg shadow-md object-cover"
          />
        </div>
      </div>

      {/* === Step 5 === */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-center gap-10 max-w-6xl mx-auto px-6 md:px-8 lg:px-12 mb-12">
        <div className="md:w-3/5 text-left">
          <h2 className="text-xl md:text-2xl font-semibold text-[#0861C1] mb-4">
            Step 5: Start Selling.
          </h2>
          <p className="text-base md:text-lg text-black/90 leading-relaxed">
            Enter <strong> your business address</strong> to complete your registration. Once
            done, <strong> click “Create Business Account”</strong> to finish setting up your
            vendor profile and start selling on IndustrialMart.
          </p>
        </div>
        <div className="md:w-2/5 flex justify-center">
          <img
            src="/creating-a-business-acct-img(5).png"
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
          backgroundImage: "url('/industrial-bg.webp')",
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
              href="mailto:vendorsupport@industrialmart.ng"
              className="text-[#ffffff] font-medium underline"
            >
              <br />
              support@industrialmart.ng
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
