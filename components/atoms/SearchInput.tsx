"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function SearchInput({ defaultValue = "" }: { defaultValue?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("q", term);
    } else {
      params.delete("q");
    }
    params.delete("page"); // reset pagination
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, 500);

  return (
    <input
      type="text"
      placeholder="Search in this category..."
      defaultValue={defaultValue}
      onChange={(e) => updateSearch(e.target.value)}
      className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
}