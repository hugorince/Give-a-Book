import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { LoginForm } from "./login-form";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

const mockSubmit = jest.fn();

const mockForm = {
  register: jest.fn(),
  handleSubmit: mockSubmit,
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

    expect(mockSubmit).toHaveBeenCalledWith();
  });
});
