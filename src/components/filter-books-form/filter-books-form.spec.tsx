import { screen } from "@testing-library/react";
import { FilterBooksForm } from ".";
import userEvent from "@testing-library/user-event";
import { render } from "@/test-utils";
import { filterBooks } from "@/actions";

const user = userEvent.setup();

jest.mock("../../actions", () => ({
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
