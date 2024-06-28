import { render, mockedBookedBook } from "@/test-utils";
import { RequestBookButton } from "./request-book-button";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { requestBook } from "@/actions";
import { useDialog } from "@/ui-kit";

const mockOpenDialog = jest.fn();

jest.mock("../../../ui-kit", () => ({
  ...jest.requireActual("../../../ui-kit"),
  useDialog: jest.fn(),
}));

const mockRequestBook = jest.fn();

jest.mock("../../../actions", () => ({
  ...jest.requireActual("../../../actions"),
  requestBook: jest.fn(),
}));

describe("RequestBook", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ openDialog: mockOpenDialog });
    (requestBook as jest.Mock).mockImplementation(mockRequestBook);
  });
  it("should trigger open the dialog on click", async () => {
    render(<RequestBookButton book={mockedBookedBook} />);

    userEvent.click(screen.getByRole("button", { name: "Request book" }));
    await waitFor(() => expect(mockOpenDialog).toHaveBeenCalled());
  });
});
