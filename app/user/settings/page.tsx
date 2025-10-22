"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { mockUser } from "@/constants/userData";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import { Edit, LucideSettings } from "lucide-react";
import Image from "next/image";
import React from "react";

const Settings = () => {
  const user = useUserStore((state) => state.user);
  // const user: User = mockUser;
  return (
    <div
      className="settings-page"
      // style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}
    >
      <h1>Settings</h1>
      <div style={{ marginTop: "2rem" }}>
        <Card className=" mb-6 rounded-xl shadow-sm">
          <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Update profile and Store photo
              </h2>
              {/* <Button variant="outline" size="sm" className="rounded-lg">
                    <PenSquareIcon />
                  </Button> */}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="space-y-2 ">
                <div className="flex flex-col  gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Personal photo:
                  </h4>
                  <Image
                    src={user?.profilePicture ?? ""}
                    alt={user?.fullName ?? "null"}
                    width={200}
                    height={200}
                    className="object-cover rounded-full w-60 h-60"
                  />
                </div>
              </article>

              <article className="space-y-2 ">
                <div className="flex flex-col  gap-2">
                  <h4 className="font-bold whitespace-nowrap text-muted-foreground">
                    Business photo:
                  </h4>
                  <div className="relative w-60 h-60">
                    <Image
                      src={user?.vendorProfile?.coverImage ?? ""}
                      alt={user?.vendorProfile?.businessName ?? "null"}
                      width={200}
                      height={200}
                      className="object-cover rounded-full w-60 h-60"
                    />
                    <Edit className="absolute bottom-2 right-2 w-6 h-6 text-white p-3 rounded-full  cursor-pointer" />
                  </div>
                </div>
              </article>
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6 p-4 gap-2">
          <CardHeader className="font-bold">
            {/* <h2 className="text-lg font-semibold "> */}
            Personal information
            {/* </h2> */}
          </CardHeader>
          {/* <CardDescription> */}
          {/* <p className="text-sm text-gray-600"> */}
          {/* Manage your account information and settings. */}
          {/* </p> */}
          {/* </CardDescription> */}
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="space-y-2 ">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Full name:
                  </h4>
                  <p className="text-muted-foreground">{user?.fullName}</p>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">Email:</h4>
                  <p className="text-muted-foreground">{user?.email}</p>
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
                  <p className="text-muted-foreground"></p> {user?.phoneNumber}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Phone number:
                  </h4>
                  <p className="text-muted-foreground"></p> {user?.phoneNumber}
                </div>
              </article>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 rounded-xl shadow-sm">
          <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Store Information
              </h2>
              {/* <Button variant="outline" size="sm" className="rounded-lg">
                    <PenSquareIcon />
                  </Button> */}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="space-y-2 ">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Store name:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.vendorProfile?.businessName ?? "none"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Store address:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.vendorProfile?.address ?? "none"}
                  </p>
                </div>
              </article>

              <article className="space-y-2 ">
                <div className="flex  gap-2">
                  <h4 className="font-bold whitespace-nowrap text-muted-foreground">
                    Store description:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.vendorProfile?.description ?? "none"}
                  </p>
                </div>
              </article>
            </div>
          </CardContent>
        </Card>
        <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Security Information
              </h2>
              {/* <Button variant="outline" size="sm" className="rounded-lg">
                    <PenSquareIcon />
                  </Button> */}
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="space-y-2 ">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Store name:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.vendorProfile?.businessName ?? "none"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Store address:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.vendorProfile?.address ?? "none"}
                  </p>
                </div>
              </article>

              <article className="space-y-2 ">
                <div className="flex  gap-2">
                  <h4 className="font-bold whitespace-nowrap text-muted-foreground">
                    Store description:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.vendorProfile?.description ?? "none"}
                  </p>
                </div>
              </article>
            </div>
          </CardContent>
        </Card>
        <section style={{ marginBottom: "2rem" }}>
          <h2>Personal Settings</h2>
        </section>
        <section style={{ marginBottom: "2rem" }}>
          <h2>Business Settings</h2>
          <ul>
            <li>Business Profile</li>
            <li>Team Members</li>
            <li>Payment Methods</li>
          </ul>
        </section>
        <section>
          <h2>Security Settings</h2>
          <ul>
            <li>Password</li>
            <li>Two-Factor Authentication</li>
            <li>Login Activity</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default Settings;
