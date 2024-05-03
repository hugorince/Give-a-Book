import { screen, act } from "@testing-library/react";
import { getBooksByUserId } from "../../../database";
import { render, mockBooksData } from "@/libs/test-utils";
import { UserBooksCardsContainer } from ".";

jest.mock("../../../database", () => ({
  ...jest.requireActual<any>("../../../database"),
  getBooksByUserId: jest.fn(),
}));

jest.mock("../../book-card", () => ({
  BookCard: () => <div>Book Card</div>,
}));

describe("UserBooksCardContainer", () => {
  beforeEach(() => {
    (getBooksByUserId as jest.Mock).mockReturnValue(mockBooksData);
  });
  it("should return all the books of the user", async () => {
    render(await UserBooksCardsContainer({ userId: "4" }));

    expect(screen.queryAllByText("Book Card")).toHaveLength(3);
  });
});
