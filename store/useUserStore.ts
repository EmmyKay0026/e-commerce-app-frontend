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
  user: userDB[1],
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

  // getMe: try backend first (/api/users/:id or /api/auth/me), fall back to mock userDB
  getMe: async (id?: string) => {
    set({ isLoading: true, error: null });

    const fallback = ((): User | null => {
      if (id) return userDB.find((u) => u.id === id) ?? null;
      return userDB[0] ?? null;
    })();

    try {
      // choose endpoint
      const endpoint = id ? `/api/users/${id}` : `/api/auth/me`;
      const res = await fetch(endpoint, { method: "GET" });

      if (!res.ok) {
        // backend didn't return OK — use mock fallback
        // set({
        //   user: fallback,
        //   isLoading: false,
        //   error: `Fetch failed: ${res.status}`,
        // });
        return fallback;
      }

      // attempt to parse body (API might return { user } or user)
      const data = await res.json().catch(() => null);
      const fetched: User | undefined =
        (data && (data.user ?? data)) || undefined;

      const finalUser = fetched ?? fallback ?? null;
      // set({ user: finalUser, isLoading: false, error: null });
      return finalUser;
    } catch (err: any) {
      // network or other error — fall back to mock DB
      // set({
      //   user: fallback,
      //   isLoading: false,
      //   error: err?.message ?? "Network error",
      // });
      return fallback;
    }
  },
}));
