"use client";
import React, { useState } from "react";
import { supabase } from "@/config/supabase";
import { X } from "lucide-react";
import { useAuthModal } from "@/store/useAuthModal";
import { formatPhoneNumber } from "@/lib/utils";
import { toast } from "sonner";
import { useUserStore } from "@/store/useUserStore";
import { Eye, EyeOff } from "lucide-react";

const AuthModal = () => {
  const toogle = useAuthModal((s) => s.toggle);
  const getMe = useUserStore((s) => s.getMe);
  const isOpen = useAuthModal((s) => s.isOpen);
  const setIsOpen = useAuthModal((s) => s.setIsOpen);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isResetPassword, setIsResetPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetLoading, setResetLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [messageType, setMessageType] = useState<"success" | "error">("error");

  interface EmailLoginEvent extends React.FormEvent<HTMLFormElement> {}

  interface AuthError {
    message: string;
  }

  const handleEmailLogin = async (e: EmailLoginEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const { error }: { error: AuthError | null } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) {
      toast(error.message);
      setMessage(error.message);
      setMessageType("error");
    } else {
      setIsOpen(false);
      toast("✅ Logged in successfully!");
      setMessage("✅ Logged in successfully!");
      setMessageType("success");
      getMe();
    }

    setLoading(false);
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) toast(error.message);
    setLoading(false);
    getMe();
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
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
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) {
      toast(error.message);
      setMessage(error.message);
      setMessageType("error");
    } else {
      toast("✅ Account created! Check your email for confirmation.");
      setMessage("✅ Account created! Check your email for confirmation.");
      setMessageType("success");
    }

    setLoading(false);

    setIsSignUp(false);
    setPassword("");
  };

  if (!isOpen) return null;

  if (isResetPassword) {
    return (
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-2xl w-full max-w-md shadow-xl">
          <span className="flex justify-between mb-4">
            <X
              onClick={() => {
                setIsResetPassword(false);
                setMessage("");
              }}
              className="cursor-pointer"
            />
          </span>

          <h2 className="text-2xl font-semibold text-center mb-6">
            Reset Password
          </h2>

          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setResetLoading(true);
              setMessage("");

              const { error } = await supabase.auth.resetPasswordForEmail(
                resetEmail,
                {
                  redirectTo: `${window.location.origin}/auth/update-password`,
                }
              );

              if (error) {
                toast.error(error.message);
                setMessage(error.message);
                setMessageType("error");
              } else {
                toast.success("Password reset email sent — check your inbox.");
                setMessage("Password reset email sent! Check your inbox.");
                setMessageType("success");
              }

              setResetLoading(false);
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm text-gray-600">Email</label>
              <input
                type="email"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                placeholder="you@example.com"
                required
              />
            </div>

            <button
              type="submit"
              disabled={resetLoading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg"
            >
              {resetLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>

          {message && (
            <p
              className={`text-center text-sm mt-4 ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <div className="text-center mt-6">
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
              onClick={() => setIsResetPassword(false)}
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }



  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center  min-h-screen  max-w-screen ">
      <div className=" bg-white overflow-y-auto  max-h-screen shadow-xl rounded-2xl  ">
        <div className="w-full p-8">
          <span className="flex justify-between items-center mb-4">
            <X onClick={() => toogle()} className="cursor-pointer text-right" />
          </span>
          <h2 className="text-2xl font-semibold text-center mb-6">
            {isSignUp ? "Create an Account" : "Login to Your Account"}
          </h2>

          <form
            onSubmit={isSignUp ? handleSignUp : handleEmailLogin}
            className="space-y-4"
          >
            {isSignUp && (
              <>
                <article className="flex gap-3">
                  <div>
                    <label className="block text-sm text-gray-600">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="First Name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </article>
                <div>
                  <label className="block text-sm text-gray-600">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(formatPhoneNumber(e.target.value))
                    }
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your phone number"
                    required
                  />
                </div>
              </>
            )}

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

            <div className="relative">
              <label className="block text-sm text-gray-600">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
                placeholder="••••••••"
                required
              />
              <span
                className="absolute right-3 top-1/2 cursor-pointer text-gray-400"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => {
                    setIsResetPassword(true);
                    setMessage("");
                  }}
                  className="text-sm text-blue-600 cursor-pointer hover:underline"
                >
                  Forgot password?
                </button>

              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {loading
                ? isSignUp
                  ? "Signing up..."
                  : "Logging in..."
                : isSignUp
                ? "Sign Up"
                : "Login"}
            </button>
          </form>

          <div className="my-6 text-center text-gray-500 text-sm">or</div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            Continue with Google
          </button>

          <div className="text-center mt-4">
            <button
              type="button"
              className="text-blue-600 hover:underline text-sm"
              onClick={() => {
                setIsSignUp((prev) => !prev);
                setMessage("");
              }}
            >
              {isSignUp
                ? "Already have an account? Login"
                : "Don't have an account? Sign Up"}
            </button>
          </div>

          {message && (
            <p
              className={`text-center text-sm mt-4 ${
                messageType === "success" ? "text-green-500" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

        </div>
      </div>
    </div>
  );
};

export default AuthModal;
