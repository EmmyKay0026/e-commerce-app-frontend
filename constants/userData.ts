import { Product, User } from "@/types/models";

// Example data - replace with actual data fetching
export const mockUser = {
  id: "1",
  fullName: "John Doe",
  email: "john@example.com",
  phoneNumber: "+1234567890",
  profilePicture: "/user-profile-illustration.png",
  role: "vendor",
  vendorProfile: {
    vendorId: "1",
    businessName: "John's Electronics",
    coverImage: "/electronics-store-cover.jpg",
    address: "123 Main St, City, State 12345",
    description: "Your trusted source for quality electronics and gadgets",
  },
};
export const mockUser2 = {
  id: "2",
  fullName: "Jane Doe",
  email: "jane@example.com",
  phoneNumber: "+123324567890",
  profilePicture: "/jane_doe_profile.jpg",
  role: "user",
  vendorProfile: {
    vendorId: "2",
    businessName: "Jane's Electronics",
    coverImage: "/jane_doe_cover.jpg",
    address: "123 Main St, City, State 12345",
    description: "Your trusted source for quality electronics and gadgets",
  },
};
export const mockUser3 = {
  id: "3",
  fullName: "Joke Doe",
  email: "joke@example.com",
  phoneNumber: "+1236744567890",
  profilePicture: "/joke.jpg",
  role: "vendor",
  vendorProfile: {
    vendorId: "3",
    businessName: "Joke's Electronics",
    coverImage: "/joke_doe_cover.jpg",
    address: "123 Main St, City, State 12345",
    description: "Your trusted source for quality electronics and gadgets",
  },
};

export const userDB = [mockUser, mockUser2, mockUser3];

// const mockProducts: Product[] = [
//   {
//     id: "1",
//     name: "Wireless Headphones",
//     price: "99.99",
//     images: ["/wireless-headphones.png"],
//     status: "active",
//     vendorId: "1",
//     description: "",
//     createdAt: "",
//     updatedAt: "",
//     metadata: {},
//   },
//   {
//     id: "2",
//     name: "Smart Watch",
//     price: "199.99",
//     images: ["/smartwatch-lifestyle.png"],
//     status: "active",
//     vendorId: "1",
//     description: "",
//     createdAt: "new Date()",
//     updatedAt: "new Date()",
//     metadata: {},
//   },
//   {
//     id: "3",
//     name: "Bluetooth Speaker",
//     price: "79.99",
//     images: ["/bluetooth-speaker.jpg"],
//     status: "inactive",
//     vendorId: "1",
//     description: "",
//     createdAt: "new Date()",
//     updatedAt: "new Date()",
//     metadata: {},
//   },
// ];

export const mockWishlist = [
  {
    id: "1",
    userId: "1",
    productId: "4",
    product: {
      id: "4",
      name: "Laptop Stand",
      price: "49.99",
      images: ["/laptop-stand.png", "/laptop-stand-2.png"],
      vendorId: "2",
      description: "",
      status: "active",
      createdAt: "new Date()",
      updatedAt: "new Date()",
      metadata: {},
    },
    createdAt: "new Date()",
  },
  {
    id: "2",
    userId: "1",
    productId: "5",
    product: {
      id: "5",
      name: "USB-C Cable",
      price: "19.99",
      images: ["/usb-c-cable.jpg"],
      vendorId: "2",
      description: "",
      status: "active",
      createdAt: "new Date()",
      updatedAt: "new Date()",
      metadata: {},
    },
    createdAt: "new Date()",
  },
];

// const mockReviews: Review[] = [
//   {
//     id: "1",
//     rating: 5,
//     comment: "Excellent service and quality products! Highly recommend.",
//     reviewerName: "Alice Smith",
//     createdAt: new Date("2024-01-15"),
//     vendorId: "1",
//   },
//   {
//     id: "2",
//     rating: 4,
//     comment: "Great products, fast shipping. Will buy again.",
//     reviewerName: "Bob Johnson",
//     createdAt: new Date("2024-01-10"),
//     vendorId: "1",
//   },
// ];
