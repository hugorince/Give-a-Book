import { UpdateProfileInfoContainer } from "./update-profile-info-container";
import { render } from "@/test-utils";
import { screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

jest.mock("../update-profile-field-container", () => ({
  UpdateProfileFieldContainer: ({
    handleInputClose,
  }: {
    handleInputClose: () => void;
  }) => (
    <div data-testid="update-field">
      <button onClick={handleInputClose}>Close</button>
    </div>
  ),
}));

jest.mock("../profile-field-container", () => ({
  ProfileFieldContainer: ({ handleOnClick }: { handleOnClick: () => void }) => (
    <div data-testid="profile-field">
      <button onClick={handleOnClick}>Edit</button>
    </div>
  ),
}));

describe("UpdateProfileInfoContainer", () => {
  it("renders the ProfileFieldContainer initially", () => {
    render(<UpdateProfileInfoContainer type="email" />);

    expect(screen.getByText("email")).toBeInTheDocument();
    expect(screen.getByTestId("profile-field")).toBeInTheDocument();
    expect(screen.queryByTestId("update-field")).not.toBeInTheDocument();
  });

  it("renders the UpdateProfileFieldContainer when Edit is clicked", async () => {
    render(<UpdateProfileInfoContainer type="username" />);

    userEvent.click(screen.getByText("Edit"));

    await waitFor(() =>
      expect(screen.getByTestId("update-field")).toBeInTheDocument(),
    );

    expect(screen.queryByTestId("profile-field")).not.toBeInTheDocument();
  });

  it("closes the UpdateProfileFieldContainer when Close is clicked", async () => {
    render(<UpdateProfileInfoContainer type="email" />);

    userEvent.click(screen.getByText("Edit"));

    await waitFor(() =>
      expect(screen.getByTestId("update-field")).toBeInTheDocument(),
    );

    userEvent.click(screen.getByText("Close"));

    await waitFor(() =>
      expect(screen.getByTestId("profile-field")).toBeInTheDocument(),
    );
    expect(screen.queryByTestId("update-field")).not.toBeInTheDocument();
  });
});
