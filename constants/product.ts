// import { Product, Tag } from "./product";

import { Category, Product } from "@/types/models";

// Demo tags
const tagNew = {
  id: "tag-1",
  name: "New Arrival",
  createdAt: "2024-06-01T10:00:00Z",
  updatedAt: "2024-06-01T10:00:00Z",
};

const tagSale = {
  id: "tag-2",
  name: "On Sale",
  createdAt: "2024-06-02T10:00:00Z",
  updatedAt: "2024-06-02T10:00:00Z",
};

const tagPopular = {
  id: "tag-3",
  name: "Popular",
  createdAt: "2024-06-03T10:00:00Z",
  updatedAt: "2024-06-03T10:00:00Z",
};

export const demoCategories: Category[] = [
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    parent_category_id: null,
    description: "Latest gadgets and electronic devices.",
  },
  {
    id: "cat-home",
    name: "Home & Kitchen",
    slug: "home-kitchen",
    parent_category_id: ["cat-electronics"],
    description: "Essentials and accessories for your home.",
  },
  {
    id: "cat-sports",
    name: "Sports & Outdoors",
    slug: "sports-outdoors",
    parent_category_id: ["cat-electronics", "cat-home"],
    description: "Gear and equipment for sports and outdoor activities.",
  },
  {
    id: "cat-fashion",
    name: "Fashion",
    slug: "fashion",
    parent_category_id: ["cat-electronics", "cat-home", "cat-sports"],
    description: "Trendy clothing and accessories.",
  },
];

// Demo products
// export const demoProducts = [];
export const demoProducts = [
  {
    id: "prod-4",
    product_owner_id: "2",
    name: "Smart LED Desk Lamp",
    description:
      "Adjustable LED desk lamp with touch controls and USB charging port.",
    price: "39.99",
    images: [
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/thermal_arc_175se_1-600x600.jpg",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/12570_A_Conk-600x600.jpg",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/hoist10500kg-1-600x600.webp",
    ],
    category_id: "cat-home",
    tags: [],
    status: "active",
    created_at: "2024-06-04T11:00:00Z",
    metadata: {
      color: "White",
      brightnessLevels: 5,
      power: "10W",
    },
  },
  {
    id: "prod-5",
    product_owner_id: "3",
    name: "Bluetooth Fitness Tracker",
    description:
      "Track your steps, heart rate, and sleep with this stylish fitness tracker.",
    price: "49.99",
    images: [
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/shackles-01.jpg",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/Tagline_grande.webp",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/enerpac-h700-series-high-pressure-hydraulic-hoses-600x600.jpg",
    ],
    category_id: "cat-sports",
    tags: [],
    status: "active",
    created_at: "2024-06-05T09:00:00Z",
    metadata: {
      batteryLife: "7 days",
      waterproof: true,
      color: "Blue",
    },
  },
  {
    id: "prod-6",
    product_owner_id: "3",
    name: "Minimalist Analog Watch",
    description:
      "Elegant analog watch with a minimalist design and leather strap.",
    price: "79.99",
    images: [
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/bosch-twist-drill-bits-co14b-64_1000-600x600.webp",
    ],
    category_id: "cat-fashion",
    tags: [],
    status: "active",
    created_at: "2024-06-06T10:30:00Z",
    metadata: {
      strapMaterial: "Leather",
      waterResistant: true,
      color: "Brown",
    },
  },
  {
    id: "prod-7",
    product_owner_id: "4",
    name: "Portable Bluetooth Speaker",
    description: "Compact speaker with powerful sound and long battery life.",
    price: "59.99",
    images: [
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/aodd-pump-1-2-bsp-15mm--300x300.jpg",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/ofite-machined-metal-mud-balance-500x500-1.jpg",
    ],
    category_id: "cat-electronics",
    tags: [],
    status: "active",
    created_at: "2024-06-07T14:00:00Z",
    metadata: {
      batteryLife: "12 hours",
      waterproof: false,
      color: "Red",
    },
  },
  {
    id: "prod-8",
    product_owner_id: "4",
    name: "Classic Canvas Backpack",
    description: "Durable canvas backpack perfect for school, work, or travel.",
    price: "34.99",
    images: [
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/01_780c24cf-7695-4542-9877-fbab77c5d2d6_1024x-fotor-2024090401048.png",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/main-qimg-aa51dc1a730d035fc7e3fb3e5311bab0-lq-fotor-202409040919.png",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/MD-0623-p6_fig1-fotor-202409040211.png",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/electrical-lights-1499158560-3102793-fotor-202409040737.png",
      "https://industrialmartnigeria.com/wp-content/uploads/2024/09/1-fotor-202409040615.png",
    ],
    category_id: "cat-fashion",
    tags: [],
    status: "active",
    created_at: "2024-06-08T08:45:00Z",
    metadata: {
      capacity: "20L",
      color: "Green",
      waterproof: false,
    },
  },
  {
    id: "prod-1",
    product_owner_id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
    price: "99.99",
    images: ["/wireless-headphones.png", "/usb-c-cable.png"],
    category_id: "cat-electronics",
    tags: [],
    status: "active",
    created_at: "2024-06-01T12:00:00Z",
    metadata: {
      color: "Black",
      batteryLife: "20 hours",
      warranty: "1 year",
    },
  },
  {
    id: "prod-2",
    product_owner_id: "1",
    name: "Eco-Friendly Water Bottle",
    description: "Reusable water bottle made from sustainable materials.",
    price: "19.99",
    images: [
      "/smartwatch-lifestyle.png",
      "/laptop-stand.png",
      "/bluetooth-speaker.jpg",
      "/laptop-stand.png",
      "/wireless-headphones.png",
      "/laptop-stand.png",
      "/bluetooth-speaker.jpg",
      "/laptop-stand.png",
      "/wireless-headphones.png",
    ],
    category_id: "cat-home",
    tags: [],
    status: "active",
    created_at: "2024-06-02T09:30:00Z",
    metadata: {
      material: "Stainless Steel",
      capacity: "750ml",
      dishwasherSafe: true,
    },
  },
  {
    id: "prod-3",
    product_owner_id: "2",
    name: "Yoga Mat",
    description: "Non-slip yoga mat for all types of exercises.",
    price: "29.99",
    images: ["/bluetooth-speaker.jpg", "/laptop-stand.png"],
    category_id: "cat-sports",
    tags: [],
    status: "active",
    created_at: "2024-06-03T08:15:00Z",
    metadata: {
      thickness: "6mm",
      color: "Purple",
      ecoFriendly: true,
    },
  },
];

export const demoWishlist = [
  {
    id: "wishlist-1",
    userId: "user-1",
    productId: "prod-1",

    createdAt: "2024-06-04T10:00:00Z",
  },
  {
    id: "wishlist-2",
    userId: "user-1",
    productId: "prod-3",
    createdAt: "2024-06-04T10:05:00Z",
  },
];
