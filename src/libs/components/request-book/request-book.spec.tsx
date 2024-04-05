import { render } from "@/libs/utils";
import { RequestBook } from "./request-book";
import { mockedBook } from "@/libs/utils";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/react";

const mockRequestBook = jest.fn();

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  requestBook: mockRequestBook,
}));

//TODO: Compare and fix regarding StoreLocator lib

describe("RequestBook", () => {
  it("should trigger the request book function on click", () => {
    render(<RequestBook book={mockedBook} />);

    userEvent.click(screen.getByRole("button", { name: "Request book" }));
    expect(mockRequestBook).toHaveBeenCalled();
  });
});
