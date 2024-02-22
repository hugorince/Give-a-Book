import type { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { SearchTextInput } from ".";
import { FormProvider, useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";

const mockOnSubmit = jest.fn();

const Wrapper = ({ children }: { children: ReactNode }) => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(mockOnSubmit)}>
        {children}
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};

describe("DescriptionInput", () => {
  it("should correctly render the component", () => {
    render(<SearchTextInput type="author" />, { wrapper: Wrapper });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Enter book author"),
    ).toBeInTheDocument();
  });

  it("should set the value on submit", async () => {
    render(<SearchTextInput type="author" />, { wrapper: Wrapper });

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
