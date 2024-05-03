import { screen } from "@testing-library/react";
import { BooksCardContainer } from ".";
import { getBooksWithoutConnectedUser } from "../../database";
import { render, mockBooksData } from "@/libs/test-utils";

jest.mock("../../database", () => ({
  ...jest.requireActual("../../database"),
  getBooksWithoutConnectedUser: jest.fn().mockReturnValue({}),
}));

describe("BookCardContainer", () => {
  beforeEach(() => {
    (getBooksWithoutConnectedUser as jest.Mock).mockReturnValue(mockBooksData);
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
