// components/vendor/HeroSection.tsx
"use client";
// import { Badge } from "@/components-ui/badge";
import Image from "next/image";
import { BusinessProfile, User } from "@/types/models";
import { getInitials } from "@/services/userService";
import Link from "next/link";
import ShowContactButton from "../atoms/ShowContactButton";
import { MapPin } from "lucide-react";

export function HeroSection({ vendor }: { vendor: BusinessProfile & { user?: User } }) {
  return (
    <section className="relative w-full">
      <div className="relative h-[400px] w-full overflow-hidden">
        <Image
          fill
          sizes="100vw"
          src={vendor?.cover_image ?? ""}
          alt={vendor?.business_name ?? vendor?.user?.first_name ?? "Vendor"} // ← FIXED
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/50 to-transparent" />
      </div>

      <div className="container mx-auto px-4">
        <div className="relative -mt-20 md:-mt-24">
          <div className="flex flex-col md:flex-row gap-6 items-start md:items-end">
            <div className="flex h-32 w-32 md:h-40 md:w-40 items-center justify-center rounded-2xl bg-background border-4 border-background shadow-xl">
              {vendor?.user?.profile_picture ? (
                <Image
                  src={vendor.user.profile_picture}
                  alt={vendor?.user?.first_name}
                  width={160}
                  height={160}
                  className="w-full h-full rounded-2xl object-cover"
                />
              ) : (
                <span className="text-4xl md:text-5xl font-bold text-primary">
                  {getInitials(
                    (vendor?.user?.first_name || "") +
                      " " +
                      (vendor?.user?.last_name || "")
                  )}
                </span>
              )}
            </div>

            <div className="flex-1 bg-card rounded-xl p-6 shadow-lg border">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-2">
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                    {vendor?.business_name ?? `${vendor?.user?.first_name || "Vendor"}'s Business`}
                  </h1>
                  <p className="text-muted-foreground text-balance max-w-2xl line-clamp-4">
                    {vendor?.description}
                  </p>
                  {vendor?.user?.id && (
                    <Link href={`/user/${vendor.user.id}/profile`}>
                      <p>
                        owned by{" "}
                        <span className="font-semibold text-foreground">
                          {vendor.user.first_name} {vendor.user.last_name}
                        </span>
                      </p>
                    </Link>
                  )}
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>Lagos, Nigeria</span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <ShowContactButton
                    userPhoneNumber={vendor?.user?.phone_number ?? "No contact info"}
                  />
                  {vendor?.user?.whatsapp_number && (
                    <ShowContactButton
                      userPhoneNumber={vendor.user.whatsapp_number}
                      type="whatsapp"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}