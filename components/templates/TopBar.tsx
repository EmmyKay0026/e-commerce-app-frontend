"use client";

import React, { useState } from "react";
import { useParams, usePathname } from "next/navigation"; // ✅ usePathname added
import Link from "next/link"; // ✅ import Link
import { mockUser, mockUser2 } from "@/constants/userData";
import { cn } from "@/lib/utils";
import UserProfileCard from "../molecules/UserProfileCard"; // ✅ correct import

const TopBar = () => {
  const [activeTab, setActiveTab] = useState("posts");

  const params = useParams(); // 👈 get route parameters like { id: "1" }
  const pathname = usePathname(); // ✅ get current route path
  const userId = params?.id as string;

  const currentUser = mockUser; // Logged-in user (John)
  const profileUser = userId === currentUser.id ? mockUser : mockUser2; // 👈 dynamic logic

  const tabs = [
    { id: "products", label: "My Products", href: `/user/${userId}/products` },
    { id: "contact", label: "Contact Info", href: `/user/${userId}/profile` },
    { id: "featured", label: "Featured", href: `/user/${userId}/featured` },
  ];

  return (
    <div className="w-full md:hidden flex flex-col items-center bg-white">
      {/* Profile header */}
      <UserProfileCard currentUser={currentUser} profileUser={profileUser} />

      {/* Tabs */}
      <div className="flex justify-around border-b mt-5 w-full">
        {tabs.map((tab) => {
          const isActive = pathname === tab.href;
          return (
            <Link
              key={tab.id}
              href={tab.href}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "py-3 text-sm font-medium flex-1 text-center transition-colors duration-200",
                isActive
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              )}
            >
              {tab.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default TopBar;
