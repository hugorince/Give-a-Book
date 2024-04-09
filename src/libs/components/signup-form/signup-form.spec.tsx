import { render, screen, waitFor } from "@testing-library/react";
import { SignUpForm } from ".";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { createUser } from "../../utils";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

jest.mock("../../utils", () => ({
  ...jest.requireActual("../../utils"),
  createUser: jest.fn(),
}));

const mockCreateUser = jest.fn();

const mockForm = {
  register: jest.fn(),
  handleSubmit: (onSubmit: Function) => onSubmit,
  formState: { isValid: true },
};

const user = userEvent.setup();

describe("SignUpForm component", () => {
  beforeAll(() => {
    (createUser as jest.Mock).mockImplementation(mockCreateUser);
  });
  it("should set the input values on submit", async () => {
    (useForm as jest.Mock).mockReturnValue(mockForm);
    render(<SignUpForm />);

    const username = screen.getByLabelText("username");
    const email = screen.getByLabelText("email");
    const postalCode = screen.getByLabelText("postal code");
    const password = screen.getByLabelText("password");
    const confirmPassword = screen.getByLabelText("confirm password");

    user.type(username, "username");
    await waitFor(() => expect(username).toHaveValue("username"));

    user.type(email, "email@mail.com");
    await waitFor(() => expect(email).toHaveValue("email@mail.com"));

    user.type(postalCode, "75018");
    await waitFor(() => expect(postalCode).toHaveValue("75018"));

    user.type(password, "password");
    await waitFor(() => expect(password).toHaveValue("password"));

    user.type(confirmPassword, "password");
    await waitFor(() => expect(confirmPassword).toHaveValue("password"));

    const submitButton = screen.getByRole("button", { name: "submit" });
    user.click(submitButton);

    await waitFor(() => {
      expect(mockCreateUser).toHaveBeenCalled();
    });
  });
  it("should not call the onSubmit when form not valid", () => {
    (useForm as jest.Mock).mockReturnValue({
      ...mockForm,
      formState: { isValid: false },
    });
    render(<SignUpForm />);

    const submitButton = screen.getByRole("button", { name: "submit" });
    expect(submitButton).toBeDisabled();
  });
});
