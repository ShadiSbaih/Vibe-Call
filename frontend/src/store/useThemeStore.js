import { create } from "zustand";
//it is returning an object. So this object will be accessible as a global state in our application
export const useThemeStore = create((set) => ({
  theme: localStorage.getItem("app-theme") || "winter",
  setTheme: (theme) => {
    localStorage.setItem("app-theme", theme);
    set({ theme })
  },
}));
