import { screen, waitFor } from "@testing-library/react";
import { SignUpForm } from ".";
import { useForm } from "react-hook-form";
import userEvent from "@testing-library/user-event";
import { createUser } from "@/actions";
import { render } from "@/test-utils";

jest.mock("react-hook-form", () => ({
  ...jest.requireActual("react-hook-form"),
  useForm: jest.fn(),
}));

jest.mock("../../actions", () => ({
  ...jest.requireActual("../../actions"),
  createUser: jest.fn(),
  verifyPostalCode: jest.fn().mockReturnValue(true),
}));

const mockCreateUser = jest.fn();

const mockForm = {
  register: jest.fn(),
  handleSubmit: (onSubmit: () => void) => onSubmit,
  formState: {
    isValid: true,
    errors: { postalCode: { message: "postal code error" } },
  },
};

describe("SignUpForm component", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should set the input values on submit", async () => {
    (useForm as jest.Mock).mockReturnValue(mockForm);
    (createUser as jest.Mock).mockImplementation(mockCreateUser);

    const user = userEvent.setup();

    render(<SignUpForm />);

    const username = screen.getByLabelText("username");
    const email = screen.getByLabelText("email");
    const postalCode = screen.getByLabelText("postal code");
    const password = screen.getByLabelText("password");
    const confirmPassword = screen.getByLabelText("confirm password");
    const checkbox = screen.getByLabelText(
      "I have agreed the confidentiality politics",
    );

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

    user.click(checkbox);

    const submitButton = screen.getByRole("button", { name: "submit" });

    await user.click(submitButton);

    expect(mockCreateUser).toHaveBeenCalled();
  });
  it("should not call the onSubmit when form not valid", async () => {
    (useForm as jest.Mock).mockReturnValue({
      ...mockForm,
      formState: {
        isValid: false,
        errors: { postalCode: { message: "postal code error" } },
      },
    });
    (createUser as jest.Mock).mockImplementation(mockCreateUser);

    const user = userEvent.setup();

    render(<SignUpForm />);

    const submitButton = screen.getByRole("button", { name: "submit" });

    await user.click(submitButton);

    expect(mockCreateUser).not.toHaveBeenCalled();
  });
});
