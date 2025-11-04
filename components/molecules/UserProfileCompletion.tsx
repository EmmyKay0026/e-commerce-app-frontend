import React from "react";
import { Progress } from "../ui/progress";
import { Button } from "../ui/button";
import { Edit } from "lucide-react";
import { User } from "@/types/models";

interface UserProfileCompletionProps {
  profileDetails: User | null;
}

const UserProfileCompletion: React.FC<UserProfileCompletionProps> = ({
  profileDetails,
}) => {
  // ✅ If data isn't ready yet, return nothing but safely
  if (!profileDetails) {
    return null;
  }

  const isOwner = !!String(profileDetails.id);

  if (!isOwner) {
    return null;
  }

  return (
    <section className="shadow bg-white p-4 rounded flex flex-col gap-4">
      <h2 className="text-lg text-left font-semibold">Profile Completion</h2>
      <div className="w-full flex items-baseline gap-2">
        <Progress value={33} />
        <p className="text-sm font-bold mt-1">33%</p>
      </div>

      <Button variant="outline" className="w-full">
        <Edit className="mr-2 h-4 w-4" />
        Complete Profile
      </Button>
    </section>
  );
};

export default UserProfileCompletion;
