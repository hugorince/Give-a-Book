import { render, mockedNotifications } from "@/test-utils";
import { Notifications } from "./notifications";
import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("./dropdown-notifications", () => ({
  DropdownNotifications: () => <div>DropdownNotifications</div>,
}));

describe("Notifications", () => {
  it("should render notification button with the number of unread notifications", () => {
    render(<Notifications notifications={mockedNotifications} />);

    expect(screen.getByText("1")).toBeVisible();
    expect(screen.queryByText("DropdownNotifications")).not.toBeInTheDocument();
  });

  it("should show dropdown on click", async () => {
    render(<Notifications notifications={mockedNotifications} />);

    const button = screen.getByRole("button");
    await userEvent.click(button);

    expect(screen.getByText("DropdownNotifications")).toBeVisible();
  });
});
