import CategorySection, { Product } from "@/components/organisms/CatSection";

const products: Product[] = [
  {
    id: "1",
    image: "/images/industrial-drill.png",
    name: "Bosch Industrial Hammer Drill Machine 850W",
    price: "₦145,000–₦165,000",
    minOrder: "1 piece",
  },
  {
    id: "2",
    image: "/images/welding-machine.png",
    name: "TIG/MMA Welding Machine 300A – Portable Heavy Duty",
    price: "₦220,000–₦250,000",
    minOrder: "1 set",
  },
  {
    id: "3",
    image: "/images/lathe-machine.png",
    name: "Precision Metal Lathe Machine 1.5m Bed Length",
    price: "₦2,450,000–₦2,800,000",
    minOrder: "1 unit",
  },
  {
    id: "4",
    image: "/images/hydraulic-pump.png",
    name: "Hydraulic Gear Pump for Industrial Equipment",
    price: "₦310,000–₦380,000",
    minOrder: "1 piece",
  },
  {
    id: "5",
    image: "/images/generator.png",
    name: "Perkins Diesel Generator 30kVA – Soundproof Enclosure",
    price: "₦7,850,000–₦8,200,000",
    minOrder: "1 unit",
  },
];

export default function CategoryPage() {
  return (
    // ✅ Add pt-24 to fix navbar overlap
    <main className="max-w-7xl mx-auto items-center justify-center px-4 py-10 pt-24">
      <CategorySection
        title="Safety & Security"
        categorySlug="safety-security"
        products={products}
      />
      <CategorySection
        title="Welding"
        categorySlug="welding"
        products={products}
      />
      <CategorySection
        title="Machining & Cutting Tools"
        categorySlug="machining-cutting-tools"
        products={products}
      />
      <CategorySection
        title="Industrial Pumps"
        categorySlug="industrial-pumps"
        products={products}
      />
      <CategorySection
        title="Hydraulic Equipment"
        categorySlug="hydraulic-equipment"
        products={products}
      />
      <CategorySection
        title="Power & Generators"
        categorySlug="power-generators"
        products={products}
      />
      <CategorySection
        title="Construction Tools"
        categorySlug="construction-tools"
        products={products}
      />
      <CategorySection
        title="Workshop Tools & Machines"
        categorySlug="workshop-tools-machines"
        products={products}
      />
    </main>
  );
}
