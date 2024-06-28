import { mockedBookPage, render } from "@/test-utils";
import { BookNewRequest } from "./book-new-request";
import { screen } from "@testing-library/react";

describe("BookNewRequest", () => {
  it("should show the request button", () => {
    render(<BookNewRequest book={mockedBookPage} />);

    expect(screen.getByRole("button", { name: "Request book" })).toBeVisible();
  });
});
