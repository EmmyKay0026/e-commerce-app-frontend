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
import { getPublicProfile } from "@/services/userService";

const LeftBar = () => {
  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const { hambugerShowState, updateHambugerShowState } = useHambugerShowStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [profileDetails, setProfileDetails] = useState<User | null>(null);
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();

  const userId = params?.id as string; // Get /user/[id] from route

  useEffect(() => {
    if (!userId) return;
    const result = updateIsOwner(userId.toString());
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

  useEffect(() => {
    if (!userId) return;
    if (isOwner === true) {
      setProfileDetails(currentUser);
      return;
    }

    const getViewedUserDetails = async () => {
      const res = await getPublicProfile(userId);
      if (res.status === 200 && res.data) {
        console.log("Res", res);

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
      {/* <UserProfileCompletion
        // currentUser={currentUser}
        profileDetails={profileDetails}
      /> */}
      {/* <div className="flex justify-center sticky items-center">
        <Avatar className="h-15 w-15">
          <AvatarImage
            src={mockUser.profilePicture || "/placeholder.svg"}
            alt={mockUser.fullName}
          />
          <AvatarFallback className="text-xl">
            {getInitials(mockUser.fullName)}
          </AvatarFallback>
        </Avatar>
      </div> */}

      {/* <nav
        className={cn(
          "flex-col sticky justify-between items-stretch w-full h-full max-h-[450px]",
          hambugerShowState ? "flex" : "hidden w-[0%]"
        )}
      >
        <ul className="space-y-1">
          {sideMenu.map((item) => (
            <li key={item.id}>
              <Link
                href={item.link}
                onClick={handleMenuClick}
                className={cn(
                  "flex items-center py-[10px] mt-3 w-full cursor-pointer gap-4 group hover:bg-primary transition-colors",
                  isLinkActive(item.link) ? "bg-primary" : ""
                )}
              >
                <div className="flex items-center w-[50%] gap-4 mx-auto">
                  <img
                    src={item.icon}
                    alt={`${item.title} icon`}
                    className={cn(
                      "w-[18px] h-[18px] filter invert group-hover:invert-0 transition-all",
                      isLinkActive(item.link) ? "invert-0" : "invert"
                    )}
                  />
                  <span
                    className={cn(
                      "text-black group-hover:text-white transition-colors",
                      isLinkActive(item.link) ? "text-white" : ""
                    )}
                  >
                    {item.title}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav> */}
    </aside>
  );
};

export default LeftBar;
