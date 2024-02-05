import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { UpdateProfileInput } from "./update-profile-input";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useFormContext: jest.fn(),
}));

const mockForm = {
  register: jest.fn(),
};

describe("UpdateProfileInput", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .requireMock("react-hook-form")
      .useFormContext.mockReturnValue(mockForm);
  });
  it("should render an input field according to the props type", () => {
    render(<UpdateProfileInput type="email" />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });

  it("should call the register function", () => {
    render(<UpdateProfileInput type="username" />);

    expect(mockForm.register).toHaveBeenCalledWith("username");
  });

  it("should register the value of the input", () => {
    render(<UpdateProfileInput type="username" />);

    const textbox = screen.getByRole("textbox");

    fireEvent.change(textbox, {
      target: {
        value: "hugo",
      },
    });

    expect(textbox).toHaveValue("hugo");

    expect(mockForm.register).toHaveBeenCalledWith("username");
  });
});
