import { mockUser, mockUser2, userDB } from "@/constants/userData";
import { User } from "@/types/models";
import { create } from "zustand";

interface UserStore {
  user: User | null;
  isOwner: boolean | "unknown";
  isLoading: boolean;
  error?: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  updateIsOwner: (currentUserId: string) => boolean | "unknown";
  getMe: (id?: string) => Promise<User | null>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: userDB[0],
  isOwner: "unknown",
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateIsOwner: (currentUserId: string) => {
    const current = get().user;
    if (!current) {
      set({ isOwner: "unknown" });
      return "unknown";
    }
    const owner = currentUserId === current.id;
    set({ isOwner: owner });
    return owner;
  },

  // getMe: try backend first (/users/:id or /users/me), fall back to mock userDB
  getMe: async (id?: string) => {
    set({ isLoading: true, error: null });

    const API = process.env.NEXT_PUBLIC_API_BASE || "/api";
    const fallback = ((): User | null => {
      if (id) return userDB.find((u) => u.id === id) ?? null;
      return userDB[0] ?? null;
    })();

    try {
      const endpoint = id ? `${API}/users/${id}` : `${API}/users/me`;
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("token")
          : null;
      const res = await fetch(endpoint, {
        method: "GET",
        headers: token ? { Authorization: `Bearer ${token}` } : undefined,
      });

      if (!res.ok) {
        const message = `Fetch failed: ${res.status}`;
        set({ user: fallback, isLoading: false, error: message });
        return fallback;
      }

      const data = await res.json().catch(() => null);
      // API might return user directly or wrapped: { user }
      const fetched: User | undefined = (data && (data.user ?? data)) || undefined;
      const finalUser = fetched ?? fallback ?? null;

      set({ user: finalUser, isLoading: false, error: null });
      return finalUser;
    } catch (err: any) {
      set({
        user: fallback,
        isLoading: false,
        error: err?.message ?? "Network error",
      });
      return fallback;
    }
  },
}));
