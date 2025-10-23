"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/services/user";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { User } from "@/types/models";
import useApi from "@/hooks/useApi";

interface UserProfileCardProps {
  currentUser: User | null;
  profileUser?: User | null; // if provided, no fetch
  userId?: string; // optional id to fetch when profileUser not provided
}

function normalizeUser(data: any): User {
  const id = data?.id ?? data?.user_id ?? "";
  const first =
    data?.first_name ?? data?.firstName ?? data?.first ?? undefined;
  const last =
    data?.last_name ?? data?.lastName ?? data?.last ?? undefined;
  const fullName =
    (
      (data?.fullName ?? [first, last].filter(Boolean).join(" "))
    ) || data?.full_name || data?.name || "";
  const email = data?.email ?? "";
  const profilePicture =
    data?.profile_picture ??
    data?.profilePicture ??
    data?.profileImage ??
    null;
  const role = data?.role ?? (data?.vendor || data?.business_profile ? "vendor" : "user");

  const vendorProfileSource = data?.business_profile ?? data?.vendor ?? data?.vendorProfile ?? data?.user?.vendor;
  const vendorProfile = vendorProfileSource
    ? {
        id: vendorProfileSource.id ?? vendorProfileSource.vendorId ?? vendorProfileSource.owner_id ?? undefined,
        businessName:
          vendorProfileSource.business_name ??
          vendorProfileSource.businessName ??
          vendorProfileSource.user?.first_name ??
          "",
        coverImage:
          vendorProfileSource.cover_image ??
          vendorProfileSource.coverImage ??
          vendorProfileSource.profileImage ??
          undefined,
        address: vendorProfileSource.address ?? undefined,
        description: vendorProfileSource.description ?? undefined,
        vendorId: vendorProfileSource.vendorId ?? undefined,
      }
    : undefined;

  return {
    id,
    fullName,
    email,
    phoneNumber: data?.phone_number ?? data?.phoneNumber ?? undefined,
    profilePicture,
    role,
    vendorProfile,
    business_profile_id: data?.business_profile_id ?? undefined,
    business_profile: data?.business_profile ?? undefined,
    vendor: data?.vendor ? { id: data.vendor.id } : undefined,
  } as User;
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  currentUser,
  profileUser: profileUserProp,
  userId,
}) => {
  const api = useApi();
  const [profileUser, setProfileUser] = useState<User | null | undefined>(
    profileUserProp === undefined ? undefined : profileUserProp
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (profileUserProp !== undefined) {
      setProfileUser(profileUserProp);
      setLoading(false);
      setError(null);
      return;
    }

    let mounted = true;
    const controller = new AbortController();

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const path = userId ? `users/${userId}` : `users/me`;
        // prefer api.request so token headers are attached by useApi
        const payload = await api.request<any>(path, { method: "GET", signal: controller.signal });
        // API may return { user: {...} } or the user object directly
        const userData = payload?.user ?? payload;
        const normalized = userData ? normalizeUser(userData) : null;
        if (mounted) setProfileUser(normalized);
      } catch (err: any) {
        if (err?.name === "AbortError") return;
        if (mounted) {
          setError(err?.message ?? "Failed to load profile");
          setProfileUser(null);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
      controller.abort();
    };
  }, [profileUserProp, userId, api]);

  if (loading || profileUser === undefined) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500 text-sm">Loading profile...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-red-600 text-sm">Error loading profile: {error}</p>
      </section>
    );
  }

  if (!profileUser) {
    return (
      <section className="bg-white p-4 rounded shadow text-center">
        <p className="text-gray-500 text-sm">Profile not found</p>
      </section>
    );
  }

  const isOwner = currentUser ? String(currentUser.id) === String(profileUser.id) : false;

  return (
    <section className="shadow bg-white lg:p-4 w-full lg:w-auto p-4 rounded flex flex-col items-center gap-4">
      <div className="w-full">
        <Badge className="text-[11px] text-white">
          <span>Joined:</span> Jan 2025
        </Badge>
      </div>

      <Avatar className="h-20 w-20">
        <AvatarImage
          src={profileUser.profilePicture || "/placeholder.svg"}
          alt={profileUser.fullName}
          className="object-cover"
        />
        <AvatarFallback className="text-xl">
          {getInitials(profileUser.fullName)}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <h2 className="text-lg font-semibold">{profileUser.fullName}</h2>
        <p className="text-sm text-gray-500">{profileUser.email}</p>
      </div>

      <div className="flex gap-4">
        {isOwner ? (
          <Button variant="outline">
            <Edit className="mr-2 h-4 w-4" />
            Edit Profile
          </Button>
        ) : (
          <Button variant="outline">
            <FaWhatsapp className="mr-2 h-4 w-4" />
            Chat
          </Button>
        )}
      </div>
    </section>
  );
};

export default UserProfileCard;
