// import { UserDashboard } from "@/components/user-dashboard";
// import { BusinessDashboard } from "@/components/organisms/BusniessProfile";
import { UserDashboard } from "@/components/organisms/UserProfile";
// import LeftBar from "@/components/templates/LeftSideBar";
import { demoProducts } from "@/constants/product";
import {
  //   mockProducts,
  mockUser,
  mockWishlist,
} from "@/constants/userData";

export default function DashboardPage() {
  // Change isOwner to false to see the public view
  const isOwner = true;
  const isLoggedIn = true;

  return (
    <main className="flex">
      {/* <BusinessDashboard
        user={mockUser}
        isOwner={isOwner}
        products={demoProducts}
        wishlist={mockWishlist}
        isLoggedIn={isLoggedIn}
      /> */}
    </main>
  );
}
