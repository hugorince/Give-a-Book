import { mockedBookPage, render } from "@/libs/test-utils";
import { ProposeExchange } from "./propose-exchange";
import { screen } from "@testing-library/react";

jest.mock("../../../server-actions", () => ({
  getConnectedUserBooks: jest.fn().mockReturnValue([]),
}));

describe("ProposeExchange", () => {
  it("should show the propose exchange button", async () => {
    render(await ProposeExchange({ book: mockedBookPage }));

    expect(
      screen.getByRole("button", { name: "Propose Exchange" }),
    ).toBeVisible();
  });
});
