// components/organisms/CatSection.tsx
import Link from "next/link";

export interface Product {
  id: string;
  image: string;
  name: string;
  price?: string;
  minOrder?: string;
}

export interface CategorySectionProps {
  title: string;
  categorySlug?: string;
  products: Product[];
}

export default function CategorySection({
  title,
  categorySlug = "",
  products,
}: CategorySectionProps) {
  return (
    <section className="mb-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">{title}</h2>
        {categorySlug && (
          <Link
            href={`/category/${categorySlug}`}
            className="text-sm text-blue-600 hover:underline"
          >
            See more
          </Link>
        )}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {products.slice(0, 5).map((product) => (
          <div key={product.id} className="p-3 border rounded-md">
            <img src={product.image} alt={product.name} className="rounded-md" />
            <p className="mt-2 text-sm font-semibold">{product.name}</p>
            {product.price && (
              <p className="text-sm text-gray-600">{product.price}</p>
            )}
            {product.minOrder && (
              <p className="text-xs text-gray-500">Min: {product.minOrder}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
