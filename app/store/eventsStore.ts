import { IEventsStore } from "@/types/store-types";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useEventsStore = create<IEventsStore>()(
  persist(
    (set) => ({
      events: [],
      eventTypes: [],
      setEvents: (events) => set({ events: [...events] }),
      setEventTypes: (eventTypes) => set({ eventTypes: [...eventTypes] }),
    }),
    {
      name: "events",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
