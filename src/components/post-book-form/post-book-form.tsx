"use client";

import { PostBookFormSchema } from "@/types";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { DescriptionInput } from "../description-input";
import { SearchTextInput } from "../search-text-input";
import { SelectInput } from "../select-input";
import { postBook } from "@/actions";
import { Button } from "@/ui-kit";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useClientSession } from "@/hooks";
import classes from "./post-book-form.module.css";
import { BOOKTYPE } from "@/constants";

export const PostBookForm = () => {
  const router = useRouter();
  const { connectedUserId } = useClientSession();

  const form = useForm<z.infer<typeof PostBookFormSchema>>({
    resolver: zodResolver(PostBookFormSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: "",
      exchangeGive: BOOKTYPE.GIVE,
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
