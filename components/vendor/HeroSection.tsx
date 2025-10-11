"use client";
import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import { get } from "http";
import { getInitials } from "@/services/user";

export function HeroSection({ vendor }: { vendor: User }) {
  return (
    <section className="relative w-full">
      {/* Cover Image */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          fill
          sizes="100vw"
          src={vendor?.vendorProfile?.coverImage ?? ""}
          alt={vendor?.vendorProfile?.businessName ?? vendor.fullName}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
      </div>

      {/* Vendor Info Overlay */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 md:-mt-24">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            {/* Vendor Logo */}
            <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-2xl bg-background border-4 border-background shadow-xl">
              {vendor?.profilePicture ? (
                <Image
                  src={vendor.profilePicture}
                  alt={vendor?.vendorProfile?.businessName ?? vendor.fullName}
                  width={160}
                  height={360}
                  className="w-full h-full p-0 rounded-2xl object-cover"
                />
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {getInitials(
                    vendor?.vendorProfile?.businessName ?? vendor.fullName
                  )}
                </span>
              )}
            </div>

            {/* Vendor Details */}
            <div className="flex-1 bg-card rounded-xl p-6 shadow-lg border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                      {vendor?.vendorProfile?.businessName ?? vendor.fullName}
                    </h1>
                    <Badge variant="secondary" className="text-xs">
                      Verified Vendor
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-balance max-w-2xl line-clamp-4">
                    {vendor?.vendorProfile?.description}
                    {/* Your trusted source for premium electronics and gadgets.
                    Serving customers worldwide with quality products and
                    exceptional service since 2018. */}
                  </p>
                  <p className="">
                    owned by{" "}
                    <span className="font-semibold text-foreground">
                      {vendor.fullName}
                    </span>
                  </p>
                  <div className="flex items-center gap-4 flex-wrap text-sm">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-secondary text-secondary" />
                      <span className="font-semibold">4.8</span>
                      <span className="text-muted-foreground">
                        (2,450 reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>Lagos, Nigeria</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <Button size="lg" className="w-full md:w-auto">
                    <Phone className="h-4 w-4 mr-2" />
                    Show contact
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="w-full md:w-auto bg-transparent"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
