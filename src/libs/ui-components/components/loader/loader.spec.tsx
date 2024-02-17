import { render, screen } from "@testing-library/react";
import { Loader } from "./loader";

describe("Loader", () => {
  it("renders correctly", () => {
    render(<Loader />);
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });
});
