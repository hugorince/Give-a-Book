import { render, screen } from "@testing-library/react";
import { LoginForm } from "./login-form";
import userEvent from "@testing-library/user-event";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

const mockForm = {
  register: jest.fn(),
  handleSubmit: jest.fn(),
  formState: { s: {} },
};

const user = userEvent.setup();

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

    await user.type(usernameInput, "hugo@mail.com");
    await user.type(passwordInput, "password");

    button.click();

    expect(mockForm.handleSubmit).toHaveBeenCalled();
  });
});
