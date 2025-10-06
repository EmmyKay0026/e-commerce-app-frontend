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
  id: string; // UUID
  vendorId: string; // FK -> VendorProfile.id
  name: string;
  description: string;
  price: number; // for display only (not transactions)
  images: string[]; // URLs to Google Storage
  categoryId?: string; // FK -> Category.id
  tags?: Tag[];
  status: "active" | "inactive" | "deleted";
  createdAt: Date;
  updatedAt: Date;
  metadata: {}; // to contain more description of the item
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: Date;
}

export interface Tag {
  id: string; // UUID
  name: string;
  createdAt: Date;
  updatedAt: Date;
}
