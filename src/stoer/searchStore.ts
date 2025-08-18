import { create } from "zustand";

interface SearchState {
  per_page: number;
  pageValue: number;
  searchValue: string;
  updatePageValue: (page: number) => void;
  updateSearchValue: (search: string) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  per_page: 30,
  pageValue: 1,
  searchValue: "Korea",

  updatePageValue: (page) => set({ pageValue: page }),
  updateSearchValue: (search) => set({ searchValue: search }),
  reset: () =>
    set((state) => ({
      pageValue: 1,
      searchValue: "",
    })),
}));
