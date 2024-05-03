"use client";

import { FormProvider, useForm } from "react-hook-form";
import { DescriptionInput } from "./description-input";
import { SearchTextInput } from "./search-text-input";
import { PostBookFormSchema } from "@/libs/types";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { postBook } from "@/libs/database";
import { Button } from "@/libs/ui-components";
import classes from "./post-book-form.module.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectInput } from "./select-input";

export const PostBookForm = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof PostBookFormSchema>>({
    resolver: zodResolver(PostBookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: "",
      exchangeGive: "give",
    },
  });

  const onSubmit = async (values: z.infer<typeof PostBookFormSchema>) => {
    const userId = session && parseInt(session.user.id);
    if (userId) {
      await postBook(values, userId);
      router.refresh();
      router.push("/books");
    }
  };

  return (
    <FormProvider {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={classes.formWrapper}
      >
        <SelectInput />
        <SearchTextInput type="title" />
        <SearchTextInput type="author" />
        <DescriptionInput />
        <Button
          type="submit"
          disabled={!form.formState.isValid}
          loading={form.formState.isSubmitting}
        >
          submit book
        </Button>
      </form>
    </FormProvider>
  );
};
