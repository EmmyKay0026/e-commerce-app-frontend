"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
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
import { updateBusinessProfile } from "@/services/businessProfileService";

export function EditBusinessProfile() {
  const [open, setOpen] = React.useState(false);
  const isMobile = useMediaQuery();
  if (!isMobile) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Edit business</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit business</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <BusinessForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit business</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit business</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when you&apos;re done.
          </DrawerDescription>
        </DrawerHeader>
        <BusinessForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function BusinessForm({ className }: React.ComponentProps<"form">) {
  const api = useApi();
  const router = useRouter();
  // const rawUser = useUserStore((s) => s.user) as any;
  const setUser = useUserStore((s) => s.setUser);
  const user = useUserStore((s) => s.user);
  const altBusName = user?.first_name + "'s business";
  // const user = React.useMemo(
  //   () => (rawUser ? normalizeToUser(rawUser) : null),
  //   [rawUser]
  // );

  const [businessName, setBusinessName] = useState<string>(
    user?.business_profile?.business_name ?? altBusName ?? "none"
  );
  const [slug, setSlug] = useState<string>(
    user?.business_profile?.slug ?? "none"
  );
  const [desc, setDesc] = useState<string>(
    user?.business_profile?.description ?? "none"
  );
  const [address, setAddress] = useState<string>(
    user?.business_profile?.address ?? "none"
  );
  // const [phoneNumber, setPhoneNumber] = useState<string>(
  //   user?.phone_number ?? "none"
  // );
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

    if (!businessName) {
      setError("Business name are required");
      return;
    }

    setLoading(true);
    try {
      // businessName slug desc,address
      // Build payload accommodating common backend shapes
      const body: any = {
        business_name: businessName,
        slug: slug.toLowerCase(),
        description: desc,

        address,
      };

      // PATCH users/me (API expects authenticated request; useApi attaches token)
      const res = await updateBusinessProfile(body);
      // api.patch<any>("users/me", body);

      // update client store if setter exists
      try {
        if (setUser && typeof setUser === "function") {
          setUser(res.data as any);
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
      <div className="grid gap-3 flex-1">
        <Label htmlFor="bus_name">Business name</Label>
        <Input
          id="bus_name"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
        />
      </div>

      <div className="grid gap-3 flex-1">
        <Label htmlFor="desc">Description</Label>
        <textarea
          id="desc"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          rows={4}
          className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="address">Address</Label>
        <Input
          id="address"
          type="text"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="phone_number">Slug</Label>
        <Input
          id="phone_number"
          placeholder={slug}
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
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
