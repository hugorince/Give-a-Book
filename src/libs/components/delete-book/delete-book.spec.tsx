import { mockedBook, render } from "@/libs/test-utils";
import { DeleteBook } from "./delete-book";
import { screen } from "@testing-library/react";

const mockCloseDialog = jest.fn();
const mockOpenDialog = jest.fn();

jest.mock("../../ui-components", () => ({
  ...jest.requireActual("../../ui-components"),
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
