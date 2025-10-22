"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
  const API = process.env.NEXT_PUBLIC_API_BASE || "/api";

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

      // prefer the 'name' payload and /signup path you discovered
      const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || "https://e-commerce-app-backend-khxb.onrender.com/api").replace(/\/+$/, "");
      const tryList = [
        { url: `${API_BASE}/signup`, body: { name: fullName, email, password, phone_number: phone || undefined } },
        { url: `${API_BASE}/auth/signup`, body: { name: fullName, email, password, phone_number: phone || undefined } },
        { url: `${API_BASE}/auth/register`, body: { name: fullName, email, password, phone_number: phone || undefined } },
        // fallbacks with first/last split
        { url: `${API_BASE}/signup`, body: { first_name, last_name, email, password, phone_number: phone || undefined } },
        { url: `${API_BASE}/auth/register`, body: { first_name, last_name, email, password, phone_number: phone || undefined } },
      ];

      let successPayload: any = null;
      let lastAttemptInfo = "";

      for (const attempt of tryList) {
        lastAttemptInfo = `${attempt.url} -> ${Object.keys(attempt.body).join(",")}`;
        console.info("Register attempt:", attempt.url, attempt.body);
        let res: Response;
        try {
          res = await fetch(attempt.url, {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json" },
            body: JSON.stringify(attempt.body),
          });
        } catch (netErr) {
          console.warn("Network error for", attempt.url, netErr);
          throw netErr;
        }

        const text = await res.text().catch(() => "");
        let payload: any = null;
        try {
          payload = text ? JSON.parse(text) : null;
        } catch {
          payload = { raw: text };
        }
        console.info("Response", attempt.url, res.status, payload);

        if (res.ok) {
          successPayload = payload;
          break;
        }

        // if 404 try next; for other 4xx/5xx surface server message
        if (res.status === 404) {
          continue;
        }

        const msg = payload?.message ?? payload?.error ?? payload?.errors ?? `Registration failed: ${res.status}`;
        throw new Error(typeof msg === "string" ? msg : JSON.stringify(msg));
      }

      if (!successPayload) {
        throw new Error(`Registration endpoint not found or rejected. Last attempt: ${lastAttemptInfo}`);
      }

      // if backend returned token, store it
      const token = successPayload?.token ?? successPayload?.accessToken ?? null;
      if (token) {
        localStorage.setItem("token", token);
        setSuccess("Account created and signed in.");
        setTimeout(() => {
          onClose();
          router.push("/");
        }, 700);
        return;
      }

      // otherwise try login at /auth/login to obtain token
      try {
        const loginUrl = `${API_BASE}/auth/login`;
        console.info("Attempting login at", loginUrl);
        const loginRes = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ email, password }),
        });
        const loginText = await loginRes.text().catch(() => "");
        let loginPayload: any = null;
        try {
          loginPayload = loginText ? JSON.parse(loginText) : null;
        } catch {
          loginPayload = { raw: loginText };
        }

        if (loginRes.ok) {
          const loginToken = loginPayload?.token ?? loginPayload?.accessToken ?? null;
          if (loginToken) {
            localStorage.setItem("token", loginToken);
            setSuccess("Account created and signed in.");
            setTimeout(() => {
              onClose();
              router.push("/");
            }, 700);
            return;
          }
        }

        // fallback: prompt sign-in modal
        setSuccess("Account created. Please sign in.");
        setTimeout(() => {
          onClose();
          if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("open-signin-modal"));
        }, 700);
      } catch {
        setSuccess("Account created. Please sign in.");
        setTimeout(() => {
          onClose();
          if (typeof window !== "undefined") window.dispatchEvent(new CustomEvent("open-signin-modal"));
        }, 700);
      }
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err?.message ?? "Registration failed");
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
        onClick={(e) => e.stopPropagation()}
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

        {error && <div className="mt-3 text-sm text-red-600">{error}</div>}
        {success && <div className="mt-3 text-sm text-green-600">{success}</div>}

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