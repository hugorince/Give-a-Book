"use client";

import { FormProvider, useForm } from "react-hook-form";
import { DescriptionInput } from "../description-input/description-input";
import { SearchTextInput } from "../search-text-input";
import { PostBookFormSchema } from "@/libs/types";
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

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

  const onSubmit = async (values: z.infer<typeof PostBookFormSchema>) => {
    console.log("onsubmit", values);
    console.log(session.user);

    const response = await fetch("/api/book", {
      method: "POST",
      headers: {
        "Content-Type": "application/book",
      },
      body: JSON.stringify({
        title: values.title,
        author: values.author,
        description: values.description,
        userId: parseInt(session?.user.id),
      }),
    });
    if (response.ok) {
      router.push("/books");
    } else {
      console.error("Registration failed");
    }
  };

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
