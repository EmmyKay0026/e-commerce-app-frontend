// import { UserDashboard } from "@/components/user-dashboard";
import { UserDashboard } from "@/components/organisms/UserProfile";
import LeftBar from "@/components/templates/LeftSideBar";
import { demoProducts, demoWishlist } from "@/constants/product";
import { mockUser } from "@/constants/userData";
// import { mockUser, mockWishlist } from "@/constants/userData";

export default function DashboardPage() {
  // Change isOwner to false to see the public view
  const isOwner = true;
  const isLoggedIn = true;

  return (
    <main className="flex">
      <UserDashboard
        user={mockUser}
        isOwner={isOwner}
        products={demoProducts}
        wishlist={demoWishlist}
        isLoggedIn={isLoggedIn}
      />
    </main>
  );
}
