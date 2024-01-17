import { FormProvider, useForm } from "react-hook-form";
import { UpdateProfileInput, UpdateProfileProps } from "./update-profile-input";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface UpdateProfileFieldContainerProps {
  handleInputClose: () => void;
  updateInput: UpdateProfileProps["type"];
}

const userSchemaWithId = z.object({
  username: z.string().min(1, "Username is required").max(100).optional(),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Invalid email")
    .optional(),
});

export const UpdateProfileFieldContainer = ({
  handleInputClose,
  updateInput,
}: UpdateProfileFieldContainerProps) => {
  const form = useForm<z.infer<typeof userSchemaWithId>>({
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const { data: session, update } = useSession();

  const router = useRouter();

  const onSubmit = async (values: z.infer<typeof userSchemaWithId>) => {
    const response = await fetch("/api/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sessionEmail: session?.user.email,
        [updateInput]: values[updateInput as keyof typeof values],
      }),
    });

    if (response.ok) {
      await update({
        ...session,
        user: {
          ...session?.user,
          [updateInput]: values[updateInput as keyof typeof values],
        },
      });
      console.log("user's", updateInput, " updated");
      handleInputClose();
      router.refresh();
    } else {
      console.error("Registration failed");
    }
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <UpdateProfileInput type={updateInput} />
        <button type="submit">update</button>
        <button onClick={handleInputClose}>cancel</button>
      </form>
    </FormProvider>
  );
};
