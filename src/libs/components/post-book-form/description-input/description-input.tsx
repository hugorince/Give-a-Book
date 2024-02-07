import { useFormContext } from "react-hook-form";

export const DescriptionInput = () => {
  const { register } = useFormContext();
  return <textarea rows={4} cols={40} {...register("description")} />;
};
