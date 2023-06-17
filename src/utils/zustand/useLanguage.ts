import { create } from "zustand";
import { persist } from "zustand/middleware";
interface Ilangauge {
  langauge: string;
  setLangauge: (langauge: string) => void;
}
export const useLanguage = create<Ilangauge>()(
  persist(
    (set) => ({
      langauge: "uz",
      setLangauge: (langauge: string) => set(() => ({ langauge: langauge })),
    }),
    { name: "langauge" }
  )
);
