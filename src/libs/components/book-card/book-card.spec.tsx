import { BooksData } from "@/libs/utils";
import { BookCard } from ".";
import { render, screen } from "@testing-library/react";

const mockData: BooksData = {
  user: "user",
  title: "title",
  img: "src",
  userId: 3,
};

describe("BookCard", () => {
  it("should map the data to display the book infos", () => {
    render(<BookCard data={mockData} />);

    expect(
      screen.getByRole("link", { name: mockData.user as string }),
    ).toHaveAttribute("href", `/user/${mockData.userId}`);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "src");
  });
});