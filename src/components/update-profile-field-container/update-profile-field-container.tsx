"use client";

import type { User } from "@prisma/client";
import { updateUserSchemaWithId } from "@/types";
import { FormProvider, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import {
  UpdateProfileInput,
  UpdateProfileProps,
} from "../update-profile-input";
import { updateUser } from "@/actions";
import { useRouter } from "next/navigation";
import { Button } from "@/ui-kit";
import { toast } from "sonner";
import classes from "./update-profile-field.module.css";
import { TOASTER_GENERIC_ERROR_MESSAGE } from "@/constants";

interface UpdateProfileFieldContainerProps {
  handleInputClose: () => void;
  updateInput: UpdateProfileProps["type"];
  userInfos: User;
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
      postalCode: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof updateUserSchemaWithId>) => {
    const email = session?.user?.email;

    if (email) {
      try {
        handleInputClose();
        await updateUser(values, email);
        await update({
          ...session,
          user: {
            ...session?.user,
            [updateInput]: values[updateInput as keyof typeof values],
          },
        });
        router.refresh();
        toast.success("Your profile has been successfully updated");
      } catch (err) {
        toast.error(TOASTER_GENERIC_ERROR_MESSAGE);
      }
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classes.updateProfileFieldWrapper}
      >
        <UpdateProfileInput type={updateInput} />
        <Button variant="secondary" onClick={handleInputClose} size="s">
          Cancel
        </Button>
        <Button
          type="submit"
          loading={form.formState.isSubmitting}
          disabled={!form.formState.isValid}
          size="s"
        >
          Confirm
        </Button>
      </form>
    </FormProvider>
  );
};
