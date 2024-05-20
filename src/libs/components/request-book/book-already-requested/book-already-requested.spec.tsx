import { render } from "@/libs/test-utils";
import { BookAlreadyRequested } from "./book-already-requested";
import { screen } from "@testing-library/react";

describe("BookAlreadyRequested", () => {
  it("should show the continue browsing link", () => {
    render(<BookAlreadyRequested />);

    expect(
      screen.getByRole("link", { name: "continue browsing books" }),
    ).toBeVisible();
  });
});
