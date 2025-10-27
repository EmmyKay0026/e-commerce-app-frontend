"use client";

import { useEffect } from "react";
import { useUserStore } from "@/store/useUserStore";
import useApi from "@/hooks/useApi";

export default function ClientInitializer({
  children,
}: {
  children: React.ReactNode;
}) {
  const api = useApi();
  const { user, setUser, fetchAllUserData, isLoading } = useUserStore();

  useEffect(() => {
    // ✅ 1. Detect token from hash fragment like "/#access_token=..."
    const hash = window.location.hash;
    if (hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const token = params.get("access_token");

      if (token) {
        console.log("💾 Saving token from hash:", token);
        localStorage.setItem("auth_token", token);

        // ✅ Remove token from URL after saving
        window.history.replaceState(null, "", window.location.pathname);
      }
    }

    // ✅ 2. Use token from localStorage
    const token = localStorage.getItem("auth_token");
    console.log("🔍 Token from storage:", token);

    // ✅ 3. Fetch user data if token exists but no user loaded
    if (token && !user) {
      console.log("✅ Found saved token, fetching user data...");
      fetchAllUserData(api)
        .then((fetchedUser) => {
          if (fetchedUser && fetchedUser._id) {
            setUser(fetchedUser); // ✅ Store user + ID in Zustand
            console.log("👤 User loaded:", fetchedUser);
          }
        })
        .catch((err) => {
          console.error("❌ Error fetching user:", err);
          localStorage.removeItem("auth_token"); // remove invalid token
        });
    }
  }, [api, user, fetchAllUserData, setUser]);

  if (isLoading && !user) {
    return <div className="p-4 text-center">Loading user...</div>;
  }

  return <>{children}</>;
}
