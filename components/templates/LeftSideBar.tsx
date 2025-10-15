"use client";
import { sideMenu } from "@/constants/sideMenu";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState, useCallback } from "react";
import Brand from "../molecules/Brand";
import { useHambugerShowStore } from "@/store/useHambugerStore";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/services/user";
import { mockUser } from "@/constants/userData";
import UserProfileCard from "../molecules/UserProfileCard";
import UserProfileCompletion from "../molecules/UserProfileCompletion";
import UserSideBarMenu from "../molecules/UserSideBarMenu";
// import Brand from "../molecules/Brand";
// import { Link, useLocation } from "react-router-dom";
// import { sideMenu } from "../../constants/sideMenu";
// import { cn } from "../../utils/twMerge";
// import { useHambugerShowStore } from "../store";
// import { IoClose } from "react-icons/io5";

const LeftBar = () => {
  const { hambugerShowState, updateHambugerShowState } = useHambugerShowStore();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const location = {
    pathname: typeof window !== "undefined" ? window.location.pathname : "",
  };

  const pathname = usePathname();
  console.log(pathname);

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

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [checkScreenSize]);

  const handleMenuClick = () => {
    if (isMobile) {
      updateHambugerShowState(hambugerShowState);
    }
  };

  const isLinkActive = (link: string) =>
    location.pathname === link ||
    (location.pathname.startsWith(link) && link.startsWith(location.pathname));

  return (
    <aside
      id="leftbar"
      className={cn(
        "flex flex-col gap-2 py-[16px]  absolute h-screen md:sticky md:h-[initial] transition-all duration-500",
        hambugerShowState ? "w-full md:w-[22%] lg:w-[25%]" : "w-[0%]"
      )}
      // style={{
      //   background: "rgba(198, 131, 17, 0.19)",
      //   // background:
      //   //   "linear-gradient(158deg,rgba(198, 131, 17, 0.42) 0%, rgba(134, 135, 135, 0.37) 57%, rgba(198, 131, 17, 0.36) 100%)",
      // }}
    >
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

      <UserProfileCard />
      <UserSideBarMenu />
      <UserProfileCompletion />

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
