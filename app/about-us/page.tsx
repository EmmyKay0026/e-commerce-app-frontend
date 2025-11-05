// app/about/page.tsx
import React from "react";

export default function AboutPage() {
  return (
    <main>
      <HeroSection />
      <AboutContent />
    </main>
  );
}

/* Hero section — fixed height at top (not full screen) */
function HeroSection() {
  return (
    <section
      aria-label="About IndustrialMart hero"
      className="relative h-[60vh] flex flex-col items-center w-full justify-center text-center px-4"
      style={{
        backgroundImage: "url('/industrial-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-r from-[rgba(8,97,193,0.75)] to-[rgba(0, 0, 0, 0.1)]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8 lg:px-12 h-full flex items-center justify-center text-center">
        <div className="w-full md:w-3/4 lg:w-2/3 text-white">
          <h1 className="text-2xl md:text-3xl lg:text-5xl font-extrabold leading-tight">
            Leading Marketer of Industrial Equipment &amp; Tools in Nigeria.
          </h1>
          <p className="mt-2 text-sm md:text-base text-white/90 max-w-xl mx-auto">
            Explore our range of equipment and tools for Oil &amp; Gas,
            Manufacturing, Construction and other industrial sectors.
          </p>
        </div>
      </div>
    </section>
  );
}

/* Main content that sits under the hero */
function AboutContent() {
  return (
    <section className="bg-white -mt-8 relative z-20">
      <div className="max-w-5xl mx-auto px-6 md:px-8 lg:px-12 py-12 md:py-16 text-center">
        <h2 className=" lg:text-3xl text-2xl font-bold text-slate-900 mb-8">
          At INDUSTRIAL MART NIGERIA NIG LTD
        </h2>

        <div className="text-slate-700 max-w-3xl mx-auto space-y-6">
          <p className="text-base md:text-lg">
            We are proud to be a leading marketplace for top-quality industrial
            equipment and tools, connecting buyers and sellers across Nigeria's
            oil & gas industries and other vital industrial sectors. With an
            unwavering commitment to excellence, we provide a platform where
            buyers find the products they need and sellers reach the right
            customers to grow their business.
          </p>

          <p className="text-base md:text-lg">
            Our marketplace features state-of-the-art industrial machinery,
            tools, and accessories from verified suppliers, ensuring superior
            performance, safety, and efficiency in every task. Whether you are
            buying equipment for oil exploration, manufacturing, or industrial
            maintenance, or selling to contractors, MRO teams, and industrial
            operators, we have the right solutions to support your needs.
          </p>

          <p className="text-base md:text-lg">
            Backed by a team of experts and strategic partnerships with trusted
            global brands, INDUSTRIAL MART NIGERIA NIG LTD is dedicated to
            offering tailored services, competitive pricing, and support that
            ensures the continued success of both buyers and sellers. As we
            continue to innovate and expand, our goal remains to connect the
            Nigerian industrial landscape with world-class tools and equipment,
            elevating industry standards and driving growth for all.
          </p>
        </div>
      </div>
      <div
        className="relative h-[40vh] flex flex-col items-center justify-center w-full text-center px-4 overflow-hidden"
        style={{
          backgroundImage: "url('/industrial-bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay (Behind Content) */}
        <div className="absolute inset-0 z-0 bg-gradient-to-r from-[rgba(8,97,193,0.75)] to-[rgba(0,0,0,0.1)]" />

        {/* Content (On Top) */}
        <div className="relative z-10">
          <h1 className="mb-6 text-2xl md:text-3xl lg:text-4xl font-extrabold leading-tight text-white">
            Enjoy seamless buying and selling today!
          </h1>

          <button className="font-semibold px-6 py-3 shadow-md transition bg-[#c68311] hover:bg-[#a86f0e] text-white rounded-full">
            Talk to an expert
          </button>
        </div>
      </div>
    </section>
  );
}
