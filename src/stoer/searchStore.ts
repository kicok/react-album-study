import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SearchState {
  per_page: number;
  page: number;
  search: string;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      per_page: 30,
      page: 1,
      search: "Korea",

      setPage: (page) => set({ page }, false, "setPage"),
      setSearch: (search) => set({ search }, false, "setSearch"),
      reset: () =>
        set(
          {
            page: 1,
            search: "",
          },
          false,
          "reset"
        ),
    }),
    { name: "SearchStore" } // Redux DevTools에서 보여질 스토어 이름
  )
);
