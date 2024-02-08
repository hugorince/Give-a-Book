import type { ReactNode } from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { DescriptionInput } from ".";
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
    render(<DescriptionInput />, { wrapper: Wrapper });

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should set the value on submit", async () => {
    render(<DescriptionInput />, { wrapper: Wrapper });

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
