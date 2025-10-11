"use client";

import { ShoppingCart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export function VendorHeader() {
  const [cartCount] = useState(0);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">
                EC
              </span>
            </div>
            <div className="hidden md:block">
              <h1 className="text-lg font-bold text-foreground">
                Elite Commerce
              </h1>
              <p className="text-xs text-muted-foreground">
                Premium Electronics
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <a
              href="#categories"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Categories
            </a>
            <a
              href="#featured"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Featured
            </a>
            <a
              href="#products"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              All Products
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-foreground hover:text-accent transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <Badge className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {cartCount}
                </Badge>
              )}
            </Button>
            <Button className="hidden md:inline-flex">Contact Vendor</Button>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
