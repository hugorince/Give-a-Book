import { screen, waitFor } from "@testing-library/react";
import { render, RHFWrapper, mockOnSubmit } from "@/libs/test-utils";
import { DescriptionInput } from ".";
import userEvent from "@testing-library/user-event";

describe("DescriptionInput", () => {
  it("should correctly render the component", () => {
    render(
      <RHFWrapper>
        <DescriptionInput />
      </RHFWrapper>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should set the value on submit", async () => {
    render(
      <RHFWrapper>
        <DescriptionInput />
      </RHFWrapper>,
    );

    const user = userEvent.setup();

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "submit" });

    await user.type(textarea, "test text");
    user.click(submitButton);

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          description: "test text",
        },
        expect.anything(),
      ),
    );
  });
});
