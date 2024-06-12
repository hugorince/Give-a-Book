import { screen } from "@testing-library/react";
import { render, mockBooksData } from "@/libs/test-utils";
import {
  getBooksWithoutConnectedUser,
  getConnectedUserId,
} from "../../server-actions";
import { BooksCardContainer } from ".";

jest.mock("../../server-actions", () => ({
  ...jest.requireActual("../../server-actions"),
  getBooksWithoutConnectedUser: jest.fn(),
  getConnectedUserId: jest.fn(),
}));

describe("BookCardContainer", () => {
  beforeEach(() => {
    (getBooksWithoutConnectedUser as jest.Mock).mockReturnValue(mockBooksData);
    (getConnectedUserId as jest.Mock).mockReturnValue(2);
  });

  it("should render the filtered selection of books to give", async () => {
    render(await BooksCardContainer({ searchParams: { filter: "give" } }));

    expect(screen.getByText("book to give")).toBeInTheDocument();
    expect(screen.queryByText("book to exchange")).not.toBeInTheDocument();
  });

  it("should render the filtered selection of liked books", async () => {
    render(await BooksCardContainer({ searchParams: { filter: "liked" } }));

    expect(screen.getByText("book to exchange")).toBeInTheDocument();
    expect(screen.queryByText("book to give")).not.toBeInTheDocument();
  });

  it("should render the filtered selection of liked books to give", async () => {
    render(
      await BooksCardContainer({ searchParams: { filter: "liked,give" } }),
    );

    expect(screen.getByText("book liked to give")).toBeInTheDocument();
    expect(screen.queryByText("book to exchange")).not.toBeInTheDocument();
  });
});
