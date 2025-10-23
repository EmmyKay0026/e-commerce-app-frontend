import { mockUser, mockUser2, userDB } from "@/constants/userData";
import { User } from "@/types/models";
import { create } from "zustand";
import type { useApi } from "@/hooks/useApi";

interface UserStore {
  user: User | null;
  isOwner: boolean | "unknown";
  isLoading: boolean;
  error?: string | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  updateIsOwner: (currentUserId: string) => boolean | "unknown";
  getMe: (api: ReturnType<typeof useApi>) => Promise<User | null>;
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

  getMe: async (api) => {
    set({ isLoading: true, error: null });

    // Fallback to mock data only if no actual user is fetched
    const fallback = userDB[0] ?? null;

    try {
      // Use the api.auth.getUser() which already handles fetching from backend
      // and uses the token from localStorage.
      const fetched: User | null = await api.auth.getUser();
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
