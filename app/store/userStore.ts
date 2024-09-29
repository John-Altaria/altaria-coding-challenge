import { IUserStore } from "@/types/store-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const authStore = create<IUserStore>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      setUser: (user) => set({ user: user }),
      setToken: (token) => set({ token }),
      setSession: (session) => set({ ...session }),
      clearUser: () => set({ user: null, token: null }),
    }),
    {
      name: "user",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
