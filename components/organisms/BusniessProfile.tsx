"use client";

// import type { User, Product, WishlistItem, Review } from "@/types/models";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  HelpCircle,
  FileText,
  Headphones,
  Settings,
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Star,
  Trash2,
  PenSquareIcon,
} from "lucide-react";
import { User, Product, WishlistItem } from "@/types/models";
import { getInitials } from "@/services/user";
import { useEffect, useState } from "react";

interface BusinessDashboardProps {
  user: User;
  isOwner: boolean;
  products: Product[];
  wishlist: WishlistItem[];
  isLoggedIn?: boolean;
}

export function BusinessDashboard({
  user,
  isOwner,
  products,
  wishlist,
  isLoggedIn = false,
}: BusinessDashboardProps) {
  const quickLinks = [
    { icon: BookOpen, label: "User Guide", href: "/guide" },
    { icon: HelpCircle, label: "FAQ", href: "/faq" },
    { icon: FileText, label: "Terms & Conditions", href: "/terms" },
    { icon: Headphones, label: "Support", href: "/support" },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  if (isOwner) {
    const [fullWishlist, setFullWishlist] = useState<WishlistItem[]>(wishlist);

    useEffect(() => {
      // Populate wishlist items with their corresponding product objects
      const populatedWishlist = wishlist.map((item) => {
        const product = products.find((p) => p.id === item.productId);
        return product ? { ...item, product } : item;
      });
      setFullWishlist(populatedWishlist as any); // 'as any' if WishlistItem doesn't have 'product' field
    }, [wishlist, products]);

    // Private View
    return (
      <div className="min-h-screen bg-background py-6">
        <div className="mx-auto  space-y-8">
          {/* Profile Header */}
          <Card
            className="rounded-none w-full shadow-none"
            style={{
              background: `linear-gradient(8deg,rgba(0, 0, 0, 0.47) 0%, rgba(84, 84, 84, 0) 100%),url('${user.vendorProfile?.coverImage}')`,
              backgroundSize: "cover",
              backgroundPosition: "top",
            }}
          >
            <CardContent className="p-6 pt-40 shadow-0">
              <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={user.profilePicture || "/placeholder.svg"}
                    alt={user.fullName}
                  />
                  <AvatarFallback className="text-xl font-bold">
                    {getInitials(user.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <h1 className="text-3xl  font-bold text-background">
                    {user.fullName}
                  </h1>
                  <div className="space-y-1 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      <span>{user.email}</span>
                    </div>
                    {user.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4" />
                        <span>{user.phoneNumber}</span>
                      </div>
                    )}
                  </div>
                </div>
                <Button className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary hover:text-secondary-foreground">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="px-6">
            <Card className="rounded-xl shadow-sm">
              <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
                <div className="flex justify-between">
                  <h2 className="mb-4 text-lg font-bold text-foreground">
                    Business Information
                  </h2>
                  <Button variant="outline" size="sm" className="rounded-lg">
                    <PenSquareIcon />
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <article className="space-y-2 ">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-muted-foreground">
                        Business Name:
                      </h4>
                      <p className="text-muted-foreground">{user.fullName}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-muted-foreground">
                        Email:
                      </h4>
                      <p className="text-muted-foreground">{user.email}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-muted-foreground">
                        Joined in:
                      </h4>
                      <p className="text-muted-foreground">2025</p>
                    </div>
                  </article>

                  <article className="space-y-2 ">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-muted-foreground">
                        WhatsApp contact:
                      </h4>
                      <p className="text-muted-foreground"></p>{" "}
                      {user.phoneNumber}
                    </div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-muted-foreground">
                        Phone number:
                      </h4>
                      <p className="text-muted-foreground"></p>{" "}
                      {user.phoneNumber}
                    </div>
                  </article>
                </div>
              </CardContent>
            </Card>
            {/* <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              {quickLinks.map((link) => (
                <Card
                  key={link.label}
                  className="cursor-pointer rounded-xl shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex flex-col items-center justify-center gap-3 p-6">
                    <link.icon className="h-8 w-8 text-primary" />
                    <span className="text-center text-sm font-medium text-foreground">
                      {link.label}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div> */}
          </div>

          {/* Wishlist */}
          <div className="px-6">
            <h2 className="mb-4 text-lg font-bold text-foreground">
              My Wishlist
            </h2>
            {wishlist.length === 0 ? (
              <Card className="rounded-xl shadow-sm">
                <CardContent className="p-6 text-center text-muted-foreground">
                  Your wishlist is empty
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                {fullWishlist.map((item) => (
                  <Card key={item.id} className="rounded-xl shadow-sm">
                    <CardContent className="p-4">
                      <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
                        {item?.product?.images ? (
                          <img
                            src={item.product.images[0] || "/placeholder.svg"}
                            alt={item.product.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>
                      <h3 className="mb-2 text-sm font-medium text-foreground">
                        {item?.product?.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-bold text-primary">
                          ${item?.product?.price}
                        </span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Vendor Products */}
          {user.role === "vendor" && (
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">
                My Products
              </h2>
              {products.length === 0 ? (
                <Card className="rounded-xl shadow-sm">
                  <CardContent className="p-6 text-center text-muted-foreground">
                    You haven't listed any products yet
                  </CardContent>
                </Card>
              ) : (
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                  {products.map((product) => (
                    <Card key={product.id} className="rounded-xl shadow-sm">
                      <CardContent className="p-4">
                        <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
                          {product.images ? (
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                          {product.status && (
                            <Badge
                              className="absolute right-2 top-2"
                              variant={
                                product.status === "active"
                                  ? "default"
                                  : product.status === "inactive"
                                  ? "secondary"
                                  : "outline"
                              }
                            >
                              {product.status}
                            </Badge>
                          )}
                        </div>
                        <h3 className="mb-2 text-sm font-medium text-foreground">
                          {product.name}
                        </h3>
                        <span className="text-sm font-bold text-primary">
                          ${product.price}
                        </span>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Settings Button */}
          <div className="flex justify-center">
            <Button
              variant="outline"
              className="rounded-lg px-6 py-2 bg-transparent"
              size="lg"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Public View (Vendor Profile)
  const isVendor = user.role === "vendor";
  const displayName = isVendor
    ? user.vendorProfile?.businessName || user.fullName
    : user.fullName;

  return (
    <div className="min-h-screen bg-background">
      {/* Cover Image */}
      {isVendor && user.vendorProfile?.coverImage && (
        <div className="relative h-48 w-full overflow-hidden bg-muted md:h-64">
          <img
            src={user.vendorProfile.coverImage || "/placeholder.svg"}
            alt="Cover"
            className="h-full w-full object-cover"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl space-y-8 p-6">
        {/* Vendor Profile Header */}
        <Card className="rounded-xl shadow-sm">
          <CardContent className="p-6">
            <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-center">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src={user.profilePicture || "/placeholder.svg"}
                  alt={displayName}
                />
                <AvatarFallback className="text-xl">
                  {getInitials(displayName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-3">
                <h1 className="text-xl font-bold text-foreground">
                  {displayName}
                </h1>
                {isVendor && user.vendorProfile?.description && (
                  <p className="text-sm text-muted-foreground">
                    {user.vendorProfile.description}
                  </p>
                )}

                {/* Contact Info */}
                <div className="space-y-2">
                  <h3 className="text-sm font-semibold text-foreground">
                    Contact Information
                  </h3>
                  {isLoggedIn ? (
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {user.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <MessageCircle className="h-4 w-4 text-green-600" />
                          <a
                            href={`https://wa.me/${user.phoneNumber.replace(
                              /\D/g,
                              ""
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:underline"
                          >
                            WhatsApp
                          </a>
                        </div>
                      )}
                      {user.phoneNumber && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4" />
                          <span>{user.phoneNumber}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <span>{user.email}</span>
                      </div>
                      {isVendor && user.vendorProfile?.address && (
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4" />
                          <span>{user.vendorProfile.address}</span>
                        </div>
                      )}
                    </div>
                  ) : (
                    <Button className="rounded-lg bg-primary px-4 py-2 text-white hover:bg-secondary hover:text-secondary-foreground">
                      Login to view contact info
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Products Section */}
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">Products</h2>
          {products.length === 0 ? (
            <Card className="rounded-xl shadow-sm">
              <CardContent className="p-6 text-center text-muted-foreground">
                No products available
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="cursor-pointer rounded-xl shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="p-4">
                    <div className="relative mb-3 aspect-square overflow-hidden rounded-lg bg-muted">
                      {product.images ? (
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-muted-foreground">
                          No image
                        </div>
                      )}
                    </div>
                    <h3 className="mb-2 text-sm font-medium text-foreground">
                      {product.name}
                    </h3>
                    <span className="text-sm font-bold text-primary">
                      ${product.price}
                    </span>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
