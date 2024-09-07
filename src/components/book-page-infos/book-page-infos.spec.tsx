import { BookPageInfos } from ".";
import { screen } from "@testing-library/react";
import { mockedBookPage } from "@/test-utils";
import { render } from "@/test-utils";

const bookProps = {
  book: mockedBookPage,
  connectedUserId: 1,
  distance: 25,
  isOwnBook: false,
};

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", () => {
    render(<BookPageInfos {...bookProps} />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
    expect(screen.getByTestId("liked-button")).toBeInTheDocument();
  });

  it("should remove like button and link to the user when is own book", () => {
    render(<BookPageInfos {...bookProps} isOwnBook={true} />);

    expect(screen.queryByTestId("liked-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("not-liked-button")).not.toBeInTheDocument();
  });
});
