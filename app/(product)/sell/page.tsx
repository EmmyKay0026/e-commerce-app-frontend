// Product submission page - if user is a plain 'user' (not a vendor), show the
// create-business-account form in-place so they can create a business first.
"use client";
import { ProductForm } from "@/components/organisms/ProductForm";
import { useUserStore } from "@/store/useUserStore";
import { useEffect } from "react";
import dynamic from "next/dynamic";

// load the CreateBusinessAccountForm dynamically to avoid increasing bundle size
const CreateBusinessAccountForm = dynamic(
  () => import("@/components/molecules/SellPageCreateBusinessAccountFormWrapper"),
  { ssr: false }
);

export default function ProductSubmissionPage() {
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (user == null) {
      import("@/store/useAuthModal").then((mod: any) => {
        const authHook = mod?.useAuthModal;

        if (authHook && typeof authHook.getState === "function") {
          const state = authHook.getState();
          if (typeof state.setIsOpen === "function") {
            state.setIsOpen(true);
          }
        }
      });
    }
  }, [user]);

  // If the user object is not loaded yet, don't render anything.
  if (!user) return null;

  // If the logged-in user has a plain user role, show the business creation form
  // inside the product flow so they can create a business account first.
  if (user.role === "user") {
    return <CreateBusinessAccountForm />;
  }

  // vendor or other roles can access the ProductForm directly
  return (
    <>
      <ProductForm />
    </>
  );
}
