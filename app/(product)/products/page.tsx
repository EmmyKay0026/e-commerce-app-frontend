import React from "react";
import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCards";
import { listProducts } from "@/services/productService";
import { Product } from "@/types/models";

// app/(product)/products/search/page.tsx

type SearchParams = {
  q?: string;
  sort?: string;
  page?: string;
  perPage?: string;
};

export default async function Page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = searchParams?.q ?? "";
  const sort = searchParams?.sort;
  const page = Math.max(1, Number(searchParams?.page ?? 1));
  const perPage = Math.max(1, Number(searchParams?.perPage ?? 12));

  // request the backend using the listProducts service
  const res = await listProducts({
    q: q || undefined,
    sort: sort || undefined,
    page,
    perPage,
  });

  if (!res.success) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-4">Search results</h1>
        <p className="text-red-600">Failed to load products: {res.error}</p>
      </div>
    );
  }

  const products: Product[] = res.data?.products ?? [];
  const total = res.data?.total ?? null;
  const hasNext = total ? page * perPage < total : products.length === perPage;
  const hasPrev = page > 1;

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Search results</h1>
        <p className="text-sm text-muted-foreground">
          Query: "{q || "all"}" {sort ? `· sorted by ${sort}` : ""}
        </p>
      </header>

      {products.length === 0 ? (
        <div>No products found.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            // ProductCards is a client component; rendering from a server component is allowed
            <ProductCards key={p.id} product={p} />
          ))}
        </div>
      )}

      <nav className="mt-8 flex items-center justify-between">
        <div>
          <span className="text-sm text-muted-foreground">
            Page {page}
            {total ? ` · ${total} total` : ""}
          </span>
        </div>

        <div className="flex gap-2">
          {hasPrev && (
            <Link
              href={`?q=${encodeURIComponent(q)}${
                sort ? `&sort=${encodeURIComponent(sort)}` : ""
              }&page=${page - 1}&perPage=${perPage}`}
              className="px-3 py-1 border rounded"
            >
              Previous
            </Link>
          )}

          {hasNext && (
            <Link
              href={`?q=${encodeURIComponent(q)}${
                sort ? `&sort=${encodeURIComponent(sort)}` : ""
              }&page=${page + 1}&perPage=${perPage}`}
              className="px-3 py-1 border rounded"
            >
              Next
            </Link>
          )}
        </div>
      </nav>
    </div>
  );
}
