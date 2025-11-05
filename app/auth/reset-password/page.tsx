"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function parseHash(hash: string) {
  const trimmed = hash.startsWith("#") ? hash.slice(1) : hash;
  return Object.fromEntries(new URLSearchParams(trimmed));
}

const ResetPassword = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "error" | "success";
  } | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    // Parse tokens from hash or query params
    const url = new URL(window.location.href);
    let params: Record<string, string> = {};

    if (url.hash) {
      params = parseHash(url.hash);
    } else if (url.search) {
      params = Object.fromEntries(url.searchParams);
    }

    const access_token = params["access_token"];
    const refresh_token = params["refresh_token"];

    if (access_token && refresh_token) {
      // Set the Supabase session using the tokens
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ data, error }) => {
          if (error) {
            setSessionError(
              "Invalid or expired reset link. Please request a new one."
            );
          }
        })
        .finally(() => setSessionLoading(false));
    } else {
      setSessionError(
        "Missing reset tokens. Please request a new password reset link."
      );
      setSessionLoading(false);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    // Validation
    if (password.length < 8) {
      setMessage({
        text: "Password must be at least 8 characters long.",
        type: "error",
      });
      return;
    }

    if (password !== confirmPassword) {
      setMessage({ text: "Passwords do not match.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) throw error;

      setMessage({
        text: "Password updated successfully! Redirecting to login...",
        type: "success",
      });

      // Optional: Sign out the user and redirect to login
      setTimeout(async () => {
        await supabase.auth.signOut();
        router.push("/signIn");
      }, 2000);
    } catch (err: any) {
      setMessage({
        text: err?.message || "Failed to update password.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (sessionLoading) {
    return (
      <div className="flex justify-center my-9 min-w-screen">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-gray-600">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (sessionError) {
    return (
      <div className="flex justify-center my-9 min-w-screen">
        <div className="bg-white p-8 rounded-2xl shadow-xl">
          <p className="text-red-600">{sessionError}</p>
          <Button
            onClick={() => router.push("/auth/forgot-password")}
            className="mt-4"
          >
            Request New Reset Link
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center my-9 min-w-screen">
      <div className="bg-white overflow-y-auto max-h-screen shadow-xl rounded-2xl">
        <div className="w-full min-w-md p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Reset Your Password
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600">
                New Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your new password"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-500 mt-1">
                Must be at least 8 characters
              </p>
            </div>

            <div>
              <label className="block text-sm text-gray-600">
                Confirm New Password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Confirm your new password"
                required
              />
            </div>

            {message && (
              <p
                className={`text-sm ${
                  message.type === "error" ? "text-red-600" : "text-green-600"
                }`}
              >
                {message.text}
              </p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating Password..." : "Update Password"}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
