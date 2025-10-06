"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
// import { useMediaQuery } from "@/hooks/use-media-query";
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
import { PenBox } from "lucide-react";
import { useUserStore } from "@/store/useUserStore";

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

function ProfileForm({ className }: React.ComponentProps<"form">) {
  const user = useUserStore((state) => state.user);
  if (!user) return null;
  return (
    <form className={cn("grid items-start gap-6", className)}>
      <article className="flex items-center gap-4">
        <div className="grid gap-3">
          <Label htmlFor="fname">First name</Label>
          <Input type="text" id="fname" defaultValue={user.fullName} />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="lname">Last name</Label>
          <Input type="text" id="lname" defaultValue={user.fullName} />
        </div>
      </article>
      <div className="grid gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" defaultValue={user.email} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="store_name">Store name</Label>
        <Input
          id="store_name"
          defaultValue={user.vendorProfile?.businessName}
        />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="store_desc">Store description</Label>
        <Input id="store_desc" defaultValue={user.vendorProfile?.description} />
      </div>
      <div className="grid gap-3">
        <Label htmlFor="store_address">Store address</Label>
        <Input id="store_address" defaultValue={user.vendorProfile?.address} />
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  );
}
