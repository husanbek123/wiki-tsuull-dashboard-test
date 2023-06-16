import { create } from "zustand";
import { zustandProps } from "../../types/defaultType";
import { persist } from "zustand/middleware";
export const useTheme = create<zustandProps>()(
  persist(
    (set) => ({
      theme: "light" || "dark",
      changeTheme: () =>
        set((state) => ({ theme: state.theme === "light" ? "dark" : "light" })),
    }),
    {
      name: "theme",
    }
  )
);
