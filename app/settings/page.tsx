"use client";
import { EditBusinessProfile } from "@/components/organisms/EditBusinessProfile";
import { EditProfile } from "@/components/organisms/EditUserProfile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { mockUser } from "@/constants/userData";
import { constructImageUrl, formatPhoneNumber } from "@/lib/utils";
import { useUserStore } from "@/store/useUserStore";
import { User } from "@/types/models";
import { Edit, EditIcon, LucideSettings, Plus } from "lucide-react";
import Image from "next/image";
import React from "react";
import { ImageUpload } from "@/components/molecules/ImageUpload";
import { updateProfile } from "@/services/userService";
import { updateBusinessProfile } from "@/services/businessProfileService";

const Settings = () => {
  const user = useUserStore((state) => state.user);
  const isLoading = useUserStore((state) => state.isLoading);
  const setUser = useUserStore((state) => state.setUser);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  const handleProfileImageUpload = async (fileKey: string) => {
    if (!user) return;
    try {
      const result = await updateProfile({ profile_picture: fileKey });
      if (result.success && result.data) {
        setUser(result.data);
      }
    } catch (error) {
      console.error("Failed to update profile image", error);
    }
  };

  const handleBusinessImageUpload = async (fileKey: string) => {
    if (!user || !user.business_profile) return;
    try {
      const result = await updateBusinessProfile({ cover_image: fileKey });
      if (result.success && result.data) {
        setUser(result.data.vendor);
      }
    } catch (error) {
      console.error("Failed to update business image", error);
    }
  };
  // const user: User = mockUser;
  return (
    <div
      className="settings-page max-w-5xl w-full pb-10"
      style={{ margin: "0 auto", padding: "2rem" }}
    >
      <article className="flex items-center gap-2 pt-2 px-6">
        <LucideSettings className="mt-1" />
        <h1 className="text-2xl font-bold">Settings</h1>
      </article>

      <div style={{ marginTop: "2rem" }}>
        <Card className=" mb-6 rounded-xl shadow-sm">
          <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Update profile{user?.role == "vendor" && " and business"} photo
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
                  {user?.profile_picture ? (
                    <div className="relative w-60 h-60">
                      <Image
                        src={constructImageUrl(user?.profile_picture)}
                        alt={user?.first_name ?? "null"}
                        width={200}
                        height={200}
                        className="object-cover rounded-full w-60 h-60"
                      />
                      <div className="absolute bottom-2 right-2">
                        <ImageUpload
                          entityId={user.id}
                          entityType="user"
                          currentImage={constructImageUrl(user.profile_picture)}
                          onUploadComplete={handleProfileImageUpload}
                        />
                      </div>
                    </div>
                  ) : (
                    <div>
                      <ImageUpload
                        entityId={user.id}
                        entityType="user"
                        currentImage={null}
                        onUploadComplete={handleProfileImageUpload}
                      >
                        <div className="w-60 h-60 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                          <Plus className="w-12 h-12 text-gray-400" />
                        </div>
                      </ImageUpload>
                    </div>
                  )}
                </div>
              </article>

              {user?.role == "vendor" && user.business_profile && (
                <article className="space-y-2 ">
                  <div className="flex flex-col  gap-2">
                    <h4 className="font-bold whitespace-nowrap text-muted-foreground">
                      Business photo:
                    </h4>
                    {user?.business_profile &&
                    user?.business_profile.id &&
                    user?.business_profile?.cover_image ? (
                      <div className="relative w-60 h-60">
                        <Image
                          src={constructImageUrl(
                            user?.business_profile?.cover_image ?? ""
                          )}
                          // src={user?.business_profile?.cover_image ?? ""}
                          alt={user?.business_profile?.business_name ?? "null"}
                          width={200}
                          height={200}
                          className="object-cover rounded-full w-60 h-60"
                        />
                        <div className="absolute bottom-2 right-2">
                          <ImageUpload
                            entityId={user.business_profile.id}
                            entityType="business"
                            currentImage={user.business_profile.cover_image}
                            onUploadComplete={handleBusinessImageUpload}
                          />
                        </div>
                      </div>
                    ) : (
                      <div>
                        <ImageUpload
                          entityType="business"
                          currentImage={null}
                          onUploadComplete={handleBusinessImageUpload}
                        >
                          <div className="w-60 h-60 bg-gray-200 flex items-center justify-center rounded-full cursor-pointer">
                            <Plus className="w-12 h-12 text-gray-400" />
                          </div>
                        </ImageUpload>
                      </div>
                    )}
                  </div>
                </article>
              )}
            </div>
          </CardContent>
        </Card>
        <Card className="mb-6 p-4 gap-2">
          <CardHeader className="font-bold ">
            <div className="flex justify-between items-center h-auto">
              <h2 className="text-lg font-semibold ">Personal information</h2>
              <EditProfile />
            </div>
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
                  <p className="text-muted-foreground capitalize">
                    {user?.first_name} {user?.last_name}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">Email:</h4>
                  <p className="text-muted-foreground">
                    {user?.email ?? "None"}
                  </p>
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
                  {user?.whatsapp_number
                    ? formatPhoneNumber(user?.whatsapp_number)
                    : "None"}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Phone number:
                  </h4>
                  <p className="text-muted-foreground"></p>{" "}
                  {user?.phone_number
                    ? formatPhoneNumber(user?.phone_number)
                    : "None"}
                </div>
              </article>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 rounded-xl shadow-sm">
          <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Business Information
              </h2>
              {user?.role == "vendor" && <EditBusinessProfile />}
              {/* <Button variant="outline" size="sm" className="rounded-lg">
                    <PenSquareIcon />
                  </Button> */}
            </div>
            {user?.role == "vendor" ? (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <article className="space-y-2 ">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-muted-foreground">
                      Business name:
                    </h4>
                    <p className="text-muted-foreground">
                      {user?.business_profile?.business_name ?? "none"}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-muted-foreground">
                      Business address:
                    </h4>
                    <p className="text-muted-foreground">
                      {user?.business_profile?.address ?? "none"}
                    </p>
                  </div>
                </article>

                <article className="space-y-2 ">
                  <div className="flex  gap-2">
                    <h4 className="font-bold whitespace-nowrap text-muted-foreground">
                      Business description:
                    </h4>
                    <p className="text-muted-foreground">
                      {user?.business_profile?.description ?? "none"}
                    </p>
                  </div>
                </article>
              </div>
            ) : (
              <article className="flex items-center justify-center">
                <Button>Create a business account</Button>
              </article>
            )}
          </CardContent>
        </Card>
        {/* <Card className="rounded-xl shadow-sm">
          <CardContent className="py-3 px-6 text-sm text-muted-foreground ">
            <div className="flex justify-between">
              <h2 className="mb-4 text-lg font-bold text-foreground">
                Security Information
              </h2>
         
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <article className="space-y-2 ">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Password:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.business_profile?.business_name ?? "none"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-muted-foreground">
                    Store address:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.business_profile?.address ?? "none"}
                  </p>
                </div>
              </article>

              <article className="space-y-2 ">
                <div className="flex  gap-2">
                  <h4 className="font-bold whitespace-nowrap text-muted-foreground">
                    Store description:
                  </h4>
                  <p className="text-muted-foreground">
                    {user?.business_profile?.description ?? "none"}
                  </p>
                </div>
              </article>
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
};

export default Settings;
