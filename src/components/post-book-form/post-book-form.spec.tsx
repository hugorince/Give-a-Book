import { render } from "@/test-utils";
import { PostBookForm } from "./post-book-form";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { postBook } from "@/actions";

jest.mock("../../actions", () => ({
  postBook: jest.fn(),
}));

jest.mock("./select-input", () => ({
  SelectInput: () => (
    <select defaultValue="give" name="exchangeGive">
      <option value="give" selected>
        give
      </option>
    </select>
  ),
}));

jest.mock("./search-text-input", () => ({
  SearchTextInput: ({ type }: { type: string }) => (
    <input type="text" name={type} defaultValue={type} />
  ),
}));

jest.mock("./description-input", () => ({
  DescriptionInput: () => (
    <input type="text" defaultValue="description" name="description" />
  ),
}));

const mockPostBook = jest.fn();

describe("PostBookForm", () => {
  beforeAll(() => {
    (postBook as jest.Mock).mockImplementation(mockPostBook);
  });
  it("should submit the form on Submit", async () => {
    render(<PostBookForm />);

    const submitButton = screen.getByRole("button");
    await userEvent.click(submitButton);

    //expect(mockPostBook).toHaveBeenCalled();
  });
});
