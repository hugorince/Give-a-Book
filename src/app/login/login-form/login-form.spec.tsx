import "@testing-library/jest-dom";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { LoginForm } from "./login-form";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}));

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"), // Use actual for all non-hook parts
  useForm: () => ({
    register: jest.fn(),
    handleSubmit: jest.fn(),
    formState: { errors: {} },
  }),
}));

describe("login form", () => {
  it("doesn't submit when form is empty", () => {
    render(<LoginForm />);

    const submitButton = screen.getByRole("button");

    expect(submitButton).toBeDisabled();
  });

  it("submits when form is filled", async () => {
    render(<LoginForm />);

    const handleSubmit = jest.fn();
    const form = screen.getByRole("form", { name: "" });
    form.onsubmit = handleSubmit;

    const usernameInput = screen.getByPlaceholderText("mail@mail.com");
    const passwordInput = screen.getByPlaceholderText("password");

    fireEvent.change(usernameInput, {
      target: {
        value: "hugo@rigolo.com",
      },
    });
    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    fireEvent.submit(form, {
      preventDefault: jest.fn(), // Prevent default form submission behavior
    });

    expect(handleSubmit).toHaveBeenCalledWith({
      username: "hugo@rigolo.com",
      password: "password123",
    });
  });
});
