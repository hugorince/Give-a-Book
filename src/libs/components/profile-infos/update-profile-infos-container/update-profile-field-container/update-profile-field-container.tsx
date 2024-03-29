"use client";

import { FormProvider, useForm } from "react-hook-form";
import { UpdateProfileInput, UpdateProfileProps } from "./update-profile-input";
import * as z from "zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Button } from "@/libs/ui-components";
import classes from "./update-profile-field.module.css";
import { updateUserSchemaWithId } from "@/libs/types";
import { updateUser } from "@/libs/utils";
import { zodResolver } from "@hookform/resolvers/zod";

interface UpdateProfileFieldContainerProps {
  handleInputClose: () => void;
  updateInput: UpdateProfileProps["type"];
}

export const UpdateProfileFieldContainer = ({
  handleInputClose,
  updateInput,
}: UpdateProfileFieldContainerProps) => {
  const { data: session, update } = useSession();
  const router = useRouter();

  const form = useForm<z.infer<typeof updateUserSchemaWithId>>({
    resolver: zodResolver(updateUserSchemaWithId),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchemaWithId>) => {
    const email = session?.user.email;
    if (email) {
      await updateUser(values, email);
      await update({
        ...session,
        user: {
          ...session?.user,
          [updateInput]: values[updateInput as keyof typeof values],
        },
      });
      handleInputClose();
      router.refresh();
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classes.updateProfileFieldWrapper}
      >
        <UpdateProfileInput type={updateInput} />
        <Button variant="secondary" onClick={handleInputClose}>
          cancel
        </Button>
        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
        >
          confirm
        </Button>
      </form>
    </FormProvider>
  );
};
