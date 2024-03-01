import { FilterBooksDrawerContainer } from "./filter-books-drawer/filter-books-drawer-container";
import { FilterBooksForm } from "./filter-books-drawer/filter-books-form";

export const FilterBooks = () => {
  return (
    <FilterBooksDrawerContainer>
      <FilterBooksForm />
    </FilterBooksDrawerContainer>
  );
};
