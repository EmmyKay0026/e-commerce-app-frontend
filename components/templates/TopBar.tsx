"use client";

import React, { useEffect, useState } from "react";
import { useParams, usePathname, useRouter } from "next/navigation"; // ✅ usePathname added
import Link from "next/link"; // ✅ import Link
import { mockUser, mockUser2 } from "@/constants/userData";
import { cn } from "@/lib/utils";
import UserProfileCard from "../molecules/UserProfileCard"; // ✅ correct import
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import {
  getPublicProfile,
  getPublicProfileByProfileLink,
} from "@/services/userService";

const TopBar = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const currentUser = useUserStore((state) => state.user);
  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const [profileDetails, setProfileDetails] = useState<User | null>(null);

  const router = useRouter();
  const params = useParams(); // 👈 get route parameters like { id: "1" }
  const pathname = usePathname(); // ✅ get current route path
  const userId = params?.id as string; //This is actually the profile link but left as userId for legacy reasons

  useEffect(() => {
    if (!userId) return;
    const result = updateIsOwner(userId.toString());
  }, []);

  useEffect(() => {
    if (!userId) return;
    if (isOwner === true) {
      setProfileDetails(currentUser);
      return;
    }

    const getViewedUserDetails = async () => {
      const res = await getPublicProfileByProfileLink(userId);
      if (res.status === 200 && res.data) {
        // console.log("Res", res);

        setProfileDetails(res.data);
      } else {
        setProfileDetails(null);
      }
      if (res.status === 404) {
        router.push("/404");
      }
    };
    getViewedUserDetails();
  }, []);

  const tabs = [
    { id: "contact", label: "Contact Info", href: `/user/${userId}/profile` },
    { id: "featured", label: "Featured", href: `/user/${userId}/featured` },
    { id: "products", label: "My Products", href: `/user/${userId}/products` },
  ];

  return (
    <div className="w-full md:hidden flex flex-col items-center bg-white">
      {/* Profile header */}
      <UserProfileCard profileDetails={profileDetails} />

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
