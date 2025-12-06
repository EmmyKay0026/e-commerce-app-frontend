"use client";

import React, { useEffect, useState } from "react";
import { supabase } from "@/config/supabase";
import { useRouter } from "next/navigation";
import { CheckCircle, Loader2, AlertCircle, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

type PageState = "loading" | "valid" | "invalid" | "success";

export default function UpdatePasswordPage() {
  const router = useRouter();
  const [state, setState] = useState<PageState>("loading");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    const handleRecoveryFlow = async () => {
      try {
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);

        const access_token = params.get("access_token");
        const refresh_token = params.get("refresh_token");
        const type = params.get("type");

        if (!access_token || !refresh_token || type !== "recovery") {
          setState("invalid");
          toast.error("Invalid or expired reset link");
          return;
        }

        const { error } = await supabase.auth.setSession({
          access_token,
          refresh_token,
        });

        if (error) {
          console.error("Failed to set session:", error);
          setState("invalid");
          toast.error("This reset link is invalid or has already been used");
          return;
        }

        setState("valid");
        toast.success("Link verified – you can now set your new password");
        window.history.replaceState({}, document.title, "/auth/update-password");
      } catch (err) {
        console.error("Unexpected error:", err);
        setState("invalid");
        toast.error("Something went wrong. Please request a new reset link.");
      }
    };

    handleRecoveryFlow();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      toast.error(error.message);
      setLoading(false);
    } else {
      setState("success");
      toast.success("Password updated successfully!");
      setTimeout(() => router.replace("/"), 2000);
    }
  };

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto text-blue-600" size={44} />
          <p className="text-gray-600 mt-4">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (state === "invalid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={56} />
          <h2 className="text-2xl font-semibold">Invalid Link</h2>
          <p className="text-gray-600 mt-2">
            This password reset link is invalid or has expired.
          </p>
          <button className="mt-6 text-blue-600 hover:underline" onClick={() => router.replace("/")}>
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (state === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md w-full">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={64} />
          <h2 className="text-2xl font-semibold">Password Updated!</h2>
          <p className="text-gray-600 mt-2">Redirecting you to the app...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Set New Password</h1>
          <p className="mt-2 text-gray-600">Enter your new password below</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative items-center">
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border px-4 py-3 pr-12 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="relative items-center">
            <label className="block text-sm font-medium mb-2">Confirm Password</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border px-4 py-3 pr-12 rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-10 text-gray-500 hover:text-gray-700"
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading || password !== confirmPassword}
            className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 hover:bg-blue-700 transition"
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Updating...
              </>
            ) : (
              "Update Password"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button className="text-sm text-blue-600 hover:underline" onClick={() => router.replace("/")}>
            ← Back to Login
          </button>
        </div>
      </div>
    </div>
  );
}