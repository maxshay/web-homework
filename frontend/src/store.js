import create from "zustand";

const useStore = create((set) => ({
  // numbers mode (roman or decimal)
  mode: 0,
  setMode: (mode) => set({ mode }),

  modalOpen: false,
  modalRef: null,
  setModal: (open, userId) =>
    set(() => {
      return { modalOpen: open, modalRef: userId };
    }),

  lang: 0,
  setLang: (lang) => set({ lang }),
}));

export { useStore };
