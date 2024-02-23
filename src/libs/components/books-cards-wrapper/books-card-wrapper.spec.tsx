import { ReactElement } from "react";
import { BooksCardWrapper } from ".";
import { screen, render, act } from "@testing-library/react";

describe("BookCardWrapper", () => {
  it("should render as many cards as the response", async () => {
    await act(async () => {
      render((await BooksCardWrapper({ userId: undefined })) as ReactElement);
    });

    expect(screen.getByText("sdf")).toBeInTheDocument();
  });
});
