import { render } from "@/libs/test-utils";
import { FilterBooks } from "./filter-books";
import { screen } from "@testing-library/react";

describe("FilterBooks", () => {
  it("should open the filter drawer on click", () => {
    render(<FilterBooks />);

    const openFiltersButton = screen.getByRole("button", { name: "filter" });
    openFiltersButton.click();

    expect(
      screen.getByRole("checkbox", { name: "Exchange" }),
    ).toBeInTheDocument();
  });
});
