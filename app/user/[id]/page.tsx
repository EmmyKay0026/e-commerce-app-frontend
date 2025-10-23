"use client";

import { useParams } from "next/navigation";
import { UserDashboard } from "@/components/organisms/UserProfile";
// import LeftBar from "@/components/templates/LeftSideBar";
import { demoProducts, demoWishlist } from "@/constants/product";
import { userDB, mockUser } from "@/constants/userData";

export default function ProfilePage() {
  const { id } = useParams(); 
  const currentUser = mockUser; 
  const viewedUser = userDB.find((user) => user.id === id); // Profile being viewed

  if (!viewedUser) {
    return <div className="p-6 text-red-500">User not found.</div>;
  }

  // Check if viewing own profile
  const isOwner = currentUser.id === viewedUser.id;
  const finalUser = isOwner ? currentUser : viewedUser;
  const isLoggedIn = true;

  console.log("🧭 ProfilePage Data:", {
    id,
    currentUser: currentUser.fullName,
    viewedUser: viewedUser.fullName,
    finalUser: finalUser.fullName,
    isOwner,
  });

  return (
    <main className="flex">
      {/* <LeftBar /> */}
      <UserDashboard
        user={finalUser}
        currentUser={currentUser}
        products={demoProducts}
        wishlist={demoWishlist}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}
