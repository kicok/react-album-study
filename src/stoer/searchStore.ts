import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface SearchState {
  per_page: number;
  page: number;
  search: string;
  total: number;
  totalPages: number;
  setPage: (page: number) => void;
  setSearch: (search: string) => void;
  setTotal: (total: number) => void;
  setTotalPages: (totalPages: number) => void;
  reset: () => void;
}

export const useSearchStore = create<SearchState>()(
  devtools(
    (set) => ({
      per_page: 30,
      page: 1,
      search: "Korea",
      total: 0,
      totalPages: 0,

      setPage: (page) => set({ page }, false, "setPage"),
      setTotal: (total) => set({ total }, false, "setTotal"),
      setTotalPages: (totalPages) =>
        set({ totalPages }, false, "setTotalPages"),
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
