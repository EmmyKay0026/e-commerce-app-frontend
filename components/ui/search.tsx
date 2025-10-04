"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search } from "lucide-react";
import Link from "next/link";

interface Product {
  id: string;
  name: string;
  image?: string;
  price?: string;
  href: string; // product page url
}

interface SearchBarProps {
  placeholder?: string;
  fetchSuggestions: (query: string) => Promise<Product[]>;
  onSearch?: (query: string) => void;
}

export function SearchBar({
  placeholder = "Search products...",
  fetchSuggestions,
  onSearch,
}: SearchBarProps) {
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [suggestions, setSuggestions] = React.useState<Product[]>([]);
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOpen(false);
    onSearch?.(query.trim());
  };

  // fetch suggestions when query changes
  React.useEffect(() => {
    if (query.length < 2) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    fetchSuggestions(query)
      .then((res) => setSuggestions(res))
      .finally(() => setLoading(false));
  }, [query, fetchSuggestions]);

  return (
    <div className="relative w-full max-w-md">
      <form onSubmit={handleSubmit} className="flex items-center space-x-2">
        <Input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder={placeholder}
          className="flex-1"
        />
        <Button type="submit" variant="destructive">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      {/* Suggestions dropdown */}
      <Popover open={open && query.length > 1} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <span />
        </PopoverTrigger>
        <PopoverContent
          className="w-full p-0 mt-1"
          side="bottom"
          align="start"
        >
          <Command>
            <CommandList>
              {loading ? (
                <CommandEmpty>Loading...</CommandEmpty>
              ) : suggestions.length > 0 ? (
                <CommandGroup>
                  {suggestions.map((product) => (
                    <CommandItem key={product.id} className="cursor-pointer">
                      <Link
                        href={product.href}
                        className="flex items-center space-x-3 w-full"
                        onClick={() => setOpen(false)}
                      >
                        {product.image && (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-8 w-8 rounded object-cover"
                          />
                        )}
                        <span className="flex-1">{product.name}</span>
                        {product.price && (
                          <span className="text-sm text-muted-foreground">
                            {product.price}
                          </span>
                        )}
                      </Link>
                    </CommandItem>
                  ))}
                </CommandGroup>
              ) : (
                <CommandEmpty>No products found.</CommandEmpty>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
