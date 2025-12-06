"use client";

import * as React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

export default function ProductToolbar() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const currentQ = searchParams.get("q")?.toString() || "";
    const currentSort = searchParams.get("sort")?.toString() || "recommended";

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("q", term);
        } else {
            params.delete("q");
        }
        // Reset to page 1 on new search
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    }, 500);

    const handleSortChange = (value: string) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set("sort", value);
        } else {
            params.delete("sort");
        }
        // Reset to page 1 on sort change
        params.set("page", "1");
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6 justify-between items-center">
            <div className="relative w-full sm:w-72">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search products..."
                    className="pl-9"
                    defaultValue={currentQ}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
                <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
                <Select value={currentSort} onValueChange={handleSortChange}>
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="recommended">Recommended</SelectItem>
                        <SelectItem value="popular">Most Popular</SelectItem>
                        <SelectItem value="newest">Newest Arrivals</SelectItem>
                        <SelectItem value="price_asc">Price: Low to High</SelectItem>
                        <SelectItem value="price_desc">Price: High to Low</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
