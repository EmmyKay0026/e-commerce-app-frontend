import { create } from "zustand";

type HamState = {
  hambugerShowState: boolean;
};

type HamAction = {
  updateHambugerShowState: (
    hambugerShowState: HamState["hambugerShowState"]
  ) => void;
};

export const useHambugerShowStore = create<HamState & HamAction>((set) => ({
  hambugerShowState: true,

  updateHambugerShowState: (prev: boolean) => set({ hambugerShowState: !prev }),
}));
