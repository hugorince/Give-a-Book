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
  likes: [4],
};

describe("BookCard", () => {
  it("should map the data to display the book infos", async () => {
    render(<BookCard data={mockData} userId={"4"} />);

    expect(
      screen.getByRole("link", { name: mockData.user as string }),
    ).toHaveAttribute("href", `/user/${mockData.userId}`);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "src");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
