import { BookPageInfos } from ".";
import { screen } from "@testing-library/react";
import { mockedBookPage } from "@/test-utils";
import { render } from "@/test-utils";

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", async () => {
    render(await BookPageInfos({ book: mockedBookPage, connectedUserId: 1 }));

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
