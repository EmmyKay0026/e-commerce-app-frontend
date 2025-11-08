// TypeScript types for the UserDashboard component

export interface BusinessProfile {
  id?: string;
  owner_id?: string;
  business_name?: string;
  business_email?: string;
  business_phone: string;

  business_whatsapp_number?: string;
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
  business_profile?: Partial<BusinessProfile> | null;
  suspended_status_release_date?: string;
}

export type VendorProfile = BusinessProfile & { user: User };

export interface CategoryInfo {
  name: string;
  slug: string;
}

export interface Product {
  id: string; // UUID
  product_owner_id: string; // FK -> VendorProfile.id
  name: string;
  description: string;
  price: string | undefined; // for display only (not transactions)
  images: string[]; // URLs to Google Storage
  category_id?: string; // FK -> Category.id
  category?: CategoryInfo;
  parentCategories?: CategoryInfo[];
  tags?: string[];
  status: "active" | "inactive" | "deleted" | "pending_review";
  created_at: string;
  location_lga?: string;
  location_state?: string;
  slug: string; // URL-friendly identifier
  price_input_mode?: "enter" | "quote";
  sale_type: "wholesale" | "retail";
  price_type: "fixed" | "negotiable";
  metadata: Record<string, any>; // to contain more description of the item
  view_count?: string;
  business: {
    id: string;
    business_name: string;
    address?: string;
    cover_image: string;
    slug: string;
    business_phone: string;
    business_whatsApp_number: string;
  }; // Vendor info
}

export interface Category {
  id: string; // UUID
  name: string;
  slug: string; // URL-friendly identifier
  parent_category_id: string[] | null; // FK -> Category.id (self-referential)
  description?: string;
  icon?: string;
  image?: string;
  child_categories?: string[]; // Sub categories
  parent_categories?: Category[];
}

export type State = {
  state_id: string;
  name: string;
  slug: string;
};
export type LGA = {
  lga_id: string;
  name: string;
  state_id: string;
  slug: string;
};

export interface CategoryTree extends Category {
  children?: CategoryTree[];
}

export type ServiceResult<T> = {
  success: boolean;
  status?: number;
  data?: T | null;
  error?: string | null;
};

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
