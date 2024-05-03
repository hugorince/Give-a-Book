import { BookPageInfos } from ".";
import { render, screen } from "@testing-library/react";
import { mockedBook } from "@/libs/test-utils";

describe("BookPageInfos", () => {
  it("should map the data to display the correct infos", () => {
    render(<BookPageInfos book={mockedBook} />);

    expect(screen.getByText("title")).toBeInTheDocument();
    expect(screen.getByRole("img")).toHaveAttribute("src", "image");
    expect(screen.getByText("Exchange")).toBeInTheDocument();
  });
});
