"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import useApi from "@/hooks/useApi";
import type { User } from "@/types/models";

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function splitName(fullName: string) {
  const parts = fullName.trim().split(/\s+/);
  const first_name = parts.length ? parts[0] : "";
  const last_name = parts.length > 1 ? parts.slice(1).join(" ") : "";
  return { first_name, last_name };
}

export default function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const router = useRouter();
  const api = useApi();
  const setUser = useUserStore((s) => s.setUser);
  const getMe = useUserStore((s) => s.getMe); // Get the getMe action

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!fullName || !email || !password) {
      setError("Full name, email and password are required");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const { first_name, last_name } = splitName(fullName);

      // Use Supabase signUp via useApi.auth
      const signUpRes: any = await api.auth.signUp(email, password, {
        full_name: fullName,
        first_name,
        last_name,
        phone_number: phone || undefined,
      });

      // Handle multiple supabase response shapes
      const signUpError = signUpRes?.error ?? signUpRes?.data?.error ?? null;
      if (signUpError) {
        throw signUpError;
      }

      // session may be in different places depending on supabase-js version
      const session =
        signUpRes?.data?.session ??
        signUpRes?.session ??
        signUpRes?.data?.session ??
        null;
      const user =
        signUpRes?.data?.user ??
        signUpRes?.user ??
        signUpRes?.data?.user ??
        null;

      const token = session?.access_token ?? session?.accessToken ?? null;

      if (token) {
        console.log(token);

        localStorage.setItem("token", token);
        // After sign-up, fetch user data and update the store using getMe
        const newUser = await getMe(token);
        setUser(newUser!);
        setSuccess("Account created and signed in.");
        setTimeout(() => {
          onClose();
          router.push("/");
        }, 700);
        return;
      }

      setSuccess("Account created. Check your email to confirm your account.");
      setTimeout(() => {
        onClose();
        // open sign-in modal so user can sign in after confirmation
        if (typeof window !== "undefined") {
          window.dispatchEvent(new CustomEvent("open-signin-modal"));
        }
      }, 900);
    } catch (err: any) {
      // supabase errors sometimes nested
      const message =
        err?.message ?? err?.error_description ?? err?.msg ?? String(err);
      console.error("Register error:", err);
      setError(message || "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/95 rounded-xl shadow-xl w-full max-w-md p-6 relative"
        // onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold mb-2">Create an account</h2>
        <p className="text-sm text-gray-600 mb-4">Join the marketplace</p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            aria-label="Full name"
            placeholder="Full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <input
            aria-label="Email"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <input
            aria-label="Phone"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border rounded"
          />

          <input
            aria-label="Password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <input
            aria-label="Confirm password"
            type="password"
            placeholder="Confirm password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="w-full p-3 border rounded"
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-[#C68311] text-white py-2 rounded font-medium disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

            <button
              type="button"
              onClick={() => {
                // close register modal and ask app to open the sign-in modal
                onClose();
                if (typeof window !== "undefined") {
                  window.dispatchEvent(new CustomEvent("open-signin-modal"));
                }
              }}
              className="px-4 py-2 border rounded"
            >
              Sign in
            </button>
          </div>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="text-sm text-gray-500">or</div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <button
            type="button"
            onClick={async () => {
              setLoading(true);
              setError(null);
              const { error } = await api.auth.signInWithOAuth("google", {
                redirectTo: window.location.origin,
              });
              if (error) {
                setError(error.message);
                setLoading(false);
                return;
              }
              // The user will be redirected to Google for authentication.
              // The page will reload upon returning, so we don't need to handle success state here.
              // On successful redirect back, the app will re-initialize and fetch user.
              // No need to call getMe(api) here as a full page reload will happen.
            }}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 flex items-center justify-center gap-2"
          >
            <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
            <span>Continue with Google</span>
          </button>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        {success && (
          <div className="mt-3 text-sm text-green-600">{success}</div>
        )}

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
