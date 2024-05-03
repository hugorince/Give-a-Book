import { BookPageInfos } from ".";
import { render, screen } from "@testing-library/react";
import { mockedBook } from "@/libs/utils";

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", () => {
    render(<BookPageInfos book={mockedBook} />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "src");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
