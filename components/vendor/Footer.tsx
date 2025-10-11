import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

export function VendorFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  EC
                </span>
              </div>
              <div>
                <h3 className="font-bold text-foreground">Elite Commerce</h3>
                <p className="text-xs text-muted-foreground">
                  Premium Electronics
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted source for premium electronics and gadgets since
              2018.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="h-9 w-9 rounded-full bg-muted flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Shop All Products
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Track Order
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Returns & Refunds
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Shipping Information
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Warranty Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Cookie Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-accent transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t pt-8 text-center text-sm text-muted-foreground">
          <p>
            © 2025 Elite Commerce. All rights reserved. Built with care for our
            customers.
          </p>
        </div>
      </div>
    </footer>
  );
}
