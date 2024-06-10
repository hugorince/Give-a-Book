import { render } from "@/libs/test-utils";
import { updateBookLikes } from "@/libs/server-actions";
import { LikeButton } from "./like-button";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDialog } from "@/libs/ui-components";

const mockOpenDialog = jest.fn();

jest.mock("../../ui-components", () => ({
  ...jest.requireActual("../../ui-components"),
  useDialog: jest.fn(),
}));

const mockUpdateBookLikes = jest.fn();

jest.mock("../../database", () => ({
  ...jest.requireActual("../../database"),
  updateBookLikes: jest.fn(),
}));

const likeButtonProps = {
  bookId: 2,
  isLiked: true,
  isLoggedIn: true,
  likesNumber: 3,
};

describe("LikeButton", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ openDialog: mockOpenDialog });
    (updateBookLikes as jest.Mock).mockImplementation(mockUpdateBookLikes);
  });
  it("should render the liked button when liked", () => {
    render(<LikeButton {...likeButtonProps} />);

    expect(screen.getByTestId("liked-button")).toBeInTheDocument();
    expect(screen.queryByTestId("not-liked-button")).not.toBeInTheDocument();
  });

  it("should display the number of likes", () => {
    render(<LikeButton {...likeButtonProps} />);

    expect(screen.getByText("3")).toBeVisible();
  });

  it("should render the not liked button when not liked", () => {
    render(<LikeButton {...likeButtonProps} isLiked={false} />);

    expect(screen.getByTestId("not-liked-button")).toBeInTheDocument();
    expect(screen.queryByTestId("liked-button")).not.toBeInTheDocument();
  });

  it("should trigger the dialog if not logged in on click", async () => {
    render(
      <LikeButton {...likeButtonProps} isLoggedIn={false} isLiked={false} />,
    );

    const button = screen.getByTestId("not-liked-button");
    userEvent.click(button);

    await waitFor(() => expect(mockOpenDialog).toHaveBeenCalled());
  });

  it("should trigger the updateBookLikes function if logged in", async () => {
    render(<LikeButton {...likeButtonProps} isLiked={false} />);

    const button = screen.getByTestId("not-liked-button");
    userEvent.click(button);

    await waitFor(() => expect(mockUpdateBookLikes).toHaveBeenCalledWith(2));
  });
});
