import { render } from "@testing-library/react";
import { AcceptPropositionButton } from "./accept-proposition-button";
import { useRouter } from "next/navigation";
import { useDialog } from "@/ui-kit";
import userEvent from "@testing-library/user-event";

jest.mock("../../actions", () => ({
  completeProposition: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../ui-kit", () => ({
  useDialog: jest.fn(),
  Button: (props: { onClick: () => void; children: string }) => (
    <button {...props}>{props.children}</button>
  ),
}));

const mockUseDialog = useDialog as jest.Mock;
const mockUseRouter = useRouter as jest.Mock;

const propositionId = 1;

describe("AcceptPropositionButton", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should open the dialog when the button is clicked", async () => {
    const openDialogMock = jest.fn();

    mockUseDialog.mockReturnValue({
      openDialog: openDialogMock,
      closeDialog: jest.fn(),
    });

    mockUseRouter.mockReturnValue({ refresh: jest.fn() });

    const { getByText } = render(
      <AcceptPropositionButton propositionId={propositionId} />,
    );

    await userEvent.click(getByText("Accept proposition"));

    expect(openDialogMock).toHaveBeenCalledWith({
      children: expect.anything(),
      onClose: expect.any(Function),
    });
  });
});
