"use client";

import type { ReactNode } from "react";
import { DialogProvider } from "../ui-kit";
import { render as testingLibraryRender } from "@testing-library/react";
import { FormProvider, useForm } from "react-hook-form";

export const render = (ui: ReactNode) => {
  return testingLibraryRender(<DialogProvider>{ui}</DialogProvider>);
};

export const mockOnSubmit = jest.fn();

export const RHFWrapper = ({ children }: { children: ReactNode }) => {
  const form = useForm();

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(mockOnSubmit)}>
        {children}
        <button type="submit">submit</button>
      </form>
    </FormProvider>
  );
};
