"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { UserProfileSkeleton } from "@/components/molecules/UserProfileSkeleton";
import { UserDashboard } from "@/components/organisms/UserProfile";
import { demoProducts } from "@/constants/product";
import { mockUser, mockWishlist } from "@/constants/userData";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";

export default function DashboardPage() {
  const { id } = useParams();
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  const currentUser = mockUser; // ✅ Simulated logged-in user (added this line)

  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);
  const getMe = useUserStore((state) => state.getMe);
  const isLoggedIn = true;

  useEffect(() => {
    if (id) updateIsOwner(id.toString());

    const fetchViewedUser = async () => {
      const user = await getMe(id ? id.toString() : undefined);
      setViewedUser(user);
    };

    fetchViewedUser();
  }, [id, getMe, updateIsOwner]);

  // Loading or unknown ownership state
  if (isOwner === "unknown" || viewedUser === null) {
    return <UserProfileSkeleton />;
  }

  // Error fallback
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
        currentUser={currentUser}
        products={demoProducts}
        wishlist={mockWishlist}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}
