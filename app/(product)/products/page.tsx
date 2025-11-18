// app/products/page.tsx
import React from "react";
import Link from "next/link";
import ProductCards from "@/components/molecules/ProductCards";
import ProductFilterSidebar from "@/components/molecules/ProductFilter";
import { listProducts, getAllCategories } from "@/services/productService";

export default async function Page({ searchParams }: { searchParams: any }) {
  const resolvedSearchParams = await searchParams;

  const parseArray = (p: string | undefined) =>
    p ? p.split(",").filter(Boolean) : undefined;

  const q = resolvedSearchParams.q ?? "";
  const sort = resolvedSearchParams.sort;
  const page = Math.max(1, Number(resolvedSearchParams.page ?? 1));
  const perPage = 12;

  const categorySlugs = parseArray(resolvedSearchParams.category);
  const locationState = parseArray(resolvedSearchParams.location_state);
  const locationLga = parseArray(resolvedSearchParams.location_lga);
  const saleType = parseArray(resolvedSearchParams.sale_type);
  const minPrice = resolvedSearchParams.minPrice || undefined;
  const maxPrice = resolvedSearchParams.maxPrice || undefined;
  const priceType = resolvedSearchParams.price_type || undefined;

  // FETCH CATEGORIES FIRST
  const { success, data } = await getAllCategories();
  const categories = success && data
    ? data.map((c: any) => ({
        id: c.id,
        name: c.name,
        slug: c.slug,
      }))
    : [];

  // NOW SAFE: Convert slugs → IDs (after categories exist)
  const categoryIds = categorySlugs
    ? categorySlugs
        .map(slug => categories.find(c => c.slug === slug)?.id)
        .filter(Boolean) as string[]
    : undefined;

  // Build filters for API (sends real IDs)
  const filters = {
    minPrice,
    maxPrice,
    category: categoryIds,
    price_type: priceType,
    sale_type: saleType,
    location_state: locationState,
    location_lga: locationLga,
  };

  // Fetch data
  const [statesRes, lgasRes, productsRes] = await Promise.all([
    listProducts({
      q: q || undefined,
      perPage: 1000,
      filters: { ...filters, location_state: undefined, location_lga: undefined },
    }),
    listProducts({
      q: q || undefined,
      perPage: 1000,
      filters: { ...filters, location_lga: undefined },
    }),
    listProducts({ q: q || undefined, sort, page, perPage, filters }),
  ]);

  // Extract states & LGAs
  const states: string[] = [];
  if (statesRes.success) {
    const set = new Set<string>();
    statesRes.data?.products?.forEach((p: any) => p.location_state && set.add(p.location_state));
    states.push(...Array.from(set).sort());
  }

  const lgas: string[] = [];
  if (lgasRes.success) {
    const set = new Set<string>();
    lgasRes.data?.products?.forEach((p: any) => p.location_lga && set.add(p.location_lga));
    lgas.push(...Array.from(set).sort());
  }

  if (!productsRes.success) {
    return <div className="p-8 text-red-600">Error: {productsRes.error}</div>;
  }

  const products = productsRes.data?.products ?? [];
  const total = productsRes.data?.total ?? null;
  const hasNext = total ? page * perPage < total : products.length === perPage;
  const hasPrev = page > 1;

  // Pagination URL: use SLUGS (pretty) instead of IDs
  const buildUrl = (newPage: number) => {
    const p = new URLSearchParams();
    p.set("page", newPage.toString());
    p.set("perPage", perPage.toString());

    if (q) p.set("q", q);
    if (sort) p.set("sort", sort);
    if (minPrice) p.set("minPrice", minPrice);
    if (maxPrice) p.set("maxPrice", maxPrice);
    if (priceType) p.set("price_type", priceType);
    if (locationState?.length) p.set("location_state", locationState.join(","));
    if (locationLga?.length) p.set("location_lga", locationLga.join(","));
    if (saleType?.length) p.set("sale_type", saleType.join(","));

    // Use slugs for clean URLs
    if (categoryIds?.length) {
      const selectedSlugs = categories
        .filter(c => categoryIds.includes(c.id))
        .map(c => c.slug);
      p.set("category", selectedSlugs.join(","));
    }

    return `?${p.toString()}`;
  };

  return (
    <div className="flex min-h-screen">
      <ProductFilterSidebar categories={categories} states={states} lgas={lgas} />

      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold mb-6">
          {categoryIds?.length
            ? `${categoryIds.length} Category${categoryIds.length > 1 ? "s" : ""} Selected`
            : "All Products"}
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-2xl text-gray-600">No products found</p>
            <p className="text-gray-500 mt-2">Try adjusting your filters</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((p: any) => (
                <ProductCards key={p.id} product={p} />
              ))}
            </div>

            <nav className="mt-12 flex justify-between items-center border-t pt-6">
              <span className="text-sm text-gray-600">
                Page {page} {total && `of ${Math.ceil(total / perPage)}`}
              </span>
              <div className="flex gap-4">
                {hasPrev && (
                  <Link href={buildUrl(page - 1)} className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Previous
                  </Link>
                )}
                {hasNext && (
                  <Link href={buildUrl(page + 1)} className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Next
                  </Link>
                )}
              </div>
            </nav>
          </>
        )}
      </div>
    </div>
  );
}