import { screen, waitFor } from "@testing-library/react";
import { FilterBooksForm } from ".";
import userEvent from "@testing-library/user-event";
import { render } from "@/libs/test-utils";
import { filterBooks } from "@/libs/server";

const user = userEvent.setup();

jest.mock("../../../database", () => ({
  filterBooks: jest.fn(),
}));

const mockFilterBooks = jest.fn();

describe("FilterBooksForm", () => {
  beforeAll(() => {
    (filterBooks as jest.Mock).mockImplementation(mockFilterBooks);
  });

  it("renders filter books form correctly", async () => {
    render(<FilterBooksForm closeDrawer={jest.fn()} />);

    expect(
      screen.getByRole("checkbox", { name: "Exchange" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Give" })).toBeInTheDocument();
  });

  it("calls the close callback on submit", async () => {
    const mockOnClose = jest.fn();

    render(<FilterBooksForm closeDrawer={mockOnClose} />);

    const submitButton = screen.getByRole("button", { name: "Apply filters" });
    await user.click(submitButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
