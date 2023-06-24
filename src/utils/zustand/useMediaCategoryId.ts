import { create } from "zustand";
import { mediaCategoryIdProps } from "../../types/defaultType";
import { persist } from "zustand/middleware";
export const useCategoryId = create<mediaCategoryIdProps>()(
  persist(
    (set) => ({
      id: "",
      setId: (id: string) => set(() => ({ id })),
    }),
    {
      name: "category's id",
    }
  )
);
