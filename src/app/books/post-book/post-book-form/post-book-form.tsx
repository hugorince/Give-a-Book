"use client";

import { FormProvider, useForm } from "react-hook-form";
import { DescriptionInput } from "../description-input/description-input";
import { SearchTextInput } from "../search-text-input";

export const PostBookForm = () => {
  const form = useForm({
    defaultValues: {
      title: "",
      authors: [],
      description: "",
    },
  });

  const onSubmit = async (values) => {
    console.log("onsubmit", values);
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <SearchTextInput type="title" />
        <SearchTextInput type="authors" />
        <DescriptionInput />
        <button type="submit">submit book</button>
      </form>
    </FormProvider>
  );
};
