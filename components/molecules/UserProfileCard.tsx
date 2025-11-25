"use client";

import React, { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/services/userService";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { User } from "@/types/models";
import useApi from "@/hooks/useApi";
import { useUserStore } from "@/store/useUserStore";
import ShowContactButton from "../atoms/ShowContactButton";
import Link from "next/link";
import { constructImageUrl } from "@/lib/utils";

interface UserProfileCardProps {
  // currentUser: User | null;
  profileDetails?: User | null; // if provided, no fetch
  userId?: string; // optional id to fetch when profileUser not provided
}

const UserProfileCard: React.FC<UserProfileCardProps> = ({
  // currentUser,
  profileDetails,
  userId,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const isOwner = useUserStore((state) => state.isOwner);


  if (profileDetails === null || profileDetails === undefined) return null;
  if (loading) {
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

  return (
    <section className="shadow bg-white lg:p-4 w-full lg:w-auto p-4 rounded flex flex-col items-center gap-4">
      <div className="w-full">
        <Badge className="text-[11px] text-white">
          <span>Joined:</span> Jan 2025
        </Badge>
      </div>

      <Avatar className="h-20 w-20">
        <AvatarImage
          src={
            (profileDetails?.profile_picture &&
              constructImageUrl(profileDetails?.profile_picture)) ||
            "/placeholder.svg"
          }
          width={100}
          height={100}
          alt={profileDetails.first_name}
          className="object-cover"
        />
        <AvatarFallback className="text-xl">
          {getInitials(
            profileDetails.first_name + " " + profileDetails.last_name
          )}
        </AvatarFallback>
      </Avatar>

      <div className="text-center">
        <h2 className="text-lg font-semibold capitalize">
          {profileDetails.first_name + " " + profileDetails.last_name}
        </h2>
        {/* <p className="text-sm text-gray-500">{profileDetails.email}</p> */}
      </div>

      <div className="flex gap-4">
        {isOwner === true ? (
          <Link href={"/settings"}>
            <Button variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          </Link>
        ) : (
          <ShowContactButton
            userPhoneNumber={profileDetails.phone_number ?? "No contact info"}
          />
        )}
      </div>
    </section>
  );
};

export default UserProfileCard;
