"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { cn, formatPhoneNumber } from "@/lib/utils";
import { useIsMobile as useMediaQuery } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/useUserStore";
import useApi from "@/hooks/useApi";
import type { User } from "@/types/models";
import { updateProfile } from "@/services/userService";

export function EditProfile() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery();
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

// function splitFullName(fullName?: string) {
//   const parts = (fullName ?? "").trim().split(/\s+/).filter(Boolean);
//   return {
//     first: parts.length ? parts[0] : "",
//     last: parts.length > 1 ? parts.slice(1).join(" ") : "",
//   };
// }

/**
 * Normalize arbitrary backend/user shapes into the local User type
 */
// function normalizeToUser(raw: any): User {
//   const id = String(raw?.id ?? raw?.user_id ?? raw?.uuid ?? "");
//   const first =
//     raw?.first_name ??
//     raw?.firstName ??
//     raw?.first ??
//     splitFullName(raw?.fullName ?? raw?.name).first;
//   const last =
//     raw?.last_name ??
//     raw?.lastName ??
//     raw?.last ??
//     splitFullName(raw?.fullName ?? raw?.name).last;
//   const fullName =
//     raw?.fullName ||
//     `${first}${last ? " " + last : ""}`.trim() ||
//     raw?.name ||
//     "";
//   const email = raw?.email ?? raw?.user?.email ?? "";
//   const phoneNumber =
//     raw?.phone_number ?? raw?.phoneNumber ?? raw?.phone ?? undefined;
//   const profilePicture =
//     raw?.profile_picture ??
//     raw?.profilePicture ??
//     raw?.avatar ??
//     raw?.photoUrl ??
//     undefined;
//   const role = (raw?.role as any) ?? (raw?.vendor ? "vendor" : "user");
//   const vendorProfile =
//     raw?.vendor ??
//     raw?.vendorProfile ??
//     (raw?.business_profile ? { ...raw.business_profile } : undefined) ??
//     raw?.business_profile?.vendor ??
//     undefined;

//   return {
//     id,
//     fullName,
//     email,
//     phoneNumber,
//     profilePicture,
//     role,
//     vendorProfile: vendorProfile
//       ? {
//           id: vendorProfile?.id ?? vendorProfile?.vendorId ?? undefined,
//           businessName:
//             vendorProfile?.business_name ??
//             vendorProfile?.businessName ??
//             vendorProfile?.name ??
//             "",
//           coverImage:
//             vendorProfile?.cover_image ??
//             vendorProfile?.coverImage ??
//             undefined,
//           address: vendorProfile?.address ?? undefined,
//           description: vendorProfile?.description ?? undefined,
//           vendorId: vendorProfile?.vendorId ?? undefined,
//         }
//       : undefined,
//     business_profile_id:
//       raw?.business_profile_id ?? raw?.business_profile?.id ?? undefined,
//     business_profile: raw?.business_profile ?? undefined,
//     vendor: raw?.vendor ? { id: raw.vendor.id } : raw?.vendor ?? null,
//   } as User;
// }

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const api = useApi();
  const router = useRouter();
  // const rawUser = useUserStore((s) => s.user) as any;
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);
  const altStoreName = user?.first_name + "'s business";
  // const user = React.useMemo(
  //   () => (rawUser ? normalizeToUser(rawUser) : null),
  //   [rawUser]
  // );

  const [firstName, setFirstName] = useState<string>(
    user?.first_name ?? "none"
  );
  const [lastName, setLastName] = useState<string>(user?.last_name ?? "none");
  const [email, setEmail] = useState<string>(user?.email ?? "none");
  const [whatsAppNumber, setWhatsAppNumber] = useState<string>(
    user?.whatsapp_number ?? "none"
  );
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phone_number ?? "none"
  );
  // const [storeName, setStoreName] = React.useState<string>(
  //   user?.business_profile?.business_name ?? altStoreName ?? "none"
  // );
  // const [storeDesc, setStoreDesc] = React.useState<string>(
  //   user?.business_profile?.description ?? "none"
  // );
  // const [storeAddress, setStoreAddress] = React.useState<string>(
  //   user?.business_profile?.address ?? "none"
  // );

  // React.useEffect(() => {
  //   setFirstName(splitFullName(user?.fullName).first);
  //   setLastName(splitFullName(user?.fullName).last);
  //   setEmail(user?.email ?? "");
  //   setStoreName(
  //     user?.business_profile?.business_name ??
  //       user?.vendorProfile?.businessName ??
  //       ""
  //   );
  //   setStoreDesc(
  //     user?.business_profile?.description ??
  //       user?.vendorProfile?.description ??
  //       ""
  //   );
  //   setStoreAddress(
  //     user?.business_profile?.address ?? user?.vendorProfile?.address ?? ""
  //   );
  // }, [user]);

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!firstName || !lastName) {
      setError("First and last name are required");
      return;
    }

    setLoading(true);
    try {
      // Build payload accommodating common backend shapes
      const body: any = {
        first_name: firstName,
        last_name: lastName,
        phone_number: phoneNumber,
        whatsapp_number: whatsAppNumber,
        email,
      };

      // PATCH users/me (API expects authenticated request; useApi attaches token)
      const res = await updateProfile(body);
      // api.patch<any>("users/me", body);
      console.log(res.data);

      // update client store if setter exists
      try {
        if (setUser && typeof setUser === "function") {
          setUser(res.data as User);
        }
      } catch {
        // ignore store update errors
      }

      setSuccess("Profile updated");
      // try {
      //   router.refresh();
      // } catch {
      //   /* noop */
      // }
      setTimeout(() => setSuccess(null), 1500);
    } catch (err: any) {
      setError(err?.message ?? "Failed to update profile");
    } finally {
      setLoading(false);
    }
  }

  if (!user) {
    return (
      <div className={cn("p-4 bg-white rounded shadow", className)}>
        <p className="text-sm text-gray-600">
          You must be signed in to edit your profile.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn("grid items-start gap-6", className)}
    >
      <article className="flex flex-col md:flex-row md:items-start gap-4">
        <div className="grid gap-3 flex-1">
          <Label htmlFor="fname">First name</Label>
          <Input
            id="fname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="grid gap-3 flex-1">
          <Label htmlFor="lname">Last name</Label>
          <Input
            id="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
      </article>

      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="phone_number">Phone number</Label>
        <Input
          id="phone_number"
          value={formatPhoneNumber(phoneNumber)}
          onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="whatsapp_number">WhatsApp number</Label>
        <Input
          id="whatsapp_number"
          value={formatPhoneNumber(whatsAppNumber)}
          onChange={(e) => setWhatsAppNumber(formatPhoneNumber(e.target.value))}
        />
      </div>

      {/* <div className="grid gap-3">
        <Label htmlFor="store_address">Store address</Label>
        <Input
          id="store_address"
          value={storeAddress}
          onChange={(e) => setStoreAddress(e.target.value)}
        />
      </div> */}

      <div className="flex items-center gap-2">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save changes"}
        </Button>
        {error && <p className="text-sm text-red-600">{error}</p>}
        {success && <p className="text-sm text-green-600">{success}</p>}
      </div>
    </form>
  );
}
