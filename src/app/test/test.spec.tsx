import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import TestPage from "./page";

describe("test page", () => {
  it("should render the button", async () => {
    render(<TestPage />);
    expect(
      screen.getByRole("button", { name: "Test Button" }),
    ).toBeInTheDocument();
  });
});
