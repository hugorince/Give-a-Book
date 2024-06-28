import { render } from "@/test-utils";
import { FilterBooks } from "./filter-books";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("./filter-books-form", () => ({
  FilterBooksForm: () => <div>filter book form</div>,
}));

describe("FilterBooks", () => {
  it("should open the filter drawer on click", async () => {
    render(<FilterBooks />);

    const openFiltersButton = screen.getByRole("button", { name: "filter" });
    await userEvent.click(openFiltersButton);

    expect(screen.getByText("filter book form")).toBeVisible();
  });
});
