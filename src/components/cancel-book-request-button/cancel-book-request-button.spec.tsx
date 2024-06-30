import { useDialog } from "@/ui-kit";
import { CancelRequestBookButton } from "./cancel-book-request-button";
import { mockedBookPage, render } from "@/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../../ui-kit", () => ({
  ...jest.requireActual("../../ui-kit"),
  useDialog: jest.fn(),
}));

const mockOpenDialog = jest.fn();

describe("CancelRequestBookButton", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ openDialog: mockOpenDialog });
  });
  it("should close the dialog on close button click", async () => {
    render(<CancelRequestBookButton book={mockedBookPage} />);

    const openButton = screen.getByRole("button", { name: "Cancel Request" });
    userEvent.click(openButton);

    await waitFor(() => expect(mockOpenDialog).toHaveBeenCalled());
  });
});
