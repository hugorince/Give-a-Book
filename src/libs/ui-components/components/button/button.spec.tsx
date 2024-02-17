import { render, screen } from "@testing-library/react";
import { Button } from "./button";

const mockOnClick = jest.fn();

describe("Button", () => {
  it("renders correctly", () => {
    render(<Button>Click me</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("renders correctly with loading", () => {
    render(<Button loading>Click me</Button>);

    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  it("calls onClick when clicked", () => {
    render(<Button onClick={mockOnClick}>Click me</Button>);

    const button = screen.getByRole("button", { name: "Click me" });
    button.click();

    expect(mockOnClick).toHaveBeenCalled();
  });
  it("renders correctly with disabled", () => {
    render(<Button disabled>Click me</Button>);

    expect(screen.getByRole("button")).toBeDisabled();
  });
});
