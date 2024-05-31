import { render } from "@/libs/test-utils";
import { useDialog } from "@/libs/ui-components";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ProposeExchangeDialog } from "./propose-exchange-dialog";

const mockCloseDialog = jest.fn();

jest.mock("../../../../ui-components", () => ({
  ...jest.requireActual("../../../../ui-components"),
  useDialog: jest.fn(),
}));

describe("ProposeExchangeDialog", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ closeDialog: mockCloseDialog });
  });

  it("should close the dialog on close button click", async () => {
    render(
      <ProposeExchangeDialog proceed={jest.fn()} connectedUserBooks={[]} />,
    );

    const closeButton = screen.getByRole("button", { name: "Cancel" });
    userEvent.click(closeButton);

    await waitFor(() => expect(mockCloseDialog).toHaveBeenCalled());
  });
});
