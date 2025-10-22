"use client";
import { supabase } from "@/config/supabase";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

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

    if (error) setMessage(error.message);
    else setMessage("✅ Logged in successfully!");
    setLoading(false);
  };

  // async function signUpWithPassword(email, password, firstName, lastName) {
  //   const { data, error } = await supabase.auth.signUp({
  //     email: email,
  //     password: password,
  //     options: {
  //       // 💡 Crucial: Pass the name data here!
  //       data: {
  //         first_name: firstName,
  //         last_name: lastName,
  //         // We can also combine these into a full_name for consistency
  //         full_name: `${firstName} ${lastName}`,
  //       },
  //       // Specify the URL the user is redirected to after email confirmation
  //       emailRedirectTo: 'http://localhost:3000/welcome'
  //     }
  //   });

  //   if (error) {
  //     console.error('Sign-Up Error:', error.message);
  //     return { success: false, error };
  //   }

  //   // NOTE: If you have email confirmation enabled, the user is created
  //   // but they won't have a session until they click the link in their email.
  //   console.log('User created successfully. Check email for confirmation link.');
  //   return { success: true, data };
  // }

  const handleGoogleLogin = async () => {
    setLoading(true);
    setMessage("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: window.location.origin },
    });

    if (error) setMessage(error.message);
    setLoading(false);
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
        },
        emailRedirectTo: window.location.origin,
      },
    });

    if (error) setMessage(error.message);
    else setMessage("✅ Account created! Check your email for confirmation.");
    setLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {isSignUp ? "Create an Account" : "Login to Your Account"}
        </h2>

        <form
          onSubmit={isSignUp ? handleSignUp : handleEmailLogin}
          className="space-y-4"
        >
          {isSignUp && (
            <>
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
                <label className="block text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Last Name"
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

          <div>
            <label className="block text-sm text-gray-600">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              required
            />
          </div>

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
          <p className="text-center text-sm text-red-500 mt-4">{message}</p>
        )}
      </div>
    </div>
  );
}
