import { BooksData } from "@/libs/utils";
import { BookCard } from ".";
import { render, screen } from "@testing-library/react";

const mockData: BooksData = {
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
};

describe("BookCard", () => {
  it("should map the data to display the book infos", () => {
    render(<BookCard data={mockData} />);

    expect(
      screen.getByRole("link", { name: mockData.user as string }),
    ).toHaveAttribute("href", `/user/${mockData.userId}`);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "src");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
