import type { BookData } from "@/types";
import { render } from "@/test-utils";
import { screen } from "@testing-library/react";
import { DropdownNavSearchbar } from "./dropdown-nav-searchbar";

describe("DropdownNavSearchbar", () => {
  it("should display as many suggestions as matching", () => {
    render(
      <DropdownNavSearchbar
        books={[{ title: "title 1" }, { title: "title 2" }] as BookData[]}
      />,
    );

    expect(screen.getByText("title 1")).toBeVisible();
    expect(screen.getByText("title 2")).toBeVisible();
  });

  it("should display links with correct href", () => {
    render(
      <DropdownNavSearchbar
        books={
          [
            { title: "title 1", id: 1 },
            { title: "title 2", id: 2 },
          ] as BookData[]
        }
      />,
    );

    expect(screen.getByRole("link", { name: "title 1" })).toHaveAttribute(
      "href",
      "/book/1",
    );
    expect(screen.getByRole("link", { name: "title 2" })).toHaveAttribute(
      "href",
      "/book/2",
    );
  });
});
