import { render, screen } from "@testing-library/react";
import { InputText } from "./input-text";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("InputText", () => {
  it("renders correctly", () => {
    render(<InputText label="label" />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("value changes on change", async () => {
    render(<InputText label="label" />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });
  it("should contains a label with sr-only class", () => {
    render(<InputText label="label" />);

    expect(screen.getByLabelText("label")).toBeInTheDocument();
  });
  it("should not be accepting text when disabled", async () => {
    render(<InputText label="label" disabled />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(input).toHaveValue("");
  });
});
