import { render, screen, waitFor } from "@testing-library/react";
import { SignUpForm } from ".";
import userEvent from "@testing-library/user-event";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
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

const user = userEvent.setup();

describe("SignUpForm component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.requireMock("react-hook-form").useForm.mockReturnValue(mockForm);
  });
  it("should set the input values", async () => {
    render(<SignUpForm />);

    const username = screen.getByLabelText("username");
    const email = screen.getByLabelText("email");
    const password = screen.getByLabelText("password");
    const confirmPassword = screen.getByLabelText("confirm password");

    user.type(username, "username");
    await waitFor(() => expect(username).toHaveValue("username"));

    user.type(email, "email@mail.com");
    await waitFor(() => expect(email).toHaveValue("email@mail.com"));

    user.type(password, "password");
    await waitFor(() => expect(password).toHaveValue("password"));

    user.type(confirmPassword, "password");
    await waitFor(() => expect(confirmPassword).toHaveValue("password"));

    const submitButton = screen.getByRole("button", { name: "submit" });
    submitButton.click();

    expect(mockSubmit).toHaveBeenCalled();
  });
  it("should not call the onSubmit when form not valid", () => {
    render(<SignUpForm />);

    const submitButton = screen.getByRole("button", { name: "submit" });
    expect(submitButton).toBeDisabled();
  });
});
