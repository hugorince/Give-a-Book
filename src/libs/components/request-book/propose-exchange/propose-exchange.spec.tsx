import { mockedBookedBook, render } from "@/libs/test-utils";
import { ProposeExchange } from "./propose-exchange";
import { screen } from "@testing-library/react";

describe("ProposeExchange", () => {
  it("should show the propose exchange button", () => {
    render(<ProposeExchange book={mockedBookedBook} />);

    expect(
      screen.getByRole("button", { name: "Propose Exchange" }),
    ).toBeVisible();
  });
});
