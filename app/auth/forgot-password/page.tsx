"use client";
import React, { useState } from "react";
import { supabase } from "@/config/supabase";
import { Button } from "@/components/ui/button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!email) {
      setMessage("Please enter your email.");
      return;
    }

    setLoading(true);
    try {
      // Try common Supabase APIs (v1/v2 differences). Cast to any to avoid TS errors.
      let res;
      const authAny = supabase.auth as any;

      if (typeof authAny.resetPasswordForEmail === "function") {
        // supabase-js v2 style (or compatible)
        res = await authAny.resetPasswordForEmail(email);
      } else if (
        authAny.api &&
        typeof authAny.api.resetPasswordForEmail === "function"
      ) {
        // supabase-js v1 style
        res = await authAny.api.resetPasswordForEmail(email);
      } else {
        throw new Error("Reset password API not available on supabase client.");
      }

      const error = res?.error;
      if (error) throw error;
      setMessage("If that email exists, a password reset link has been sent.");
    } catch (err: any) {
      setMessage(err?.message || "Unable to send password reset email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" flex justify-center my-9  min-w-screen ">
      <div className=" bg-white overflow-y-auto  max-h-screen shadow-xl rounded-2xl  ">
        <div className="w-full min-w-md  p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Reset password
          </h2>

          <form onSubmit={handleSubmit}>
            <label style={{ display: "block", marginBottom: 8 }}>
              <div>
                <label className="block text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </label>

            <Button
              type="submit"
              className="mt-3"
              disabled={loading}
              style={{ padding: "8px 12px" }}
            >
              {loading ? "Sending..." : "Send reset email"}
            </Button>
          </form>

          {message && <p style={{ marginTop: 12 }}>{message}</p>}
        </div>
      </div>
    </div>
  );
}
