// import { Product, Tag } from "./product";

import { Product, Tag, WishlistItem } from "@/types/models";

// Demo tags
const tagNew: Tag = {
  id: "tag-1",
  name: "New Arrival",
  createdAt: new Date("2024-06-01T10:00:00Z"),
  updatedAt: new Date("2024-06-01T10:00:00Z"),
};

const tagSale: Tag = {
  id: "tag-2",
  name: "On Sale",
  createdAt: new Date("2024-06-02T10:00:00Z"),
  updatedAt: new Date("2024-06-02T10:00:00Z"),
};

const tagPopular: Tag = {
  id: "tag-3",
  name: "Popular",
  createdAt: new Date("2024-06-03T10:00:00Z"),
  updatedAt: new Date("2024-06-03T10:00:00Z"),
};

// Demo products
// export const demoProducts = [];
export const demoProducts: Product[] = [
  {
    id: "prod-1",
    vendorId: "vendor-1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 99.99,
    images: ["/wireless-headphones.png", "/usb-c-cable.png"],
    categoryId: "cat-electronics",
    tags: [tagNew, tagPopular],
    status: "active",
    createdAt: new Date("2024-06-01T12:00:00Z"),
    updatedAt: new Date("2024-06-01T12:00:00Z"),
    metadata: {
      color: "Black",
      batteryLife: "20 hours",
      warranty: "1 year",
    },
  },
  {
    id: "prod-2",
    vendorId: "vendor-2",
    name: "Eco-Friendly Water Bottle",
    description: "Reusable water bottle made from sustainable materials.",
    price: 19.99,
    images: ["/smartwatch-lifestyle.png", "/laptop-stand.png"],
    categoryId: "cat-home",
    tags: [tagSale],
    status: "active",
    createdAt: new Date("2024-06-02T09:30:00Z"),
    updatedAt: new Date("2024-06-02T09:30:00Z"),
    metadata: {
      material: "Stainless Steel",
      capacity: "750ml",
      dishwasherSafe: true,
    },
  },
  {
    id: "prod-3",
    vendorId: "vendor-3",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for all types of exercises.",
    price: 29.99,
    images: ["/bluetooth-speaker.jpg", "/laptop-stand.png"],
    categoryId: "cat-sports",
    tags: [tagPopular],
    status: "active",
    createdAt: new Date("2024-06-03T08:15:00Z"),
    updatedAt: new Date("2024-06-03T08:15:00Z"),
    metadata: {
      thickness: "6mm",
      color: "Purple",
      ecoFriendly: true,
    },
  },
];

export const demoWishlist: WishlistItem[] = [
  {
    id: "wishlist-1",
    userId: "user-1",
    productId: "prod-1",

    createdAt: new Date("2024-06-04T10:00:00Z"),
  },
  {
    id: "wishlist-2",
    userId: "user-1",
    productId: "prod-3",
    createdAt: new Date("2024-06-04T10:05:00Z"),
  },
];
