"use client";

import { Home, List, MessageCircle, User, DollarSign, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Categories", href: "#", icon: List },
    { name: "Support", href: "/contact-us", icon: MessageCircle },
    { name: "Account", href: "#", icon: User },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-transparent z-50 lg:hidden">
      <div className="fixed bottom-0 left-0 right-0 w-full">
        <div className="relative">
          {/* Floating Center Button */}
          <div className="absolute left-1/2 -translate-x-1/2 -top-4 z-20">
            <button className="w-16 h-16 rounded-full bg-primary hover:bg-white-500 shadow-xl flex items-center justify-center transition-all duration-300 active:scale-95">
              <DollarSign className="w-8 h-8 text-white" strokeWidth={2.5} />
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
              {/* Home Button */}
              <button className="flex flex-col items-center justify-center w-16 py-2 rounded-xl active:bg-gray-100 transition-colors">
                <Home className="w-6 h-6 text-gray-600" />
                <span className="text-xs mt-1 text-gray-600">Home</span>
              </button>

              {/* Categories Button */}
              <button className="flex flex-col items-center justify-center w-16 py-2 rounded-xl active:bg-gray-100 transition-colors">
                <List className="w-6 h-6 text-gray-600" />
                <span className="text-xs mt-1 text-gray-600">Categories</span>
              </button>

              {/* Center Spacer */}
              <div className="w-16"></div>

              {/* Support Button */}
              <button className="flex flex-col items-center justify-center w-16 py-2 rounded-xl active:bg-gray-100 transition-colors">
                <MessageCircle className="w-6 h-6 text-gray-600" />
                <span className="text-xs mt-1 text-gray-600">Support</span>
              </button>

              {/* Profile Button */}
              <button className="flex flex-col items-center justify-center w-16 py-2 rounded-xl active:bg-gray-100 transition-colors">
                <User className="w-6 h-6 text-gray-600" />
                <span className="text-xs mt-1 text-gray-600">Profile</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
