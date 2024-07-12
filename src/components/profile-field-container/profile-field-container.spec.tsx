import {
  ProfileFieldContainer,
  ProfileFieldContainerProps,
} from "./profile-field-container";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

const props: ProfileFieldContainerProps = {
  fieldValue: "email",
  handleOnClick: jest.fn(),
};

describe("ProfileFieldContainer", () => {
  it("should render the component", () => {
    render(<ProfileFieldContainer {...props} />);
    expect(screen.getByText("email")).toBeInTheDocument();
  });

  it("should fire the callback when update button is clicked", () => {
    render(<ProfileFieldContainer {...props} />);

    const updateButton = screen.getByRole("button", { name: "update" });
    updateButton.click();

    expect(props.handleOnClick).toHaveBeenCalled();
  });
});
