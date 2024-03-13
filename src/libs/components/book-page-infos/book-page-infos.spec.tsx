import { BooksData } from "@/libs/utils";
import { BookPageInfos } from ".";
import { render, screen } from "@testing-library/react";

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
};

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", () => {
    render(<BookPageInfos book={mockBookData} />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "src");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
