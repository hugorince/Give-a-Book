"use client";

import {
  useState,
  createContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";

export type FilterBooksContextType = {
  filters: string[];
  setFilters: Dispatch<SetStateAction<string[]>>;
  setFiltersFormData: (data: FormData) => void;
};

type FilterBooksProviderProps = {
  children: ReactNode;
};

export const FilterBooksContext = createContext<FilterBooksContextType>({
  filters: [],
  setFilters: () => null,
  setFiltersFormData: (data) => null,
});

export const FilterBooksProvider = ({ children }: FilterBooksProviderProps) => {
  const [filters, setFilters] = useState<string[]>([]);

  const setFiltersFormData = (formData: FormData) => {
    formData.get("exchange") && !filters.includes("exchange")
      ? setFilters((prev) => [...prev, "exchange"])
      : setFilters((prev) => [...prev.filter((str) => str !== "exchange")]);
    formData.get("give") && !filters.includes("give")
      ? setFilters((prev) => [...prev, "give"])
      : setFilters((prev) => [...prev.filter((str) => str !== "give")]);
    formData.get("liked") && !filters.includes("liked")
      ? setFilters((prev) => [...prev, "liked"])
      : setFilters((prev) => [...prev.filter((str) => str !== "liked")]);
  };

  return (
    <FilterBooksContext.Provider
      value={{ filters, setFilters, setFiltersFormData }}
    >
      {children}
    </FilterBooksContext.Provider>
  );
};
