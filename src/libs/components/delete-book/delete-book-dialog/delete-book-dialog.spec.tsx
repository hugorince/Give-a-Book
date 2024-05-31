import { render } from "@/libs/test-utils";
import { DeleteBookDialog } from "./delete-book-dialog";
import { screen, waitFor } from "@testing-library/react";
import { deleteBook } from "@/libs/server";
import userEvent from "@testing-library/user-event";

const mockCloseDialog = jest.fn();

jest.mock("../../../ui-components", () => ({
  ...jest.requireActual("../../../ui-components"),
  useDialog: jest.fn(() => ({
    closeDialog: mockCloseDialog,
  })),
}));

jest.mock("../../../database", () => ({
  deleteBook: jest.fn(),
}));

const mockDeleteBook = jest.fn();

describe("DeleteBookDialog", () => {
  beforeAll(() => {
    (deleteBook as jest.Mock).mockImplementation(mockDeleteBook);
  });
  it("should render the delete book dialog", () => {
    render(<DeleteBookDialog handleDeleteBook={jest.fn()} />);

    expect(
      screen.getByText(
        "Are you sure you want to permanently delete this book ?",
      ),
    ).toBeVisible();
  });

  it("should close the dialog on cancel request", async () => {
    render(<DeleteBookDialog handleDeleteBook={jest.fn()} />);

    const cancelButton = screen.getByRole("button", { name: "Cancel" });
    await userEvent.click(cancelButton);

    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled);
  });

  it("should call the delete function on delete click", async () => {
    render(<DeleteBookDialog handleDeleteBook={jest.fn()} />);

    const deleteButton = screen.getByRole("button", { name: "Proceed" });
    await userEvent.click(deleteButton);

    await waitFor(() => expect(mockDeleteBook).toHaveBeenCalled);
    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled);
  });
});
