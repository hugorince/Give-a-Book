import { render } from "@/test-utils";
import { ProposeExchangeButton } from "./propose-exchange-button";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { useDialog } from "@/ui-kit";
import { BookPageData } from "@/types";

const mockOpenDialog = jest.fn();

jest.mock("../../ui-kit", () => ({
  ...jest.requireActual("../../ui-kit"),
  useDialog: jest.fn(),
}));

describe("ProposeExchangeButton", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ openDialog: mockOpenDialog });
  });
  it("should open the dialog on OpenDialog", async () => {
    render(
      <ProposeExchangeButton
        book={{} as BookPageData}
        connectedUserBooks={[]}
      />,
    );

    const button = screen.getByRole("button", { name: "Propose Exchange" });
    userEvent.click(button);

    await waitFor(() => expect(mockOpenDialog).toHaveBeenCalled());
  });
});
