"use client";

import React, { useState } from "react";
import useApi from "@/hooks/useApi";
import { useUserStore } from "@/store/useUserStore";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
}

declare global {
  interface Window {
    google?: any;
  }
}

const SignInModal: React.FC<SignInModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const api = useApi();
  const setUser = useUserStore((s) => s.setUser);
  const getMe = useUserStore((s) => s.getMe); // Get the getMe action

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl w-full max-w-md p-6 relative animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back 👋</h2>
        <p className="text-gray-600 text-center mb-6">Sign in or create an account</p>

        <form className="flex flex-col space-y-3" onSubmit={async (e) => {
          e.preventDefault();
          setLoading(true);
          setError(null);
          try {
            const { data, error } = await api.auth.signInWithPassword(email, password);
            if (error) {
              throw error;
            }
            const token = data?.session?.access_token ?? null;
            if (token) {
              // After sign-in, fetch user data and update the store
              const user = await getMe(api);
              setUser(user);
              localStorage.setItem("token", token);
              onClose();
            } else {
              throw new Error("Sign in failed: No session returned.");
            }
          } catch (err: any) {
            // Provide a more helpful message for unconfirmed emails
            if (err.message?.toLowerCase().includes("email not confirmed")) {
              setError("Please check your email to confirm your account before signing in.");
            } else {
              setError(err?.message ?? "Sign in failed");
            }
          } finally {
            setLoading(false);
          }
        }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#C68311] hover:bg-[#b2740f] text-white rounded-lg py-2 font-semibold disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
          <button
            type="button"
            onClick={() => {
              onClose();
              if (typeof window !== "undefined") {
                window.dispatchEvent(new CustomEvent("open-register-modal"));
              }
            }}
            className="text-[#C68311] hover:underline"
          >
            Create an account
          </button>
        </form>

        <div className="my-4 flex items-center gap-3">
          <div className="flex-1 h-px bg-gray-200" />
          <div className="text-sm text-gray-500">or</div>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <div className="flex flex-col items-center gap-3">
          {/* Google button mount point */}
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
              
            }}
            disabled={loading}
            className="w-full border border-gray-300 rounded-lg py-2 px-3 flex items-center justify-center gap-2"
          >
            <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
            {loading && !error ? (
              <span>Redirecting...</span>
            ) : (
              <span>Sign in with Google</span>
            )}
          </button>
        </div>

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-black text-xl"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SignInModal;
