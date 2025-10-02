// TypeScript types for the UserDashboard component

export interface VendorProfile {
  businessName: string;
  coverImage?: string;
  address?: string;
  description?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: "user" | "vendor";
  vendorProfile?: VendorProfile;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image?: string;
  status?: "active" | "inactive" | "pending";
  vendorId: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product: Product;
  createdAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  reviewerName: string;
  createdAt: Date;
  vendorId: string;
}
