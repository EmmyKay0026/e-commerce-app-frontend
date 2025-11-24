"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import {
  getPublicProfile,
  getPublicProfileByProfileLink,
} from "@/services/userService";

export default function DashboardPage() {
  const { id } = useParams();
  const router = useRouter();
  const [viewedUser, setViewedUser] = useState<User | null>(null);
  const currentUser = useUserStore((state) => state.user); // ✅ Simulated logged-in user (added this line)

  const isOwner = useUserStore((state) => state.isOwner);
  const updateIsOwner = useUserStore((state) => state.updateIsOwner);

  useEffect(() => {
    if (!id) return;

    const result = updateIsOwner(id.toString());

    // console.log("Result of ownership check:", result);
  }, [id, updateIsOwner]);

  useEffect(() => {
    const fetchViewedUser = async () => {
      if (!id) return;

      const user = await getPublicProfileByProfileLink(id.toString());
      if (user.status === 404) {
        router.push("/404");
        return;
      }
      // console.log("fetch user:", user);

      setViewedUser(user.data ?? null);
    };

    fetchViewedUser();
  }, [id, router]);

  if (!id) {
    router.push("/404");
    return null;
  }

  // Loading or unknown ownership state
  if (isOwner === "unknown" || viewedUser == null) {
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
        viewedUser={viewedUser}
        currentUser={currentUser ?? undefined}
        // products={demoProducts}
        isLoggedIn={!!currentUser}
      />
    </main>
  );
}
