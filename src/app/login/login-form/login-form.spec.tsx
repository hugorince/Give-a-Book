import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { LoginForm } from "./login-form";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

const mockForm = {
  register: jest.fn(),
  handleSubmit: jest.fn(),
  formState: { s: {} },
};

describe("login form", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.requireMock("react-hook-form").useForm.mockReturnValue(mockForm);
  });
  it("disabled button submit when form is empty", () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();
  });

  it("submits when form is filled", async () => {
    render(<LoginForm />);

    const pushMock = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const button = screen.getByRole("button");

    const usernameInput = screen.getByPlaceholderText("mail@mail.com");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(usernameInput, {
      target: {
        value: "hugo@mail.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "password",
      },
    });

    button.click();

    expect(mockForm.handleSubmit).toHaveBeenCalled();
  });
});
