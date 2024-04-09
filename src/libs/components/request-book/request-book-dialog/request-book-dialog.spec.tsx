import { render } from "@/libs/utils";
import { RequestBookDialog } from "./request-book-dialog";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDialog } from "@/libs/ui-components";

const mockCloseDialog = jest.fn();

jest.mock("../../../ui-components", () => ({
  ...jest.requireActual("../../../ui-components"),
  useDialog: jest.fn(),
}));

describe("RequestBookDialog", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ closeDialog: mockCloseDialog });
  });
  it("should close the dialog on close button click", async () => {
    render(<RequestBookDialog proceed={jest.fn()} />);

    const closeButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(closeButton);

    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled());
  });
});
