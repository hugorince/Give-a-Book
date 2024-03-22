"use client";

import { DialogProvider } from "@/libs/ui-components";
import { render as testingLibraryRender } from "@testing-library/react";
import { ReactNode } from "react";
import { FilterBooksProvider } from "@/libs/providers";

export const render = (ui: ReactNode) => {
  return testingLibraryRender(
    <DialogProvider>
      <FilterBooksProvider>{ui}</FilterBooksProvider>
    </DialogProvider>,
  );
};
