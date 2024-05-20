import { render } from "@/libs/test-utils";
import { CancelRequestBookDialog } from "./cancel-request-book-dialog";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDialog } from "@/libs/ui-components";

const mockCloseDialog = jest.fn();

jest.mock("../../../ui-components", () => ({
  ...jest.requireActual("../../../ui-components"),
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
