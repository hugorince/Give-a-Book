import { render, mockedGoogleApiBooks } from "@/test-utils";
import { DropdownSearch } from "./dropdown-search";
import { screen } from "@testing-library/react";

describe("DropdownSearch", () => {
  it("should display the suggestions for titles", () => {
    render(
      <DropdownSearch
        type="title"
        suggestions={mockedGoogleApiBooks}
        setSuggestions={jest.fn()}
        handleOnClick={jest.fn()}
      />,
    );

    expect(screen.getByText("title")).toBeVisible();
    expect(screen.getByText("title 2")).toBeVisible();
    expect(screen.getByText("title 3")).toBeVisible();
  });

  it("should display the suggestions for authors", () => {
    render(
      <DropdownSearch
        type="author"
        suggestions={mockedGoogleApiBooks}
        setSuggestions={jest.fn()}
        handleOnClick={jest.fn()}
      />,
    );

    expect(screen.getByText("author 1")).toBeVisible();
    expect(screen.getByText("author 2")).toBeVisible();
    expect(screen.getByText("author 3")).toBeVisible();
  });
});
