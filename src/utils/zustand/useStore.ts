import { create } from "zustand";
import { persist } from "zustand/middleware";

interface IToken {
  token: string;
  setToken: (newToken: string) => void;
}

export const useToken = create<IToken>()(
  persist(
    (set) => ({
      token: "",
      setToken: (newToken: string) => set(() => ({ token: newToken })),
    }),
    { name: "token" }
  )
);
