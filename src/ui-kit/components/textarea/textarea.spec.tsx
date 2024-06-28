import { render, screen } from "@testing-library/react";
import { Textarea } from "./textarea";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

describe("InputText", () => {
  it("renders correctly", () => {
    render(<Textarea label="label" />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
  it("value changes on change", async () => {
    render(<Textarea label="label" />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello World");

    expect(input).toHaveValue("Hello World");
  });
  it("should contains a label with sr-only class", () => {
    render(<Textarea label="label" />);

    expect(screen.getByLabelText("label")).toBeInTheDocument();
  });
  it("should display with correct amount of rows", () => {
    render(<Textarea label="label" rows={4} />);

    expect(screen.getByRole("textbox")).toHaveAttribute("rows", "4");
  });
  it("should not be accepting text when disabled", async () => {
    render(<Textarea label="label" disabled />);

    const input = screen.getByRole("textbox");
    await user.type(input, "Hello");

    expect(input).toHaveValue("");
  });
});
