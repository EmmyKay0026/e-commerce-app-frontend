// data/products.ts
export type Product = {
  id: string;
  title: string;
  price: number; // numeric price for filtering
  priceLabel?: string; // formatted display (e.g. ₦10,128.30-15,582)
  location?: string;
  brand?: string;
  category: string; // must match the dynamic category param
  image?: string;
  tags?: string[];
  listedDaysAgo?: number;
};

export const products: Product[] = [
  {
    id: "p1",
    title: "SJC New Upgrade Headlights for BMW 5 Series",
    price: 280476,
    priceLabel: "₦280,476-311,640",
    location: "Lagos, Ajah",
    brand: "SJC",
    category: "safety-security",
    image: "/samples/headlight.jpg",
    tags: ["popular"],
    listedDaysAgo: 20,
  },
  {
    id: "p2",
    title: "SJC Laser Dual-Color Yellow & White Headlights",
    price: 444087,
    priceLabel: "₦444,087-560,952",
    location: "Lagos, Ikeja",
    brand: "SJC",
    category: "safety-security",
    image: "/samples/headlight2.jpg",
    tags: [],
    listedDaysAgo: 35,
  },
  {
    id: "p3",
    title: "India CEAT BULAND MRF TVS Three Wheeler Tyre",
    price: 10128,
    priceLabel: "₦10,128.30-15,582",
    location: "Lagos, Ajah",
    brand: "CEAT",
    category: "safety-security",
    image: "/samples/tire.jpg",
    tags: [],
    listedDaysAgo: 12,
  },
  {
    id: "p4",
    title: "Industrial Welding Torch 100W",
    price: 18698,
    priceLabel: "₦18,698.40-21,814.80",
    location: "Abuja",
    brand: "FKD",
    category: "welding",
    image: "/samples/welder.jpg",
    tags: [],
    listedDaysAgo: 4,
  },
  {
    id: "p5",
    title: "Cutting Disc Pack of 10",
    price: 1402,
    priceLabel: "₦1,402.38-2,025.66",
    location: "Port Harcourt",
    brand: "Generic",
    category: "machining-cutting-tools",
    image: "/samples/cutting.jpg",
    tags: [],
    listedDaysAgo: 2,
  },

  // Add more mock products for different categories
  {
    id: "p6",
    title: "Hydraulic Press - Heavy Duty",
    price: 2500000,
    priceLabel: "₦2,500,000",
    location: "Lagos",
    brand: "HydroCorp",
    category: "industrial-machinery",
    image: "/samples/press.jpg",
    tags: ["new"],
    listedDaysAgo: 60,
  },
];
