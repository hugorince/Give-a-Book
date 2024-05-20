"use client";

import { PostBookFormSchema } from "@/libs/types";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { DescriptionInput } from "./description-input";
import { SearchTextInput } from "./search-text-input";
import { SelectInput } from "./select-input";
import { postBook } from "@/libs/database";
import { Button } from "@/libs/ui-components";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import classes from "./post-book-form.module.css";
import { useClientSession } from "@/libs/hooks";

export const PostBookForm = () => {
  const { connectedUserId } = useClientSession();

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
    if (connectedUserId) {
      await postBook(values, connectedUserId);
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
