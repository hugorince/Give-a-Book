import { mockedBook, render } from "@/test-utils";
import { DeleteBook } from "./delete-book";
import { screen } from "@testing-library/react";

const mockCloseDialog = jest.fn();
const mockOpenDialog = jest.fn();

jest.mock("../../ui-kit", () => ({
  ...jest.requireActual("../../ui-kit"),
  useDialog: jest.fn(() => ({
    closeDialog: mockCloseDialog,
    openDialog: mockOpenDialog,
  })),
}));

describe("DeleteBook", () => {
  it("should open the delete book dialog on delete button click", () => {
    render(<DeleteBook book={mockedBook} />);

    const deleteButton = screen.getByRole("button", { name: "Delete Book" });
    deleteButton.click();

    expect(mockOpenDialog).toHaveBeenCalled();
  });
});
