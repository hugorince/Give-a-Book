import { act, render, screen } from "@testing-library/react";
import { FilterBooksForm } from ".";
import { ReactElement } from "react";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("FilterBooksForm", () => {
  it("renders filter books form correctly", async () => {
    await act(async () => {
      render(FilterBooksForm({ close: jest.fn() }) as ReactElement);
    });

    expect(
      screen.getByRole("checkbox", { name: "Exchange" }),
    ).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Give" })).toBeInTheDocument();
  });
  it("calls the close callback on submit", async () => {
    const mockOnClose = jest.fn();

    await act(async () => {
      render(FilterBooksForm({ close: mockOnClose }) as ReactElement);
    });

    const submitButton = screen.getByRole("button", { name: "Apply filters" });
    await user.click(submitButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
