"use client";

import { Bookmark, Contact, Settings, Store } from "lucide-react";
import Link from "next/link";
import React from "react";
import { User } from "@/types/models";
import { usePathname, useParams } from "next/navigation";

interface UserSideBarMenuProps {
  currentUser: User | null;
  profileUser: User | null;
}

const UserSideBarMenu: React.FC<UserSideBarMenuProps> = ({
  currentUser,
  profileUser,
}) => {
  const pathname = usePathname();
  const params = useParams();
  const userId = params?.id as string;

  // Safety check while loading
  if (!currentUser || !profileUser || !userId) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </section>
    );
  }

  const isOwner = String(currentUser.id) === String(profileUser.id);

  const sideItems = [
    { name: "My Products", href: `/user/${userId}/products`, icon: Store },
    { name: "Contact Info", href: `/user/${userId}/profile`, icon: Contact },
    { name: "Saved", href: `/user/${userId}/saved`, icon: Bookmark },
    { name: "Settings", href: `/user/${userId}/settings`, icon: Settings },
  ];

  const sideItems2 = [
    { name: "Products", href: `/user/${userId}/products`, icon: Store },
    { name: "Contact Info", href: `/user/${userId}/profile`, icon: Contact },
  ];

  const itemsToRender = isOwner ? sideItems : sideItems2;

  return (
    <section className="shadow bg-white p-4 rounded flex flex-col gap-4">
      <ul className="space-y-4">
        {itemsToRender.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-2 cursor-pointer hover:text-primary transition-colors ${
                isActive ? "text-primary font-semibold" : "text-gray-600"
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          );
        })}
      </ul>
    </section>
  );
};

export default UserSideBarMenu;
