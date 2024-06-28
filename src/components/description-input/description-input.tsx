import { useFormContext } from "react-hook-form";
import { Textarea } from "@/ui-kit";

export const DescriptionInput = () => {
  const { register } = useFormContext();
  return <Textarea label="description" rows={4} {...register("description")} />;
};
