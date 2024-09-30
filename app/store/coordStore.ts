import { ICoordinatesStore } from "@/types/store-types";
import { create } from "zustand";

export const useCoordinatesStore = create<ICoordinatesStore>((set) => ({
  coordinates: [0, 0],
  currentCoords: null,
  setCoordinates: (coord) => set({ coordinates: [...coord] }),
  setCurrentCoords: (currentCoords) =>
    set({ currentCoords: [...currentCoords] }),
}));
