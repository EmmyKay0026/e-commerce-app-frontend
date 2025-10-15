import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getInitials } from "@/services/user";
import { mockUser } from "@/constants/userData";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";

const UserProfileCard = () => {
  return (
    <section className="shadow bg-white p-4  rounded flex flex-col items-center gap-4   ">
      <div className="w-full">
        <Badge className="text-[11px] text-white">
          <span className="">Joined:</span> Jan 2025
        </Badge>
      </div>
      <Avatar className="h-20 w-20">
        <AvatarImage
          src={mockUser.profilePicture || "/placeholder.svg"}
          alt={mockUser.fullName}
          className="object-cover"
        />
        <AvatarFallback className="text-xl">
          {getInitials(mockUser.fullName)}
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-lg font-semibold">{mockUser.fullName}</h2>
        <p className="text-sm text-gray-500">{mockUser.email}</p>
      </div>

      <Button variant={"outline"}>
        <Edit className="mr-2 h-4 w-4" />
        Edit Profile
      </Button>
    </section>
  );
};

export default UserProfileCard;
