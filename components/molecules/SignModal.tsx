"use client";

import React, { useEffect, useRef, useState } from "react";

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
  const googleButtonRef = useRef<HTMLDivElement | null>(null);

  const API = process.env.NEXT_PUBLIC_API_BASE || "/api";
  const GOOGLE_CLIENT_ID = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

  useEffect(() => {
    if (!isOpen) return;
    let mounted = true;
    const scriptId = "google-identity-script";

    // load GSI script if not loaded
    if (GOOGLE_CLIENT_ID && typeof window !== "undefined" && !window.google) {
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.id = scriptId;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }

    // after script loads (or if already present) initialize button
    const init = () => {
      if (!GOOGLE_CLIENT_ID || !googleButtonRef.current || !window.google) return;
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: handleGoogleCredential,
        });
        // render Google's standard button
        window.google.accounts.id.renderButton(googleButtonRef.current, {
          theme: "outline",
          size: "large",
          width: "240",
        });
        // optionally avoid auto prompt; leave commented if not wanted
        // window.google.accounts.id.prompt();
      } catch (err) {
        // initialization may fail if script not ready; ignore silently
      }
    };

    // If script already loaded, try init, otherwise wait for load
    if (typeof window !== "undefined" && window.google) {
      init();
    } else {
      const onLoad = () => {
        if (!mounted) return;
        init();
      };
      window.addEventListener("google-loaded", onLoad);
      // fallback: poll for google object
      const poll = setInterval(() => {
        if ((window as any).google) {
          clearInterval(poll);
          if (mounted) init();
        }
      }, 200);
      return () => {
        mounted = false;
        clearInterval(poll);
        window.removeEventListener("google-loaded", onLoad);
      };
    }

    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, GOOGLE_CLIENT_ID]);

  // Backend exchange of Google credential
  async function handleGoogleCredential(resp: any) {
    const credential = resp?.credential;
    if (!credential) {
      setError("No credential returned by Google");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/auth/google`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Google auth failed: ${res.status}`);
      }
      const data = await res.json().catch(() => null);
      const token = data?.token ?? data?.accessToken ?? null;
      if (token) {
        localStorage.setItem("token", token);
        onClose();
      } else {
        throw new Error("No token returned from server");
      }
    } catch (err: any) {
      setError(err?.message ?? "Google sign-in failed");
    } finally {
      setLoading(false);
    }
  }

  // email/password submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!res.ok) {
        const text = await res.text().catch(() => null);
        throw new Error(text || `Sign in failed: ${res.status}`);
      }
      const data = await res.json().catch(() => null);
      const token = data?.token ?? data?.accessToken ?? null;
      if (token) {
        localStorage.setItem("token", token);
        onClose();
      } else {
        throw new Error("No token returned from server");
      }
    } catch (err: any) {
      setError(err?.message ?? "Sign in failed");
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
        className="bg-white/90 backdrop-blur-lg rounded-xl shadow-xl w-full max-w-md p-6 relative animate-slideDown"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-semibold text-center mb-4">Welcome Back 👋</h2>
        <p className="text-gray-600 text-center mb-6">Sign in or create an account</p>

        <form className="flex flex-col space-y-3" onSubmit={handleSubmit}>
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
          <div ref={googleButtonRef} />

          {/* fallback custom button */}
          {GOOGLE_CLIENT_ID && (
            <button
              type="button"
              onClick={() => {
                if (window.google && window.google.accounts && window.google.accounts.id) {
                  window.google.accounts.id.prompt();
                } else {
                  setError("Google sign-in not ready");
                }
              }}
              className="w-full border border-gray-300 rounded-lg py-2 px-3 flex items-center justify-center gap-2"
            >
              <img src="/google-icon.svg" alt="Google" className="h-5 w-5" />
              <span>Sign in with Google</span>
            </button>
          )}
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
