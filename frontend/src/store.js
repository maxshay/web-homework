import create from "zustand";

const useStore = create((set) => ({
  // numbers mode (roman or decimal)
  mode: 0,
  setMode: (mode) => set({ mode }),
}));

export { useStore };