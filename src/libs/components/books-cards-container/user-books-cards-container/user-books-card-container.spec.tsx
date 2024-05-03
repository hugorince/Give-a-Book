import { screen, act } from "@testing-library/react";
import { getBookByUserId } from "@/libs/database";
import { render } from "../../../utils/test-utils/test-utils";
import { UserBooksCardsContainer } from ".";

jest.mock("../../../utils", () => ({
  ...jest.requireActual<any>("../../../utils"),
  getBookByUserId: jest.fn(),
}));

jest.mock("next-auth", () => ({
  getServerSession: jest.fn(
    () =>
      new Promise((resolve) => {
        resolve({
          expiresIn: undefined,
          loggedInAt: undefined,
          someProp: "someString",
          user: undefined,
        });
      }),
  ),
}));

const mockBookData = [
  { id: 1, likes: [6], give: true, title: "book to give", userId: 4 },
  {
    id: 3,
    likes: [4],
    give: true,
    exchange: false,
    title: "book liked to give",
    userId: 4,
  },
];

describe("UserBooksCardContainer", () => {
  beforeEach(() => {
    (getBookByUserId as jest.Mock).mockReturnValue(mockBookData);
  });
  it("should return the books of the user", async () => {
    await act(async () => {
      render(await UserBooksCardsContainer({ userId: "4" }));
    });

    expect(screen.getByText("book liked to give")).toBeInTheDocument();
    expect(screen.getByText("book to give")).toBeInTheDocument();
  });
});
