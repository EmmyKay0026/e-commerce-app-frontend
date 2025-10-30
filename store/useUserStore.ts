import { mockUser, mockUser2, userDB } from "@/constants/userData";
import { User } from "@/types/models";
import { create } from "zustand";
import type { useApi } from "@/hooks/useApi";
import { getMyProfile } from "@/services/userService";
import { toast } from "sonner";
import React from "react";
import { useParams } from "next/navigation";

interface UserStore {
  user: User | null;
  isOwner: boolean | "unknown";
  isLoading: boolean;
  error?: string | null;
  setUser: (user: User | null) => void;
  clearUser: () => void;
  updateIsOwner: (viewedUserId: string) => boolean | "unknown";
  getMe: (signal?: AbortSignal) => Promise<void>;
}
// Extract User ID from URL using regex
function extractUserIdRegex(url: string): string | null {
  const m = url.match(/\/user\/([^\/?#]+)/);
  return m ? m[1] : null;
}

export const useUserStore = create<UserStore>((set, get) => ({
  user: null,
  isOwner: false,
  isLoading: false,
  error: null,

  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateIsOwner: (viewedUserId: string) => {
    const current = get().user;
    // console.log("Current user:", current);
    // console.log("Viewed user:", viewedUserId);

    if (!current) {
      // console.log("Ran auto unknown");
      set({ isOwner: false });
      return false;
      // set({ isOwner: "unknown" });
      // return "unknown";
    }
    const owner = viewedUserId === current.id;
    set({ isOwner: owner });
    return owner;
  },

  getMe: async (signal?: AbortSignal) => {
    set({ isLoading: true, error: null });
    // const params = useParams();

    try {
      // Use the api.auth.getUser() which already handles fetching from backend
      // and uses the token from localStorage.
      const fetchedRes = await getMyProfile();

      if (!fetchedRes.success || !fetchedRes.data) {
        toast.error(
          `Failed to fetch user profile: ${fetchedRes.error || "Unknown error"}`
        );
        set({ isLoading: false });
        return;
      }

      if (signal?.aborted) {
        set({ isLoading: false });
        return;
      }

      // console.log("Get me is running:", fetchedRes);
      set({ user: fetchedRes.data, isLoading: false, error: null });
      // get().updateIsOwner(params?.id as string);
      // console.log("Params", params);
      // console.log("Get user result", get().user);

      // if (typeof window !== "undefined" && get().user!==null) {
      if (typeof window !== "undefined") {
        // console.log(get().user);

        const id = extractUserIdRegex(window.location.pathname);
        if (id) {
          console.log("User params:", id);

          get().updateIsOwner(id as string);
          console.log("User params updated isOwner:", get().isOwner);
        }
      }
    } catch (err: any) {
      toast.error(`Error fetching user profile: ${err?.message || err}`);
      set({
        error: err?.message || "Error fetching user profile",
        isLoading: false,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));

export const useFetchDataOnMount = () => {
  const getMe = useUserStore((state) => state.getMe);

  // Runs only once on mount to fetch data
  React.useEffect(() => {
    const controller = new AbortController();

    // pass the AbortSignal to getMe so it can cancel requests if implemented
    getMe(controller.signal).catch((err) => {
      if (!controller.signal.aborted) {
        console.error("getMe failed:", err);
      }
    });

    return () => {
      controller.abort();
    };
  }, [getMe]);
};

// export const useAbortableEffect = (
//   effect: (signal: AbortSignal) => Promise<void> | void,
//   deps: React.DependencyList = []
// ) => {
//   React.useEffect(() => {
//     const controller = new AbortController();

//     // Run the effect and surface non-abort errors
//     Promise.resolve(effect(controller.signal)).catch((err) => {
//       if (!controller.signal.aborted) {
//         console.error("Abortable effect error:", err);
//       }
//     });

//     return () => {
//       controller.abort();
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, deps);
// };

// export const useFetchDataOnMount = () => {
//   const getMe = useUserStore((state) => state.getMe);

//   // Runs only once on mount to fetch data
//   useAbortableEffect(
//     (signal) => {
//       return getMe(signal);
//     },
//     [getMe]
//   );
// };
