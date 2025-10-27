// TypeScript types for the UserDashboard component

export interface VendorProfile {
  id?: string;
  owner_id?: string;
  business_name: string;
  business_email: string;
  business_whatsapp_number: string;
  cover_image?: string;
  address?: string;
  description?: string;
  status?: "active" | "suspended" | "pending_verification" | "rejected";
  slug?: string;
  featured_product?: string[];
}

// fullName: string;
export interface User {
  id: string;
  first_name: string;
  last_name: string;
  phone_number?: string;
  email: string;
  created_at: string;
  whatsapp_number: string | null;
  is_verified: boolean;
  profile_picture?: string | null;
  role: "user" | "vendor";
  status: "active" | "suspended" | "deleted";
  last_login: string;
  shop_link: string;
  profile_link: string;
  saved_items: string[] | null;
  business_profile_id?: string | null;
  business_profile?: {
    id: string;
    business_name?: string;
    description: string;
    cover_image: string | null;
    total_products: number;
    rating: number;
    business_phone: string;
    business_whatsapp_number: string | null;
    email: string | null;
    address: string | null;
  } | null;
  suspended_status_release_date?: string;
}

export interface Product {
  id: string;
  product_owner_id: string;
  name: string;
  description: string;
  price: string;
  images: string[];
  category_id?: string;
  tags?: string[];
  status: "active" | "inactive" | "deleted" | "pending_review";
  created_at: string; // backend field
  updated_at?: string;
  metadata: Record<string, any>;
  views_count?: number;
  business?: {
    id: string;
    businessName: string;
    address?: string | null;
    businessPhoneNumber?: string | null;
    businessWhatsAppNumber?: string | null;
  };
}


export interface Category {
  id: string; // UUID
  name: string;
  slug: string; // URL-friendly identifier
  parent_category_id: string[] | null; // FK -> Category.id (self-referential)
  description?: string;
  icon?: string;
  image?: string;
  child_categories?: string[];
}



// export interface VendorProfile {
//   id?: string;
//   businessName: string;
//   coverImage?: string;
//   address?: string;
//   description?: string;
//   vendorId?: string;
// }

// export interface User {
//   id: string;
//   fullName: string;
//   email: string;
//   phoneNumber?: string;
//   profilePicture?: string;
//   role: "user" | "vendor";
//   vendorProfile?: VendorProfile;
//   business_profile_id?: string;
//   business_profile?: { id: string; business_name?: string } | null;
//   vendor?: { id: string } | null;
// }

// export interface Product {
//   id: string; // UUID
//   vendorId: string; // FK -> VendorProfile.id
//   name: string;
//   description: string;
//   price: string; // for display only (not transactions)
//   images: string[]; // URLs to Google Storage
//   categoryId?: string; // FK -> Category.id
//   tags?: Tag[];
//   status: "active" | "inactive" | "deleted";
//   createdAt: string;
//   updatedAt: string;
//   metadata: {}; // to contain more description of the item
//   title?: string;
//   category?: string;
//   brand?: string;
//   location?: string;
// }

// export interface Category {
//   id: string; // UUID
//   name: string;
//   slug: string; // URL-friendly identifier
//   parentCategory: string[] | null; // FK -> Category.id (self-referential)
//   description?: string;
//   createdAt: string;
//   updatedAt: string;
// }

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

// export type CategoryName =
//   | "Environment"
//   | "Consumer Electronics"
//   | "Home & Garden"
//   | "Commercial Equipment"
//   | "Beauty"
//   | "Jewelry"
//   | "Industrial Machinery"
//   | "Business Services"
//   | "Apparel & Accessories"
//   | "Sports"
//   | "Vehicle Parts"
//   | "Packaging"
//   | "Tools & Hardware"
//   | "Toys";
