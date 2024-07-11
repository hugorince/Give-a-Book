import { mockedUser, render } from "@/test-utils";
import { UpdateProfileFieldContainer } from "./update-profile-field-container";
import { screen } from "@testing-library/react";

describe("UpdateProfileFieldContainer", () => {
  it("should render UpdateProfileFieldContainer", () => {
    render(
      <UpdateProfileFieldContainer
        handleInputClose={jest.fn()}
        updateInput="email"
        userInfos={mockedUser}
      />,
    );

    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});
