import { mockedBookPage, mockedProposition, render } from "@/test-utils";
import { RequestBookContainer } from "./request-book-container";
import { screen } from "@testing-library/react";

jest.mock("./book-already-requested", () => ({
  BookAlreadyRequested: () => <div>BookAlreadyRequested</div>,
}));

jest.mock("./not-connected-request-book", () => ({
  NotConnectedRequestBook: () => <div>NotConnectedRequestBook</div>,
}));

jest.mock("./book-new-request", () => ({
  BookNewRequest: () => <div>BookNewRequest</div>,
}));

jest.mock("./book-cancel-request", () => ({
  BookCancelRequest: () => <div>BookCancelRequest</div>,
}));

jest.mock("./propose-exchange", () => ({
  ProposeExchange: () => <div>ProposeExchange</div>,
}));

jest.mock("./book-cancel-proposition", () => ({
  BookCancelProposition: () => <div>BookCancelProposition</div>,
}));

describe("RequestBookContainer", () => {
  it("should display the right request possibility when logged in and exchange true", () => {
    render(<RequestBookContainer book={mockedBookPage} connectedUserId={4} />);

    expect(screen.getByText("ProposeExchange")).toBeVisible();
  });

  it("should display the right request possibility when logged and own book", () => {
    render(
      <RequestBookContainer
        book={{ ...mockedBookPage, userId: 4 }}
        connectedUserId={4}
      />,
    );

    expect(
      screen.getByText(
        "This book is proposed by you, you can cancel this proposition",
      ),
    ).toBeVisible();
  });

  it("should display the right request possibility when logged in and exchange false", () => {
    render(
      <RequestBookContainer
        book={{ ...mockedBookPage, exchange: false, give: true }}
        connectedUserId={4}
      />,
    );

    expect(screen.getByText("BookNewRequest")).toBeVisible();
  });

  it("should display the right request possibility when logged in and already proposed", () => {
    render(
      <RequestBookContainer
        book={{ ...mockedBookPage, proposed: mockedProposition }}
        connectedUserId={4}
      />,
    );

    expect(screen.getByText("BookCancelProposition")).toBeVisible();
  });

  it("should display the right request possibility when logged in and already proposed to another user", () => {
    render(
      <RequestBookContainer
        book={{
          ...mockedBookPage,
          proposed: { ...mockedProposition, proposedBookId: 3 },
        }}
        connectedUserId={4}
      />,
    );

    expect(screen.getByText("BookAlreadyRequested")).toBeVisible();
  });

  it("should display the right request possibility when not logged in", () => {
    render(
      <RequestBookContainer
        book={mockedBookPage}
        connectedUserId={undefined}
      />,
    );
    expect(screen.getByText("NotConnectedRequestBook")).toBeVisible();
  });
});
