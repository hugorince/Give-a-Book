import { render, screen, act } from "@testing-library/react";
import { getBooksData } from "../../../utils";
import { UserBooksCardsContainer } from ".";

jest.mock("../../../utils", () => ({
  ...jest.requireActual<any>("../../../utils"),
  getBooksData: jest.fn().mockReturnValue({}),
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
    id: 2,
    likes: [4],
    give: false,
    exchange: true,
    title: "book to exchange",
    userId: 5,
  },
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
    (getBooksData as jest.Mock).mockReturnValue(mockBookData);
  });
  it("should return the books of the user", async () => {
    await act(async () => {
      render(await UserBooksCardsContainer({ userId: "4" }));
    });

    expect(screen.getByText("book liked to give")).toBeInTheDocument();
    expect(screen.getByText("book to give")).toBeInTheDocument();
    expect(screen.queryByText("book to exchange")).not.toBeInTheDocument();
  });
});
