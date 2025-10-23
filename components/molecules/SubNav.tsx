"use client";
import React from "react";
import { Home, List, MessageCircle, User, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";

const staticNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Categories", href: "/category", icon: List },
  // Spacer will be inserted manually between index 1 and 2
  { name: "Support", href: "/contact-us", icon: MessageCircle },
];

export default function MobileBottomNav() {
  const pathname = usePathname();
  const user = useUserStore((s) => s.user);

  const handleAccountClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("open-signin-modal"));
    }
  };

  const navItems = React.useMemo(() => [
    ...staticNavItems,
    { name: "Account", href: user ? `/user/${user.id}/profile` : "#", icon: User },
  ], [user]);

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-transparent z-50 lg:hidden">
      <div className="fixed bottom-0 left-0 right-0 w-full">
        <div className="relative">
          {/* Floating Center Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-3 z-20">
            <button className="w-12 h-12 rounded-full bg-primary hover:bg-white-500 shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95">
              <Plus className="w-6 h-6 text-white" strokeWidth={2.5} />
            </button>
          </div>

          {/* Navbar with SVG Curved Cutout */}
          <div className="relative">
            <svg
              viewBox="0 0 400 70"
              className="w-full h-16"
              preserveAspectRatio="none"
            >
              <defs>
                <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="-2" stdDeviation="8" floodOpacity="0.15" />
                </filter>
              </defs>

              <path
                d="
                  M 0,0 
                  L 0,80 
                  L 400,80 
                  L 400,0 
                  L 260,0 
                  Q 245,0 238,18 
                  A 32,32 0 0 1 162,18 
                  Q 155,0 140,0 
                  Z
                "
                fill="white"
                filter="url(#shadow)"
              />
            </svg>

            {/* Navigation Buttons Overlay */}
            <div className="absolute inset-0 flex items-center justify-around">
              {navItems.map((item, index) => {
                const Icon = item.icon;

                // Add a spacer div in the middle
                if (index === 2) {
                  return (
                    <React.Fragment key={item.name}>
                      <div className="w-16"></div>
                      <Link
                        onClick={item.name === "Account" ? handleAccountClick : undefined}
                        href={item.href}
                        className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-colors ${
                          pathname === item.href ? "text-primary" : "text-gray-600"
                        }`}
                      >
                        <Icon className="w-6 h-6" />
                        <span className="text-xs mt-1">{item.name}</span>
                      </Link>
                    </React.Fragment>
                  );
                }

                return (
                  <Link
                    key={item.name}
                    onClick={item.name === "Account" ? handleAccountClick : undefined}
                    href={item.href}
                    className={`flex flex-col items-center justify-center w-16 py-2 rounded-xl transition-colors ${
                      pathname === item.href ? "text-primary" : "text-gray-600"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                    <span className="text-xs mt-1">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
