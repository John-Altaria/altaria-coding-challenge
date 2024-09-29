import { create } from "zustand";

interface CoordinatesStore {
  coordinates: [number, number];
  setCoordinates: (coord: [number, number]) => void;
}

export const useCoordinatesStore = create<CoordinatesStore>((set) => ({
  coordinates: [0, 0],
  setCoordinates: (coord) => set({ coordinates: [...coord] }),
}));
