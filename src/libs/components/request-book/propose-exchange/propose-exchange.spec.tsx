import type { BookPageData } from "@/libs/types";
import { mockedBookedBook, render } from "@/libs/test-utils";
import { ProposeExchange } from "./propose-exchange";
import { screen } from "@testing-library/react";

describe("ProposeExchange", () => {
  it("should show the propose exchange button", () => {
    render(
      <ProposeExchange book={mockedBookedBook as unknown as BookPageData} />,
    );

    expect(
      screen.getByRole("button", { name: "Propose Exchange" }),
    ).toBeVisible();
  });
});
