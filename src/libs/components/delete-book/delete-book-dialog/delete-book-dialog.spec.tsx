import { render } from "@/libs/test-utils";
import { DeleteBookDialog } from "./delete-book-dialog";
import { screen, waitFor } from "@testing-library/react";

const mockCloseDialog = jest.fn();

jest.mock("../../../ui-components", () => ({
  ...jest.requireActual("../../../ui-components"),
  useDialog: jest.fn(() => ({
    closeDialog: mockCloseDialog,
  })),
}));

describe("DeleteBookDialog", () => {
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
    cancelButton.click();

    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled);
  });
});
