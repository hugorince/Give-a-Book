import { render } from "@/test-utils";
import { RequestBookDialog } from "./request-book-dialog";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDialog } from "@/ui-kit";

const mockCloseDialog = jest.fn();

jest.mock("../../../ui-kit", () => ({
  ...jest.requireActual("../../../ui-kit"),
  useDialog: jest.fn(),
}));

describe("RequestBookDialog", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ closeDialog: mockCloseDialog });
  });
  it("should close the dialog on close button click", async () => {
    render(<RequestBookDialog proceed={jest.fn()} user="4" />);

    const closeButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(closeButton);

    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled());
  });
});
