import { BookPageInfos } from ".";
import { screen } from "@testing-library/react";
import { mockedBookPage } from "@/test-utils";
import { render } from "@/test-utils";
import { getUserInfo } from "@/actions";

jest.mock("../../actions", () => ({
  getUserInfo: jest.fn(),
}));

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", async () => {
    render(await BookPageInfos({ book: mockedBookPage, connectedUserId: 1 }));

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
    expect(screen.getByTestId("liked-button")).toBeInTheDocument();
  });

  it("should remove like button and link to the user when is own book", async () => {
    (getUserInfo as jest.Mock).mockReturnValue({ id: 2 });
    render(await BookPageInfos({ book: mockedBookPage, connectedUserId: 2 }));

    expect(screen.queryByTestId("liked-button")).not.toBeInTheDocument();
    expect(screen.queryByTestId("not-liked-button")).not.toBeInTheDocument();
  });
});
