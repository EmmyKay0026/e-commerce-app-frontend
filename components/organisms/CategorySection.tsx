import React from 'react'

const CategorySection = () => {
  return (
    <section className="">
      <div className="text-center bg-primary py-15 items-center justify-center px-5 md:px-10 lg:px-60">
        <h3 className="font-bold text-white text-3xl md:text-4xl text-5xl">Our Product Categories</h3>
        <p className="text-lg mt-5 text-white">At INDUSTRIAL MART NIGERIA NIG LTD, we offer a comprehensive selection of high-quality industrial equpiment and tools. From cutting-edge Machinery to essential maintenance tools, our products are tailored to meet the demands of the oil & gas, manufacturing, and industrial sectors. Explore our categories to find the right solutions for your business</p>
      </div>
      <div className="grid grid-cols-3 my-15 px-5 md:px-10 lg:px-20 sm:grid-cols-6 md:grid-cols-8 gap-2 md:gap-4 lg:gap-6 text-center">
        {[
          "Environment",
          "Consumer Electronics",
          "Home & Garden",
          "Commercial Equipment",
          "Beauty",
          "Jewelry",
          "Industrial Machinery",
          "Business Services",
          "Apparel & Accessories",
          "Sports",
          "Vehicle Parts",
          "Packaging",
          "Tools & Hardware",
          "Toys",
        ].map((cat, i) => (
          <div key={i} className="flex flex-col items-center py-5 space-y-2">
            <div className="w-16 h-16 flex items-center justify-center rounded-full border border-grayCustom">
              <span className="text-2xl text-primary">📦</span>
            </div>
            <span className="text-sm text-grayCustom">{cat}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default CategorySection
