"use client";

import { sideMenu } from "@/constants/sideMenu";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import Brand from "../molecules/Brand";
import { useHambugerShowStore } from "@/store/useHambugerStore";
import { usePathname, useParams, useRouter } from "next/navigation";
import { mockUser, mockUser2 } from "@/constants/userData";
import UserProfileCard from "../molecules/UserProfileCard";
import UserProfileCompletion from "../molecules/UserProfileCompletion";
import UserSideBarMenu from "../molecules/UserSideBarMenu";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import {
  getPublicProfile,
  getPublicProfileByProfileLink,
} from "@/services/userService";

const LeftBar = () => {
  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const { hambugerShowState, updateHambugerShowState } = useHambugerShowStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState<User | null>(null);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const profileLink = params?.id as string; // Get /user/[id] from route

  useEffect(() => {
    if (!profileLink) return;
    if (isOwner === true) {
      setProfileDetails(currentUser);
      return;
    }

    const getViewedUserDetails = async () => {
      const res = await getPublicProfileByProfileLink(profileLink);
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

  useEffect(() => {
    if (!profileLink) return;
    updateIsOwner(profileLink.toString());
  }, []);

  // ✅ Logged-in user
  const currentUser = useUserStore((state) => state.user);

  // ✅ Determine which profile to show
  // const profileUser = userId === currentUser?.id ? currentUser : mockUser2;

  const checkScreenSize = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setIsMobile(true);
      updateHambugerShowState(true);
    } else {
      setIsMobile(false);
      updateHambugerShowState(false);
    }
  }, [updateHambugerShowState]);

  useEffect(() => {
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  const handleMenuClick = () => {
    if (isMobile) updateHambugerShowState(hambugerShowState);
  };

  const isLinkActive = (link: string) =>
    pathname === link || pathname.startsWith(link);

  return (
    <aside
      id="leftbar"
      className={cn(
        "lg:flex flex-col hidden gap-2 py-4 absolute h-screen md:sticky md:h-auto transition-all duration-500",
        hambugerShowState ? "w-full md:w-[22%] lg:w-[25%]" : "w-0"
      )}
    >
      {/* Close button for mobile */}
      <button
        onClick={() => updateHambugerShowState(hambugerShowState)}
        className={cn(
          "text-white text-[2rem] absolute right-4 z-10 md:hidden",
          hambugerShowState ? "block" : "hidden"
        )}
        aria-label="Close menu"
      >
        <X />
      </button>

      {/* ✅ Dynamic User Profile */}
      <UserProfileCard
        // currentUser={currentUser}
        profileDetails={profileDetails}
      />
      <UserSideBarMenu
        // currentUser={currentUser}
        profileDetails={profileDetails}
      />
    </aside>
  );
};

export default LeftBar;
