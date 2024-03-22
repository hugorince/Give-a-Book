import { screen } from "@testing-library/react";
import { FilterBooksForm } from ".";
import userEvent from "@testing-library/user-event";
import { render } from "@/libs/utils";

const user = userEvent.setup();

describe("FilterBooksForm", () => {
  it("renders filter books form correctly", async () => {
    render(<FilterBooksForm close={jest.fn()} />);

    expect(
      screen.getByRole("checkbox", { name: "Exchange" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Give" })).toBeInTheDocument();
  });
  it("calls the close callback on submit", async () => {
    const mockOnClose = jest.fn();

    render(<FilterBooksForm close={mockOnClose} />);

    const submitButton = screen.getByRole("button", { name: "Apply filters" });
    await user.click(submitButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
