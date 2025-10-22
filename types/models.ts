// TypeScript types for the UserDashboard component

export interface VendorProfile {
  id?: string;
  businessName: string;
  coverImage?: string;
  address?: string;
  description?: string;
  vendorId?: string;
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  profilePicture?: string;
  role: "user" | "vendor";
  vendorProfile?: VendorProfile;
  business_profile_id?: string;
  business_profile?: { id: string; business_name?: string } | null;
  vendor?: { id: string } | null;
}

export interface Product {
  id: string; // UUID
  vendorId: string; // FK -> VendorProfile.id
  name: string;
  description: string;
  price: string; // for display only (not transactions)
  images: string[]; // URLs to Google Storage
  categoryId?: string; // FK -> Category.id
  tags?: Tag[];
  status: "active" | "inactive" | "deleted";
  createdAt: string;
  updatedAt: string;
  metadata: {}; // to contain more description of the item
  title?: string;
  category?: string;
  brand?: string;
  location?: string;
}

export interface Category {
  id: string; // UUID
  name: string;
  slug: string; // URL-friendly identifier
  parentCategory: string[] | null; // FK -> Category.id (self-referential)
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WishlistItem {
  id: string;
  userId: string;
  productId: string;
  product?: Product;
  createdAt: string;
}

export interface Tag {
  id: string; // UUID
  name: string;
  createdAt: string;
  updatedAt: string;
}

export type CategoryName =
  | "Environment"
  | "Consumer Electronics"
  | "Home & Garden"
  | "Commercial Equipment"
  | "Beauty"
  | "Jewelry"
  | "Industrial Machinery"
  | "Business Services"
  | "Apparel & Accessories"
  | "Sports"
  | "Vehicle Parts"
  | "Packaging"
  | "Tools & Hardware"
  | "Toys";
