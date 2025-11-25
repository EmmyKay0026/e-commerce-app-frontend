"use client";

import React, { useEffect, useState } from "react";
import { Bookmark, Contact, Mail, Settings, Store } from "lucide-react";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import useApi from "@/hooks/useApi";
import { User } from "@/types/models";
import { useUserStore } from "@/store/useUserStore";

interface UserSideBarMenuProps {
  // currentUser: User | null;
  profileDetails?: User | null;
}

export default function UserSideBarMenu({
  // currentUser,
  profileDetails,
}: UserSideBarMenuProps) {
  const pathname = usePathname();
  const params = useParams();
  const api = useApi();
  const isOwner = useUserStore((state) => state.isOwner);

  const routeUserId = (params as any)?.id as string | undefined;
  // const [profileUser, setProfileUser] = useState<User | null | undefined>(
  //   profileUserProp === undefined ? undefined : profileUserProp
  // );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);



  if (loading || profileDetails === undefined) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-red-600 text-sm">Error: {error}</p>
      </section>
    );
  }

  if (!profileDetails) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500 text-sm">Profile not found</p>
      </section>
    );
  }

  // const isOwner = Boolean(
  //   currentUser && String(currentUser.id) === String(profileUser.id)
  // );
  const uid = routeUserId ?? String(profileDetails.profile_link);

  const ownerItems = [
    { name: "My Products", href: `/user/${uid}/products`, icon: Store },
    { name: "Contact Info", href: `/user/${uid}/profile`, icon: Contact },
    { name: "Saved", href: `/user/${uid}/saved`, icon: Bookmark },
    { name: "Settings", href: `/settings`, icon: Settings },
  ];

  const visitorItems = [
    { name: "Products", href: `/user/${uid}/products`, icon: Store },
    { name: "Contact Info", href: `/user/${uid}/profile`, icon: Contact },
  ];

  const itemsToRender = isOwner ? ownerItems : visitorItems;

  function isActive(href: string) {
    if (!pathname) return false;
    // treat exact or nested routes as active
    return pathname === href || pathname.startsWith(href + "/");
  }

  // contact action for visitors
  const contactHref = profileDetails?.phone_number
    ? `https://wa.me/${profileDetails.phone_number.replace(/[^0-9+]/g, "")}`
    : profileDetails?.whatsapp_number
      ? `https://wa.me/${profileDetails.whatsapp_number.replace(/[^0-9+]/g, "")}`
      : null;

  return (
    <nav aria-label="User menu" className="shadow bg-white p-4 rounded">
      <ul className="space-y-3">
        {itemsToRender.map((item) => {
          const Active = isActive(item.href);
          const Icon = item.icon;
          return (
            <li key={item.name}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${Active
                  ? "text-primary font-semibold bg-primary/5"
                  : "text-gray-700 hover:text-primary"
                  }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            </li>
          );
        })}

        {!isOwner && contactHref && (
          <li>
            <Link
              href={contactHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded text-gray-700 hover:text-primary"
            >
              <Contact className="w-4 h-4" />
              <span>Chat with on WhatsApp</span>
            </Link>
          </li>
        )}

        {!isOwner && profileDetails?.email && (
          <li>
            <Link
              href={`mailto:${profileDetails.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2 rounded text-gray-700 hover:text-primary"
            >
              <Mail className="w-4 h-4" />
              <span>Send an email</span>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
