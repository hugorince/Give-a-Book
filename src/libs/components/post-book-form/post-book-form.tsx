"use client";

import { FormProvider, useForm } from "react-hook-form";
import { DescriptionInput } from "./description-input";
import { SearchTextInput } from "./search-text-input";
import { PostBookFormSchema } from "@/libs/types";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { postBook } from "@/libs/utils";
import { useEffect } from "react";

export const PostBookForm = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const form = useForm<z.infer<typeof PostBookFormSchema>>({
    defaultValues: {
      title: "",
      author: "",
      description: "",
    },
  });
  const { author } = form.getValues();

  const onSubmit = async (values: z.infer<typeof PostBookFormSchema>) => {
    const userId = session && parseInt(session.user.id);
    if (userId) {
      await postBook(values, userId);
      router.push("/books");
    }
  };

  useEffect(() => {
    console.log(author);
    form.setValue("author", author);
  }, [author, form]);

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SearchTextInput type="title" />
        <SearchTextInput type="author" />
        <DescriptionInput />
        <button type="submit">submit book</button>
      </form>
    </FormProvider>
  );
};
