"use client";
import { UserProfileSkeleton } from "@/components/molecules/UserProfileSkeleton";
// import { UserDashboard } from "@/components/user-dashboard";
import { UserDashboard } from "@/components/organisms/UserProfile";
import LeftBar from "@/components/templates/LeftSideBar";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { demoProducts } from "@/constants/product";
import {
  //   mockProducts,
  mockUser,
  mockWishlist,
} from "@/constants/userData";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { id } = useParams();
  // Change isOwner to false to see the public view
  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const user = useUserStore((state) => state.user);
  const getMe = useUserStore((state) => state.getMe);

  const [viewedUser, setViewedUser] = useState<User | null>(null);

  const isLoggedIn = true;

  useEffect(() => {
    if (id) updateIsOwner(id.toString());

    const getViewedUser = async () => {
      const user = await getMe(id ? id.toString() : undefined);
      setViewedUser(user);
    };

    getViewedUser();
  }, []);

  //If the backend returns 404  for user not found, show the 404 page
  if (isOwner == "unknown" || viewedUser == null) {
    return <UserProfileSkeleton />;
  }
  if (!viewedUser) {
    return (
      <Empty className="h-96">
        <EmptyHeader>
          <EmptyMedia variant="icon">🚫</EmptyMedia>
          <EmptyTitle>An error occurred</EmptyTitle>
          <Button
            variant="outline"
            size="sm"
            className="mt-2"
            onClick={() => window.location.reload()}
          >
            Refresh
          </Button>
        </EmptyHeader>
      </Empty>
    );
  }

  return (
    <main className="flex">
      <UserDashboard
        user={viewedUser}
        isOwner={isOwner}
        products={demoProducts}
        wishlist={mockWishlist}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}
