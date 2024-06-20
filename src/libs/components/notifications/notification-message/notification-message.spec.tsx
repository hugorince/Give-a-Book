import { mockedNotifications, render } from "@/libs/test-utils";
import { NotificationMessage } from "./notification-message";
import { screen } from "@testing-library/react";

describe("NotificationMessage", () => {
  it("should display the correct message for new message", () => {
    render(
      <NotificationMessage
        notification={mockedNotifications[0]}
        handleNotificationClicked={jest.fn()}
      />,
    );

    expect(screen.getByText("New message from hugo")).toBeVisible();
  });

  it("should display the correct message for new booking", () => {
    render(
      <NotificationMessage
        notification={mockedNotifications[1]}
        handleNotificationClicked={jest.fn()}
      />,
    );

    expect(screen.getByText("New booking")).toBeVisible();
  });

  it("should display the correct message color for unread message", () => {
    render(
      <NotificationMessage
        notification={mockedNotifications[0]}
        handleNotificationClicked={jest.fn()}
      />,
    );

    expect(screen.getByRole("link")).toHaveClass("isNotRead");
  });

  it("should display the correct message color for read message", () => {
    render(
      <NotificationMessage
        notification={mockedNotifications[1]}
        handleNotificationClicked={jest.fn()}
      />,
    );

    expect(screen.getByRole("link")).toHaveClass("isRead");
  });
});
