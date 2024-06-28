import { render } from "@/test-utils";
import { CancelRequestBookDialog } from "./cancel-request-book-dialog";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDialog } from "@/ui-kit";

const mockCloseDialog = jest.fn();

jest.mock("../../ui-kit", () => ({
  ...jest.requireActual("../../ui-kit"),
  useDialog: jest.fn(),
}));

describe("CancelRequestBookDialog", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ closeDialog: mockCloseDialog });
  });
  it("should close the dialog on close button click", async () => {
    render(<CancelRequestBookDialog cancelRequest={jest.fn()} />);

    const closeButton = screen.getByRole("button", { name: "Abort" });
    userEvent.click(closeButton);

    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled());
  });
});
