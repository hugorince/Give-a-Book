import { screen, waitFor } from "@testing-library/react";
import { RHFWrapper, render, mockOnSubmit } from "@/test-utils";
import { SearchTextInput } from ".";
import userEvent from "@testing-library/user-event";

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  }),
);

describe("DescriptionInput", () => {
  it("should correctly render the component", () => {
    render(
      <RHFWrapper>
        <SearchTextInput type="author" />
      </RHFWrapper>,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter book author"),
    ).toBeInTheDocument();
  });

  it("should set the value on submit", async () => {
    render(
      <RHFWrapper>
        <SearchTextInput type="author" />
      </RHFWrapper>,
    );

    const user = userEvent.setup();

    const textarea = screen.getByRole("textbox");
    const submitButton = screen.getByRole("button", { name: "submit" });

    await user.type(textarea, "test author");
    user.click(submitButton);

    await waitFor(() =>
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          author: "test author",
        },
        expect.anything(),
      ),
    );
  });
});
