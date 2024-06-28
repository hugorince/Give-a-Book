import { mockedBookPage, render } from "@/test-utils";
import { BookCancelRequest } from "./book-cancel-request";
import { screen } from "@testing-library/react";

describe("BookCancelRequest", () => {
  it("should show the cancel request button", () => {
    render(<BookCancelRequest book={{ ...mockedBookPage, requested: true }} />);

    expect(
      screen.getByRole("button", { name: "Cancel Request" }),
    ).toBeVisible();
  });
});
