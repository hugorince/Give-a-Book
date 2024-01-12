import { UpdateProfileInput, UpdateProfileProps } from "./update-profile-input";

interface UpdateProfileFieldContainerProps {
  submitForm: () => void;
  handleInputClose: () => void;
  updateInput: UpdateProfileProps["type"];
}

export const UpdateProfileFieldContainer = ({
  submitForm,
  handleInputClose,
  updateInput,
}: UpdateProfileFieldContainerProps) => {
  return (
    <form onSubmit={submitForm}>
      <UpdateProfileInput type={updateInput} />
      <button type="submit">update</button>
      <button onClick={handleInputClose}>cancel</button>
    </form>
  );
};
