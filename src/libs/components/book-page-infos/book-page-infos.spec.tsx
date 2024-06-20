import { BookPageInfos } from ".";
import { screen } from "@testing-library/react";
import { mockedBookPage } from "@/libs/test-utils";
import { render } from "@/libs/test-utils";

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", () => {
    render(<BookPageInfos book={mockedBookPage} connectedUserId={1} />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
