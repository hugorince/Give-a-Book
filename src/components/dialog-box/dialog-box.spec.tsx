import { DialogBox } from "./dialog-box";
import { render } from "@/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("DialogBox", () => {
  it("should call the cta on click", async () => {
    const mockCta = jest.fn();

    render(<DialogBox cta={mockCta} label="label" />);

    const button = screen.getByText("Proceed");
    userEvent.click(button);

    await waitFor(() => expect(mockCta).toHaveBeenCalled());
  });

  it("should show the label as h2", async () => {
    render(<DialogBox cta={jest.fn()} label="label" />);

    const label = screen.getByRole("heading", { name: "label", level: 2 });

    expect(label).toBeVisible();
  });
});
