"use client";
import React, { useState } from "react";
import { supabase } from "@/config/supabase";
import { X } from "lucide-react";
import { useAuthModal } from "@/store/useAuthModal";
import { formatPhoneNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";

const AuthModal = () => {
  const toogle = useAuthModal((s) => s.toggle);
  const getMe = useUserStore((s) => s.getMe);
  const isOpen = useAuthModal((s) => s.isOpen);
  const setIsOpen = useAuthModal((s) => s.setIsOpen);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // New states for modes
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  // Sign-up fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Handlers
  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setMessage(error.message);
    } else {
      toast.success("Logged in successfully!");
      setIsOpen(false);
      getMe();
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
          full_name: `${firstName} ${lastName}`,
          phone_number: formatPhoneNumber(phoneNumber),
        },
        emailRedirectTo: `${window.location.origin}/reset-password`, // Important!
      },
    });

    if (error) {
      toast.error(error.message);
    } else {
      toast.success("Check your email for confirmation link!");
      setMessage("Check your email for confirmation link!");
    }
    setLoading(false);
  };

  // New: Handle Forgot Password
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`, // Must match your app URL
    });

    if (error) {
      toast.error(error.message);
      setMessage(error.message);
    } else {
      toast.success("Password reset link sent! Check your email.");
      setMessage("Password reset link sent to your email.");
      setIsForgotPassword(false); // Optionally go back to login
    }
    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });
    setLoading(false);
  };

  // Reset form when switching modes
  const resetForm = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setPhoneNumber("");
    setMessage("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center min-h-screen">
      <div className="bg-white max-h-screen overflow-y-auto shadow-xl rounded-2xl w-full max-w-md mx-4">
        <div className="p-8">
          <div className="flex justify-end mb-4">
            <X onClick={toogle} className="cursor-pointer" />
          </div>

          {/* Dynamic Title */}
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isForgotPassword
              ? "Reset Password"
              : isSignUp
              ? "Create an Account"
              : "Login to Your Account"}
          </h2>

          {/* Forgot Password Form */}
          {isForgotPassword ? (
            <form onSubmit={handleForgotPassword} className="space-y-4">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
              >
                {loading ? "Sending..." : "Send Reset Link"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsForgotPassword(false);
                  resetForm();
                }}
                className="text-center w-full text-sm text-blue-600 hover:underline"
              >
                Back to Login
              </button>
            </form>
          ) : (
            /* Login / Sign Up Form */
            <form
              onSubmit={isSignUp ? handleSignUp : handleEmailLogin}
              className="space-y-4"
            >
              {/* Sign Up Fields */}
              {isSignUp && (
                <>
                  <div className="flex gap-3">
                    <input
                      type="text"
                      placeholder="First Name"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                    <input
                      type="text"
                      placeholder="Last Name"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2"
                      required
                    />
                  </div>
                  <input
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(formatPhoneNumber(e.target.value))}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                    required
                  />
                </>
              )}

              {/* Shared Fields */}
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />

              {/* {!isSignUp && ( */}
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
                required
              />
              {/* )} */}

              {/* Forgot Password Link */}
              {!isSignUp && !isForgotPassword && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => {
                      setIsForgotPassword(true);
                      setMessage("");
                      setPassword(""); // Clear password
                    }}
                    className="text-sm text-blue-600 hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-70"
              >
                {loading
                  ? isSignUp
                    ? "Creating Account..."
                    : "Logging in..."
                  : isSignUp
                  ? "Sign Up"
                  : "Login"}
              </button>
            </form>
          )}

          {/* Google & Toggle */}
          {!isForgotPassword && (
            <>
              <div className="my-6 text-center text-gray-500 text-sm">or</div>
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="Google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              <div className="text-center mt-6">
                <button
                  type="button"
                  onClick={() => {
                    setIsSignUp(!isSignUp);
                    setIsForgotPassword(false);
                    resetForm();
                  }}
                  className="text-blue-600 hover:underline text-sm"
                >
                  {isSignUp
                    ? "Already have an account? Login"
                    : "Don't have an account? Sign Up"}
                </button>
              </div>
            </>
          )}

          {message && (
            <p className={`text-center text-sm mt-4 ${message.includes("sent") || message.includes("success") ? "text-green-600" : "text-red-500"}`}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;