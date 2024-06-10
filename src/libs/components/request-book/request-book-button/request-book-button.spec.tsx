import type { BookPageData } from "@/libs/types";
import { render, mockedBook } from "@/libs/test-utils";
import { RequestBookButton } from "./request-book-button";
import userEvent from "@testing-library/user-event";
import { screen, waitFor } from "@testing-library/react";
import { requestBook } from "@/libs/server-actions";
import { useDialog } from "@/libs/ui-components";

const mockOpenDialog = jest.fn();

jest.mock("../../../ui-components", () => ({
  ...jest.requireActual("../../../ui-components"),
  useDialog: jest.fn(),
}));

const mockRequestBook = jest.fn();

jest.mock("../../../database", () => ({
  ...jest.requireActual("../../../database"),
  requestBook: jest.fn(),
}));

describe("RequestBook", () => {
  beforeAll(() => {
    (useDialog as jest.Mock).mockReturnValue({ openDialog: mockOpenDialog });
    (requestBook as jest.Mock).mockImplementation(mockRequestBook);
  });
  it("should trigger open the dialog on click", async () => {
    render(<RequestBookButton book={mockedBook as BookPageData} />);

    userEvent.click(screen.getByRole("button", { name: "Request book" }));
    await waitFor(() => expect(mockOpenDialog).toHaveBeenCalled());
  });
});
