import { BooksData } from "@/libs/utils";
import { BookCard } from ".";
import { screen } from "@testing-library/react";
import { render } from "@/libs/utils/test-utils/test-utils";

const mockBookData: BooksData = {
  id: 1,
  user: "user",
  title: "title",
  author: "author",
  description: "description",
  image: "src",
  userId: 3,
  exchange: true,
  give: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  likes: [4],
  postalCode: "75018",
  requested: true,
};

describe("BookCard", () => {
  it("should map the book to display the book infos", async () => {
    render(<BookCard book={mockBookData} connectedUserId="4" />);

    expect(
      screen.getByRole("link", { name: mockBookData.user as string }),
    ).toHaveAttribute("href", `/user/${mockBookData.userId}`);
    expect(
      screen.getByRole("link", { name: mockBookData.title as string }),
    ).toHaveAttribute("href", `/book/${mockBookData.id}`);

    expect(screen.getByRole("heading")).toHaveTextContent("title");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
