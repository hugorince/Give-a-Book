import {
  ProfileFieldContainer,
  ProfileFieldContainerProps,
} from "./profile-field-container";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";

const props: ProfileFieldContainerProps = {
  type: "email",
  handleOnClick: jest.fn(),
};

jest.mock("next-auth/react");

const mockSession = {
  data: {
    user: {
      email: "test@example.com",
    },
  },
  update: jest.fn(),
};

useSession.mockReturnValue(mockSession);

describe("ProfileFieldContainer", () => {
  it("should render the component", () => {
    render(<ProfileFieldContainer {...props} />);
    expect(screen.getByText("test@example.com")).toBeInTheDocument();
  });

  it("should fire the callback when update button is clicked", () => {
    render(<ProfileFieldContainer {...props} />);

    const updateButton = screen.getByRole("button", { name: "update" });
    updateButton.click();

    expect(props.handleOnClick).toHaveBeenCalled();
  });
});
