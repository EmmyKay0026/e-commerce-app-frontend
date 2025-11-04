import { create } from "zustand";

type AuthModalState = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggle: () => void;
};

type SetState<T> = (partial: Partial<T> | ((state: T) => Partial<T>)) => void;

export const useAuthModal = create<AuthModalState>(
  (set: SetState<AuthModalState>) => ({
    isOpen: false,
    setIsOpen: (open: boolean) => set({ isOpen: open }),
    toggle: () => set((s) => ({ isOpen: !s.isOpen })),
  })
);
