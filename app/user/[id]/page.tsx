// import { UserDashboard } from "@/components/user-dashboard";
import { UserDashboard } from "@/components/organisms/UserDashboard";
import type { User, Product, WishlistItem, Review } from "@/types/models";

// Example data - replace with actual data fetching
const mockUser: User = {
  id: "1",
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "+1234567890",
  profilePicture: "/user-profile-illustration.png",
  role: "vendor",
  vendorProfile: {
    businessName: "John's Electronics",
    coverImage: "/electronics-store-cover.jpg",
    address: "123 Main St, City, State 12345",
    description: "Your trusted source for quality electronics and gadgets",
  },
};

const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    price: 99.99,
    image: "/wireless-headphones.png",
    status: "active",
    vendorId: "1",
  },
  {
    id: "2",
    name: "Smart Watch",
    price: 199.99,
    image: "/smartwatch-lifestyle.png",
    status: "active",
    vendorId: "1",
  },
  {
    id: "3",
    name: "Bluetooth Speaker",
    price: 79.99,
    image: "/bluetooth-speaker.jpg",
    status: "pending",
    vendorId: "1",
  },
];

const mockWishlist: WishlistItem[] = [
  {
    id: "1",
    userId: "1",
    productId: "4",
    product: {
      id: "4",
      name: "Laptop Stand",
      price: 49.99,
      image: "/laptop-stand.png",
      vendorId: "2",
    },
    createdAt: new Date(),
  },
  {
    id: "2",
    userId: "1",
    productId: "5",
    product: {
      id: "5",
      name: "USB-C Cable",
      price: 19.99,
      image: "/usb-c-cable.jpg",
      vendorId: "2",
    },
    createdAt: new Date(),
  },
];

const mockReviews: Review[] = [
  {
    id: "1",
    rating: 5,
    comment: "Excellent service and quality products! Highly recommend.",
    reviewerName: "Alice Smith",
    createdAt: new Date("2024-01-15"),
    vendorId: "1",
  },
  {
    id: "2",
    rating: 4,
    comment: "Great products, fast shipping. Will buy again.",
    reviewerName: "Bob Johnson",
    createdAt: new Date("2024-01-10"),
    vendorId: "1",
  },
];

export default function DashboardPage() {
  // Change isOwner to false to see the public view
  const isOwner = true;
  const isLoggedIn = true;

  return (
    <UserDashboard
      user={mockUser}
      isOwner={isOwner}
      products={mockProducts}
      wishlist={mockWishlist}
      reviews={mockReviews}
      isLoggedIn={isLoggedIn}
    />
  );
}
